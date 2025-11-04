import React from "react";
import { Button } from "./ui/button";
import { PenBox, LayoutDashboard, BarChart3 } from "lucide-react";
import Link from "next/link";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import { checkUser } from "@/lib/checkUser";
import Image from "next/image";

const Header = async () => {
  await checkUser();

  return (
    <header className="fixed top-0 w-full z-50 border-b border-gray-200 bg-white/70 backdrop-blur-xl shadow-sm">
      <nav className="container mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <Image
            src="/logo.png"
            alt="Moneypoly Logo"
            width={200}               
            height={60}               
            className="h-16 w-auto object-contain"  
          />
        </Link>

        {/* Navigation */}
        <div className="hidden md:flex items-center space-x-10 font-medium">
          <SignedOut>
            <a
              href="#features"
              className="text-gray-700 hover:text-blue-600 transition-colors duration-200"
            >
              Features
            </a>
            <a
              href="#testimonials"
              className="text-gray-700 hover:text-blue-600 transition-colors duration-200"
            >
              Why People Are Excited
            </a>
          </SignedOut>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center space-x-4">
          <SignedIn>
            <Link href="/dashboard">
              <Button
                variant="outline"
                className="flex items-center gap-2 rounded-xl border-gray-300 hover:border-blue-600 hover:text-blue-600"
              >
                <LayoutDashboard size={18} />
                <span className="hidden md:inline">Dashboard</span>
              </Button>
            </Link>

            <Link href="/transaction/create">
              <Button className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-md hover:shadow-lg">
                <PenBox size={18} />
                <span className="hidden md:inline">Add Transaction</span>
              </Button>
            </Link>
          </SignedIn>

          <SignedOut>
            <SignInButton forceRedirectUrl="/dashboard">
              <Button
                variant="outline"
                className="rounded-xl hover:border-blue-600 hover:text-blue-600"
              >
                Login
              </Button>
            </SignInButton>
          </SignedOut>

          <SignedIn>
            <UserButton
              appearance={{
                elements: {
                  avatarBox:
                    "w-10 h-10 ring-2 ring-blue-600 hover:ring-purple-600 transition-all duration-200 rounded-full",
                },
              }}
            />
          </SignedIn>
        </div>
      </nav>
    </header>
  );
};

export default Header;
