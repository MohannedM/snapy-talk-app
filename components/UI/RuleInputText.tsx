import React from 'react';
import { View, TextInput, Text, StyleSheet, TextInputProps } from 'react-native';
import Colors from '../../constants/Colors';

interface IProps extends TextInputProps {
    hasError?: boolean;
    errorMessage: string;
    style?: {};
}

const RuleInputText: React.FC<IProps> = (props) => {
    return (
        <View>
            <TextInput {...props} style={{ ...styles.inputs, ...props.style }} />
            {props.hasError && <Text style={styles.errorMessage}>{props.errorMessage}</Text>}
        </View>
    );
};

const styles = StyleSheet.create({
    inputs: {
        padding: 10,
        margin: 10,
        borderRadius: 10,
        borderColor: '#eee',
        borderWidth: 1,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.18,
        shadowRadius: 1.0,
        elevation: 1,
    },
    errorMessage: {
        color: Colors.primary[2],
        fontSize: 10,
    },
});

export default RuleInputText;
