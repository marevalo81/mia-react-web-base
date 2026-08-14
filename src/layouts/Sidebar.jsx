import { BookOpen, LayoutDashboard } from "lucide-react";
import { useTranslation } from "react-i18next";
import { NavLink } from "react-router-dom";

const navigation = [
  {
    key: "dashboard",
    path: "/",
    icon: LayoutDashboard,
  },
  {
    key: "example",
    path: "/example",
    icon: BookOpen,
  },
];

export default function Sidebar() {
  const { t } = useTranslation();

  return (
    <aside className="flex w-64 shrink-0 flex-col bg-primary text-white">
      {/* Brand */}
      <div className="flex h-20 items-center border-b border-white/10 px-5">
        <div>
          <p className="text-sm font-semibold">MIA</p>

          <p className="text-xs text-white/60">React Web Base</p>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-5">
        <div className="space-y-1">
          {navigation.map(({ key, path, icon: Icon }) => (
            <NavLink
              key={path}
              to={path}
              className={({ isActive }) =>
                `
                flex items-center gap-3 rounded-xl px-3 py-2.5
                text-sm font-medium transition-colors
                ${
                  isActive
                    ? "bg-white/15 text-white"
                    : "text-white/70 hover:bg-white/10 hover:text-white"
                }
              `
              }
            >
              <Icon size={19} strokeWidth={1.8} />
              <span>{t(`navigation.${key}`)}</span>
            </NavLink>
          ))}
        </div>
      </nav>
    </aside>
  );
}
