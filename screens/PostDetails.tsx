import React, { useEffect } from 'react';
import { View, ScrollView, Text, StyleSheet, Dimensions, Image, Alert } from 'react-native';
import Card from '../components/UI/Card';
import CustomButton from '../components/UI/CustomButton';
import { StackNavigationProp } from '@react-navigation/stack';
import { AppState } from '../store';
import { connect } from 'react-redux';
import { postData, deletePostType } from '../store/types/posts.module';
import { Dispatch } from 'redux';
import { deletePost } from '../store/actions';

interface IProps {
    navigation: StackNavigationProp<any, any>;
    post: (postId: string) => postData | undefined;
    userPost: (postId: string) => postData | undefined;
    goBack: boolean;
    token?: string | null;
    loading: boolean;
    onDeletePost: (postId: string, token?: string | null) => deletePostType;
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
    const { goBack } = props;
    useEffect(() => {
        if (goBack) {
            props.navigation.goBack();
        }
    }, [goBack]);
    const feedPlace = props.route.params ? props.route.params.feedPlace : null;
    const postId = props.route.params ? props.route.params.postId : '';
    const post = feedPlace && feedPlace === 'my-stories' ? props.userPost(postId) : props.post(postId);
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
                                    onPress={() => {
                                        if (feedPlace === 'my-stories') {
                                            Alert.alert('Delete Post?', 'Are you sure you want to delete this post?', [
                                                { text: 'Cancel', style: 'cancel' },
                                                {
                                                    text: 'Yes',
                                                    style: 'destructive',
                                                    onPress: () => {
                                                        props.onDeletePost(post._id, props.token);
                                                    },
                                                },
                                            ]);
                                        }
                                    }}
                                    style={styles.actionButtons}
                                    isLoading={props.loading}
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
        userPost: (postId: string) => state.posts.userPosts.find((post) => post._id === postId),
        goBack: state.posts.goBack,
        token: state.auth.token,
        loading: state.posts.loading,
    };
};

const mapDispatchToProps = (dispatch: Dispatch) => {
    return {
        onDeletePost: (postId: string, token?: string | null) => dispatch(deletePost(postId, token)),
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(PostDetails);
