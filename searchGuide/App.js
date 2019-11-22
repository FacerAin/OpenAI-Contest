import React from 'react';
import Main from './components/Main/Main'
import { Provider,connect } from 'react-redux';
import Store from './reducers/Store';

const App = () => {
      return (
        <Provider store={Store}>
          <Main />
        </Provider>
      )
}

export default App;