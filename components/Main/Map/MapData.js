import moment from 'moment';

const transports = [
    {
        id: 0,
        brand: 'Audi',
        model: 'A4 B7',
        year: '2007',
        transmission: 'Automatic',
        priceMin: 0.50,
        priceKm: 0.50,
        reservePrice: 0.05,
        fuel: 85,
        isReserved: false,
        isRented: false,
        isAvailableForRent: true,
        userId: null,
        position: [25.259347, 54.710892],
    },
    {
        id: 1,
        brand: 'BMW',
        model: 'F11',
        year: '2012',
        transmission: 'Automatic',
        priceMin: 0.75,
        priceKm: 0.60,
        reservePrice: 0.10,
        fuel: 65,
        isReserved: false,
        isRented: false,
        isAvailableForRent: true,
        userId: null,
        position: [25.260085, 54.710733],
    },
    {
        id: 2,
        brand: 'Nissan',
        model: 'S14',
        year: '1998',
        transmission: 'Manual',
        priceMin: 1.50,
        priceKm: 0.70,
        reservePrice: 0.25,
        fuel: 45,
        isReserved: false,
        isRented: false,
        isAvailableForRent: true,
        userId: null,
        position: [25.260688, 54.711031],
    },
    {
        id: 3,
        brand: 'Nissan',
        model: 'Supra',
        year: '2000',
        transmission: 'Manual',
        priceMin: 1.50,
        priceKm: 0.70,
        reservePrice: 0.25,
        fuel: 95,
        isReserved: false,
        isRented: false,
        isAvailableForRent: true,
        userId: null,
        position: [25.261697, 54.711192],
    },
]

export function getAllTransports() {
    return transports;
}

export function getTransportById(id) {
    return transports.find(v => v.id === id);
}

export function getTransportNameById(id) {
    var t = transports.find(t => t.id === id);
    return t.brand + ' ' + t.model;
}

// #region rent handlers

export function setTransportRented(transportId, userId) {
    const tId = transports.findIndex(t => t.id === transportId);
    transports[tId].userId = userId;
    transports[tId].isReserved = false;
    transports[tId].isRented = true;
    transports[tId].isAvailableForRent = false;
    transports[tId].rentStart = moment();
    return true;
}

export function setTransportReserved(transportId, userId) {
    const tId = transports.findIndex(t => t.id === transportId);
    transports[tId].userId = userId;
    transports[tId].isReserved = true;
    transports[tId].isAvailableForRent = false;
    transports[tId].reserveStart = moment();
    console.log('setTransportReserved time: ' + transports[tId].reserveStart);
    return true;
}

export function userHasTransport(userId) {
    return transports.filter(t => t.userId === userId).length > 0;
}

export function setReservationDuration(transportId) {
    const tId = transports.findIndex(t => t.id === transportId);
    var diff = moment.duration(moment().diff(transports[tId].reserveStart));
    transports[tId].reservationDuration = Math.abs(diff.asMinutes().toFixed(0));
}

export function cancelReservation(transportId) {
    const tId = transports.findIndex(t => t.id === transportId);
    transports[tId].isReserved = false;
    transports[tId].userId = null;
    transports[tId].reserveStart = null;
}

export function endRent(transportId, userId) {
    const tId = transports.findIndex(t => t.id === transportId);

    var rentDiff = moment.duration(moment().diff(transports[tId].rentStart));
    var rentTime = Math.abs(rentDiff.asMinutes().toFixed(0));

    var rentPrice = rentTime * transports[tId].priceMin;
    if(transports[tId].reservationDuration)
        rentPrice += transports[tId].reservationDuration * transports[tId].reservePrice;

    const price = rentPrice.toFixed(2);
    lastHistoryItem += 1;
    var historyItem = {
        id: lastHistoryItem,
        userId: userId,
        transportId: transportId,
        reservationTimeMins: transports[tId].reservationDuration,
        rentTimeMins: rentTime,
        rentPrice: price,
        rentStart: transports[tId].rentStart
    };

    rentHistory.push(historyItem);

    transports[tId].isRented = false;
    transports[tId].isReserved = false;
    transports[tId].userId = null;
    transports[tId].reserveStart = null;
    transports[tId].rentStart = null;
    transports[tId].reservationDuration = null;

    return historyItem;
}

// #endregion

var lastHistoryItem = 0;
var rentHistory = [
    {
        id: 0,
        userId: 1,
        transportId: 2,
        reservationTimeMins: 10,
        rentTimeMins: 36,
        rentPrice: 10.46,
        rentStart: '2020-12-21 21:24'
    }
];

export function getRentHistoryByUserId(userId) {
    return rentHistory.filter(r => r.userId === userId);
}