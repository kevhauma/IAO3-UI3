module.exports = {
    root: true,

    parserOptions: {
        parser: 'babel-eslint',
        sourceType: 'module'
    },

    env: {
        browser: true
    },

    extends: ["plugin:vue/essential"],
    rules: {
        // allow async-await
        'generator-star-spacing': 'off',
        // allow paren-less arrow functions
        'arrow-parens': 'off',
        "no-console": process.env.NODE_ENV === "production" ? "error" : "off",
        "no-debugger": process.env.NODE_ENV === "production" ? "error" : "off"
    },

    // required to lint *.vue files
    plugins: [
    'vue'
  ],

    globals: {
        'ga': true, // Google Analytics
        'cordova': true,
        '__statics': true,
        'process': true,
        'Capacitor': true,
        'chrome': true
    },
}
