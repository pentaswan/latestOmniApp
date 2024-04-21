import { WebView } from 'react-native-webview';
import { useEffect, useState, useRef } from 'react';
import { View, AppState, ActivityIndicator, StyleSheet, ImageBackground, Dimensions } from 'react-native';

export default function App() {
  const webViewRef = useRef(null);
  const [isLoading, setIsLoading] = useState(true);

  const onLoadEnd = () => {
    // setIsLoading(false);
  };

  const [appState, setAppState] = useState(AppState.currentState);

  useEffect(() => {
    const handleAppStateChange = (nextAppState) => {
      if (appState.match(/inactive|background/) && nextAppState === 'active') {
        webViewRef.current.injectJavaScript("window.reloadMusic()");
      }
      setAppState(nextAppState);
    };

    const subscription = AppState.addEventListener('change', handleAppStateChange);
    return subscription.remove;
  }, [appState]);

  return (
    <View style={styles.container}>
      <WebView
        source={{uri: 'https://omnipotent.site/' }}
        style={styles.webView}
        startInLoadingState={true}
        mediaPlaybackRequiresUserAction={false}
        ref={webViewRef}
        onLoadEnd={onLoadEnd}
        overScrollMode={'never'}
        javaScriptEnabled={true}
        renderLoading={() => 
          <View style={styles.loadingContainerContainer}>
            <ImageBackground
              source={require('./grid.png')}
              style={styles.loadingContainer}
              resizeMode="contain"
            >
              <ActivityIndicator color="#1b9456" size="large" />
            </ImageBackground>
          </View>
        }
      />
    </View>
  );
};

const windowWidth = Dimensions.get('window').width;
const aspectRatio = 16 / 9;
const loadingContainerHeight = windowWidth * aspectRatio;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
    backgroundColor: 'black'
  },
  webView: {
    position: 'absolute',
    flex: 1,
    width: '100%',
    height: '100%',
  },
  loadingContainer: {
    // backgroundColor: '#1fad64',
    width: windowWidth,
    height: loadingContainerHeight,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingContainerContainer: {
    position: 'fixed',
    top: 0,
    left: 0,
    zIndex: 5,
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    width: '100%',
    height: '100%',
    backgroundColor: 'black'
  }
});