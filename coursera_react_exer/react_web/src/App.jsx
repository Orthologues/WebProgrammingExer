import React, { Component } from 'react'
import { BrowserRouter as Router } from 'react-router-dom';
import {
    DISHES
} from './shared/dishes';
import Main from './components/MainComponent'

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dishes: DISHES
        };
    }

    render() {
        return (
          <Router>
            <div className="App">
                <Main />
            </div>
          </Router>
          
        );
    }
}


export default App;