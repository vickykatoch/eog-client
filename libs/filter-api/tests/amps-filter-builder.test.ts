import { describe, expect, it } from 'vitest';
import { buildAmpsFilter } from '../src/amps-filter-builder';
import {
	ComparisonOperator,
	type FieldRule,
	FieldType,
	type FilterGroup,
	LogicalOperator,
} from '../src/types';

describe('buildAmpsFilter', () => {
	describe('Field Rules - Basic Operators', () => {
		it('should build EQUALS filter with string', () => {
			const filter: FieldRule = {
				field: 'name',
				type: FieldType.STRING,
				operator: ComparisonOperator.EQUALS,
				value: 'John',
			};
			expect(buildAmpsFilter(filter)).toBe("/name = 'John'");
		});

		it('should build NOT_EQUALS filter with string', () => {
			const filter: FieldRule = {
				field: 'status',
				type: FieldType.STRING,
				operator: ComparisonOperator.NOT_EQUALS,
				value: 'inactive',
			};
			expect(buildAmpsFilter(filter)).toBe("/status != 'inactive'");
		});

		it('should build GREATER_THAN filter with number', () => {
			const filter: FieldRule = {
				field: 'price',
				type: FieldType.NUMBER,
				operator: ComparisonOperator.GREATER_THAN,
				value: 100,
			};
			expect(buildAmpsFilter(filter)).toBe('/price > 100');
		});

		it('should build GREATER_THAN_OR_EQUALS filter with number', () => {
			const filter: FieldRule = {
				field: 'quantity',
				type: FieldType.NUMBER,
				operator: ComparisonOperator.GREATER_THAN_OR_EQUALS,
				value: 50,
			};
			expect(buildAmpsFilter(filter)).toBe('/quantity >= 50');
		});

		it('should build LESS_THAN filter with number', () => {
			const filter: FieldRule = {
				field: 'age',
				type: FieldType.NUMBER,
				operator: ComparisonOperator.LESS_THAN,
				value: 30,
			};
			expect(buildAmpsFilter(filter)).toBe('/age < 30');
		});

		it('should build LESS_THAN_OR_EQUALS filter with number', () => {
			const filter: FieldRule = {
				field: 'discount',
				type: FieldType.NUMBER,
				operator: ComparisonOperator.LESS_THAN_OR_EQUALS,
				value: 25.5,
			};
			expect(buildAmpsFilter(filter)).toBe('/discount <= 25.5');
		});
	});

	describe('Field Rules - String Pattern Operators', () => {
		it('should build STARTS_WITH filter', () => {
			const filter: FieldRule = {
				field: 'name',
				type: FieldType.STRING,
				operator: ComparisonOperator.STARTS_WITH,
				value: 'John',
			};
			expect(buildAmpsFilter(filter)).toBe("/name BEGINS WITH('John')");
		});

		it('should build ENDS_WITH filter', () => {
			const filter: FieldRule = {
				field: 'email',
				type: FieldType.STRING,
				operator: ComparisonOperator.ENDS_WITH,
				value: '@example.com',
			};

			expect(buildAmpsFilter(filter)).toBe("/email ENDS WITH('@example.com')");
		});

		it('should build CONTAINS filter', () => {
			const filter: FieldRule = {
				field: 'description',
				type: FieldType.STRING,
				operator: ComparisonOperator.CONTAINS,
				value: 'important',
			};
			expect(buildAmpsFilter(filter)).toBe("/description LIKE 'important'");
		});

		it('should build LIKE filter with custom pattern', () => {
			const filter: FieldRule = {
				field: 'code',
				type: FieldType.STRING,
				operator: ComparisonOperator.LIKE,
				value: 'A%B_C',
			};
			expect(buildAmpsFilter(filter)).toBe("/code LIKE 'A%B_C'");
		});

		it('should escape LIKE wildcards in STARTS_WITH', () => {
			const filter: FieldRule = {
				field: 'name',
				type: FieldType.STRING,
				operator: ComparisonOperator.STARTS_WITH,
				value: '50%',
			};
			expect(buildAmpsFilter(filter)).toBe("/name BEGINS WITH('50\\%')");
		});

		it('should escape LIKE wildcards in ENDS_WITH', () => {
			const filter: FieldRule = {
				field: 'pattern',
				type: FieldType.STRING,
				operator: ComparisonOperator.ENDS_WITH,
				value: 'test_value',
			};
			expect(buildAmpsFilter(filter)).toBe("/pattern ENDS WITH('test\\_value')");
		});

		it('should escape LIKE wildcards in CONTAINS', () => {
			const filter: FieldRule = {
				field: 'content',
				type: FieldType.STRING,
				operator: ComparisonOperator.CONTAINS,
				value: '100%_discount',
			};
			expect(buildAmpsFilter(filter)).toBe("/content LIKE '100\\%\\_discount'");
		});

		it('should escape backslashes in LIKE patterns', () => {
			const filter: FieldRule = {
				field: 'path',
				type: FieldType.STRING,
				operator: ComparisonOperator.CONTAINS,
				value: 'C:\\Users',
			};
			expect(buildAmpsFilter(filter)).toBe("/path LIKE 'C:\\\\Users'");
		});
	});

	describe('Field Rules - IN and NOT_IN Operators', () => {
		it('should build IN filter with string array', () => {
			const filter: FieldRule = {
				field: 'status',
				type: FieldType.STRING,
				operator: ComparisonOperator.IN,
				value: ['active', 'pending', 'approved'],
			};
			expect(buildAmpsFilter(filter)).toBe("/status IN ('active', 'pending', 'approved')");
		});

		it('should build NOT_IN filter with string array', () => {
			const filter: FieldRule = {
				field: 'category',
				type: FieldType.STRING,
				operator: ComparisonOperator.NOT_IN,
				value: ['archived', 'deleted'],
			};
			expect(buildAmpsFilter(filter)).toBe("/category NOT IN ('archived', 'deleted')");
		});

		it('should build IN filter with number array', () => {
			const filter: FieldRule = {
				field: 'id',
				type: FieldType.NUMBER,
				operator: ComparisonOperator.IN,
				value: [1, 2, 3, 5, 8],
			};
			expect(buildAmpsFilter(filter)).toBe('/id IN (1, 2, 3, 5, 8)');
		});

		it('should build NOT_IN filter with number array', () => {
			const filter: FieldRule = {
				field: 'errorCode',
				type: FieldType.NUMBER,
				operator: ComparisonOperator.NOT_IN,
				value: [404, 500, 503],
			};
			expect(buildAmpsFilter(filter)).toBe('/errorCode NOT IN (404, 500, 503)');
		});

		it('should throw error when IN operator receives non-array', () => {
			const filter: FieldRule = {
				field: 'status',
				type: FieldType.STRING,
				operator: ComparisonOperator.IN,
				value: 'active',
			};
			expect(() => buildAmpsFilter(filter)).toThrow('IN expects value to be an array');
		});

		it('should throw error when NOT_IN operator receives non-array', () => {
			const filter: FieldRule = {
				field: 'status',
				type: FieldType.STRING,
				operator: ComparisonOperator.NOT_IN,
				value: 'active',
			};
			expect(() => buildAmpsFilter(filter)).toThrow('NOT IN expects value to be an array');
		});
	});

	describe('Field Types - STRING', () => {
		it('should handle string values', () => {
			const filter: FieldRule = {
				field: 'text',
				type: FieldType.STRING,
				operator: ComparisonOperator.EQUALS,
				value: 'hello',
			};
			expect(buildAmpsFilter(filter)).toBe("/text = 'hello'");
		});

		it('should escape single quotes in strings', () => {
			const filter: FieldRule = {
				field: 'message',
				type: FieldType.STRING,
				operator: ComparisonOperator.EQUALS,
				value: "it's working",
			};
			expect(buildAmpsFilter(filter)).toBe("/message = 'it''s working'");
		});

		it('should handle empty string', () => {
			const filter: FieldRule = {
				field: 'value',
				type: FieldType.STRING,
				operator: ComparisonOperator.EQUALS,
				value: '',
			};
			expect(buildAmpsFilter(filter)).toBe("/value = ''");
		});

		it('should handle strings with multiple quotes', () => {
			const filter: FieldRule = {
				field: 'quote',
				type: FieldType.STRING,
				operator: ComparisonOperator.EQUALS,
				value: "I'm saying 'hello' again",
			};
			expect(buildAmpsFilter(filter)).toBe("/quote = 'I''m saying ''hello'' again'");
		});
	});

	describe('Field Types - NUMBER', () => {
		it('should handle integer values', () => {
			const filter: FieldRule = {
				field: 'count',
				type: FieldType.NUMBER,
				operator: ComparisonOperator.EQUALS,
				value: 42,
			};
			expect(buildAmpsFilter(filter)).toBe('/count = 42');
		});

		it('should handle decimal values', () => {
			const filter: FieldRule = {
				field: 'price',
				type: FieldType.NUMBER,
				operator: ComparisonOperator.EQUALS,
				value: 99.99,
			};
			expect(buildAmpsFilter(filter)).toBe('/price = 99.99');
		});

		it('should handle negative numbers', () => {
			const filter: FieldRule = {
				field: 'temperature',
				type: FieldType.NUMBER,
				operator: ComparisonOperator.EQUALS,
				value: -15.5,
			};
			expect(buildAmpsFilter(filter)).toBe('/temperature = -15.5');
		});

		it('should handle zero', () => {
			const filter: FieldRule = {
				field: 'balance',
				type: FieldType.NUMBER,
				operator: ComparisonOperator.EQUALS,
				value: 0,
			};
			expect(buildAmpsFilter(filter)).toBe('/balance = 0');
		});

		it('should convert numeric strings to numbers', () => {
			const filter: FieldRule = {
				field: 'amount',
				type: FieldType.NUMBER,
				operator: ComparisonOperator.EQUALS,
				value: '123.45',
			};
			expect(buildAmpsFilter(filter)).toBe('/amount = 123.45');
		});

		it('should throw error for invalid number values', () => {
			const filter: FieldRule = {
				field: 'value',
				type: FieldType.NUMBER,
				operator: ComparisonOperator.EQUALS,
				value: 'not-a-number',
			};
			expect(() => buildAmpsFilter(filter)).toThrow('Invalid number value');
		});

		it('should throw error for Infinity', () => {
			const filter: FieldRule = {
				field: 'value',
				type: FieldType.NUMBER,
				operator: ComparisonOperator.EQUALS,
				value: Infinity,
			};
			expect(() => buildAmpsFilter(filter)).toThrow('Invalid number value');
		});

		it('should throw error for NaN', () => {
			const filter: FieldRule = {
				field: 'value',
				type: FieldType.NUMBER,
				operator: ComparisonOperator.EQUALS,
				value: NaN,
			};
			expect(() => buildAmpsFilter(filter)).toThrow('Invalid number value');
		});
	});

	describe('Field Types - BOOLEAN', () => {
		it('should handle true boolean', () => {
			const filter: FieldRule = {
				field: 'active',
				type: FieldType.BOOLEAN,
				operator: ComparisonOperator.EQUALS,
				value: true,
			};
			expect(buildAmpsFilter(filter)).toBe('/active = true');
		});

		it('should handle false boolean', () => {
			const filter: FieldRule = {
				field: 'deleted',
				type: FieldType.BOOLEAN,
				operator: ComparisonOperator.EQUALS,
				value: false,
			};
			expect(buildAmpsFilter(filter)).toBe('/deleted = false');
		});

		it('should convert "true" string to boolean', () => {
			const filter: FieldRule = {
				field: 'enabled',
				type: FieldType.BOOLEAN,
				operator: ComparisonOperator.EQUALS,
				value: 'true',
			};
			expect(buildAmpsFilter(filter)).toBe('/enabled = true');
		});

		it('should convert "false" string to boolean', () => {
			const filter: FieldRule = {
				field: 'visible',
				type: FieldType.BOOLEAN,
				operator: ComparisonOperator.EQUALS,
				value: 'false',
			};
			expect(buildAmpsFilter(filter)).toBe('/visible = false');
		});

		it('should handle case-insensitive boolean strings', () => {
			const filter: FieldRule = {
				field: 'flag',
				type: FieldType.BOOLEAN,
				operator: ComparisonOperator.EQUALS,
				value: 'TRUE',
			};
			expect(buildAmpsFilter(filter)).toBe('/flag = true');
		});

		it('should throw error for invalid boolean values', () => {
			const filter: FieldRule = {
				field: 'value',
				type: FieldType.BOOLEAN,
				operator: ComparisonOperator.EQUALS,
				value: 'yes',
			};
			expect(() => buildAmpsFilter(filter)).toThrow('Invalid boolean value');
		});
	});

	describe('Field Types - DATE', () => {
		it('should handle Date object', () => {
			const date = new Date('2024-01-15T10:30:00.000Z');
			const filter: FieldRule = {
				field: 'createdAt',
				type: FieldType.DATE,
				operator: ComparisonOperator.EQUALS,
				value: date,
			};
			expect(buildAmpsFilter(filter)).toBe("/createdAt = '2024-01-15T10:30:00.000Z'");
		});

		it('should handle ISO date string', () => {
			const filter: FieldRule = {
				field: 'updatedAt',
				type: FieldType.DATE,
				operator: ComparisonOperator.GREATER_THAN,
				value: '2024-06-01T00:00:00.000Z',
			};
			expect(buildAmpsFilter(filter)).toBe("/updatedAt > '2024-06-01T00:00:00.000Z'");
		});

		it('should handle epoch milliseconds', () => {
			const epoch = 1705315800000; // 2024-01-15T10:30:00.000Z (or similar depending on timezone)
			const filter: FieldRule = {
				field: 'timestamp',
				type: FieldType.DATE,
				operator: ComparisonOperator.LESS_THAN,
				value: epoch,
			};
			const expectedDate = new Date(epoch).toISOString();
			expect(buildAmpsFilter(filter)).toBe(`/timestamp < '${expectedDate}'`);
		});

		it('should handle various date string formats', () => {
			const filter: FieldRule = {
				field: 'eventDate',
				type: FieldType.DATE,
				operator: ComparisonOperator.EQUALS,
				value: '2024-12-25',
			};
			const result = buildAmpsFilter(filter);
			expect(result).toMatch(/\/eventDate = '\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z'/);
		});

		it('should throw error for invalid Date object', () => {
			const filter: FieldRule = {
				field: 'date',
				type: FieldType.DATE,
				operator: ComparisonOperator.EQUALS,
				value: new Date('invalid'),
			};
			expect(() => buildAmpsFilter(filter)).toThrow('Invalid Date instance');
		});

		it('should throw error for invalid date string', () => {
			const filter: FieldRule = {
				field: 'date',
				type: FieldType.DATE,
				operator: ComparisonOperator.EQUALS,
				value: 'not-a-date',
			};
			expect(() => buildAmpsFilter(filter)).toThrow('Invalid date string');
		});

		it('should throw error for invalid epoch', () => {
			const filter: FieldRule = {
				field: 'date',
				type: FieldType.DATE,
				operator: ComparisonOperator.EQUALS,
				value: Number.NaN,
			};
			expect(() => buildAmpsFilter(filter)).toThrow('Invalid epoch ms date');
		});
	});

	describe('Field Types - NULL values', () => {
		it('should handle null value for STRING', () => {
			const filter: FieldRule = {
				field: 'name',
				type: FieldType.STRING,
				operator: ComparisonOperator.EQUALS,
				value: null,
			};
			expect(buildAmpsFilter(filter)).toBe('/name = NULL');
		});

		it('should handle null value for NUMBER', () => {
			const filter: FieldRule = {
				field: 'count',
				type: FieldType.NUMBER,
				operator: ComparisonOperator.EQUALS,
				value: null,
			};
			expect(buildAmpsFilter(filter)).toBe('/count = NULL');
		});

		it('should handle undefined value', () => {
			const filter: FieldRule = {
				field: 'optional',
				type: FieldType.STRING,
				operator: ComparisonOperator.EQUALS,
				value: undefined,
			};
			expect(buildAmpsFilter(filter)).toBe('/optional = NULL');
		});
	});

	describe('Filter Groups - Logical Operators', () => {
		it('should build AND group with multiple rules', () => {
			const filter: FilterGroup = {
				operator: LogicalOperator.AND,
				rules: [
					{
						field: 'status',
						type: FieldType.STRING,
						operator: ComparisonOperator.EQUALS,
						value: 'active',
					},
					{
						field: 'age',
						type: FieldType.NUMBER,
						operator: ComparisonOperator.GREATER_THAN,
						value: 18,
					},
				],
			};
			expect(buildAmpsFilter(filter)).toBe("(/status = 'active' AND /age > 18)");
		});

		it('should build OR group with multiple rules', () => {
			const filter: FilterGroup = {
				operator: LogicalOperator.OR,
				rules: [
					{
						field: 'priority',
						type: FieldType.STRING,
						operator: ComparisonOperator.EQUALS,
						value: 'high',
					},
					{
						field: 'urgent',
						type: FieldType.BOOLEAN,
						operator: ComparisonOperator.EQUALS,
						value: true,
					},
				],
			};
			expect(buildAmpsFilter(filter)).toBe("(/priority = 'high' OR /urgent = true)");
		});

		it('should build group with three or more rules', () => {
			const filter: FilterGroup = {
				operator: LogicalOperator.AND,
				rules: [
					{
						field: 'type',
						type: FieldType.STRING,
						operator: ComparisonOperator.EQUALS,
						value: 'order',
					},
					{
						field: 'amount',
						type: FieldType.NUMBER,
						operator: ComparisonOperator.GREATER_THAN,
						value: 1000,
					},
					{
						field: 'verified',
						type: FieldType.BOOLEAN,
						operator: ComparisonOperator.EQUALS,
						value: true,
					},
				],
			};
			expect(buildAmpsFilter(filter)).toBe(
				"(/type = 'order' AND /amount > 1000 AND /verified = true)",
			);
		});
	});

	describe('Filter Groups - Nested Groups', () => {
		it('should build nested AND within OR', () => {
			const filter: FilterGroup = {
				operator: LogicalOperator.OR,
				rules: [
					{
						operator: LogicalOperator.AND,
						rules: [
							{
								field: 'country',
								type: FieldType.STRING,
								operator: ComparisonOperator.EQUALS,
								value: 'US',
							},
							{
								field: 'state',
								type: FieldType.STRING,
								operator: ComparisonOperator.EQUALS,
								value: 'CA',
							},
						],
					},
					{
						field: 'international',
						type: FieldType.BOOLEAN,
						operator: ComparisonOperator.EQUALS,
						value: true,
					},
				],
			};
			expect(buildAmpsFilter(filter)).toBe(
				"((/country = 'US' AND /state = 'CA') OR /international = true)",
			);
		});

		it('should build nested OR within AND', () => {
			const filter: FilterGroup = {
				operator: LogicalOperator.AND,
				rules: [
					{
						field: 'active',
						type: FieldType.BOOLEAN,
						operator: ComparisonOperator.EQUALS,
						value: true,
					},
					{
						operator: LogicalOperator.OR,
						rules: [
							{
								field: 'plan',
								type: FieldType.STRING,
								operator: ComparisonOperator.EQUALS,
								value: 'premium',
							},
							{
								field: 'plan',
								type: FieldType.STRING,
								operator: ComparisonOperator.EQUALS,
								value: 'enterprise',
							},
						],
					},
				],
			};
			expect(buildAmpsFilter(filter)).toBe(
				"(/active = true AND (/plan = 'premium' OR /plan = 'enterprise'))",
			);
		});

		it('should build deeply nested groups', () => {
			const filter: FilterGroup = {
				operator: LogicalOperator.AND,
				rules: [
					{
						operator: LogicalOperator.OR,
						rules: [
							{
								operator: LogicalOperator.AND,
								rules: [
									{
										field: 'category',
										type: FieldType.STRING,
										operator: ComparisonOperator.EQUALS,
										value: 'electronics',
									},
									{
										field: 'price',
										type: FieldType.NUMBER,
										operator: ComparisonOperator.LESS_THAN,
										value: 500,
									},
								],
							},
							{
								field: 'featured',
								type: FieldType.BOOLEAN,
								operator: ComparisonOperator.EQUALS,
								value: true,
							},
						],
					},
					{
						field: 'inStock',
						type: FieldType.BOOLEAN,
						operator: ComparisonOperator.EQUALS,
						value: true,
					},
				],
			};
			expect(buildAmpsFilter(filter)).toBe(
				"(((/category = 'electronics' AND /price < 500) OR /featured = true) AND /inStock = true)",
			);
		});
	});

	describe('Options - prefixSlash', () => {
		it('should prefix field with slash by default', () => {
			const filter: FieldRule = {
				field: 'name',
				type: FieldType.STRING,
				operator: ComparisonOperator.EQUALS,
				value: 'test',
			};
			expect(buildAmpsFilter(filter)).toBe("/name = 'test'");
		});

		it('should not double-prefix field that already has slash', () => {
			const filter: FieldRule = {
				field: '/name',
				type: FieldType.STRING,
				operator: ComparisonOperator.EQUALS,
				value: 'test',
			};
			expect(buildAmpsFilter(filter)).toBe("/name = 'test'");
		});

		it('should not prefix field when prefixSlash is false', () => {
			const filter: FieldRule = {
				field: 'name',
				type: FieldType.STRING,
				operator: ComparisonOperator.EQUALS,
				value: 'test',
			};
			expect(buildAmpsFilter(filter, { prefixSlash: false })).toBe("name = 'test'");
		});

		it('should respect prefixSlash option in groups', () => {
			const filter: FilterGroup = {
				operator: LogicalOperator.AND,
				rules: [
					{
						field: 'firstName',
						type: FieldType.STRING,
						operator: ComparisonOperator.EQUALS,
						value: 'John',
					},
					{
						field: 'lastName',
						type: FieldType.STRING,
						operator: ComparisonOperator.EQUALS,
						value: 'Doe',
					},
				],
			};
			expect(buildAmpsFilter(filter, { prefixSlash: false })).toBe(
				"(firstName = 'John' AND lastName = 'Doe')",
			);
		});
	});

	describe('Options - allowEmptyGroup', () => {
		it('should return empty string for empty group when allowEmptyGroup is true (default)', () => {
			const filter: FilterGroup = {
				operator: LogicalOperator.AND,
				rules: [],
			};
			expect(buildAmpsFilter(filter)).toBe('');
		});

		it('should throw error for empty group when allowEmptyGroup is false', () => {
			const filter: FilterGroup = {
				operator: LogicalOperator.AND,
				rules: [],
			};
			expect(() => buildAmpsFilter(filter, { allowEmptyGroup: false })).toThrow(
				'FilterGroup.rules must contain at least one rule/group',
			);
		});

		it('should filter out empty nested groups', () => {
			const filter: FilterGroup = {
				operator: LogicalOperator.AND,
				rules: [
					{
						field: 'active',
						type: FieldType.BOOLEAN,
						operator: ComparisonOperator.EQUALS,
						value: true,
					},
					{
						operator: LogicalOperator.OR,
						rules: [],
					},
				],
			};
			expect(buildAmpsFilter(filter)).toBe('(/active = true)');
		});
	});

	describe('Options - wrapTopLevel', () => {
		it('should not wrap top level by default', () => {
			const filter: FilterGroup = {
				operator: LogicalOperator.AND,
				rules: [
					{
						field: 'a',
						type: FieldType.STRING,
						operator: ComparisonOperator.EQUALS,
						value: '1',
					},
					{
						field: 'b',
						type: FieldType.STRING,
						operator: ComparisonOperator.EQUALS,
						value: '2',
					},
				],
			};
			expect(buildAmpsFilter(filter)).toBe("(/a = '1' AND /b = '2')");
		});

		it('should wrap top level when wrapTopLevel is true', () => {
			const filter: FieldRule = {
				field: 'name',
				type: FieldType.STRING,
				operator: ComparisonOperator.EQUALS,
				value: 'test',
			};
			expect(buildAmpsFilter(filter, { wrapTopLevel: true })).toBe("(/name = 'test')");
		});

		it('should not double-wrap groups when wrapTopLevel is true', () => {
			const filter: FilterGroup = {
				operator: LogicalOperator.AND,
				rules: [
					{
						field: 'a',
						type: FieldType.STRING,
						operator: ComparisonOperator.EQUALS,
						value: '1',
					},
					{
						field: 'b',
						type: FieldType.STRING,
						operator: ComparisonOperator.EQUALS,
						value: '2',
					},
				],
			};
			expect(buildAmpsFilter(filter, { wrapTopLevel: true })).toBe("((/a = '1' AND /b = '2'))");
		});
	});

	describe('Edge Cases and Error Handling', () => {
		it('should throw error for empty field name', () => {
			const filter: FieldRule = {
				field: '',
				type: FieldType.STRING,
				operator: ComparisonOperator.EQUALS,
				value: 'test',
			};
			expect(() => buildAmpsFilter(filter)).toThrow('FieldRule.field is required');
		});

		it('should throw error when array is used with non-array operator', () => {
			const filter: FieldRule = {
				field: 'name',
				type: FieldType.STRING,
				operator: ComparisonOperator.EQUALS,
				value: ['a', 'b'],
			};
			expect(() => buildAmpsFilter(filter)).toThrow('= does not support array values');
		});

		it('should throw error when STARTS_WITH receives array', () => {
			const filter: FieldRule = {
				field: 'name',
				type: FieldType.STRING,
				operator: ComparisonOperator.STARTS_WITH,
				value: ['a', 'b'],
			};
			expect(() => buildAmpsFilter(filter)).toThrow('STARTS_WITH expects a scalar string value');
		});

		it('should throw error when ENDS_WITH receives array', () => {
			const filter: FieldRule = {
				field: 'name',
				type: FieldType.STRING,
				operator: ComparisonOperator.ENDS_WITH,
				value: ['a', 'b'],
			};
			expect(() => buildAmpsFilter(filter)).toThrow('ENDS_WITH expects a scalar string value');
		});

		it('should throw error when CONTAINS receives array', () => {
			const filter: FieldRule = {
				field: 'name',
				type: FieldType.STRING,
				operator: ComparisonOperator.CONTAINS,
				value: ['a', 'b'],
			};
			expect(() => buildAmpsFilter(filter)).toThrow('CONTAINS expects a scalar string value');
		});

		it('should handle empty IN array', () => {
			const filter: FieldRule = {
				field: 'status',
				type: FieldType.STRING,
				operator: ComparisonOperator.IN,
				value: [],
			};
			expect(buildAmpsFilter(filter)).toBe('/status IN ()');
		});

		it('should handle single element IN array', () => {
			const filter: FieldRule = {
				field: 'id',
				type: FieldType.NUMBER,
				operator: ComparisonOperator.IN,
				value: [42],
			};
			expect(buildAmpsFilter(filter)).toBe('/id IN (42)');
		});
	});

	describe('Complex Real-World Scenarios', () => {
		it('should build complex e-commerce filter', () => {
			const filter: FilterGroup = {
				operator: LogicalOperator.AND,
				rules: [
					{
						field: 'category',
						type: FieldType.STRING,
						operator: ComparisonOperator.IN,
						value: ['electronics', 'computers', 'phones'],
					},
					{
						operator: LogicalOperator.OR,
						rules: [
							{
								field: 'price',
								type: FieldType.NUMBER,
								operator: ComparisonOperator.LESS_THAN,
								value: 1000,
							},
							{
								field: 'onSale',
								type: FieldType.BOOLEAN,
								operator: ComparisonOperator.EQUALS,
								value: true,
							},
						],
					},
					{
						field: 'inStock',
						type: FieldType.BOOLEAN,
						operator: ComparisonOperator.EQUALS,
						value: true,
					},
					{
						field: 'rating',
						type: FieldType.NUMBER,
						operator: ComparisonOperator.GREATER_THAN_OR_EQUALS,
						value: 4,
					},
				],
			};
			expect(buildAmpsFilter(filter)).toBe(
				"(/category IN ('electronics', 'computers', 'phones') AND (/price < 1000 OR /onSale = true) AND /inStock = true AND /rating >= 4)",
			);
		});

		it('should build user search filter', () => {
			const filter: FilterGroup = {
				operator: LogicalOperator.AND,
				rules: [
					{
						operator: LogicalOperator.OR,
						rules: [
							{
								field: 'firstName',
								type: FieldType.STRING,
								operator: ComparisonOperator.STARTS_WITH,
								value: 'John',
							},
							{
								field: 'lastName',
								type: FieldType.STRING,
								operator: ComparisonOperator.STARTS_WITH,
								value: 'John',
							},
							{
								field: 'email',
								type: FieldType.STRING,
								operator: ComparisonOperator.CONTAINS,
								value: 'john',
							},
						],
					},
					{
						field: 'status',
						type: FieldType.STRING,
						operator: ComparisonOperator.EQUALS,
						value: 'active',
					},
					{
						field: 'lastLogin',
						type: FieldType.DATE,
						operator: ComparisonOperator.GREATER_THAN,
						value: '2024-01-01T00:00:00.000Z',
					},
				],
			};
			console.log(buildAmpsFilter(filter));
			expect(buildAmpsFilter(filter)).toBe(
				"((/firstName BEGINS WITH('John') OR /lastName BEGINS WITH('John') OR /email LIKE 'john') AND /status = 'active' AND /lastLogin > '2024-01-01T00:00:00.000Z')",
			);
		});

		it('should build financial transaction filter', () => {
			const filter: FilterGroup = {
				operator: LogicalOperator.AND,
				rules: [
					{
						field: 'type',
						type: FieldType.STRING,
						operator: ComparisonOperator.IN,
						value: ['purchase', 'refund'],
					},
					{
						operator: LogicalOperator.OR,
						rules: [
							{
								operator: LogicalOperator.AND,
								rules: [
									{
										field: 'amount',
										type: FieldType.NUMBER,
										operator: ComparisonOperator.GREATER_THAN,
										value: 10000,
									},
									{
										field: 'verified',
										type: FieldType.BOOLEAN,
										operator: ComparisonOperator.EQUALS,
										value: true,
									},
								],
							},
							{
								field: 'flagged',
								type: FieldType.BOOLEAN,
								operator: ComparisonOperator.EQUALS,
								value: true,
							},
						],
					},
					{
						field: 'status',
						type: FieldType.STRING,
						operator: ComparisonOperator.NOT_EQUALS,
						value: 'cancelled',
					},
				],
			};
			expect(buildAmpsFilter(filter)).toBe(
				"(/type IN ('purchase', 'refund') AND ((/amount > 10000 AND /verified = true) OR /flagged = true) AND /status != 'cancelled')",
			);
		});
	});

	describe('Special Characters and Edge Cases', () => {
		it('should handle special characters in string values', () => {
			const filter: FieldRule = {
				field: 'description',
				type: FieldType.STRING,
				operator: ComparisonOperator.EQUALS,
				value: 'Test with @#$%^&*()!',
			};
			expect(buildAmpsFilter(filter)).toBe("/description = 'Test with @#$%^&*()!'");
		});

		it('should handle newlines in string values', () => {
			const filter: FieldRule = {
				field: 'text',
				type: FieldType.STRING,
				operator: ComparisonOperator.EQUALS,
				value: 'line1\nline2\nline3',
			};
			expect(buildAmpsFilter(filter)).toBe("/text = 'line1\nline2\nline3'");
		});

		it('should handle tabs in string values', () => {
			const filter: FieldRule = {
				field: 'data',
				type: FieldType.STRING,
				operator: ComparisonOperator.EQUALS,
				value: 'col1\tcol2\tcol3',
			};
			expect(buildAmpsFilter(filter)).toBe("/data = 'col1\tcol2\tcol3'");
		});

		it('should handle unicode characters', () => {
			const filter: FieldRule = {
				field: 'name',
				type: FieldType.STRING,
				operator: ComparisonOperator.EQUALS,
				value: 'こんにちは 世界',
			};
			expect(buildAmpsFilter(filter)).toBe("/name = 'こんにちは 世界'");
		});

		it('should handle emojis', () => {
			const filter: FieldRule = {
				field: 'message',
				type: FieldType.STRING,
				operator: ComparisonOperator.CONTAINS,
				value: '🎉',
			};
			expect(buildAmpsFilter(filter)).toBe("/message LIKE '🎉'");
		});
	});
});
