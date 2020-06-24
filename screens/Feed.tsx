import React from 'react';
import { SafeAreaView, StyleSheet, FlatList, ActivityIndicator } from 'react-native';
import BlogPost from '../components/MainElements/BlogPost';
import { StackNavigationProp } from '@react-navigation/stack';
import { postData } from '../store/types/posts.module';
import Colors from '../constants/Colors';

interface Props {
    navigation: StackNavigationProp<any, any>;
    loading: boolean;
    posts: postData[];
}

const Home: React.FC<Props> = (props) => {
    return (
        <SafeAreaView style={styles.container}>
            {props.loading ? (
                <ActivityIndicator color={Colors.primary[1]} size={'large'} />
            ) : (
                <FlatList
                    style={styles.flatListStyle}
                    data={props.posts}
                    renderItem={({ item }) => (
                        <BlogPost
                            author={item.user.firstName + ' ' + item.user.lastName}
                            imageUrl={item.imageUrl}
                            title={item.title}
                            onViewDetails={() => props.navigation.navigate('Details', { title: item.title })}
                        />
                    )}
                    keyExtractor={(item) => item._id}
                />
            )}
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    flatListStyle: {
        flex: 1,
        width: '100%',
        height: '100%',
    },
});

export default Home;
