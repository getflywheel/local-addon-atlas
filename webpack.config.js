const path = require('path'); // eslint-disable-line @typescript-eslint/no-var-requires
const { merge } = require('webpack-merge'); // eslint-disable-line @typescript-eslint/no-var-requires

const commonConf = {
	mode: process.env.NODE_ENV || 'development',
	context: path.resolve(__dirname, 'src'),
	externals: [
		'@getflywheel/local',
		'@getflywheel/local/main',
		'@getflywheel/local/renderer',
		'react',
		'@getflywheel/local-components',
		'react-dom',
		'react-router-dom',
	],
	devtool: 'source-map',
	module: {
		rules: [
			{
				test: /\.[tj]sx?$/,
				exclude: [/node_modules/],
				use: [
					{
						loader: 'ts-loader',
						options: {
							transpileOnly: true,
							configFile: 'tsconfig.json',
							onlyCompileBundledFiles: true,
						},
					},
				],
			},
		],
	},
	resolve: {
		extensions: ['.tsx', '.ts', '.jsx', '.js'],
	},
	output: {
		filename: '[name].js',
		path: path.join(__dirname, 'lib'),
		libraryTarget: 'commonjs2',
	},
};

const configs = [
	{
		entry: {
			renderer: './renderer.tsx',
			terminal: path.join(__dirname, 'src', 'renderer', '_browserWindows', 'terminal.ts'),
		},
		module: {
			rules: [
				{
					test: /\.svg$/,
					issuer: /\.[tj]sx?$/,
					use: [
						'babel-loader',
						{
							loader: 'react-svg-loader',
							options: {
								svgo: {
									plugins: [
										{
											inlineStyles: { onlyMatchedOnce: false },
										},
									],
								},
							},
						},
					],
				},
			],
		},
		target: 'electron-renderer',
	},
	{
		entry: {
			main: './main.ts',
		},
		target: 'electron-main',
	},
].map((config) => merge(commonConf, config));

module.exports = configs;
