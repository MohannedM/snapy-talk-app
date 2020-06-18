import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const EditPost: React.FC = (props) => {
    return (
        <View style={styles.container}>
            <Text>HELLO I AM THE Edit Post</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignContent: 'center',
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default EditPost;
