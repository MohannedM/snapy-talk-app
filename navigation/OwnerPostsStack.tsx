import React from 'react';
import CustomHeaderButton from '../components/UI/CustomHeaderButton';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { createStackNavigator, StackNavigationProp } from '@react-navigation/stack';
import PostInput from '../screens/PostInput';
import { Platform } from 'react-native';
import Colors from '../constants/Colors';
import Feed from '../screens/Feed';
import PostDetails from '../screens/PostDetails';
import { connect } from 'react-redux';
import { postInputType, createPostType } from '../store/types/posts.module';
import { Dispatch } from 'redux';
import { createPost } from '../store/actions';

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
        title: params.productId ? 'Edit Snap' : 'Add a Snap',
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

const OwnerPostsStack: React.FC = (props) => (
    <Stack.Navigator>
        <Stack.Screen name="OwnerPosts" component={Feed} options={ownerPostsScreenOptions} />
        <Stack.Screen name="AddPost" component={PostInput} options={editPostScreenOptions} />
        <Stack.Screen name="Details" component={PostDetails} options={detailsScreenOptions} />
        <Stack.Screen name="EditPost" component={PostInput} options={editPostScreenOptions} />
    </Stack.Navigator>
);

export default OwnerPostsStack;
