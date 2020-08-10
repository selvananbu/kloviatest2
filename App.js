
import React from 'react';
import Root from './Root';

import { Provider } from 'react-redux';
import allReducers from './src/reducers/index';
import { createStore } from 'redux';
import {decode, encode} from 'base-64'
const store = createStore(allReducers);

if (!global.btoa) {  global.btoa = encode }
if (!global.atob) { global.atob = decode }

const App = () => {
  return (
    <Provider store={store}>
        <Root/>
    </Provider>
  );
};


export default App;