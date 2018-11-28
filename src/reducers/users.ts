import { ADD_QUESTION, REGISTER_VOTE } from '../actions/questions';
import { GET_USERS } from '../actions/users';
import questions from './questions';

export default function users(state = {}, action) {
    switch (action.type) {
        case GET_USERS:
            return {
                ...state,
                ...action.users,
            };
        case REGISTER_VOTE:
            return {
                ...state,
                [action.currentUser]: {
                    ...state[action.currentUser],
                    answers: {
                        ...state[action.currentUser].answers,
                        [action.qid]: action.answer,
                    },
                },
            };
        case ADD_QUESTION:
            return {
                ...state,
                [action.question.author]: {
                    ...state[action.question.author],
                    questions: [...state[action.question.author].questions, action.question.id],
                },
            };
        default:
            return state;
    }
}
