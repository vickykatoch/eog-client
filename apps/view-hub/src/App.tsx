import { Calculator } from '@avam/eog-client';
import { useState } from 'react';
import { NumberSpinner } from '@avam/components';

const calculator = new Calculator();
export const App = () => {
   const [value, setValue] = useState(0);
   return (
      <div>
         <NumberSpinner />
         <span>{value}</span>
         <button
            data-testid="add-button"
            onClick={() => setValue((value) => calculator.add(value, Math.random() * 100))}
         >
            ADD
         </button>
      </div>
   );
};
