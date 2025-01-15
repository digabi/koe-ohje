#!/usr/bin/env bash

# Get all tags from the remote repository and save them to a variable, in short format
tags=$(git ls-remote --tags --refs origin | awk '{print $2}' | awk -F"/" '{print $3}')

released=$(gh release list --json tagName --jq ".[].tagName")
# filter out the tags that have not been released
unreleased_tags=$(echo "$tags" "$released" | tr ' ' '\n' | sort | uniq -u)

# make tags an selectable list
# check if fzf is installed
if ! command -v fzf &> /dev/null
then
    echo -e "Install fzf for a nicer selection experience\n"
    echo "Unreleased tags:"
    echo "$unreleased_tags"
    read -r -p "Enter tag to release: " tag_to_release
else
    tag_to_release=$(echo "$unreleased_tags" | tr ' ' '\n' | fzf --prompt="Select tag to release: ")
fi

echo "Running release workflow for "$tag_to_release""
# using github cli trigger manual workflow with the tag to release as the tag parameter
gh workflow run digabi2-manual-prod-release.yml -f tag="$tag_to_release"