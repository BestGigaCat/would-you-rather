import { _saveQuestion, _saveQuestionAnswer } from '../data';
import { GlobalState } from '../reducers';

export const GET_QUESTIONS = 'GET_QUESTIONS';
export const REGISTER_VOTE = 'REGISTER_VOTE';
export const ADD_QUESTION = 'ADD_QUESTION';

export function getQuestions(questions) {
    return {
        type: GET_QUESTIONS,
        questions,
    };
}

export function addQuestion(optionOne: string, optionTwo: string, currentUser: string) {
    return (dispatch) => {
        return _saveQuestion({
            author: currentUser,
            optionOne,
            optionTwo,
        }).then((question) => dispatch({
                type: ADD_QUESTION,
                question,
            }));
    };
}

export function registerVote(info) {
    return (dispatch, getState: () => GlobalState) => {
        const questionPayload = {
            currentUser: info.currentUser,
            qid: info.qid,
            answer: info.answer,
        };
        return _saveQuestionAnswer({
            authedUser: info.currentUser,
            qid: info.qid,
            answer: info.answer,
        })
            .then(() => dispatch({
                ...questionPayload,
                type: REGISTER_VOTE,
            }));
    };
}
