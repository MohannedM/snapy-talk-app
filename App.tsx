import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Register from './screens/Register';
import AppNavigator from './navigations/AppNavigator';

export default function App() {
    return <AppNavigator />;
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
