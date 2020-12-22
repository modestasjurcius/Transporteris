import React, { useEffect, useRef } from 'react';
import { View, StyleSheet, Animated, Dimensions, Text, ToastAndroid } from 'react-native';
import { 
    getTransportById, 
    setTransportRented, 
    setTransportReserved, 
    setReservationDuration, 
    cancelReservation,
    endRent
} from './MapData';
import { getCurrentUser } from '../../AuthenticationPages/Users';
import TextRowItem from './TexRowItem';
import Button from '../../common/Button';
import moment from 'moment';

const TransportFragment = props => {
    const slideAnim = useRef(new Animated.Value(0)).current;
    const transport = getTransportById(props.id);
    const user = getCurrentUser();

    useEffect(() => {
        Animated.timing(
            slideAnim,
            {
                toValue: 1,
                duration: 500,
                useNativeDriver: true
            }
        ).start();
    }, [slideAnim]);

    const onRent = () => {
        if (user.isAdmin) {
            ToastAndroid.show('Administrator cannot rent a vehicle!', 4000);
            return;
        }

        if (setTransportRented(transport.id, user.id)) {
            ToastAndroid.show('Successfully rented a vehicle!', 4000);
            props.setFragmentTransportId(transport.id);
            props.forceUpdate();
        }
    }

    const onUnlock = () => {
        if (transport.isReserved)
            setReservationDuration(transport.id);

        if (setTransportRented(transport.id, user.id)) {
            ToastAndroid.show('Successfully rented a vehicle!', 4000);
            props.forceUpdate();
        }
    }

    const onCancelReservation = () => {
        cancelReservation(transport.id);
        ToastAndroid.show('Reservation cancelled', 4000);
        props.forceUpdate();
    }

    const onReserve = () => {
        if (user.isAdmin) {
            ToastAndroid.show('Administrator cannot reserve a vehicle!', 4000);
            return;
        }

        if (setTransportReserved(transport.id, user.id)) {
            ToastAndroid.show('Successfully reserved a vehicle!', 4000);
            props.forceUpdate();
        }
    }

    const onEndRent = () => {
        var data = endRent(transport.id, user.id);
        props.onRentEnded(data)
        props.forceUpdate();
    }

    const renderButtons = () => {
        return (
            <View style={{
                ...styles.buttonsContainer,
                marginTop: (transport.isRented || transport.isReserved) ? -60 : 70
            }}>
                {(!transport.isRented && !transport.isReserved) &&
                    <React.Fragment>
                        <Button
                            text='Rent'
                            onPress={onRent}
                            width={150}
                            success
                        />
                        <Button
                            text='Reserve'
                            onPress={onReserve}
                            width={150}
                            info
                        />
                    </React.Fragment>
                }
                {(!transport.isRented && transport.isReserved) &&
                    <React.Fragment>
                        <Button
                            text='Unlock'
                            onPress={onUnlock}
                            width={150}
                            success
                        />
                        <Button
                            text='Cancel reservation'
                            onPress={onCancelReservation}
                            width={150}
                        />
                    </React.Fragment>
                }
                {(transport.isRented && !transport.isReserved) &&
                        <Button
                            text='End rent'
                            onPress={onEndRent}
                            width={150}
                        />
                }
            </View>
        );
    }

    return (
        <Animated.View
            style={
                {
                    ...styles.container,
                    translateY: slideAnim.interpolate({
                        inputRange: [0, 1],
                        outputRange: [300, 0]
                    })
                }
            }
        >
            <Text style={styles.mainLabel}>{transport.brand + ' ' + transport.model}</Text>
            <View style={styles.columnsContainer}>
                <View style={styles.column}>
                    <TextRowItem labelText='Brand:' text={transport.brand} />
                    <TextRowItem labelText='Model:' text={transport.model} />
                    <TextRowItem labelText='Year:' text={transport.year} />
                    <TextRowItem labelText='Transmission:' text={transport.transmission} />
                </View>
                <View style={styles.column}>
                    <TextRowItem labelText='Price/minute:' text={transport.priceMin + ' EUR/min'} />
                    <TextRowItem labelText='Price/km:' text={transport.priceKm + ' EUR/km'} />
                    <TextRowItem labelText='Fuel:' text={transport.fuel + '%'} />
                    <TextRowItem labelText='Reservation price:' text={transport.reservePrice + ' EUR/min'} />
                </View>
            </View>
            {(transport.isRented || transport.isReserved) &&
                <TextRowItem
                    labelText={transport.isRented ? 'Rent start: ' : 'Reserve start: '}
                    text={
                        moment(transport.isRented ? transport.rentStart : transport.reserveStart)
                        .format('YYYY-MM-DD HH:mm') +
                        ((transport.reservationDuration)
                            ? 
                            ('\n + ' + transport.reservationDuration + ' reservation minutes')
                            :
                            '')
                    }
                    marginTop={60}
                    marginStart={20}
                    width={320}
                    textRed
                />
            }
            {renderButtons()}
        </Animated.View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        zIndex: 1,
        position: 'absolute',
        left: 0,
        top: Dimensions.get('window').height - 300,
        width: Dimensions.get('window').width,
        height: 300,
    },
    mainLabel: {
        color: 'black',
        borderColor: 'black',
        borderTopWidth: 2,
        borderBottomWidth: 2,
        textAlign: 'center',
        fontSize: 20,
        marginBottom: 20,
        backgroundColor: '#ee948e',
        fontWeight: '700'
    },
    columnsContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-around'
    },
    column: {
        height: 150,
        //marginStart: 10
    },
    buttonsContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
    }
});

export default TransportFragment;