import React, { useState } from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import Map from './Map/Map';
import MenuBar from './Menu/MenuBar';
import SideBar from './SideBar/SideBar';
import AskQuestion from './Questions/AskQuestion';
import QuestionsList from './Questions/QuestionsList';
import AnswerQuestion from './Questions/AnswerQuestion';
import NewRegistrations from './NewRegistrations/NewRegistrations';
import CheckRegistration from './NewRegistrations/CheckRegistration';
import TransportFragment from './Map/TransportFragment';
import PayPage from './Pay/PayPage';
import AnsweredQuestionsList from './Questions/AnsweredQuestionsList';
import AnsweredQuestion from './Questions/AnsweredQuestion';
import RentHistoryList from './RentHistory/RentHistoryList';

function useForceUpdate(){
    const [value, setValue] = useState(0);
    return () => setValue(value => ++value);
}

const MainPage = props => {
    const [isSideBarOpen, setIsSideBarOpen] = useState(false);
    const [mainPage, setMainPage] = useState('map');
    const [answerQuestionDataId, setAnswerQuestionDataId] = useState(null);
    const [userCheckId, setUserCheckId] = useState(null);
    const [transportId, setTransportId] = useState(null);
    const [payData, setPayData] = useState(null);
    const [checkAnswerQuestionId, setCheckAnswerQuestionId] = useState(null);
    const forceUpdate = useForceUpdate();

    const toggleSideBar = value => {
        setIsSideBarOpen(value);

        if(value)
            setTransportId(null);
    };

    const changeMainPage = page => {
        setIsSideBarOpen(false);

        setMainPage(page);
    }

    const setAnswerQuestionId = id => {
        setAnswerQuestionDataId(id);
    }

    const setUserToCheckId = id => {
        setUserCheckId(id);
    }

    const setFragmentTransportId = id => {
        setTransportId(id);
    }

    const onRentEnded = data => {
        setPayData(data);
        setTransportId(null);
        changeMainPage('pay-page');
    }

    const onRentPaid = () => {
        setPayData(null);
        changeMainPage('map');
    }

    const onCheckAnswer = questionId => {
        setCheckAnswerQuestionId(questionId);
        changeMainPage('answered-question');
    }

    const renderByPage = () => {
        switch (mainPage) {
            case 'ask-question':
                return (
                    <AskQuestion
                        changeMainPage={changeMainPage}
                    />
                );
            case 'unanswered-questions':
                return (
                    <QuestionsList
                        changeMainPage={changeMainPage}
                        setAnswerQuestionId={setAnswerQuestionId}
                    />
                );
            case 'answer-question':
                return (
                    <AnswerQuestion
                        id={answerQuestionDataId}
                        changeMainPage={changeMainPage}
                    />
                );
            case 'new-registrations':
                return (
                    <NewRegistrations
                        changeMainPage={changeMainPage}
                        setUserToCheckId={setUserToCheckId}
                    />
                );
            case 'check-registration':
                return (
                    <CheckRegistration 
                        id={userCheckId}
                        changeMainPage={changeMainPage}
                    />
                );
            case 'pay-page':
                return (
                    <PayPage
                        data={payData}
                        onRentPaid={onRentPaid}
                    />
                );
            case 'answered-questions':
                return (
                    <AnsweredQuestionsList
                        onCheckAnswer={onCheckAnswer}
                    />
                );
            case 'answered-question':
                return (
                    <AnsweredQuestion
                        questionId={checkAnswerQuestionId}
                        onBackToAnswersList={() => changeMainPage('answered-questions')}
                    />
                );
            case 'rent-history':
                return (
                    <RentHistoryList />
                );
            default:
            case 'map':
                return (
                    <Map
                        toggleSideBar={toggleSideBar}
                        isSideBarOpen={isSideBarOpen}
                        setTransportId={setFragmentTransportId}
                    />
                );
        }
    }

    return (
        <View style={styles.container}>
            {isSideBarOpen &&
                <SideBar
                    toggleSideBar={toggleSideBar}
                    changePage={props.changePage}
                    changeMainPage={changeMainPage}
                />
            }
            {isSideBarOpen &&
                <View
                    style={{
                        zIndex: 1,
                        backgroundColor: 'rgba(172, 165, 139, 0.7)',
                        opacity: 0.7,
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        height: '100%',
                        width: '100%'
                    }}>
                </View>
            }
            {transportId !== null &&
                <TransportFragment
                    id={transportId}
                    setFragmentTransportId={setFragmentTransportId}
                    forceUpdate={forceUpdate}
                    onRentEnded={onRentEnded}
                />
            }
            <MenuBar
                toggleSideBar={toggleSideBar}
                changeMainPage={changeMainPage}
                isSideBarOpen={isSideBarOpen}
                isMapOpen={mainPage === 'map'}
            />
            {renderByPage()}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        width: Dimensions.get('window').width,
        flex: 1,
        justifyContent: 'space-between'
    }
});

export default MainPage;