import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface QueueCardProps {
  title: string;
  subtitle: string;
  items: string[];
  color: string;
  emptyText: string;
  className?: string;
}

const colors: Record<string, { dot: string; text: string; item: string }> = {
  blue: {
    dot: "bg-queue-blue-text",
    text: "text-queue-blue-text",
    item: "bg-queue-blue-item-bg border-queue-blue-item-border",
  },
  purple: {
    dot: "bg-queue-purple-text",
    text: "text-queue-purple-text",
    item: "bg-queue-purple-item-bg border-queue-purple-item-border",
  },
  amber: {
    dot: "bg-queue-amber-text",
    text: "text-queue-amber-text",
    item: "bg-queue-amber-item-bg border-queue-amber-item-border",
  },
  orange: {
    dot: "bg-queue-orange-text",
    text: "text-queue-orange-text",
    item: "bg-queue-orange-item-bg border-queue-orange-item-border",
  },
  emerald: {
    dot: "bg-queue-emerald-text",
    text: "text-queue-emerald-text",
    item: "bg-queue-emerald-item-bg border-queue-emerald-item-border",
  },
};

export function QueueCard({
  title,
  subtitle,
  items,
  color,
  emptyText,
  className,
}: QueueCardProps) {
  const c = colors[color];

  return (
    <Card
      className={cn("flex flex-col min-h-[150px] overflow-hidden", className)}
    >
      <CardHeader className="pb-2">
        <CardTitle className="gap-2">
          <span className={cn("w-2 h-2 rounded-full shrink-0", c.dot)} />
          <span className="truncate">{title}</span>
          <span
            className={cn(
              "ml-auto text-xs font-medium tabular-nums px-1.5 py-0.5 rounded-md min-w-5 text-center",
              items.length > 0 ? c.text : "text-muted-foreground",
            )}
          >
            {items.length}
          </span>
        </CardTitle>
        <span className="text-xs font-normal text-muted-foreground truncate">
          {subtitle}
        </span>
      </CardHeader>
      <CardContent className="flex-1 min-h-0 flex flex-col pt-0">
        <div className="flex-1 min-h-0 overflow-auto -mr-1 pr-1">
          {items.length === 0 ? (
            <div className="flex items-center justify-center h-full min-h-[60px] text-muted-foreground text-xs">
              {emptyText}
            </div>
          ) : (
            <div className="space-y-1.5">
              {items.map((item, i) => (
                <div
                  key={i}
                  className={cn(
                    "px-3 py-2 rounded-md border text-[14px] truncate text-[var(--warm-text)]",
                    c.item,
                  )}
                  style={{ fontFamily: "var(--font-mono)" }}
                >
                  {item}
                </div>
              ))}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
