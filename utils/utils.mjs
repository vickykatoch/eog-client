import amps from 'amps';

const INSTRUMENTS = [
	{
		id: '2_YEAR.UST',
		alias: '2_YEAR',
		coupon: 3.15,
		maturity_date: '2028-01-04',
		timestamp: '2026-01-04T00:00:00Z',
		dv01: 0.02,
		micCode: 'UST',
	},
	{
		id: '3_YEAR.UST',
		alias: '3_YEAR',
		coupon: 3.25,
		maturity_date: '2029-01-04',
		timestamp: '2026-01-04T00:00:00Z',
		dv01: 0.03,
		micCode: 'UST',
	},
	{
		id: '5_YEAR.UST',
		alias: '5_YEAR',
		coupon: 3.45,
		maturity_date: '2031-01-04',
		timestamp: '2026-01-04T00:00:00Z',
		dv01: 0.05,
		micCode: 'UST',
	},
	{
		id: '7_YEAR.UST',
		alias: '7_YEAR',
		coupon: 3.65,
		maturity_date: '2033-01-04',
		timestamp: '2026-01-04T00:00:00Z',
		dv01: 0.07,
		micCode: 'UST',
	},
	{
		id: '10_YEAR.UST',
		alias: '10_YEAR',
		coupon: 3.85,
		maturity_date: '2036-01-04',
		timestamp: '2026-01-04T00:00:00Z',
		dv01: 0.1,
		micCode: 'UST',
	},
	{
		id: '20_YEAR.UST',
		alias: '20_YEAR',
		coupon: 4.05,
		maturity_date: '2046-01-04',
		timestamp: '2026-01-04T00:00:00Z',
		dv01: 0.2,
		micCode: 'UST',
	},
	{
		id: '30_YEAR.UST',
		alias: '30_YEAR',
		coupon: 4.25,
		maturity_date: '2056-01-04',
		timestamp: '2026-01-04T00:00:00Z',
		dv01: 0.3,
		micCode: 'UST',
	},
];
function getConnection() {
	const client = new amps.Client('publisher');
	const defaultChooser = new amps.DefaultServerChooser();
	defaultChooser.add('ws://localhost:9008/amps/json');
	client.serverChooser(defaultChooser);
	client.ackBatchSize(10 * 10000);

	return client.connect().then((msg) => {
		console.log('Connected to AMPS server', msg);
		return client;
	});
}
async function publish() {
	const client = await getConnection();
	INSTRUMENTS.forEach((instrument) => {
		client.publish('/reference/data/instruments', instrument);
	});
	const result = await client.flush('persisted');
	console.log('Published instruments:', result);
	client.disconnect();
}
publish();
