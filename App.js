import 'react-native-gesture-handler';
import React from "react"
import { NavigationContainer } from "@react-navigation/native";
import Stacknav from "./screens/Stacknav";
import { Provider } from 'react-redux';
import store, { myStore, persistor } from './newredux/Store';
import { PersistGate } from 'redux-persist/integration/react';


const App = () => {


  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
      <NavigationContainer>
        <Stacknav />
      </NavigationContainer>
      </PersistGate>
    </Provider>
  )
}
export default App;
