import 'react-native-gesture-handler';
import React from "react"
import { NavigationContainer } from "@react-navigation/native";
import Stacknav from "./screens/Stacknav";
import { Provider } from 'react-redux';
import { myStore } from './newredux/Store';


const App = () => {


  return (
    <Provider store={myStore}>
      <NavigationContainer>
        <Stacknav />
      </NavigationContainer>
    </Provider>
  )
}
export default App;
