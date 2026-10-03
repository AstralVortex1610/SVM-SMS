import { ArrowRight, CheckCircle2, ChevronRight, Clock3, Search, Send, ShieldCheck } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { MetricCard } from "./components/MetricCard";
import { RoleSwitcher } from "./components/RoleSwitcher";
import { Sidebar } from "./components/Sidebar";
import type { Role, RouteKey } from "./data/school";
import { actions, insights, roles, routeCopy, timeline } from "./data/school";
import { firstRouteForRole, isRouteAllowed } from "./lib/routes";

function App() {
  const [role, setRole] = useState<Role>("student");
  const [route, setRoute] = useState<RouteKey>("overview");
  const [menuOpen, setMenuOpen] = useState(false);
  const [toast, setToast] = useState("Ready");

  useEffect(() => {
    if (!isRouteAllowed(role, route)) {
      setRoute(firstRouteForRole(role));
    }
  }, [role, route]);

  const visibleInsights = useMemo(() => insights.filter((item) => item.roles.includes(role)), [role]);
  const visibleActions = useMemo(() => actions.filter((item) => item.roles.includes(role)), [role]);
  const copy = routeCopy[route];
  const RouteIcon = copy.icon;

  function handleRouteChange(nextRoute: RouteKey) {
    setRoute(nextRoute);
    setMenuOpen(false);
    setToast(`${routeCopy[nextRoute].title} opened`);
  }

  function handleAction(nextRoute: RouteKey, label: string) {
    handleRouteChange(nextRoute);
    setToast(`${label} queued for the future API`);
  }

  return (
    <div className="min-h-screen bg-[var(--color-canvas)] text-stone-900">
      <Sidebar
        activeRole={role}
        activeRoute={route}
        isOpen={menuOpen}
        onClose={() => setMenuOpen((value) => !value)}
        onRouteChange={handleRouteChange}
      />
      <main className="lg:pl-72">
        <section className="mx-auto flex w-full max-w-7xl flex-col gap-8 px-4 py-20 sm:px-6 lg:px-8 lg:py-8">
          <header className="grid gap-6 rounded-[2rem] border border-stone-200 bg-white/80 p-5 shadow-sm backdrop-blur md:p-7 xl:grid-cols-[1fr_430px]">
            <div className="flex min-w-0 flex-col justify-between gap-8">
              <div>
                <div className="mb-5 flex flex-wrap items-center gap-3">
                  <span className="rounded-full bg-amber-100 px-3 py-1 text-sm font-semibold text-amber-900">
                    {roles[role].label} workspace
                  </span>
                  <span className="inline-flex items-center gap-2 rounded-full bg-stone-100 px-3 py-1 text-sm font-medium text-stone-600">
                    <ShieldCheck size={15} /> Role-scoped access
                  </span>
                </div>
                <h2 className="max-w-3xl text-4xl font-semibold tracking-tight text-stone-950 md:text-6xl">
                  Good morning, {roles[role].name}.
                </h2>
                <p className="mt-4 max-w-2xl text-base leading-7 text-stone-600 md:text-lg">
                  {roles[role].context} has a clean daily view for attendance, learning, finance, operations, and
                  governance without exposing another role's controls.
                </p>
              </div>
              <div className="relative max-w-2xl">
                <Search className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-stone-400" size={19} />
                <input
                  className="h-13 w-full rounded-2xl border border-stone-200 bg-stone-50 pl-12 pr-4 text-sm outline-none transition focus:border-amber-500 focus:bg-white focus:ring-4 focus:ring-amber-100"
                  placeholder="Search classes, people, notices, receipts..."
                  onFocus={() => setToast("Search is ready for backend indexing")}
                />
              </div>
            </div>
            <div className="flex flex-col justify-between gap-5">
              <RoleSwitcher activeRole={role} onChange={setRole} />
              <div className="rounded-3xl bg-stone-950 p-5 text-white">
                <p className="text-sm font-medium text-stone-300">Today</p>
                <p className="mt-2 text-3xl font-semibold tracking-tight">4 live workflows</p>
                <div className="mt-5 space-y-3">
                  {timeline.slice(0, 3).map((item) => (
                    <div key={item.time} className="flex items-center justify-between gap-4 rounded-2xl bg-white/8 px-3 py-2">
                      <span className="text-sm text-stone-300">{item.time}</span>
                      <span className="truncate text-sm font-medium">{item.title}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </header>

          <section className="grid gap-4 md:grid-cols-3">
            {visibleInsights.map((insight) => (
              <MetricCard key={insight.label} insight={insight} />
            ))}
          </section>

          <section className="grid gap-6 xl:grid-cols-[1fr_380px]">
            <article className="surface-panel min-h-[34rem] p-5 md:p-7">
              <div className="flex flex-col gap-5 md:flex-row md:items-start md:justify-between">
                <div>
                  <div className="grid size-12 place-items-center rounded-2xl bg-amber-100 text-amber-800">
                    <RouteIcon size={23} />
                  </div>
                  <h3 className="mt-4 text-2xl font-semibold tracking-tight text-stone-950">{copy.title}</h3>
                  <p className="mt-2 max-w-2xl leading-7 text-stone-600">{copy.description}</p>
                </div>
                <button
                  className="inline-flex h-11 items-center justify-center gap-2 rounded-2xl bg-stone-950 px-4 text-sm font-semibold text-white transition hover:bg-stone-800 active:scale-[0.98] focus-ring"
                  type="button"
                  onClick={() => setToast(`${copy.title} draft saved locally`)}
                >
                  <Send size={17} /> Save draft
                </button>
              </div>

              <div className="mt-8 grid gap-4 md:grid-cols-2">
                {visibleActions.map((action) => (
                  <button
                    key={action.label}
                    className="group rounded-3xl border border-stone-200 bg-stone-50 p-5 text-left transition hover:-translate-y-0.5 hover:bg-white hover:shadow-sm active:translate-y-0 focus-ring"
                    type="button"
                    onClick={() => handleAction(action.route, action.label)}
                  >
                    <div className="flex items-center justify-between gap-4">
                      <h4 className="font-semibold text-stone-950">{action.label}</h4>
                      <ChevronRight className="text-stone-400 transition group-hover:translate-x-1 group-hover:text-amber-700" size={18} />
                    </div>
                    <p className="mt-2 text-sm leading-6 text-stone-600">{action.detail}</p>
                  </button>
                ))}
              </div>

              <div className="mt-8 rounded-3xl border border-dashed border-stone-300 bg-stone-50 p-5">
                <h4 className="font-semibold text-stone-950">Backend-ready contract</h4>
                <p className="mt-2 text-sm leading-6 text-stone-600">
                  This screen expects authenticated, role-filtered endpoints with audit logging for sensitive actions,
                  optimistic UI for safe drafts, and server-side authorization for every route.
                </p>
              </div>
            </article>

            <aside className="space-y-6">
              <div className="surface-panel p-5">
                <h3 className="text-lg font-semibold text-stone-950">Workflow timeline</h3>
                <div className="mt-5 space-y-4">
                  {timeline.map((item) => (
                    <div key={`${item.time}-${item.title}`} className="flex gap-3">
                      <div className="mt-1 grid size-9 shrink-0 place-items-center rounded-full bg-stone-100 text-stone-500">
                        <Clock3 size={17} />
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-stone-950">{item.title}</p>
                        <p className="mt-1 text-sm text-stone-500">
                          {item.time} · {item.owner} · {item.status}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="surface-panel p-5">
                <h3 className="text-lg font-semibold text-stone-950">Interaction status</h3>
                <p className="mt-3 rounded-2xl bg-amber-50 px-4 py-3 text-sm font-medium text-amber-900">{toast}</p>
                <div className="mt-5 flex items-center gap-3 text-sm text-stone-600">
                  <CheckCircle2 className="text-emerald-600" size={18} />
                  Accessible focus, responsive layout, reduced-motion support
                </div>
              </div>
            </aside>
          </section>

          <footer className="flex flex-col gap-3 border-t border-stone-200 py-6 text-sm text-stone-500 md:flex-row md:items-center md:justify-between">
            <span>SVM SMS frontend shell</span>
            <span className="inline-flex items-center gap-2">
              Future API boundary <ArrowRight size={15} /> auth, RBAC, audit, tenant isolation
            </span>
          </footer>
        </section>
      </main>
    </div>
  );
}

export default App;
