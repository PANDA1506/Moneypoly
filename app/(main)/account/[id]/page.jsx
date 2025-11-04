import { Suspense } from "react";
import { getAccountWithTransactions } from "@/actions/account";
import { BarLoader } from "react-spinners";
import { TransactionTable } from "../_components/transaction-table";
import { notFound } from "next/navigation";
import { AccountChart } from "../_components/account-chart";

export default async function AccountPage({ params }) {
  const accountData = await getAccountWithTransactions(params.id);

  if (!accountData) {
    notFound();
  }

  const { transactions, ...account } = accountData;

  return (
    <section className="relative min-h-screen bg-gradient-to-r from-gray-900 via-black to-gray-800 text-white overflow-hidden px-6 py-10">
      {/* Subtle Background Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff0d_1px,transparent_1px),linear-gradient(to_bottom,#ffffff0d_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none"></div>

      <div className="relative z-10 container mx-auto space-y-12">
        {/* Header Section */}
        <div className="flex flex-col lg:flex-row gap-8 items-start lg:items-end justify-between">
          <div>
            <h1 className="text-5xl sm:text-6xl font-extrabold tracking-tight capitalize">
              {account.name}
            </h1>
            <p className="text-gray-400 mt-2 text-lg">
              {account.type.charAt(0) + account.type.slice(1).toLowerCase()} Account
            </p>
          </div>

          <div className="text-left lg:text-right">
            <div className="text-3xl sm:text-4xl font-bold text-indigo-400">
              Rs.{parseFloat(account.balance).toFixed(2)}
            </div>
            <p className="text-sm text-gray-400">
              {account._count.transactions} Transactions
            </p>
          </div>
        </div>

        {/* Chart Section */}
        <Suspense
          fallback={<BarLoader className="mt-4" width={"100%"} color="#9333ea" />}
        >
          <div className="bg-gray-900/40 backdrop-blur-md border border-gray-700 rounded-2xl p-6 shadow-lg">
            <AccountChart transactions={transactions} />
          </div>
        </Suspense>

        {/* Transactions Table */}
        <Suspense
          fallback={<BarLoader className="mt-4" width={"100%"} color="#9333ea" />}
        >
          <div className="bg-gray-900/40 backdrop-blur-md border border-gray-700 rounded-2xl p-6 shadow-lg">
            <TransactionTable transactions={transactions} />
          </div>
        </Suspense>
      </div>
    </section>
  );
}
