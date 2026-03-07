Cleanup audit — 2026-03-07

Summary
- Performed repository scan to identify duplicates, large files, unreferenced candidates, and recently added skill folders.
- This report lists findings and recommended next steps. I will not delete anything automatically; I'll open small PRs for approved actions.

Findings

1) Duplicate or multiple TODO-like files
- ./TODO.md (root)
- ./docs/todo.md
- WORKFLOW_AUTO.md (workflow doc)

Recommendation: Consolidate docs/todo.md into root TODO.md (merge items), keep root TODO.md as canonical. Create docs/todo-archive.md with a pointer.


2) Large files (>200KB)
(Top items)
- ./.git/objects/pack/pack-98a2d385f3d326076423145fb3aab32327c5d28e.pack — 208M (git pack file)
- node_modules binaries (esbuild, playwright, typescript libs) — several MBs each (expected in node_modules)
- package-lock.json — 249K
- axe-core, react-dom maps, vite deps — multiple ~200K-1MB files

Notes: large files inside node_modules are expected. The large .git pack is normal for repo history but could be reduced by git repo maintenance (git gc) if history cleanup is desired.

Recommendation: Do not remove node_modules files from repo (they are installed by CI). If the repo accidentally committed node_modules, we should add .gitignore and remove them via PR (but current repo appears not to have bulk node_modules committed). Leave .git objects alone unless we plan history rewriting.


3) "Skills" folders recently added
- skills/self-improving-agent (large set of files, added recently)
- skills/sonoscli

Recommendation: These look like optional agent "skills" and may be accidental. Propose moving them to a new repo (clawhub or skills-archive) or into a top-level "optional-skills/" folder with a README. I will list their contents in a follow-up and open a PR to move them if you approve.


4) Candidate unreferenced files (heuristic)
- Many files under src/ showed 0 cross-file references using a filename grep heuristic. This is noisy because the search counts occurrences including the file itself and misses dynamic imports or usage by name.
- Examples: src/components/ActiveJob.tsx, AlertsPanel.tsx, DashboardPage.tsx, RepoMeta.tsx (we added one), many tests and UI components.

Recommendation: For each candidate, open a small PR that:
  - Runs a more precise import/usage analysis (TS language service or madge dependency graph) OR
  - Greps for component names in the repo and checks routing table / index exports.
I will run madge to produce an import graph for src/ to find truly orphaned files.


5) Duplicate or repeated files in workspace
- HEARTBEAT.md and multiple copies of SELF_IMPROVEMENT_REMINDER.md duplicates were present earlier; verify duplicates and retain single source of truth.

Recommendation: Consolidate duplicate reminders/docs into single files. I can open a PR to remove exact duplicates and update references.


Planned next automated checks (read-only, will produce artifacts)
1. Run madge (or comparable) to produce a module dependency graph for src/ and detect orphans.
2. List all TODO/TODO-like files and append their contents into a single reviewable draft (reports/todo-consolidation-draft.md).
3. Produce a detailed skill-folder inventory and file counts (skills/*).
4. Prepare focused PRs for:
   - Consolidate docs/todo.md -> TODO.md (safe, small change)
   - Move skills/* to skills/optional/ or archive (needs confirmation)
   - Remove literal duplicates of small files (HEARTBEAT duplicates)

What I will do next (with permission)
- Run madge (or a conservative alternative) to create a dependency graph for src and identify true orphan files. I will attach the graph and recommended deletions to the audit.
- Create a draft PR to consolidate docs/todo.md into TODO.md (if you approve I will open it and run CI).

If you want to proceed, say "Approve consolidation" to let me open the TODO consolidation PR, and/or say "Approve skills archive" to let me move skills/* into skills/optional/ in a PR. Otherwise I will run madge and return the orphan analysis first.

Raw command outputs used for this audit (helpful for verification):
- find . -type f -iname 'todo*' -maxdepth 4 -print
- find . -type f -size +200k -exec ls -lh {} \;
- ls -la skills
- (simple filename-grep heuristic for src files)

Report generated at: reports/cleanup-audit-2026-03-07.md
