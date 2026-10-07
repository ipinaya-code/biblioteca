"use client";
import { useTheme } from "../context/ThemeContext";
import { ThemeMode, customPalettes } from "../model/theme";

export function ThemeSelector() {
  const { themeMode, setThemeMode, customPaletteIndex, setCustomPaletteIndex } = useTheme();

  return (
    <div className="theme-selector p-4 bg-white rounded-lg shadow-md">
      <h3 className="text-lg font-semibold mb-3">Personalizar tema</h3>
      
      <div className="space-y-3">
        <div>
          <label className="block text-sm font-medium mb-2">Modo de tema</label>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setThemeMode("feminine")}
              className={`px-3 py-2 rounded-md border-2 transition-all ${
                themeMode === "feminine"
                  ? "border-pink-500 bg-pink-50"
                  : "border-gray-200 hover:border-pink-300"
              }`}
              style={{
                backgroundColor: themeMode === "feminine" ? "#FCE4EC" : undefined,
                borderColor: themeMode === "feminine" ? "#E91E63" : undefined,
              }}
            >
              🌸 Femenino
            </button>
            <button
              onClick={() => setThemeMode("masculine")}
              className={`px-3 py-2 rounded-md border-2 transition-all ${
                themeMode === "masculine"
                  ? "border-blue-500 bg-blue-50"
                  : "border-gray-200 hover:border-blue-300"
              }`}
              style={{
                backgroundColor: themeMode === "masculine" ? "#E3F2FD" : undefined,
                borderColor: themeMode === "masculine" ? "#1976D2" : undefined,
              }}
            >
              💼 Masculino
            </button>
            <button
              onClick={() => setThemeMode("neutral")}
              className={`px-3 py-2 rounded-md border-2 transition-all ${
                themeMode === "neutral"
                  ? "border-gray-500 bg-gray-50"
                  : "border-gray-200 hover:border-gray-300"
              }`}
              style={{
                backgroundColor: themeMode === "neutral" ? "#F5F5F5" : undefined,
                borderColor: themeMode === "neutral" ? "#37474F" : undefined,
              }}
            >
              ⚪ Neutro
            </button>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Paleta personalizada</label>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {customPalettes.map((palette, index) => (
              <button
                key={index}
                onClick={() => {
                  setThemeMode("custom");
                  setCustomPaletteIndex(index);
                }}
                className={`h-12 rounded-md border-2 transition-all ${
                  themeMode === "custom" && customPaletteIndex === index
                    ? "border-gray-800 scale-105"
                    : "border-gray-200 hover:scale-105"
                }`}
                style={{
                  background: `linear-gradient(135deg, ${palette.primary} 0%, ${palette.secondary} 100%)`,
                }}
                title={`Paleta ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
