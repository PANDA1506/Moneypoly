
"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const HeroSection = () => {
  const imageRef = useRef(null);

  useEffect(() => {
    const imageElement = imageRef.current;

    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const scrollThreshold = 100;

      if (scrollPosition > scrollThreshold) {
        imageElement.classList.add("scale-95", "opacity-90");
      } else {
        imageElement.classList.remove("scale-95", "opacity-90");
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-r from-gray-900 via-black to-gray-800 text-white overflow-hidden">
      {/* Subtle Background Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff0d_1px,transparent_1px),linear-gradient(to_bottom,#ffffff0d_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none"></div>

      <div className="container mx-auto relative z-10 flex flex-col lg:flex-row items-center gap-20 px-6">
        {/* Text Section */}
        <div className="flex-1 text-center lg:text-left space-y-8">
          <h1 className="text-5xl md:text-7xl font-extrabold leading-tight">
            Take Control of <span className="text-indigo-400">Your Money</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-300 max-w-xl mx-auto lg:mx-0">
            Track, analyze, and optimize your spending with AI-driven insights.
            Built for simplicity, speed, and your financial freedom.
          </p>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
            <Link href="/dashboard">
              <Button
                size="lg"
                className="px-8 py-6 text-lg rounded-xl bg-indigo-500 hover:bg-indigo-600 shadow-lg transition-all"
              >
                🚀 Get Started
              </Button>
            </Link>
            <Link href="https://drive.google.com/file/d/1nCXaTV9hK_4CfjxfXVsNUFI82MG_blnE/view?usp=sharing">
              <Button
                size="lg"
                variant="outline"
                className="px-8 py-6 text-lg rounded-xl border-2 border-gray-600 text-black hover:bg-gray-800 transition-all flex items-center gap-2"
              >
              🎥 How to use?
              </Button>
            </Link>
          </div>
        </div>

        {/* Image Section */}
        <div className="flex-1 flex justify-center lg:justify-end relative">
          {/* Gradient Glow Behind Image */}
          <div className="absolute -inset-10 bg-indigo-500/30 blur-3xl rounded-full"></div>
          <div
            ref={imageRef}
            className="transition-all duration-500 ease-in-out relative"
          >
            <Image
              src="/banner.jpeg"
              width={600}
              height={450}
              alt="Dashboard Preview"
              className="rounded-xl shadow-2xl border border-gray-700 hover:scale-105 transition-transform duration-500"
              priority
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;

