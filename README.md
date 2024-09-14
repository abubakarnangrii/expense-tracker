

# Expense Tracker

This is an Expense Tracker application built with [Next.js](https://nextjs.org/). The app allows users to manage their budgets, add expenses, and visualize their spending through charts.

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

## Features

### Manage Budgets
- **Add Budget**: Create a new budget with a specific amount.
- **Edit Budget**: Update the details of an existing budget.
- **Delete Budget**: Remove a budget from the system.

### Manage Expenses
- **Add Expense**: Record an expense under a specific budget.
- **Edit Expense**: Modify the details of an existing expense.
- **Delete Expense**: Remove an expense from a budget.

### Dashboard
- **View Budgets**: See a list of all budgets with their remaining amounts.
- **View Expenses**: See a list of all expenses categorized by budget.
- **Graph Visualization**: Display a graphical representation of your spending across different budgets.

## How It Works

1. **Create a Budget**:
   - Navigate to the "Budgets" section and click on "Add Budget."
   - Enter the budget details such as name and amount, then save.

2. **Add Expenses**:
   - Go to the "Expenses" section and click on "Add Expense."
   - Choose the budget, enter the expense details (amount, description), and save.

3. **Edit or Delete**:
   - To edit or delete a budget or expense, select the item from the list and choose the appropriate action.

4. **View Dashboard**:
   - The dashboard displays an overview of all budgets and their expenses.
   - A graph visualizes the spending distribution across different budgets.

## Learn More

To learn more about Next.js and its features, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - Learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - An interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

