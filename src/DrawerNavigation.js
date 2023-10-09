import {createAppContainer} from 'react-navigation';
import {createDrawerNavigator} from 'react-navigation-drawer';
import Menu from './screens/Menu';
import DrawerMenu from './components/DrawerMenu';

const AppDrawerNavigator = createDrawerNavigator(
  {
    Menu: {
      screen: Menu,
    },
  },
  {
    contentComponent: DrawerMenu,
    drawerType: 'slide',
    headerMode: 'none',
    initialRouteName: 'Menu',
  },
);

const AppContainer = createAppContainer(AppDrawerNavigator);

export default AppContainer;
