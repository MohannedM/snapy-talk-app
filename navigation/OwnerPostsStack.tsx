import React, { useEffect } from 'react';
import CustomHeaderButton from '../components/UI/CustomHeaderButton';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { createStackNavigator, StackNavigationProp } from '@react-navigation/stack';
import PostInput from '../screens/PostInput';
import { Platform } from 'react-native';
import Colors from '../constants/Colors';
import Feed from '../screens/Feed';
import PostDetails from '../screens/PostDetails';
import { connect } from 'react-redux';
import { getUserPostsType, postData } from '../store/types/posts.module';
import { Dispatch } from 'redux';
import { getUserPosts } from '../store/actions';
import { AppState } from '../store';
import { useIsFocused } from '@react-navigation/native';

const Stack = createStackNavigator();

const genericScreenOptions = (navData: any) => {
    return {
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

const ownerPostsScreenOptions = (navData: any) => {
    return {
        title: 'My Stories',
        ...genericScreenOptions(navData),
        headerRight: () => (
            <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
                <Item
                    title="Cart"
                    iconName={Platform.OS === 'android' ? 'md-add' : 'ios-add'}
                    onPress={() => {
                        navData.navigation.navigate('AddPost');
                    }}
                />
            </HeaderButtons>
        ),
    };
};

const editPostScreenOptions = (navData: any) => {
    const params = navData.route.params ? navData.route.params : {};
    return {
        title: params.post ? 'Edit Snap' : 'Add a Snap',
        ...genericScreenOptions(navData),
    };
};

export const detailsScreenOptions = (navData: any) => {
    const title = navData.route.params ? navData.route.params.title : '';
    return {
        title,
        ...genericScreenOptions(navData),
    };
};

interface IProps {
    token?: string | null;
    onGetUserPosts: (token?: string | null) => getUserPostsType;
    loading: boolean;
    posts: postData[];
    navigation: StackNavigationProp<any, any>;
}

const OwnerPostsStack: React.FC<IProps> = (props) => {
    const isFocused = useIsFocused();

    useEffect(() => {
        if (isFocused) {
            props.onGetUserPosts(props.token);
        }
    }, [isFocused]);
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="OwnerPosts"
                options={ownerPostsScreenOptions}
                children={() => (
                    <Feed
                        navigation={props.navigation}
                        loading={props.loading}
                        posts={props.posts}
                        feedPlace="my-stories"
                    />
                )}
            />
            <Stack.Screen name="AddPost" component={PostInput} options={editPostScreenOptions} />
            <Stack.Screen name="OwnerPostDetails" component={PostDetails} options={detailsScreenOptions} />
            <Stack.Screen name="EditPost" component={PostInput} options={editPostScreenOptions} />
        </Stack.Navigator>
    );
};

const mapStateToProps = (state: AppState) => {
    return {
        token: state.auth.token,
        loading: state.posts.loading,
        posts: state.posts.userPosts,
    };
};

const mapDispatchToProps = (dispatch: Dispatch) => {
    return {
        onGetUserPosts: (token?: string | null) => dispatch(getUserPosts(token)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(OwnerPostsStack);
