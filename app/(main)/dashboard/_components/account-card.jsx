"use client";

import { ArrowUpRight, ArrowDownRight } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { useEffect } from "react";
import useFetch from "@/hooks/use-fetch";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import { updateDefaultAccount } from "@/actions/account";
import { toast } from "sonner";

export function AccountCard({ account }) {
  const { name, type, balance, id, isDefault } = account;

  const {
    loading: updateDefaultLoading,
    fn: updateDefaultFn,
    data: updatedAccount,
    error,
  } = useFetch(updateDefaultAccount);

  const handleDefaultChange = async (event) => {
    event.preventDefault();

    if (isDefault) {
      toast.warning("You need at least 1 default account");
      return;
    }

    await updateDefaultFn(id);
  };

  useEffect(() => {
    if (updatedAccount?.success) {
      toast.success("Default account updated successfully");
    }
  }, [updatedAccount]);

  useEffect(() => {
    if (error) {
      toast.error(error.message || "Failed to update default account");
    }
  }, [error]);

  return (
    <Card
      className="group relative rounded-xl border border-gray-700/40 bg-gray-800/40 
                 hover:bg-gray-800/70 shadow-lg hover:shadow-indigo-500/20 
                 transition-all duration-300 cursor-pointer overflow-hidden"
    >
      {/* Gradient Glow */}
      <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/10 via-purple-500/5 to-transparent opacity-0 group-hover:opacity-100 blur-2xl transition-opacity duration-500"></div>

      <Link href={`/account/${id}`} className="relative z-10 block">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-lg font-semibold text-white capitalize">
            {name}
          </CardTitle>
          <Switch
            checked={isDefault}
            onClick={handleDefaultChange}
            disabled={updateDefaultLoading}
          />
        </CardHeader>

        <CardContent>
          <div className="text-3xl font-extrabold text-indigo-400">
            Rs.{parseFloat(balance).toFixed(2)}
          </div>
          <p className="text-sm text-gray-400">
            {type.charAt(0) + type.slice(1).toLowerCase()} Account
          </p>
        </CardContent>

        <CardFooter className="flex justify-between text-xs text-gray-400 border-t border-gray-700/50 pt-3">
          <div className="flex items-center gap-1">
            <ArrowUpRight className="h-4 w-4 text-green-400" />
            Income
          </div>
          <div className="flex items-center gap-1">
            <ArrowDownRight className="h-4 w-4 text-red-400" />
            Expense
          </div>
        </CardFooter>
      </Link>
    </Card>
  );
}

