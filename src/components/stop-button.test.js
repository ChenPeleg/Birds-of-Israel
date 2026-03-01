import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import StopButton from './stop-button';
import reducer from '../store/reducer';

const renderWithStore = (ui) => {
    const store = createStore(reducer);
    return render(<Provider store={store}>{ui}</Provider>);
};

test('renders the stop button', () => {
    renderWithStore(<StopButton />);
    expect(screen.getByRole('button')).toBeInTheDocument();
});
