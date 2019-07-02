import gano from './chequearGano';

export default function jugar(tablero, dificultad, jugador, oponente){
	let resultado;
	let columnas = tablero.reduce((columnas, actual, i, tablero) => {
		if(tablero[i].length < 6){
			return [...columnas, i];
		}
		return columnas;
	}, []);
	if(columnas.length === 0){
		return false;
	}
	switch (dificultad){
		case 2: {
			resultado = columnas.find((columna, i) => {
				return gano(tablero, tablero[columna].length, columna, oponente)
			});
			if(resultado !== undefined){
				return resultado;
			}
		}
		case 1: {
			resultado = columnas.find((columna, i) => {
				return gano(tablero, tablero[columna].length, columna, jugador)
			});
			if(resultado !== undefined){
				return resultado;
			}
		}
		case 0: {
			return columnas[Math.floor(Math.random() * columnas.length)];
		}
		default: {
			return false;
		}
	}
}
