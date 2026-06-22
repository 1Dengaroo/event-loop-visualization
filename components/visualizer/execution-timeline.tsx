"use client";

import { useEffect, useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useVisualizerStore } from "@/hooks/use-visualizer";

export function ExecutionTimeline() {
  const state = useVisualizerStore((s) => s.state);
  const steps = useVisualizerStore((s) => s.steps);
  const timelineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const viewport = timelineRef.current?.querySelector(
      "[data-slot='scroll-area-viewport']",
    ) as HTMLElement | null;
    if (viewport) viewport.scrollTop = viewport.scrollHeight;
  }, [state.currentStep]);

  return (
    <Card className="flex flex-col min-h-[200px] lg:flex-1 lg:min-h-0">
      <CardHeader className="pb-2">
        <CardTitle className="justify-between">
          <span>Timeline</span>
          <span className="text-xs font-normal text-muted-foreground tabular-nums">
            {state.currentStep} executed
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent className="flex-1 min-h-0 flex flex-col pt-0">
        <ScrollArea ref={timelineRef} className="flex-1 min-h-0 -mr-2 pr-2">
          {state.currentStep === 0 ? (
            <div className="flex items-center justify-center h-full min-h-[80px] text-muted-foreground text-xs text-center">
              Run code, then step through to populate the timeline
            </div>
          ) : (
            <div className="space-y-1">
              {steps.slice(0, state.currentStep).map((step, i) => (
                <div
                  key={i}
                  className="flex items-center gap-2 px-2 py-1.5 rounded-md text-[14px]"
                  style={{
                    background:
                      i === state.currentStep - 1
                        ? "var(--step-highlight-bg)"
                        : "transparent",
                  }}
                >
                  <span
                    className="w-5 h-5 rounded-md flex items-center justify-center text-[12px] font-medium shrink-0 tabular-nums"
                    style={{
                      background:
                        step.type === "push"
                          ? "var(--step-push-bg)"
                          : step.type === "pop" || step.type === "shift"
                            ? "var(--step-pop-bg)"
                            : "var(--step-neutral-bg)",
                      color:
                        step.type === "push"
                          ? "var(--step-push-text)"
                          : step.type === "pop" || step.type === "shift"
                            ? "var(--step-pop-text)"
                            : "var(--step-neutral-text)",
                    }}
                  >
                    {i + 1}
                  </span>
                  <span
                    className={`font-medium shrink-0 ${
                      step.type === "push"
                        ? "text-step-push-text"
                        : step.type === "pop" || step.type === "shift"
                          ? "text-step-pop-text"
                          : "text-step-neutral-text"
                    }`}
                  >
                    {step.type}
                  </span>
                  {"queue" in step && (
                    <span className="text-xs text-muted-foreground shrink-0">
                      {step.queue}
                    </span>
                  )}
                  {"value" in step && (
                    <span
                      className="text-muted-foreground text-xs truncate ml-auto"
                      style={{ fontFamily: "var(--font-mono)" }}
                    >
                      {step.value}
                    </span>
                  )}
                </div>
              ))}
            </div>
          )}
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
