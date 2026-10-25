#!/usr/bin/env bash
set -euo pipefail

cd "$(dirname "$0")/.."
node --check web/engine.js
node --check web/app.js
mkdir -p dist
cp web/index.html web/style.css web/engine.js web/app.js dist/
