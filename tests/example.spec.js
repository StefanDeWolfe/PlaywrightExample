// @ts-check
const { test, expect } = require('@playwright/test');
const website = 'https://www.saucedemo.com/'

test('check title', async ({ page }) => {
  await page.goto(website);

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Swag Labs/);
});

test('standard user login', async ({ page }) => {
  await page.goto(website);
  const standardUser = 'standard_user'
  const standardPass = 'secret_sauce'

  await page.locator('[data-test="username"]').click()
  await page.locator('[data-test="username"]').fill(standardUser);

  await page.locator('[data-test="password"]').click()
  await page.locator('[data-test="password"]').fill(standardPass);

  await page.locator('[data-test="login-button"]').click()

  await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html)');
});
