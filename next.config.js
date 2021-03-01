const folder = process.env.NODE_ENV === 'development' ? 'src' : 'dist';
const withNextra = require("nextra")(`./nextra-theme-docs/${folder}`, "./theme.config.js");
module.exports = withNextra();
