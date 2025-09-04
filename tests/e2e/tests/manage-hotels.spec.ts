import { test, expect } from "@playwright/test";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const UI_URL = "http://localhost:5173/";

// Run the sign in test before each test
test.beforeEach(async ({ page }) => {
  await page.goto(UI_URL);

  // Test the register in nav button
  await page.getByRole("link", { name: "Sign In" }).click();
  // Test the Sign in heading is visible
  await expect(page.getByRole("heading", { name: "Sign In" })).toBeVisible();

  // Test email, password input
  await page.locator("[name=email]").fill("1@1.com");
  await page.locator("[name=password]").fill("password123");

  // Test the sign in form button
  await page.getByRole("button", { name: "Login" }).click();

  // Test the successful sign in toast message
  await expect(page.getByText("Login Success!")).toBeVisible();
});

//
test("should allow the user to add a hotel", async ({ page }) => {
  await page.goto(`${UI_URL}add-hotel`);

  await page.locator('[name="name"]').fill("Test Hotel");
  await page.locator('[name="city"]').fill("Riyadh");
  await page.locator('[name="country"]').fill("KSA");
  await page.locator('[name="description"]').fill("A dummy description here.");
  await page.locator('[name="pricePerNight"]').fill("100");

  await page.selectOption('select[name="starRating"]', "3");

  await page.getByText("Budget").click();

  await page.getByLabel("Free Wifi").check();
  await page.getByLabel("Parking").check();

  await page.locator('[name="adultCount"]').fill("2");
  await page.locator('[name="childCount"]').fill("5");

  await page.setInputFiles('[name="imageFiles"]', [
    path.join(__dirname, "files", "1.jpeg"),
    path.join(__dirname, "files", "2.jpeg"),
    path.join(__dirname, "files", "3.jpeg"),
  ]);

  await page.getByRole("button", { name: "Save" }).click();
  await expect(page.getByText("Hotel Saved")).toBeVisible();
});

test("should display hotels", async ({ page }) => {
  await page.goto(`${UI_URL}my-hotels`);

  await expect(page.getByText("Dublin Getaways")).toBeVisible();
  await expect(page.getByText("Lorem ipsum dolor sit amet")).toBeVisible();
  await expect(page.getByText("Dublin, Ireland")).toBeVisible();
  await expect(page.getByText("All Inclusive")).toBeVisible();
  await expect(page.getByText("£119 per night")).toBeVisible();
  await expect(page.getByText("2 adults, 3 children")).toBeVisible();
  await expect(page.getByText("2 Star Rating")).toBeVisible();

  await expect(
    page.getByRole("link", { name: "View Details" }).first()
  ).toBeVisible();
  await expect(page.getByRole("link", { name: "Add Hotel" })).toBeVisible();
});
