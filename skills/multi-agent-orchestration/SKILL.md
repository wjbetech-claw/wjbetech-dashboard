---
name: multi-agent-orchestration
description: Patterns for orchestrating multiple agent personas (project manager, UX designer, developer, marketer) to collaborate on project work. Use when planning and running multi-role agent workflows.
---

# Multi-Agent Orchestration Skill

Overview
- Defines a small set of agent personas with responsibilities, handoff protocols, and communication formats.
- Provides templates for task breakdown, sprint-like cycles, acceptance criteria, and artifact handoffs.

Personas
- project-manager: owns roadmap, backlog, and acceptance criteria. Communicates with the user.
- ux-designer: produces wireframes, user flows, and UI specs.
- developer: writes code, unit tests, and dev documentation.
- marketer: drafts launch messaging, landing pages, and outreach plans.

Workflow
1. Intake: PM gathers requirements from user and produces a short brief.
2. Planning: PM produces backlog and assigns tasks to personas with clear DoD.
3. Execution: Personas work in parallel on assigned tasks, using shared storage (repo, docs) and reporting progress.
4. Review: PM consolidates outputs, runs acceptance checks, and prepares release notes.

When to use
- Use when a project requires cross-functional outputs and you want autonomous agent collaboration.

Resources
- examples/ contains templates for briefs, backlog items, and sprint checklists.
