import { ActivityIndicator, View, StyleSheet } from 'react-native'
import React from 'react'
const global = require('../../css/css')

export default function LoadingFullScreen() {
    return (
        <View style={styles.container}>
            <ActivityIndicator size="large" color={global.baseColor} />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
  });
  