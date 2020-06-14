import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Home: React.FC = (props) => {
    return (
        <View style={styles.container}>
            <Text>HELLO, THIS IS HOME</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        textAlign: 'center',
        justifyContent: 'center',
    },
});

export default Home;
