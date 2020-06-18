import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const PostDetails: React.FC = (props) => {
    return (
        <View style={styles.container}>
            <Text>HELLO I AM THE POST DETAILS</Text>
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

export default PostDetails;
