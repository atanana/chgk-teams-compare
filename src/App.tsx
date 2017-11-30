import * as React from 'react';
import './App.css';
import Uploader from './components/Uploader';
import ResultsParser from './parse/ResultsParser';

interface AppState {
    error: string | null;
}

interface AppProps {
    parser: ResultsParser;
}

class App extends React.Component<AppProps, AppState> {
    state: AppState = {
        error: null
    };

    constructor(props: AppProps) {
        super(props);

        this.onFileSelected = this.onFileSelected.bind(this);
    }

    onFileSelected(files: FileList | null) {
        if (files && files.length) {
            this.props.parser.parse(files[0])
                .then((result: TeamData[]) => {

                })
                .catch(e => {
                    // noinspection TsLint
                    console.error(e);
                    this.setState({ error: 'Не получилось прочитать файл' });
                });
        } else {
            alert('Пожалуйста, выберите файл');
        }
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
                    <div className="content">Выберите файл с результатами</div>
                    <Uploader onFileSelected={this.onFileSelected}/>
                </div>
            </div>
        );
    }
}

export default App;
