"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useVisualizerStore } from "@/hooks/use-visualizer";
import { LoopStage } from "./loop-stage";
import { FlowConnector } from "./flow-connector";

export function EventLoopCycle() {
  const state = useVisualizerStore((s) => s.state);

  return (
    <Card className="shrink-0">
      <CardHeader className="pb-2">
        <CardTitle>Event Loop</CardTitle>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="flex items-center justify-between">
          <LoopStage
            label="Call Stack"
            active={state.callStack.length > 0}
            color="blue"
            step={1}
          />
          <FlowConnector active={state.callStack.length > 0} />
          <LoopStage
            label="Microtasks"
            active={state.microtaskQueue.length > 0}
            color="purple"
            step={2}
          />
          <FlowConnector active={state.microtaskQueue.length > 0} />
          <LoopStage
            label="Tasks"
            active={state.taskQueue.length > 0}
            color="amber"
            step={3}
          />
          <FlowConnector active={false} />
          <LoopStage label="Render" active={false} color="emerald" step={4} />
        </div>
      </CardContent>
    </Card>
  );
}
