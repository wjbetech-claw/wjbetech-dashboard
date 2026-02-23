#!/usr/bin/env python3
"""
record_model_usage.py
Record structured model usage entries to MODEL_AUDIT.json and update aggregated totals.
Usage:
  ./scripts/record_model_usage.py <model> <agent> <repo> <path> <rationale> <units>
Example:
  ./scripts/record_model_usage.py gpt-codex-5.3 developer wjbetech-claw/openclaw-config scripts/changes.py "refactor auth" 120
"""
from datetime import datetime
import json
import sys
from pathlib import Path

if len(sys.argv) < 7:
    print("Usage: record_model_usage.py <model> <agent> <repo> <path> <rationale> <units>")
    sys.exit(2)

model, agent, repo, path_arg, rationale, units = sys.argv[1:7]
try:
    units = float(units)
except ValueError:
    print('units must be a number')
    sys.exit(2)

audit_file = Path('MODEL_AUDIT.json')
now = datetime.utcnow().isoformat() + 'Z'
entry = {
    'timestamp': now,
    'model': model,
    'agent': agent,
    'repo': repo,
    'path': path_arg,
    'rationale': rationale,
    'units': units
}

data = {'entries': [], 'totals': {}}
if audit_file.exists():
    try:
        data = json.loads(audit_file.read_text())
    except Exception:
        data = {'entries': [], 'totals': {}}

# append entry
data['entries'].append(entry)

# update totals
key = f"{model}"
data['totals'].setdefault(key, 0.0)
data['totals'][key] += units

# write back
audit_file.write_text(json.dumps(data, indent=2))
print(f"Recorded {units} units for {model}. Total for {model}: {data['totals'][key]}")
