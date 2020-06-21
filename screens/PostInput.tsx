import React, { useState, useCallback, useEffect } from 'react';
import { View, Text, StyleSheet, Dimensions, Keyboard, Platform, Alert, ActivityIndicator } from 'react-native';
import RuleInputText from '../components/UI/RuleInputText';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import ImagePicker from '../components/MainElements/ImagePicker';
import { StackNavigationProp } from '@react-navigation/stack';
import { Dispatch } from 'redux';
import { createPost } from '../store/actions';
import { postInputType, createPostType, postData } from '../store/types/posts.module';
import { connect } from 'react-redux';
import { AppState } from '../store';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import CustomHeaderButton from '../components/UI/CustomHeaderButton';
import Colors from '../constants/Colors';

interface Props {
    token?: string | null;
    navigation: StackNavigationProp<any, any>;
    onAddPost: (postData: postInputType, token?: string | null) => createPostType;
    loading: boolean;
    error: string | null;
    goBack: boolean;
}

const PostInput: React.FC<Props> = (props) => {
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
    let isDisabled: boolean = true;
    const errors = { ...inputState.errors };
    let inputType: 'title' | 'description' | 'imageUri';
    for (inputType in errors) {
        if (errors[inputType].error) {
            isDisabled = true;
            break;
        } else {
            isDisabled = false;
        }
    }
    const { onAddPost } = props;
    const { navigation } = props;
    React.useLayoutEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
                    {props.loading ? (
                        <ActivityIndicator color={Platform.OS === 'android' ? '#fff' : Colors.primary[1]} />
                    ) : (
                        <Item
                            title="check"
                            iconName={Platform.OS === 'android' ? 'md-checkmark' : 'ios-checkmark'}
                            onPress={() => {
                                if (!isDisabled) {
                                    onAddPost(
                                        {
                                            title: inputState.title,
                                            description: inputState.description,
                                            imageUri: inputState.imageUri,
                                        },
                                        props.token,
                                    );
                                } else {
                                    Alert.alert('Invalid Input!', 'Please check your input data.', [{ text: 'Okay' }]);
                                }
                            }}
                        />
                    )}
                </HeaderButtons>
            ),
        });
    });
    const { goBack } = props;
    useEffect(() => {
        if (goBack) {
            props.navigation.goBack();
        }
    }, [goBack]);

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

    // const setImageUri = (value: string, isCancelled: boolean = false) => {
    //     const isValid = !isCancelled || inputState.imageUri !== '' || value !== '';
    //     setUserInput(value, 'imageUri', isValid, 'You have to take an image.');
    // };

    const setImageUri = (value: string) => {
        const urlRegex = /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/gm;
        const isValid = urlRegex.test(value);
        setUserInput(value, 'imageUri', isValid, 'Image should be a URL.');
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
                    <RuleInputText
                        errorMessage={inputState.errors.imageUri.message}
                        value={inputState.imageUri}
                        placeholder="Image URL"
                        underlineColorAndroid="transparent"
                        onChangeText={setImageUri}
                        hasError={inputState.errors.imageUri.error}
                    />
                </View>
            </TouchableWithoutFeedback>
            {/* <View style={styles.imagePickerContainer}>
                <ImagePicker
                    onSetImage={setImageUri}
                    hasError={inputState.errors.imageUri.error}
                    errorMessage={inputState.errors.imageUri.message}
                />
            </View> */}
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

const mapStateToProps = (state: AppState) => {
    return {
        token: state.auth.token,
        loading: state.posts.loading,
        error: state.posts.error,
        goBack: state.posts.goBack,
    };
};

const mapDispatchToProps = (dispatch: Dispatch) => {
    return {
        onAddPost: (postData: postInputType, token?: string | null) => dispatch(createPost(postData, token)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(PostInput);
