import React from 'react';
import { View, Text, StyleSheet, Button, AsyncStorage, Platform, Image, Dimensions } from 'react-native';
import { connect } from 'react-redux';
import Colors from '../constants/Colors';
import BlogPost from '../components/MainElements/BlogPost';
import CustomHeaderButton from '../components/UI/CustomHeaderButton';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';

interface Props {}

const Home: React.FC<Props> = (props) => {
    return (
        <View style={styles.container}>
            <BlogPost
                title="This is a cool sea"
                author="Mohanned Farahat"
                imageUrl="https://q-cf.bstatic.com/images/hotel/max1024x768/223/223087771.jpg"
            />
            <BlogPost
                title="This is a cool book"
                author="Hossam Hassan"
                imageUrl="https://assets.entrepreneur.com/content/3x2/2000/20191219170611-GettyImages-1152794789.jpeg"
                isLiked
            />
            <Text>HELLO, THIS IS HOME</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
    },
});

export const homeScreenOptions = (navData: any) => {
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

export default connect(null, null)(Home);
