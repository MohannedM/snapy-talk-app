import React from 'react';
import { View, ScrollView, Text, StyleSheet, Dimensions, Image } from 'react-native';
import Card from '../components/UI/Card';
import CustomButton from '../components/UI/CustomButton';

const PostDetails: React.FC = (props) => {
    return (
        <ScrollView>
            <View style={styles.container}>
                <Card style={styles.cardStyle}>
                    <Image
                        style={styles.cardImage}
                        source={{ uri: 'https://q-cf.bstatic.com/images/hotel/max1024x768/223/223087771.jpg' }}
                    />
                    <View style={styles.descriptionContainer}>
                        <Text style={styles.description}>
                            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Dolor illo impedit molestias quod.
                            Vitae odit cupiditate accusantium architecto iste perspiciatis sapiente officia iusto
                            expedita inventore possimus doloribus, itaque exercitationem reiciendis quam, nulla fuga
                            corrupti autem sequi? Cum alias repellat enim reiciendis beatae eos repudiandae nulla, eius
                            cumque sapiente quos id fugiat tenetur sunt rerum tempore delectus! Earum blanditiis
                            adipisci sapiente molestiae quos tenetur repellat dolorem vitae asperiores vel, enim velit.
                            Quaerat perferendis quos atque deleniti aperiam aut neque cumque soluta sapiente quam,
                            dolorum repellat inventore reiciendis omnis quisquam illum perspiciatis, et error culpa
                            delectus odit. Fugit dolor sequi debitis repellat?
                        </Text>
                    </View>
                    <View style={styles.actions}>
                        <CustomButton type={'Secondary'} onPress={() => {}} style={styles.actionButtons}>
                            Edit
                        </CustomButton>
                        <CustomButton type={'Primary'} strength={2} onPress={() => {}} style={styles.actionButtons}>
                            Delete
                        </CustomButton>
                    </View>
                </Card>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        padding: Dimensions.get('screen').width / 50,
    },
    cardStyle: {
        width: '100%',
        minHeight: '30%',
        backgroundColor: '#fff',
        margin: '3%',
    },
    cardImage: {
        borderTopRightRadius: 10,
        borderTopLeftRadius: 10,
        width: '100%',
        height: Dimensions.get('screen').height / 3,
    },
    descriptionContainer: {
        padding: Dimensions.get('screen').width / 25,
    },
    description: {
        fontWeight: '300',
    },
    actions: {
        flexDirection: 'row',
        padding: Dimensions.get('screen').width / 25,
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    actionButtons: {
        width: Dimensions.get('screen').width / 3,
    },
});

export default PostDetails;
