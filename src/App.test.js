import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import App from './App';
import reducer from './store/reducer';

test('renders the app header', () => {
  const store = createStore(reducer);
  render(
    <Provider store={store}>
      <App />
    </Provider>
  );
  expect(screen.getByText(/קולות הציפורים בארץ ישראל/)).toBeInTheDocument();
});
