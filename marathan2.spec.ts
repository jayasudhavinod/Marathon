import test from '@playwright/test'

test("ServiceNow Service Catalog",async({page})=>{

    await page.goto("https://dev296651.service-now.com/")
    await page.locator("#user_name").fill("admin")
    await page.locator("#user_password").fill("E7i*7wNgX*mM")
    await page.locator("#sysverb_login").click()
    await page.getByText("All").click()
    await page.getByPlaceholder("Filter").fill("Service Catalog")
    await page.keyboard.press("Enter")
    await page.waitForTimeout(2000)
    await page.getByLabel("Service Catalog 1 of 1").first().click()
    await page.frameLocator("[name='gsft_main']").locator("//a[text()='Mobiles']").click()
    await page.frameLocator("#gsft_main").locator("//h3/strong[text()='Apple iPhone 13 pro']").click()
    const frame=await page.frameLocator("#gsft_main")
    await frame.locator('//label[@class="radio-label"]').first().check()
    await frame.locator('[name="IO:4afecf4e9747011021983d1e6253af34"]').fill("99")
    await frame.locator("select[name='IO:ff1f478e9747011021983d1e6253af68']").selectOption({value:'unlimited'})
    await frame.locator("//label[text()='Sierra Blue']").check()
    await frame.locator("//label[text()='512 GB [add $300.00]']").check()
    await frame.locator("#oi_order_now_button").click()
    const msg=await page.frameLocator("#gsft_main")
    const confirmationmsg=await msg.locator("//div[@class='notification notification-success']").innerText()
    console.log("Confirmation Message is:" +confirmationmsg)
    await page.screenshot({path: 'Screenshot/Servicenow.png',fullPage: true})

})