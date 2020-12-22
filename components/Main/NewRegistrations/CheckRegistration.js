import React from 'react';
import { View, StyleSheet, Text, ToastAndroid } from 'react-native';
import { getUserById, verifyUserById } from '../../AuthenticationPages/Users';
import Button from '../../common/Button';

const CheckRegistration = props => {
    const user = getUserById(props.id);

    const onVerify = () => {
        if (verifyUserById(props.id) && props.changeMainPage) {
            ToastAndroid.show('User verified successfully!', 4000);
            props.changeMainPage('new-registrations');
        }
    };

    const onCancel = () => {
        if(props.changeMainPage) {
            ToastAndroid.show('Cancelled user verification', 4000);
            props.changeMainPage('new-registrations');
        }

    }

    return (
        <View style={styles.container}>
            <View style={styles.row}>
                <Text style={styles.label}>First name:</Text>
                <Text style={styles.text}>{user.firstName}</Text>
            </View>
            <View style={styles.row}>
                <Text style={styles.label}>Last name:</Text>
                <Text style={styles.text}>{user.lastName}</Text>
            </View>
            <View style={styles.row}>
                <Text style={styles.label}>User Name:</Text>
                <Text style={styles.text}>{user.login}</Text>
            </View>
            <View style={styles.row}>
                <Text style={styles.label}>Email:</Text>
                <Text style={styles.text}>{user.email}</Text>
            </View>
            <Button
                text='Verify'
                onPress={onVerify}
                success
            />
            <Button
                text='Cancel'
                onPress={onCancel}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        height: 450,
        alignItems: 'center'
    },
    row: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingLeft: 10,
        paddingRight: 10,
        marginBottom: 20,
        width: 250,
        borderColor: 'white',
        borderRadius: 25,
        borderWidth: 1
    },
    label: {
        color: 'black'
    },
    text: {
        color: 'blue'
    }
});

export default CheckRegistration;