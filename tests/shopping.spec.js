// @ts-check
const { test, expect } = require('@playwright/test');
const website = 'https://www.saucedemo.com';
const inventoryPage = website + '/inventory.html';
const cartPage = website + '/cart.html';

test('add item to cart', async ({ page }) => {
  await page.goto(website);
  const usernameStr = 'standard_user';
  const passwordStr = 'secret_sauce';
  const expectedCartItem = 'Sauce Labs Backpack';

  const username = page.locator('[data-test="username"]')
  await username.click();
  await username.fill(usernameStr);

  const password = page.locator('[data-test="password"]')
  await password.click();
  await password.fill(passwordStr);
  await page.locator('[data-test="login-button"]').click();
  const productPageTitle = page.locator('span[class="title"]');
  await productPageTitle.waitFor();

  await page.locator('[id="add-to-cart-sauce-labs-backpack"]').click();
  await page.locator('[class="shopping_cart_link"]').click();

  await expect(page).toHaveURL(cartPage);
  await expect(page.locator('div[class="inventory_item_name"]')).toHaveText(expectedCartItem);
});
