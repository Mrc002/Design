import { useState, useEffect } from "react";
import { Link, useParams } from "react-router";
import { Home, Play, Users, Camera, TrendingUp, AlertCircle, CheckCircle2 } from "lucide-react";
import { ThemeToggle } from "./ThemeToggle";

interface SignDetailData {
  id: string;
  name: string;
  category: string;
  videoId: string;
  totalSamples: number;
  targetSamples: number;
  perspectiveDistribution: {
    horizontalAngle: {
      frontal: number;
      lateralRight: number;
      lateralLeft: number;
    };
    height: {
      eyeLevel: number;
      highAngle: number;
      lowAngle: number;
    };
    distance: {
      closeUp: number;
      mediumShot: number;
    };
  };
  uniqueVolunteers: number;
  userContribution: {
    current: number;
    max: number;
  };
}

const signData: { [key: string]: SignDetailData } = {
  comer: {
    id: "comer",
    name: "Comer",
    category: "Verbos",
    videoId: "dQw4w9WgXcQ",
    totalSamples: 342,
    targetSamples: 500,
    perspectiveDistribution: {
      horizontalAngle: {
        frontal: 156,
        lateralRight: 98,
        lateralLeft: 88,
      },
      height: {
        eyeLevel: 198,
        highAngle: 89,
        lowAngle: 55,
      },
      distance: {
        closeUp: 189,
        mediumShot: 153,
      },
    },
    uniqueVolunteers: 45,
    userContribution: {
      current: 2,
      max: 5,
    },
  },
  hola: {
    id: "hola",
    name: "Hola",
    category: "Saludos",
    videoId: "dQw4w9WgXcQ",
    totalSamples: 500,
    targetSamples: 500,
    perspectiveDistribution: {
      horizontalAngle: {
        frontal: 234,
        lateralRight: 145,
        lateralLeft: 121,
      },
      height: {
        eyeLevel: 289,
        highAngle: 123,
        lowAngle: 88,
      },
      distance: {
        closeUp: 267,
        mediumShot: 233,
      },
    },
    uniqueVolunteers: 78,
    userContribution: {
      current: 5,
      max: 5,
    },
  },
  casa: {
    id: "casa",
    name: "Casa",
    category: "Lugares",
    videoId: "dQw4w9WgXcQ",
    totalSamples: 234,
    targetSamples: 500,
    perspectiveDistribution: {
      horizontalAngle: {
        frontal: 112,
        lateralRight: 67,
        lateralLeft: 55,
      },
      height: {
        eyeLevel: 134,
        highAngle: 56,
        lowAngle: 44,
      },
      distance: {
        closeUp: 123,
        mediumShot: 111,
      },
    },
    uniqueVolunteers: 32,
    userContribution: {
      current: 0,
      max: 5,
    },
  },
};

export function SignDetail() {
  const { signId } = useParams<{ signId: string }>();
  const [isDark, setIsDark] = useState(true);

  const sign = signId ? signData[signId] : signData.comer;

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

  if (!sign) {
    return <div>Seña no encontrada</div>;
  }

  const userPercentage = Math.round((sign.userContribution.current / sign.userContribution.max) * 100);

  const totalHorizontalSamples = sign.perspectiveDistribution.horizontalAngle.frontal +
    sign.perspectiveDistribution.horizontalAngle.lateralRight +
    sign.perspectiveDistribution.horizontalAngle.lateralLeft;

  const totalHeightSamples = sign.perspectiveDistribution.height.eyeLevel +
    sign.perspectiveDistribution.height.highAngle +
    sign.perspectiveDistribution.height.lowAngle;

  const totalDistanceSamples = sign.perspectiveDistribution.distance.closeUp +
    sign.perspectiveDistribution.distance.mediumShot;

  return (
    <div className={`min-h-screen p-6 ${
      isDark
        ? "bg-[#0B1121]"
        : "bg-gradient-to-br from-gray-50 via-white to-gray-100"
    }`}>
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div className="flex-1">
            <h1 className={`text-5xl mb-3 ${isDark ? "text-white" : "text-gray-900"}`}>
              Expediente: {sign.name}
            </h1>
            <p className={`text-sm mb-3 ${isDark ? "text-slate-400" : "text-gray-600"}`}>
              Categoría: <span className={isDark ? "text-emerald-400" : "text-emerald-600"}>{sign.category}</span>
            </p>

            <div className="max-w-lg">
              <div className="flex items-center justify-between mb-2">
                <span className={`text-sm ${isDark ? "text-slate-400" : "text-gray-600"}`}>
                  Progreso General
                </span>
                <span className={`text-2xl tabular-nums ${
                  sign.totalSamples >= sign.targetSamples
                    ? isDark ? "text-emerald-400" : "text-emerald-600"
                    : isDark ? "text-yellow-400" : "text-yellow-600"
                }`}>
                  {sign.totalSamples} / {sign.targetSamples}
                </span>
              </div>
              <div className={`h-3 rounded-full overflow-hidden ${
                isDark ? "bg-[#111827]" : "bg-gray-200"
              }`}>
                <div
                  className={`h-full transition-all duration-500 ${
                    sign.totalSamples >= sign.targetSamples
                      ? "bg-gradient-to-r from-emerald-600 to-emerald-400"
                      : "bg-gradient-to-r from-yellow-600 to-yellow-400"
                  }`}
                  style={{ width: `${Math.min((sign.totalSamples / sign.targetSamples) * 100, 100)}%` }}
                />
              </div>
              <div className={`text-xs mt-1 ${isDark ? "text-slate-500" : "text-gray-500"}`}>
                {Math.round((sign.totalSamples / sign.targetSamples) * 100)}% completado
              </div>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className={`rounded-2xl p-4 w-80 ${
              isDark
                ? "bg-[#111827] border border-slate-800"
                : "bg-white border border-gray-200"
            }`}>
              <div className="flex items-center gap-2 mb-2">
                <Play className={`w-4 h-4 ${isDark ? "text-slate-400" : "text-gray-600"}`} />
                <span className={`text-xs uppercase tracking-wide ${
                  isDark ? "text-slate-400" : "text-gray-600"
                }`}>
                  Video de Referencia
                </span>
              </div>
              <div className={`aspect-video rounded-lg overflow-hidden ${
                isDark
                  ? "bg-slate-950 border border-slate-800"
                  : "bg-gray-900 border border-gray-300"
              }`}>
                <iframe
                  src={`https://www.youtube.com/embed/${sign.videoId}`}
                  title={`Video de referencia: ${sign.name}`}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="w-full h-full"
                />
              </div>
            </div>

            <div className="flex flex-col gap-3">
              <ThemeToggle isDark={isDark} onToggle={toggleTheme} />
              <Link
                to="/categorizar"
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
                  isDark
                    ? "bg-[#111827] border border-slate-800 text-slate-200 hover:bg-slate-800"
                    : "bg-white border border-gray-300 text-gray-700 hover:bg-gray-50"
                }`}
              >
                <Home className="w-5 h-5" />
                Dashboard
              </Link>
            </div>
          </div>
        </div>

        <div className="mb-6 mt-12">
          <div className="flex items-center gap-3 mb-2">
            <AlertCircle className={`w-7 h-7 ${isDark ? "text-emerald-400" : "text-emerald-600"}`} />
            <h2 className={`text-3xl ${isDark ? "text-white" : "text-gray-900"}`}>
              Panel de Auditoría de Sesgo
            </h2>
          </div>
          <p className={`text-sm ${isDark ? "text-slate-500" : "text-gray-600"}`}>
            Métricas de calidad para garantizar un dataset diverso y equilibrado
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          <div className={`rounded-2xl p-6 ${
            isDark
              ? "bg-[#111827] border border-slate-800"
              : "bg-white border border-gray-200"
          }`}>
            <div className="flex items-center gap-2 mb-6">
              <Camera className={`w-5 h-5 ${isDark ? "text-emerald-400" : "text-emerald-600"}`} />
              <h3 className={`text-lg ${isDark ? "text-white" : "text-gray-900"}`}>
                Análisis de Perspectiva y Encuadre
              </h3>
            </div>

            <div className="space-y-6">
              <div>
                <div className={`text-xs uppercase tracking-wide mb-3 ${
                  isDark ? "text-slate-400" : "text-gray-600"
                }`}>
                  Ángulo Horizontal
                </div>
                <div className="space-y-2.5">
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <span className={`text-sm ${isDark ? "text-slate-300" : "text-gray-700"}`}>
                        Frontal (0°)
                      </span>
                      <span className={`text-sm tabular-nums ${isDark ? "text-emerald-400" : "text-emerald-600"}`}>
                        {sign.perspectiveDistribution.horizontalAngle.frontal}
                      </span>
                    </div>
                    <div className={`h-1.5 rounded-full overflow-hidden ${
                      isDark ? "bg-slate-800" : "bg-gray-200"
                    }`}>
                      <div
                        className="h-full bg-emerald-500 transition-all duration-500"
                        style={{ width: `${(sign.perspectiveDistribution.horizontalAngle.frontal / totalHorizontalSamples) * 100}%` }}
                      />
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <span className={`text-sm ${isDark ? "text-slate-300" : "text-gray-700"}`}>
                        Lateral Der (45°)
                      </span>
                      <span className={`text-sm tabular-nums ${isDark ? "text-yellow-400" : "text-yellow-600"}`}>
                        {sign.perspectiveDistribution.horizontalAngle.lateralRight}
                      </span>
                    </div>
                    <div className={`h-1.5 rounded-full overflow-hidden ${
                      isDark ? "bg-slate-800" : "bg-gray-200"
                    }`}>
                      <div
                        className="h-full bg-yellow-500 transition-all duration-500"
                        style={{ width: `${(sign.perspectiveDistribution.horizontalAngle.lateralRight / totalHorizontalSamples) * 100}%` }}
                      />
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <span className={`text-sm ${isDark ? "text-slate-300" : "text-gray-700"}`}>
                        Lateral Izq (-45°)
                      </span>
                      <span className={`text-sm tabular-nums ${isDark ? "text-yellow-400" : "text-yellow-600"}`}>
                        {sign.perspectiveDistribution.horizontalAngle.lateralLeft}
                      </span>
                    </div>
                    <div className={`h-1.5 rounded-full overflow-hidden ${
                      isDark ? "bg-slate-800" : "bg-gray-200"
                    }`}>
                      <div
                        className="h-full bg-yellow-500 transition-all duration-500"
                        style={{ width: `${(sign.perspectiveDistribution.horizontalAngle.lateralLeft / totalHorizontalSamples) * 100}%` }}
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <div className={`text-xs uppercase tracking-wide mb-3 ${
                  isDark ? "text-slate-400" : "text-gray-600"
                }`}>
                  Altura
                </div>
                <div className="space-y-2.5">
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <span className={`text-sm ${isDark ? "text-slate-300" : "text-gray-700"}`}>
                        Nivel de ojos
                      </span>
                      <span className={`text-sm tabular-nums ${isDark ? "text-emerald-400" : "text-emerald-600"}`}>
                        {sign.perspectiveDistribution.height.eyeLevel}
                      </span>
                    </div>
                    <div className={`h-1.5 rounded-full overflow-hidden ${
                      isDark ? "bg-slate-800" : "bg-gray-200"
                    }`}>
                      <div
                        className="h-full bg-emerald-500 transition-all duration-500"
                        style={{ width: `${(sign.perspectiveDistribution.height.eyeLevel / totalHeightSamples) * 100}%` }}
                      />
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <span className={`text-sm ${isDark ? "text-slate-300" : "text-gray-700"}`}>
                        Picado
                      </span>
                      <span className={`text-sm tabular-nums ${isDark ? "text-slate-400" : "text-gray-600"}`}>
                        {sign.perspectiveDistribution.height.highAngle}
                      </span>
                    </div>
                    <div className={`h-1.5 rounded-full overflow-hidden ${
                      isDark ? "bg-slate-800" : "bg-gray-200"
                    }`}>
                      <div
                        className="h-full bg-slate-500 transition-all duration-500"
                        style={{ width: `${(sign.perspectiveDistribution.height.highAngle / totalHeightSamples) * 100}%` }}
                      />
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <span className={`text-sm ${isDark ? "text-slate-300" : "text-gray-700"}`}>
                        Contrapicado
                      </span>
                      <span className={`text-sm tabular-nums ${isDark ? "text-slate-400" : "text-gray-600"}`}>
                        {sign.perspectiveDistribution.height.lowAngle}
                      </span>
                    </div>
                    <div className={`h-1.5 rounded-full overflow-hidden ${
                      isDark ? "bg-slate-800" : "bg-gray-200"
                    }`}>
                      <div
                        className="h-full bg-slate-500 transition-all duration-500"
                        style={{ width: `${(sign.perspectiveDistribution.height.lowAngle / totalHeightSamples) * 100}%` }}
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <div className={`text-xs uppercase tracking-wide mb-3 ${
                  isDark ? "text-slate-400" : "text-gray-600"
                }`}>
                  Distancia
                </div>
                <div className="space-y-2.5">
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <span className={`text-sm ${isDark ? "text-slate-300" : "text-gray-700"}`}>
                        Close-up
                      </span>
                      <span className={`text-sm tabular-nums ${isDark ? "text-emerald-400" : "text-emerald-600"}`}>
                        {sign.perspectiveDistribution.distance.closeUp}
                      </span>
                    </div>
                    <div className={`h-1.5 rounded-full overflow-hidden ${
                      isDark ? "bg-slate-800" : "bg-gray-200"
                    }`}>
                      <div
                        className="h-full bg-emerald-500 transition-all duration-500"
                        style={{ width: `${(sign.perspectiveDistribution.distance.closeUp / totalDistanceSamples) * 100}%` }}
                      />
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <span className={`text-sm ${isDark ? "text-slate-300" : "text-gray-700"}`}>
                        Plano Medio
                      </span>
                      <span className={`text-sm tabular-nums ${isDark ? "text-yellow-400" : "text-yellow-600"}`}>
                        {sign.perspectiveDistribution.distance.mediumShot}
                      </span>
                    </div>
                    <div className={`h-1.5 rounded-full overflow-hidden ${
                      isDark ? "bg-slate-800" : "bg-gray-200"
                    }`}>
                      <div
                        className="h-full bg-yellow-500 transition-all duration-500"
                        style={{ width: `${(sign.perspectiveDistribution.distance.mediumShot / totalDistanceSamples) * 100}%` }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className={`rounded-2xl p-6 ${
            isDark
              ? "bg-[#111827] border border-slate-800"
              : "bg-white border border-gray-200"
          }`}>
            <div className="flex items-center gap-2 mb-6">
              <Users className={`w-5 h-5 ${isDark ? "text-emerald-400" : "text-emerald-600"}`} />
              <h3 className={`text-lg ${isDark ? "text-white" : "text-gray-900"}`}>
                Diversidad Demográfica
              </h3>
            </div>

            <div className="text-center py-10">
              <div className={`text-8xl mb-4 ${isDark ? "text-emerald-400" : "text-emerald-600"}`}>
                {sign.uniqueVolunteers}
              </div>
              <div className={`text-sm uppercase tracking-wide mb-8 ${
                isDark ? "text-slate-400" : "text-gray-600"
              }`}>
                Voluntarios Únicos
              </div>

              <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full ${
                isDark
                  ? "bg-emerald-500/10 border border-emerald-500/30"
                  : "bg-emerald-50 border border-emerald-200"
              }`}>
                <CheckCircle2 className={`w-4 h-4 ${isDark ? "text-emerald-400" : "text-emerald-600"}`} />
                <span className={`text-sm ${isDark ? "text-emerald-400" : "text-emerald-700"}`}>
                  Excelente diversidad
                </span>
              </div>
            </div>

            <div className={`p-4 rounded-xl ${
              isDark
                ? "bg-slate-800/50 border border-slate-700/50"
                : "bg-gray-50 border border-gray-200"
            }`}>
              <p className={`text-sm text-center ${isDark ? "text-slate-400" : "text-gray-600"}`}>
                <strong className={isDark ? "text-white" : "text-gray-900"}>{sign.uniqueVolunteers}</strong> personas distintas han contribuido con esta seña
              </p>
            </div>
          </div>

          <div className={`rounded-2xl p-6 ${
            isDark
              ? "bg-[#111827] border border-slate-800"
              : "bg-white border border-gray-200"
          }`}>
            <div className="flex items-center gap-2 mb-6">
              <TrendingUp className={`w-5 h-5 ${isDark ? "text-emerald-400" : "text-emerald-600"}`} />
              <h3 className={`text-lg ${isDark ? "text-white" : "text-gray-900"}`}>
                Límite Individual
              </h3>
            </div>

            <div className="mb-6">
              <div className={`text-sm mb-3 ${isDark ? "text-slate-400" : "text-gray-600"}`}>
                Tu aportación
              </div>
              <div className="flex items-end gap-3 mb-6">
                <div className={`text-6xl tabular-nums ${
                  sign.userContribution.current >= sign.userContribution.max
                    ? isDark ? "text-yellow-400" : "text-yellow-600"
                    : isDark ? "text-emerald-400" : "text-emerald-600"
                }`}>
                  {sign.userContribution.current}
                </div>
                <div className={`text-3xl mb-2 ${isDark ? "text-slate-500" : "text-gray-500"}`}>
                  / {sign.userContribution.max}
                </div>
                <div className={`text-sm mb-2 ${isDark ? "text-slate-500" : "text-gray-500"}`}>
                  muestras
                </div>
              </div>

              <div className={`h-3 rounded-full overflow-hidden mb-3 ${
                isDark ? "bg-slate-800" : "bg-gray-200"
              }`}>
                <div
                  className={`h-full transition-all duration-500 ${
                    userPercentage >= 100
                      ? "bg-gradient-to-r from-yellow-600 to-yellow-400"
                      : "bg-gradient-to-r from-emerald-600 to-emerald-400"
                  }`}
                  style={{ width: `${userPercentage}%` }}
                />
              </div>

              <div className="flex items-center justify-between">
                <span className={`text-xs uppercase tracking-wide ${isDark ? "text-slate-500" : "text-gray-500"}`}>
                  Progreso Individual
                </span>
                <span className={`text-lg tabular-nums ${
                  userPercentage >= 100
                    ? isDark ? "text-yellow-400" : "text-yellow-600"
                    : isDark ? "text-emerald-400" : "text-emerald-600"
                }`}>
                  {userPercentage}%
                </span>
              </div>
            </div>

            {sign.userContribution.current >= sign.userContribution.max ? (
              <div className={`p-4 rounded-xl ${
                isDark
                  ? "bg-yellow-500/10 border border-yellow-500/20"
                  : "bg-yellow-50 border border-yellow-200"
              }`}>
                <p className={`text-sm text-center ${isDark ? "text-yellow-400" : "text-yellow-700"}`}>
                  ⚠️ Has alcanzado el límite máximo para prevenir monopolización de datos
                </p>
              </div>
            ) : sign.userContribution.current > 0 ? (
              <div className={`p-4 rounded-xl ${
                isDark
                  ? "bg-emerald-500/10 border border-emerald-500/20"
                  : "bg-emerald-50 border border-emerald-200"
              }`}>
                <p className={`text-sm text-center ${isDark ? "text-emerald-400" : "text-emerald-700"}`}>
                  Puedes aportar <strong>{sign.userContribution.max - sign.userContribution.current}</strong> muestras más
                </p>
              </div>
            ) : (
              <div className={`p-4 rounded-xl ${
                isDark
                  ? "bg-slate-800/50 border border-slate-700/50"
                  : "bg-gray-50 border border-gray-200"
              }`}>
                <p className={`text-sm text-center ${isDark ? "text-slate-400" : "text-gray-600"}`}>
                  Aún no has contribuido con esta seña
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
