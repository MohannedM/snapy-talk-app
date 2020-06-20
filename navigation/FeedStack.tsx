import React from 'react';
import CustomHeaderButton from '../components/UI/CustomHeaderButton';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { createStackNavigator } from '@react-navigation/stack';
import Feed from '../screens/Feed';
import { Platform } from 'react-native';
import Colors from '../constants/Colors';
import PostDetails from '../screens/PostDetails';
import { detailsScreenOptions } from './OwnerPostsStack';

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

const FeedStack: React.FC = (props) => (
    <Stack.Navigator>
        <Stack.Screen name="Home" component={Feed} options={homeScreenOptions} />
        <Stack.Screen name="Details" component={PostDetails} options={detailsScreenOptions} />
    </Stack.Navigator>
);

export default FeedStack;
