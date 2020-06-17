import React, { useEffect } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Home from '../screens/Home';
import { AppState } from '../store';
import { setAuthState } from '../store/actions';
import { useDispatch, connect } from 'react-redux';
import { AsyncStorage } from 'react-native';
import { userData } from '../store/types/auth.module';
const Stack = createStackNavigator();

interface Props {
    isAuthSet: boolean;
    userData: userData;
}
const SnapyNavigator: React.FC<Props> = (props) => {
    const dispatch = useDispatch();
    const { isAuthSet } = props;
    useEffect(() => {
        if (!isAuthSet) {
            AsyncStorage.setItem('userData', JSON.stringify(props.userData), () => {
                dispatch(setAuthState());
            });
        }
    }, [isAuthSet]);
    return (
        <Stack.Navigator>
            <Stack.Screen name="Home" component={Home} />
        </Stack.Navigator>
    );
};
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

export default connect(mapStateToProps, null)(SnapyNavigator);
