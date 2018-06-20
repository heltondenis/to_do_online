import React, { Component } from 'react';
import {Platform, StyleSheet, Text, View, FlatList} from 'react-native';
import Item from './src/item';

export default class TodoOnline extends Component {

  constructor(props) {
    super(props);
    this.state = {
        lista:[]
    };

    // Buscando o WebService //
    fetch('https://b7web.com.br/todo/33431')
      .then((r)=>r.json())
      .then((json)=>{
        let state = this.state;
        state.lista = json.todo;
        this.setState(state);
      });
  }

  render() {
    return (
      <View style={styles.container}>
        <FlatList
          data={this.state.lista}
          renderItem={({item})=> <Item data={item} />}
          keyExtractor={(item, index)=>item.id}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },

});
