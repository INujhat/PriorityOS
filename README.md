# PriorityOS

**A full-stack academic productivity application for organizing tasks and building toward smarter study planning.**

PriorityOS started with a problem I kept running into as a student: when assignments, exams, work, and personal responsibilities overlap, keeping a task list is easy—but deciding what deserves attention first is harder. I began building PriorityOS to turn that scattered workload into one place where I can track what needs to get done, see progress, and eventually plan my time more intentionally.

This repository is an **in-progress software engineering project**. The current version focuses on a working task-management interface and a tested API foundation. AI-powered prioritization, scheduling, authentication, and cloud synchronization are planned features, **not yet implemented**.

## What works today

- **Task management:** Create, view, complete, and delete tasks through a React interface.
- **Local persistence:** Tasks are saved in browser `localStorage` so they remain after a page refresh on the same browser/device.
- **Dashboard UI:** A responsive interface for viewing and managing academic work.
- **Backend foundation:** A Python FastAPI service with an application entry point and health-check routing.
- **Automated backend tests:** Pytest coverage for the initial API health-check functionality.
- **Database groundwork:** A PostgreSQL task schema and row-level security policies have been prepared in Supabase, but the frontend is **not yet connected** to this database.

## Technology stack

| Area | Technologies | How I'm using them |
| --- | --- | --- |
| Frontend | React, TypeScript, Vite | Component-based task-management UI |
| Styling | CSS | Dashboard layout and responsive styling |
| Backend | Python, FastAPI, Pydantic | API structure, routing, and data models |
| Testing | Pytest | Initial backend API tests |
| Database (integration in progress) | Supabase, PostgreSQL | Planned persistent task storage and user-scoped access |
| Development | Git, GitHub, npm | Version control and local development |

## My technical contributions

I designed and implemented this project as a hands-on way to develop a complete product, from the interface to the API and data layer. So far, my work includes:

- Building the React/TypeScript dashboard and task interactions.
- Implementing browser-based data persistence and handling task state in the UI.
- Setting up a FastAPI project with organized routes, schemas, configuration, and automated tests.
- Designing a relational task-data structure in Supabase and exploring row-level security for future multi-user support.
- Planning how the frontend, API, authentication, and database will fit together as the application grows.

One of the main engineering challenges is moving from a useful local prototype to a system with reliable server-side persistence and clear separation between frontend, backend, and data-access responsibilities.

## Project structure

```text
priorityOS/
├── frontend/               # React + TypeScript + Vite application
│   ├── public/
│   ├── src/
│   └── package.json
├── backend/                # Python + FastAPI service
│   ├── app/
│   │   ├── routers/       # API routes
│   │   ├── services/      # Service-layer package
│   │   ├── config.py
│   │   ├── main.py
│   │   └── schemas.py
│   ├── tests/
│   └── requirements.txt
└── README.md
```

## Run locally

**Requirements:** Node.js, npm, Python 3, and Git.

### 1. Clone the repository

```bash
git clone https://github.com/nujhatmredula/PriorityOS.git
cd PriorityOS
```

### 2. Start the frontend

In one terminal:

```bash
cd frontend
npm install
npm run dev
```

Open the local URL printed by Vite (commonly `http://localhost:5173`).

### 3. Start the backend

In a second terminal, from the repository root:

```bash
cd backend
python3 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
uvicorn app.main:app --reload
```

The API is typically available at `http://127.0.0.1:8000`, with interactive API documentation at `/docs`.

### 4. Run backend tests

With the backend virtual environment activated:

```bash
cd backend  # only if not already in backend/
pytest
```

**Note:** The current frontend uses browser storage; running the backend does not yet make tasks sync to PostgreSQL. The backend and database integration is a future development step.

## Development roadmap

- [x] React/TypeScript dashboard
- [x] Basic task creation, completion, and deletion
- [x] Browser-based local task persistence
- [x] FastAPI foundation and initial automated tests
- [x] Supabase database schema and RLS groundwork
- [ ] Connect frontend, API, and PostgreSQL for persistent cloud storage
- [ ] Add authentication and user-specific task access
- [ ] Implement a transparent priority-scoring system using deadlines, effort, and importance
- [ ] Add calendar-based planning and study blocks
- [ ] Explore AI-assisted study and task-planning features
- [ ] Expand testing, accessibility, and deployment

## Design direction

My long-term goal is to help students answer two questions: **“What should I work on next?”** and **“How can I realistically fit it into my day?”** I want the eventual planner to account for deadlines, estimated effort, and task importance while keeping its recommendations understandable and editable by the student.

## Current limitations

This is an active development project, not a production-ready application. Tasks currently persist only in the browser where they were created. There is no deployed cloud service, user login, live calendar integration, or functioning AI assistant in this version.

## Author

**Nujhat Alam Mredula**  
B.S. Computer Science, Illinois Institute of Technology (expected May 2027)

- [GitHub](https://github.com/nujhatmredula)
- [LinkedIn](https://www.linkedin.com/in/nujhatmredula/)

*Built to practice full-stack engineering while working toward a practical academic planning tool.*
