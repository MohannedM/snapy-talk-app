import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AuthNavigation from './AuthNavigation';
import SnapyNavigator from './SnapyNavigator';
import { connect } from 'react-redux';
import { AppState } from '../store';
import StartingScreen from '../screens/StartingScreen';

interface IProps {
    isAuth: boolean;
    checkAuthLoading: boolean;
}

const Stack = createStackNavigator();

const AppNavigator: React.FC<IProps> = (props) => {
    return (
        <NavigationContainer>
            {props.checkAuthLoading && <StartingScreen />}
            {!props.isAuth && !props.checkAuthLoading && <AuthNavigation />}
            {props.isAuth && !props.checkAuthLoading && <SnapyNavigator />}
        </NavigationContainer>
    );
};

const mapStateToProps = (state: AppState) => {
    return {
        isAuth: state.auth.token !== null,
        checkAuthLoading: state.auth.authCheckLoading,
    };
};
export default connect(mapStateToProps)(AppNavigator);
