import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import {
  featuresData,
  howItWorksData,
  statsData,
  testimonialsData,
} from "@/data/landing";
import HeroSection from "@/components/hero";
import Link from "next/link";

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-r from-gray-900 via-black to-gray-800 text-white">
      {/* Subtle Background Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff0d_1px,transparent_1px),linear-gradient(to_bottom,#ffffff0d_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none"></div>

      {/* Hero Section */}
      <HeroSection />

      {/* Stats Section */}
      <section className="py-20 relative">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {statsData.map((stat, index) => (
              <div
                key={index}
                className="text-center p-6 bg-white/5 rounded-xl border border-white/10 hover:border-indigo-500/40 transition-all"
              >
                <div className="text-3xl font-extrabold text-indigo-400 mb-2">
                  {stat.value}
                </div>
                <div className="text-gray-400">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 relative">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12 bg-gradient-to-r from-indigo-400 to-blue-500 bg-clip-text text-transparent">
            Everything you need to manage your finances
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuresData.map((feature, index) => (
              <Card
                key={index}
                className="p-6 bg-white/5 border border-white/10 rounded-2xl shadow-lg shadow-indigo-500/10 hover:scale-105 hover:border-indigo-400/50 transition-all"
              >
                <CardContent className="space-y-4 pt-4 text-center">
                  <div className="flex justify-center">{feature.icon}</div>
                  <h3 className="text-xl font-semibold text-white">
                    {feature.title}
                  </h3>
                  <p className="text-gray-400">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 relative">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-16 bg-gradient-to-r from-blue-500 to-indigo-500 bg-clip-text text-transparent">
            How It Works
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {howItWorksData.map((step, index) => (
              <div
                key={index}
                className="text-center p-6 bg-white/5 border border-white/10 rounded-xl hover:border-indigo-500/40 transition-all"
              >
                <div className="w-16 h-16 bg-indigo-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                  {step.icon}
                </div>
                <h3 className="text-xl font-semibold mb-4 text-white">
                  {step.title}
                </h3>
                <p className="text-gray-400">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-20 relative">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-16 bg-gradient-to-r from-purple-400 to-indigo-400 bg-clip-text text-transparent">
            Why People Are Excited
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonialsData.map((testimonial, index) => (
              <Card
                key={index}
                className="p-6 bg-white/5 border border-white/10 rounded-2xl shadow-lg shadow-purple-500/10 hover:scale-105 hover:border-purple-400/50 transition-all"
              >
                <CardContent className="pt-4">
                  <div className="flex items-center mb-4">
                    <Image
                      src={testimonial.image}
                      alt={testimonial.name}
                      width={40}
                      height={40}
                      className="rounded-full border border-indigo-500/40"
                    />
                    <div className="ml-4">
                      <div className="font-semibold text-white">
                        {testimonial.name}
                      </div>
                      <div className="text-sm text-gray-400">
                        {testimonial.role}
                      </div>
                    </div>
                  </div>
                  <p className="text-gray-300 italic">
                    “{testimonial.quote}”
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-indigo-700 via-indigo-800 to-blue-800 relative overflow-hidden">
        {/* Subtle Glow Background */}
        <div className="absolute -inset-20 bg-indigo-500/20 blur-3xl rounded-full"></div>

        <div className="container mx-auto px-4 text-center relative z-10">
          <h2 className="text-4xl md:text-5xl font-extrabold mb-6 bg-gradient-to-r from-indigo-300 to-blue-400 bg-clip-text text-transparent">
            Ready to Take Control of Your Finances?
          </h2>
        <p className="text-blue-100 mb-10 max-w-2xl mx-auto text-lg">
          Join early adopters who are already managing their finances smarter with{" "}
          <span className="font-semibold text-indigo-200">Moneypoly</span>.
        </p>
        <Link href="/dashboard">
          <Button
            size="lg"
            className="px-10 py-6 text-lg rounded-xl bg-white text-indigo-600 font-semibold shadow-lg hover:shadow-indigo-400/40 hover:scale-105 transition-all duration-300 ease-in-out"
          >
            🚀 Start Free Trial
          </Button>
        </Link>
      </div>
    </section>
  </div>
  );
};

export default LandingPage;
