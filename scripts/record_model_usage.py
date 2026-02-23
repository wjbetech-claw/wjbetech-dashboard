#!/usr/bin/env python3
import sys
from datetime import datetime
from pathlib import Path

if len(sys.argv) < 6:
    print("Usage: record_model_usage.py <model> <agent> <repo> <path> <rationale>")
    sys.exit(2)

model, agent, repo, path_arg, rationale = sys.argv[1:6]
log = Path('MODEL_AUDIT.log')
entry = f"{datetime.utcnow().isoformat()}Z\t{model}\t{agent}\t{repo}\t{path_arg}\t{rationale}\n"
log.write_text(log.read_text() + entry if log.exists() else entry)
print('Recorded')
