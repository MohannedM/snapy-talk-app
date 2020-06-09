import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    Platform,
    ScrollView,
    TextInput,
    ViewStyle,
    Dimensions,
    Keyboard,
    Button,
} from 'react-native';
import Colors from '../constants/Colors';
import Card from '../components/UI/Card';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';

const Register: React.FC = (props) => {
    return (
        <View style={styles.container}>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss} style={styles.subContainer}>
                <Card style={styles.card}>
                    <TextInput style={styles.inputs} placeholder="First Name" maxLength={10} textContentType="name" />
                    <TextInput
                        style={styles.inputs}
                        placeholder="Last Name"
                        maxLength={10}
                        textContentType="familyName"
                    />
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
                            <Button title="Register" onPress={() => {}} color={Colors.primary[1]} />
                        </View>
                        <View>
                            <Button title="Switch to login" onPress={() => {}} color={Colors.secondary[1]} />
                        </View>
                    </View>
                </Card>
            </TouchableWithoutFeedback>
        </View>
    );
};

interface Styles {
    container: ViewStyle;
    card: ViewStyle;
    inputs: ViewStyle;
}

const styles = StyleSheet.create({
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
        minHeight: '65%',
        minWidth: '75%',
        marginTop: Dimensions.get('window').height / 10,
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
        justifyContent: 'center',
        alignItems: 'center',
        margin: 10,
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

export default Register;
