#!/bin/bash
# Tool: SOC2 Compliance
# Output: soc2-report.json

echo "[Toolbox] ⚖️ Running SOC2 Compliance Scan..."
mkdir -p reports
docker run --rm -v "$(pwd):/src" semgrep/semgrep semgrep \
  --config=/src/tools/configs/.semgrep-soc2.yml \
  --config=p/security-audit \
  --config=p/secrets \
  --exclude="*report.json" \
  --exclude="reports/" \
  --exclude="node_modules" \
  --json --output=/src/reports/soc2-report.json /src
echo "[Toolbox] ✅ SOC2 scan complete."
