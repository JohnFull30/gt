#!/bin/bash

# Ask for a commit message
read -p "Enter your commit message: " commit_message < /dev/tty

# Ensure you're on main
git checkout main

# Stage your changes
git add .

# Commit your changes
git commit -m "$commit_message"

# Try pushing; if it fails due to non-fast-forward, rebase first
if ! git push origin main; then
  echo "🔁 Branch has diverged. Attempting to rebase..."
  git pull --rebase origin main
  git push origin main
fi

# Deploy to gh-pages
npm run deploy

echo "✅ All set! Changes committed and deployed!"
