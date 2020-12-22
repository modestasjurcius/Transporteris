import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { getQuestionById, getTypeByValue } from './QuestionsData';
import Button from '../../common/Button';

const AnsweredQuestionItem = props => {
    const data = getQuestionById(props.questionId);
    const type = getTypeByValue(data.type);

    const onCheck = () => {
        if(props.onCheckAnswer)
            props.onCheckAnswer(props.questionId);
    }

    return (
        <View style={styles.container}>
            <View style={styles.data}>
                <Text style={styles.text}>{type.label}</Text>
            </View>
            <View>
                {data.answer !== null &&
                    <Button
                        text='Check'
                        width={100}
                        onPress={onCheck}
                        success
                    />
                }
                {data.answer === null &&
                    <Text style={styles.red}>Not answered</Text>
                }
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: 300,
        height: 60,
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
    },
    red: {
        color: 'red',
        marginEnd: 15
    }
});

export default AnsweredQuestionItem;