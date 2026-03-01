import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { BirdCard } from './bird-card';
import reducer from '../store/reducer';

const mockBird = {
    id: 1,
    Name: 'Sparrow',
    HebrewName: 'דרור',
    img: 'dror.jpg',
    mainSound: 'pashosh.mp3',
    isChoosen: false,
    description: {
        en: 'A thick beak adapted for eating seeds.',
        he: 'מקור עבה המותאם לאכילת זרעים',
    },
};

const renderWithStore = (ui) => {
    const store = createStore(reducer);
    return render(<Provider store={store}>{ui}</Provider>);
};

test('renders the bird Hebrew name by default', () => {
    renderWithStore(<BirdCard bird={mockBird} />);
    expect(screen.getByText(/דרור/)).toBeInTheDocument();
});

test('does not show description when bird is not chosen', () => {
    renderWithStore(<BirdCard bird={{ ...mockBird, isChoosen: false }} />);
    expect(screen.queryByText(/מקור עבה המותאם לאכילת זרעים/)).not.toBeInTheDocument();
});

test('shows description when bird is chosen', () => {
    renderWithStore(<BirdCard bird={{ ...mockBird, isChoosen: true }} />);
    expect(screen.getByText(/מקור עבה המותאם לאכילת זרעים/)).toBeInTheDocument();
});
