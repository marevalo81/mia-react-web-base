import { LogOut } from "lucide-react";
import { useTranslation } from "react-i18next";

import { useAuth } from "@auth";
import Button from "@components/Button";

const languages = [
  { code: "es", label: "ES" },
  { code: "en", label: "EN" },
];

export default function Header() {
  const { t, i18n } = useTranslation();
  const { user, logout } = useAuth();

  const handleLanguageChange = (language) => {
    i18n.changeLanguage(language);
  };

  return (
    <header className="flex h-20 shrink-0 items-center justify-between border-b border-border bg-surface px-6 lg:px-8">
      <h1 className="text-lg font-semibold text-text">MIA React Web Base</h1>

      <div className="flex items-center gap-4">
        <div className="flex items-center rounded-lg border border-border bg-surface-soft p-1">
          {languages.map(({ code, label }) => {
            const isActive = i18n.resolvedLanguage === code;

            return (
              <button
                key={code}
                type="button"
                onClick={() => handleLanguageChange(code)}
                className={`
                  rounded-md px-2.5 py-1 text-xs font-medium transition-colors
                  ${
                    isActive
                      ? "bg-primary text-white"
                      : "text-text-secondary hover:text-text"
                  }
                `}
                aria-label={t("common.changeLanguage", {
                  language: label,
                })}
                aria-pressed={isActive}
              >
                {label}
              </button>
            );
          })}
        </div>

        <span className="text-sm text-text-secondary">
          {user?.profile?.email}
        </span>

        <Button
          variant="secondary"
          icon={<LogOut size={16} />}
          onClick={logout}
        >
          {t("common.logout")}
        </Button>
      </div>
    </header>
  );
}
