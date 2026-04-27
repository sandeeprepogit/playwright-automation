import { test, expect} from '@playwright/test';

    
    

test.only('Navigate to Event Hub page and book an event',async ({page}) => {
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
    const adminDrpDwn = page.getByText("Admin");
    const navToAdmin = page.locator("a[href='/admin/events']");
    const eventTitle = page.getByPlaceholder("Event title");
    const evenmtTitleDes = page.getByPlaceholder("Describe the event…");
    const selectCatagory = page.locator("select[id='category']");
    const inputCity = page.locator("input[id='city']");
    const venue = page.getByPlaceholder("Venue name & address");
    const date = page.locator("input[id='event-date-&-time']");
    const price = page.getByPlaceholder("0.00");
    const totalSeat = page.locator("input[id='total-seats']");
    const addEventBtn = page.locator("button[id='add-event-btn']");
    const deleteEvent = page.locator("button[id='delete-event-btn']");
    const cnfDelete = page.locator("button[id='confirm-dialog-yes']");
    const navHomeBtn = page.locator("a[id='nav-home']");
    const tckAvaCheck = page.locator("//p[normalize-space()='Available']/following-sibling::p/span");



    const url = "https://eventhub.rahulshettyacademy.com/";
    
    // Step 1[Login]
    // Navigate to URL and login

    await page.goto(url);
    await userName.fill('san8784@gmail.com');
    await password.fill('Sandeep@123');
    await signInBtn.click();
    expect (await browseEvents.isVisible());
   
    // Step 2[Create a new event] 
    // Navigate to admin page
    await adminDrpDwn.click();
    await navToAdmin.first().click();

    // Fill event details
    const  eventTitleText = "AutomatedEvent";
    await eventTitle.fill(eventTitleText);
    await evenmtTitleDes.fill("event is added via Automation");
    await selectCatagory.selectOption('Sports');
    await inputCity.fill("Hyderabad");
    await venue.fill("Automation &Hyerabad,Telangana");
    
    const currentDate = await getCurrentTimeAndDate();
    console.log("currentDate::",currentDate);
    const arr = currentDate.split(" ");
    await date.pressSequentially(arr[0], {delay: 150});
    await date.press('Tab');        
    await date.pressSequentially(arr[1] + arr[2], {delay: 150});

    await price.fill("1000");
    await totalSeat.fill("15");
    await addEventBtn.click();

    // Delete the event
    await adminDrpDwn.click();
    await navToAdmin.first().click();
    await deleteEvent.last().click();
    await cnfDelete.click();
    await navHomeBtn.click();
    expect (await browseEvents.isVisible());

    // Step-3[Find the event which got creted and capture seat]
    await browseEvents.click();
    await eventTitles.last().waitFor();
    const eventTitleTexts = await eventTitles.allTextContents();
    console.log('eventTitleTexts::',eventTitleTexts);
    const index = eventTitleTexts.indexOf(eventTitleText);
    await bookNowBtn.nth(index).click();
    const currentAvalable = await tckAvaCheck.textContent();
    console.log(`Before booking: ${currentAvalable}`);
    const beforeCount = extractAvailableSeats(currentAvalable);

    // Step-5[Fill bokking form]
    await customerName.fill('Sandeep Sharma');
    await customerEmail.fill('san8784@gmail.com');
    await customerPhone.fill('9533365352');
    await increateTicket.click();
    await confirmBooking.click();

    // Step-6[Verify booking confirmation]
    const bookingConfirmationText = await bookingConfirmation.textContent();
    console.log('bookingConfirmationText::',bookingConfirmationText)

    // Step-8[Verify seat reduction]
    const afterBookAvalable = await tckAvaCheck.textContent();
    console.log(`After booking: ${afterBookAvalable}`);
    const afterCount = extractAvailableSeats(afterBookAvalable);

    const seatAvailable = beforeCount - afterCount;
    console.log(`Available seats after: ${afterCount}`);
  
    const isReduced = (beforeCount - afterCount) === 1;
    if (isReduced) {
       console.log(`Seat count reduced from ${beforeCount} to ${afterCount}`);
       return true;
    } else {
       console.error(`Expected ${beforeCount - 1}, but got ${afterCount}`);
       return false;
    }

    // //Navigate to Event tab and check drop downs 
    // await eventTab.click();
    // await select.first().selectOption("Festival");
    // await select.last().selectOption("Hyderabad");
   
  

});

async function extractAvailableSeats(seatText) {
  // Extract the number before the "/"
  const match = seatText.match(/(\d+)\s*\/\s*\d+/);
  return match ? parseInt(match[1]) : null;
}

async function getCurrentTimeAndDate(){
        const now = new Date();
        const year = now.getFullYear();

        now.setMonth(now.getMonth()+1);
        const month = String(now.getMonth() +1).padStart(2,"0");
        const day = String(now.getDate()).padStart(2,"0");

        let hours = now.getHours();
        const min = String(now.getMinutes()).padStart(2, "0");

        const amPm = hours >= 12 ? 'PM' : 'AM';
        hours = hours % 12 || 12;
        hours = String(hours).padStart(2, "0");
        
        return `${month}-${day}-${year} ${hours}:${min} ${amPm}`;
}


test('Navigate to child window',async ({browser})=>
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
    console.log("pageName:",pageName);

    // Navigate back to parent window
    await parentPage.bringToFront(); 
     



});