/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useEffect } from 'react';
import 'react-native-gesture-handler'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import MobileNumberScreen from './src/screens/MobileNumberScreen';
import ProductsScreen from './src/screens/ProductsScreen';
import ProductDetailScreen from './src/screens/ProductDetailScreen';
import AddProductScreen from './src/screens/AddProductScreen';
import firebase from '@react-native-firebase/app';

const firebaseConfig = {
  apiKey: "AIzaSyCwCqtl0jSjwfz4qcqWBYMGdMaJEIRI1Gg",
  authDomain: "productapp-fee0a.firebaseapp.com",
  projectId: "productapp-fee0a",
  storageBucket: "productapp-fee0a.appspot.com",
  messagingSenderId: "your_messaging_sender_id",
  appId: "1:922998522812:android:656d21a31e8709f55ca1b9",
};

const Stack = createStackNavigator();

function App(): React.JSX.Element {

  useEffect(() => {
    firebase.initializeApp(firebaseConfig);
  }, [])

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="MobileNumber" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="MobileNumber" component={MobileNumberScreen} />
        <Stack.Screen name="Products" component={ProductsScreen} />
        <Stack.Screen name="ProductDetail" component={ProductDetailScreen} />
        <Stack.Screen name="AddProduct" component={AddProductScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}


export default App;
