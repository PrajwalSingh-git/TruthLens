import React, { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Navbar } from "./components/Navbar";
import { About } from "./pages/About";
import { Analyze } from "./pages/Analyze";
import { Extension } from "./pages/Extension";
import { Home } from "./pages/Home";
import { Team } from "./pages/Team";

const routes = {
  "/": Home,
  "/analyze": Analyze,
  "/about": About,
  "/extension": Extension,
  "/team": Team
};

function currentPath() {
  return routes[window.location.pathname] ? window.location.pathname : "/";
}

export default function App() {
  const [path, setPath] = useState(currentPath());
  const Page = routes[path] || Home;

  useEffect(() => {
    const syncPath = () => setPath(currentPath());
    window.addEventListener("popstate", syncPath);
    return () => window.removeEventListener("popstate", syncPath);
  }, []);

  return (
    <div className="min-h-screen">
      <Navbar activePath={path} />
      <AnimatePresence mode="wait">
        <motion.div key={path} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.22 }}>
          <Page />
        </motion.div>
      </AnimatePresence>
      <footer className="border-t border-white/10 px-4 py-8 text-center text-sm text-slate-500">
        TruthLens AI - AI misinformation defense for digital literacy and responsible sharing.
      </footer>
    </div>
  );
}
