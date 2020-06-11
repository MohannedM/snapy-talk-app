import React from 'react';
import { View, Text, Platform, StyleSheet, ViewStyle, TextStyle } from 'react-native';
import Colors from '../../constants/Colors';
import { TouchableOpacity, TouchableNativeFeedback } from 'react-native-gesture-handler';

interface Props {
    onPress: () => any;
    style?: ViewStyle;
    type: 'Primary' | 'Secondary';
}

const CustomButton: React.FC<Props> = (props) => {
    let TouchableCmp: any = TouchableOpacity;
    if (Platform.OS === 'android') {
        TouchableCmp = TouchableNativeFeedback;
    }
    return (
        <TouchableCmp activeOpacity={0.6} onPress={props.onPress}>
            <View
                style={{
                    ...props.style,
                    ...styles.button,
                    ...{ backgroundColor: props.type === 'Primary' ? Colors.primary[1] : Colors.secondary[1] },
                }}
            >
                <Text style={styles.buttonText}>{props.children}</Text>
            </View>
        </TouchableCmp>
    );
};

// interface CustomFont {
//     fontStyle?: 'open-sans' | 'open-sans-bold';
// }
interface Styles {
    button: ViewStyle;
    buttonText: TextStyle;
}

const styles = StyleSheet.create<Styles>({
    button: {
        borderRadius: 10,
        padding: 12,
    },
    buttonText: {
        color: '#fff',
        textAlign: 'center',
        fontWeight: '700',
    },
});

export default CustomButton;
