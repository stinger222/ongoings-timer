import ReactDOM from 'react-dom/client';
import App from './App';
import { Provider } from 'react-redux';
import { setupStore } from './redux/store';
import './index.css';
import { HashRouter as Router } from 'react-router-dom';

const store = setupStore()

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
		<Provider store={store}>
      <Router>
    	  <App />
      </Router>
		</Provider>
);