import { describe, expect, test, beforeEach } from 'vitest';
import { render, fireEvent, screen } from '@testing-library/react';
import { App } from '../src/App';

describe('App Component', () => {
   beforeEach(() => {
      // Any setup if needed before each test
   });

   test('should render without crashing', () => {
      const { getByTestId, debug } = render(<App />);
      fireEvent.click(getByTestId('add-button'));
      debug();
   });
});
