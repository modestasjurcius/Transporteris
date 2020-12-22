import React from 'react';
import { ScrollView, StyleSheet, Text } from 'react-native';
import { getRentHistoryByUserId } from '../Map/MapData';
import { getCurrentUser } from '../../AuthenticationPages/Users';
import RentHistoryItem from './RentHistoryItem';

const RentHistoryList = props => {
    const user = getCurrentUser();
    const rentHistory = getRentHistoryByUserId(user.id);

    return (
        <ScrollView style={styles.container}>
            {rentHistory && rentHistory.length > 0 && rentHistory.map((h, i) => {
                return (
                    <RentHistoryItem 
                        key={i}
                        data={h}
                    />
                );
            })}
            {rentHistory && rentHistory.length === 0 &&
                <Text style={styles.text}>No transport has been rented</Text>
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

export default RentHistoryList;