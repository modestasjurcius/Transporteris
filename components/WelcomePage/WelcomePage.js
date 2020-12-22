import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import Button from '../common/Button';

const WelcomePage = props => {

    const onPress = pageToChange => {
        if(props.changePage)
            props.changePage(pageToChange);
    }

    return (
        <View style={styles.container}>
            <Text style={styles.logoText}>TRANSPORTERIS</Text>
            <Button 
                onPress={() => onPress('login')}
                text='Login'
                success
            />
            <Button 
                onPress={() => onPress('register')}
                text='Register'
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#bc453e',
        flex: 1,
        justifyContent: 'flex-end',
        flexDirection: 'column',
        marginBottom: 100,
    },
    logoText: {
        fontSize: 28,
        marginBottom: 200,
        textAlign: 'center'
    }
})

export default WelcomePage;