export enum ComparisonOperator {
	EQUALS = '=',
	NOT_EQUALS = '!=',
	GREATER_THAN = '>',
	GREATER_THAN_OR_EQUALS = '>=',
	LESS_THAN = '<',
	LESS_THAN_OR_EQUALS = '<=',
	IN = 'IN',
	NOT_IN = 'NOT IN',
	LIKE = 'LIKE',
	STARTS_WITH = 'STARTS_WITH',
	ENDS_WITH = 'ENDS_WITH',
	CONTAINS = 'CONTAINS',
}

export enum FieldType {
	STRING = 'string',
	NUMBER = 'number',
	DATE = 'date',
	BOOLEAN = 'boolean',
}
export interface FieldRule {
	field: string;
	type: FieldType;
	operator: ComparisonOperator;
	value: unknown | unknown[];
}

export enum LogicalOperator {
	AND = 'AND',
	OR = 'OR',
}

export type Filter = FieldRule | FilterGroup;

export type FilterGroup = {
	operator: LogicalOperator;
	/** children can be rules OR nested groups */
	rules: Filter[];
};

export interface SortOption {
	field: string;
	direction: 'ASC' | 'DESC';
}
