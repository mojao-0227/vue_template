const VueLoaderPlugin = require('vue-loader/lib/plugin')
const entryPoints = {
    main: './src/frontend/js/main.ts'
}
module.exports = {
    // モード値を production に設定すると最適化された状態で、
    // development に設定するとソースマップ有効でJSファイルが出力される
    mode: 'development',

    // メインとなるJavaScriptファイル（エントリーポイント）
    entry: entryPoints,
    // ファイルの出力設定
    output: {
        // 出力ファイル名
        filename: '[name].js'
    },
    module: {
        rules: [
            {
                // 拡張子 .ts の場合
                test: /\.ts$/,
                // TypeScript をコンパイルする
                use: 'ts-loader'
            },
            {
                // 拡張子 .vue の場合
                test: /\.vue$/,
                exclude: /node_modules/,
                loader: 'vue-loader',
            },
            {
                test: /\.pug$/,
                loader: 'pug-plain-loader'
            }
        ],
    },
    watch: true,
    resolve: {
        extensions: ['*', '.ts', '.vue', 'scss', '.js'],
        // Webpackで利用するときの設定
        alias: {
            vue: 'vue/dist/vue.js'
        }
    },
    plugins: [
        new VueLoaderPlugin()
    ]
};