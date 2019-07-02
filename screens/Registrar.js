import React from 'react';
import { ScrollView, StyleSheet, Text, TextInput, Button, Alert } from 'react-native';

export default class Registrar extends React.Component {
	static navigationOptions = {
		title: 'Registrarse',
	};
	state = {
		nombre: '',
		contrasena: '',
	}
	handlePress = () => {
		let bandera = this.props.navigation.state.params.handleRegistro(this.state.nombre, this.state.contrasena, Alert.alert);
	}
	render() {
		return (
			<ScrollView style={styles.container}>
				<TextInput
					style={{height: 40}}
					placeholder="Nombre"
					onChangeText={(text)=>{this.setState({nombre: text})}}
				/>
				<TextInput
					style={{height: 40}}
					placeholder="Contraseña"
					onChangeText={(text)=>{this.setState({contrasena: text})}}
				/>
				<Button
					title="Aceptar"
					onPress={this.handlePress}>
				</Button>
			</ScrollView>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		paddingTop: 15,
		backgroundColor: '#fff',
	},
});
