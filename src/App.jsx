import React from 'react';
import Hero from './components/Hero.jsx';
import AllocationCalculator from './components/AllocationCalculator.jsx';
import GoalTracker from './components/GoalTracker.jsx';
import FinancialLadder from './components/FinancialLadder.jsx';

export default function App() {
  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <header className="sticky top-0 z-40 backdrop-blur supports-[backdrop-filter]:bg-slate-950/60 bg-slate-950/40 border-b border-white/10">
        <div className="mx-auto max-w-7xl px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="size-8 rounded-xl bg-gradient-to-br from-emerald-400 to-sky-500"></div>
            <span className="font-semibold tracking-tight text-lg">Financeal</span>
          </div>
          <nav className="hidden md:flex items-center gap-6 text-sm text-slate-300">
            <a href="#calculator" className="hover:text-white transition">Salary Allocator</a>
            <a href="#goals" className="hover:text-white transition">Goals</a>
            <a href="#ladder" className="hover:text-white transition">Financial Ladder</a>
          </nav>
        </div>
      </header>

      <main>
        <Hero />
        <section id="calculator" className="mx-auto max-w-7xl px-6 py-16">
          <AllocationCalculator />
        </section>
        <section id="goals" className="mx-auto max-w-7xl px-6 py-16">
          <GoalTracker />
        </section>
        <section id="ladder" className="mx-auto max-w-7xl px-6 py-16">
          <FinancialLadder />
        </section>
      </main>

      <footer className="border-t border-white/10 mt-20">
        <div className="mx-auto max-w-7xl px-6 py-10 text-sm text-slate-400">
          <p>© {new Date().getFullYear()} Financeal — Learn, plan, and grow your money with confidence.</p>
        </div>
      </footer>
    </div>
  );
}
