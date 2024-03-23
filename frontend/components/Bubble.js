import { StyleSheet, Text, View, Image } from 'react-native';
import { BlurView } from '@react-native-community/blur';

export default function Bubble({ bubbleState, response }) {
    return (
        <View style={styles.bubbleContainer}>
          {/* <BlurView blurType="light" blurAmount={10} reducedTransparencyFallbackColor="white" /> */}
          {bubbleState === "waiting" &&
            <Text style={styles.bubbleText}>Ask me a question with "Hey Hoo."</Text>
          }
          {bubbleState === "listening" &&
            <Image style={styles.talkImage} source={require("../assets/favicon.png")}></Image>
          }
        </View>
    );
}

const styles = StyleSheet.create({
  bubbleContainer: {
    position: 'absolute',
    bottom: "6%",
    paddingLeft: 5,
    paddingRight: 5,
    paddingTop: 15,
    paddingBottom: 15,
    width: "80%",
    left: "10%",
    backgroundColor: 'rgba(255, 255, 255, 0.6)',
    borderColor: 'rgba(255, 255, 255, 0.7)',
    borderRadius: 20,

    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 30 / 2,
    borderWidth: 1,

    justifyContent: 'center',
    alignItems: 'center',
  },
  bubbleText: {
    color: '#000',
    fontSize: 16,
    textAlign: 'center',
  },
  talkImage: {
    width: 50,
    height: 50,
  }
});