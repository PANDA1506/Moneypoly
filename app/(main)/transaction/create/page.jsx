import { getUserAccounts } from "@/actions/dashboard";
import { defaultCategories } from "@/data/categories";
import { AddTransactionForm } from "../_components/transaction-form";
import { getTransaction } from "@/actions/transaction";

export default async function AddTransactionPage({ searchParams }) {
  const accounts = await getUserAccounts();
  const editId = searchParams?.edit;

  let initialData = null;
  if (editId) {
    const transaction = await getTransaction(editId);
    initialData = transaction;
  }

  return (
    <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-r from-gray-900 via-black to-gray-800 text-white px-6 py-16">
      {/* Background subtle grid like Hero */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff0d_1px,transparent_1px),linear-gradient(to_bottom,#ffffff0d_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none"></div>

      <div className="max-w-4xl w-full relative z-10 text-center space-y-8">
        {/* Heading */}
        <h1 className="text-5xl md:text-6xl font-extrabold leading-tight">
          {editId ? (
            <>
              Edit <span className="text-indigo-400">Transaction</span>
            </>
          ) : (
            <>
              Add <span className="text-indigo-400">Transaction</span>
            </>
          )}
        </h1>

        {/* Subtitle */}
        <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto">
          {editId
            ? "Update your transaction details and keep your records up to date."
            : "Quickly add a new transaction and stay in control of your finances."}
        </p>

        {/* Form Container */}
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl shadow-2xl p-8 md:p-10">
          <AddTransactionForm
            accounts={accounts}
            categories={defaultCategories}
            editMode={!!editId}
            initialData={initialData}
          />
        </div>
      </div>
    </section>
  );
}
