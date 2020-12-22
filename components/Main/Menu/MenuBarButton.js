import React from 'react';
import { Pressable, StyleSheet } from 'react-native';
import { Icon } from 'react-native-elements';

const MenuBarButton = props => {
    return (
        <Pressable 
            style={styles.btn}
            onPress={props.onPress}
        >
            <Icon 
                style={styles.icon} 
                name={props.icon}
                type={props.type}
            />
        </Pressable>
    );
};

const styles = StyleSheet.create({
    btn: {
        width: 55,
        height: 55,
        backgroundColor: '#fff',
        borderRadius: 50,
        borderColor: '#ee948e'
    },
    icon: {
        margin: 12
    }
});

export default MenuBarButton;