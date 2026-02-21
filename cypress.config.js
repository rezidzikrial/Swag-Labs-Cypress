const { defineConfig } = require("cypress");

module.exports = defineConfig({
    reporter: 'cypress-mochawesome-reporter',
    reporterOptions: {
    reportDir: 'cypress/reports',
    charts: true,
    reportPageTitle: 'Automation Test Report',
    embeddedScreenshots: true,
    inlineAssets: true
  },
  e2e: {
    baseUrl : 'https://www.saucedemo.com/',
    setupNodeEvents(on, config) {
      // implement node event listeners here
      require('cypress-mochawesome-reporter/plugin')(on);
    },
    specPattern : "cypress/e2e/**/*.{js,jsx,ts,tsx,feature}"
  },
   //capture screenshots & videos
    screenshotOnRunFailure: true,
    video: true,
    videosFolder: 'cypress/videos',
    screenshotsFolder: 'cypress/screenshots',
    trashAssetsBeforeRuns: true,
  env: {
      
        username : 'standard_user',
        password : 'secret_sauce',
      
      

  },
});
