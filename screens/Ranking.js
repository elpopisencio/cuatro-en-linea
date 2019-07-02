import React from 'react';
import { Text, ScrollView } from 'react-native';

export default class Ranking extends React.Component {
	static navigationOptions = {
		title: 'Ranking',
	};
	render() {
		const usuarios = this.props.navigation.state.params.usuarios;
		usuarios.sort((a,b) => {
			return a.record - b.record;
		});
		let list;
		if(usuarios){
			list = usuarios.map((usuario) => {
				if(usuario.record !== null){
					return <Text key={usuario.nombre}>{'Nombre: ' + usuario.nombre + ' - Puntaje: ' + usuario.record}</Text>
				}
				return null
			})
		}
		return (
			<ScrollView>
				{list}
			</ScrollView>
		)
	}
}
