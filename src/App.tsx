import * as React from 'react';
import './App.css';
import Uploader from './components/Uploader';
import PapaWrapper from './parse/PapaWrapper';
import ParseResult = PapaParse.ParseResult;

class App extends React.Component {
    onFileSelected(files: FileList | null) {
        if (files && files.length) {
            PapaWrapper.parseFile(files[0])
                .then((result: ParseResult) => console.log(result));
        } else {
            alert('Пожалуйста, выберите файл');
        }
    }

    render() {
        return (
            <div className="App container">
                <div className="box">
                    <div className="content">Выберите файл с результатами</div>
                    <Uploader onFileSelected={this.onFileSelected}/>
                </div>
            </div>
        );
    }
}

export default App;
