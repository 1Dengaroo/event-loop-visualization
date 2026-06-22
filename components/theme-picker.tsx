"use client";

import { useEffect, useState } from "react";
import { useTheme } from "@/lib/theme/use-theme";
import { Button } from "@/components/ui/button";
import { Sun, Moon } from "lucide-react";

export function ThemePicker() {
  const { isDark, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  return (
    <Button
      variant="outline"
      size="icon"
      aria-label="Toggle theme"
      onClick={() => setTheme(isDark ? "light" : "dark")}
    >
      {mounted && isDark ? (
        <Sun className="w-4 h-4" />
      ) : (
        <Moon className="w-4 h-4" />
      )}
    </Button>
  );
}
