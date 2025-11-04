import { getUserAccounts } from "@/actions/dashboard";
import { getDashboardData } from "@/actions/dashboard";
import { getCurrentBudget } from "@/actions/budget";
import { AccountCard } from "./_components/account-card";
import { CreateAccountDrawer } from "@/components/create-account-drawer";
import { BudgetProgress } from "./_components/budget-progress";
import { Card, CardContent } from "@/components/ui/card";
import { Plus } from "lucide-react";
import { DashboardOverview } from "./_components/transaction-overview";

export default async function DashboardPage() {
  // Server-side data fetch (allowed here because this is a Server Component)
  const [accounts = [], transactions = []] = await Promise.all([
    getUserAccounts(),
    getDashboardData(),
  ]);

  const defaultAccount = accounts?.find((account) => account.isDefault);

  // Get budget for default account (also server-side)
  let budgetData = null;
  if (defaultAccount) {
    budgetData = await getCurrentBudget(defaultAccount.id);
  }

  return (
    <div className="space-y-12">
      {/* Budget Progress (client component) */}
      <div className="p-6 rounded-xl bg-gradient-to-r from-indigo-500/10 via-gray-800/40 to-gray-900 shadow-lg border border-gray-700/50">
        <h2 className="text-2xl font-bold mb-4 text-indigo-400">Budget Progress</h2>
        <BudgetProgress
          initialBudget={budgetData?.budget}
          currentExpenses={budgetData?.currentExpenses || 0}
        />
      </div>

      {/* Overview (client component) */}
      <div className="p-6 rounded-xl bg-gradient-to-r from-purple-500/10 via-gray-800/40 to-gray-900 shadow-lg border border-gray-700/50">
        <h2 className="text-2xl font-bold mb-4 text-purple-400">Overview</h2>
        <DashboardOverview accounts={accounts} transactions={transactions || []} />
      </div>

      {/* Accounts Grid */}
      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-pink-400">Accounts</h2>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <CreateAccountDrawer>
            <Card className="h-full hover:scale-[1.02] hover:shadow-xl transition-all cursor-pointer border-2 border-dashed border-gray-600 bg-gray-800/40 text-gray-300 flex items-center justify-center rounded-xl">
              <CardContent className="flex flex-col items-center justify-center h-full pt-6">
                <Plus className="h-12 w-12 mb-3 text-indigo-400" />
                <p className="text-sm font-medium">Add New Account</p>
              </CardContent>
            </Card>
          </CreateAccountDrawer>

          {accounts.length > 0 &&
            accounts.map((account) => (
              <div key={account.id} className="hover:scale-[1.02] transition-transform">
                <AccountCard account={account} />
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}
