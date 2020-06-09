import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Login: React.FC = (props) => {
    return (
        <View style={styles.container}>
            <Text>I AM THE LOGIN</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});

export const loginScreenOptions = () => {
    return {
        headerTitle: 'Login',
    };
};

export default Login;
