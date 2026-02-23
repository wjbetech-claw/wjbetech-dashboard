#!/usr/bin/env python3
"""
check_copilot_alerts.py
Check MODEL_AUDIT.json totals against a configured quota and emit alerts when 10% thresholds are crossed.
Usage:
  ./scripts/check_copilot_alerts.py --quota <number> [--model <model-name>] [--notify gh_issue] [--repo owner/repo]

By default it prints alerts and writes last_alert.json to remember which thresholds already notified.
If --notify gh_issue is provided and gh CLI is authenticated, it will open an issue when a new threshold is crossed.
"""
import json
import sys
from pathlib import Path
import argparse
import subprocess

parser = argparse.ArgumentParser()
parser.add_argument('--quota', type=float, required=True, help='Total quota units for the period')
parser.add_argument('--model', default='gpt-codex-5.3', help='Model to track')
parser.add_argument('--notify', choices=['none','gh_issue'], default='none')
parser.add_argument('--repo', help='owner/repo to open issue in when using gh_issue')
args = parser.parse_args()

audit = Path('MODEL_AUDIT.json')
last = Path('MODEL_LAST_ALERT.json')
if not audit.exists():
    print('No MODEL_AUDIT.json found. No usage recorded yet.')
    sys.exit(0)

data = json.loads(audit.read_text())
used = data.get('totals', {}).get(args.model, 0.0)
quota = args.quota
if quota <= 0:
    print('Quota must be > 0')
    sys.exit(2)

percent = (used / quota) * 100.0
print(f"Model {args.model}: used {used} / {quota} ({percent:.2f}%)")

# load last alerted threshold
last_threshold = -1
if last.exists():
    try:
        j = json.loads(last.read_text())
        last_threshold = j.get('last_threshold', -1)
    except Exception:
        last_threshold = -1

# compute threshold crossed
thresholds = list(range(10, 101, 10))
new_threshold = None
for t in thresholds:
    if percent >= t and t > last_threshold:
        new_threshold = t

if new_threshold is None:
    print('No new thresholds crossed since last check.')
    sys.exit(0)

# Emit alert
msg = f"ALERT: Model {args.model} crossed {new_threshold}% usage ({percent:.2f}%). Used {used} of {quota}."
print(msg)

# persist last threshold
last.write_text(json.dumps({'last_threshold': new_threshold}, indent=2))

# optionally create GitHub issue
if args.notify == 'gh_issue':
    if not args.repo:
        print('To create an issue you must supply --repo owner/repo')
        sys.exit(2)
    title = f"Usage alert: {args.model} crossed {new_threshold}%"
    body = f"{msg}\n\nThis is an automated alert from the model usage monitor."
    try:
        subprocess.run(['gh','issue','create','--repo',args.repo,'--title',title,'--body',body], check=True)
        print('Created GitHub issue')
    except Exception as e:
        print('Failed to create GitHub issue via gh:', e)
