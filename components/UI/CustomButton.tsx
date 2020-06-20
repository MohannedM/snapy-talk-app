import React from 'react';
import { View, Text, ActivityIndicator, StyleSheet, ViewStyle, TextStyle } from 'react-native';
import Colors from '../../constants/Colors';
import { TouchableOpacity } from 'react-native-gesture-handler';

interface Props {
    onPress: () => any;
    style?: ViewStyle;
    type: 'Primary' | 'Secondary';
    isDisabled?: boolean;
    isLoading?: boolean;
    strength?: 0 | 1 | 2;
}

const CustomButton: React.FC<Props> = (props) => {
    const bgColor = {
        Primary: props.isDisabled ? Colors.primary[0] : Colors.primary[props.strength ? props.strength : 1],
        Secondary: props.isDisabled ? Colors.secondary[0] : Colors.secondary[props.strength ? props.strength : 1],
    };
    return (
        <TouchableOpacity activeOpacity={0.6} onPress={props.onPress} disabled={props.isDisabled}>
            <View
                style={{
                    ...props.style,
                    ...styles.button,
                    ...{ backgroundColor: bgColor[props.type] },
                }}
            >
                <View>
                    <Text style={styles.buttonText}>{props.children}</Text>
                </View>
                {props.isLoading && (
                    <View style={styles.spinner}>
                        <ActivityIndicator
                            color={props.type === 'Primary' ? Colors.primary[0] : Colors.secondary[0]}
                            size="small"
                        />
                    </View>
                )}
            </View>
        </TouchableOpacity>
    );
};

// interface CustomFont {
//     fontStyle?: 'open-sans' | 'open-sans-bold';
// }
interface Styles {
    button: ViewStyle;
    buttonText: TextStyle;
    spinner: ViewStyle;
}

const styles = StyleSheet.create<Styles>({
    button: {
        flexDirection: 'row',
        borderRadius: 10,
        justifyContent: 'center',
        padding: 12,
    },
    buttonText: {
        color: '#fff',
        textAlign: 'center',
        fontWeight: '700',
    },
    spinner: {
        marginLeft: 3,
    },
});

export default CustomButton;
