import React, { Component } from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';

export default class Item extends Component {

  render() {
    return (
      <View>
        <Text>{this.props.data.item}</Text>
      <Text>{this.props.data.id}</Text>
      </View>

    );
  }
}

const styles = StyleSheet.create({

});
