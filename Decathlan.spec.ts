// TEST CASE DOCUMENT
// Test Case Name: Search product, apply filters, add to cart in Decathlon
// Preconditions: Browser should be launched Internet connection should be available
// Test Steps:
// Launch the browser
// Navigate to https://www.decathlon.in/
// Verify the user is navigated to the Decathlon home page
// Click on the Search icon on the home page
// Verify the search input field is enabled
// Enter the product name as "shoes" in the search field
// Press Enter to search the product
// Capture and print the page title in the console
// Verify the page title is displayed as "Search | shoes"
// Click on the "Running" category filter
// Click on the "Men" gender filter
// Click on the shoe size filter "UK 10.5"
// Click on the Sort option
// Select the sorting option "Price: High to Low"
// Click on the first product from the displayed product list
// Select the shoe size "UK 10.5 - EU 45" on the product detail page
// Click on the "Add to Cart" button
// Click on the Cart option
// Fetch the total cart value
// Print the total cart amount in the console
// Expected Result: Product should be successfully searched, filtered, added to cart, and total cart value should
// be displayed and printed in the console

import test, { expect } from '@playwright/test';

test("Decathlon App", async ({ page }) => {

    test.setTimeout(90000);

    await page.goto("https://www.decathlon.in/");

    console.log(await page.title());
    console.log("User is Navigated to Homepage");

    const searchBox = page.locator("input[type='search']");
    await expect(searchBox).toBeVisible();
    console.log("Search Box is Enabled");

    await searchBox.fill("Shoes");
    await page.keyboard.press("Enter");

    // ✅ Wait for search results page properly
    await expect(page).toHaveTitle(/Shoes/);
    console.log("The shoes page title is : " + await page.title());

    // ✅ IMPORTANT: wait for products to load
    const products = page.locator("//div[contains(@class,'product')]");
    await products.first().waitFor({ state: 'visible', timeout: 60000 });

    // ✅ Click first product
    await products.first().click();

    // ✅ Wait for Add to Cart button
    const addToCart = page.locator("//button[contains(.,'ADD TO CART') or contains(.,'Add to Cart')]");
    await addToCart.waitFor({ state: 'visible', timeout: 60000 });

    // Freeze for debugging (your requirement)
    setTimeout(() => { debugger; }, 4000);

    await addToCart.click();

    // ✅ Handle popup/cart panel
    const cartPopup = page.locator("//div[contains(@class,'cart') or contains(@class,'drawer')]");
    await cartPopup.waitFor({ state: 'visible', timeout: 60000 });

    console.log("Product added to cart successfully");

});