import { connect } from 'react-redux';
import { registerVote } from '../../actions/questions';
import { ReduxDispatchProps, ReduxStateProps, UnAnsweredQuestionPickerComponent } from './component';

function mapDispatchToProps(dispatch): ReduxDispatchProps {
    return({ registerVote: (info) => dispatch(registerVote(info)) });
}

function mapStateToProps(state): ReduxStateProps {
    return ({
        questions: state.questions,
        currentUser: state.currentUser,
        users: state.users,
    });
}

export const UnAnsweredQuestionPicker = connect(
    mapStateToProps,
    mapDispatchToProps)(
    UnAnsweredQuestionPickerComponent,
);
