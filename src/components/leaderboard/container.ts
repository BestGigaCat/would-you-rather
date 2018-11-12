import { connect } from 'react-redux';
import { LeaderBoardComponent, ReduxStateProps } from './component';

function mapStateToProps(state): ReduxStateProps {
    return ({
        questions: state.questions,
        currentUser: state.currentUser,
        users: state.users,
    });
}

export const LeaderBoard = connect(
    mapStateToProps,
    )(
    LeaderBoardComponent,
);
