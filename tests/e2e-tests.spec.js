// @ts-check
const { test, expect } = require('@playwright/test');
const website = 'https://www.saucedemo.com';
const inventoryPage = website + '/inventory.html';
const cartPage = website + '/cart.html';
const checkoutPage = website + '/checkout-step-one.html';

test('standard user login and logout', async ({ page }) => {
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

  await page.locator('[id="react-burger-menu-btn"]').click();
  await page.locator('[id="logout_sidebar_link"]').click()
  await expect(page).toHaveURL(website);
});

test('standard user shops for 1 item and checks out then logs out', async ({ page }) => {
  await page.goto(website);
  const usernameStr = 'standard_user';
  const passwordStr = 'secret_sauce';
  const expectedCartItem = 'Sauce Labs Backpack';
  const userFirstName = 'John';
  const userLastName = 'Doe';
  const userZipCode = '12345';

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
  await page.locator('[id="add-to-cart-sauce-labs-backpack"]').click();
  await page.locator('[class="shopping_cart_link"]').click();

  await expect(page).toHaveURL(cartPage);
  await expect(page.locator('div[class="inventory_item_name"]')).toHaveText(expectedCartItem);

  await page.locator('[id="checkout"]').click();

  await expect(page).toHaveURL(checkoutPage);

  const firstNameField = page.locator('[id="first-name"]')
  await firstNameField.click();
  await firstNameField.fill(userFirstName);

  const lastNameField = page.locator('[id="last-name"]')
  await lastNameField.click();
  await lastNameField.fill(userLastName);

  const postalCodeField = page.locator('[id="postal-code"]')
  await postalCodeField.click();
  await postalCodeField.fill(userZipCode);

  await page.locator('[id="continue"]').click();

  await page.locator('[id="finish"]').click();

  await page.locator('[id="back-to-products"]').click();

  await page.locator('[id="react-burger-menu-btn"]').click();
  await page.locator('[id="logout_sidebar_link"]').click();
  await expect(page).toHaveURL(website);
});
