import React from 'react';
import { View, Text, StyleSheet, Button, AsyncStorage, Platform, Image, Dimensions } from 'react-native';
import { connect } from 'react-redux';
import { logout } from '../store/actions';
import { logoutType } from '../store/types/auth.module';
import { Dispatch } from 'redux';
import Colors from '../constants/Colors';
import Card from '../components/UI/Card';
import { AntDesign, Fontisto } from '@expo/vector-icons';
import BlogPost from '../components/MainElements/BlogPost';

interface Props {
    onLogout: () => logoutType;
}

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

            <Button
                title="Logout"
                onPress={() => {
                    AsyncStorage.removeItem('userData', () => {
                        props.onLogout();
                    });
                }}
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

const mapDispatchToProps = (dispatch: Dispatch) => {
    return {
        onLogout: () => dispatch(logout()),
    };
};

export const homeScreenOptions = () => {
    return {
        title: 'Snapy News Feed',
        headerStyle: {
            backgroundColor: Platform.OS === 'android' ? Colors.primary[1] : '',
        },
        headerTintColor: Platform.OS === 'ios' ? Colors.primary[1] : '#fff',
        headerTitleStyle: {
            fontWeight: 'bold',
        },
    };
};

export default connect(null, mapDispatchToProps)(Home);
