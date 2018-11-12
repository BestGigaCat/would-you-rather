import { connect } from 'react-redux';
import { registerVote } from '../../actions/questions';
import { QuestionPickerComponent, ReduxDispatchProps, ReduxStateProps } from './component';

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

export const QuestionPicker = connect(
    mapStateToProps,
    mapDispatchToProps)(
    QuestionPickerComponent,
);
