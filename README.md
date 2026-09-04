# Israel Araújo — Portfolio

Personal portfolio built as an interactive desktop experience. On desktop it presents a macOS-inspired workspace; on mobile it switches to an iOS-inspired interface.

**Live:** [portfolio.israeldeveloper.com.br](https://portfolio.israeldeveloper.com.br)

## Highlights

- Responsive desktop and mobile experiences with distinct interaction models.
- AI-powered assistant that answers questions from structured résumé data.
- Interactive terminal and desktop-style navigation.
- Motion-driven interface with accessible, reusable React components.
- Server-side streaming chat endpoint with configurable model routing.
- Desktop assistant navigation: ask “Show me a project with Rust” or “Show your experience” to open and highlight the matching content. Action cards include a **View again** button; restoring chat history does not replay navigation.

## Stack

- Next.js 16 and React 19
- TypeScript
- Tailwind CSS 4
- Framer Motion
- Vercel AI SDK
- OpenRouter-compatible model provider
- xterm.js
- SQLite

## Run locally

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

Set `OPENROUTER_API_KEY` in `.env`. `OPENROUTER_MODEL` defaults to `meta/muse-spark-1.3-contributor` for chat and note moderation. Restart the server after changing the model in a running deployment.

Desktop navigation uses client-side AI SDK tools (`showProject`, `showSection`, `startTour`) and requires tool-calling support from the selected model. Start AI tour generates and validates up to four stops before opening the first destination. Previous/Next advance locally; questions pause the tour, Resume returns to the current stop, and a request to change focus generates a new route. Closing the chat ends the active tour; restored chat history never replays navigation. Mobile and terminal conversations remain text-only.

## Validation

```bash
npm test
npm run eval
npm run eval:lighthouse -- path/to/lighthouse-report.json
npm run lint
npm run build
```

## Contact

[LinkedIn](https://www.linkedin.com/in/araisr/) · [GitHub](https://github.com/IsraelAraujo70) · [Email](mailto:israelaraujodeoliveira@gmail.com)
