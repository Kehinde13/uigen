# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
# First-time setup: install deps, generate Prisma client, run migrations
npm run setup

# Start development server (http://localhost:3000)
npm run dev

# Run all tests
npx vitest

# Run a single test file
npx vitest src/components/chat/__tests__/ChatInterface.test.tsx

# Run Prisma migrations after schema changes
npx prisma migrate dev

# Regenerate Prisma client after schema changes
npx prisma generate
```

## Environment

Create a `.env` file with:
```
ANTHROPIC_API_KEY=your-api-key-here
JWT_SECRET=your-secret-here
```

Without `ANTHROPIC_API_KEY`, the app uses `MockLanguageModel` in `src/lib/provider.ts` which returns static pre-built component code instead of calling the AI.

## Architecture

UIGen is an AI-powered React component generator. Users describe components in a chat, Claude generates code using file-editing tools, and the result is previewed live in an iframe — all without writing any files to disk.

### Data Flow

1. User sends a message in `ChatInterface`
2. `POST /api/chat` streams a response from Claude (or mock) via Vercel AI SDK
3. Claude uses two tools: `str_replace_editor` (create/edit files) and `file_manager` (rename/delete)
4. Tool calls are intercepted client-side by `FileSystemContext.handleToolCall`
5. The `VirtualFileSystem` is updated in memory
6. `PreviewFrame` re-renders the iframe with the updated files

### Virtual File System (`src/lib/file-system.ts`)

All generated files live in an in-memory `VirtualFileSystem` — nothing is written to disk during generation. The VFS supports standard file operations (`createFile`, `updateFile`, `deleteFile`, `rename`) and is serialized to/from JSON for persistence in the database (`fileSystem.serialize()` / `deserializeFromNodes()`).

### Preview System (`src/lib/transform/jsx-transformer.ts`, `src/components/preview/PreviewFrame.tsx`)

The preview renders in an `<iframe>` using native ES module import maps:
- Each `.jsx`/`.tsx` file is transformed via Babel Standalone and turned into a blob URL
- A JSON import map is injected into the iframe HTML mapping file paths to blob URLs
- Third-party packages are resolved through `https://esm.sh/`
- The entry point is always `/App.jsx` — every generated project must have one
- Local imports use the `@/` alias (e.g., `@/components/Button`)

### AI Integration (`src/app/api/chat/route.ts`, `src/lib/provider.ts`)

- Model: `claude-haiku-4-5` (set in `src/lib/provider.ts`)
- Uses Vercel AI SDK `streamText` with `maxSteps: 40` for multi-turn tool use
- System prompt is in `src/lib/prompts/generation.tsx` — key rules: always create `/App.jsx` first, use Tailwind CSS (not inline styles), use `@/` alias for local imports
- On stream completion, messages and VFS state are saved to the `Project` DB record if a `projectId` is provided and the user is authenticated

### Auth (`src/lib/auth.ts`)

Custom JWT auth stored in an httpOnly cookie (`auth-token`). Sessions last 7 days. Users can use the app anonymously (anonymous work is tracked via `src/lib/anon-work-tracker.ts`). Passwords are hashed with bcrypt in the server actions under `src/actions/`.

### Database (`prisma/schema.prisma`)

SQLite via Prisma. Two models:
- `User`: email + hashed password
- `Project`: belongs to optional `User`, stores `messages` (JSON array) and `data` (serialized VFS as JSON)

Prisma client is generated to `src/generated/prisma` (not the default location).

### Key Contexts

- `FileSystemContext` (`src/lib/contexts/file-system-context.tsx`): Holds the `VirtualFileSystem` instance, exposes file operations, and routes AI tool calls to VFS mutations via `handleToolCall`
- `ChatContext` (`src/lib/contexts/chat-context.tsx`): Manages conversation message state

### Testing

Tests use Vitest with jsdom. Test files are in `__tests__` directories co-located with source files. The vitest config is in `vitest.config.mts`.
