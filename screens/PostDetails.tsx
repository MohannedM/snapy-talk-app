import React, { useLayoutEffect } from 'react';
import { View, ScrollView, Text, StyleSheet, Dimensions, Image } from 'react-native';
import Card from '../components/UI/Card';
import CustomButton from '../components/UI/CustomButton';
import { StackNavigationProp } from '@react-navigation/stack';
import { AppState } from '../store';
import { connect } from 'react-redux';
import { postData } from '../store/types/posts.module';

interface IProps {
    navigation: StackNavigationProp<any, any>;
    post: (postId: string) => postData | undefined;
    route: {
        key: string;
        name: string;
        params?: {
            postId: string;
            title: string;
            feedPlace: 'home' | 'my-stories';
        };
    };
}

const PostDetails: React.FC<IProps> = (props) => {
    const feedPlace = props.route.params ? props.route.params.feedPlace : null;
    const postId = props.route.params ? props.route.params.postId : '';
    const post = props.post(postId);
    return (
        <ScrollView>
            <View style={styles.container}>
                {post ? (
                    <Card style={styles.cardStyle}>
                        <Image style={styles.cardImage} source={{ uri: post.imageUrl }} />
                        <View style={styles.descriptionContainer}>
                            <Text style={styles.description}>{post.description}</Text>
                        </View>

                        {feedPlace && feedPlace === 'my-stories' ? (
                            <View style={styles.actions}>
                                <CustomButton
                                    type={'Secondary'}
                                    onPress={() => {
                                        props.navigation.navigate('EditPost', { post: post });
                                    }}
                                    style={styles.actionButtons}
                                >
                                    Edit
                                </CustomButton>
                                <CustomButton
                                    type={'Primary'}
                                    strength={2}
                                    onPress={() => {}}
                                    style={styles.actionButtons}
                                >
                                    Delete
                                </CustomButton>
                            </View>
                        ) : null}
                    </Card>
                ) : (
                    <Text>Post was not found.</Text>
                )}
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        padding: Dimensions.get('screen').width / 50,
    },
    cardStyle: {
        width: '100%',
        minHeight: '30%',
        backgroundColor: '#fff',
        margin: '3%',
    },
    cardImage: {
        borderTopRightRadius: 10,
        borderTopLeftRadius: 10,
        width: '100%',
        height: Dimensions.get('screen').height / 3,
    },
    descriptionContainer: {
        padding: Dimensions.get('screen').width / 25,
    },
    description: {
        fontWeight: '300',
    },
    actions: {
        flexDirection: 'row',
        padding: Dimensions.get('screen').width / 25,
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    actionButtons: {
        width: Dimensions.get('screen').width / 3,
    },
});
const mapStateToProps = (state: AppState) => {
    return {
        post: (postId: string) => state.posts.posts.find((post) => post._id === postId),
    };
};
export default connect(mapStateToProps)(PostDetails);
