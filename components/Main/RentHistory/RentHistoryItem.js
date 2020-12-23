import React, { useState } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { getTransportNameById, getTransportById } from '../Map/MapData';
import Button from '../../common/Button';
import Dialog from 'react-native-dialog';
import moment from 'moment';

const RentHistoryItem = props => {
    const [isDialogVisible, setIsDialogVisible] = useState(false);
    const transport = getTransportById(props.data.transportId);
    const transportName = getTransportNameById(props.data.transportId);

    const onDetails = () => {
        setIsDialogVisible(true);
    };

    return (
        <View style={styles.container}>
            <View style={styles.data}>
                <Text style={styles.text}>{transportName}</Text>
                <Text style={styles.text}>{moment(props.data.rentStart).format('YYYY-MM-DD HH:mm')}</Text>
            </View>
            <View>
                <Button
                    text='Details'
                    width={100}
                    onPress={onDetails}
                    success
                />
            </View>
            <Dialog.Container visible={isDialogVisible}>
                <Dialog.Title>Rent history</Dialog.Title>
                <Dialog.Description>
                    {
                        'Brand: ' + transport.brand + '\n' +
                        'Model: ' + transport.model + '\n' +
                        'Year: ' + transport.year + '\n' +
                        'Reservation time: ' + (props.data.reservationTimeMins ? props.data.reservationTimeMins : '0') + ' mins\n' +
                        'Rent time: ' + (props.data.rentTimeMins ? props.data.rentTimeMins : '0') + ' mins\n' +
                        'Rent price: ' + props.data.rentPrice + ' EUR\n' +
                        'Rented at: ' + moment(props.data.rentStart).format('YYYY-MM-DD HH:mm')
                    }
                </Dialog.Description>
                <Dialog.Button 
                    label="Close"
                    onPress={() => setIsDialogVisible(false)}
                ></Dialog.Button>
            </Dialog.Container>
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

export default RentHistoryItem;