import * as React from 'react';
import './App.css';
import Uploader from './components/Uploader';
import * as Papa from 'papaparse';

class App extends React.Component {
    onFileSelected(files: FileList | null) {
        if (files && files.length) {
            Papa.parse(files[0], {
                encoding: 'cp1251',
                complete: results => {
                    console.log(results);
                }
            });
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
