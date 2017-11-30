import * as React from 'react';
import './App.css';
import Uploader from './components/Uploader';
import PapaWrapper from './parse/PapaWrapper';
import ParseResult = PapaParse.ParseResult;

interface AppState {
    error: string | null;
}

class App extends React.Component<{}, AppState> {
    constructor(props: {}) {
        super(props);

        this.state = {
            error: null
        };

        this.onFileSelected = this.onFileSelected.bind(this);
    }

    onFileSelected(files: FileList | null) {
        if (files && files.length) {
            PapaWrapper.parseFile(files[0])
                .then((result: ParseResult) => {
                    if (!result.errors.length) {

                    } else {
                        throw new Error();
                    }
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
