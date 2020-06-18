import React, { useEffect } from 'react';
import Home, { homeScreenOptions } from '../screens/Home';
import EditPost from '../screens/EditPost';
import { createStackNavigator } from '@react-navigation/stack';

import PostDetails from '../screens/PostDetails';
import { AppState } from '../store';
import { setAuthState, logout } from '../store/actions';
import { useDispatch, connect } from 'react-redux';
import { AsyncStorage, View, SafeAreaView, Button, Platform } from 'react-native';
import { userData } from '../store/types/auth.module';
import { createDrawerNavigator, DrawerItem, DrawerItemList } from '@react-navigation/drawer';
import Colors from '../constants/Colors';
import { Ionicons, Entypo } from '@expo/vector-icons';
const Drawer = createDrawerNavigator();

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
    const HomeStack = () => (
        <Stack.Navigator>
            <Stack.Screen name="Home" component={Home} options={homeScreenOptions} />
        </Stack.Navigator>
    );
    return (
        <Drawer.Navigator
            initialRouteName="Home"
            drawerContent={(props) => {
                return (
                    <View style={{ flex: 1, paddingTop: 20 }}>
                        <SafeAreaView>
                            <DrawerItemList {...props} />
                            <View style={{ marginTop: 15 }}>
                                <Button
                                    title="Logout"
                                    onPress={() => {
                                        dispatch(logout());
                                    }}
                                    color={Colors.secondary[1]}
                                />
                            </View>
                        </SafeAreaView>
                    </View>
                );
            }}
            drawerContentOptions={{ activeTintColor: Colors.primary[1] }}
        >
            <Drawer.Screen
                name="Home"
                component={HomeStack}
                options={{
                    drawerIcon: (props) => <Entypo name="news" size={23} color={props.color} />,
                }}
            />
            <Drawer.Screen
                name="Add a snap"
                component={EditPost}
                options={{
                    drawerIcon: (props) => (
                        <Ionicons
                            name={Platform.OS === 'android' ? 'md-create' : 'ios-create'}
                            size={23}
                            color={props.color}
                        />
                    ),
                }}
            />
        </Drawer.Navigator>
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
