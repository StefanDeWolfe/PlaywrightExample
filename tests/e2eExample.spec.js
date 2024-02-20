// @ts-check
const { test, expect } = require('@playwright/test');
const website = 'https://www.saucedemo.com/'

test('check title', async ({ page }) => {
  await page.goto(website);

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Swag Labs/);
  
});
