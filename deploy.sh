#!/bin/bash

# Configuration
REPO_URL="git@github.com:devinvenable/918.software.git"
BRANCH="main"
SITE_DOMAIN="918.software"

echo "Deploying 918.software static site to GitHub Pages..."

# Ensure we're in the correct git repository
if ! git remote -v | grep -q "$REPO_URL"; then
    echo "Error: Current directory is not the 918.software repository"
    exit 1
fi

# Make sure we're on the correct branch
CURRENT_BRANCH=$(git rev-parse --abbrev-ref HEAD)
if [ "$CURRENT_BRANCH" != "$BRANCH" ]; then
    echo "Switching to $BRANCH branch..."
    git checkout $BRANCH
fi

# Pull latest changes from remote
echo "Pulling latest changes from remote..."
git pull origin $BRANCH

# Stage all changes except excluded directories
echo "Staging changes (excluding private_docs)..."
git add .
git add .nojekyll
git reset -- private_docs/

# Check if there are changes to commit
if git diff --staged --quiet; then
    echo "No changes to commit"
else
    # Commit changes
    echo "Committing changes..."
    git commit -m "Update site: $(date)"
    
    # Push changes to GitHub
    echo "Pushing changes to GitHub..."
    git push origin $BRANCH
    
    echo "Changes pushed. Your site will be automatically deployed by GitHub Pages."
fi

echo "Deployment process complete!"
echo "Your site will be available at https://$SITE_DOMAIN once GitHub Pages processing completes."
echo "Note: private_docs directory has been excluded from the deployment."
