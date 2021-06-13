import React from 'react';
import { render } from 'react-dom';
import App from './components/App';

declare global {
	interface Window {
		fs: any;
	}
}

render(<App />, document.getElementById('root'));
