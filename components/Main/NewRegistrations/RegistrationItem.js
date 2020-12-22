import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import Button from '../../common/Button';

const RegistrationItem = props => {

    const onCheck = () => {
        console.log('onCheck');
        if(props.setUserCheckId && props.changeMainPage) {
            console.log('onCheck2');
            props.setUserCheckId(props.id);
            props.changeMainPage('check-registration');
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.data}>
                <Text style={styles.text}>{props.user}</Text>
            </View>
            <View>
                <Button
                    text='Check'
                    width={100}
                    onPress={onCheck}
                    success
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: 300,
        height: 60,
        borderRadius: 20,
        backgroundColor: 'white',
        margin: 10,
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    data: {
        marginStart: 10
    },
    text: {
        color: 'black'
    }
});

export default RegistrationItem;