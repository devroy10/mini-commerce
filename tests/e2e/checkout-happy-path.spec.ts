import { test, expect } from '@playwright/test';
import { siteConfig } from '@/config/site.config';

// Mock user data for checkout
const user = {
  email: 'testuser@example.com',
  phone: '+1 (555) 123-4567',
  firstName: 'John',
  lastName: 'Doe',
  address: '123 Main Street',
  apartment: 'Apt 4B',
  city: 'Queens',
  state: 'New York',
  zipCode: '10001',
  cardNumber: '4242 4242 4242 4242',
  expiryDate: '12/30',
  cvv: '123',
  cardName: 'John Doe',
};

test('guest user can complete checkout happy path', async ({ page }) => {
  // 1. Visit homepage
  await page.goto('/');
  await expect(page).toHaveTitle(`${siteConfig.title}`);

  // 2. Navigate to products page
  await page
    .getByRole('link', { name: /products/i })
    .first()
    .click();
  await expect(page).toHaveURL(/.*products/);

  // 3. Click the first product card
  const firstProduct = page.locator('h3').first();
  await firstProduct.click();
  await expect(page).toHaveURL(/.*products\//);

  // 4. Add to cart (button appears on hover)
  await page.hover('img');
  await page.getByRole('button', { name: /add to cart/i }).click();

  // 5. Go to cart (header nav or direct URL)
  await page.goto('/cart');
  await expect(page).toHaveURL(/.*cart/);
  await expect(page.getByText(user.firstName, { exact: false })).not.toBeVisible(); // Not yet in checkout

  // 6. Proceed to checkout
  await page.getByRole('button', { name: /checkout now/i }).click();
  await expect(page).toHaveURL(/.*checkout/);

  // 7. Fill out checkout form
  await page.getByLabel('Email Address *').fill(user.email);
  await page.getByLabel('Phone Number *').fill(user.phone);
  await page.getByLabel('First Name *').fill(user.firstName);
  await page.getByLabel('Last Name *').fill(user.lastName);
  await page.getByLabel('Street Address *').fill(user.address);
  await page.getByLabel('Apartment, suite, etc. (optional)').fill(user.apartment);
  await page.getByLabel('City *').fill(user.city);
  // await page.getByRole('combobox').selectOption(user.state);
  // await page.getByPlaceholder('Select state').click();
  // await page.getByRole('button', { name: 'Select state' }).click();

  await page.getByRole('combobox').first().click();
  // await page.getByRole('combobox', { name: 'State *' }).click();

  // Step 1: Locate the label and get the associated combobox button
  // const label = page.getByLabel('State *');
  // const trigger = label.locator('..').locator('button[role="combobox"]');

  // Step 2: Open the dropdown
  // await trigger.click();

  // Step 3: Wait for the dropdown to render (should now be in DOM)
  await page.getByRole('option', { name: `${user.state}` }).click();

  // Step 4 (optional): Assert the selection
  // await expect(trigger).toHaveText('California');

  await page.getByLabel('ZIP Code *').fill(user.zipCode);
  // Payment (card)
  await page.getByLabel('Card Number *').fill(user.cardNumber);
  await page.getByLabel('Expiry Date *').fill(user.expiryDate);
  await page.getByLabel('CVV *').fill(user.cvv);
  await page.getByLabel('Name on Card *').fill(user.cardName);

  // 8. Submit order
  await page.getByRole('button', { name: /place order/i }).click();

  // 9. Verify success page
  await expect(page).toHaveURL(/.*checkout\/success/);
  await expect(page.getByRole('heading', { name: /order confirmed/i })).toBeVisible();
  await expect(
    page.getByText('Thank you for your purchase. Your order has been successfully placed.', {
      exact: true,
    }),
  ).toBeVisible();
  // Verify order details (example, adjust based on actual elements)
  await expect(page.getByText(`Order ID:`)).toBeVisible(); // Assuming order ID is displayed
  await expect(page.getByText(`${user.email}`)).toBeVisible(); // Assuming email is displayed
  // You can add more assertions to verify other order details as needed,
  // such as shipping address, items purchased, and total amount.
});
