import { test, expect } from "@playwright/test";

const UI_URL = "http://localhost:5173/";

test("should allow the user to register", async ({ page }) => {
  const testEmail = `test_register${
    Math.floor(Math.random() * 9000) + 1000
  }@test.com`;
  await page.goto(UI_URL);

  // Test the sign in nav button, and create an account link in the sign in page
  await page.getByRole("link", { name: "Sign in" }).click();
  await page.getByRole("link", { name: "Create an account" }).click();

  // Test the Create an Account heading is visible
  await expect(
    page.getByRole("heading", { name: "Create an Account" })
  ).toBeVisible();

  // Test first name, last name, email, password, confirm password input
  await page.locator("[name=firstName]").fill("test_john");
  await page.locator("[name=lastName]").fill("test_doe");
  await page.locator("[name=email]").fill(testEmail);
  await page.locator("[name=password]").fill("password123");
  await page.locator("[name=confirmPassword]").fill("password123");

  // Test the create account form button
  await page.getByRole("button", { name: "Create Account" }).click();

  // Test the successful registration toast message
  await expect(page.getByText("Registration Success!")).toBeVisible();
});

test("should allow the user to sign in", async ({ page }) => {
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

  // Test the homepage nav links, and button after successful login
  await expect(page.getByRole("link", { name: "My Bookings" })).toBeVisible();
  await expect(page.getByRole("link", { name: "My Hotels" })).toBeVisible();

  await expect(page.getByRole("button", { name: "Signout" })).toBeVisible();
});
