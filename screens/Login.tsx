import React from 'react';
import { View, StyleSheet, Platform, TextInput, ViewStyle, Dimensions, Keyboard } from 'react-native';
import Colors from '../constants/Colors';
import Card from '../components/UI/Card';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import CustomButton from '../components/UI/CustomButton';
import { LinearGradient } from 'expo-linear-gradient';

import { StackNavigationProp } from '@react-navigation/stack';

interface Props {
    navigation: StackNavigationProp<any, any>;
}

const Login: React.FC<Props> = (props) => {
    return (
        <View style={styles.container}>
            <LinearGradient colors={[Colors.primary[0], Colors.secondary[0]]} style={styles.gradient} />
            <TouchableWithoutFeedback onPress={Keyboard.dismiss} style={styles.subContainer}>
                <Card style={styles.card}>
                    <TextInput
                        style={styles.inputs}
                        placeholder="Email"
                        maxLength={30}
                        textContentType="emailAddress"
                    />
                    <TextInput
                        style={styles.inputs}
                        placeholder="Password"
                        maxLength={14}
                        textContentType="password"
                        secureTextEntry
                    />
                    <View style={styles.actions}>
                        <View>
                            <CustomButton onPress={() => {}} type="Primary" style={styles.actionButtons}>
                                Login
                            </CustomButton>
                        </View>
                        <View>
                            <CustomButton
                                onPress={() => {
                                    props.navigation.replace('Register');
                                }}
                                type="Secondary"
                                style={styles.actionButtons}
                            >
                                Switch to sign up
                            </CustomButton>
                        </View>
                    </View>
                </Card>
            </TouchableWithoutFeedback>
        </View>
    );
};

interface Styles {
    container: ViewStyle;
    subContainer: ViewStyle;
    card: ViewStyle;
    inputs: ViewStyle;
    actions: ViewStyle;
    actionButtons: ViewStyle;
    gradient: ViewStyle;
}

const styles = StyleSheet.create<Styles>({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    subContainer: {
        alignItems: 'center',
    },
    card: {
        borderColor: '#f6f6f6',
        borderWidth: 2,
        backgroundColor: '#fff',
        opacity: 0.75,
        minHeight: '45%',
        minWidth: '75%',
        marginTop: Dimensions.get('window').height / 10,
        padding: 20,
    },
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
    actions: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        margin: 10,
    },
    actionButtons: {
        minWidth: '40%',
    },
    gradient: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        height: '100%',
    },
});

export const loginScreenOptions = () => {
    return {
        title: 'Login',
        headerStyle: {
            backgroundColor: Platform.OS === 'android' ? Colors.primary[1] : '',
        },
        headerTintColor: Platform.OS === 'ios' ? Colors.primary[1] : '#fff',
        headerTitleStyle: {
            fontWeight: 'bold',
        },
    };
};

export default Login;
