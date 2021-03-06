import React, { useState, useEffect } from 'react';
import {
    View,
    StyleSheet,
    Platform,
    TextInput,
    ViewStyle,
    Dimensions,
    Keyboard,
    Text,
    TextStyle,
    Alert,
} from 'react-native';
import Colors from '../constants/Colors';
import Card from '../components/UI/Card';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import CustomButton from '../components/UI/CustomButton';
import { LinearGradient } from 'expo-linear-gradient';
import { register, authDismissError } from '../store/actions';
import { connect } from 'react-redux';
import { StackNavigationProp } from '@react-navigation/stack';
import { Dispatch } from 'redux';
import { registerInputType, registerType, authDismissErrorType } from '../store/types/auth.module';
import { AppState } from '../store';
import RuleInputText from '../components/UI/RuleInputText';

interface Props {
    navigation: StackNavigationProp<any, any>;
    onRegister: (authData: registerInputType) => registerType;
    onDismissError: () => authDismissErrorType;
    isLoading: boolean;
    error: any | null;
}

const Register: React.FC<Props> = (props) => {
    const [inputState, setInputState] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        errors: {
            firstName: {
                touched: false,
                message: '',
                error: true,
            },
            lastName: {
                touched: false,
                message: '',
                error: true,
            },
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

    const setFirstName = (value: string) => {
        const isValid = value.length >= 2 && value.length <= 14;
        setUserInput(value, 'firstName', isValid, 'First name should be from 2 to 14 characters.');
    };

    const setLastName = (value: string) => {
        const isValid = value.length >= 2 && value.length <= 14;
        setUserInput(value, 'lastName', isValid, 'Last name should be from 2 to 14 characters.');
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
    let inputType: 'firstName' | 'lastName' | 'email' | 'password';
    for (inputType in errors) {
        if (errors[inputType].error) {
            isDisabled = true;
            break;
        } else {
            isDisabled = false;
        }
    }
    const { error } = props;
    useEffect(() => {
        if (error) {
            Alert.alert('An Error Occurred!', error, [
                {
                    text: 'Okay',
                    onPress: () => {
                        props.onDismissError();
                    },
                },
            ]);
        }
    }, [error]);
    return (
        <View style={styles.container}>
            <LinearGradient
                colors={[Colors.primary[0], Colors.secondary[0]]}
                style={{
                    position: 'absolute',
                    left: 0,
                    right: 0,
                    top: 0,
                    height: '100%',
                }}
            />
            <TouchableWithoutFeedback onPress={Keyboard.dismiss} style={styles.subContainer}>
                <Card style={styles.card}>
                    <RuleInputText
                        hasError={inputState.errors.firstName.error && inputState.errors.firstName.touched}
                        errorMessage={inputState.errors.firstName.message}
                        placeholder="First Name"
                        maxLength={14}
                        textContentType="name"
                        value={inputState.firstName}
                        onChangeText={setFirstName}
                    />

                    <RuleInputText
                        hasError={inputState.errors.lastName.error && inputState.errors.lastName.touched}
                        errorMessage={inputState.errors.lastName.message}
                        value={inputState.lastName}
                        placeholder="Last Name"
                        maxLength={14}
                        textContentType="familyName"
                        onChangeText={setLastName}
                    />

                    <RuleInputText
                        hasError={inputState.errors.email.error && inputState.errors.email.touched}
                        errorMessage={inputState.errors.email.message}
                        value={inputState.email}
                        onChangeText={setEmail}
                        placeholder="Email"
                        maxLength={30}
                        textContentType="emailAddress"
                        autoCapitalize="none"
                    />

                    <RuleInputText
                        hasError={inputState.errors.password.error && inputState.errors.password.touched}
                        errorMessage={inputState.errors.password.message}
                        value={inputState.password}
                        onChangeText={setPassword}
                        placeholder="Password"
                        maxLength={14}
                        textContentType="password"
                        secureTextEntry
                    />

                    <View style={styles.actions}>
                        <View>
                            <CustomButton
                                onPress={() => {
                                    props.onRegister({
                                        firstName: inputState.firstName,
                                        lastName: inputState.lastName,
                                        email: inputState.email,
                                        password: inputState.password,
                                    });
                                }}
                                type="Primary"
                                style={styles.actionButtons}
                                isDisabled={isDisabled}
                                isLoading={props.isLoading}
                            >
                                Register
                            </CustomButton>
                        </View>
                        <View>
                            <CustomButton
                                onPress={() => {
                                    props.navigation.replace('Login');
                                }}
                                type="Secondary"
                                style={styles.actionButtons}
                            >
                                Switch to login
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
        minHeight: '65%',
        minWidth: '75%',
        marginTop: Dimensions.get('window').height / 10,
        padding: 20,
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

export const registerScreenOptions = () => {
    return {
        title: 'Register',
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
        error: state.auth.error,
    };
};

const mapDispatchToProps = (dispatch: Dispatch) => {
    return {
        onRegister: (authData: registerInputType) => dispatch(register(authData)),
        onDismissError: () => dispatch(authDismissError()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Register);
