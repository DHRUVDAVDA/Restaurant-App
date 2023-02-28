import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Homescreen from "./Homescreen";
import { Image } from 'react-native';
import Restaurants from "./Restaurants";

const Tab = createBottomTabNavigator();

const Bottomtab = () => {
    return (
        <Tab.Navigator screenOptions={({ }) => ({
            tabBarStyle: { height: 55, backgroundColor: '#100f1f' }, tabBarActiveTintColor: '#fd9827', tabBarInactiveTintColor: 'white'
        })}>
            <Tab.Screen name="FOOD" component={Homescreen}
                options={{
                    tabBarIcon: () => (<Image source={require("../Images/hamburger.png")}
                        style={{ width: 20, height: 20 }} />),
                        headerStyle: { backgroundColor: '#100f1f' },
                        headerTitleStyle: { color: 'white' },
                        headerTintColor: 'white',
                        headerTitleAlign: 'center',
                        title:'Foodie',
                }}
            />

            <Tab.Screen name="RESTAURANT" component={Restaurants}
                options={{
                    tabBarIcon: () => (<Image source={require("../Images/cafe.png")}
                    style={{ width: 20, height: 20 }} />),
                    headerStyle: { backgroundColor: '#100f1f' },
                    headerTitleStyle: { color: 'white' },
                    headerTintColor: 'white',
                    headerTitleAlign: 'center',
                    title:'Restaurants',        
                }}
            />
        </Tab.Navigator>
    )
}
export default Bottomtab;