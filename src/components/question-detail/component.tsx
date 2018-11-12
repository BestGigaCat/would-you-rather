import * as queryString from 'querystring';
import * as React from 'react';
import { Redirect, RouteComponentProps, withRouter } from 'react-router';
import { Question } from '../../models/question';

export interface ReduxDispatchProps {
    registerVote: (info) => void;
}

interface PublicProps {
}

export interface RouteProps {
    id: string;
}

export interface ReduxStateProps {
    questions: Map<string, Question>;
    currentUser: string;
    users: Map<string, any>;
}

interface State {
    ifAnswered?: boolean;
}

type Props = ReduxStateProps & ReduxDispatchProps & PublicProps & RouteComponentProps<RouteProps>;

class QuestionDetailPresentation extends React.Component<Props, State> {
    public state: State = {};

    public render() {
        if (this.props.currentUser === null || this.props.currentUser === '') {
            return (
                <Redirect to={{ pathname: '/login', state: { from: `/questions/${this.props.match.params.id}` } }}/>);
        }
        const ifAnswered = this.getSearchParam(this.props.location.search, 'ifAnswered');
        const question = this.props.questions[this.props.match.params.id];
        if (ifAnswered === 'true' && question) {
            const ifChooseOne: boolean = question.optionOne.votes.includes(this.props.currentUser);
            return (
                <div>
                    Would You Rather
                    <div>
                        ID: {this.props.match.params.id}
                    </div>
                    <div>
                        Author: {question.author}
                    </div>
                    <div>
                        Author Avatar: <img width="100" height="100" src={this.props.users[this.props.currentUser].avatarURL}/>
                    </div>
                    <div>
                        Option One: {question.optionOne.text}
                    </div>
                    <div>
                        Option Two: {question.optionTwo.text}
                    </div>
                    <div>
                        You have selected {ifChooseOne ? question.optionOne.text : question.optionTwo.text}
                    </div>
                </div>
            );
        } else if (!this.state.ifAnswered && question) {
            return (
                <div>
                    Question
                    <div>
                        ID: {this.props.match.params.id}
                    </div>
                    <div>
                        Author: {question.author}
                    </div>
                    <div>
                        Author Avatar: <img width="100" height="100" src={this.props.users[this.props.currentUser].avatarURL}/>
                    </div>
                    <div>
                        Option One: {question.optionOne.text}
                    </div>
                    <div>
                        Option Two: {question.optionTwo.text}
                    </div>
                    <button onClick={this.selectOptionOne}>
                        Select option one
                    </button>
                    <button onClick={this.selectOptionTwo}>
                        Select option two
                    </button>
                </div>
            );
        } else {
            return <Redirect to={'/answered'} />;
        }
    }
    private selectOptionOne = () => {
        const payload = {
            qid: this.props.match.params.id,
            answer: 'optionOne',
            currentUser: this.props.currentUser,
        };
        this.props.registerVote(payload);
        this.setState({
            ifAnswered: true,
        });
    }
    private selectOptionTwo = () => {
        const payload = {
            qid: this.props.match.params.id,
            answer: 'optionTwo',
            currentUser: this.props.currentUser,
        };
        this.props.registerVote(payload);
        this.setState({
            ifAnswered: true,
        });
    }
    private getSearchParam = (rawSearch: string, searchKey: string) => {
        const searchOptions = queryString.parse(rawSearch.substring(1, rawSearch.length));
        if (typeof searchOptions !== 'object' || !(searchKey in searchOptions)) {
            return null;
        }

        const searchValue = searchOptions[searchKey];
        if (typeof searchValue !== 'string') {
            return null;
        }

        return searchValue;
    }
}

export const QuestionDetailComponent = withRouter(QuestionDetailPresentation);
