describe('Basic user flow for Website', () => {
  // First, visit the lab 8 website
  beforeAll(async () => {
    await page.goto('https://cse110-f2021.github.io/Lab8_Website');
  });

  // Next, check to make sure that all 20 <product-item> elements have loaded
  it('Initial Home Page - Check for 20 product items', async () => {
    console.log('Checking for 20 product items...');
    // Query select all of the <product-item> elements and return the length of that array
    const numProducts = await page.$$eval('product-item', (prodItems) => {
      return prodItems.length;
    });
     // Expect there that array from earlier to be of length 20, meaning 20 <product-item> elements where found
    expect(numProducts).toBe(20);
  });

  // Check to make sure that all 20 <product-item> elements have data in them
  it('Make sure <product-item> elements are populated', async () => {
    console.log('Checking to make sure <product-item> elements are populated...');
    // Start as true, if any don't have data, swap to false
    let allArePopulated = true;
    let data, plainValue;
    // Query select all of the <product-item> elements
    const prodItems = await page.$$('product-item');
    console.log(`Checking product item 1/${prodItems.length}`);
    for (let i = 0; i < prodItems.length; i++) {
      data = await prodItems[i].getProperty('data');
      plainValue = await data.jsonValue();

      if (plainValue.title.length == 0) { allArePopulated = false; }
      if (plainValue.price.length == 0) { allArePopulated = false; }
      if (plainValue.image.length == 0) { allArePopulated = false; }
    }

    expect(allArePopulated).toBe(true);
  }, 10000);

  // Check to make sure that when you click "Add to Cart" on the first <product-item> that
  // the button swaps to "Remove from Cart"
  it('Clicking the "Add to Cart" button should change button text', async () => {
    console.log('Checking the "Add to Cart" button...');
    const productItem = await page.$('product-item');
    const shadowRoot = await productItem.getProperty('shadowRoot');
    const button = await shadowRoot.$('button');
    await button.click();
    const innerText = await button.getProperty('innerText');
    const buttonTextValue = await innerText.jsonValue();
    expect(buttonTextValue).toBe('Remove from Cart');
  }, 2500);

  // Check to make sure that after clicking "Add to Cart" on every <product-item> that the Cart
  // number in the top right has been correctly updated
  it('Checking number of items in cart on screen', async () => {
    console.log('Checking number of items in cart on screen...');
    const productItems = await page.$$('product-item');
    for (const i of productItems) {
      const shadowRoot = await i.getProperty('shadowRoot');
      const button = await shadowRoot.$('button');
      const innerText = await button.getProperty('innerText');
      const buttonTextValue = await innerText.jsonValue();
      if (buttonTextValue != 'Remove from Cart') {
        await button.click();
      }
    }

    const cartCount = await page.$('#cart-count');
    const cartCountValue = await cartCount.getProperty('innerText');
    const cartCountNumber = await cartCountValue.jsonValue();
    expect(cartCountNumber).toBe('20');
  }, 10000);

  // Check to make sure that after you reload the page it remembers all of the items in your cart
  it('Checking number of items in cart on screen after reload', async () => {
    console.log('Checking number of items in cart on screen after reload...');
    await page.reload();
    const productItems = await page.$$('product-item');
    for (const i of productItems) {
      const shadowRoot = await i.getProperty('shadowRoot');
      const button = await shadowRoot.$('button');
      const innerText = await button.getProperty('innerText');
      const buttonTextValue = await innerText.jsonValue();
      expect(buttonTextValue).toBe('Remove from Cart');
    }

    const cartCount = await page.$('#cart-count');
    const cartCountValue = await cartCount.getProperty('innerText');
    const cartCountNumber = await cartCountValue.jsonValue();
    expect(cartCountNumber).toBe('20');
  }, 10000);

  // Check to make sure that the cart in localStorage is what you expect
  it('Checking the localStorage to make sure cart is correct', async () => {
    console.log('Checking the localStorage to make sure cart is correct...');
    const cart = await page.evaluate(() => localStorage.getItem('cart'));
    expect(cart).toBe('[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20]');
  });

  // Checking to make sure that if you remove all of the items from the cart, the cart
  // number in the top right of the screen is 0
  it('Checking number of items in cart on screen after removing from cart', async () => {
    console.log('Checking number of items in cart on screen after removing from cart...');
    const productItems = await page.$$('product-item');
    for (const i of productItems) {
      const shadowRoot = await i.getProperty('shadowRoot');
      const button = await shadowRoot.$('button');
      const innerText = await button.getProperty('innerText');
      const buttonTextValue = await innerText.jsonValue();
      if (buttonTextValue != 'Add to Cart') {
        await button.click();
      }
    }

    const cartCount = await page.$('#cart-count');
    const cartCountValue = await cartCount.getProperty('innerText');
    const cartCountNumber = await cartCountValue.jsonValue();
    expect(cartCountNumber).toBe('0');
  }, 10000);

  // Checking to make sure that it remembers removing everything from the cart
  // after refreshing the page
  it('Checking number of items in cart on screen after reload', async () => {
    console.log('Checking number of items in cart on screen after reload...');
    await page.reload();
    const productItems = await page.$$('product-item');
    for (const i of productItems) {
      const shadowRoot = await i.getProperty('shadowRoot');
      const button = await shadowRoot.$('button');
      const innerText = await button.getProperty('innerText');
      const buttonTextValue = await innerText.jsonValue();
      expect(buttonTextValue).toBe('Add to Cart');
    }

    const cartCount = await page.$('#cart-count');
    const cartCountValue = await cartCount.getProperty('innerText');
    const cartCountNumber = await cartCountValue.jsonValue();
    expect(cartCountNumber).toBe('0');
  }, 10000);

  // Checking to make sure that localStorage for the cart is as expected when the cart is empty
  it('Checking the localStorage to make sure cart is correct', async () => {
    console.log('Checking the localStorage to make sure cart is correct...');
    const cart = await page.evaluate(() => localStorage.getItem('cart'));
    expect(cart).toBe('[]');
  });
});
