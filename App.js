import React, { Component } from 'react';
import {Platform, StyleSheet, Text, View, FlatList, TextInput, Button} from 'react-native';
import Item from './src/item';

export default class TodoOnline extends Component {

  constructor(props) {
    super(props);
    this.state = {
        lista:[],
        input:''
    };

    this.url = 'https://b7web.com.br/todo/33431';
    this.loadLista = this.loadLista.bind(this);
    this.addButton = this.addButton.bind(this);

    this.loadLista();

  }

  loadLista(){

  	 // Buscando o WebService //
    fetch(this.url)
      .then((r)=>r.json())
      .then((json)=>{
        let state = this.state;
        state.lista = json.todo;
        this.setState(state);
      });

  }

  addButton(){
  	let texto = this.state.input;
  	let state = this.state;

  	state.input = '',
  	this.setState(state);
  	
  	fetch(this.url, {
  		method:'POST',
  		headers:{
  			'Accept':'application/json',
  			'Content-Type':'application/json'
  		},
  		body:JSON.stringify({
  			item:texto
  		})
  	})
  		.then((r)=>r.json())
  		.then((json)=>{
  			this.loadLista();
  		})
  }


  render() {
    return (
      <View style={styles.container}>
        <View style={styles.addArea}>
          <Text style={styles.addTxt}>Adicione uma nova tarefa</Text>
        	<TextInput style={styles.input} onChangeText={(text) => {
            let state = this.state;
            state.input = text;
            this.setState(state);
          }} value={this.state.input} />
          <Button title="Adicionar" onPress={this.addButton} />
        </View>
        <FlatList
          data={this.state.lista}
          renderItem={({item})=> <Item data={item} url={this.url} loadFunction={this.loadLista} />}
          keyExtractor={(item, index)=>item.id}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  addArea: {
  	marginBottom: 20,
  	backgroundColor: '#DDDDDD'
  },
  input: {
  	marginTop: 20

  },
  addTxt:{
  	fontSize: 14,
  	textAlign: 'center',
  	marginBottom: 10
  }

});
