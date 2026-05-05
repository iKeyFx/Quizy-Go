# Quizy Go

**Quizy Go** is an interactive quiz web app where users can test their knowledge across multiple categories and difficulty levels, compete on a leaderboard, and review their answers after every quiz.

## Features

- **4 Categories** — Arts, Science, Commercial, General Studies
- **3 Difficulty Levels** — Easy, Medium, Hard
- **Timed Quizzes** — 10 questions, 10-minute countdown timer
- **Leaderboard** — Ranked scores across all users, filterable by category and difficulty
- **Personal Bests** — Track your best score and time per category/difficulty combo
- **Answer Review** — See every question, your answer, and the correct answer after each quiz
- **Authentication** — Sign up and log in with email and password
- **Quiz Lock** — Navigation is blocked mid-quiz to prevent accidental exits

## Tech Stack

- **Frontend** — React 19, React Router 7, Styled Components
- **State & Data Fetching** — TanStack React Query v5
- **Backend & Database** — Supabase (PostgreSQL + Auth)
- **Build Tool** — Vite

## Getting Started

```bash
npm install
npm run dev
```

Create a `.env` file at the project root with your Supabase credentials:

```
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_PUBLISHABLE_KEY=your_supabase_anon_key
```

## Usage

1. Sign up or log in
2. Select a quiz category from the dashboard
3. Choose a difficulty level
4. Answer all questions before the timer runs out
5. View your score and review your answers
6. Check the leaderboard to see how you rank

## Contributing

1. Fork the repository
2. Create a new branch: `git checkout -b feat/your-feature`
3. Commit your changes: `git commit -m 'feat: add your feature'`
4. Push to the branch: `git push origin feat/your-feature`
5. Open a Pull Request

## License

This project is licensed under the MIT License. See the `LICENSE` file for details.
