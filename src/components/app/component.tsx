import * as React from 'react';
import { Component } from 'react';
import { connect } from 'react-redux';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { userLogin } from '../../actions/currentUser';
import { getQuestions } from '../../actions/questions';
import { getUsers } from '../../actions/users';
import '../../App.scss';
import { _getQuestions, _getUsers } from '../../data';
import { AddForm } from '../add-form';
import { HomePage } from '../home';
import { LeaderBoard } from '../leaderboard';
import { LoginPage } from '../login';
import { NavBar } from '../nav-bar';
import { QuestionPicker } from '../question';
import { QuestionDetail } from '../question-detail';
import { UnAnsweredQuestionPicker } from '../unanswered-question';

export interface ReduxDispatchProps {
    handleInitialData: () => void;
}

type Props = ReduxDispatchProps;

class AppComponent extends Component<Props> {
    public componentDidMount() {
        this.props.handleInitialData();
    }
    public render() {
        return (
            <BrowserRouter>
                <div className="App">
                   <NavBar/>
                    <Switch>
                        <Route path="/login" component={LoginPage}/>
                        <Route path="/answered" component={QuestionPicker} />
                        <Route path="/unanswered" component={UnAnsweredQuestionPicker} />
                        <Route path="/leaderboard" component={LeaderBoard} />
                        <Route path="/questions/:id" component={QuestionDetail} />
                        <Route path="/add" component={AddForm} />
                        <Route path="/" component={HomePage}/>
                    </Switch>
                </div>
            </BrowserRouter>
        );
    }
}

function fetchUsersAndQuestions() {
    return Promise.all([
        _getUsers(),
        _getQuestions(),
    ]);
}

function handleInitialData(dispatch) {
    fetchUsersAndQuestions()
        .then((values) => {
            dispatch(getUsers(values[ 0 ]));
            dispatch(getQuestions(values[ 1 ]));
            dispatch(userLogin(''));
        });
}

function mapDispatchToProps(dispatch): ReduxDispatchProps {
    return({ handleInitialData: () => handleInitialData(dispatch) });
}

export const App = connect(
    null,
    mapDispatchToProps)(
    AppComponent,
);
