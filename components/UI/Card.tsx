import React from 'react';
import { View, Text, StyleSheet, ViewStyle, ViewProps, StyleSheetProperties } from 'react-native';
import Colors from '../../constants/Colors';
interface Styles {
    container: ViewStyle;
}

const Card: React.FC<ViewProps> = (props) => {
    return (
        <View style={{ ...styles.container, ...(props as { style: StyleSheetProperties }).style }}>
            {props.children}
        </View>
    );
};

const styles = StyleSheet.create<Styles>({
    container: {
        padding: 10,
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowOpacity: 0.34,
        shadowRadius: 6.27,
        elevation: 10,
    },
});

export default Card;
