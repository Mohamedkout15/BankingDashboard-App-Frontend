const path = require('path');

module.exports = {
    resolve: {
        fallback: {
            "path": require.resolve("path-browserify"),
            "fs": false, // fs is not available in the browser, so we set it to false
            "os": require.resolve("os-browserify/browser"),
            "timers": require.resolve("timers-browserify")
        }
    }
};
