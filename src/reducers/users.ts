import { REGISTER_VOTE } from '../actions/questions';
import { GET_USERS } from '../actions/users';

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
        default:
            return state;
    }
}
