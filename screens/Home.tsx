import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Button, AsyncStorage } from 'react-native';
import { useDispatch, connect } from 'react-redux';
import { logout } from '../store/actions';
import { AppState } from '../store';
import { userData } from '../store/types/auth.module';

interface Props {
    userData: userData;
}

const Home: React.FC<Props> = (props) => {
    const dispatch = useDispatch();

    return (
        <View style={styles.container}>
            <Text>HELLO, THIS IS HOME</Text>
            <Button
                title="Logout"
                onPress={() => {
                    AsyncStorage.removeItem('userData', () => {
                        dispatch(logout());
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
        textAlign: 'center',
        justifyContent: 'center',
    },
});
const mapStateToProps = (state: AppState) => {
    return {
        isAuthSet: state.auth.isAuthSet,
        userData: {
            _id: state.auth._id,
            firstName: state.auth.firstName,
            lastName: state.auth.lastName,
            email: state.auth.email,
            token: state.auth.token,
        },
    };
};

export default connect(mapStateToProps, null)(Home);
