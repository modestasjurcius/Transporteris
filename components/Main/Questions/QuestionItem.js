import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import Button from '../../common/Button';

const QuestionItem = props => {
    const onAnswerPress = () => {
        if(props.changeMainPage && props.id && props.setAnswerQuestionId) {
            props.setAnswerQuestionId(props.id);
            props.changeMainPage('answer-question');
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.data}>
                <Text style={styles.text}>Type: {props.typeLabel}</Text>
                <Text style={styles.text}>User: {props.user}</Text>
            </View>
            <Button 
                text='Answer'
                width={70}
                onPress={onAnswerPress}
                success
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: 300,
        height: 50,
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

export default QuestionItem;