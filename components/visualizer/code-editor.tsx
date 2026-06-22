"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useVisualizerStore, CODE_EXAMPLES } from "@/hooks/use-visualizer";
import { Play, RotateCcw } from "lucide-react";
import { HighlightedEditor } from "./highlighted-editor";

export function CodeEditor() {
  const code = useVisualizerStore((s) => s.code);
  const setCode = useVisualizerStore((s) => s.setCode);
  const parseCode = useVisualizerStore((s) => s.parseCode);
  const reset = useVisualizerStore((s) => s.reset);
  const isRunning = useVisualizerStore((s) => s.state.isRunning);
  const currentStepData = useVisualizerStore((s) => s.currentStepData);

  const highlightRange =
    isRunning && currentStepData && "ast" in currentStepData
      ? { start: currentStepData.ast.start, end: currentStepData.ast.end }
      : null;

  return (
    <Card className="flex flex-col min-h-[360px] lg:flex-1 lg:min-h-0">
      <CardContent className="flex-1 min-h-0 flex flex-col gap-3 p-3">
        <div className="rounded-md overflow-hidden bg-code-bg border border-code-border flex-1 flex flex-col min-h-0">
          <div className="px-3 py-2 border-b border-code-header-border flex items-center gap-2">
            <span
              className="text-muted-foreground text-xs"
              style={{ fontFamily: "var(--font-mono)" }}
            >
              script.js
            </span>
            <Select
              disabled={isRunning}
              onValueChange={(value) => {
                const example = CODE_EXAMPLES.find((e) => e.name === value);
                if (example) setCode(example.code);
              }}
            >
              <SelectTrigger
                size="sm"
                className="ml-auto h-7 px-2.5 gap-1.5 text-xs font-medium"
              >
                <SelectValue placeholder="Examples" />
              </SelectTrigger>
              <SelectContent>
                {CODE_EXAMPLES.map((example) => (
                  <SelectItem key={example.name} value={example.name}>
                    {example.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <HighlightedEditor
            value={code}
            onChange={setCode}
            highlightRange={highlightRange}
            readOnly={isRunning}
          />
        </div>

        <div className="flex gap-2 shrink-0">
          <Button
            onClick={parseCode}
            variant="primary"
            disabled={isRunning}
            className="flex-1"
          >
            {isRunning ? (
              <span className="flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse [animation-delay:0.2s]" />
                <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse [animation-delay:0.4s]" />
              </span>
            ) : (
              <>
                <Play className="w-4 h-4 mr-1.5" />
                Run
              </>
            )}
          </Button>
          <Button variant="outline" onClick={reset}>
            <RotateCcw className="w-4 h-4 mr-1.5" />
            Reset
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
