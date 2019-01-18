module.exports = {
    parserOptions: {
        parser: 'babel-eslint',
        sourceType: 'module'
      },
      env: {
        browser: true,
      },
      // Extends default rules with eslint-plugin-vue plugin rules
      // Extend current rules with standard rules : https://github.com/standard/eslint-config-standard
      extends: [
        'plugin:vue/recommended',
        // https://github.com/standard/standard/blob/master/docs/RULES-en.md
        'standard'
      ],
      // Lint *.vue files
      plugins: [
        'vue'
      ],
      rules: {
        // allow async-await
        'generator-star-spacing': 0,
      }
}