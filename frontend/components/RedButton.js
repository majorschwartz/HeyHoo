import { StyleSheet, Text, View, Button } from 'react-native';

export default function RedButton({ bubbleState, setBubbleState }) {
    return (
        <View>
            <Button onPress={() => bubbleState(true)} title="Red" color="red" />
        </View>
    );
}