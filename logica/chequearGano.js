export default function gano(tablero, fila, columna, jugador){
	if(vertical(0, tablero, fila, columna, jugador) >= 3){
		return true;
	}
	if(horizontalIzquierda(0, tablero, fila, columna, jugador) + horizontalDerecha(0, tablero, fila, columna, jugador) >= 3){
		return true;
	}
	if(crecienteIzquierda(0, tablero, fila, columna, jugador) + crecienteDerecha(0, tablero, fila, columna, jugador) >= 3){
		return true;
	}
	if(decrecienteIzquierda(0, tablero, fila, columna, jugador) + decrecienteDerecha(0, tablero, fila, columna, jugador) >= 3){
		return true;
	}
}

function horizontalIzquierda(total, tablero, fila, columna, jugador){
	if(columna - 1 >= 0 && tablero[columna - 1][fila] === jugador){
		return horizontalIzquierda(total + 1, tablero, fila, columna - 1, jugador);
	}
	return total;
}
function horizontalDerecha(total, tablero, fila, columna, jugador){
	if(columna + 1 <= 6 && tablero[columna + 1][fila] === jugador){
		return horizontalDerecha(total + 1, tablero, fila, columna + 1, jugador);
	}
	return total;
}

function vertical(total, tablero, fila, columna, jugador){
	if(fila - 1 >= 0 && tablero[columna][fila - 1] === jugador){
		return vertical(total + 1, tablero, fila - 1, columna, jugador);
	}
	return total;
}

function crecienteIzquierda(total, tablero, fila, columna, jugador){
	if(columna - 1 >= 0 && fila - 1 >= 0 && tablero[columna - 1][fila - 1] === jugador){
		return crecienteIzquierda(total + 1, tablero, fila - 1, columna - 1, jugador);
	}
	return total;
}

function crecienteDerecha(total, tablero, fila, columna, jugador){
	if(columna + 1 <= 6 && fila + 1 <= 5 && tablero[columna + 1][fila + 1] === jugador){
		return crecienteDerecha(total + 1, tablero, fila + 1, columna + 1, jugador);
	}
	return total;
}

function decrecienteIzquierda(total, tablero, fila, columna, jugador){
	if(columna - 1 >= 0 && fila + 1 <= 5 && tablero[columna - 1][fila + 1] === jugador){
		return decrecienteIzquierda(total + 1, tablero, fila + 1, columna - 1, jugador);
	}
	return total;
}

function decrecienteDerecha(total, tablero, fila, columna, jugador){
	if(columna + 1 <= 6 && fila + 1 >= 0 && tablero[columna + 1][fila - 1] === jugador){
		return decrecienteDerecha(total + 1, tablero, fila - 1, columna + 1, jugador);
	}
	return total;
}

