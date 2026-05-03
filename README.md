# BeCampusX

An incentivized opportunity platform for students to discover and complete real, paid micro tasks from startups and individuals.

<img width="1584" height="396" alt="WhatsApp Image 2026-04-03 at 19 57 52" src="https://github.com/user-attachments/assets/42416dda-91c5-409f-ba39-8f3cb678a5d6" />

---

## Overview

BeCampusX is built to solve a simple but ignored problem:

Students want real work.  
Startups and individuals have small tasks that need execution.  

There is no structured way to connect both.

BeCampusX bridges this gap through clearly defined, short duration, paid opportunities that focus on execution instead of vague “experience”.

---

## What is BeCampusX

BeCampusX is not:

- a job board  
- a social feed  
- an internship listing site  

It is a **task execution platform**.

Each opportunity is:

- scoped with a clear outcome  
- short in duration  
- paid  
- designed for fast completion  

---

## Core Flow

1. User discovers an opportunity  
2. User applies  
3. Provider selects a candidate  
4. Task is assigned  
5. User completes the task  
6. Completion is verified  
7. Payment is processed  

---

## Current Status

- Platform is live  
- Opportunities are being listed manually  
- Task lifecycle is being tested end to end  
- Focus is on making one complete loop work reliably  

---

## Features

- Opportunity listing system  
- Application flow for users  
- Provider dashboard for managing applicants  
- Task lifecycle tracking  
- Payment integration using DodoPayments  
- NSFW content filtering using TensorFlow.js for social feeds  
- **Swagger / OpenAPI UI** at **`/api-docs`** — default local: [http://localhost:3000/api-docs](http://localhost:3000/api-docs) (see [API documentation](#api-documentation-swagger) for `PORT` and production)

---

## Tech Stack

Impact-first view of the engineering: **what the system does and why it matters**, not a dependency checklist. Tooling reflects the [BeCampusX](https://github.com/adnankhan46/campusx) monorepo (Express API + React client).

- **End-to-end task economy:** Architected a **MERN** stack (Node.js, Express, MongoDB/Mongoose) that supports the full loop from **discovery -> application -> provider selection -> assignment -> completion -> verification -> payout**, so students and providers interact through execution-bound work instead of vague listings.

- **Production-grade API surface:** Hardened HTTP with **Helmet**, **rate limiting**, **CORS**, **MongoDB sanitization**, and **response compression**, alongside **structured logging (Winston, Morgan)**—raising the bar on abuse resistance and making production behavior observable when the task lifecycle breaks.

- **Explicit contracts and identity:** Enforced request shape with **Zod** and implemented **JWT + bcrypt** flows so auth and sensitive transitions stay predictable as roles (student, provider) and states multiply.

- **Monetization and reconciliation:** Implemented **payment orchestration with Dodo Payments** and **verified webhooks (Standard Webhooks)** so micro-transactions and settlement signals stay aligned with server-side truth instead of drifting on client-only assumptions.

- **Real-time coordination:** Designed an **event-driven update layer with Socket.IO** (server and client) so applicants and providers see status changes—applications, assignments, progress—**without** turning the product into a polling-heavy dashboard.

- **Trust in user-generated surfaces:** Integrated **client-side ML moderation (TensorFlow.js + NSFWJS)** to catch NSFW content early in feeds and uploads, improving safety posture where manual review does not scale.

- **Client delivery and engagement:** Shipped **React 18** on **Vite** with **Redux Toolkit + Redux Persist**, **React Router**, and **Bootstrap/Tailwind**, combining **infinite-scroll** discovery, markdown-rich content, and real-time hooks so high-engagement browsing stays responsive as listings grow.

- **API clarity and regression control:** Shipped **Swagger UI** at **`/api-docs`** (JSDoc-generated spec via **swagger-jsdoc** + **swagger-ui-express**) so the HTTP contract is browsable locally at `http://localhost:<PORT>/api-docs` and on deploy at `https://<api-host>/api-docs`. **Vitest + Supertest** against an **in-memory MongoDB** harness exercise critical paths so apply-to-completion changes are less likely to ship blind.

- **Where it runs:** Can be deployed and iterated **on VPS infrastructure**, prioritizing **one reliable production loop** (manual listings, real users, end-to-end lifecycle testing) over premature automation.

Supporting client capabilities in-repo include **Firebase**, **Google Generative AI**, **Tesseract.js**, and rich UI primitives (e.g. Font Awesome, Lucide, toasts) where specific flows need them; the core story remains **tasks, money, trust, and real-time state**.

*(Early-stage product: optimizing for a single trustworthy apply-to-paid-completion path with real providers—not feature breadth for its own sake.)*

---

## Design Philosophy

- Execution over features  
- Manual over automated in early stages  
- Clear tasks over vague opportunities  
- Small loops over scale  

---

## Why this exists

Most platforms optimize for visibility.

BeCampusX optimizes for completion.

The goal is simple:  
Make it possible for a student to go from discovering a task to completing it and getting paid without friction.

---

## Roadmap (Current Focus)

- Improve apply to completion flow  
- Fix production bugs affecting task lifecycle  
- Onboard early stage providers  
- Validate real task completion loops  
- Improve trust and clarity in opportunity listings  

---

## Getting Started

### Prerequisites

- Node.js  
- MongoDB  

### Installation

```bash
git clone https://github.com/adnankhan46/campusx
cd campusx
pnpm install
cd client   # client
pnpm install

# Configure .env file, expected from .env.example
pnpm run dev
# or
pnpm run build
```

### API documentation (Swagger)

With the API running, open **Swagger UI** at:

- **Local (default port 3000):** [http://localhost:3000/api-docs](http://localhost:3000/api-docs)  
- **Custom port:** `http://localhost:<PORT>/api-docs` — `PORT` comes from your `.env` (see `src/server.js` / `src/config`).  
- **Deployed:** `https://<your-api-host>/api-docs`

### Meet the Team
[Adnan Khan]() and [Garv Thakre](), building from first principles systems.
