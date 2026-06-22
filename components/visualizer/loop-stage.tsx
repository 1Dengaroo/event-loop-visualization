interface LoopStageProps {
  label: string;
  active: boolean;
  color: string;
  step: number;
}

const colors: Record<string, { bg: string; text: string; activeBg: string }> = {
  blue: {
    bg: "bg-loop-blue-bg",
    text: "text-loop-blue-text",
    activeBg: "bg-loop-blue-active-bg",
  },
  purple: {
    bg: "bg-loop-purple-bg",
    text: "text-loop-purple-text",
    activeBg: "bg-loop-purple-active-bg",
  },
  amber: {
    bg: "bg-loop-amber-bg",
    text: "text-loop-amber-text",
    activeBg: "bg-loop-amber-active-bg",
  },
  emerald: {
    bg: "bg-loop-emerald-bg",
    text: "text-loop-emerald-text",
    activeBg: "bg-loop-emerald-active-bg",
  },
};

export function LoopStage({ label, active, color, step }: LoopStageProps) {
  const c = colors[color];

  return (
    <div className="flex flex-col items-center gap-1.5">
      <div
        className={`w-9 h-9 rounded-lg flex items-center justify-center font-semibold text-sm transition-all duration-300 ${
          active ? `${c.activeBg} ${c.text}` : `${c.bg} text-muted-foreground`
        }`}
      >
        {step}
      </div>
      <span
        className={`text-[12px] font-medium ${active ? c.text : "text-muted-foreground"}`}
      >
        {label}
      </span>
    </div>
  );
}
