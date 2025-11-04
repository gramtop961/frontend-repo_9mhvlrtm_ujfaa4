import React, { useMemo, useState } from 'react';
import { SlidersHorizontal, Percent, Wallet, PiggyBank, LineChart } from 'lucide-react';

export default function AllocationCalculator() {
  const [income, setIncome] = useState(3000);
  const [ratios, setRatios] = useState({ emergency: 20, savings: 30, investing: 10 });

  const totalRatio = ratios.emergency + ratios.savings + ratios.investing;
  const normalized = useMemo(() => {
    if (totalRatio === 0) return { emergency: 0, savings: 0, investing: 0 };
    return {
      emergency: (ratios.emergency / totalRatio) * 100,
      savings: (ratios.savings / totalRatio) * 100,
      investing: (ratios.investing / totalRatio) * 100,
    };
  }, [ratios, totalRatio]);

  const allocations = useMemo(() => {
    const e = (normalized.emergency / 100) * income;
    const s = (normalized.savings / 100) * income;
    const i = (normalized.investing / 100) * income;
    return { e, s, i };
  }, [normalized, income]);

  function handlePreset(preset) {
    if (preset === 'starter') setRatios({ emergency: 40, savings: 40, investing: 20 });
    if (preset === 'balanced') setRatios({ emergency: 25, savings: 50, investing: 25 });
    if (preset === 'aggressive') setRatios({ emergency: 15, savings: 35, investing: 50 });
  }

  return (
    <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
      <div className="flex items-center gap-3">
        <SlidersHorizontal className="size-5 text-emerald-400" />
        <h2 className="text-xl font-semibold">Salary Allocation Calculator</h2>
      </div>
      <p className="mt-1 text-slate-300 text-sm">
        Enter your monthly income and choose a budgeting style. Ratios auto-normalize so your split always adds up to 100%.
      </p>

      <div className="mt-6 grid gap-6 md:grid-cols-2">
        <div className="space-y-5">
          <label className="block text-sm text-slate-300">Monthly income</label>
          <div className="flex items-center gap-3">
            <Wallet className="size-4 text-slate-400" />
            <input
              type="number"
              className="w-full rounded-xl bg-slate-900/60 border border-white/10 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              value={income}
              min={0}
              onChange={(e) => setIncome(Number(e.target.value))}
            />
          </div>

          <div>
            <div className="flex items-center justify-between text-sm text-slate-300">
              <span className="flex items-center gap-2"><PiggyBank className="size-4 text-emerald-400"/> Emergency fund</span>
              <span className="tabular-nums">{Math.round(normalized.emergency)}%</span>
            </div>
            <input type="range" min="0" max="100" value={ratios.emergency} onChange={(e)=>setRatios(r=>({ ...r, emergency: Number(e.target.value) }))} className="w-full" />
          </div>

          <div>
            <div className="flex items-center justify-between text-sm text-slate-300">
              <span className="flex items-center gap-2"><Percent className="size-4 text-sky-400"/> Bank savings</span>
              <span className="tabular-nums">{Math.round(normalized.savings)}%</span>
            </div>
            <input type="range" min="0" max="100" value={ratios.savings} onChange={(e)=>setRatios(r=>({ ...r, savings: Number(e.target.value) }))} className="w-full" />
          </div>

          <div>
            <div className="flex items-center justify-between text-sm text-slate-300">
              <span className="flex items-center gap-2"><LineChart className="size-4 text-violet-400"/> Investment savings</span>
              <span className="tabular-nums">{Math.round(normalized.investing)}%</span>
            </div>
            <input type="range" min="0" max="100" value={ratios.investing} onChange={(e)=>setRatios(r=>({ ...r, investing: Number(e.target.value) }))} className="w-full" />
          </div>

          <div className="flex flex-wrap gap-2 pt-2">
            <button onClick={()=>handlePreset('starter')} className="rounded-xl bg-white/10 px-3 py-2 text-sm hover:bg-white/15 border border-white/10">Starter</button>
            <button onClick={()=>handlePreset('balanced')} className="rounded-xl bg-white/10 px-3 py-2 text-sm hover:bg-white/15 border border-white/10">Balanced</button>
            <button onClick={()=>handlePreset('aggressive')} className="rounded-xl bg-white/10 px-3 py-2 text-sm hover:bg-white/15 border border-white/10">Aggressive</button>
          </div>
        </div>

        <div className="rounded-2xl bg-slate-900/50 border border-white/10 p-5">
          <h3 className="font-medium">Recommended allocations</h3>
          <div className="mt-4 grid gap-4">
            <AllocationRow label="Emergency fund" amount={allocations.e} color="from-emerald-400 to-emerald-600" percent={normalized.emergency} />
            <AllocationRow label="Bank savings" amount={allocations.s} color="from-sky-400 to-sky-600" percent={normalized.savings} />
            <AllocationRow label="Investment savings" amount={allocations.i} color="from-violet-400 to-violet-600" percent={normalized.investing} />
          </div>
          <div className="mt-6 text-sm text-slate-300">
            <p>
              Tip: Aim for 3–6 months of expenses in your emergency fund before increasing investment contributions.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function AllocationRow({ label, amount, color, percent }) {
  return (
    <div>
      <div className="flex items-center justify-between text-sm">
        <span>{label}</span>
        <span className="tabular-nums text-slate-300">{percent.toFixed(1)}%</span>
      </div>
      <div className="mt-2 h-2 w-full rounded-full bg-white/10 overflow-hidden">
        <div className={`h-full bg-gradient-to-r ${color}`} style={{ width: `${percent}%` }} />
      </div>
      <div className="mt-2 text-lg font-semibold tabular-nums">${amount.toFixed(2)}</div>
    </div>
  );
}
