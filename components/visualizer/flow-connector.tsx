import { ChevronRight } from "lucide-react";

interface FlowConnectorProps {
  active: boolean;
}

export function FlowConnector({ active }: FlowConnectorProps) {
  return (
    <div className="flex-1 flex items-center px-1">
      <div
        className={`h-px flex-1 transition-colors duration-300 ${
          active ? "bg-flow-active-start" : "bg-flow-inactive"
        }`}
      />
      <ChevronRight
        className={`w-3.5 h-3.5 -ml-1 transition-colors duration-300 ${
          active ? "text-flow-arrow-active" : "text-flow-arrow-inactive"
        }`}
      />
    </div>
  );
}
