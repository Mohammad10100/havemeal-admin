import { SafeAreaView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useRoute } from '@react-navigation/native';

export default function CategoryDetailsScreen() {
    const route = useRoute();
    const { id } = route.params;
  return (
    <SafeAreaView>
      <Text>Category ID: {id}</Text>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({})