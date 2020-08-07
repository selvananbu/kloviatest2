import { combineReducers } from "redux";
import Credentials from './credentialreducer';

const allReducers = combineReducers({
    Credentials : Credentials,
});

export default allReducers;
