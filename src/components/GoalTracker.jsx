import React, { useMemo, useState } from 'react';
import { Target, Plus, Trash2, Calendar } from 'lucide-react';

export default function GoalTracker() {
  const [goals, setGoals] = useState([]);
  const [form, setForm] = useState({ name: '', target: 1000, current: 0, months: 12, horizon: 'short' });

  function addGoal(e) {
    e.preventDefault();
    if (!form.name) return;
    const id = crypto.randomUUID();
    setGoals((g) => [...g, { id, ...form }]);
    setForm({ name: '', target: 1000, current: 0, months: 12, horizon: 'short' });
  }

  function removeGoal(id) {
    setGoals((g) => g.filter((x) => x.id !== id));
  }

  return (
    <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
      <div className="flex items-center gap-3">
        <Target className="size-5 text-emerald-400" />
        <h2 className="text-xl font-semibold">Goal Tracker</h2>
      </div>
      <p className="mt-1 text-slate-300 text-sm">
        Define goals and see the monthly amount needed to hit them on time.
      </p>

      <div className="mt-6 grid gap-8 md:grid-cols-2">
        <form onSubmit={addGoal} className="space-y-4">
          <div>
            <label className="text-sm text-slate-300">Goal name</label>
            <input
              value={form.name}
              onChange={(e)=>setForm(f=>({ ...f, name: e.target.value }))}
              className="mt-1 w-full rounded-xl bg-slate-900/60 border border-white/10 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              placeholder="e.g., Build emergency fund, Europe trip"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm text-slate-300">Target amount</label>
              <input type="number" min={0} value={form.target} onChange={(e)=>setForm(f=>({ ...f, target: Number(e.target.value) }))} className="mt-1 w-full rounded-xl bg-slate-900/60 border border-white/10 px-4 py-2" />
            </div>
            <div>
              <label className="text-sm text-slate-300">Current saved</label>
              <input type="number" min={0} value={form.current} onChange={(e)=>setForm(f=>({ ...f, current: Number(e.target.value) }))} className="mt-1 w-full rounded-xl bg-slate-900/60 border border-white/10 px-4 py-2" />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm text-slate-300">Months to reach</label>
              <div className="flex items-center gap-2 mt-1">
                <Calendar className="size-4 text-slate-400" />
                <input type="number" min={1} value={form.months} onChange={(e)=>setForm(f=>({ ...f, months: Number(e.target.value) }))} className="w-full rounded-xl bg-slate-900/60 border border-white/10 px-4 py-2" />
              </div>
            </div>
            <div>
              <label className="text-sm text-slate-300">Horizon</label>
              <select value={form.horizon} onChange={(e)=>setForm(f=>({ ...f, horizon: e.target.value }))} className="mt-1 w-full rounded-xl bg-slate-900/60 border border-white/10 px-4 py-2">
                <option value="short">Short-term (0–12m)</option>
                <option value="mid">Mid-term (1–5y)</option>
                <option value="long">Long-term (5y+)</option>
              </select>
            </div>
          </div>
          <button className="inline-flex items-center gap-2 rounded-xl bg-emerald-500 px-4 py-2 text-slate-900 font-medium hover:bg-emerald-400 transition">
            <Plus className="size-4" /> Add goal
          </button>
        </form>

        <div className="space-y-4">
          {goals.length === 0 && (
            <p className="text-slate-400">No goals yet. Add your first goal to see a plan.</p>
          )}
          {goals.map((g) => (
            <GoalCard key={g.id} goal={g} onRemove={() => removeGoal(g.id)} />
          ))}
        </div>
      </div>
    </div>
  );
}

function GoalCard({ goal, onRemove }) {
  const remaining = Math.max(0, goal.target - goal.current);
  const perMonth = useMemo(() => remaining / Math.max(1, goal.months), [remaining, goal.months]);
  const progress = Math.min(100, (goal.current / Math.max(1, goal.target)) * 100);

  const horizonLabel = goal.horizon === 'short' ? 'Short-term' : goal.horizon === 'mid' ? 'Mid-term' : 'Long-term';
  const barColor = goal.horizon === 'short' ? 'from-sky-400 to-sky-600' : goal.horizon === 'mid' ? 'from-amber-400 to-amber-600' : 'from-violet-400 to-violet-600';

  return (
    <div className="rounded-2xl border border-white/10 bg-slate-900/50 p-5">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h4 className="font-semibold">{goal.name}</h4>
          <p className="text-xs text-slate-400">{horizonLabel} • {goal.months} months</p>
        </div>
        <button onClick={onRemove} className="rounded-lg bg-white/5 hover:bg-white/10 p-2 border border-white/10" aria-label="Remove goal">
          <Trash2 className="size-4 text-slate-300" />
        </button>
      </div>

      <div className="mt-4">
        <div className="flex items-center justify-between text-sm">
          <span className="text-slate-300">Progress</span>
          <span className="tabular-nums">{progress.toFixed(1)}%</span>
        </div>
        <div className="mt-2 h-2 w-full rounded-full bg-white/10 overflow-hidden">
          <div className={`h-full bg-gradient-to-r ${barColor}`} style={{ width: `${progress}%` }} />
        </div>
      </div>

      <div className="mt-4 grid grid-cols-3 gap-4 text-sm">
        <div>
          <div className="text-slate-400">Target</div>
          <div className="font-medium tabular-nums">${goal.target.toFixed(2)}</div>
        </div>
        <div>
          <div className="text-slate-400">Saved</div>
          <div className="font-medium tabular-nums">${goal.current.toFixed(2)}</div>
        </div>
        <div>
          <div className="text-slate-400">Needed / mo</div>
          <div className="font-medium tabular-nums">${perMonth.toFixed(2)}</div>
        </div>
      </div>
    </div>
  );
}
