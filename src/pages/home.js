import React, { Component } from 'react';
import { View, Image, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  stretch: {
    width: 430,
    height: 682,
    resizeMode: 'stretch'
  }
});

export default class DisplayAnImageWithStyle extends Component {
  render() {
    return (
      <View>
        <Image
          style={styles.stretch}
          source={require('../../assets/home.png')}
        />
      </View>
    );
  }
  
}

