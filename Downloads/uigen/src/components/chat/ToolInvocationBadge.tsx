"use client";

import { Loader2, FilePlus, FilePen, FileText, Undo2, FileOutput, Trash2, Wrench } from "lucide-react";

interface ToolInvocationBadgeProps {
  toolName: string;
  args: Record<string, unknown>;
  state: string;
  result?: unknown;
}

function getFilename(path: unknown): string {
  if (typeof path !== "string") return "";
  return path.split("/").filter(Boolean).at(-1) ?? path;
}

function getLabel(toolName: string, args: Record<string, unknown>): { pending: string; done: string } {
  const filename = getFilename(args.path);

  if (toolName === "str_replace_editor") {
    switch (args.command) {
      case "create":
        return { pending: `Creating ${filename}`, done: `Created ${filename}` };
      case "str_replace":
      case "insert":
        return { pending: `Editing ${filename}`, done: `Edited ${filename}` };
      case "view":
        return { pending: `Reading ${filename}`, done: `Read ${filename}` };
      case "undo_edit":
        return { pending: `Undoing edit to ${filename}`, done: `Undid edit to ${filename}` };
    }
  }

  if (toolName === "file_manager") {
    switch (args.command) {
      case "rename": {
        const newFilename = getFilename(args.new_path);
        return { pending: `Renaming ${filename} to ${newFilename}`, done: `Renamed ${filename} to ${newFilename}` };
      }
      case "delete":
        return { pending: `Deleting ${filename}`, done: `Deleted ${filename}` };
    }
  }

  return { pending: toolName, done: toolName };
}

function getIcon(toolName: string, args: Record<string, unknown>) {
  if (toolName === "str_replace_editor") {
    switch (args.command) {
      case "create":    return FilePlus;
      case "str_replace":
      case "insert":    return FilePen;
      case "view":      return FileText;
      case "undo_edit": return Undo2;
    }
  }
  if (toolName === "file_manager") {
    switch (args.command) {
      case "rename": return FileOutput;
      case "delete": return Trash2;
    }
  }
  return Wrench;
}

export function ToolInvocationBadge({ toolName, args, state, result }: ToolInvocationBadgeProps) {
  const isDone = state === "result" && Boolean(result);
  const { pending, done } = getLabel(toolName, args);
  const ActionIcon = getIcon(toolName, args);

  return (
    <div
      className="inline-flex items-center gap-2 mt-2 px-3 py-1.5 bg-neutral-50 rounded-lg text-xs font-mono border border-neutral-200"
      data-testid="tool-invocation-badge"
    >
      {isDone ? (
        <>
          <div className="w-2 h-2 rounded-full bg-emerald-500" data-testid="done-indicator" />
          <ActionIcon className="w-3 h-3 text-neutral-500" />
        </>
      ) : (
        <>
          <Loader2 className="w-3 h-3 animate-spin text-blue-600" data-testid="spinner" />
          <ActionIcon className="w-3 h-3 text-neutral-400" />
        </>
      )}
      <span className="text-neutral-700" data-testid="badge-label">{isDone ? done : pending}</span>
    </div>
  );
}
