# deduefren-cv

Repo containing my personal cv website. Written in Angular (mainly html) and containing basic features.


[![Azure Static Web Apps CI/CD](https://github.com/deduefren/deduefren-cv/actions/workflows/azure-static-web-apps-wonderful-mushroom-0a6ccf103.yml/badge.svg)](https://github.com/deduefren/deduefren-cv/actions/workflows/azure-static-web-apps-wonderful-mushroom-0a6ccf103.yml)

## App checks

From `cv-app`, run `npm test` for unit tests and Playwright browser tests, or
`npm run build` to type-check and create the production build. Playwright starts
the app automatically for end-to-end tests.

On a new machine, install the Playwright Chromium browser once with
`npx playwright install chromium`. Add a Playwright test under `cv-app/e2e`
for user-visible behavior and layout changes; `npm test` runs these tests by
default alongside the unit suite.
