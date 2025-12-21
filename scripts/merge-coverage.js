import { readFileSync, writeFileSync, existsSync, mkdirSync, readdirSync, statSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const rootDir = join(__dirname, '..');
const coverageDir = join(rootDir, 'coverage');

// Create coverage directory if it doesn't exist
if (!existsSync(coverageDir)) {
	mkdirSync(coverageDir, { recursive: true });
}

const workspaces = [
	'shell',
	'plugins/amps-controller',
	// Add more workspaces as needed
];

const mergedCoverage = {
	total: {
		lines: { total: 0, covered: 0, skipped: 0, pct: 0 },
		statements: { total: 0, covered: 0, skipped: 0, pct: 0 },
		functions: { total: 0, covered: 0, skipped: 0, pct: 0 },
		branches: { total: 0, covered: 0, skipped: 0, pct: 0 },
	},
};

let htmlContent = `
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>Combined Coverage Report</title>
    <style>
        body { font-family: Arial, sans-serif; margin: 20px; }
        h1 { color: #333; }
        table { border-collapse: collapse; width: 100%; margin-top: 20px; }
        th, td { border: 1px solid #ddd; padding: 12px; text-align: left; }
        th { background-color: #4CAF50; color: white; }
        tr:nth-child(even) { background-color: #f2f2f2; }
        .high { color: green; font-weight: bold; }
        .medium { color: orange; font-weight: bold; }
        .low { color: red; font-weight: bold; }
        .summary { margin: 20px 0; padding: 15px; background-color: #f0f0f0; border-radius: 5px; }
    </style>
</head>
<body>
    <h1>Combined Coverage Report</h1>
    <div class="summary">
        <h2>Summary</h2>
`;

const workspaceReports = [];

// Process each workspace
for (const workspace of workspaces) {
	const coveragePath = join(rootDir, 'coverage', workspace, 'coverage-summary.json');

	if (existsSync(coveragePath)) {
		try {
			const coverage = JSON.parse(readFileSync(coveragePath, 'utf-8'));
			const total = coverage.total;

			workspaceReports.push({
				name: workspace,
				lines: total.lines.pct,
				statements: total.statements.pct,
				functions: total.functions.pct,
				branches: total.branches.pct,
			});

			// Accumulate totals
			mergedCoverage.total.lines.total += total.lines.total;
			mergedCoverage.total.lines.covered += total.lines.covered;
			mergedCoverage.total.statements.total += total.statements.total;
			mergedCoverage.total.statements.covered += total.statements.covered;
			mergedCoverage.total.functions.total += total.functions.total;
			mergedCoverage.total.functions.covered += total.functions.covered;
			mergedCoverage.total.branches.total += total.branches.total;
			mergedCoverage.total.branches.covered += total.branches.covered;
		} catch (error) {
			console.error(`Error reading coverage for ${workspace}:`, error.message);
		}
	}
}

// Calculate percentages
if (mergedCoverage.total.lines.total > 0) {
	mergedCoverage.total.lines.pct = (
		(mergedCoverage.total.lines.covered / mergedCoverage.total.lines.total) *
		100
	).toFixed(2);
}
if (mergedCoverage.total.statements.total > 0) {
	mergedCoverage.total.statements.pct = (
		(mergedCoverage.total.statements.covered / mergedCoverage.total.statements.total) *
		100
	).toFixed(2);
}
if (mergedCoverage.total.functions.total > 0) {
	mergedCoverage.total.functions.pct = (
		(mergedCoverage.total.functions.covered / mergedCoverage.total.functions.total) *
		100
	).toFixed(2);
}
if (mergedCoverage.total.branches.total > 0) {
	mergedCoverage.total.branches.pct = (
		(mergedCoverage.total.branches.covered / mergedCoverage.total.branches.total) *
		100
	).toFixed(2);
}

// Add summary to HTML
const getColorClass = (pct) => {
	if (pct >= 80) return 'high';
	if (pct >= 50) return 'medium';
	return 'low';
};

htmlContent += `
        <p><strong>Lines:</strong> <span class="${getColorClass(mergedCoverage.total.lines.pct)}">${mergedCoverage.total.lines.pct}%</span> (${mergedCoverage.total.lines.covered}/${mergedCoverage.total.lines.total})</p>
        <p><strong>Statements:</strong> <span class="${getColorClass(mergedCoverage.total.statements.pct)}">${mergedCoverage.total.statements.pct}%</span> (${mergedCoverage.total.statements.covered}/${mergedCoverage.total.statements.total})</p>
        <p><strong>Functions:</strong> <span class="${getColorClass(mergedCoverage.total.functions.pct)}">${mergedCoverage.total.functions.pct}%</span> (${mergedCoverage.total.functions.covered}/${mergedCoverage.total.functions.total})</p>
        <p><strong>Branches:</strong> <span class="${getColorClass(mergedCoverage.total.branches.pct)}">${mergedCoverage.total.branches.pct}%</span> (${mergedCoverage.total.branches.covered}/${mergedCoverage.total.branches.total})</p>
    </div>
    
    <h2>Workspace Coverage</h2>
    <table>
        <thead>
            <tr>
                <th>Workspace</th>
                <th>Lines</th>
                <th>Statements</th>
                <th>Functions</th>
                <th>Branches</th>
                <th>Report</th>
            </tr>
        </thead>
        <tbody>
`;

// Add workspace rows
for (const report of workspaceReports) {
	htmlContent += `
            <tr>
                <td>${report.name}</td>
                <td class="${getColorClass(report.lines)}">${report.lines}%</td>
                <td class="${getColorClass(report.statements)}">${report.statements}%</td>
                <td class="${getColorClass(report.functions)}">${report.functions}%</td>
                <td class="${getColorClass(report.branches)}">${report.branches}%</td>
                <td><a href="${report.name}/index.html" target="_blank">View Details</a></td>
            </tr>
    `;
}

htmlContent += `
        </tbody>
    </table>
</body>
</html>
`;

// Write merged coverage summary
writeFileSync(join(coverageDir, 'coverage-summary.json'), JSON.stringify(mergedCoverage, null, 2));

// Write HTML report
writeFileSync(join(coverageDir, 'index.html'), htmlContent);

console.log('\n✅ Coverage reports merged successfully!');
console.log(
	`📊 Combined Coverage: Lines ${mergedCoverage.total.lines.pct}% | Statements ${mergedCoverage.total.statements.pct}% | Functions ${mergedCoverage.total.functions.pct}% | Branches ${mergedCoverage.total.branches.pct}%`,
);
console.log(`📄 View report: coverage/index.html\n`);
