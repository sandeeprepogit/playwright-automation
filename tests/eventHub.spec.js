import { test, expect} from '@playwright/test';

    
    

test('Navigate to Event Hub page and book an event',async ({page}) => {
    const userName = page.locator("//input[@id='email']");
    const password = page.locator("//input[@id='password']");
    const signInBtn = page.locator("//button[@id='login-btn']");
    const browseEvents = page.locator("//span[contains(text(),'Browse Events')]");
    const eventTitles = page.locator("//article[@id='event-card']//h3");
    const bookNowBtn = page.locator("//a[text()='Book Now']");
    const customerName = page.locator("//input[@id='customerName']");
    const customerEmail = page.locator("//input[@id='customer-email']");
    const customerPhone = page.locator("//input[@id='phone']");
    const increateTicket = page.locator("//button[text()='+']");
    const confirmBooking = page.locator("//button[text()='Confirm Booking']");
    const bookingConfirmation = page.locator("//h3[contains(text(),'Booking Confirmed')]");
    const eventTab  = page.locator("//a[@id='nav-events']");
    const select = page.locator("//select");
    const linkForNavigation = page.locator("//a[contains(text(),'Selenium WebDriver with Java')]");

    const url = "https://eventhub.rahulshettyacademy.com/";
    
    // Navigate to URL and login
   
    await browseEvents.click();
    await eventTitles.last().waitFor();
    const eventTitle = await eventTitles.allTextContents();

    console.log('eventTitle::',eventTitle);

    //click on Book Now for the event maches the text "Dilli Diwali Mela"
    const index = eventTitle.indexOf('Dilli Diwali Mela');
    await bookNowBtn.nth(index).click();

    // Fill the form and click on confirm booking
    await customerName.fill('Sandeep Sharma');
    await customerEmail.fill('san8784@gmail.com');
    await customerPhone.fill('9533365352');
    await increateTicket.click();
    await confirmBooking.click();

    const bookingConfirmationText = await bookingConfirmation.textContent();
    console.log('bookingConfirmationText::',bookingConfirmationText)

    // Navigate to Event tab and check drop downs 
    await eventTab.click();
    await select.first().selectOption("Festival");
    await select.last().selectOption("Hyderabad");
    await page.pause();
  







});




test.only('Navigate to child window',async ({browser})=>
{
    const context= await browser.newContext();
    const page = await context.newPage();

    const userName = page.locator("//input[@id='email']");
    const password = page.locator("//input[@id='password']");
    const signInBtn = page.locator("//button[@id='login-btn']");
    const linkForNavigation = page.locator("//a[contains(text(),'Selenium WebDriver with Java')]");

    const url = "https://eventhub.rahulshettyacademy.com/";



    await page.goto(url);
    await userName.fill('san8784@gmail.com');
    await password.fill('Sandeep@123');
    await signInBtn.click();
    

    // store child window context to newPage variale
    const [newPage] = await Promise.all([
        context.waitForEvent('page'),
        await linkForNavigation.click(),
    ])


    const newPageVerification = newPage.locator("//span[contains(text(),'Learn & Shine')]");
    const pageName = await newPageVerification.textContent();
    console.log("pageName:",pageName)
    ;



});