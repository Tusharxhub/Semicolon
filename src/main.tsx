import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';

// Mark start of hydration
performance.mark('app-start');

// Passive listener helper for scroll/resize to avoid blocking main thread
const addPassive = (type: string, listener: EventListenerOrEventListenerObject, opts: AddEventListenerOptions = {}) => {
	window.addEventListener(type, listener, { passive: true, ...opts });
};

// Example: throttle resize calculations (placeholder if needed later)
let resizeRaf: number | null = null;
addPassive('resize', () => {
	if (resizeRaf) return;
	resizeRaf = requestAnimationFrame(() => {
		resizeRaf = null;
		// future responsive recalculations
	});
});

const rootEl = document.getElementById('root')!;
createRoot(rootEl).render(<App />);

// Mark after paint
requestAnimationFrame(() => {
	performance.mark('app-rendered');
	performance.measure('app-start-to-render', 'app-start', 'app-rendered');
});

// Defer non-critical work
const idle = (cb: () => void) => (('requestIdleCallback' in window) ? (window as any).requestIdleCallback(cb, { timeout: 2000 }) : setTimeout(cb, 1));
idle(() => {
	// Placeholder: warm up caches, prefetch assets
});
