// @ts-check
import { test, expect } from '@playwright/test';

test('land on flipcart page', async ({ page }) => {

// https://eventhub.rahulshettyacademy.com/login

  const url = "https://www.flipkart.com/";
  const searchInput = page.locator("input[title*='Search for Products']");
  const submitSearch = page.locator("button[type='submit']");
  const firstElement = page.locator("div[data-id='SHOGMKFZUPUEJUAW'] a");
  const title = "Online Shopping Site for Mobiles, Electronics, Furniture, Grocery, Lifestyle, Books & More. Best Offers!";


  await page.goto(url);
  console.log('Title is: ',await page.title());
  await expect(page).toHaveTitle(title);
  await searchInput.first().fill('shoes');
  await submitSearch.click();
  const titleOfShoe = await firstElement.nth(1).textContent();
  console.log('titleOfShoe::',titleOfShoe);

});
