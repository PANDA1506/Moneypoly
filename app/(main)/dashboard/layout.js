import DashboardPage from "./page";
import { BarLoader } from "react-spinners";
import { Suspense } from "react";

export default function Layout() {
  return (
    <section className="relative min-h-screen bg-gradient-to-r from-gray-900 via-black to-gray-800 text-white overflow-hidden px-6 py-10">
      {/* Background Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff0d_1px,transparent_1px),linear-gradient(to_bottom,#ffffff0d_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none"></div>

      <div className="relative z-10 max-w-7xl mx-auto px-5">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-12">
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight">
            <span className="text-white">Your </span>
            <span className="text-indigo-400">Dashboard</span>
          </h1>

          <p className="mt-4 md:mt-0 text-gray-400 max-w-md">
            Track your accounts, monitor progress, and view your latest
            transactions — all in one place.
          </p>
        </div>

        {/* Dashboard Content */}
        <Suspense
          fallback={
            <div className="mt-4">
              <BarLoader width={"100%"} color="#9333ea" />
            </div>
          }
        >
          <DashboardPage />
        </Suspense>
      </div>
    </section>
  );
}
