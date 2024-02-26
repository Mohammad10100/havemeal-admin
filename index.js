/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './src/App';
import {name as appName} from './app.json';
// REDUX 
import { Provider } from 'react-redux';
import {configureStore} from '@reduxjs/toolkit';
import rootReducer from './src/reducers/index';
const store = configureStore({
  reducer:rootReducer
});

const AppRedux = ()=>{
    return (
        <Provider store={store}>
            <App />
        </Provider>
    )
}

AppRegistry.registerComponent(appName, () => AppRedux);
