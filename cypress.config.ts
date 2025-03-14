import { defineConfig } from "cypress";
import { addCucumberPreprocessorPlugin } from "@badeball/cypress-cucumber-preprocessor";
import createEsbuildPlugin from "@badeball/cypress-cucumber-preprocessor/esbuild";
import createBundler from "@bahmutov/cypress-esbuild-preprocessor";
import tasks from "./cypress/support/tasks.js";

async function setupNodeEvents(
  on: Cypress.PluginEvents,
  config: Cypress.PluginConfigOptions
): Promise<Cypress.PluginConfigOptions> {
  await addCucumberPreprocessorPlugin(on, config);
  on(
    "file:preprocessor",
    createBundler({ plugins: [createEsbuildPlugin(config)] })
  );
  on("task", tasks);
  return config;
}

export default defineConfig({
  e2e: {
    setupNodeEvents,
    specPattern: "./cypress/e2e/**/*.{feature,features}",
    supportFile: "./cypress/support/e2e.ts",
	baseUrl: "https://the-internet.herokuapp.com"
  },
});