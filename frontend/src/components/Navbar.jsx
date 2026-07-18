import React, { useState } from "react";
import { Github, Menu, ShieldCheck, X } from "lucide-react";
import { navigate } from "../lib/navigation";

const links = [
  ["/", "Home"],
  ["/analyze", "Analyze"],
  ["/about", "About"],
  ["/extension", "Extension"],
  ["/team", "Creator"]
];

function RoutedLink({ to, children, activePath, onClick, className = "" }) {
  const active = activePath === to;

  return (
    <a
      href={to}
      onClick={(event) => {
        event.preventDefault();
        navigate(to);
        onClick?.();
      }}
      className={`${className} rounded-lg px-4 py-2 text-sm font-semibold transition ${
        active ? "bg-cyan-300/15 text-cyan-100" : "text-slate-300 hover:bg-white/5 hover:text-white"
      }`}
    >
      {children}
    </a>
  );
}

export function Navbar({ activePath }) {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-night/80 backdrop-blur-xl">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <a
          className="flex items-center gap-3"
          href="/"
          onClick={(event) => {
            event.preventDefault();
            navigate("/");
            setOpen(false);
          }}
        >
          <span className="grid h-10 w-10 place-items-center rounded-lg border border-cyan-300/30 bg-cyan-300/10 shadow-glow">
            <ShieldCheck className="h-5 w-5 text-cyanfire" />
          </span>
          <span className="font-display text-xl font-bold tracking-wide text-white">TruthLens AI</span>
        </a>
        <div className="hidden items-center gap-1 md:flex">
          {links.map(([to, label]) => (
            <RoutedLink key={to} to={to} activePath={activePath}>
              {label}
            </RoutedLink>
          ))}
        </div>
        <div className="flex items-center gap-2">
          <a
            href="https://github.com/"
            className="hidden items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-4 py-2 text-sm font-semibold text-slate-100 transition hover:border-cyan-300/40 hover:bg-cyan-300/10 sm:inline-flex"
          >
            <Github className="h-4 w-4" />
            GitHub
          </a>
          <button
            onClick={() => setOpen((value) => !value)}
            className="grid h-10 w-10 place-items-center rounded-lg border border-white/10 bg-white/5 text-slate-100 md:hidden"
            aria-label="Toggle menu"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </nav>
      {open ? (
        <div className="border-t border-white/10 px-4 pb-4 md:hidden">
          <div className="mx-auto grid max-w-7xl gap-2">
            {links.map(([to, label]) => (
              <RoutedLink key={to} to={to} activePath={activePath} onClick={() => setOpen(false)}>
                {label}
              </RoutedLink>
            ))}
            <a href="https://github.com/" className="rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-sm font-semibold text-slate-100">
              GitHub
            </a>
          </div>
        </div>
      ) : null}
    </header>
  );
}
