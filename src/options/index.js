import 'sanitize.css';
import 'sanitize.css/typography.css';

import App from './index.svelte';

const app = new App({
	target: document.body,
	props: {}
});

window.app = app;

export default app;
