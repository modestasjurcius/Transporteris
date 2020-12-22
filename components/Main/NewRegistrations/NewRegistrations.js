import React from 'react';
import { ScrollView, Text, StyleSheet } from 'react-native';
import { getNotVerifiedUsers } from '../../AuthenticationPages/Users';
import RegistrationItem from './RegistrationItem';

const NewRegistrations = props => {
    const newRegistrations = getNotVerifiedUsers();

    return (
        <ScrollView style={styles.container}>
            {newRegistrations && newRegistrations.length > 0 && newRegistrations.map((v, i) => {
                return (
                    <RegistrationItem 
                        key={i}
                        user={v.firstName + ' ' + v.lastName}
                        setUserCheckId={props.setUserToCheckId}
                        changeMainPage={props.changeMainPage}
                        id={v.id}
                    />
                );
            })}
            {newRegistrations && newRegistrations.length === 0 &&
                <Text style={styles.text}>No new registrations</Text>
            }
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        height: 450,
        textAlign: 'center',
        color: 'black',
        marginStart: 20,
        marginEnd: 20
    },
    text: {
        color: 'black',
        textAlign: 'center',
        fontSize: 18
    }
});

export default NewRegistrations;