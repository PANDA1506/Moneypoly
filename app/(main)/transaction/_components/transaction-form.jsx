
"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CalendarIcon, Loader2 } from "lucide-react";
import { format } from "date-fns";
import { useRouter, useSearchParams } from "next/navigation";
import useFetch from "@/hooks/use-fetch";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { CreateAccountDrawer } from "@/components/create-account-drawer";
import { cn } from "@/lib/utils";
import { createTransaction, updateTransaction } from "@/actions/transaction";
import { transactionSchema } from "@/app/lib/schema";
import { ReceiptScanner } from "./recipt-scanner";

export function AddTransactionForm({
  accounts,
  categories,
  editMode = false,
  initialData = null,
}) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const editId = searchParams.get("edit");

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
    getValues,
    reset,
  } = useForm({
    resolver: zodResolver(transactionSchema),
    defaultValues:
      editMode && initialData
        ? {
            type: initialData.type,
            amount: initialData.amount.toString(),
            description: initialData.description,
            accountId: initialData.accountId,
            category: initialData.category,
            date: new Date(initialData.date),
            isRecurring: initialData.isRecurring,
            ...(initialData.recurringInterval && {
              recurringInterval: initialData.recurringInterval,
            }),
          }
        : {
            type: "EXPENSE",
            amount: "",
            description: "",
            accountId: accounts.find((ac) => ac.isDefault)?.id,
            date: new Date(),
            isRecurring: false,
          },
  });

  const {
    loading: transactionLoading,
    fn: transactionFn,
    data: transactionResult,
  } = useFetch(editMode ? updateTransaction : createTransaction);

  const onSubmit = (data) => {
    const formData = {
      ...data,
      amount: parseFloat(data.amount),
    };

    if (editMode) {
      transactionFn(editId, formData);
    } else {
      transactionFn(formData);
    }
  };

  const handleScanComplete = (scannedData) => {
  if (scannedData) {
    if (scannedData.amount) {
      setValue("amount", scannedData.amount.toString());
    }
    if (scannedData.date) {
      setValue("date", new Date(scannedData.date));
    }
    if (scannedData.description) {
      setValue("description", scannedData.description);
    }
    if (scannedData.category) {
      // Match scanned category (name) with your categories list
      const matchedCategory = categories.find(
        (c) =>
          c.name.toLowerCase().trim() ===
          scannedData.category.toLowerCase().trim()
      );

      if (matchedCategory) {
        setValue("category", matchedCategory.id); // ✅ Use ID instead of name
      } else {
        toast.error(`Category "${scannedData.category}" not found`);
      }
    }
    toast.success("Receipt scanned successfully");
  }
};



  useEffect(() => {
    if (transactionResult?.success && !transactionLoading) {
      toast.success(
        editMode
          ? "Transaction updated successfully"
          : "Transaction created successfully"
      );
      reset();
      router.push(`/account/${transactionResult.data.accountId}`);
    }
  }, [transactionResult, transactionLoading, editMode]);

  const type = watch("type");
  const isRecurring = watch("isRecurring");
  const date = watch("date");

  const filteredCategories = categories.filter(
    (category) => category.type === type
  );

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-6 p-6 rounded-2xl bg-gray-900 border border-gray-800 shadow-xl text-white"
    >
      {/* Receipt Scanner */}
      {!editMode && (
        <div className="rounded-xl border border-gray-800 p-4 bg-gray-800/60">
          <ReceiptScanner onScanComplete={handleScanComplete} />
        </div>
      )}

      {/* Type */}
      <div className="space-y-1.5">
        <label className="text-xs font-medium text-gray-400">Type</label>
        <Select
          onValueChange={(value) => setValue("type", value)}
          defaultValue={type}
        >
          <SelectTrigger className="rounded-xl bg-gray-800/70 border-gray-700 focus:ring-2 focus:ring-indigo-500 transition">
            <SelectValue placeholder="Select type" />
          </SelectTrigger>
          <SelectContent className="bg-gray-900 text-white border border-gray-700 rounded-xl shadow-lg">
            <SelectItem value="EXPENSE">Expense</SelectItem>
            <SelectItem value="INCOME">Income</SelectItem>
          </SelectContent>
        </Select>
        {errors.type && (
          <p className="text-xs text-red-500">{errors.type.message}</p>
        )}
      </div>

      {/* Amount + Account */}
      <div className="grid gap-6 md:grid-cols-2">
        <div className="space-y-1.5">
          <label className="text-xs font-medium text-gray-400">Amount</label>
          <Input
            type="number"
            step="0.01"
            placeholder="0.00"
            className="rounded-xl bg-gray-800/70 border-gray-700 focus:ring-2 focus:ring-indigo-500 transition"
            {...register("amount")}
          />
          {errors.amount && (
            <p className="text-xs text-red-500">{errors.amount.message}</p>
          )}
        </div>

        <div className="space-y-1.5">
          <label className="text-xs font-medium text-gray-400">Account</label>
          <Select
            onValueChange={(value) => setValue("accountId", value)}
            defaultValue={getValues("accountId")}
          >
            <SelectTrigger className="rounded-xl bg-gray-800/70 border-gray-700 focus:ring-2 focus:ring-indigo-500 transition">
              <SelectValue placeholder="Select account" />
            </SelectTrigger>
            <SelectContent className="bg-gray-900 text-white border border-gray-700 rounded-xl shadow-lg">
              {accounts.map((account) => (
                <SelectItem key={account.id} value={account.id}>
                  {account.name} (Rs.{parseFloat(account.balance).toFixed(2)})
                </SelectItem>
              ))}
              <CreateAccountDrawer>
                <Button
                  variant="ghost"
                  className="w-full text-indigo-400 hover:bg-gray-800 hover:text-white rounded-lg"
                >
                  ➕ Create Account
                </Button>
              </CreateAccountDrawer>
            </SelectContent>
          </Select>
          {errors.accountId && (
            <p className="text-xs text-red-500">{errors.accountId.message}</p>
          )}
        </div>
      </div>

      {/* Category */}
      <div className="space-y-1.5">
        <label className="text-xs font-medium text-gray-400">Category</label>
        <Select
          onValueChange={(value) => setValue("category", value)}
          defaultValue={getValues("category")}
        >
          <SelectTrigger className="rounded-xl bg-gray-800/70 border-gray-700 focus:ring-2 focus:ring-indigo-500 transition">
            <SelectValue placeholder="Select category" />
          </SelectTrigger>
          <SelectContent className="bg-gray-900 text-white border border-gray-700 rounded-xl shadow-lg">
            {filteredCategories.map((category) => (
              <SelectItem key={category.id} value={category.id}>
                {category.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {errors.category && (
          <p className="text-xs text-red-500">{errors.category.message}</p>
        )}
      </div>

      {/* Date */}
      <div className="space-y-1.5">
        <label className="text-xs font-medium text-gray-400">Date</label>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className={cn(
                "w-full pl-3 text-left font-normal rounded-xl bg-gray-800/70 border-gray-700 hover:bg-gray-700 transition",
                !date && "text-gray-400"
              )}
            >
              {date ? format(date, "PPP") : <span>Pick a date</span>}
              <CalendarIcon className="ml-auto h-4 w-4 opacity-70" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0 bg-gray-900 border border-gray-700 rounded-xl shadow-xl">
            <Calendar
              mode="single"
              selected={date}
              onSelect={(date) => setValue("date", date)}
              disabled={(date) =>
              date > new Date() || date < new Date("1900-01-01")
            }
            initialFocus
            className="
              rounded-xl bg-gray-900 text-white
             [&_.rdp-day]:text-gray-200                 /* Normal days */
             [&_.rdp-day:hover]:bg-gray-700             /* Hover state */
             [&_.rdp-day_selected]:bg-indigo-500 
             [&_.rdp-day_selected]:text-white           /* Selected date */
             [&_.rdp-day_disabled]:text-gray-600        /* Disabled dates */
            [&_.rdp-day_today]:ring-1 [&_.rdp-day_today]:ring-indigo-400 [&_.rdp-day_today]:rounded-full
          "
          />
        </PopoverContent>
        </Popover>
        {errors.date && (
          <p className="text-xs text-red-500">{errors.date.message}</p>
        )}
      </div>

      {/* Description */}
      <div className="space-y-1.5">
        <label className="text-xs font-medium text-gray-400">Description</label>
        <Input
          placeholder="Enter description"
          className="rounded-xl bg-gray-800/70 border-gray-700 focus:ring-2 focus:ring-indigo-500 transition"
          {...register("description")}
        />
        {errors.description && (
          <p className="text-xs text-red-500">{errors.description.message}</p>
        )}
      </div>

      {/* Recurring Toggle */}
      <div className="flex items-center justify-between rounded-xl border border-gray-800 p-4 bg-gray-800/60">
        <div>
          <label className="text-sm font-semibold">Recurring Transaction</label>
          <p className="text-xs text-gray-400">
            Set up a recurring schedule for this transaction
          </p>
        </div>
        <Switch
          checked={isRecurring}
          onCheckedChange={(checked) => setValue("isRecurring", checked)}
        />
      </div>

      {/* Recurring Interval */}
      {isRecurring && (
        <div className="space-y-1.5">
          <label className="text-xs font-medium text-gray-400">
            Recurring Interval
          </label>
          <Select
            onValueChange={(value) => setValue("recurringInterval", value)}
            defaultValue={getValues("recurringInterval")}
          >
            <SelectTrigger className="rounded-xl bg-gray-800/70 border-gray-700 focus:ring-2 focus:ring-indigo-500 transition">
              <SelectValue placeholder="Select interval" />
            </SelectTrigger>
            <SelectContent className="bg-gray-900 text-white border border-gray-700 rounded-xl shadow-lg">
              <SelectItem value="DAILY">Daily</SelectItem>
              <SelectItem value="WEEKLY">Weekly</SelectItem>
              <SelectItem value="MONTHLY">Monthly</SelectItem>
              <SelectItem value="YEARLY">Yearly</SelectItem>
            </SelectContent>
          </Select>
          {errors.recurringInterval && (
            <p className="text-xs text-red-500">
              {errors.recurringInterval.message}
            </p>
          )}
        </div>
      )}

      {/* Actions */}
      <div className="flex gap-4">
        <Button
          type="button"
          variant="outline"
          className="w-full rounded-xl border-gray-700 hover:bg-gray-800 text-black transition"
          onClick={() => router.back()}
        >
          Cancel
        </Button>
        <Button
          type="submit"
          className="w-full rounded-xl bg-indigo-500 hover:bg-indigo-600 shadow-lg transition-all"
          disabled={transactionLoading}
        >
          {transactionLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              {editMode ? "Updating..." : "Creating..."}
            </>
          ) : editMode ? (
            "Update Transaction"
          ) : (
            "Create Transaction"
          )}
        </Button>
      </div>
    </form>
  );
}



