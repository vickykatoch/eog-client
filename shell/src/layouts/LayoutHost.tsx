import { useShellContext } from '../context';
import { VanillaLayout } from './vanilla/VanillaLayout';

export const LayoutHost = () => {
	const { loading, layout, error } = useShellContext();
	if (loading) return <div className="flex grow col">Loading layout...</div>;
	if (error) return <div className="flex grow col">Error loading layout: {error.message}</div>;
	if (layout === 'vanilla') return <VanillaLayout />;
	return <div className="flex grow col">Unknown Host</div>;
};
