import React from 'react';
import { StyleSheet, View } from 'react-native';
import WelcomePage from '../WelcomePage/WelcomePage';
import LoginPage from '../AuthenticationPages/LoginPage';
import MainPage from '../Main/MainPage';
import RegisterPage from '../AuthenticationPages/RegisterPage';

const Layout = props => {
    return (
        <View style={style.container}>
            {props.page === 'landing' && <WelcomePage changePage={props.changePage} />}
            {props.page === 'login' && <LoginPage changePage={props.changePage} />}
            {props.page === 'main' && <MainPage changePage={props.changePage} />}
            {props.page === 'register' && <RegisterPage changePage={props.changePage} />}
        </View>
    );
}

const style = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#bc453e',
        alignItems: 'center',
        justifyContent: 'center',
    }
});

export default Layout;