/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import { NavigationContainer, createNavigationContainerRef } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React, { useEffect, useState } from 'react';
import {
  StatusBar
} from 'react-native';
import TrackPlayer from 'react-native-track-player';
import { Provider } from 'react-redux';
import { store } from './src/redux';
import AfterSplashScreen from './src/screens/AfterSplashScreen';
import AyatScreen from './src/screens/AyatScreen/AyatScreen';
import BookmarkScreen from './src/screens/BookmarkScreen';
import HomeScreen from './src/screens/HomeScreen/HomeScreen';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import PlayerBar from './src/components/organisms/PlayerBar/PlayerBar';

const Stack = createNativeStackNavigator();
export const navigationRef = createNavigationContainerRef()
const App = () => {
  const [routeName, setRouteName] = useState();

  useEffect(() => {
    initSetupPlayer()
    return;
  }, [])

  const initSetupPlayer = async () => {
    await TrackPlayer.setupPlayer()
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Provider store={store} >
        <StatusBar barStyle={'dark-content'} translucent={true} backgroundColor={'rgba(255,255,255,0.0)'} />
        <NavigationContainer

          ref={navigationRef}
          onReady={() => {
            setRouteName(navigationRef.getCurrentRoute().name)
          }}
          onStateChange={async () => {
            const previousRouteName = routeName;
            const currentRouteName = navigationRef.getCurrentRoute().name;
            console.log("route", currentRouteName)
            setRouteName(currentRouteName);
          }}
        >
          <Stack.Navigator
            detachInactiveScreens={false}
            screenOptions={{
              animation: 'slide_from_right'
            }}
          >
            <Stack.Screen
              name="AfterSplashScreen"
              options={{
                headerShown: false
              }}
              component={AfterSplashScreen}
            />
            <Stack.Screen
              name="HomeScreen"
              options={{
                headerShown: false
              }}
              component={HomeScreen}
            />
            <Stack.Screen
              name="AyatScreen"
              options={{
                headerShown: false
              }}
              component={AyatScreen}
            />
            <Stack.Screen
              name="BookmarkScreen"
              options={{
                headerShown: false
              }}
              component={BookmarkScreen}
            />
          </Stack.Navigator>
          {routeName !== "AfterSplashScreen" ?
            <PlayerBar />
            : null
          }
        </NavigationContainer>
      </Provider>
    </GestureHandlerRootView>
  );
};


export default App;
