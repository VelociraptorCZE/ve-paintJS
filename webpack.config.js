require("webpack");
const path = require("path");

module.exports = {
    entry: [
        "./src/js/app.js"
    ],
    output: {
        path: path.resolve(__dirname, "dist/js"),
        filename: "app.js"
    },
    module: {
        rules: [{
                test: /\.js?$/,
                exclude: /node_modules/,
                loader: "babel-loader",
                query: {
                    cacheDirectory: true,
                    presets: [
                        ["es2015"],
                        ["env", {
                            targets: {
                                browsers: ["last 2 versions", "safari >= 7"],
                            },
                        }],
                    ],
                },
            }
        ]
    }
};
