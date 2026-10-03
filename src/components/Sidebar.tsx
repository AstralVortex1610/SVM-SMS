import { GraduationCap, Menu, X } from "lucide-react";
import type { Role, RouteKey } from "../data/school";
import { routesForRole } from "../lib/routes";

type Props = {
  activeRole: Role;
  activeRoute: RouteKey;
  isOpen: boolean;
  onClose: () => void;
  onRouteChange: (route: RouteKey) => void;
};

export function Sidebar({ activeRole, activeRoute, isOpen, onClose, onRouteChange }: Props) {
  const routes = routesForRole(activeRole);

  return (
    <>
      <button
        aria-label="Open navigation"
        className="fixed left-4 top-4 z-40 rounded-full bg-white p-3 shadow-lg ring-1 ring-stone-200 focus-ring lg:hidden"
        type="button"
        onClick={onClose}
      >
        {isOpen ? <X size={20} /> : <Menu size={20} />}
      </button>
      <aside
        className={`fixed inset-y-0 left-0 z-30 w-72 border-r border-stone-200 bg-stone-50/95 px-4 py-5 backdrop-blur-xl transition-transform duration-300 lg:translate-x-0 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-center gap-3 px-2">
          <div className="grid size-11 place-items-center rounded-2xl bg-stone-950 text-white">
            <GraduationCap size={24} />
          </div>
          <div>
            <p className="text-sm font-semibold text-stone-500">SVM</p>
            <h1 className="text-lg font-bold text-stone-950">School Portal</h1>
          </div>
        </div>
        <nav className="mt-8 space-y-1" aria-label="Primary navigation">
          {routes.map((item) => {
            const Icon = item.icon;
            const active = item.key === activeRoute;
            return (
              <button
                key={item.key}
                className={`group flex w-full items-center gap-3 rounded-2xl px-3 py-3 text-left text-sm font-semibold transition focus-ring ${
                  active
                    ? "bg-white text-stone-950 shadow-sm ring-1 ring-stone-200"
                    : "text-stone-500 hover:bg-white/70 hover:text-stone-900"
                }`}
                type="button"
                onClick={() => onRouteChange(item.key)}
              >
                <Icon size={19} className={active ? "text-amber-700" : "text-stone-400 group-hover:text-amber-700"} />
                {item.label}
              </button>
            );
          })}
        </nav>
      </aside>
    </>
  );
}
