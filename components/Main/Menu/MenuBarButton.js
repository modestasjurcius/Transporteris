import React from 'react';
import { Pressable, StyleSheet } from 'react-native';
import { Icon } from 'react-native-elements';

const MenuBarButton = props => {
    return (
        <Pressable 
            style={{
                ...styles.btn,
                borderWidth: props.isPressed ? 2 : 0
            }}
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
        borderColor: 'black'
    },
    icon: {
        marginTop: 14
    }
});

export default MenuBarButton;