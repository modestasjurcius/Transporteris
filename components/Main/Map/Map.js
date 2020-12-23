import React from 'react';
import { View, StyleSheet } from 'react-native';
import MapboxGL from "@react-native-mapbox-gl/maps";
import { getAllTransports, userHasTransport } from './MapData';
import { getCurrentUser } from '../../AuthenticationPages/Users';
import { MAPS_API_KEY } from '@env';

const Map = props => {
    MapboxGL.setAccessToken(MAPS_API_KEY);
    MapboxGL.setConnected(true);
    MapboxGL.setTelemetryEnabled(false);

    const transportsData = getAllTransports(props.transportFilterType);
    const user = getCurrentUser();
    const hasTransport = userHasTransport(user.id);

    const onSelected = id => {
        if(props.setTransportId)
            props.setTransportId(id);
    }

    return (
        <View style={styles.container}>
            <MapboxGL.MapView 
                style={styles.map}
                logoEnabled={false}
            >
                <MapboxGL.Camera 
                    zoomLevel={14.5}
                    centerCoordinate={[25.259881, 54.711504]}
                />
                {transportsData && transportsData.length > 0 &&
                    transportsData.map((v, i) => {
                        if(hasTransport && v.userId !== user.id)
                            return null;
                        
                        const id = 'point' + i;
                        return (
                            <MapboxGL.PointAnnotation
                                key={i}
                                id={id}
                                x={0.5}
                                y={0.5}
                                coordinate={v.position}
                                onSelected={() => onSelected(v.id)}
                            />
                        );
                    })
                }
            </MapboxGL.MapView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        height: 500
    },
    map: {
        flex: 1
    }
});

export default Map;