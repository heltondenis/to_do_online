import React, { Component } from 'react';
import {Platform, StyleSheet, Text, View, TouchableHighlight} from 'react-native';

export default class Item extends Component {

	constructor(props) {
	  super(props);
	  this.state = {
	  	// Se o done == 1 então state fica como style done senao fica undone
	  	done:(this.props.data.done =='1') ? styles.done : styles.undone
	  };
	  this.marcar = this.marcar.bind(this);
	}

	marcar(){
		let state = this.state;
		let done = 'sim';
		if (this.state.done == styles.undone) {
			state.done = styles.done;
			done = 'sim';
		} else {
			state.done = styles.undone;
			done = 'nao';
		}

		fetch(this.props.url+'/'+this.props.data.id,	 {
  		method:'PUT',
  		headers:{
  			'Accept':'application/json',
  			'Content-Type':'application/json'
  		},
  		body:JSON.stringify({
  			done:done
  		})
  	})
  		.then((r)=>r.json())
  		.then((json)=>{
  		})

		this.setState(state);
	}

  render() {
    return (
      <View style={styles.area}>
      	<TouchableHighlight style={[styles.marcarArea, this.state.done]} onPress={this.marcar}> 
      		<View>
      			
      		</View>
      	</TouchableHighlight>
        <Text>{this.props.data.item}</Text>
      </View>

    );
  }
}

const styles = StyleSheet.create({
	area:{
		paddingTop: 10,
		paddingBottom: 10,
		borderBottomWidth: 1,
		borderColor: '#000000',
		flex: 1,
		flexDirection:'row',
		alignItems: 'center'
	},
	marcarArea:{
		width: 40,
		height: 40,
		marginLeft: 10,
		marginRight: 10
	},
	undone:{
		backgroundColor:'#CCCCCC'
	},
	done:{
		backgroundColor:'#00FF00'
	}
});
