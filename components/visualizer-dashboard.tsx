"use client";

import { useVisualizerStore } from "@/hooks/use-visualizer";
import { useKeyboardShortcuts } from "@/hooks/use-keyboard-shortcuts";
import { useAutoplay } from "@/hooks/use-autoplay";
import {
  DashboardHeader,
  CodeEditor,
  StepControls,
  ConsoleOutput,
  EventLoopCycle,
  ExecutionTimeline,
  QueueCard,
} from "@/components/visualizer";

export function VisualizerDashboard() {
  const state = useVisualizerStore((s) => s.state);
  const error = useVisualizerStore((s) => s.error);

  useKeyboardShortcuts();
  useAutoplay();

  return (
    <div
      className="flex flex-col min-h-screen lg:h-screen lg:overflow-hidden"
      style={{ background: "var(--warm-bg)" }}
    >
      <DashboardHeader />

      <main className="flex-1 lg:min-h-0 p-3 lg:p-4">
        <div className="grid h-full gap-3 lg:gap-4 grid-cols-1 lg:grid-cols-[minmax(320px,0.95fr)_1.45fr_minmax(300px,0.95fr)]">
          {/* Left: code + transport */}
          <div className="flex flex-col gap-3 lg:gap-4 lg:min-h-0">
            <CodeEditor />
            <StepControls />
            {error && (
              <div className="shrink-0 rounded-lg border border-destructive/30 bg-destructive/10 px-3 py-2.5">
                <p className="text-destructive text-xs">{error}</p>
              </div>
            )}
          </div>

          {/* Center: event loop + queues */}
          <div className="flex flex-col gap-3 lg:gap-4 lg:min-h-0">
            <EventLoopCycle />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 lg:gap-4 lg:flex-1 lg:min-h-0 lg:grid-rows-3">
              <QueueCard
                title="Call Stack"
                subtitle="LIFO · last in, first out"
                items={[...state.callStack].reverse()}
                color="blue"
                emptyText="Stack is empty"
              />
              <QueueCard
                title="Web APIs"
                subtitle="Browser environment"
                items={state.webApis.map((a) => a.value)}
                color="amber"
                emptyText="No active timers"
              />
              <QueueCard
                title="Microtask Queue"
                subtitle="Promises, queueMicrotask"
                items={state.microtaskQueue}
                color="purple"
                emptyText="Queue is empty"
              />
              <QueueCard
                title="Task Queue"
                subtitle="setTimeout, setInterval"
                items={state.taskQueue}
                color="orange"
                emptyText="Queue is empty"
              />
              <QueueCard
                title="rAF Queue"
                subtitle="requestAnimationFrame"
                items={state.rafQueue}
                color="emerald"
                emptyText="No pending frames"
                className="sm:col-span-2"
              />
            </div>
          </div>

          {/* Right: console + timeline */}
          <div className="flex flex-col gap-3 lg:gap-4 lg:min-h-0">
            <ConsoleOutput />
            <ExecutionTimeline />
          </div>
        </div>
      </main>
    </div>
  );
}
