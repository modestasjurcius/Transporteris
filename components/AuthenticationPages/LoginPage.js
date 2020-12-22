import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, View, ToastAndroid } from 'react-native';
import Button from '../common/Button';
import TextInput from '../common/TextInput';
import { findUser, setCurrentUser } from './Users';

const LoginPage = props => {
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');

    const onLogin = () => {
        var user = findUser(login, password);
        setCurrentUser(user);
        
        if(user && props.changePage)
            props.changePage('main');
        else
            ToastAndroid.show('User not found', 4000);
    }

    const onBack = () => {
        if(props.changePage)
            props.changePage('landing');
    }

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.pageLabel}>Login</Text>
            <TextInput 
                onChangeText={value => setLogin(value)}
                placeholder='Username' 
            />
            <TextInput 
                secureTextEntry={true}
                onChangeText={value => setPassword(value)}
                placeholder='Password' 
            />
            <View style={{ margin: 10 }} />
            <Button 
                text="Login"
                onPress={onLogin}
                success
            />
            <Button 
                text="Back"
                onPress={onBack}
            />
        </ScrollView >
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    pageLabel: {
        fontSize: 27,
        paddingBottom: 10,
        color: 'black'
    }
});

export default LoginPage;

