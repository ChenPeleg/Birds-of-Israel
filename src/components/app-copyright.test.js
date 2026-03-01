import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { AppCopyright } from './app-copyright';
import reducer from '../store/reducer';

const renderWithStore = (ui) => {
    const store = createStore(reducer);
    return render(<Provider store={store}>{ui}</Provider>);
};

test('renders the copyright section', () => {
    renderWithStore(<AppCopyright />);
    expect(document.getElementById('copyrights')).toBeInTheDocument();
});

test('renders copyright text in Hebrew by default', () => {
    renderWithStore(<AppCopyright />);
    expect(screen.getByText(/כל הזכויות שמורות/)).toBeInTheDocument();
});
