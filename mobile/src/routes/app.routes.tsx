import { createNativeStackNavigator } from "@react-navigation/native-stack";

const { Navigator, Screen } = createNativeStackNavigator()

import { Home } from "../screens/home";
import { Habit } from "../screens/Habit";
import { New } from "../screens/New";

export function AppRoutes() {
    return <Navigator screenOptions={{headerShown: false}}>
        <Screen
            name="home"
            component={Home}
        />
        <Screen
            name="habit"
            component={Habit}
        />
        <Screen
            name="new habit"
            component={New}
        />
    </Navigator>
}