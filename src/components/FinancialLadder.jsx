import React, { useMemo, useState } from 'react';
import { Layers, Shield, CreditCard, PiggyBank, LineChart, BookOpenCheck } from 'lucide-react';

const STAGES = [
  { key: 'stability', title: 'Stability', color: 'from-sky-400 to-sky-600' },
  { key: 'security', title: 'Security', color: 'from-emerald-400 to-emerald-600' },
  { key: 'growth', title: 'Growth', color: 'from-violet-400 to-violet-600' },
  { key: 'independence', title: 'Independence', color: 'from-amber-400 to-amber-600' },
];

export default function FinancialLadder() {
  const [inputs, setInputs] = useState({
    expenses: 1200,
    emergencyMonths: 1,
    hasHighInterestDebt: true,
    investMonthly: 100,
  });

  const stage = useMemo(() => assessStage(inputs), [inputs]);
  const percent = useMemo(() => stageProgress(inputs), [inputs]);

  return (
    <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
      <div className="flex items-center gap-3">
        <Layers className="size-5 text-emerald-400" />
        <h2 className="text-xl font-semibold">Financial Ladder</h2>
      </div>
      <p className="mt-1 text-slate-300 text-sm">
        See where you are now and what to do next. Move from Stability → Security → Growth → Independence.
      </p>

      <div className="mt-6 grid gap-8 md:grid-cols-2">
        <div className="space-y-4">
          <Field label="Monthly essential expenses ($)">
            <input type="number" min={0} value={inputs.expenses} onChange={(e)=>setInputs(v=>({ ...v, expenses: Number(e.target.value) }))} className="w-full rounded-xl bg-slate-900/60 border border-white/10 px-4 py-2" />
          </Field>
          <Field label="Emergency fund built (months of expenses)">
            <input type="number" min={0} value={inputs.emergencyMonths} onChange={(e)=>setInputs(v=>({ ...v, emergencyMonths: Number(e.target.value) }))} className="w-full rounded-xl bg-slate-900/60 border border-white/10 px-4 py-2" />
          </Field>
          <Field label="High-interest debt (credit cards, >15% APR)">
            <div className="flex items-center gap-3">
              <button onClick={()=>setInputs(v=>({ ...v, hasHighInterestDebt: false }))} className={`rounded-xl px-3 py-2 border ${inputs.hasHighInterestDebt ? 'bg-white/5 border-white/10' : 'bg-emerald-500 text-slate-900 border-emerald-500'}`}>No</button>
              <button onClick={()=>setInputs(v=>({ ...v, hasHighInterestDebt: true }))} className={`rounded-xl px-3 py-2 border ${inputs.hasHighInterestDebt ? 'bg-rose-500/90 border-rose-500 text-white' : 'bg-white/5 border-white/10'}`}>Yes</button>
            </div>
          </Field>
          <Field label="Investing each month ($)">
            <input type="number" min={0} value={inputs.investMonthly} onChange={(e)=>setInputs(v=>({ ...v, investMonthly: Number(e.target.value) }))} className="w-full rounded-xl bg-slate-900/60 border border-white/10 px-4 py-2" />
          </Field>
        </div>

        <div className="space-y-5">
          <StageCard stage={stage} percent={percent} />
          <EducationPanel stage={stage} inputs={inputs} />
        </div>
      </div>
    </div>
  );
}

function Field({ label, children }) {
  return (
    <div>
      <label className="text-sm text-slate-300">{label}</label>
      <div className="mt-1">{children}</div>
    </div>
  );
}

function assessStage({ expenses, emergencyMonths, hasHighInterestDebt, investMonthly }) {
  // Simple heuristic:
  // - If high-interest debt present or EF < 1m: Stability
  // - If EF 1–3m and no high-interest debt: Security
  // - If EF 3–6m and investing >= 10% of expenses: Growth
  // - If EF > 12m and investing >= 20% of expenses: Independence
  if (hasHighInterestDebt || emergencyMonths < 1) return STAGES[0];
  if (emergencyMonths < 3) return STAGES[1];
  if (emergencyMonths <= 6 && investMonthly >= 0.1 * expenses) return STAGES[2];
  if (emergencyMonths >= 12 && investMonthly >= 0.2 * expenses) return STAGES[3];
  return STAGES[2];
}

function stageProgress({ expenses, emergencyMonths, hasHighInterestDebt, investMonthly }) {
  // Map inputs to a 0–100% completion toward next stage
  if (hasHighInterestDebt || emergencyMonths < 1) {
    const p = Math.min(100, (emergencyMonths / 1) * 100);
    return p;
  }
  if (emergencyMonths < 3) {
    const p = Math.min(100, ((emergencyMonths - 1) / 2) * 100);
    return p;
  }
  if (emergencyMonths <= 6) {
    const ratio = investMonthly / Math.max(1, 0.1 * expenses);
    return Math.min(100, ratio * 100);
  }
  const ratio = investMonthly / Math.max(1, 0.2 * expenses);
  return Math.min(100, ratio * 100);
}

function StageCard({ stage, percent }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-slate-900/60 p-5">
      <div className="flex items-center justify-between">
        <div>
          <div className="text-xs uppercase tracking-wide text-slate-400">Current stage</div>
          <div className="mt-1 text-xl font-semibold">{stage.title}</div>
        </div>
        <div className="h-10 w-10 rounded-xl bg-white/5 border border-white/10 grid place-items-center">
          <LayersIconForStage stageKey={stage.key} />
        </div>
      </div>
      <div className="mt-4">
        <div className="flex items-center justify-between text-sm">
          <span className="text-slate-300">Progress to next</span>
          <span className="tabular-nums">{percent.toFixed(0)}%</span>
        </div>
        <div className="mt-2 h-2 w-full rounded-full bg-white/10 overflow-hidden">
          <div className={`h-full bg-gradient-to-r ${stage.color}`} style={{ width: `${percent}%` }} />
        </div>
      </div>
    </div>
  );
}

function LayersIconForStage({ stageKey }) {
  switch(stageKey) {
    case 'stability': return <CreditCard className="size-5 text-sky-400" />;
    case 'security': return <Shield className="size-5 text-emerald-400" />;
    case 'growth': return <LineChart className="size-5 text-violet-400" />;
    case 'independence': return <PiggyBank className="size-5 text-amber-400" />;
    default: return <Layers className="size-5 text-slate-300" />;
  }
}

function EducationPanel({ stage, inputs }) {
  const tips = getTips(stage.key, inputs);
  return (
    <div className="rounded-2xl border border-white/10 bg-slate-900/60 p-5">
      <div className="flex items-center gap-2">
        <BookOpenCheck className="size-5 text-emerald-400" />
        <h3 className="font-medium">Stage‑specific playbook</h3>
      </div>
      <ul className="mt-4 space-y-3">
        {tips.map((t, i) => (
          <li key={i} className="rounded-xl bg-white/5 border border-white/10 p-3">
            <p className="text-sm">{t}</p>
          </li>
        ))}
      </ul>
      <div className="mt-5 text-sm text-slate-300">
        <p>Learn more: Budgeting basics, Emergency vs. savings, and beginner investing (Index funds, ETFs).</p>
      </div>
    </div>
  );
}

function getTips(stageKey, { expenses, emergencyMonths, hasHighInterestDebt, investMonthly }) {
  switch(stageKey) {
    case 'stability':
      return [
        'Create a bare‑bones budget that covers rent, food, transport, and utilities only.',
        'Build a starter emergency fund equal to 1 month of essential expenses.',
        'Prioritize paying off high‑interest debt (credit cards) before investing.',
        'Automate transfers on payday to separate spending from savings.'
      ];
    case 'security':
      return [
        'Expand your emergency fund to 3 months of essential expenses.',
        'Use separate accounts: Emergency Fund (untouched) vs. General Savings (flexible).',
        'Track recurring bills and set calendar reminders to avoid late fees.',
        'Negotiate recurring expenses (phone plan, subscriptions) to free up cash flow.'
      ];
    case 'growth':
      return [
        'Raise your emergency fund toward 6 months while investing at least 10% of expenses.',
        'Start with broad‑market index funds or ETFs; automate monthly contributions.',
        'Avoid timing the market; focus on consistency and low fees.',
        'Set 1–3 mid‑term goals and align monthly contributions to each.'
      ];
    case 'independence':
      return [
        'Maintain 12+ months of expenses in safe reserves; invest 20%+ of expenses.',
        'Diversify across index funds, bonds, and cash; rebalance annually.',
        'Maximize tax‑advantaged accounts where available.',
        'Mentor others and refine lifestyle costs to keep freedom flexible.'
      ];
    default:
      return [];
  }
}
