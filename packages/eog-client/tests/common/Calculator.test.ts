import { describe, expect, test, beforeEach } from 'vitest';
import { Calculator } from '../../src/index';
describe('Calculator', () => {
   let calculator: Calculator;

   beforeEach(() => {
      calculator = new Calculator();
   });

   test('should add two numbers correctly', () => {
      expect(calculator.add(2, 3)).toBe(5);
      expect(calculator.add(-1, 1)).toBe(0);
      expect(calculator.add(-1, -1)).toBe(-2);
   });

   test('should subtract two numbers correctly', () => {
      expect(calculator.subtract(5, 3)).toBe(2);
      expect(calculator.subtract(0, 1)).toBe(-1);
      expect(calculator.subtract(-1, -1)).toBe(0);
   });
});
