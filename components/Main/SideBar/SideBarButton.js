import React from 'react';
import { Pressable, Text, StyleSheet, View } from 'react-native';
import { Icon } from 'react-native-elements';

const SideBarButton = props => {
    return (
            <Pressable
                style={{
                    ...styles.btn,
                    marginTop: props.last ? props.admin ? 410 : 370 : 0
                }}
                onPress={props.onPress}
            >
                <View style={styles.btnContainer}>
                    <Text style={styles.text}>{props.text}</Text>
                    <Icon
                        name={props.icon}
                        type={props.type ? props.type : 'ant-design'}
                    />
                </View>
            </Pressable>
    );
};

const styles = StyleSheet.create({
    btn: {
        borderColor: '#bc453e',
        borderRadius: 5,
        borderWidth: 2,
        margin: 1,
        height: 35,
        marginBottom: 5 
    },
    btnContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        alignSelf: 'auto'
    },
    text: {
        fontSize: 16,
        color: 'black'
    }
});

export default SideBarButton;