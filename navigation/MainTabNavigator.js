import { StackNavigator } from 'react-navigation';

import Principal from '../screens/Principal';
import Registrar from '../screens/Registrar';
import Loguear from '../screens/Loguear';
import ElegirNivel from '../screens/ElegirNivel';
import Ranking from '../screens/Ranking';
import Juego from '../screens/Juego';

export default StackNavigator(
  {
    Main: {
      screen: Principal,
    },
    Registrar: {
      screen: Registrar,
    },
    Loguear: {
      screen: Loguear,
    },
    ElegirNivel: {
      screen: ElegirNivel,
    },
    Ranking: {
      screen: Ranking,
    },
    Juego: {
      screen: Juego,
    },
  },
  {
    navigationOptions: () => ({
      headerTitleStyle: {
        fontWeight: 'normal',
      },
    }),
  }
);
