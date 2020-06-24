import React, { useEffect } from 'react';
import CustomHeaderButton from '../components/UI/CustomHeaderButton';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { createStackNavigator, StackNavigationProp } from '@react-navigation/stack';
import Feed from '../screens/Feed';
import { Platform } from 'react-native';
import Colors from '../constants/Colors';
import PostDetails from '../screens/PostDetails';
import { detailsScreenOptions } from './OwnerPostsStack';
import { connect } from 'react-redux';
import { postInputType, createPostType, getAllPostsType, postData } from '../store/types/posts.module';
import { Dispatch } from 'redux';
import { getAllPosts } from '../store/actions';
import { AppState } from '../store';
import { useIsFocused } from '@react-navigation/native';

const Stack = createStackNavigator();

const homeScreenOptions = (navData: any) => {
    return {
        title: 'Snapy News Feed',
        headerStyle: {
            backgroundColor: Platform.OS === 'android' ? Colors.primary[1] : '',
        },
        headerTintColor: Platform.OS === 'ios' ? Colors.primary[1] : '#fff',
        headerTitleStyle: {
            fontWeight: 'bold',
        },
        headerLeft: () => (
            <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
                <Item
                    title="Cart"
                    iconName={Platform.OS === 'android' ? 'md-menu' : 'ios-menu'}
                    onPress={() => {
                        navData.navigation.toggleDrawer();
                    }}
                />
            </HeaderButtons>
        ),
    };
};
interface IProps {
    token?: string | null;
    onGetAllPosts: (token?: string | null) => getAllPostsType;
    loading: boolean;
    posts: postData[];
    navigation: StackNavigationProp<any, any>;
}
const FeedStack: React.FC<IProps> = (props) => {
    const isFocused = useIsFocused();
    useEffect(() => {
        if (isFocused) {
            props.onGetAllPosts(props.token);
        }
    }, [isFocused]);
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="Home"
                options={homeScreenOptions}
                children={() => <Feed navigation={props.navigation} loading={props.loading} posts={props.posts} />}
            />
            <Stack.Screen name="Details" component={PostDetails} options={detailsScreenOptions} />
        </Stack.Navigator>
    );
};

const mapStateToProps = (state: AppState) => {
    return {
        token: state.auth.token,
        loading: state.posts.loading,
        posts: state.posts.posts,
    };
};

const mapDispatchToProps = (dispatch: Dispatch) => {
    return {
        onGetAllPosts: (token?: string | null) => dispatch(getAllPosts(token)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(FeedStack);
