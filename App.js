
import React from 'react';
import Root from './Root';

import { Provider } from 'react-redux';
import allReducers from './src/reducers/index';
import { createStore } from 'redux';

const store = createStore(allReducers);


const App = () => {
  return (
    <Provider store={store}>
        <Root/>
    </Provider>
  );
};


export default App;