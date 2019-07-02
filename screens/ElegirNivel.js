import React from 'react';
import { View, Text, Button } from 'react-native';

export default class ElegirNivel extends React.Component {
	static navigationOptions = {
		title: 'Elegir Nivel',
	};
	handlePress = (dificultad) => {
		let state = this.props.navigation.state.params;
		state.handleDificultad(dificultad)
		console.log(this.props.navigation.state.params.usuario);
		if(this.props.navigation.state.params.usuario !== undefined){
			this.props.navigation.navigate('Juego', {usuario: this.props.navigation.state.params.usuario, dificultad: dificultad});
		}else{
			this.props.navigation.navigate('Main', {dificultad: dificultad});
		}
	}
	render() {
		let state = this.props.navigation.state.params;
		return (
			<View>
				<Button
					title='Facil'
					onPress={() => {this.handlePress(0)}}/>
				<Button
					title='Intermedio'
					onPress={() => {this.handlePress(1)}}/>
				<Button
					title='Dificil'
					onPress={() => {this.handlePress(2)}}/>
				<Button
					title='Jugar con un Amigo'
					onPress={() => {this.handlePress(-1)}}/>
			</View>
		)
	}
}
