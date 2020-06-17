import React, { useEffect } from 'react';
import { ActivityIndicator, StyleSheet, ViewStyle, AsyncStorage } from 'react-native';
import Colors from '../constants/Colors';
import { useDispatch } from 'react-redux';
import { checkAuthState } from '../store/actions';

const StartingScreen: React.FC = (props) => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(checkAuthState());
        return () => {};
    });
    return <ActivityIndicator style={styles.container} size="large" color={Colors.primary[1]} />;
};

interface Styles {
    container: ViewStyle;
}

const styles = StyleSheet.create<Styles>({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
});

export default StartingScreen;
