const path = require('path');
const mix = require('laravel-mix');

mix
	.ts('src/ts/app.tsx', 'js')
	.react()
	.postCss('src/css/app.css', 'css', [
		require('tailwindcss'),
	])
	.setPublicPath('app')
	.webpackConfig({
		resolve: {
			extensions: ['.js', '.jsx', '.ts', '.tsx'],
			alias: {
				'@components': path.resolve(__dirname, 'src/ts/components'),
				'@hooks': path.resolve(__dirname, 'src/ts/hooks'),
				'@types': path.resolve(__dirname, 'src/ts/types'),
			}
		}
	});
