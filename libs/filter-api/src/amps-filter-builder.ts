// Converts your Filter (FieldRule | FilterGroup) into an AMPS filter string.
import {
	ComparisonOperator,
	type FieldRule,
	FieldType,
	type Filter,
	type FilterGroup,
	// LogicalOperator,
} from './types'; // adjust import path or remove if in same file

export type BuildFilterOptions = {
	/** Prefix fields with "/" if missing (common in AMPS). Default: true */
	prefixSlash?: boolean;

	/** If true, empty groups compile to "" instead of throwing. Default: true */
	allowEmptyGroup?: boolean;

	/** If true, top-level group is wrapped in parentheses. Default: false (group already wrapped) */
	wrapTopLevel?: boolean;
};

export function buildFilter(filter: Filter, opts: BuildFilterOptions = {}): string {
	const options: Required<BuildFilterOptions> = {
		prefixSlash: opts.prefixSlash ?? true,
		allowEmptyGroup: opts.allowEmptyGroup ?? true,
		wrapTopLevel: opts.wrapTopLevel ?? false,
	};

	const out = buildNode(filter, options);

	if (!out) return '';
	return options.wrapTopLevel ? `(${out})` : out;
}

// ---------- internals ----------

function isGroup(node: Filter): node is FilterGroup {
	return (node as FilterGroup).rules !== undefined;
}

function buildNode(node: Filter, opts: Required<BuildFilterOptions>): string {
	if (isGroup(node)) {
		const parts = node.rules.map((r) => buildNode(r, opts)).filter(Boolean);

		if (parts.length === 0) {
			if (opts.allowEmptyGroup) return '';
			throw new Error('FilterGroup.rules must contain at least one rule/group');
		}

		// Always wrap groups to preserve precedence
		return `(${parts.join(` ${node.operator} `)})`;
	}
	return buildRule(node, opts);
}

function buildRule(rule: FieldRule, opts: Required<BuildFilterOptions>): string {
	const field = normalizeField(rule.field, opts.prefixSlash);

	switch (rule.operator) {
		case ComparisonOperator.STARTS_WITH: {
			const s = coerceString(rule.value, rule.type, ComparisonOperator.STARTS_WITH);
			return `${field} BEGINS WITH(${quote(`${escapeLike(s)}`)})`;
		}
		case ComparisonOperator.ENDS_WITH: {
			const s = coerceString(rule.value, rule.type, ComparisonOperator.ENDS_WITH);
			return `${field} ENDS WITH(${quote(`${escapeLike(s)}`)})`;
		}
		case ComparisonOperator.CONTAINS: {
			const s = coerceString(rule.value, rule.type, ComparisonOperator.CONTAINS);
			return `${field} LIKE ${quote(`${escapeLike(s)}`)}`;
		}
		case ComparisonOperator.IN:
		case ComparisonOperator.NOT_IN: {
			if (!Array.isArray(rule.value)) {
				throw new Error(`${rule.operator} expects value to be an array`);
			}
			const list = rule.value.map((v) => formatScalar(v, rule.type)).join(', ');
			return `${field} ${rule.operator} (${list})`;
		}
		default: {
			// =, !=, >, >=, <, <=, LIKE
			if (Array.isArray(rule.value)) {
				throw new Error(`${rule.operator} does not support array values`);
			}

			if (rule.operator === 'LIKE') {
				const s = coerceString(rule.value, rule.type, ComparisonOperator.LIKE);
				return `${field} LIKE ${quote(s)}`;
			}

			return `${field} ${rule.operator} ${formatScalar(rule.value, rule.type)}`;
		}
	}
}

function normalizeField(field: string, prefixSlash: boolean): string {
	if (!field) throw new Error('FieldRule.field is required');
	if (!prefixSlash) return field;
	return field.startsWith('/') ? field : `/${field}`;
}

function formatScalar(value: unknown, type: FieldType): string {
	if (value === null || value === undefined) return 'NULL';

	switch (type) {
		case FieldType.STRING:
			return quote(String(value));

		case FieldType.NUMBER: {
			const n = typeof value === 'number' ? value : Number(value);
			if (!Number.isFinite(n)) throw new Error(`Invalid number value: ${String(value)}`);
			return String(n);
		}

		case FieldType.BOOLEAN: {
			const b =
				typeof value === 'boolean'
					? value
					: String(value).toLowerCase() === 'true'
						? true
						: String(value).toLowerCase() === 'false'
							? false
							: (() => {
									throw new Error(`Invalid boolean value: ${String(value)}`);
								})();
			return b ? 'true' : 'false';
		}

		case FieldType.DATE: {
			const iso = toIso8601(value);
			return quote(iso);
		}

		default:
			// exhaustive guard
			throw new Error(`Unsupported FieldType: ${String(type)}`);
	}
}

function toIso8601(value: unknown): string {
	if (value instanceof Date) {
		if (Number.isNaN(value.getTime())) throw new Error('Invalid Date instance');
		return value.toISOString();
	}

	// Allow ISO string or epoch milliseconds
	if (typeof value === 'number') {
		const d = new Date(value);
		if (Number.isNaN(d.getTime())) throw new Error(`Invalid epoch ms date: ${value}`);
		return d.toISOString();
	}

	if (typeof value === 'string') {
		const d = new Date(value);
		if (Number.isNaN(d.getTime())) {
			throw new Error(`Invalid date string: ${value}`);
		}
		return d.toISOString();
	}

	throw new Error(`Unsupported date value type: ${typeof value}`);
}

function quote(s: string): string {
	// escape single quotes by doubling them (SQL/AMPS style)
	return `'${s.replace(/'/g, "''")}'`;
}

/**
 * If your filter values are used inside LIKE patterns, you might want
 * to escape literal %/_ characters so they don’t act as wildcards.
 * If you *want* wildcards, remove this function usage.
 */
function escapeLike(s: string): string {
	// Escapes % and _ by prefixing with backslash.
	// Note: whether AMPS treats backslash as an escape depends on config;
	// keep/remove based on your AMPS LIKE semantics.
	return s.replace(/([%_\\])/g, '\\$1');
}

function coerceString(
	value: unknown | unknown[],
	_type: FieldType,
	op: ComparisonOperator,
): string {
	if (Array.isArray(value)) throw new Error(`${op} expects a scalar string value`);
	return String(value ?? '');
}
