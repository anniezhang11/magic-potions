import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import Header from './Header'
import MagicPotion from './MagicPotion'

class App extends Component {
    render () {
        return (
            <BrowserRouter>
            <div>
                <Header />
                <MagicPotion />
            </div>
            </BrowserRouter>
        )
    }
}

ReactDOM.render(<App />, document.getElementById('app'))
