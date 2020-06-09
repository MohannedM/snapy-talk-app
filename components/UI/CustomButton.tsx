import React from 'react';
import {
    View,
    TouchableOpacity,
    TouchableNativeFeedback,
    Platform,
    StyleSheetProperties,
    StyleSheet,
} from 'react-native';

interface Props {
    onPress: () => void;
    style?: StyleSheetProperties;
    type: 'Primary' | 'Secondary';
}

const SecondaryComponent: React.FC<Props> = (props) => {
    let TouchableCmp: any = TouchableOpacity;
    if (Platform.OS === 'android') {
        TouchableCmp = TouchableNativeFeedback;
    }
    return (
        <View>
            <TouchableCmp
                onPress={() => {
                    props.onPress();
                }}
                style={{ ...props.style }}
            />
        </View>
    );
};

interface Styles {}

const styles = StyleSheet.create({
    container: {},
    button: {},
});

export default SecondaryComponent;
