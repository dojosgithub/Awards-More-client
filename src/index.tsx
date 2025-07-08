import { Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
//
// eslint-disable-next-line import/no-extraneous-dependencies
import { Provider } from 'react-redux';
import App from './App';
import { store } from './redux/store';

// ----------------------------------------------------------------------

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

root.render(
  <HelmetProvider>
    <BrowserRouter>
      <Provider store={store}>
        <Suspense>
          <App />
        </Suspense>
      </Provider>
    </BrowserRouter>
  </HelmetProvider>
);
