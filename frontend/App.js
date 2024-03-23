import { Camera, CameraType } from 'expo-camera';
import { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Dimensions, TouchableOpacity } from 'react-native';
import Bubble from './components/Bubble';
import RedButton from './components/RedButton';

export default function App() {
  const [type, setType] = useState(CameraType.back);
  const [permission, requestPermission] = Camera.useCameraPermissions();
  const window = Dimensions.get('window');

  const [bubbleState, setBubbleState] = useState("waiting");
  const [response, setResponse] = useState("");

  if (!permission) return (
    <View style={styles.container}>
      <Text>Requesting Camera Permission</Text>
    </View>
  )

  if (!permission.granted) return (
    <View style={styles.container}>
      <Text>Camera Permission was denied</Text>
    </View>
  )

  function toggleCameraType() {
    setType(current => (current === CameraType.back ? CameraType.front : CameraType.back));
  }

  return (
    <View>
      <Camera style={{
        width: window.width,
        height: window.height
      }} type={type}>
      </Camera>
      
      <RedButton bubbleState={bubbleState} setBubbleState={setBubbleState} />
      <Bubble bubbleState={bubbleState} response={response} />
      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
