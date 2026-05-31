import { useState, useRef, useEffect } from "react";
import { Link } from "react-router";
import { Home, Circle, Search, Play, CheckCircle2, Database, TrendingUp } from "lucide-react";
import { ThemeToggle } from "./ThemeToggle";

interface SignVideo {
  id: string;
  name: string;
  category: string;
  videoId: string;
  samples: number;
  targetSamples: number;
}

const signDatabase: SignVideo[] = [
  { id: "hola", name: "Hola", category: "Saludos", videoId: "dQw4w9WgXcQ", samples: 500, targetSamples: 500 },
  { id: "gracias", name: "Gracias", category: "Cortesía", videoId: "dQw4w9WgXcQ", samples: 500, targetSamples: 500 },
  { id: "adios", name: "Adiós", category: "Saludos", videoId: "dQw4w9WgXcQ", samples: 500, targetSamples: 500 },
  { id: "porfavor", name: "Por favor", category: "Cortesía", videoId: "dQw4w9WgXcQ", samples: 500, targetSamples: 500 },
  { id: "familia", name: "Familia", category: "Familia", videoId: "dQw4w9WgXcQ", samples: 0, targetSamples: 500 },
  { id: "madre", name: "Madre", category: "Familia", videoId: "dQw4w9WgXcQ", samples: 500, targetSamples: 500 },
  { id: "padre", name: "Padre", category: "Familia", videoId: "dQw4w9WgXcQ", samples: 500, targetSamples: 500 },
  { id: "casa", name: "Casa", category: "Lugares", videoId: "dQw4w9WgXcQ", samples: 234, targetSamples: 500 },
  { id: "comer", name: "Comer", category: "Verbos", videoId: "dQw4w9WgXcQ", samples: 342, targetSamples: 500 },
  { id: "beber", name: "Beber", category: "Verbos", videoId: "dQw4w9WgXcQ", samples: 500, targetSamples: 500 },
  { id: "a", name: "A", category: "Abecedario", videoId: "dQw4w9WgXcQ", samples: 500, targetSamples: 500 },
  { id: "b", name: "B", category: "Abecedario", videoId: "dQw4w9WgXcQ", samples: 500, targetSamples: 500 },
  { id: "c", name: "C", category: "Abecedario", videoId: "dQw4w9WgXcQ", samples: 487, targetSamples: 500 },
  { id: "uno", name: "1 (Uno)", category: "Números", videoId: "dQw4w9WgXcQ", samples: 500, targetSamples: 500 },
  { id: "dos", name: "2 (Dos)", category: "Números", videoId: "dQw4w9WgXcQ", samples: 498, targetSamples: 500 },
  { id: "tres", name: "3 (Tres)", category: "Números", videoId: "dQw4w9WgXcQ", samples: 0, targetSamples: 500 },
  { id: "rojo", name: "Rojo", category: "Colores", videoId: "dQw4w9WgXcQ", samples: 500, targetSamples: 500 },
  { id: "azul", name: "Azul", category: "Colores", videoId: "dQw4w9WgXcQ", samples: 500, targetSamples: 500 },
  { id: "verde", name: "Verde", category: "Colores", videoId: "dQw4w9WgXcQ", samples: 378, targetSamples: 500 },
];

export function Grabadora() {
  const [isRecording, setIsRecording] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSign, setSelectedSign] = useState<SignVideo | null>(null);
  const [showResults, setShowResults] = useState(false);
  const [cameraActive, setCameraActive] = useState(false);
  const [isDark, setIsDark] = useState(true);

  const videoRef = useRef<HTMLVideoElement | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const timerRef = useRef<number | null>(null);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
      setIsDark(savedTheme === "dark");
    }
    startCamera();
    return () => {
      if (videoRef.current && videoRef.current.srcObject) {
        const tracks = (videoRef.current.srcObject as MediaStream).getTracks();
        tracks.forEach(track => track.stop());
      }
    };
  }, []);

  const toggleTheme = () => {
    const newTheme = !isDark;
    setIsDark(newTheme);
    localStorage.setItem("theme", newTheme ? "dark" : "light");
  };

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { width: 1280, height: 720 },
        audio: true
      });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        setCameraActive(true);
      }
    } catch (error) {
      console.error("Error al acceder a la cámara:", error);
    }
  };

  const startRecording = async () => {
    try {
      if (!videoRef.current || !videoRef.current.srcObject) return;

      const stream = videoRef.current.srcObject as MediaStream;
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;

      const chunks: BlobPart[] = [];
      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          chunks.push(event.data);
        }
      };

      mediaRecorder.onstop = () => {
        const blob = new Blob(chunks, { type: "video/webm" });
        console.log("Video grabado:", blob);
      };

      mediaRecorder.start();
      setIsRecording(true);

      timerRef.current = window.setInterval(() => {
        setRecordingTime((prev) => prev + 1);
      }, 1000);
    } catch (error) {
      console.error("Error al iniciar grabación:", error);
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
      setRecordingTime(0);
    }
  };

  const filteredSigns = signDatabase.filter(
    (sign) =>
      sign.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      sign.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSelectSign = (sign: SignVideo) => {
    setSelectedSign(sign);
    setSearchQuery(sign.name);
    setShowResults(false);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  return (
    <div className={`min-h-screen p-4 ${
      isDark
        ? "bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950"
        : "bg-gradient-to-br from-gray-50 via-white to-gray-100"
    }`}>
      <div className="max-w-[1800px] mx-auto">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className={`text-3xl mb-1 ${isDark ? "text-white" : "text-gray-900"}`}>Captura de Señas LSM</h1>
            <p className={`text-sm ${isDark ? "text-slate-400" : "text-gray-600"}`}>Sistema de grabación con referencia</p>
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

        <div className="grid lg:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className={`rounded-2xl overflow-hidden shadow-2xl ${
              isDark
                ? "bg-slate-900/50 backdrop-blur-sm border border-slate-800"
                : "bg-white border border-gray-200"
            }`}>
              <div className={`aspect-video relative ${isDark ? "bg-slate-950" : "bg-gray-900"}`}>
                {cameraActive ? (
                  <>
                    <video
                      ref={videoRef}
                      autoPlay
                      playsInline
                      muted
                      className="w-full h-full object-cover"
                    />
                    {isRecording && (
                      <div className="absolute top-4 left-4 flex items-center gap-2 bg-red-600 px-4 py-2 rounded-full">
                        <Circle className="w-3 h-3 fill-white animate-pulse" />
                        <span className="text-white text-sm font-mono">{formatTime(recordingTime)}</span>
                      </div>
                    )}
                  </>
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className={`text-center ${isDark ? "text-slate-600" : "text-gray-400"}`}>
                      <Circle className="w-16 h-16 mx-auto mb-3" />
                      <p>Activando cámara...</p>
                    </div>
                  </div>
                )}
              </div>

              <div className="p-6">
                {!isRecording ? (
                  <button
                    onClick={startRecording}
                    disabled={!cameraActive}
                    className="w-full py-8 bg-gradient-to-r from-red-600 to-red-500 text-white rounded-2xl shadow-2xl shadow-red-900/50 hover:from-red-500 hover:to-red-400 transition-all hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <div className="flex items-center justify-center gap-4">
                      <Circle className="w-8 h-8 fill-white" />
                      <span className="text-3xl">🔴 Iniciar Captura</span>
                    </div>
                  </button>
                ) : (
                  <button
                    onClick={stopRecording}
                    className={`w-full py-8 rounded-2xl transition-all hover:scale-[1.02] active:scale-[0.98] ${
                      isDark
                        ? "bg-slate-800 border-2 border-slate-700 text-white hover:bg-slate-700"
                        : "bg-gray-800 border-2 border-gray-700 text-white hover:bg-gray-700"
                    }`}
                  >
                    <div className="flex items-center justify-center gap-4">
                      <div className="w-6 h-6 bg-white rounded" />
                      <span className="text-2xl">Detener y Guardar</span>
                    </div>
                  </button>
                )}
              </div>
            </div>

            <div className={`rounded-xl p-4 ${
              isDark
                ? "bg-slate-900/30 border border-slate-800/50"
                : "bg-white border border-gray-200"
            }`}>
              <div className="grid grid-cols-3 gap-3 text-center">
                <div>
                  <div className={`text-xs uppercase tracking-wide mb-1 ${isDark ? "text-slate-500" : "text-gray-500"}`}>Calidad</div>
                  <div className={`text-sm ${isDark ? "text-emerald-400" : "text-emerald-600"}`}>720p HD</div>
                </div>
                <div>
                  <div className={`text-xs uppercase tracking-wide mb-1 ${isDark ? "text-slate-500" : "text-gray-500"}`}>Estado</div>
                  <div className={`text-sm ${isRecording ? "text-red-400" : isDark ? "text-slate-400" : "text-gray-600"}`}>
                    {isRecording ? "Grabando" : "Listo"}
                  </div>
                </div>
                <div>
                  <div className={`text-xs uppercase tracking-wide mb-1 ${isDark ? "text-slate-500" : "text-gray-500"}`}>Cámara</div>
                  <div className={`text-sm ${cameraActive ? isDark ? "text-emerald-400" : "text-emerald-600" : isDark ? "text-slate-400" : "text-gray-600"}`}>
                    {cameraActive ? "Activa" : "Inactiva"}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className={`rounded-2xl p-6 shadow-2xl ${
              isDark
                ? "bg-slate-900/50 backdrop-blur-sm border border-slate-800"
                : "bg-white border border-gray-200"
            }`}>
              <h2 className={`text-xl mb-4 ${isDark ? "text-white" : "text-gray-900"}`}>Video de Referencia</h2>

              <div className="relative mb-4">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    setShowResults(true);
                  }}
                  onFocus={() => setShowResults(true)}
                  placeholder="Buscar seña por nombre..."
                  className={`w-full pl-4 pr-12 py-4 rounded-full focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500/50 ${
                    isDark
                      ? "bg-slate-800 border border-slate-700 text-slate-200 placeholder:text-slate-500"
                      : "bg-gray-50 border border-gray-300 text-gray-900 placeholder:text-gray-400"
                  }`}
                />
                <div className="absolute right-2 top-1/2 -translate-y-1/2 p-2.5 bg-emerald-600 rounded-full pointer-events-none">
                  <Search className="w-5 h-5 text-white" />
                </div>

                {showResults && searchQuery && filteredSigns.length > 0 && (
                  <div className={`absolute top-full left-0 right-0 mt-2 rounded-2xl shadow-2xl z-10 max-h-64 overflow-y-auto ${
                    isDark
                      ? "bg-slate-800 border border-slate-700"
                      : "bg-white border border-gray-300"
                  }`}>
                    {filteredSigns.map((sign) => (
                      <button
                        key={sign.id}
                        onClick={() => handleSelectSign(sign)}
                        className={`w-full px-4 py-3 text-left transition-all flex items-center justify-between hover:bg-emerald-500/10 ${
                          isDark ? "hover:bg-slate-700" : "hover:bg-gray-100"
                        }`}
                      >
                        <div>
                          <div className={`text-sm ${isDark ? "text-white" : "text-gray-900"}`}>{sign.name}</div>
                          <div className={`text-xs ${isDark ? "text-slate-500" : "text-gray-500"}`}>{sign.category}</div>
                        </div>
                        {selectedSign?.id === sign.id && (
                          <CheckCircle2 className={`w-5 h-5 ${isDark ? "text-emerald-400" : "text-emerald-600"}`} />
                        )}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              <div className={`aspect-video rounded-xl overflow-hidden ${
                isDark
                  ? "bg-slate-950 border border-slate-800"
                  : "bg-gray-900 border border-gray-300"
              }`}>
                {selectedSign ? (
                  <iframe
                    src={`https://www.youtube.com/embed/${selectedSign.videoId}`}
                    title={`Video de referencia: ${selectedSign.name}`}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="w-full h-full"
                  />
                ) : (
                  <div className={`w-full h-full flex items-center justify-center ${isDark ? "text-slate-600" : "text-gray-400"}`}>
                    <div className="text-center">
                      <Search className="w-16 h-16 mx-auto mb-3" />
                      <p className="text-sm">Busca una seña para ver el video</p>
                      <p className={`text-xs mt-1 ${isDark ? "text-slate-700" : "text-gray-500"}`}>El video se mostrará automáticamente</p>
                    </div>
                  </div>
                )}
              </div>

              {selectedSign && (
                <div className="mt-4 space-y-3">
                  <div className={`p-4 rounded-xl ${
                    isDark
                      ? "bg-emerald-500/10 border border-emerald-500/20"
                      : "bg-emerald-50 border border-emerald-200"
                  }`}>
                    <div className="flex items-center gap-2 mb-1">
                      <CheckCircle2 className={`w-4 h-4 ${isDark ? "text-emerald-400" : "text-emerald-600"}`} />
                      <span className={`text-sm ${isDark ? "text-emerald-400" : "text-emerald-700"}`}>
                        Seña seleccionada
                      </span>
                    </div>
                    <div className={`text-lg ${isDark ? "text-white" : "text-gray-900"}`}>{selectedSign.name}</div>
                    <div className={`text-xs ${isDark ? "text-slate-400" : "text-gray-600"}`}>
                      Categoría: {selectedSign.category}
                    </div>
                  </div>

                  <div className={`p-4 rounded-xl border ${
                    selectedSign.samples >= selectedSign.targetSamples
                      ? isDark
                        ? "bg-emerald-500/10 border-emerald-500/20"
                        : "bg-emerald-50 border-emerald-200"
                      : selectedSign.samples > 0
                        ? isDark
                          ? "bg-yellow-500/10 border-yellow-500/20"
                          : "bg-yellow-50 border-yellow-200"
                        : isDark
                          ? "bg-slate-800/50 border-slate-700"
                          : "bg-gray-50 border-gray-200"
                  }`}>
                    <div className="flex items-center gap-2 mb-3">
                      <Database className={`w-4 h-4 ${
                        selectedSign.samples >= selectedSign.targetSamples
                          ? isDark ? "text-emerald-400" : "text-emerald-600"
                          : selectedSign.samples > 0
                            ? isDark ? "text-yellow-400" : "text-yellow-600"
                            : isDark ? "text-slate-500" : "text-gray-500"
                      }`} />
                      <span className={`text-xs uppercase tracking-wide ${
                        isDark ? "text-slate-400" : "text-gray-600"
                      }`}>
                        Estado de Recolección
                      </span>
                    </div>

                    <div className="flex items-end justify-between mb-2">
                      <div>
                        <div className={`text-xs mb-1 ${
                          isDark ? "text-slate-500" : "text-gray-500"
                        }`}>
                          Muestras recolectadas
                        </div>
                        <div className={`text-2xl tabular-nums ${
                          selectedSign.samples >= selectedSign.targetSamples
                            ? isDark ? "text-emerald-400" : "text-emerald-600"
                            : selectedSign.samples > 0
                              ? isDark ? "text-yellow-400" : "text-yellow-600"
                              : isDark ? "text-slate-500" : "text-gray-500"
                        }`}>
                          {selectedSign.samples} <span className="text-base">/ {selectedSign.targetSamples}</span>
                        </div>
                      </div>

                      <div className="text-right">
                        <div className={`flex items-center gap-1 mb-1 ${
                          selectedSign.samples >= selectedSign.targetSamples
                            ? isDark ? "text-emerald-400" : "text-emerald-600"
                            : selectedSign.samples > 0
                              ? isDark ? "text-yellow-400" : "text-yellow-600"
                              : isDark ? "text-slate-500" : "text-gray-500"
                        }`}>
                          <TrendingUp className="w-4 h-4" />
                          <span className="text-xs">Progreso</span>
                        </div>
                        <div className={`text-3xl tabular-nums ${
                          selectedSign.samples >= selectedSign.targetSamples
                            ? isDark ? "text-emerald-400" : "text-emerald-600"
                            : selectedSign.samples > 0
                              ? isDark ? "text-yellow-400" : "text-yellow-600"
                              : isDark ? "text-slate-500" : "text-gray-500"
                        }`}>
                          {Math.round((selectedSign.samples / selectedSign.targetSamples) * 100)}%
                        </div>
                      </div>
                    </div>

                    <div className={`h-2 rounded-full overflow-hidden ${
                      isDark ? "bg-slate-800" : "bg-gray-200"
                    }`}>
                      <div
                        className={`h-full transition-all duration-500 ${
                          selectedSign.samples >= selectedSign.targetSamples
                            ? "bg-gradient-to-r from-emerald-600 to-emerald-400"
                            : selectedSign.samples > 0
                              ? "bg-gradient-to-r from-yellow-600 to-yellow-400"
                              : "bg-slate-600"
                        }`}
                        style={{ width: `${Math.min((selectedSign.samples / selectedSign.targetSamples) * 100, 100)}%` }}
                      />
                    </div>

                    {selectedSign.samples >= selectedSign.targetSamples && (
                      <div className={`mt-3 text-xs text-center ${
                        isDark ? "text-emerald-400" : "text-emerald-700"
                      }`}>
                        ✓ Meta alcanzada - ¡Sigue contribuyendo!
                      </div>
                    )}

                    {selectedSign.samples > 0 && selectedSign.samples < selectedSign.targetSamples && (
                      <div className={`mt-3 text-xs text-center ${
                        isDark ? "text-yellow-400" : "text-yellow-700"
                      }`}>
                        Faltan {selectedSign.targetSamples - selectedSign.samples} muestras para completar
                      </div>
                    )}

                    {selectedSign.samples === 0 && (
                      <div className={`mt-3 text-xs text-center ${
                        isDark ? "text-slate-500" : "text-gray-600"
                      }`}>
                        ¡Sé el primero en contribuir con esta seña!
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>

            <div className={`rounded-xl p-5 ${
              isDark
                ? "bg-slate-900/30 border border-slate-800/50"
                : "bg-white border border-gray-200"
            }`}>
              <h3 className={`text-sm uppercase tracking-wide mb-3 ${isDark ? "text-slate-400" : "text-gray-600"}`}>Instrucciones</h3>
              <ul className={`space-y-2 text-sm ${isDark ? "text-slate-400" : "text-gray-600"}`}>
                <li className="flex items-start gap-2">
                  <span className={isDark ? "text-emerald-400" : "text-emerald-600"}>1.</span>
                  <span>Busca la seña que deseas grabar</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className={isDark ? "text-emerald-400" : "text-emerald-600"}>2.</span>
                  <span>El video de referencia se mostrará automáticamente</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className={isDark ? "text-emerald-400" : "text-emerald-600"}>3.</span>
                  <span>Observa cuidadosamente el movimiento</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className={isDark ? "text-emerald-400" : "text-emerald-600"}>4.</span>
                  <span>Presiona "🔴 Iniciar Captura" cuando estés listo</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className={isDark ? "text-emerald-400" : "text-emerald-600"}>5.</span>
                  <span>Realiza la seña frente a la cámara</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
