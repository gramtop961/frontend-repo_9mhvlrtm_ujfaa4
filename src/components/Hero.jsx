import React from 'react';
import Spline from '@splinetool/react-spline';
import { Rocket, Shield, PiggyBank } from 'lucide-react';

export default function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="relative h-[560px] w-full">
        <Spline scene="https://prod.spline.design/41MGRk-UDPKO-l6W/scene.splinecode" style={{ width: '100%', height: '100%' }} />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />
      </div>
      <div className="mx-auto max-w-7xl px-6">
        <div className="-mt-40 relative z-10 grid gap-6 md:grid-cols-2">
          <div className="rounded-3xl bg-white/5 backdrop-blur border border-white/10 p-8">
            <h1 className="text-3xl md:text-4xl font-semibold leading-tight tracking-tight">
              Financeal — your modern guide to smart money moves
            </h1>
            <p className="mt-3 text-slate-300">
              Built for students and young professionals. Allocate your salary, track goals, and climb the financial ladder with stage‑specific guidance.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <a href="#calculator" className="inline-flex items-center gap-2 rounded-xl bg-emerald-500 px-4 py-2 text-slate-900 font-medium hover:bg-emerald-400 transition">
                <Rocket className="size-4" /> Start planning
              </a>
              <a href="#ladder" className="inline-flex items-center gap-2 rounded-xl bg-white/10 px-4 py-2 text-white hover:bg-white/15 border border-white/10 transition">
                <Shield className="size-4" /> See the ladder
              </a>
            </div>
          </div>
          <div className="rounded-3xl bg-white/5 backdrop-blur border border-white/10 p-6 grid grid-cols-3 gap-4">
            <Feature icon={PiggyBank} title="Allocate" desc="Smart splits for emergency, savings, and investments." />
            <Feature icon={Rocket} title="Grow" desc="Goal‑based contributions that stay on track." />
            <Feature icon={Shield} title="Secure" desc="Build a solid safety net first, then invest." />
          </div>
        </div>
      </div>
    </section>
  );
}

function Feature({ icon: Icon, title, desc }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
      <div className="flex items-center gap-2">
        <Icon className="size-5 text-emerald-400" />
        <span className="font-medium">{title}</span>
      </div>
      <p className="mt-1 text-xs text-slate-300">{desc}</p>
    </div>
  );
}
