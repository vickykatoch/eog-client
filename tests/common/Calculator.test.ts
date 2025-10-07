import { describe, it, expect, beforeEach } from 'vitest';
import { Calculator } from '../../src';

describe('Calculator', () => {
   let calc: Calculator;

   beforeEach(() => {
      calc = new Calculator();
   });

   it('adds numbers', () => {
      expect(calc.add(1, 2)).toBe(3);
      expect(calc.add(-5, 5)).toBe(0);
      expect(calc.add(1.5, 2.25)).toBeCloseTo(3.75, 10);
   });
   it('subtracts numbers', () => {
      expect(calc.subtract(5, 2)).toBe(3);
      expect(calc.subtract(2, 5)).toBe(-3);
      expect(calc.subtract(3.5, 1.2)).toBeCloseTo(2.3, 10);
   });
   it('multiplies numbers', () => {
      expect(calc.multiply(3, 4)).toBe(12);
      expect(calc.multiply(-3, 4)).toBe(-12);
      expect(calc.multiply(2.5, 0.2)).toBeCloseTo(0.5, 10);
   });
   it('divides numbers', () => {
      expect(calc.divide(8, 2)).toBe(4);
      expect(calc.divide(-9, 3)).toBe(-3);
      expect(calc.divide(0.3, 0.1)).toBeCloseTo(3, 10);
   });
   it('throws on division by zero', () => {
      expect(() => calc.divide(1, 0)).toThrowError('Division by zero is not allowed.');
   });
});
