import React, { useState } from 'react';
import AppNavigator from './navigation/AppNavigator';
import * as Fonts from 'expo-font';
import { AppLoading } from 'expo';
import { Provider } from 'react-redux';
import { store } from './store';

const fetchFonts = () => {
    return Fonts.loadAsync({
        'open-sans': require('./assets/fonts/OpenSans-Regular.ttf'),
        'open-sans-bold': require('./assets/fonts/OpenSans-Bold.ttf'),
    });
};

export default function App() {
    const [dataLoaded, setDataLoaded] = useState(false);
    if (!dataLoaded) {
        return <AppLoading startAsync={fetchFonts} onFinish={() => setDataLoaded(true)} />;
    }
    return (
        <Provider store={store}>
            <AppNavigator />
        </Provider>
    );
}
