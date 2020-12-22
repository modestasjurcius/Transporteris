import React from 'react';
import { View, StyleSheet, ToastAndroid, Text } from 'react-native';
import Button from '../../common/Button';
import { getTransportById } from '../Map/MapData';
import moment from 'moment';

const PayPage = props => {
    const transport = getTransportById(props.data.transportId);

    const onPress = () => {
        if(props.data.rentPrice > 0)
            ToastAndroid.show('Rent price paid successfully!', 4000);
        else
            ToastAndroid.show('No price to pay', 4000);

        props.onRentPaid();
    }

    return (
        <View style={styles.container}>
            <View style={styles.row}>
                <Text style={styles.label}>Transport:</Text>
                <Text style={styles.text}>{transport.brand + ' ' + transport.model}</Text>
            </View>
            {props.data.reservationTimeMins > 0 &&
                <View style={styles.row}>
                    <Text style={styles.label}>Reservation time:</Text>
                    <Text style={styles.text}>{props.data.reservationTimeMins + ' mins'}</Text>
                </View>
            }
            <View style={styles.row}>
                <Text style={styles.label}>Rent time:</Text>
                <Text style={styles.text}>{props.data.rentTimeMins + ' mins'}</Text>
            </View>
            <View style={styles.row}>
                <Text style={styles.label}>Price:</Text>
                <Text style={styles.text}>{props.data.rentPrice + ' EUR'}</Text>
            </View>
            <View style={styles.row}>
                <Text style={styles.label}>Rent started at:</Text>
                <Text style={styles.text}>{moment(props.data.rentStart).format('YYYY-MM-DD HH:mm')}</Text>
            </View>
            <Button
                text={props.data.rentPrice > 0 ? 'Pay' : 'Back'}
                onPress={onPress}
                success={props.data.rentPrice > 0}
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

export default PayPage;