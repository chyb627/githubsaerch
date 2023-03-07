import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import {Provider} from 'react-redux';
import {TypeIconName} from './src/components/Icons';
import {TabIcon} from './src/components/TabIcon';
import FavoriteScreen from './src/screens/FavoriteScreen';
import HomeScreen from './src/screens/HomeScreen';
import DetailScreen from './src/screens/DetailScreen';
import store from './src/store';
import {BottomTabsParamList, RootStackParamList} from './src/types/types';

const Stack = createNativeStackNavigator<RootStackParamList>();
const BottomTab = createBottomTabNavigator<BottomTabsParamList>();

const BottomTabScreen = () => {
  return (
    <BottomTab.Navigator
      screenOptions={({route}) => ({
        headerShown: false,
        tabBarIcon: ({color}) => {
          const getIconName = (): TypeIconName => {
            if (route.name === 'Home') {
              return 'home';
            }
            return 'star';
          };
          const routeIconName = getIconName();
          return <TabIcon iconName={routeIconName} iconColor={color} />;
        },
      })}>
      <BottomTab.Screen name="Home" component={HomeScreen} />
      <BottomTab.Screen name="Favorite" component={FavoriteScreen} />
    </BottomTab.Navigator>
  );
};

const Screens = () => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{headerShown: false}}>
          <Stack.Screen name="BottomTab" component={BottomTabScreen} />
          <Stack.Screen name="Detail" component={DetailScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
};

const App = () => {
  return <Screens />;
};

export default App;
