import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Button, AsyncStorage, Platform, Image, Dimensions } from 'react-native';
import { connect } from 'react-redux';
import { logout } from '../store/actions';
import { logoutType } from '../store/types/auth.module';
import { Dispatch } from 'redux';
import Colors from '../constants/Colors';
import Card from '../components/UI/Card';
import { AntDesign, Fontisto } from '@expo/vector-icons';

interface Props {
    onLogout: () => logoutType;
}

const Home: React.FC<Props> = (props) => {
    return (
        <View style={styles.container}>
            <Card style={styles.cardStyle}>
                <Image
                    style={styles.cardImage}
                    source={{
                        uri: 'https://q-cf.bstatic.com/images/hotel/max1024x768/223/223087771.jpg',
                    }}
                />
                <View style={styles.cardTitleContainer}>
                    <Text style={styles.cardTitle}>This is a cool sea</Text>
                    <Text style={styles.cardOwner}>By: Mohanned Farahat</Text>
                </View>
                <View style={styles.actions}>
                    <AntDesign name="like2" size={21} color={Colors.secondary[1]} />
                    <Fontisto name="preview" size={21} color={Colors.primary[1]} />
                </View>
            </Card>
            <Card style={styles.cardStyle}>
                <Image
                    style={styles.cardImage}
                    source={{
                        uri:
                            'https://assets.entrepreneur.com/content/3x2/2000/20191219170611-GettyImages-1152794789.jpeg',
                    }}
                />
                <View style={styles.cardTitleContainer}>
                    <Text style={styles.cardTitle}>This is a cool book</Text>
                    <Text style={styles.cardOwner}>By: Mohanned Farahat</Text>
                </View>
                <View style={styles.actions}>
                    <AntDesign name="like1" size={21} color={Colors.secondary[1]} />
                    <Fontisto name="preview" size={21} color={Colors.primary[1]} />
                </View>
            </Card>
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
    cardStyle: {
        width: '90%',
        minHeight: '30%',
        backgroundColor: '#fff',
        margin: '3%',
    },
    cardImage: {
        borderTopRightRadius: 10,
        borderTopLeftRadius: 10,
        width: '100%',
        height: Dimensions.get('screen').height / 5,
    },
    cardTitleContainer: {
        marginTop: 5,
    },
    cardTitle: {
        textAlign: 'center',
        color: Colors.primary[1],
        fontSize: 16,
    },
    actions: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 5,
        padding: 15,
    },
    cardOwner: {
        textAlign: 'center',
        color: Colors.secondary[0],
        fontSize: 14,
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
