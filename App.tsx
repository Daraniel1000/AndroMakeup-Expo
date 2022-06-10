import { Camera } from 'expo-camera';
import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StyleSheet, Text, ActivityIndicator, View } from "react-native";

import useCachedResources from './hooks/useCachedResources';
import MakeupPreview from './src/MakeupPreview';

export default function App() {
  const isLoadingComplete = useCachedResources();
  const [hasPermission, setHasPermission] = useState(0);
  
  //Effects
  useEffect(() => {
      const callback = async () => {
          const { status } = await Camera.requestCameraPermissionsAsync();
          setHasPermission(status === "granted" ? 1 : 2);
      };

      callback();
  }, []);

  if (!isLoadingComplete || hasPermission === 0) {
    return (
    <View style={styles.container}>
      <Text style={[styles.title, {flex:0.4, fontSize: 35}]}>PLEASE WAIT</Text>
      <ActivityIndicator style={styles.container} size={100} />
    </View>);
  } else {
    if(hasPermission === 2) {
      return (
      <View style={styles.container}>
        <Text style={styles.title}>Please enable camera permission for the app</Text>
      </View>);
    }
    return (
      <SafeAreaProvider>
        <MakeupPreview/>
        <StatusBar hidden/>
      </SafeAreaProvider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
      flex: 1,
      alignItems: "center"
  },  
  title: {
      fontSize: 20,
      fontWeight: "bold",
      textAlignVertical:"center",
      flex:1
  },
});