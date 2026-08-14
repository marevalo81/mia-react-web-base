import { useEffect } from "react";
import { User, Send } from "lucide-react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import Button from "@components/Button";
import Card from "@components/Card";
import Input from "@components/Input";

import { useExample } from "./hooks/useExample";

export default function Example() {
  const { t, i18n } = useTranslation();
  const { sayHello } = useExample();

  const schema = z.object({
    name: z
      .string()
      .trim()
      .min(1, t("example.validation.nameRequired"))
      .max(100, t("example.validation.nameMaxLength")),
  });

  const {
    register,
    handleSubmit,
    trigger,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      name: "",
    },
  });

  useEffect(() => {
    if (errors.name) {
      trigger("name");
    }
  }, [i18n.language, trigger]);

  const onSubmit = (data) => {
    sayHello.mutate(data.name);
  };

  return (
    <div className="mx-auto w-full max-w-3xl p-6 lg:p-8">
      <div className="mb-8">
        <p className="mb-1 text-sm font-medium text-primary">
          {t("example.subtitle")}
        </p>

        <h2 className="text-2xl font-semibold text-text">
          {t("example.title")}
        </h2>

        <p className="mt-2 text-sm text-text-secondary">
          {t("example.description")}
        </p>
      </div>

      <Card>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <Input
            {...register("name")}
            id="name"
            label={t("example.name")}
            placeholder={t("example.namePlaceholder")}
            icon={<User size={18} />}
            error={errors.name?.message}
          />

          <div className="flex justify-end">
            <Button
              type="submit"
              icon={<Send size={16} />}
              loading={sayHello.isPending}
              disabled={sayHello.isPending}
            >
              {t("example.submit")}
            </Button>
          </div>

          {sayHello.isSuccess && (
            <p className="text-sm text-primary">{sayHello.data.message}</p>
          )}

          {sayHello.isError && (
            <p className="text-sm text-danger">{sayHello.error.message}</p>
          )}
        </form>
      </Card>
    </div>
  );
}
