import React from 'react';
import { Button, ScrollView, StyleSheet, Text, BackHandler } from 'react-native';
import { SQLite } from 'expo';

const db = SQLite.openDatabase('db.db');

export default class Principal extends React.Component {
	state = {
		dificultad: 0,
	};

	static navigationOptions = {
		title: 'Cuatro en Linea',
	};
	componentWillMount(){
		let params = this.props.navigation.state.params;
		if(params){
			console.log(params);
			this.setState({...this.state,...params});
		}
		db.transaction(tx => {
			
			tx.executeSql(
				`drop table if exists usuarios;`,
				[],
				() => console.log('usuarios borrados'),
				(_,e) => console.log(e)
			);
			
			tx.executeSql(
				`create table if not exists usuarios (nombre text primary key not null, contrasena text, record int);`,
				[],
				() => console.log('principal'),
				(_,e) => console.log(e)
			);
			tx.executeSql(
				`select * from usuarios;`,
				[],
				(_, { rows: {_array} }) => {
					//console.log(_array);
					return this.setState({usuarios: _array});
				},
				(_, e) => {console.log(e);}
			);
		});
	}
		/*
	componentDidMount(){
		db.transaction(tx => {
			tx.executeSql(
				`select * from usuarios;`,
				[],
				(_, { rows: {_array} }) => {
					console.log(_array);
					return this.setState({usuarios: _array});
				},
				(_, e) => {console.log(e);}
			);
		});
	}
	*/
	handleLogueo = (nombre, contrasena, alert) => {
		db.transaction(tx => {
			tx.executeSql(
				`select * from usuarios where nombre=? and contrasena=?;`,
				[nombre, contrasena],
				(_, { rows: {_array} }) => {
					//console.log(_array);
					if(_array.length === 0){
						alert('El usuario o contraseña no son correctos');
					}else{
						alert('Te logueaste papaa!!');
						this.setState({usuario: _array});
					}
				},
				(_, e) => {alert('El usuario o contraseña no son correctos');console.log(e);}
			);
		});
	}
	handleRegistro = (nombre, contrasena, alert) => {
		if(nombre !== '' && contrasena !== ''){
			db.transaction(tx => {
				tx.executeSql(
					`insert into usuarios (nombre, contrasena) values (?, ?);`,
					[nombre, contrasena],
					(_, { rows: {_array} }) => {
						alert('Usuario cargado con exito');
						//console.log(_array);
					},
					(_, e) => {alert('El usuario ya existe');console.log(e);}
				);
				tx.executeSql(
					`select * from usuarios;`,
					[],
					(_, { rows: {_array} }) => {
						console.log(_array);
						return this.setState({usuarios: _array});
					},
					(_, e) => {console.log(e);}
				);
			});
		}else{
			alert('El nombre y la contraseña deben ser completados');
		}
	}
	handleDificultad = (dificultad) => {
		let numero = Number(dificultad);
		this.setState({
			dificultad: numero,
		});
	}
	render() {
		return (
			<ScrollView style={styles.container}>
				<Button
					title="Registrarse"
					onPress={() => this.props.navigation.navigate('Registrar', {handleRegistro: this.handleRegistro})}>
				</Button>
				<Button
					title="Loguearse"
					onPress={() => this.props.navigation.navigate('Loguear', {handleLogueo: this.handleLogueo})}>
				</Button>
				<Button
					title="Elegir Nivel"
					onPress={() => this.props.navigation.navigate('ElegirNivel', {
						dificultad: this.state.dificultad, 
						handleDificultad: this.handleDificultad,
						usuario: this.state.usuario,
					})}>
				</Button>
				<Button
					title="Ranking"
					onPress={() => this.props.navigation.navigate('Ranking', {usuarios: this.state.usuarios})}>
				</Button>
				<Button
					title="Juego"
					onPress={() => this.props.navigation.navigate('Juego', {usuario: this.state.usuario, dificultad: this.state.dificultad})}>
				</Button>
				<Button
					title="Habilitar/Deshabilitar Sonido"
					onPress={() => {}}>
				</Button>
				<Button
					title="Salir"
					onPress={() => {BackHandler.exitApp()}}>
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
