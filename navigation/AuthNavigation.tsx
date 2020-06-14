import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Register, { registerScreenOptions } from '../screens/Register';
import Login, { loginScreenOptions } from '../screens/Login';

const Stack = createStackNavigator();

const AuthNavigation: React.FC = (props) => {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Register" component={Register} options={registerScreenOptions} />
            <Stack.Screen name="Login" component={Login} options={loginScreenOptions} />
        </Stack.Navigator>
    );
};

export default AuthNavigation;
