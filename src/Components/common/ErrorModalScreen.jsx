import {View, StyleSheet } from 'react-native'
import React from 'react'
const global = require('../../css/css')

export default function ErrorModalScreen({props}) {
    const description = props.description
    return (
        <View style={styles.container}>
            <Text>Something Went Wrong</Text>
            <Text>{description}</Text>
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
  