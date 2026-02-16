const { defineConfig } = require("cypress");

module.exports = defineConfig({
  allowCypressEnv: true,

  e2e: {
    baseUrl : 'https://www.saucedemo.com/',
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    specPattern : "cypress/e2e/**/*.{js,jsx,ts,tsx,feature}"
  },
  env: {
      
        username : 'standard_user',
        password : 'secret_sauce',
      
      

  },
});
