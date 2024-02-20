// @ts-check
const { test, expect } = require('@playwright/test');
const website = 'https://www.saucedemo.com';
const inventoryPage = website + '/inventory.html';

test('login page visibile', async ({ page }) => {
  await page.goto(website);

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Swag Labs/);
});

test('standard user login', async ({ page }) => {
  await page.goto(website);
  const usernameStr = 'standard_user';
  const passwordStr = 'secret_sauce';

  const username = page.locator('[data-test="username"]')
  await username.click();
  await username.fill(usernameStr);

  const password = page.locator('[data-test="password"]')
  await password.click();
  await password.fill(passwordStr);
  await page.locator('[data-test="login-button"]').click();
  const productPageTitle = page.locator('span[class="title"]');
  await productPageTitle.waitFor();

  await expect(page).toHaveURL(inventoryPage);
});

test('locked out user login', async ({ page }) => {
  await page.goto(website);
  const usernameStr = 'locked_out_user';
  const passwordStr = 'secret_sauce';
  const errorText = 'Epic sadface: Sorry, this user has been locked out.';

  const username = page.locator('[data-test="username"]')
  await username.click();
  await username.fill(usernameStr);

  const password = page.locator('[data-test="password"]')
  await password.click();
  await password.fill(passwordStr);

  await page.locator('[data-test="login-button"]').click();

  await expect(page).toHaveURL(website);
  await expect(page.locator('[data-test="error"]')).toBeVisible()
  await expect(page.locator('[data-test="error"]')).toHaveText(errorText);
});


test('bad user login', async ({ page }) => {
  await page.goto(website);
  const usernameStr = 'not a real user';
  const passwordStr = 'bad password';
  const errorText = 'Epic sadface: Username and password do not match any user in this service';

  const username = page.locator('[data-test="username"]')
  await username.click();
  await username.fill(usernameStr);

  const password = page.locator('[data-test="password"]')
  await password.click();
  await password.fill(passwordStr);

  await page.locator('[data-test="login-button"]').click();

  await expect(page).toHaveURL(website);
  await expect(page.locator('[data-test="error"]')).toBeVisible();
  await expect(page.locator('[data-test="error"]')).toHaveText(errorText);
});


test('standard user login poor performance', async ({ page }) => {
  await page.goto(website);
  const usernameStr = 'performance_glitch_user';
  const passwordStr = 'secret_sauce';

  const username = page.locator('[data-test="username"]')
  await username.click();
  await username.fill(usernameStr);

  const password = page.locator('[data-test="password"]')
  await password.click();
  await password.fill(passwordStr);

  await page.locator('[data-test="login-button"]').click();

  const productPageTitle = page.locator('span[class="title"]');
  await productPageTitle.waitFor();

  await expect(page).toHaveURL(inventoryPage);
});