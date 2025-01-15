#!/usr/bin/env bash

BRANCH_TO_RELEASE_FROM="master"

# Show help message if no arguments are given or -h/--help flag is used
if [ "$1" = "-h" ] || [ "$1" = "--help" ]; then
  echo "Takes no arguments, releases a new image version to private ECR."
  exit 0
fi

# Check git branch and abort if not on correct release branch
CURRENT_BRANCH=$(git branch --show-current)
if [ "$CURRENT_BRANCH" != "$BRANCH_TO_RELEASE_FROM" ]; then
  echo "You are on branch $CURRENT_BRANCH. Releases only from $BRANCH_TO_RELEASE_FROM branch."
  exit 1
fi

echo ""
OLD_VERSION=$(git ls-remote --tags --refs --sort="v:refname" origin | tail -n1 | sed 's/.*\///' 2>/dev/null || echo "v0.0.0")
echo "Old version: $OLD_VERSION"
echo ""

while read -p 'Enter version which you want to increase (major/minor/patch): ' VERSION_BUMP_MODE && [ "$VERSION_BUMP_MODE" != "major" ] && [ "$VERSION_BUMP_MODE" != "minor" ] && [ "$VERSION_BUMP_MODE" != "patch" ] ; do
  echo "Invalid argument. Use major, minor or patch."
done

NEW_VERSION=v$(npx semver -i "$VERSION_BUMP_MODE" "$OLD_VERSION")
echo "New version: $NEW_VERSION"


echo ""
echo
read -p "Do you want to release version $NEW_VERSION? (y/n): " answer

if [ "$answer" = "y" ]; then
  if ! git tag -m "Release $NEW_VERSION" "$NEW_VERSION"; then
    echo "Failed to create tag $NEW_VERSION. Release aborted"
    exit 1
  fi
  echo ""
  git push origin "$NEW_VERSION"
  echo ""
  echo "Tag $NEW_VERSION pushed."
else
  echo "Release aborted."
fi