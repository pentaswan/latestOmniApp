import { WebView } from 'react-native-webview';
import { useEffect, useState, useRef } from 'react';
import { AppState, ActivityIndicator, Alert } from 'react-native';

export default function App() {
  const webViewRef = useRef(null);
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
    <WebView
      source={{uri: 'https://omnipotent.site/' }}
      style={{ flex: 1 }}
      startInLoadingState={true}
      mediaPlaybackRequiresUserAction={false}
      ref={webViewRef}
      renderLoading={() => (
        <ActivityIndicator
          color='black'
          size='large'
          style={{ flex: 1 }}
        />
      )}
      overScrollMode={'never'}
      javaScriptEnabled={true}
    />
  );
};