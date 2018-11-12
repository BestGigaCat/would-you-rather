import { connect } from 'react-redux';
import { addQuestion } from '../../actions/questions';
import { AddFormComponent, ReduxDispatchProps, ReduxStateProps } from './component';

function mapDispatchToProps(dispatch): ReduxDispatchProps {
    return({ addQuestion: (optionOneText: string, optionTwoText: string, currentUser: string) => dispatch(addQuestion(optionOneText, optionTwoText, currentUser)) });
}

function mapStateToProps(state): ReduxStateProps {
    return ({
        currentUser: state.currentUser,
    });
}

export const AddForm = connect(mapStateToProps, mapDispatchToProps)(AddFormComponent);
