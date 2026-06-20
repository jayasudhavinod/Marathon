// Test Case Title
// Verify dynamic movie ticket booking flow in PVR Cinemas website
// Preconditions
// User has internet access
// PVR Cinemas website is accessible
// Test Steps
// 1. Launch the browser.
// 2. Navigate to https://www.pvrcinemas.com/.
// 3. Select the required city.
// 4. Click on the Cinema option.
// 5. Click on Select Cinema dropdown.
// 6. Select any available cinema from the list.
// 7. Select any available date (Today/Tomorrow/Upcoming).
// 8. Select any available movie from the movie list.
// 9. Select any available show time.
// 10. Click on the Submit button.
// 11. Accept the consent/cookie popup if displayed.
// 12. Accept any additional confirmation popup if displayed.
// 13. Select any available seat from the seating layout.
// 14. Verify the selected seat information is displayed.
// 15. Verify the total ticket amount is displayed.
// 16. Verify the page title is displayed correctly.
// 17. Click on the Proceed button.
// Expected Result
// User should be able to dynamically select cinema, movie, date, show time, and seat, view booking
// details, and proceed successfully.

import test, { expect } from '@playwright/test';

test("Booking Tickets", async ({ page }) => {

    test.setTimeout(90000);

    await page.goto("https://www.pvrcinemas.com/");

    await page.locator("//h6[text()='Chennai']").click();

    await page.locator("//span[text()='Cinema']").click();

    await page.locator("//span[text()='Select Cinema']").click();

    const cinema = page.locator("//span[contains(text(),'Sathyam Royapettah')]");
    await cinema.waitFor({ state: 'visible', timeout: 60000 });
    await cinema.click();

    // ✅ Wait for Tomorrow button instead of networkidle
    const tomorrow = page.locator("//span[text()='Tomorrow']");
    await tomorrow.waitFor({ state: 'visible', timeout: 60000 });
    await tomorrow.click();

    // ✅ Select ANY available movie (instead of BLAST)
    const movie = page.locator("//div[contains(@class,'movie')]").first();
    await movie.waitFor({ state: 'visible', timeout: 60000 });
    await movie.click();

    // ✅ Select ANY available showtime (instead of 04:25 PM)
    const showTimes = page.locator("//span[contains(text(),'AM') or contains(text(),'PM')]");
    await showTimes.first().waitFor({ state: 'visible', timeout: 60000 });
    await showTimes.first().click();

    await page.getByLabel("Submit").click();

    const acceptBtn = page.locator("//button[text()='Accept']");
    await acceptBtn.waitFor({ state: 'visible', timeout: 60000 });
    await acceptBtn.click();

    // ✅ Select ANY available seat
    const seat = page.locator("//span[contains(@id,'EC')]").first();
    await seat.waitFor({ state: 'visible', timeout: 60000 });
    await seat.click();

    // ✅ Validate movie name exists (dynamic)
    const moviename = page.locator("//h5");
    await expect(moviename).toBeVisible();

    const amnt = await page.locator(".grand-prices").innerText();
    console.log("Total amount is: " + amnt);

    const seatinfo = await page.locator(".seat-info").innerText();
    console.log(`Seat booked: ${seatinfo}`);

    await expect(page).toHaveTitle(/PVR Cinemas/);

    const proceedBtn = page.locator("//button[text()='Proceed']");
    await proceedBtn.waitFor({ state: 'visible', timeout: 60000 });
    await proceedBtn.click();

});