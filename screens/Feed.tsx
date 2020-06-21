import React, { useEffect } from 'react';
import { View, StyleSheet, Platform } from 'react-native';
import { connect } from 'react-redux';
import BlogPost from '../components/MainElements/BlogPost';
import { StackNavigationProp } from '@react-navigation/stack';
import { Dispatch } from 'redux';

interface Props {
    navigation: StackNavigationProp<any, any>;
}

const Home: React.FC<Props> = (props) => {
    useEffect(() => {
        props.navigation.setParams({ from: 'Feed' });
    }, []);
    return (
        <View style={styles.container}>
            <BlogPost
                title="This is a cool sea"
                author="Mohanned Farahat"
                imageUrl="https://q-cf.bstatic.com/images/hotel/max1024x768/223/223087771.jpg"
                onViewDetails={() => {
                    props.navigation.navigate('Details', { title: 'This is a cool sea' });
                }}
            />
            <BlogPost
                title="This is a cool book"
                author="Hossam Hassan"
                imageUrl="https://assets.entrepreneur.com/content/3x2/2000/20191219170611-GettyImages-1152794789.jpeg"
                isLiked
                onViewDetails={() => {}}
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

// const mapDispatchToProps = (dispatch: Dispatch) => {
//     return {
//         onReachStories: () => dispatch(reachedMyStories()),
//     };
// };

export default connect(null, null)(Home);
