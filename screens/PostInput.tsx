import React, { useState } from 'react';
import { View, Text, StyleSheet, Dimensions, Keyboard } from 'react-native';
import RuleInputText from '../components/UI/RuleInputText';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import ImagePicker from '../components/MainElements/ImagePicker';

const EditPost: React.FC = (props) => {
    const [inputState, setInputState] = useState({
        title: '',
        description: '',
        imageUri: '',
        errors: {
            title: {
                touched: false,
                message: '',
                error: true,
            },
            description: {
                touched: false,
                message: '',
                error: true,
            },
            imageUri: {
                touched: false,
                message: '',
                error: true,
            },
        },
    });

    const setUserInput = (
        value: string,
        inputName: 'title' | 'description' | 'imageUri',
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
    const setTitle = (value: string) => {
        const isValid = value.length >= 4 && value.length <= 25;
        setUserInput(value, 'title', isValid, 'Title should be from 4 to 25 characters.');
    };

    const setDescription = (value: string) => {
        const isValid = value.length >= 10 && value.length <= 100;
        setUserInput(value, 'description', isValid, 'Description should be from 10 to 100 characters.');
    };

    const setImageUri = (value: string, isCancelled: boolean = false) => {
        const isValid = !isCancelled || inputState.imageUri !== '' || value !== '';
        setUserInput(value, 'imageUri', isValid, 'You have to take an image.');
    };

    return (
        <View style={styles.container}>
            <TouchableWithoutFeedback style={styles.subContainer} onPress={Keyboard.dismiss}>
                <View style={styles.inputContainer}>
                    <RuleInputText
                        errorMessage={inputState.errors.title.message}
                        value={inputState.title}
                        placeholder="Snap Title"
                        maxLength={25}
                        onChangeText={setTitle}
                        hasError={inputState.errors.description.error}
                    />
                    <RuleInputText
                        errorMessage={inputState.errors.description.message}
                        value={inputState.description}
                        placeholder="Snap Description"
                        multiline
                        style={styles.descriptionInput}
                        numberOfLines={7}
                        maxLength={100}
                        underlineColorAndroid="transparent"
                        onChangeText={setDescription}
                        hasError={inputState.errors.description.error}
                    />
                </View>
            </TouchableWithoutFeedback>
            <View style={styles.imagePickerContainer}>
                <ImagePicker
                    onSetImage={setImageUri}
                    hasError={inputState.errors.imageUri.error}
                    errorMessage={inputState.errors.imageUri.message}
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    subContainer: {
        width: '100%',
    },
    inputContainer: {
        padding: Dimensions.get('screen').width / 10,
    },
    imagePickerContainer: {
        padding: Dimensions.get('screen').width / 10,
        bottom: Dimensions.get('screen').height / 12,
    },
    descriptionInput: {
        height: Dimensions.get('screen').height / 5,
    },
});

export default EditPost;
