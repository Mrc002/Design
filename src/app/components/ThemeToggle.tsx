import { Sun, Moon } from "lucide-react";

interface ThemeToggleProps {
  isDark: boolean;
  onToggle: () => void;
}

export function ThemeToggle({ isDark, onToggle }: ThemeToggleProps) {
  return (
    <button
      onClick={onToggle}
      className={`relative flex items-center gap-2 px-4 py-2 rounded-full transition-all border ${
        isDark
          ? "bg-slate-800 border-slate-700 text-slate-200 hover:bg-slate-700"
          : "bg-white border-gray-300 text-gray-700 hover:bg-gray-50"
      }`}
      aria-label="Cambiar tema"
    >
      <div className="relative w-12 h-6">
        <div
          className={`absolute inset-0 rounded-full transition-colors ${
            isDark ? "bg-slate-700" : "bg-gray-200"
          }`}
        />
        <div
          className={`absolute top-1 w-4 h-4 rounded-full transition-all ${
            isDark
              ? "left-7 bg-emerald-400"
              : "left-1 bg-yellow-400"
          }`}
        />
      </div>
      {isDark ? (
        <Moon className="w-4 h-4 text-slate-400" />
      ) : (
        <Sun className="w-4 h-4 text-yellow-500" />
      )}
    </button>
  );
}
