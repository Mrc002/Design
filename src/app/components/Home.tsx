import { useState, useEffect } from "react";
import { Link } from "react-router";
import { Video, FolderTree, HandMetal } from "lucide-react";
import { ThemeToggle } from "./ThemeToggle";

export function Home() {
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
      setIsDark(savedTheme === "dark");
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = !isDark;
    setIsDark(newTheme);
    localStorage.setItem("theme", newTheme ? "dark" : "light");
  };

  return (
    <div className={`min-h-screen flex items-center justify-center ${
      isDark
        ? "bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950"
        : "bg-gradient-to-br from-gray-50 via-white to-gray-100"
    }`}>
      <div className="max-w-5xl w-full px-6">
        <div className="flex justify-end mb-6">
          <ThemeToggle isDark={isDark} onToggle={toggleTheme} />
        </div>

        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-3 mb-6">
            <HandMetal className={`w-16 h-16 ${isDark ? "text-emerald-400" : "text-emerald-600"}`} />
            <h1 className={`text-6xl tracking-tight ${isDark ? "text-white" : "text-gray-900"}`}>LSM Research</h1>
          </div>
          <p className={`text-xl max-w-2xl mx-auto leading-relaxed ${
            isDark ? "text-slate-300" : "text-gray-600"
          }`}>
            Plataforma científica para la recolección y documentación de
            Lengua de Señas Mexicana
          </p>
          <div className={`mt-4 inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm ${
            isDark
              ? "bg-slate-800/50 border border-slate-700/50 text-slate-400"
              : "bg-gray-100 border border-gray-200 text-gray-600"
          }`}>
            <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></div>
            Sistema de captura activo
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <Link
            to="/grabadora"
            className={`group rounded-2xl p-8 shadow-2xl transition-all duration-300 hover:-translate-y-1 ${
              isDark
                ? "bg-slate-900/50 backdrop-blur-sm border border-slate-800 hover:shadow-emerald-500/10 hover:border-emerald-500/30"
                : "bg-white border border-gray-200 hover:shadow-emerald-500/20 hover:border-emerald-500/50"
            }`}
          >
            <div className={`flex items-center justify-center w-16 h-16 rounded-xl mb-6 transition-all ${
              isDark
                ? "bg-emerald-500/10 border border-emerald-500/20 group-hover:bg-emerald-500/20"
                : "bg-emerald-50 border border-emerald-200 group-hover:bg-emerald-100"
            }`}>
              <Video className={`w-8 h-8 ${isDark ? "text-emerald-400" : "text-emerald-600"}`} />
            </div>
            <h2 className={`text-3xl mb-3 ${isDark ? "text-white" : "text-gray-900"}`}>Captura de Señas</h2>
            <p className={`leading-relaxed ${isDark ? "text-slate-400" : "text-gray-600"}`}>
              Graba y documenta señas de LSM con controles profesionales
              de video y audio
            </p>
          </Link>

          <Link
            to="/categorizar"
            className={`group rounded-2xl p-8 shadow-2xl transition-all duration-300 hover:-translate-y-1 ${
              isDark
                ? "bg-slate-900/50 backdrop-blur-sm border border-slate-800 hover:shadow-emerald-500/10 hover:border-emerald-500/30"
                : "bg-white border border-gray-200 hover:shadow-emerald-500/20 hover:border-emerald-500/50"
            }`}
          >
            <div className={`flex items-center justify-center w-16 h-16 rounded-xl mb-6 transition-all ${
              isDark
                ? "bg-emerald-500/10 border border-emerald-500/20 group-hover:bg-emerald-500/20"
                : "bg-emerald-50 border border-emerald-200 group-hover:bg-emerald-100"
            }`}>
              <FolderTree className={`w-8 h-8 ${isDark ? "text-emerald-400" : "text-emerald-600"}`} />
            </div>
            <h2 className={`text-3xl mb-3 ${isDark ? "text-white" : "text-gray-900"}`}>Categorización</h2>
            <p className={`leading-relaxed ${isDark ? "text-slate-400" : "text-gray-600"}`}>
              Organiza, clasifica y etiqueta las grabaciones del corpus
              de investigación
            </p>
          </Link>
        </div>

        <div className="mt-12 grid grid-cols-3 gap-4">
          <div className={`rounded-xl p-6 text-center ${
            isDark
              ? "bg-slate-900/30 border border-slate-800/50"
              : "bg-white border border-gray-200"
          }`}>
            <div className={`text-3xl mb-2 ${isDark ? "text-emerald-400" : "text-emerald-600"}`}>0</div>
            <div className={`text-sm uppercase tracking-wide ${isDark ? "text-slate-500" : "text-gray-500"}`}>Señas Capturadas</div>
          </div>
          <div className={`rounded-xl p-6 text-center ${
            isDark
              ? "bg-slate-900/30 border border-slate-800/50"
              : "bg-white border border-gray-200"
          }`}>
            <div className={`text-3xl mb-2 ${isDark ? "text-emerald-400" : "text-emerald-600"}`}>0</div>
            <div className={`text-sm uppercase tracking-wide ${isDark ? "text-slate-500" : "text-gray-500"}`}>Contribuidores</div>
          </div>
          <div className={`rounded-xl p-6 text-center ${
            isDark
              ? "bg-slate-900/30 border border-slate-800/50"
              : "bg-white border border-gray-200"
          }`}>
            <div className={`text-3xl mb-2 ${isDark ? "text-emerald-400" : "text-emerald-600"}`}>0%</div>
            <div className={`text-sm uppercase tracking-wide ${isDark ? "text-slate-500" : "text-gray-500"}`}>Progreso Corpus</div>
          </div>
        </div>
      </div>
    </div>
  );
}
