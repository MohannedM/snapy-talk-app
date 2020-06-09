import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AuthNavigation from './AuthNavigation';

const Stack = createStackNavigator();

const AppNavigator: React.FC = (props) => {
    return (
        <NavigationContainer>
            <AuthNavigation />
        </NavigationContainer>
    );
};

export default AppNavigator;
