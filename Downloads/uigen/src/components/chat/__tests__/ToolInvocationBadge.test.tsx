import { test, expect, afterEach } from "vitest";
import { render, screen, cleanup } from "@testing-library/react";
import { ToolInvocationBadge } from "../ToolInvocationBadge";

afterEach(() => cleanup());

test("create pending shows spinner and 'Creating App.jsx'", () => {
  render(
    <ToolInvocationBadge
      toolName="str_replace_editor"
      args={{ command: "create", path: "/App.jsx" }}
      state="call"
    />
  );
  expect(screen.getByTestId("badge-label").textContent).toBe("Creating App.jsx");
  expect(screen.getByTestId("spinner")).toBeDefined();
});

test("create done shows done-indicator and 'Created App.jsx'", () => {
  render(
    <ToolInvocationBadge
      toolName="str_replace_editor"
      args={{ command: "create", path: "/App.jsx" }}
      state="result"
      result="OK"
    />
  );
  expect(screen.getByTestId("badge-label").textContent).toBe("Created App.jsx");
  expect(screen.getByTestId("done-indicator")).toBeDefined();
});

test("str_replace pending shows spinner and 'Editing Button.tsx'", () => {
  render(
    <ToolInvocationBadge
      toolName="str_replace_editor"
      args={{ command: "str_replace", path: "/Button.tsx" }}
      state="call"
    />
  );
  expect(screen.getByTestId("badge-label").textContent).toBe("Editing Button.tsx");
  expect(screen.getByTestId("spinner")).toBeDefined();
});

test("str_replace done shows done-indicator and 'Edited Button.tsx'", () => {
  render(
    <ToolInvocationBadge
      toolName="str_replace_editor"
      args={{ command: "str_replace", path: "/Button.tsx" }}
      state="result"
      result="OK"
    />
  );
  expect(screen.getByTestId("badge-label").textContent).toBe("Edited Button.tsx");
  expect(screen.getByTestId("done-indicator")).toBeDefined();
});

test("insert pending shows spinner and 'Editing Card.tsx'", () => {
  render(
    <ToolInvocationBadge
      toolName="str_replace_editor"
      args={{ command: "insert", path: "/Card.tsx" }}
      state="call"
    />
  );
  expect(screen.getByTestId("badge-label").textContent).toBe("Editing Card.tsx");
  expect(screen.getByTestId("spinner")).toBeDefined();
});

test("insert done shows done-indicator and 'Edited Card.tsx'", () => {
  render(
    <ToolInvocationBadge
      toolName="str_replace_editor"
      args={{ command: "insert", path: "/Card.tsx" }}
      state="result"
      result="OK"
    />
  );
  expect(screen.getByTestId("badge-label").textContent).toBe("Edited Card.tsx");
  expect(screen.getByTestId("done-indicator")).toBeDefined();
});

test("view pending shows spinner and 'Reading App.jsx'", () => {
  render(
    <ToolInvocationBadge
      toolName="str_replace_editor"
      args={{ command: "view", path: "/App.jsx" }}
      state="call"
    />
  );
  expect(screen.getByTestId("badge-label").textContent).toBe("Reading App.jsx");
  expect(screen.getByTestId("spinner")).toBeDefined();
});

test("view done shows done-indicator and 'Read App.jsx'", () => {
  render(
    <ToolInvocationBadge
      toolName="str_replace_editor"
      args={{ command: "view", path: "/App.jsx" }}
      state="result"
      result="OK"
    />
  );
  expect(screen.getByTestId("badge-label").textContent).toBe("Read App.jsx");
  expect(screen.getByTestId("done-indicator")).toBeDefined();
});

test("undo_edit pending shows spinner and 'Undoing edit to App.jsx'", () => {
  render(
    <ToolInvocationBadge
      toolName="str_replace_editor"
      args={{ command: "undo_edit", path: "/App.jsx" }}
      state="call"
    />
  );
  expect(screen.getByTestId("badge-label").textContent).toBe("Undoing edit to App.jsx");
  expect(screen.getByTestId("spinner")).toBeDefined();
});

test("undo_edit done shows done-indicator and 'Undid edit to App.jsx'", () => {
  render(
    <ToolInvocationBadge
      toolName="str_replace_editor"
      args={{ command: "undo_edit", path: "/App.jsx" }}
      state="result"
      result="OK"
    />
  );
  expect(screen.getByTestId("badge-label").textContent).toBe("Undid edit to App.jsx");
  expect(screen.getByTestId("done-indicator")).toBeDefined();
});

test("rename pending shows spinner and 'Renaming Button.tsx to IconButton.tsx'", () => {
  render(
    <ToolInvocationBadge
      toolName="file_manager"
      args={{ command: "rename", path: "/Button.tsx", new_path: "/IconButton.tsx" }}
      state="call"
    />
  );
  expect(screen.getByTestId("badge-label").textContent).toBe("Renaming Button.tsx to IconButton.tsx");
  expect(screen.getByTestId("spinner")).toBeDefined();
});

test("rename done shows done-indicator and 'Renamed Button.tsx to IconButton.tsx'", () => {
  render(
    <ToolInvocationBadge
      toolName="file_manager"
      args={{ command: "rename", path: "/Button.tsx", new_path: "/IconButton.tsx" }}
      state="result"
      result="OK"
    />
  );
  expect(screen.getByTestId("badge-label").textContent).toBe("Renamed Button.tsx to IconButton.tsx");
  expect(screen.getByTestId("done-indicator")).toBeDefined();
});

test("delete pending shows spinner and 'Deleting OldFile.tsx'", () => {
  render(
    <ToolInvocationBadge
      toolName="file_manager"
      args={{ command: "delete", path: "/OldFile.tsx" }}
      state="call"
    />
  );
  expect(screen.getByTestId("badge-label").textContent).toBe("Deleting OldFile.tsx");
  expect(screen.getByTestId("spinner")).toBeDefined();
});

test("delete done shows done-indicator and 'Deleted OldFile.tsx'", () => {
  render(
    <ToolInvocationBadge
      toolName="file_manager"
      args={{ command: "delete", path: "/OldFile.tsx" }}
      state="result"
      result="OK"
    />
  );
  expect(screen.getByTestId("badge-label").textContent).toBe("Deleted OldFile.tsx");
  expect(screen.getByTestId("done-indicator")).toBeDefined();
});

test("nested path extracts only the filename", () => {
  render(
    <ToolInvocationBadge
      toolName="str_replace_editor"
      args={{ command: "create", path: "/src/components/ui/Button.tsx" }}
      state="call"
    />
  );
  expect(screen.getByTestId("badge-label").textContent).toBe("Creating Button.tsx");
});

test("root path includes filename", () => {
  render(
    <ToolInvocationBadge
      toolName="str_replace_editor"
      args={{ command: "str_replace", path: "/App.jsx" }}
      state="call"
    />
  );
  expect(screen.getByTestId("badge-label").textContent).toContain("App.jsx");
});

test("unknown tool pending shows spinner and tool name", () => {
  render(
    <ToolInvocationBadge
      toolName="unknown_tool"
      args={{}}
      state="call"
    />
  );
  expect(screen.getByTestId("badge-label").textContent).toBe("unknown_tool");
  expect(screen.getByTestId("spinner")).toBeDefined();
});

test("unknown tool done shows done-indicator and tool name", () => {
  render(
    <ToolInvocationBadge
      toolName="unknown_tool"
      args={{}}
      state="result"
      result="done"
    />
  );
  expect(screen.getByTestId("badge-label").textContent).toBe("unknown_tool");
  expect(screen.getByTestId("done-indicator")).toBeDefined();
});

test("falsy result with state=result shows pending state", () => {
  render(
    <ToolInvocationBadge
      toolName="str_replace_editor"
      args={{ command: "create", path: "/App.jsx" }}
      state="result"
      result={null}
    />
  );
  expect(screen.getByTestId("badge-label").textContent).toBe("Creating App.jsx");
  expect(screen.getByTestId("spinner")).toBeDefined();
});
