import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AuthNavigation from './AuthNavigation';
import SnapyNavigator from './SnapyNavigator';
import { connect } from 'react-redux';
import { AppState } from '../store';

interface IProps {
    isAuth: boolean;
}

const Stack = createStackNavigator();

const AppNavigator: React.FC<IProps> = (props) => {
    return (
        <NavigationContainer>
            {!props.isAuth && <AuthNavigation />}
            {props.isAuth && <SnapyNavigator />}
        </NavigationContainer>
    );
};

const mapStateToProps = (state: AppState) => {
    return {
        isAuth: state.auth.token !== null,
    };
};
export default connect(mapStateToProps)(AppNavigator);
