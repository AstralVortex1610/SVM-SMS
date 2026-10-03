import type { Role } from "../data/school";
import { roles } from "../data/school";

type Props = {
  activeRole: Role;
  onChange: (role: Role) => void;
};

export function RoleSwitcher({ activeRole, onChange }: Props) {
  return (
    <div aria-label="Switch portal role" className="grid grid-cols-2 gap-2 rounded-2xl bg-stone-100 p-1 md:grid-cols-4">
      {(Object.keys(roles) as Role[]).map((role) => (
        <button
          key={role}
          className={`rounded-xl px-3 py-2 text-sm font-semibold transition focus-ring ${
            activeRole === role
              ? "bg-white text-stone-950 shadow-sm"
              : "text-stone-500 hover:bg-white/60 hover:text-stone-800"
          }`}
          type="button"
          onClick={() => onChange(role)}
        >
          {roles[role].label}
        </button>
      ))}
    </div>
  );
}
