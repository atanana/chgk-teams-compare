import * as React from 'react';
import './App.css';
import Uploader from './components/Uploader';
import ResultsParser from './parse/ResultsParser';
import { TeamData, TourComplexity } from './data/ResultsData';
import TeamsSelect from './components/TeamsSelect';
import * as _ from 'lodash';
import TourComparison from './components/TourComparison';
import ComplexityCalculator from './calculate/ComplexityCalculator';

interface AppState {
    error: string | null;
    teams: TeamData[];
    selectedTeams: TeamData[];
    answerComplexity: TourComplexity[];
}

interface AppProps {
    parser: ResultsParser;
    complexityCalculator: ComplexityCalculator;
}

class App extends React.Component<AppProps, AppState> {
    state: AppState = {
        error: null,
        teams: [],
        selectedTeams: [],
        answerComplexity: []
    };

    constructor(props: AppProps) {
        super(props);

        this.onFileSelected = this.onFileSelected.bind(this);
        this.onTeamSelected = this.onTeamSelected.bind(this);
    }

    onFileSelected(files: FileList | null) {
        if (files && files.length) {
            this.props.parser.parse(files[0])
                .then((teams: TeamData[]) => {
                    this.setState({
                        teams: _.sortBy(teams, ['name', 'city']),
                        answerComplexity: this.props.complexityCalculator.calculate(teams)
                    });
                })
                .catch(() => {
                    this.setState({error: 'Не получилось прочитать файл'});
                });
        } else {
            alert('Пожалуйста, выберите файл');
        }
    }

    onTeamSelected(selectedTeams: number[]) {
        this.setState({
            selectedTeams: this.state.teams.filter(team => selectedTeams.indexOf(team.id) !== -1)
        });
    }

    render() {
        return (
            <div className="App container">
                <div className="box">
                    {
                        this.state.error &&
                        <div className="notification is-danger">
                            {this.state.error} :(
                        </div>
                    }
                    <div className="field">
                        <label className="label">Выберите файл с результатами</label>
                        <Uploader onFileSelected={this.onFileSelected}/>
                    </div>
                </div>
                {
                    this.state.teams.length > 0 &&
                    <div className="box">
                        <h1 className="title">Повопросное сравнение</h1>
                        <div className="field">
                            <label className="label">Выберите команды</label>
                            <TeamsSelect
                                teams={this.state.teams}
                                onSelect={this.onTeamSelected}
                                selectedTeams={this.state.selectedTeams}
                            />
                        </div>
                        {
                            this.state.selectedTeams.length > 0 &&
                            <TourComparison
                                teams={this.state.selectedTeams}
                                answerComplexity={this.state.answerComplexity}
                            />
                        }
                    </div>
                }
            </div>
        );
    }
}

export default App;
