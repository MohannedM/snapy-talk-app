import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    Button,
    AsyncStorage,
    Platform,
    Image,
    Dimensions,
    ViewStyle,
    ImageStyle,
    TextStyle,
} from 'react-native';
import Colors from '../../constants/Colors';
import Card from '../../components/UI/Card';
import { AntDesign, Fontisto } from '@expo/vector-icons';

interface Props {
    title: string;
    author: string;
    imageUrl: string;
    isLiked?: boolean;
    onViewDetails: () => void;
}

const BlogPost: React.FC<Props> = (props) => {
    return (
        <Card style={styles.cardStyle}>
            <Image
                style={styles.cardImage}
                source={{
                    uri: props.imageUrl,
                }}
            />
            <View style={styles.cardTitleContainer}>
                <Text style={styles.cardTitle}>{props.title}</Text>
                <Text style={styles.cardOwner}>By: {props.author}</Text>
            </View>
            <View style={styles.actions}>
                <AntDesign name={props.isLiked ? 'like1' : 'like2'} size={21} color={Colors.secondary[1]} />
                <Fontisto
                    name="preview"
                    size={21}
                    color={Colors.primary[1]}
                    onPress={() => {
                        props.onViewDetails();
                    }}
                />
            </View>
        </Card>
    );
};

interface Styles {
    cardStyle: ViewStyle;
    cardImage: ImageStyle;
    cardTitleContainer: ViewStyle;
    cardTitle: TextStyle;
    actions: ViewStyle;
    cardOwner: TextStyle;
}

const styles = StyleSheet.create<Styles>({
    cardStyle: {
        width: '90%',
        backgroundColor: '#fff',
        margin: '3%',
    },
    cardImage: {
        borderTopRightRadius: 10,
        borderTopLeftRadius: 10,
        width: '100%',
        height: Dimensions.get('screen').height / 5,
    },
    cardTitleContainer: {
        marginTop: 5,
    },
    cardTitle: {
        textAlign: 'center',
        color: Colors.primary[1],
        fontSize: 16,
    },
    actions: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 5,
        padding: 15,
    },
    cardOwner: {
        textAlign: 'center',
        color: Colors.secondary[0],
        fontSize: 14,
    },
});

export default BlogPost;
