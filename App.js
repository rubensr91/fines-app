import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Login from "./Login";
import Signup from "./Signup";
import Dashboard from "./Dashboard";
import FineDetail from "./FineDetail";
import Constants from 'expo-constants';
const appConfig = Constants.manifest;

const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Signup" component={Signup} />
        <Stack.Screen name="Dashboard" component={Dashboard} />
        <Stack.Screen name="FineDetail" component={FineDetail} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
