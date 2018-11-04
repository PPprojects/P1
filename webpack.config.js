const isDev = process.env.NODE_ENV === 'development'

module.exports = {
	mode: isDev ? 'development' : 'production',
	entry: [
		'@babel/polyfill', // enables async-await
		'./browser/App.js' // injection point in
	],
	stats: 'errors-only', //minimizes logging of webpack
	output: {
		path: __dirname,
		filename: './public/bundle.js' // injection point out
	},
	resolve: {
		extensions: ['.js', '.jsx']
	},
	devtool: 'source-map',
	module: {
		rules: [
			{
				test: /\.jsx?$/,
				exclude: /node_modules/,
				loader: 'babel-loader'
			}
		]
	}
}
