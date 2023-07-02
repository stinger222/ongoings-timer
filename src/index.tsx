import App from './App';
import ReactDOM from 'react-dom/client';

import { Provider } from 'react-redux';
import { setupStore } from './redux/store';
import { HashRouter as Router } from 'react-router-dom';

import './index.css';

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
)
