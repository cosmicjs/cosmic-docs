const path = process.env.NODE_ENV === 'development' ? '`./nextra-theme-docs/src' : 'nextra-theme-docs';
const withNextra = require("nextra")(path, "./theme.config.js");
module.exports = withNextra();
