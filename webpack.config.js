const { resolve } = require("path-browserify")

module.exports = {
    resolve: {
        fallback: { "path": require.resolve("path-browserify") }
    }
}