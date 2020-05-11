import './App.less';
import React from 'react';
import {
  BrowserRouter,
  Switch,
  Route,
} from 'react-router-dom';
import Main from './Main';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/:s?/:b?/:st?">
          <Main />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
