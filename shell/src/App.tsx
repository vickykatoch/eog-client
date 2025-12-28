import { ShellContextProvider } from './context';
import { LayoutHost } from './layouts';

export default function App() {
	return (
		<ShellContextProvider>
			<LayoutHost />
		</ShellContextProvider>
	);
}
