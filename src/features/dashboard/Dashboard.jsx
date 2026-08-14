import { ArrowRight, Code2, HeartPulse } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { useHealth } from "./hooks/useHealth";
import Button from "@components/Button";
import Card from "@components/Card";

export default function Dashboard() {
  const { t } = useTranslation();
  const { data, isLoading, isError, error, refetch } = useHealth();

  return (
    <div className="mx-auto w-full max-w-7xl p-6 lg:p-8">
      {/* Page header */}
      <div className="mb-8">
        <p className="mb-1 text-sm font-medium text-primary">
          {t("dashboard.subtitle")}
        </p>

        <h2 className="text-2xl font-semibold text-text">
          {t("dashboard.title")}
        </h2>

        <p className="mt-2 text-sm text-text-secondary">
          {t("dashboard.description")}
        </p>
      </div>

      {/* Main examples */}
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <div className="mb-5 flex items-start justify-between">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary-soft text-primary">
              <HeartPulse size={22} />
            </div>

            <span className="rounded-full bg-primary-soft px-3 py-1 text-xs font-medium text-primary">
              {t("dashboard.health.badge")}
            </span>
          </div>

          <h3 className="text-lg font-semibold text-text">
            {t("dashboard.health.title")}
          </h3>

          <p className="mt-2 text-sm leading-6 text-text-secondary">
            {t("dashboard.health.description")}
          </p>

          <div className="mt-6">
            <Button
              icon={<HeartPulse size={16} />}
              disabled={isLoading}
              onClick={() => refetch()}
            >
              {isLoading ? "Verificando..." : t("dashboard.health.action")}
            </Button>
            {isLoading && (
              <p className="mt-3 text-sm text-text-secondary">
                Verificando API...
              </p>
            )}

            {isError && (
              <p className="mt-3 text-sm text-danger">Error: {error.message}</p>
            )}

            {data && (
              <p className="mt-3 text-sm text-text-secondary">
                API: {data.api}
              </p>
            )}
          </div>
        </Card>

        <Card>
          <div className="mb-5 flex items-start justify-between">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary-soft text-primary">
              <Code2 size={22} />
            </div>

            <span className="rounded-full bg-primary-soft px-3 py-1 text-xs font-medium text-primary">
              {t("dashboard.example.badge")}
            </span>
          </div>

          <h3 className="text-lg font-semibold text-text">
            {t("dashboard.example.title")}
          </h3>

          <p className="mt-2 text-sm leading-6 text-text-secondary">
            {t("dashboard.example.description")}
          </p>

          <div className="mt-6">
            <Link
              to="/example"
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-primary-dark focus:outline-none focus:ring-4 focus:ring-primary/30"
            >
              {t("dashboard.example.action")}
              <ArrowRight size={16} />
            </Link>
          </div>
        </Card>
      </div>

      {/* Architecture */}
      <Card className="mt-6">
        <div>
          <h3 className="text-lg font-semibold text-text">
            {t("dashboard.architecture.title")}
          </h3>

          <p className="mt-1 text-sm text-text-secondary">
            {t("dashboard.architecture.description")}
          </p>

          <div className="mt-4 flex flex-wrap gap-2">
            {[
              "React",
              "Tailwind 4",
              "Cognito",
              "Serverless",
              "Zod",
              "React Hook Form",
              "i18next",
            ].map((technology) => (
              <span
                key={technology}
                className="rounded-full border border-border bg-surface-soft px-3 py-1.5 text-xs font-medium text-text-secondary"
              >
                {technology}
              </span>
            ))}
          </div>
        </div>
      </Card>
    </div>
  );
}
