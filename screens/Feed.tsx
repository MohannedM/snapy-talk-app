import React, { useEffect } from 'react';
import { View, StyleSheet, Platform } from 'react-native';
import { connect } from 'react-redux';
import BlogPost from '../components/MainElements/BlogPost';
import { StackNavigationProp } from '@react-navigation/stack';
import { Dispatch } from 'redux';
import { useNavigationState } from '@react-navigation/native';
import { DrawerScreenProps } from '@react-navigation/drawer';
import { AppState } from '../store';
import { getAllPosts, getUserPosts } from '../store/actions';
import { getAllPostsType, getUserPostsType } from '../store/types/posts.module';

interface Props {
    navigation: StackNavigationProp<any, any>;
}

const Home: React.FC<Props> = (props) => {
    return (
        <View style={styles.container}>
            <BlogPost
                title="This is a cool sea"
                author="Mohanned Farahat"
                imageUrl="https://q-cf.bstatic.com/images/hotel/max1024x768/223/223087771.jpg"
                onViewDetails={() => {
                    props.navigation.navigate('Details', { title: 'This is a cool sea' });
                }}
            />
            <BlogPost
                title="This is a cool book"
                author="Hossam Hassan"
                imageUrl="https://assets.entrepreneur.com/content/3x2/2000/20191219170611-GettyImages-1152794789.jpeg"
                isLiked
                onViewDetails={() => {}}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
    },
});

// const mapStateToProps = (state: AppState) => {
//     return {
//         token: state.auth.token,
//     };
// };

// const mapDispatchToProps = (dispatch: Dispatch) => {
//     return {
//         onGetAllPosts: (token?: string | null) => dispatch(getAllPosts(token)),
//         onGetUserPosts: (token?: string | null) => dispatch(getUserPosts(token)),
//     };
// };

export default connect(null, null)(Home);
