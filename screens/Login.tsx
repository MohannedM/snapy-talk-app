import React, { useState } from 'react';
import { View, StyleSheet, Platform, TextInput, ViewStyle, Dimensions, Keyboard, TextStyle, Text } from 'react-native';
import Colors from '../constants/Colors';
import Card from '../components/UI/Card';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import CustomButton from '../components/UI/CustomButton';
import { LinearGradient } from 'expo-linear-gradient';

import { StackNavigationProp } from '@react-navigation/stack';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { login } from '../store/actions';
import { loginInputType, loginType } from '../store/types/auth.module';
import { AppState } from '../store';

interface Props {
    navigation: StackNavigationProp<any, any>;
    onLogin: (authData: loginInputType) => loginType;
    isLoading: boolean;
}

const Login: React.FC<Props> = (props) => {
    const [inputState, setInputState] = useState({
        email: '',
        password: '',
        errors: {
            email: {
                touched: false,
                message: '',
                error: true,
            },
            password: {
                touched: false,
                message: '',
                error: true,
            },
        },
    });

    const setUserInput = (
        value: string,
        inputName: 'firstName' | 'lastName' | 'email' | 'password',
        isInputValid: boolean,
        errorMessage: string,
    ) => {
        if (isInputValid) {
            setInputState((prevState) => {
                return {
                    ...prevState,
                    [inputName]: value,
                    errors: { ...prevState.errors, [inputName]: { touched: true, message: '', error: false } },
                };
            });
        } else {
            setInputState((prevState) => {
                return {
                    ...prevState,
                    [inputName]: value,
                    errors: { ...prevState.errors, [inputName]: { touched: true, message: errorMessage, error: true } },
                };
            });
        }
    };

    const setEmail = (value: string) => {
        const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        const isValid = emailRegex.test(value);
        setUserInput(value, 'email', isValid, 'Email is invalid.');
    };

    const setPassword = (value: string) => {
        const isValid = value.length >= 6 && value.length <= 20;
        setUserInput(value, 'password', isValid, 'Password should be from 6 to 20 characters.');
    };

    let isDisabled: boolean = true;
    const errors = { ...inputState.errors };
    let inputType: 'email' | 'password';
    for (inputType in errors) {
        if (errors[inputType].error) {
            isDisabled = true;
            break;
        } else {
            isDisabled = false;
        }
    }

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
                        value={inputState.email}
                        onChangeText={setEmail}
                    />
                    {inputState.errors.email.error && inputState.errors.email.touched && (
                        <Text style={styles.errorMessage}>{inputState.errors.email.message}</Text>
                    )}
                    <TextInput
                        style={styles.inputs}
                        placeholder="Password"
                        maxLength={14}
                        textContentType="password"
                        secureTextEntry
                        value={inputState.password}
                        onChangeText={setPassword}
                    />
                    {inputState.errors.password.error && inputState.errors.password.touched && (
                        <Text style={styles.errorMessage}>{inputState.errors.password.message}</Text>
                    )}
                    <View style={styles.actions}>
                        <View>
                            <CustomButton
                                onPress={() => {
                                    props.onLogin({ email: inputState.email, password: inputState.password });
                                }}
                                type="Primary"
                                isDisabled={isDisabled}
                                style={styles.actionButtons}
                                isLoading={props.isLoading}
                            >
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
    errorMessage: TextStyle;
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
    errorMessage: {
        color: Colors.primary[2],
        fontSize: 10,
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

const mapStateToProps = (state: AppState) => {
    return {
        isLoading: state.auth.loading,
    };
};

export const mapDispatchToProps = (dispatch: Dispatch) => {
    return {
        onLogin: (authData: loginInputType) => dispatch(login(authData)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
