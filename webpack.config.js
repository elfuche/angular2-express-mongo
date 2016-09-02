module.exports = {
    entry: {
        'main': './client/app/main.ts'
    },
    output: {
        filename: './client/app/[name].js'
    },
    resolve: {
        extensions: ['', '.ts', '.js']
    },
    module: {
        loaders: [
            {
                test: /\.ts$/,
                loader: 'ts'
            },
            {
                test: /\.js$/,
                loader: 'source-map-loader',
                exclude: [
                    // these packages have problems with their sourcemaps
                    './node_modules/rxjs',
                    './node_modules/@angular'
                ]
            }
        ]
    }
}