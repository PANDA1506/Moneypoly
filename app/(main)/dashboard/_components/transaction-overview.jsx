"use client";

import { useState } from "react";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  Legend,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";
import { format } from "date-fns";
import { ArrowUpRight, ArrowDownRight } from "lucide-react";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

const COLORS = [
  "#FF6B6B",
  "#4ECDC4",
  "#45B7D1",
  "#96CEB4",
  "#FFEEAD",
  "#D4A5A5",
  "#9FA8DA",
];

export function DashboardOverview({ accounts, transactions }) {
  const [selectedAccountId, setSelectedAccountId] = useState(
    accounts.find((a) => a.isDefault)?.id || accounts[0]?.id
  );

  // Filter transactions for selected account
  const accountTransactions = transactions.filter(
    (t) => t.accountId === selectedAccountId
  );

  // Get recent transactions (last 5)
  const recentTransactions = accountTransactions
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, 5);

  // Calculate expense breakdown for current month
  const currentDate = new Date();
  const currentMonthExpenses = accountTransactions.filter((t) => {
    const transactionDate = new Date(t.date);
    return (
      t.type === "EXPENSE" &&
      transactionDate.getMonth() === currentDate.getMonth() &&
      transactionDate.getFullYear() === currentDate.getFullYear()
    );
  });

  // Group expenses by category
  const expensesByCategory = currentMonthExpenses.reduce((acc, transaction) => {
    const category = transaction.category;
    if (!acc[category]) {
      acc[category] = 0;
    }
    acc[category] += transaction.amount;
    return acc;
  }, {});

  // Format data for pie chart
  const pieChartData = Object.entries(expensesByCategory).map(
    ([category, amount]) => ({
      name: category,
      value: amount,
    })
  );

  // --- New: Accounts comparison chart ---
  // --- Accounts comparison data (Spent vs Balance) ---
  const accountsComparisonData = accounts.map((account) => {
    // total spent for this account
    const spent = transactions
      .filter((t) => t.accountId === account.id && t.type === "EXPENSE")
      .reduce((sum, t) => sum + t.amount, 0);

    return {
      name: account.name,
      spent,
      balance: parseFloat(account.balance) || 0, // use account.balance directly
    };
  });


  return (
    <div className="grid gap-6">
      {/* Accounts Comparison Card */}
      <Card className="shadow-md rounded-2xl border">
        <CardHeader>
          <CardTitle className="text-lg font-semibold">
            Accounts Comparison (Spent vs Balance)
          </CardTitle>
        </CardHeader>
        <CardContent className="p-4">
          {accountsComparisonData.length === 0 ? (
            <p className="text-center text-muted-foreground py-6">
              No account data available
            </p>
          ) : (
            <div className="h-[320px] w-full">
              <ResponsiveContainer width="100%" height={300}>
                <BarChart
                  data={accountsComparisonData}
                  margin={{ top: 20, right: 40, left: 60, bottom: 20 }} // <-- increase left margin
                >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip
                  formatter={(value) => `₹${value.toFixed(2)}`}
                  contentStyle={{
                    backgroundColor: "hsl(var(--popover))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "var(--radius)",
                  }}
                />
              <Legend />
              <Bar dataKey="spent" stackId="a" fill="#FF6B6B" name="Spent" />
              <Bar dataKey="balance" stackId="a" fill="#4ECDC4" name="Balance Left" />
            </BarChart>
          </ResponsiveContainer>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Old Code: Recent Transactions + Expense Breakdown */}
      <div className="grid gap-6 md:grid-cols-2">
        {/* Recent Transactions Card */}
        <Card className="shadow-md rounded-2xl border">
          <CardHeader className="flex flex-row items-center justify-between pb-4">
            <CardTitle className="text-lg font-semibold">
              Recent Transactions
            </CardTitle>
            <Select value={selectedAccountId} onValueChange={setSelectedAccountId}>
              <SelectTrigger className="w-[150px] text-sm">
                <SelectValue placeholder="Select account" />
              </SelectTrigger>
              <SelectContent>
                {accounts.map((account) => (
                  <SelectItem key={account.id} value={account.id}>
                    {account.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </CardHeader>

          <CardContent className="space-y-3">
            {recentTransactions.length === 0 ? (
              <p className="text-center text-muted-foreground py-6">
                No recent transactions
              </p>
            ) : (
              recentTransactions.map((transaction) => (
                <div
                  key={transaction.id}
                  className="flex items-center justify-between p-2 rounded-lg hover:bg-muted/40 transition"
                >
                  <div className="space-y-1">
                    <p className="text-sm font-medium">
                      {transaction.description || "Untitled Transaction"}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {format(new Date(transaction.date), "PP")}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span
                      className={cn(
                        "px-2 py-1 text-xs rounded-full font-medium",
                        transaction.type === "EXPENSE"
                          ? "bg-red-100 text-red-600"
                          : "bg-green-100 text-green-600"
                      )}
                    >
                      {transaction.type}
                    </span>
                    <p
                      className={cn(
                        "font-semibold",
                        transaction.type === "EXPENSE"
                          ? "text-red-500"
                          : "text-green-500"
                      )}
                    >
                      Rs.{transaction.amount.toFixed(2)}
                    </p>
                  </div>
                </div>
              ))
            )}
          </CardContent>
        </Card>

        {/* Expense Breakdown Card */}
        <Card className="shadow-md rounded-2xl border">
          <CardHeader>
            <CardTitle className="text-lg font-semibold">
              Monthly Expense Breakdown
            </CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col items-center justify-center p-4">
            {pieChartData.length === 0 ? (
              <p className="text-center text-muted-foreground py-6">
                No expenses this month
              </p>
            ) : (
              <>
                <div className="h-[280px] w-full">
                  <ResponsiveContainer>
                    <PieChart>
                      <Pie
                        data={pieChartData}
                        cx="50%"
                        cy="50%"
                        innerRadius={50}
                        outerRadius={90}
                        dataKey="value"
                        labelLine={false}
                        label={({ name, percent }) =>
                          `${name} (${(percent * 100).toFixed(0)}%)`
                        }
                      >
                        {pieChartData.map((entry, index) => (
                          <Cell
                            key={`cell-${index}`}
                            fill={COLORS[index % COLORS.length]}
                          />
                        ))}
                      </Pie>
                      <Tooltip
                        formatter={(value) => `Rs. ${value.toFixed(2)}`}
                        contentStyle={{
                          backgroundColor: "hsl(var(--popover))",
                          border: "1px solid hsl(var(--border))",
                          borderRadius: "var(--radius)",
                        }}
                      />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <p className="mt-3 text-sm text-muted-foreground">
                  Total Spent:{" "}
                  <span className="font-semibold text-foreground">
                    Rs.
                    {pieChartData
                      .reduce((sum, item) => sum + item.value, 0)
                      .toFixed(2)}
                  </span>
                </p>
              </>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

