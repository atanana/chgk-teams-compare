import * as React from 'react';
import './App.css';
import Uploader from './components/Uploader';

class App extends React.Component {
    render() {
        return (
            <div className="App container">
                <div className="box">
                    <div className="content">Выберите файл с результатами</div>
                    <Uploader/>
                </div>
            </div>
        );
    }
}

export default App;
