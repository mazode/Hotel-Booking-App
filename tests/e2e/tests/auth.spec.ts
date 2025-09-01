import { test, expect } from "@playwright/test";

const UI_URL = "http://localhost:5173/";

test("should allow the user to sign in", async ({ page }) => {
  await page.goto(UI_URL);

  // Test the sign in nav button
  await page.getByRole("link", { name: "Sign In" }).click();

  await expect(page.getByRole("heading", { name: "Sign In" })).toBeVisible();

  // Test email, password input
  await page.locator("[name=email]").fill("1@1.com");
  await page.locator("[name=password]").fill("password123");

  // Test the sign in form button
  await page.getByRole("button", { name: "Login" }).click();

  // Test the successful sign in toast message
  await expect(page.getByText("Login Success!")).toBeVisible();

  // Test the homepage nav links, and button after successful login
  await expect(page.getByRole("link", { name: "My Bookings" })).toBeVisible();
  await expect(page.getByRole("link", { name: "My Hotels" })).toBeVisible();

  await expect(page.getByRole("button", { name: "Signout" })).toBeVisible();
});
