import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { Provider } from 'react-redux';
import { setupStore } from './redux/store';

const store:any = setupStore()

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
		<Provider store={store}>
    	<App />
		</Provider>
  </React.StrictMode>
);
