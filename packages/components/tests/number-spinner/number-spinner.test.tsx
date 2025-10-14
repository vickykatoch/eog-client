import { render } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { NumberSpinner } from '../../src/number-spinner/number-spinner';

describe('NumberSpinner', () => {
   it('should render without crashing', () => {
      const { container } = render(<NumberSpinner />);
      expect(container).toBeInTheDocument();
   });

   it('should render an Input component', () => {
      const { getByRole } = render(<NumberSpinner />);
      const inputElement = getByRole('textbox');
      expect(inputElement).toBeInTheDocument();
   });
});
