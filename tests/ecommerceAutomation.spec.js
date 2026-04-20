import { test, expect} from '@playwright/test';

    
    

test('Navigate to RahulSetty Academy page',async ({page}) => {

    const userName = page.locator("input[id='userEmail']");
    const password = page.locator("input[id='userPassword']");
    const signInBtn = page.locator("input[id='login']");
    const addToCartBtn = page.locator("//button[contains(text(),' Add To Cart')]");
    const navTocart = page.locator("button[routerlink='/dashboard/cart']");
    const myCartDash = page.locator("//h1[contains(text(),'My Cart')]");
    const buyNowBtn = page.locator("//button[contains(text(),'Buy Now')]");
    const checkoutBtn = page.locator("//button[contains(text(),'Checkout')]");
    const cvvCode = page.locator("//div[contains(text(),'CVV Code ')]/following-sibling::input");
    const nameOnCard = page.locator("//div[contains(text(),'Name on Card ')]/following-sibling::input");
    const country = page.locator("//input[@placeholder='Select Country']");
    const indiaLink = page.locator("//span[contains(text(),' India')]");
    const placeOrder = page.locator(".action__submit");
    const confirmationText = page.locator(".hero-primary");
    const orderID = page.locator("tr[class='ng-star-inserted'] label");
    const dropDownSelectCountry = page.locator(".ta-results");

    // const eventTab  = page.locator("//a[@id='nav-events']");
    // const select = page.locator("//select");
    // const linkForNavigation = page.locator("//a[contains(text(),'Selenium WebDriver with Java')]");

    
    const thankYouText = " Thankyou for the order. ";
    // Navigate to URL and login
    const url = "https://rahulshettyacademy.com/client/";
    await page.goto(url);
    await userName.fill('san8784@gmail.com');
    await password.fill('Sandeep@123');
    await signInBtn.click();

    await addToCartBtn.first().click();
    await navTocart.click();
    const myCartText = await myCartDash.textContent();
    expect (myCartText.includes('My Cart')).toBeTruthy();

    await checkoutBtn.click();

    await cvvCode.fill("123");
    await nameOnCard.fill("Sandeep");
    await country.pressSequentially("ind", {delay: 150})
    await dropDownSelectCountry.waitFor();
    const optionCount = await dropDownSelectCountry.locator("button").count();
    for(let i = 0; i< optionCount; i++){
        const text = await dropDownSelectCountry.locator("button").nth(i).textContent();
        if(text == " India"){
            await dropDownSelectCountry.locator("button").nth(i).click();
            break;
        }

    }

    await placeOrder.click();

    const confirmOrder = await confirmationText.textContent();
    await expect (confirmOrder.includes(thankYouText)).toBeTruthy();

    const orderIDText = await orderID.textContent();
    console.log('orderIDText::',orderIDText)

    // // Navigate to Event tab and check drop downs 
    // await eventTab.click();
    // await select.first().selectOption("Festival");
    // await select.last().selectOption("Hyderabad");
    // await page.pause();
  

});




// test.only('Navigate to child window',async ({browser})=>
// {
//     const context= await browser.newContext();
//     const page = await context.newPage();

//     const userName = page.locator("//input[@id='email']");
//     const password = page.locator("//input[@id='password']");
//     const signInBtn = page.locator("//button[@id='login-btn']");
//     const linkForNavigation = page.locator("//a[contains(text(),'Selenium WebDriver with Java')]");

//     const url = "https://eventhub.rahulshettyacademy.com/";



//     await page.goto(url);
//     await userName.fill('san8784@gmail.com');
//     await password.fill('Sandeep@123');
//     await signInBtn.click();
    

//     // store child window context to newPage variale
//     const [newPage] = await Promise.all([
//         context.waitForEvent('page'),
//         await linkForNavigation.click(),
//     ])
    
//     const newPageVerification = newPage.locator("//span[contains(text(),'Learn & Shine')]");
//     const pageName = await newPageVerification.textContent();
//     console.log("pageName:",pageName);

//     // Navigate back to parent window
//     await parentPage.bringToFront(); 
     



// });