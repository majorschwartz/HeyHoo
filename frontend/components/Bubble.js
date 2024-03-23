import { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function Bubble() {
    return (
        <View style={styles.bubbleContainer}>
          <Text style={styles.bubbleText}>Ask me a question with "hey..."</Text>
        </View>
    );

    const styles = StyleSheet.create({
        bubbleContainer: {
          position: 'absolute',
          left: 20,
          right: 20,
          bottom: 20,
          height: 80,
          backgroundColor: '#ffffff',
          borderRadius: 40,
          justifyContent: 'center',
          alignItems: 'center',
          elevation: 3,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.2,
          shadowRadius: 2.5,
        },
        bubbleText: {
          color: '#000',
          fontSize: 16,
          textAlign: 'center',
        },
    });
}