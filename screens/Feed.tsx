import React from 'react';
import { SafeAreaView, StyleSheet, FlatList, ActivityIndicator } from 'react-native';
import BlogPost from '../components/MainElements/BlogPost';
import { StackNavigationProp } from '@react-navigation/stack';
import { postData, toggleLikePostType } from '../store/types/posts.module';
import Colors from '../constants/Colors';
import { AppState } from '../store';
import { Dispatch } from 'redux';
import { toggleLikePost } from '../store/actions';
import { connect } from 'react-redux';

interface Props {
    navigation: StackNavigationProp<any, any>;
    loading: boolean;
    posts: postData[];
    feedPlace: 'home' | 'my-stories';
    token?: string | null;
    onToggleLikePost: (
        postId: string,
        place: 'posts' | 'userPosts',
        token?: string | null,
        isLiked?: boolean,
    ) => toggleLikePostType;
}

const Home: React.FC<Props> = (props) => {
    return (
        <SafeAreaView style={styles.container}>
            {props.loading ? (
                <ActivityIndicator color={Colors.primary[1]} size={'large'} />
            ) : (
                <FlatList
                    style={styles.flatListStyle}
                    data={props.posts}
                    renderItem={({ item }) => (
                        <BlogPost
                            author={item.user.firstName + ' ' + item.user.lastName}
                            imageUrl={item.imageUrl}
                            title={item.title}
                            likeLoading={item.likeLoading}
                            onLikePost={() => {
                                const place = props.feedPlace === 'home' ? 'posts' : 'userPosts';
                                props.onToggleLikePost(item._id, place, props.token, item.isLiked);
                            }}
                            onViewDetails={() => {
                                const navigateTo = props.feedPlace === 'home' ? 'HomePostDetails' : 'OwnerPostDetails';
                                props.navigation.navigate(navigateTo, {
                                    postId: item._id,
                                    title: item.title,
                                    feedPlace: props.feedPlace,
                                });
                            }}
                            isLiked={item.isLiked}
                        />
                    )}
                    keyExtractor={(item) => item._id}
                />
            )}
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    flatListStyle: {
        flex: 1,
        width: '100%',
        height: '100%',
    },
});

const mapStateTopProps = (state: AppState) => {
    return {
        token: state.auth.token,
    };
};

const mapDispatchToProps = (dispatch: Dispatch) => {
    return {
        onToggleLikePost: (postId: string, place: 'posts' | 'userPosts', token?: string | null, isLiked?: boolean) =>
            dispatch(toggleLikePost(postId, place, token, isLiked)),
    };
};

export default connect(mapStateTopProps, mapDispatchToProps)(Home);
