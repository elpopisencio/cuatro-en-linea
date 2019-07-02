import React from 'react';
import { View, StyleSheet, TouchableOpacity, Text, Alert } from 'react-native';
import gano from '../logica/chequearGano';
import jugar from '../logica/jugador';

export default class Juego extends React.Component {
	static navigationOptions = {
		title: 'Juego',
	};
	componentWillMount(){
		let jugadorUno = 'Rojo';
		let jugadorDos = 'Azul';
		this.setState({
			contador: 0,
			jugadorActual: (Math.random() >= 0.5) ? jugadorUno : jugadorDos,
			jugadorUno: jugadorUno,
			jugadorDos: jugadorDos,
			tablero: [[],[],[],[],[],[],[]],
		}, this.seguirJugando);
	}
	cambiarJugador = () => {
		this.setState({
			contador: this.state.contador + 1,
			jugadorActual: (this.state.jugadorActual === this.state.jugadorUno) ? this.state.jugadorDos : this.state.jugadorUno
		}, this.seguirJugando)
	}
	seguirJugando = () => {
		let dificultad = this.props.navigation.state.params.dificultad;
		if(this.state.jugadorActual === this.state.jugadorDos && dificultad >= 0){
			this.agregarFicha(jugar(this.state.tablero, dificultad, this.state.jugadorActual, this.state.jugadorActual === this.state.jugadorUno ? this.state.jugadorDos : this.state.jugadorUno));
		}
	}
	chequearGano = (tablero, columna, jugador) => {
		if(gano(tablero, tablero[columna].length - 1, columna, jugador)){
			let puntaje = ((42 - this.state.contador) * (this.props.navigation.state.params.dificultad + 1) * 10);
			Alert.alert('Gano el jugador ' + jugador + ' con: ' + puntaje + ' puntos');
			this.props.navigation.navigate('Main', {puntaje: puntaje, usuario: this.props.navigation.state.params.usuario});
		}else{
			this.cambiarJugador();
		}
	}
	agregarFicha = (columna) => {
		let tablero = this.state.tablero.map((columna) => [...columna]);
		let fichas = tablero[columna];
		let jugador = this.state.jugadorActual;
		if(fichas.length < 6){
			fichas.push(jugador);
			tablero[columna] = fichas;
			this.setState({
				tablero: tablero,
			}, () => {this.chequearGano(tablero, columna, jugador)});
		}
	}
	render() {
		let props = {
			agregarFicha: this.agregarFicha,
			tablero: this.state.tablero,
			jugador: this.state.jugador,
			cambiarJugador: this.cambiarJugador,
		};
		return (
			<View style={styles.container}>
				<View style={styles.board}>
					<Columna {...props} columna={0} style={styles.impar}/>
					<Columna {...props} columna={1} style={styles.par}/>
					<Columna {...props} columna={2} style={styles.impar}/>
					<Columna {...props} columna={3} style={styles.par}/>
					<Columna {...props} columna={4} style={styles.impar}/>
					<Columna {...props} columna={5} style={styles.par}/>
					<Columna {...props} columna={6} style={styles.impar}/>
				</View>
				<Text>Le toca al jugador {this.state.jugadorActual}</Text>
			</View>
		)
	}
}

class Columna extends React.Component {
	render(){
		let fichas = this.props.tablero[this.props.columna];
		fichas = fichas.map((ficha, i) => {
			return (
				<View key={i} style={(ficha === 'Rojo') ? styles.fichaRoja : styles.fichaAzul}/>
			)
		});
		return (
			<TouchableOpacity 
				onPress={() => {this.props.agregarFicha(this.props.columna)}}
				style={this.props.style}>
				{fichas}
			</TouchableOpacity>
		)
	}
}

const styles = StyleSheet.create({
	container: {
		backgroundColor: 'beige',
		padding: 'auto',
	},
	board: {
		display:'flex',
		flexDirection: 'row',
		justifyContent: 'center',
		height: 274,
		width: 315,
		marginTop: 20
	},
	impar: {
		flex:1,
		borderWidth: 1,
		backgroundColor: 'white',
		flexDirection: 'column-reverse',
	},
	par: {
		flex:1,
		borderTopWidth: 1,
		borderBottomWidth: 1,
		backgroundColor: '#f9f9f9',
		flexDirection: 'column-reverse',
	},
	fichaRoja: {
		borderRadius: 22,
		height: 45,
		backgroundColor: 'red',
	},
	fichaAzul: {
		borderRadius: 22,
		height: 45,
		backgroundColor: 'blue',
	}
});
