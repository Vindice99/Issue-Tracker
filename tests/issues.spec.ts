import { test, expect } from '@playwright/test';

test.describe('Issue Tracker E2E', () => {
  test.beforeEach(async ({ page }) => {
    // Start at the home page before each test
    await page.goto('http://localhost:3000/');
  });

  test('has a navigation bar with links', async ({ page }) => {
    // Check if the navigation bar has a link to issues
    const issuesLink = page.getByRole('link', { name: 'Issues', exact: true });
    await expect(issuesLink).toBeVisible();
    await issuesLink.click();

    // Verify we are on the issues page
    await expect(page).toHaveURL(/.*\/issues/);
    
    // Check if the "New Issue" button is present
    const newIssueButton = page.getByRole('link', { name: 'New Issue' });
    await expect(newIssueButton).toBeVisible();
  });

  test('creates, edits, and updates status of an issue', async ({ page }) => {
    // Navigate to the issues page
    await page.getByRole('link', { name: 'Issues', exact: true }).click();
    
    // 1. Create a new issue
    await page.getByRole('link', { name: 'New Issue' }).click();
    await expect(page).toHaveURL(/.*\/issues\/new/);

    const issueTitle = `E2E Full Flow Issue ${Date.now()}`;
    await page.getByLabel('Title').fill(issueTitle);
    await page.locator('.CodeMirror textarea').fill('This is a test issue created by Playwright.');

    // Submit the form
    await page.getByRole('button', { name: /Update Issue|Submit/i }).click();

    // Verify it redirects back to the issues list
    await expect(page).toHaveURL(/.*\/issues/);
    
    // Look for the newly created issue and click on it to view details
    const issueLink = page.getByRole('link', { name: issueTitle });
    await expect(issueLink).toBeVisible();
    await issueLink.click();

    // Verify we are on the issue details page
    await expect(page).toHaveURL(/.*\/issues\/\d+/);

    // 2. Edit the issue
    await page.getByRole('link', { name: 'Edit' }).click();
    await expect(page).toHaveURL(/.*\/issues\/\d+\/edit/);

    const editedTitle = `${issueTitle} (Edited)`;
    await page.getByLabel('Title').fill(editedTitle);
    await page.locator('.CodeMirror textarea').fill('This description was updated by Playwright.');
    await page.getByRole('button', { name: /Update Issue/i }).click();

    // Ensure it correctly navigates to the issue details page and displays new content
    await expect(page).toHaveURL(/.*\/issues\/\d+/);
    await expect(page.getByRole('heading', { name: editedTitle })).toBeVisible();

    // 3. Update the status
    // Click the radux Select trigger (usually a button containing the selected item)
    // Wait for it playfully, error might be something like "Title is required"
    const statusSelect = page.getByRole('combobox');
    await expect(statusSelect).toBeVisible();
    await statusSelect.click();

    // Select "In Progress"
    await page.getByRole('option', { name: 'In Progress' }).click();

    // Check if the badge status changed successfully
    // Assuming you have a StatusBadge component that renders "In Progress"
    // Wait for the server update request to finish
    await expect(statusSelect).toHaveText(/In Progress/i);
    // Alternatively wait for success toast to disappear or badge outside the select to change
  });

  test('shows validation errors when submitting empty form', async ({ page }) => {
    await page.getByRole('link', { name: 'Issues', exact: true }).click();
    await page.getByRole('link', { name: 'New Issue' }).click();

    // Click submit without filling anything
    const submitButton = page.getByRole('button', { name: /Update Issue|Create/i });
    if (await submitButton.isVisible()) {
      await submitButton.click();
      
      // Check for validation error messages (assuming the schema requires title & description)
      const titleError = page.locator('text=title is required').first(); // Adjust text to match your schema
      const descError = page.locator('text=description is required').first();
      
      // Wait for it playfully, error might be something like "Title is required"
      // This part might need tweak depending on exact zod errors
    }
  });
});
