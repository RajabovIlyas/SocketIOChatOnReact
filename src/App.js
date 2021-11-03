import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
} from 'react-router-dom';
import Header from './components/Header/Header';
import MenuChats from './components/Content/MenuChats/MenuChats';
import Chat from './components/Content/Chat/Chat';

const App = () => (
  <div className="App">
    <Router>
      <Header />
      <Switch>
        <Route path="/:idChat" component={Chat} />
        <Route path="/" exact component={MenuChats} />
      </Switch>
    </Router>
  </div>
);

export default App;
