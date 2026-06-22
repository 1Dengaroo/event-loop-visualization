"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ThemePicker } from "@/components/theme-picker";
import {
  CircleHelp,
  BookMarked,
  ExternalLink,
  TriangleAlert,
  Info,
  Keyboard,
  Github,
  Bug,
  Workflow,
} from "lucide-react";

const REPO_URL = "https://github.com/1Dengaroo/js-visualizer";

type DialogId = "about" | "resources" | "limitations" | "shortcuts" | "how";

const SHORTCUTS: { keys: string[]; label: string }[] = [
  { keys: ["Space"], label: "Play / pause autoplay" },
  { keys: ["→"], label: "Step forward" },
  { keys: ["←"], label: "Step backward" },
];

export function DashboardHeader() {
  const [openDialog, setOpenDialog] = useState<DialogId | null>(null);
  const close = () => setOpenDialog(null);

  return (
    <header className="shrink-0 flex items-center justify-between gap-4 px-4 lg:px-5 h-14 border-b border-[var(--warm-border)]">
      <div className="flex items-baseline gap-3 min-w-0">
        <h1
          className="text-lg font-semibold tracking-tight whitespace-nowrap"
          style={{ color: "var(--warm-text)" }}
        >
          Event Loop Visualizer
        </h1>
        <p
          style={{ color: "var(--warm-muted)" }}
          className="text-xs hidden md:block truncate"
        >
          Step through the JavaScript event loop · by{" "}
          <a
            href="https://andydeng.me"
            target="_blank"
            rel="noopener noreferrer"
            className="underline underline-offset-2 transition-colors hover:text-[var(--warm-text)]"
          >
            Andy Deng
          </a>
        </p>
      </div>

      <div className="flex items-center gap-1.5">
        <ThemePicker />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" aria-label="Info & resources">
              <Info className="w-4 h-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-44">
            <DropdownMenuItem onSelect={() => setOpenDialog("about")}>
              <CircleHelp className="w-4 h-4" />
              About
            </DropdownMenuItem>
            <DropdownMenuItem onSelect={() => setOpenDialog("how")}>
              <Workflow className="w-4 h-4" />
              How this works
            </DropdownMenuItem>
            <DropdownMenuItem onSelect={() => setOpenDialog("resources")}>
              <BookMarked className="w-4 h-4" />
              Resources
            </DropdownMenuItem>
            <DropdownMenuItem onSelect={() => setOpenDialog("limitations")}>
              <TriangleAlert className="w-4 h-4" />
              Limitations
            </DropdownMenuItem>
            <DropdownMenuItem onSelect={() => setOpenDialog("shortcuts")}>
              <Keyboard className="w-4 h-4" />
              Keyboard shortcuts
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <a href={REPO_URL} target="_blank" rel="noopener noreferrer">
                <Github className="w-4 h-4" />
                View source
              </a>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <a
                href={`${REPO_URL}/issues/new`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Bug className="w-4 h-4" />
                Report an issue
              </a>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* About */}
      <Dialog open={openDialog === "about"} onOpenChange={(o) => !o && close()}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle style={{ color: "var(--warm-text)" }}>
              Why did I make this?
            </DialogTitle>
          </DialogHeader>
          <div
            className="text-sm space-y-3"
            style={{ color: "var(--warm-muted)" }}
          >
            <p>
              Although I&apos;ve been working professionally as a developer for
              some time now, I found my understanding of the JavaScript event
              loop was surprisingly shaky.
            </p>
            <p>
              I couldn&apos;t explain why certain code snippets behaved the way
              they did (like setTimeout with 0 delay still running after
              promises), or why, despite JavaScript being single-threaded, we
              can still do things concurrently (like loading data while keeping
              the UI responsive).
            </p>
            <p>
              I built this tool to help me solidify these concepts, as I believe
              that building is the best way to learn.
            </p>
          </div>
        </DialogContent>
      </Dialog>

      {/* How this works */}
      <Dialog open={openDialog === "how"} onOpenChange={(o) => !o && close()}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle style={{ color: "var(--warm-text)" }}>
              How this works
            </DialogTitle>
          </DialogHeader>
          <div
            className="text-sm space-y-3"
            style={{ color: "var(--warm-muted)" }}
          >
            <p>
              Rather than running your code, this tool statically analyzes it
              and simulates how the JavaScript event loop would execute it. Your
              code is parsed into an{" "}
              <abbr title="Abstract Syntax Tree" className="no-underline">
                AST
              </abbr>{" "}
              with{" "}
              <code className="text-xs px-1 py-0.5 rounded bg-muted">
                acorn
              </code>
              , then a calculator traverses it to model the call stack, Web
              APIs, the macrotask and microtask queues, and render frames,
              producing the steps you can walk through.
            </p>
            <p>
              It&apos;s fully open source. Dig into the implementation on
              GitHub.
            </p>
            <a
              href={REPO_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 p-3 rounded-md border border-[var(--warm-border)] transition-colors hover:bg-muted"
              style={{ color: "var(--warm-text)" }}
            >
              <Github className="w-4 h-4 shrink-0" />
              <span className="text-sm font-medium">View the source code</span>
              <ExternalLink className="w-3 h-3 shrink-0 opacity-50 ml-auto" />
            </a>
          </div>
        </DialogContent>
      </Dialog>

      {/* Resources */}
      <Dialog
        open={openDialog === "resources"}
        onOpenChange={(o) => !o && close()}
      >
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle style={{ color: "var(--warm-text)" }}>
              Resources
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-2" style={{ color: "var(--warm-muted)" }}>
            <p className="text-sm">
              A collection of resources that personally helped me understand the
              event loop and rendering process.
            </p>
            <a
              href="https://www.youtube.com/watch?v=8aGhZQkoFbQ&t=1476s"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-start gap-3 p-3 rounded-md border border-[var(--warm-border)] transition-colors hover:bg-muted"
            >
              <div
                className="w-9 h-9 rounded-md flex items-center justify-center shrink-0 text-sm"
                style={{
                  background: "var(--step-pop-bg)",
                  color: "var(--step-pop-text)",
                }}
              >
                ▶
              </div>
              <div className="flex-1 min-w-0">
                <div
                  className="text-sm font-medium flex items-center gap-1.5"
                  style={{ color: "var(--warm-text)" }}
                >
                  What the heck is the event loop anyway?
                  <ExternalLink className="w-3 h-3 shrink-0 opacity-50" />
                </div>
                <div className="text-xs mt-0.5">Philip Roberts · JSConf EU</div>
              </div>
            </a>
            <a
              href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Execution_model"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-start gap-3 p-3 rounded-md border border-[var(--warm-border)] transition-colors hover:bg-muted"
            >
              <div
                className="w-9 h-9 rounded-md flex items-center justify-center shrink-0 text-xs font-semibold"
                style={{
                  background: "var(--step-push-bg)",
                  color: "var(--step-push-text)",
                }}
              >
                MDN
              </div>
              <div className="flex-1 min-w-0">
                <div
                  className="text-sm font-medium flex items-center gap-1.5"
                  style={{ color: "var(--warm-text)" }}
                >
                  JavaScript Execution Model
                  <ExternalLink className="w-3 h-3 shrink-0 opacity-50" />
                </div>
                <div className="text-xs mt-0.5">
                  MDN Web Docs · Official reference
                </div>
              </div>
            </a>
            <a
              href="https://jsflow.info/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-start gap-3 p-3 rounded-md border border-[var(--warm-border)] transition-colors hover:bg-muted"
            >
              <div
                className="w-9 h-9 rounded-md flex items-center justify-center shrink-0 text-xs font-semibold"
                style={{
                  background: "var(--step-neutral-bg)",
                  color: "var(--step-neutral-text)",
                }}
              >
                JS
              </div>
              <div className="flex-1 min-w-0">
                <div
                  className="text-sm font-medium flex items-center gap-1.5"
                  style={{ color: "var(--warm-text)" }}
                >
                  JSFlow
                  <ExternalLink className="w-3 h-3 shrink-0 opacity-50" />
                </div>
                <div className="text-xs mt-0.5">
                  Interactive JavaScript execution visualizer
                </div>
              </div>
            </a>
            <a
              href="https://github.com/vault-developer/event-loop-explorer/tree/master"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-start gap-3 p-3 rounded-md border border-[var(--warm-border)] transition-colors hover:bg-muted"
            >
              <div
                className="w-9 h-9 rounded-md flex items-center justify-center shrink-0 text-xs"
                style={{
                  background: "var(--queue-purple-icon-bg)",
                  color: "var(--queue-purple-text)",
                }}
              >
                {"</>"}
              </div>
              <div className="flex-1 min-w-0">
                <div
                  className="text-sm font-medium flex items-center gap-1.5"
                  style={{ color: "var(--warm-text)" }}
                >
                  Event Loop Explorer
                  <ExternalLink className="w-3 h-3 shrink-0 opacity-50" />
                </div>
                <div className="text-xs mt-0.5">
                  AST-based event loop analysis · great reference
                </div>
              </div>
            </a>
          </div>
        </DialogContent>
      </Dialog>

      {/* Limitations */}
      <Dialog
        open={openDialog === "limitations"}
        onOpenChange={(o) => !o && close()}
      >
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle style={{ color: "var(--warm-text)" }}>
              Limitations
            </DialogTitle>
          </DialogHeader>
          <div
            className="text-sm space-y-3"
            style={{ color: "var(--warm-muted)" }}
          >
            <p>
              This is a simplified educational model of the event loop, not a
              full JavaScript runtime. It supports{" "}
              <code className="text-xs px-1 py-0.5 rounded bg-muted">
                console.log
              </code>
              ,{" "}
              <code className="text-xs px-1 py-0.5 rounded bg-muted">
                setTimeout
              </code>
              ,{" "}
              <code className="text-xs px-1 py-0.5 rounded bg-muted">
                Promise.resolve().then()
              </code>
              ,{" "}
              <code className="text-xs px-1 py-0.5 rounded bg-muted">
                queueMicrotask
              </code>
              , and{" "}
              <code className="text-xs px-1 py-0.5 rounded bg-muted">
                requestAnimationFrame
              </code>
              .
            </p>
            <p>
              It does not support variables, loops, conditionals, promise
              chaining (
              <code className="text-xs px-1 py-0.5 rounded bg-muted">
                .then().then()
              </code>
              ), async/await, setInterval, or complex expressions. Each example
              is designed to work within these constraints to illustrate core
              event loop concepts.
            </p>
          </div>
        </DialogContent>
      </Dialog>

      {/* Keyboard shortcuts */}
      <Dialog
        open={openDialog === "shortcuts"}
        onOpenChange={(o) => !o && close()}
      >
        <DialogContent className="sm:max-w-sm">
          <DialogHeader>
            <DialogTitle style={{ color: "var(--warm-text)" }}>
              Keyboard shortcuts
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-2">
            {SHORTCUTS.map(({ keys, label }) => (
              <div
                key={label}
                className="flex items-center justify-between gap-4 text-sm"
                style={{ color: "var(--warm-muted)" }}
              >
                <span>{label}</span>
                <span className="flex items-center gap-1">
                  {keys.map((k) => (
                    <kbd
                      key={k}
                      className="min-w-7 px-1.5 py-0.5 text-center text-xs font-medium rounded border border-[var(--warm-border)] bg-muted"
                      style={{ color: "var(--warm-text)" }}
                    >
                      {k}
                    </kbd>
                  ))}
                </span>
              </div>
            ))}
          </div>
        </DialogContent>
      </Dialog>
    </header>
  );
}
