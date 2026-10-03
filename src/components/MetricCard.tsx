import type { Insight } from "../data/school";

const toneClass = {
  good: "border-emerald-200 bg-emerald-50 text-emerald-800",
  watch: "border-amber-200 bg-amber-50 text-amber-800",
  neutral: "border-stone-200 bg-stone-50 text-stone-700",
};

export function MetricCard({ insight }: { insight: Insight }) {
  return (
    <article className="surface-panel animate-rise min-h-36 p-5">
      <div className="flex items-start justify-between gap-4">
        <p className="text-sm font-medium text-stone-500">{insight.label}</p>
        <span className={`rounded-full border px-2.5 py-1 text-xs font-semibold ${toneClass[insight.tone]}`}>
          {insight.trend}
        </span>
      </div>
      <strong className="mt-5 block text-4xl font-semibold tracking-tight text-stone-950">{insight.value}</strong>
    </article>
  );
}
