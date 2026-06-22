"use client";

import { useEffect, useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useVisualizerStore } from "@/hooks/use-visualizer";
import { Terminal } from "lucide-react";

export function ConsoleOutput() {
  const consoleLogs = useVisualizerStore((s) => s.state.console);
  const consoleRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = consoleRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [consoleLogs.length]);

  return (
    <Card className="flex flex-col min-h-[200px] lg:flex-1 lg:min-h-0">
      <CardHeader className="pb-2">
        <CardTitle>
          <Terminal className="w-4 h-4 text-muted-foreground" />
          Console
        </CardTitle>
      </CardHeader>
      <CardContent className="flex-1 min-h-0 flex flex-col pt-0">
        <div
          ref={consoleRef}
          className="rounded-md p-3 flex-1 min-h-0 overflow-auto bg-code-bg border border-code-border text-[14px]"
          style={{ fontFamily: "var(--font-mono)" }}
        >
          {consoleLogs.length === 0 ? (
            <span className="text-muted-foreground">
              // Output appears here…
            </span>
          ) : (
            consoleLogs.map((log, i) => (
              <div key={i} className="flex items-start gap-2 py-0.5">
                <span className="text-console-prompt">›</span>
                <span className="text-code-text break-all">{log}</span>
              </div>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  );
}
