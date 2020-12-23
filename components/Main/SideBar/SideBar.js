import React, { useRef, useEffect } from 'react';
import { View, StyleSheet, Dimensions, Animated, ToastAndroid } from 'react-native';
import SiderBarButton from './SideBarButton';
import { getCurrentUser, setCurrentUser } from '../../AuthenticationPages/Users';

const SideBar = props => {
    const slideAnim = useRef(new Animated.Value(0)).current;
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

    const onCloseSideBar = () => {
        Animated.timing(
            slideAnim,
            {
                toValue: 0,
                duration: 500,
                useNativeDriver: true
            }
        ).start(() => {
            if (props.toggleSideBar)
                props.toggleSideBar(false);
        });
    };

    const onLogout = () => {
        setCurrentUser(null);

        if (props.changePage)
            props.changePage('landing');

        ToastAndroid.show('Logged out successfully!', 4000);
    };

    const handlePageChange = page => {
        if(props.changeMainPage)
            props.changeMainPage(page);
    }

    const renderByUser = () => {
        if(user && user.isAdmin)
            return renderAdminButtons();
        else
            return renderClientButtons();
    }

    const renderAdminButtons = () => {
        return (
            <View>
                <SiderBarButton
                    text='New registrations'
                    icon='adduser'
                    onPress={() => handlePageChange('new-registrations')}
                />
                <SiderBarButton
                    text='Unanswered questions'
                    icon='question-answer'
                    type='material-icons'
                    onPress={() => handlePageChange('unanswered-questions')}
                />
            </View>
        );
    };

    const renderClientButtons = () => {
        return (
            <View>
                <SiderBarButton
                    text='Ask question'
                    icon='questioncircleo'
                    onPress={() => handlePageChange('ask-question')}
                />
                <SiderBarButton
                    text='Review answers'
                    icon='question-answer'
                    type='material-icons'
                    onPress={() => handlePageChange('answered-questions')}
                />
                <SiderBarButton
                    text='Rent history'
                    icon='history'
                    type='font-awesome'
                    onPress={() => handlePageChange('rent-history')}
                />
            </View>
        );
    };

    return (
        <Animated.View
            style={
                {
                    ...styles.container,
                    translateX: slideAnim.interpolate({
                        inputRange: [0, 1],
                        outputRange: [-200, 0]
                    })
                }
            }
        >
            <SiderBarButton
                text='Close sidebar'
                icon='closecircleo'
                onPress={onCloseSideBar}
            />
            {renderByUser()}
            <SiderBarButton
                text='Logout'
                icon='logout'
                onPress={onLogout}
                admin={user.isAdmin}
                last
            />
        </Animated.View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#ee948e',
        position: 'absolute',
        top: 0,
        left: 0,
        zIndex: 3,
        width: 200,
        height: Dimensions.get('window').height,
        flex: 1,
        flexDirection: 'column'
    }
});

export default SideBar;