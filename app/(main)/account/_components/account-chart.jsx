"use client";

import { useState, useMemo } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { format, subDays, startOfDay, endOfDay } from "date-fns";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const DATE_RANGES = {
  "7D": { label: "Last 7 Days", days: 7 },
  "1M": { label: "Last Month", days: 30 },
  "3M": { label: "Last 3 Months", days: 90 },
  "6M": { label: "Last 6 Months", days: 180 },
  ALL: { label: "All Time", days: null },
};

export function AccountChart({ transactions }) {
  const [dateRange, setDateRange] = useState("1M");

  const filteredData = useMemo(() => {
    const range = DATE_RANGES[dateRange];
    const now = new Date();
    const startDate = range.days
      ? startOfDay(subDays(now, range.days))
      : startOfDay(new Date(0));

    const filtered = transactions.filter(
      (t) => new Date(t.date) >= startDate && new Date(t.date) <= endOfDay(now)
    );

    const grouped = filtered.reduce((acc, transaction) => {
      const date = format(new Date(transaction.date), "MMM dd");
      if (!acc[date]) {
        acc[date] = { date, income: 0, expense: 0 };
      }
      if (transaction.type === "INCOME") {
        acc[date].income += transaction.amount;
      } else {
        acc[date].expense += transaction.amount;
      }
      return acc;
    }, {});

    return Object.values(grouped).sort(
      (a, b) => new Date(a.date) - new Date(b.date)
    );
  }, [transactions, dateRange]);

  const totals = useMemo(() => {
    return filteredData.reduce(
      (acc, day) => ({
        income: acc.income + day.income,
        expense: acc.expense + day.expense,
      }),
      { income: 0, expense: 0 }
    );
  }, [filteredData]);

  return (
    <Card className="bg-gradient-to-br from-gray-900 via-black to-gray-800 border border-gray-700 shadow-lg hover:shadow-indigo-500/30 transition-all duration-500 rounded-2xl">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-6">
        <CardTitle className="text-xl font-extrabold text-white tracking-tight">
          Transaction <span className="text-indigo-400">Overview</span>
        </CardTitle>
        <Select defaultValue={dateRange} onValueChange={setDateRange}>
          <SelectTrigger className="w-[150px] bg-gray-800 text-white border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 transition-all">
            <SelectValue placeholder="Select range" />
          </SelectTrigger>
          <SelectContent className="bg-gray-900 text-white border border-gray-700 rounded-lg">
            {Object.entries(DATE_RANGES).map(([key, { label }]) => (
              <SelectItem
                key={key}
                value={key}
                className="hover:bg-indigo-600 cursor-pointer rounded-md"
              >
                {label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent>
        {/* Totals Section */}
        <div className="flex flex-wrap justify-around mb-6 text-sm gap-6">
          <div className="text-center">
            <p className="text-gray-400">Total Income</p>
            <p className="text-xl font-bold text-green-400">
              Rs.{totals.income.toFixed(2)}
            </p>
          </div>
          <div className="text-center">
            <p className="text-gray-400">Total Expenses</p>
            <p className="text-xl font-bold text-red-400">
              Rs.{totals.expense.toFixed(2)}
            </p>
          </div>
          <div className="text-center">
            <p className="text-gray-400">Net</p>
            <p
              className={`text-xl font-bold ${
                totals.income - totals.expense >= 0
                  ? "text-green-400"
                  : "text-red-400"
              }`}
            >
              Rs.{(totals.income - totals.expense).toFixed(2)}
            </p>
          </div>
        </div>

        {/* Chart Section */}
        <div className="h-[320px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={filteredData}
              margin={{ top: 20, right: 20, left: 0, bottom: 10 }}
            >
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#444" />
              <XAxis
                dataKey="date"
                fontSize={12}
                tickLine={false}
                axisLine={false}
                stroke="#aaa"
              />
              <YAxis
                fontSize={12}
                tickLine={false}
                axisLine={false}
                stroke="#aaa"
                tickFormatter={(value) => `Rs.${value}`}
              />
              <Tooltip
                formatter={(value) => [`Rs.${value}`, undefined]}
                contentStyle={{
                  backgroundColor: "#1f2937",
                  border: "1px solid #374151",
                  borderRadius: "0.5rem",
                  color: "#fff",
                }}
              />
              <Legend wrapperStyle={{ color: "#fff" }} />
              <Bar
                dataKey="income"
                name="Income"
                fill="#22c55e"
                radius={[6, 6, 0, 0]}
              />
              <Bar
                dataKey="expense"
                name="Expense"
                fill="#ef4444"
                radius={[6, 6, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
