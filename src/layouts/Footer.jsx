import { appConfig } from "@config";
export default function Footer() {
  return (
    <footer className="flex h-10 shrink-0 items-center justify-between bg-primary px-5 text-xs text-white">
      <span className="font-medium">
        © 2026 MIA AVANZA CONTIGO LLC. Todos los derechos reservados.
      </span>

      <span className="font-semibold tracking-widest">
        SEGUIMOS AVANZANDO, UN PASO A LA VEZ.
      </span>

      <span className="border-l border-white/20 pl-4">
        v{appConfig.version}
      </span>

      <span className="text-lg" aria-hidden="true">
        ♡
      </span>
    </footer>
  );
}
