import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import AppHeader from './app-header';
import reducer from '../store/reducer';

const renderWithStore = (ui) => {
    const store = createStore(reducer);
    return render(<Provider store={store}>{ui}</Provider>);
};

test('renders the Hebrew language button', () => {
    renderWithStore(<AppHeader />);
    expect(screen.getByText(/עב/)).toBeInTheDocument();
});

test('renders the English language button', () => {
    renderWithStore(<AppHeader />);
    expect(screen.getByText(/EN/)).toBeInTheDocument();
});

test('renders the app header text in Hebrew by default', () => {
    renderWithStore(<AppHeader />);
    expect(screen.getByText(/קולות הציפורים בארץ ישראל/)).toBeInTheDocument();
});
