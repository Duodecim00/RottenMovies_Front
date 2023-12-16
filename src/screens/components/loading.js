import { View, Dimensions, StyleSheet } from 'react-native';
import React from 'react';
import * as Progress from 'react-native-progress';
const {width, height} =  Dimensions.get('window');

export default function Loading() {
  return (
    <View style={styles.container}>
        <Progress.CircleSnail thickness={12} size={160} color={styles.backgroundColor} />
    </View>
  );
  }

const styles = StyleSheet.create({
  container: {
    width: width,
    height: height,
    position: 'absolute',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  color:{
    background:'#eab308',
  }
});