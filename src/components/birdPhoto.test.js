import { render, screen } from '@testing-library/react';
import { BirdPhoto } from './birdPhoto';

test('renders a bird image', () => {
    render(<BirdPhoto imageSource="dror.jpg" />);
    expect(screen.getByRole('img')).toBeInTheDocument();
});

test('renders a bird image with alt text', () => {
    render(<BirdPhoto imageSource="dror.jpg" />);
    expect(screen.getByAltText('crow')).toBeInTheDocument();
});
