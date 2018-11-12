import * as React from 'react';
import { Redirect, RouteProps } from 'react-router';
import { QuestionPicker } from '../question';
import { UnAnsweredQuestionPicker } from '../unanswered-question';

interface PublicProps {}

interface State {
    selected: string;
}

export interface ReduxStateProps {
    currentUser: string;
}

export type Props = PublicProps & ReduxStateProps & RouteProps;

export class HomePageComponent extends React.Component<Props, State> {
    public state: State = {
        selected: 'unanswered',
    };
    public render() {
        if (this.props.currentUser === null || this.props.currentUser === '') {
            return (
                <Redirect to={{ pathname: '/login', state: { from: '/' } }}/>
            );
        }
        if (this.state.selected === 'unanswered') {
            return (
                <div>
                    <p>Home For Unanswered Questions:</p>
                    <p>Current User: {this.props.currentUser}</p>
                    <button onClick={this.clickAnswered}>Show Answered</button>
                    <button onClick={this.clickUnanswered}> Show Unanswered</button>
                    <UnAnsweredQuestionPicker/>
                </div>
            );
        } else if (this.state.selected === 'answered') {
            return (
                <div>
                    <p>Home for Answered Questions:</p>
                    <p>Current User: {this.props.currentUser}</p>
                    <button onClick={this.clickAnswered}>Show Answered</button>
                    <button onClick={this.clickUnanswered}> Show Unanswered</button>
                    <QuestionPicker/>
                </div>
            );
        } else {
            return null;
        }
    }
    private clickUnanswered = () => {
        this.setState({
            selected: 'unanswered',
        });
    }
    private clickAnswered = () => {
        this.setState({
            selected: 'answered',
        });
    }
}
