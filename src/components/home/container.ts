import { connect } from 'react-redux';
import { HomePageComponent, ReduxStateProps } from './component';

function mapStateToProps(state): ReduxStateProps {
    return ({
        currentUser: state.currentUser,
    });
}

export const HomePage = connect(mapStateToProps)(HomePageComponent);
