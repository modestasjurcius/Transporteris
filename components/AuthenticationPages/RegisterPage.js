import React, { useState } from 'react';
import { StyleSheet, ToastAndroid, View, Text, ScrollView } from 'react-native';
import Button from '../common/Button';
import TextInput from '../common/TextInput';
import { addUser } from './Users';

const RegisterPage = props => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [userName, setUserName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirm, setPasswordConfirm] = useState('');

    const onRegister = () => {
        if (!firstName) {
            ToastAndroid.show('First name cannot be empty!', 4000);
            return;
        }

        if (!lastName) {
            ToastAndroid.show('Last name cannot be empty!', 4000);
            return;
        }

        if (!userName) {
            ToastAndroid.show('Username cannot be empty!', 4000);
            return;
        }

        if (!email) {
            ToastAndroid.show('Email cannot be empty!', 4000);
            return;
        }

        if (!password) {
            ToastAndroid.show('Password cannot be empty!', 4000);
            return;
        }

        if (password.length < 4) {
            ToastAndroid.show('Password must contain at least 5 characters!', 4000);
            return;
        }

        if (!passwordConfirm) {
            ToastAndroid.show('Password confirmation cannot be empty!', 4000);
            return;
        }

        if (password !== passwordConfirm) {
            ToastAndroid.show('Passwords do not match!', 4000);
            return;
        }

        var data = {
            login: userName,
            password: password,
            firstName: firstName,
            lastName: lastName,
            email: email,
            isVerified: false,
            isAdmin: false
        };

        if(addUser(data)) {
            ToastAndroid.show('Registered. You can now log in', 4000);
            if(props.changePage)
                props.changePage('login');
        }
    }

    const onBack = () => {
        if (props.changePage)
            props.changePage('landing');
    }

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.pageLabel}>Registration</Text>
            <View style={styles.row}>
                <Text style={styles.label}>First Name</Text>
                <TextInput
                    placeholder='First Name'
                    value={firstName}
                    onChangeText={text => setFirstName(text)}
                />
            </View>
            <View style={styles.row}>
                <Text style={styles.label}>Last Name</Text>
                <TextInput
                    placeholder='Last Name'
                    value={lastName}
                    onChangeText={text => setLastName(text)}
                />
            </View>
            <View style={styles.row}>
                <Text style={styles.label}>Email</Text>
                <TextInput
                    placeholder='Email'
                    value={email}
                    onChangeText={text => setEmail(text)}
                />
            </View>
            <View style={styles.row}>
                <Text style={styles.label}>User Name</Text>
                <TextInput
                    placeholder='User Name'
                    value={userName}
                    onChangeText={text => setUserName(text)}
                />
            </View>
            <View style={styles.row}>
                <Text style={styles.label}>Password</Text>
                <TextInput
                    placeholder='Passowrd'
                    value={password}
                    onChangeText={text => setPassword(text)}
                    secureTextEntry
                />
            </View>
            <View style={styles.row}>
                <Text style={styles.label}>Confirm password</Text>
                <TextInput
                    placeholder='Confirm passowrd'
                    value={passwordConfirm}
                    onChangeText={text => setPasswordConfirm(text)}
                    secureTextEntry
                />
            </View>

            <Button
                text="Register"
                onPress={onRegister}
                success
            />
            <Button
                text="Back"
                onPress={onBack}
            />
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        flexDirection: 'column',
        alignItems: 'center'
    },
    pageLabel: {
        fontSize: 27,
        paddingBottom: 10,
        color: 'black'
    },
    row: {
        flex: 1,
        width: 300,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        margin: 0,
        padding: 0
    },
    label: {
        color: 'black',
        fontSize: 15,
        width: 75
    }
});

export default RegisterPage;