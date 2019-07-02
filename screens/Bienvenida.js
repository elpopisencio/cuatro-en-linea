import React from 'react';
import { Button, ScrollView, StyleSheet, Text } from 'react-native';
import { SQLite } from 'expo';

const db = SQLite.openDatabase('db.db');

export default class Bienvenida extends React.Component {
	state = {
		items: null,
	};

	static navigationOptions = {
		title: 'Bienvenida',
	};

	componentWillMount(){
		db.transaction(tx => {
			tx.executeSql(
				`create table if not exists items (id integer primary key not null, done int, value text);`,
				[],
				() => console.log('bienvenida'),
				(_,e) => console.log(e)
			);
			tx.executeSql(
				`insert into items (done, value) values (0, ?);`,
				["prueba"]
			)
			tx.executeSql(
				`select * from items;`,
				[],
				(_, { rows: {_array} }) => {
					console.log(_array);
					return this.setState({items: _array});
				},
				(_, e) => {console.log(e);}
			);
		});
	}
	componentDidMount(){
		db.transaction(tx => {
			tx.executeSql(
				`select * from items;`,
				[],
				(_, { rows: {_array} }) => {
					console.log(_array);
					return this.setState({items: _array});
				},
				(_, e) => {console.log(e);}
			);
		});
	}

	render() {
		let touchables;
		const items = this.state.items;
		if(!(items === null || items.length === 0)){
			touchables = items.map(({ id, done, value }) => (
				<Text key={id}>{value}</Text>
			));
		}
		return (
			<ScrollView style={styles.container}>
				<Button
					title="Pepe"
					onPress={() => this.props.navigation.navigate('Links')}>
				</Button>
				<Button
					title="Settings"
					onPress={() => this.props.navigation.navigate('Settings')}>
				</Button>
				<Text>Pepe</Text>
				{touchables}
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
