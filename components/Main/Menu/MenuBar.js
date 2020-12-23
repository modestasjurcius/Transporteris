import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import MenuBarButton from './MenuBarButton';

const MenuBar = props => {
    const toggleSideBar = value => {
        if (props.toggleSideBar)
            props.toggleSideBar(value);
    };

    const changeMainPage = page => {
        if(props.changeMainPage)
            props.changeMainPage(page);
    };

    const setMapTransportFilterType = type => {
        if(props.onFilterChanged)
            props.onFilterChanged(type);
    };

    return (
        <View style={styles.container}>
            <MenuBarButton
                icon='menu'
                type='feather'
                onPress={() => toggleSideBar(true)}
            />
            {props.isMapOpen &&
                <React.Fragment>
                    <MenuBarButton
                        icon='car'
                        type='font-awesome-5'
                        onPress={() => setMapTransportFilterType(1)}
                        isPressed={props.transportFilterType === 1}
                    />
                    <MenuBarButton
                        icon='truck'
                        type='font-awesome-5'
                        onPress={() => setMapTransportFilterType(2)}
                        isPressed={props.transportFilterType === 2}
                    />
                    <MenuBarButton
                        icon='menu-fold'
                        type='ant-design'
                    />
                </React.Fragment>
            }
            {!props.isMapOpen &&
                <MenuBarButton
                    icon='globe'
                    type='entypo'
                    onPress={() => changeMainPage('map')}
                />
            }
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 5
    }
});

export default MenuBar;