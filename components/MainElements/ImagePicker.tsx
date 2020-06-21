import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Button,
    Image,
    Dimensions,
    Alert,
    ViewStyle,
    ImageStyle,
    TextStyle,
} from 'react-native';
import Colors from '../../constants/Colors';
import * as ImgPicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';

interface IProps {
    onSetImage: (value: string, isCancelled?: boolean) => void;
    hasError?: boolean;
    errorMessage?: string;
}

const ImagePicker: React.FC<IProps> = (props) => {
    const [image, setImage] = useState('');
    const verifyPermissions = async () => {
        const result = await Permissions.askAsync(Permissions.CAMERA, Permissions.CAMERA_ROLL);
        if (result.status !== 'granted') {
            Alert.alert(
                'Insufficient permissions!',
                'You need to grant camera permissions to create or update a post.',
                [{ text: 'Okay' }],
            );
            return false;
        }
        return true;
    };
    const takeImageHandler = async () => {
        const hasPermission = await verifyPermissions();
        if (!hasPermission) {
            return;
        }
        const imagePicked = await ImgPicker.launchCameraAsync();
        if (imagePicked.cancelled && image === '') {
            props.onSetImage('', imagePicked.cancelled);
        } else if ((imagePicked as { uri: string }).uri) {
            props.onSetImage((imagePicked as { uri: string }).uri, false);
            setImage((imagePicked as { uri: string }).uri);
        }
    };
    return (
        <View>
            <View style={styles.imagePreview}>
                {image === '' ? (
                    <Text>No image picked yet.</Text>
                ) : (
                    <Image
                        source={{
                            uri: image,
                        }}
                        style={styles.image}
                    />
                )}
            </View>
            {props.hasError && <Text style={styles.errorMessage}>{props.errorMessage}</Text>}
            <Button title="Take Image" color={Colors.secondary[1]} onPress={takeImageHandler} />
        </View>
    );
};

interface Styles {
    imagePreview: ViewStyle;
    image: ImageStyle;
    errorMessage: TextStyle;
}

const styles = StyleSheet.create<Styles>({
    imagePreview: {
        width: '100%',
        height: Dimensions.get('screen').height / 5,
        marginBottom: 10,
        justifyContent: 'center',
        alignItems: 'center',
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
    image: {
        width: '96%',
        height: '96%',
        borderRadius: 10,
        overflow: 'hidden',
    },
    errorMessage: {
        color: Colors.primary[2],
        fontSize: 10,
    },
});

export default ImagePicker;
