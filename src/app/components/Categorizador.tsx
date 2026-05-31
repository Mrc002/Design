import { useState, useEffect } from "react";
import { Link } from "react-router";
import { Home, CheckCircle2, Circle, ChevronDown, ChevronUp } from "lucide-react";
import { ThemeToggle } from "./ThemeToggle";

interface Sign {
  id: string;
  name: string;
  recorded: boolean;
  samples: number;
  targetSamples: number;
}

interface Category {
  id: string;
  name: string;
  total: number;
  completed: number;
  signs: Sign[];
}

export function Categorizador() {
  const [isDark, setIsDark] = useState(true);
  const [categories] = useState<Category[]>([
    {
      id: "abecedario",
      name: "Abecedario",
      total: 27,
      completed: 15,
      signs: [
        { id: "a", name: "A", recorded: true, samples: 500, targetSamples: 500 },
        { id: "b", name: "B", recorded: true, samples: 500, targetSamples: 500 },
        { id: "c", name: "C", recorded: true, samples: 487, targetSamples: 500 },
        { id: "d", name: "D", recorded: false, samples: 0, targetSamples: 500 },
        { id: "e", name: "E", recorded: true, samples: 342, targetSamples: 500 },
        { id: "f", name: "F", recorded: false, samples: 0, targetSamples: 500 },
        { id: "g", name: "G", recorded: true, samples: 500, targetSamples: 500 },
        { id: "h", name: "H", recorded: false, samples: 0, targetSamples: 500 },
        { id: "i", name: "I", recorded: true, samples: 421, targetSamples: 500 },
        { id: "j", name: "J", recorded: false, samples: 0, targetSamples: 500 },
        { id: "k", name: "K", recorded: true, samples: 156, targetSamples: 500 },
        { id: "l", name: "L", recorded: true, samples: 500, targetSamples: 500 },
        { id: "m", name: "M", recorded: true, samples: 500, targetSamples: 500 },
        { id: "n", name: "N", recorded: false, samples: 0, targetSamples: 500 },
        { id: "o", name: "O", recorded: true, samples: 289, targetSamples: 500 },
        { id: "p", name: "P", recorded: true, samples: 500, targetSamples: 500 },
        { id: "q", name: "Q", recorded: false, samples: 0, targetSamples: 500 },
        { id: "r", name: "R", recorded: true, samples: 500, targetSamples: 500 },
        { id: "s", name: "S", recorded: true, samples: 478, targetSamples: 500 },
        { id: "t", name: "T", recorded: false, samples: 0, targetSamples: 500 },
        { id: "u", name: "U", recorded: true, samples: 312, targetSamples: 500 },
        { id: "v", name: "V", recorded: false, samples: 0, targetSamples: 500 },
        { id: "w", name: "W", recorded: true, samples: 500, targetSamples: 500 },
        { id: "x", name: "X", recorded: false, samples: 0, targetSamples: 500 },
        { id: "y", name: "Y", recorded: false, samples: 0, targetSamples: 500 },
        { id: "z", name: "Z", recorded: false, samples: 0, targetSamples: 500 },
        { id: "ñ", name: "Ñ", recorded: false, samples: 0, targetSamples: 500 },
      ],
    },
    {
      id: "numeros",
      name: "Números",
      total: 20,
      completed: 12,
      signs: [
        { id: "0", name: "0 (Cero)", recorded: true, samples: 500, targetSamples: 500 },
        { id: "1", name: "1 (Uno)", recorded: true, samples: 500, targetSamples: 500 },
        { id: "2", name: "2 (Dos)", recorded: true, samples: 498, targetSamples: 500 },
        { id: "3", name: "3 (Tres)", recorded: false, samples: 0, targetSamples: 500 },
        { id: "4", name: "4 (Cuatro)", recorded: true, samples: 500, targetSamples: 500 },
        { id: "5", name: "5 (Cinco)", recorded: true, samples: 456, targetSamples: 500 },
        { id: "6", name: "6 (Seis)", recorded: false, samples: 0, targetSamples: 500 },
        { id: "7", name: "7 (Siete)", recorded: true, samples: 500, targetSamples: 500 },
        { id: "8", name: "8 (Ocho)", recorded: true, samples: 389, targetSamples: 500 },
        { id: "9", name: "9 (Nueve)", recorded: false, samples: 0, targetSamples: 500 },
        { id: "10", name: "10 (Diez)", recorded: true, samples: 500, targetSamples: 500 },
        { id: "20", name: "20 (Veinte)", recorded: true, samples: 267, targetSamples: 500 },
        { id: "30", name: "30 (Treinta)", recorded: false, samples: 0, targetSamples: 500 },
        { id: "40", name: "40 (Cuarenta)", recorded: true, samples: 500, targetSamples: 500 },
        { id: "50", name: "50 (Cincuenta)", recorded: true, samples: 423, targetSamples: 500 },
        { id: "60", name: "60 (Sesenta)", recorded: false, samples: 0, targetSamples: 500 },
        { id: "70", name: "70 (Setenta)", recorded: true, samples: 178, targetSamples: 500 },
        { id: "80", name: "80 (Ochenta)", recorded: false, samples: 0, targetSamples: 500 },
        { id: "90", name: "90 (Noventa)", recorded: false, samples: 0, targetSamples: 500 },
        { id: "100", name: "100 (Cien)", recorded: false, samples: 0, targetSamples: 500 },
      ],
    },
    {
      id: "verbos",
      name: "Verbos",
      total: 30,
      completed: 8,
      signs: [
        { id: "comer", name: "Comer", recorded: true, samples: 342, targetSamples: 500 },
        { id: "beber", name: "Beber", recorded: true, samples: 500, targetSamples: 500 },
        { id: "dormir", name: "Dormir", recorded: false, samples: 0, targetSamples: 500 },
        { id: "caminar", name: "Caminar", recorded: true, samples: 234, targetSamples: 500 },
        { id: "correr", name: "Correr", recorded: false, samples: 0, targetSamples: 500 },
        { id: "estudiar", name: "Estudiar", recorded: true, samples: 500, targetSamples: 500 },
        { id: "trabajar", name: "Trabajar", recorded: true, samples: 467, targetSamples: 500 },
        { id: "hablar", name: "Hablar", recorded: false, samples: 0, targetSamples: 500 },
        { id: "escuchar", name: "Escuchar", recorded: true, samples: 189, targetSamples: 500 },
        { id: "ver", name: "Ver", recorded: false, samples: 0, targetSamples: 500 },
        { id: "leer", name: "Leer", recorded: true, samples: 500, targetSamples: 500 },
        { id: "escribir", name: "Escribir", recorded: true, samples: 298, targetSamples: 500 },
      ],
    },
    {
      id: "familia",
      name: "Familia",
      total: 15,
      completed: 10,
      signs: [
        { id: "madre", name: "Madre", recorded: true, samples: 500, targetSamples: 500 },
        { id: "padre", name: "Padre", recorded: true, samples: 500, targetSamples: 500 },
        { id: "hermano", name: "Hermano", recorded: true, samples: 456, targetSamples: 500 },
        { id: "hermana", name: "Hermana", recorded: true, samples: 489, targetSamples: 500 },
        { id: "hijo", name: "Hijo", recorded: false, samples: 0, targetSamples: 500 },
        { id: "hija", name: "Hija", recorded: false, samples: 0, targetSamples: 500 },
        { id: "abuelo", name: "Abuelo", recorded: true, samples: 500, targetSamples: 500 },
        { id: "abuela", name: "Abuela", recorded: true, samples: 500, targetSamples: 500 },
        { id: "tio", name: "Tío", recorded: true, samples: 367, targetSamples: 500 },
        { id: "tia", name: "Tía", recorded: true, samples: 412, targetSamples: 500 },
        { id: "primo", name: "Primo", recorded: false, samples: 0, targetSamples: 500 },
        { id: "prima", name: "Prima", recorded: true, samples: 234, targetSamples: 500 },
        { id: "esposo", name: "Esposo", recorded: true, samples: 500, targetSamples: 500 },
        { id: "esposa", name: "Esposa", recorded: false, samples: 0, targetSamples: 500 },
        { id: "familia", name: "Familia", recorded: false, samples: 0, targetSamples: 500 },
      ],
    },
    {
      id: "colores",
      name: "Colores",
      total: 12,
      completed: 6,
      signs: [
        { id: "rojo", name: "Rojo", recorded: true, samples: 500, targetSamples: 500 },
        { id: "azul", name: "Azul", recorded: true, samples: 500, targetSamples: 500 },
        { id: "amarillo", name: "Amarillo", recorded: false, samples: 0, targetSamples: 500 },
        { id: "verde", name: "Verde", recorded: true, samples: 378, targetSamples: 500 },
        { id: "negro", name: "Negro", recorded: false, samples: 0, targetSamples: 500 },
        { id: "blanco", name: "Blanco", recorded: true, samples: 445, targetSamples: 500 },
        { id: "naranja", name: "Naranja", recorded: false, samples: 0, targetSamples: 500 },
        { id: "morado", name: "Morado", recorded: true, samples: 500, targetSamples: 500 },
        { id: "rosa", name: "Rosa", recorded: false, samples: 0, targetSamples: 500 },
        { id: "cafe", name: "Café", recorded: true, samples: 287, targetSamples: 500 },
        { id: "gris", name: "Gris", recorded: false, samples: 0, targetSamples: 500 },
        { id: "dorado", name: "Dorado", recorded: false, samples: 0, targetSamples: 500 },
      ],
    },
    {
      id: "saludos",
      name: "Saludos",
      total: 10,
      completed: 9,
      signs: [
        { id: "hola", name: "Hola", recorded: true, samples: 500, targetSamples: 500 },
        { id: "adios", name: "Adiós", recorded: true, samples: 500, targetSamples: 500 },
        { id: "buenosdias", name: "Buenos días", recorded: true, samples: 500, targetSamples: 500 },
        { id: "buenastardes", name: "Buenas tardes", recorded: true, samples: 493, targetSamples: 500 },
        { id: "buenasnoches", name: "Buenas noches", recorded: true, samples: 487, targetSamples: 500 },
        { id: "gracias", name: "Gracias", recorded: true, samples: 500, targetSamples: 500 },
        { id: "porfavor", name: "Por favor", recorded: true, samples: 500, targetSamples: 500 },
        { id: "disculpa", name: "Disculpa", recorded: false, samples: 0, targetSamples: 500 },
        { id: "perdon", name: "Perdón", recorded: true, samples: 456, targetSamples: 500 },
        { id: "denada", name: "De nada", recorded: true, samples: 500, targetSamples: 500 },
      ],
    },
  ]);

  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

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

  const totalSigns = categories.reduce((sum, cat) => sum + cat.total, 0);
  const completedSigns = categories.reduce((sum, cat) => sum + cat.completed, 0);
  const globalProgress = Math.round((completedSigns / totalSigns) * 100);

  const toggleCategory = (categoryId: string) => {
    setSelectedCategory(selectedCategory === categoryId ? null : categoryId);
  };

  return (
    <div className={`min-h-screen p-6 ${
      isDark
        ? "bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950"
        : "bg-gradient-to-br from-gray-50 via-white to-gray-100"
    }`}>
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className={`text-4xl mb-2 ${isDark ? "text-white" : "text-gray-900"}`}>Dashboard de Progreso del Dataset</h1>
            <p className={isDark ? "text-slate-400" : "text-gray-600"}>Seguimiento de recolección LSM para IA</p>
          </div>
          <div className="flex items-center gap-3">
            <ThemeToggle isDark={isDark} onToggle={toggleTheme} />
            <Link
              to="/"
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
                isDark
                  ? "bg-slate-800 border border-slate-700 text-slate-200 hover:bg-slate-700"
                  : "bg-white border border-gray-300 text-gray-700 hover:bg-gray-50"
              }`}
            >
              <Home className="w-5 h-5" />
              Inicio
            </Link>
          </div>
        </div>

        <div className={`rounded-3xl p-10 shadow-2xl mb-8 ${
          isDark
            ? "bg-slate-900/50 backdrop-blur-sm border border-slate-800"
            : "bg-white border border-gray-200"
        }`}>
          <div className="text-center mb-6">
            <h2 className={`text-2xl mb-2 ${isDark ? "text-white" : "text-gray-900"}`}>Progreso Global del Dataset</h2>
            <p className={isDark ? "text-slate-400" : "text-gray-600"}>Señas completadas del corpus total</p>
          </div>

          <div className="flex items-center justify-center mb-8">
            <div className="relative w-64 h-64">
              <svg className="transform -rotate-90 w-64 h-64">
                <circle
                  cx="128"
                  cy="128"
                  r="112"
                  stroke="currentColor"
                  strokeWidth="16"
                  fill="none"
                  className={isDark ? "text-slate-800" : "text-gray-200"}
                />
                <circle
                  cx="128"
                  cy="128"
                  r="112"
                  stroke="currentColor"
                  strokeWidth="16"
                  fill="none"
                  strokeDasharray={`${2 * Math.PI * 112}`}
                  strokeDashoffset={`${2 * Math.PI * 112 * (1 - globalProgress / 100)}`}
                  className={`transition-all duration-1000 ${isDark ? "text-emerald-400" : "text-emerald-600"}`}
                  strokeLinecap="round"
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center flex-col">
                <div className={`text-6xl mb-2 ${isDark ? "text-emerald-400" : "text-emerald-600"}`}>{globalProgress}%</div>
                <div className={`text-sm ${isDark ? "text-slate-400" : "text-gray-600"}`}>
                  {completedSigns} / {totalSigns}
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div className={`rounded-xl p-4 text-center ${
              isDark
                ? "bg-slate-800/30 border border-slate-700/50"
                : "bg-gray-50 border border-gray-200"
            }`}>
              <div className={`text-3xl mb-1 ${isDark ? "text-white" : "text-gray-900"}`}>{categories.length}</div>
              <div className={`text-sm uppercase tracking-wide ${isDark ? "text-slate-500" : "text-gray-500"}`}>Categorías</div>
            </div>
            <div className={`rounded-xl p-4 text-center ${
              isDark
                ? "bg-slate-800/30 border border-slate-700/50"
                : "bg-gray-50 border border-gray-200"
            }`}>
              <div className={`text-3xl mb-1 ${isDark ? "text-emerald-400" : "text-emerald-600"}`}>{completedSigns}</div>
              <div className={`text-sm uppercase tracking-wide ${isDark ? "text-slate-500" : "text-gray-500"}`}>Completadas</div>
            </div>
            <div className={`rounded-xl p-4 text-center ${
              isDark
                ? "bg-slate-800/30 border border-slate-700/50"
                : "bg-gray-50 border border-gray-200"
            }`}>
              <div className={`text-3xl mb-1 ${isDark ? "text-slate-400" : "text-gray-600"}`}>{totalSigns - completedSigns}</div>
              <div className={`text-sm uppercase tracking-wide ${isDark ? "text-slate-500" : "text-gray-500"}`}>Pendientes</div>
            </div>
          </div>
        </div>

        <div className="mb-6">
          <h2 className={`text-2xl mb-4 ${isDark ? "text-white" : "text-gray-900"}`}>Progreso por Categorías</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.map((category) => {
              const percentage = Math.round((category.completed / category.total) * 100);
              const isSelected = selectedCategory === category.id;

              return (
                <div
                  key={category.id}
                  className={`rounded-2xl p-6 hover:border-emerald-500/30 transition-all cursor-pointer ${
                    isDark
                      ? "bg-slate-900/50 backdrop-blur-sm border border-slate-800"
                      : "bg-white border border-gray-200"
                  }`}
                  onClick={() => toggleCategory(category.id)}
                >
                  <div className="flex items-center justify-between mb-4">
                    <h3 className={`text-xl ${isDark ? "text-white" : "text-gray-900"}`}>{category.name}</h3>
                    {isSelected ? (
                      <ChevronUp className={`w-5 h-5 ${isDark ? "text-emerald-400" : "text-emerald-600"}`} />
                    ) : (
                      <ChevronDown className={`w-5 h-5 ${isDark ? "text-slate-400" : "text-gray-400"}`} />
                    )}
                  </div>

                  <div className="mb-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className={`text-sm ${isDark ? "text-slate-400" : "text-gray-600"}`}>Progreso</span>
                      <span className={`text-sm ${isDark ? "text-emerald-400" : "text-emerald-600"}`}>{percentage}%</span>
                    </div>
                    <div className={`h-3 rounded-full overflow-hidden ${isDark ? "bg-slate-800" : "bg-gray-200"}`}>
                      <div
                        className="h-full bg-gradient-to-r from-emerald-600 to-emerald-400 transition-all duration-500"
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className={`text-2xl ${isDark ? "text-white" : "text-gray-900"}`}>
                      {category.completed}/{category.total}
                    </span>
                    <span className={`text-sm uppercase tracking-wide ${isDark ? "text-slate-500" : "text-gray-500"}`}>Señas</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {selectedCategory && (
          <div className={`rounded-2xl p-8 shadow-2xl ${
            isDark
              ? "bg-slate-900/50 backdrop-blur-sm border border-slate-800"
              : "bg-white border border-gray-200"
          }`}>
            <h2 className={`text-2xl mb-6 ${isDark ? "text-white" : "text-gray-900"}`}>
              Detalle de Muestreo: {categories.find((c) => c.id === selectedCategory)?.name}
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {categories
                .find((c) => c.id === selectedCategory)
                ?.signs.map((sign) => {
                  const percentage = Math.round((sign.samples / sign.targetSamples) * 100);
                  const isComplete = sign.samples >= sign.targetSamples;
                  const isInProgress = sign.samples > 0 && sign.samples < sign.targetSamples;

                  return (
                    <Link
                      key={sign.id}
                      to={`/sign/${sign.id}`}
                      className={`p-5 rounded-xl border transition-all hover:scale-105 cursor-pointer ${
                        isComplete
                          ? isDark
                            ? "bg-emerald-500/10 border-emerald-500/30 hover:border-emerald-500/50"
                            : "bg-emerald-50 border-emerald-300 hover:border-emerald-400"
                          : isInProgress
                            ? isDark
                              ? "bg-yellow-500/10 border-yellow-500/30 hover:border-yellow-500/50"
                              : "bg-yellow-50 border-yellow-300 hover:border-yellow-400"
                            : isDark
                              ? "bg-slate-800/30 border-slate-700/50 hover:border-slate-600"
                              : "bg-gray-50 border-gray-200 hover:border-gray-300"
                      }`}
                    >
                      <div className="mb-3">
                        <h3 className={`text-lg mb-1 ${
                          isComplete
                            ? isDark ? "text-emerald-400" : "text-emerald-700"
                            : isInProgress
                              ? isDark ? "text-yellow-400" : "text-yellow-700"
                              : isDark ? "text-slate-400" : "text-gray-600"
                        }`}>
                          {sign.name}
                        </h3>
                        <div className={`text-2xl tabular-nums ${
                          isComplete
                            ? isDark ? "text-emerald-400" : "text-emerald-600"
                            : isInProgress
                              ? isDark ? "text-yellow-400" : "text-yellow-600"
                              : isDark ? "text-slate-600" : "text-gray-400"
                        }`}>
                          {sign.samples} / {sign.targetSamples}
                        </div>
                        <div className={`text-xs uppercase tracking-wide ${
                          isDark ? "text-slate-500" : "text-gray-500"
                        }`}>
                          muestras
                        </div>
                      </div>

                      <div className={`h-2 rounded-full overflow-hidden mb-2 ${
                        isDark ? "bg-slate-800" : "bg-gray-200"
                      }`}>
                        <div
                          className={`h-full transition-all duration-500 ${
                            isComplete
                              ? "bg-gradient-to-r from-emerald-600 to-emerald-400"
                              : isInProgress
                                ? "bg-gradient-to-r from-yellow-600 to-yellow-400"
                                : "bg-slate-600"
                          }`}
                          style={{ width: `${percentage}%` }}
                        />
                      </div>

                      <div className="flex items-center justify-between">
                        <span className={`text-xs ${
                          isDark ? "text-slate-500" : "text-gray-500"
                        }`}>
                          Progreso
                        </span>
                        <span className={`text-sm ${
                          isComplete
                            ? isDark ? "text-emerald-400" : "text-emerald-600"
                            : isInProgress
                              ? isDark ? "text-yellow-400" : "text-yellow-600"
                              : isDark ? "text-slate-600" : "text-gray-400"
                        }`}>
                          {percentage}%
                        </span>
                      </div>
                    </Link>
                  );
                })}
            </div>

            <div className={`mt-6 pt-6 border-t ${isDark ? "border-slate-800" : "border-gray-200"}`}>
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <div className={`text-xs uppercase tracking-wide mb-1 ${
                    isDark ? "text-slate-500" : "text-gray-500"
                  }`}>
                    Completas
                  </div>
                  <div className={`text-2xl ${isDark ? "text-emerald-400" : "text-emerald-600"}`}>
                    {categories.find((c) => c.id === selectedCategory)?.signs.filter(s => s.samples >= s.targetSamples).length}
                  </div>
                </div>
                <div>
                  <div className={`text-xs uppercase tracking-wide mb-1 ${
                    isDark ? "text-slate-500" : "text-gray-500"
                  }`}>
                    En Proceso
                  </div>
                  <div className={`text-2xl ${isDark ? "text-yellow-400" : "text-yellow-600"}`}>
                    {categories.find((c) => c.id === selectedCategory)?.signs.filter(s => s.samples > 0 && s.samples < s.targetSamples).length}
                  </div>
                </div>
                <div>
                  <div className={`text-xs uppercase tracking-wide mb-1 ${
                    isDark ? "text-slate-500" : "text-gray-500"
                  }`}>
                    Sin Iniciar
                  </div>
                  <div className={`text-2xl ${isDark ? "text-slate-400" : "text-gray-600"}`}>
                    {categories.find((c) => c.id === selectedCategory)?.signs.filter(s => s.samples === 0).length}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
