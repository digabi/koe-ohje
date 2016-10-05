#!/bin/sh

# This script updates MathJax mathematics rendering library
# https://www.mathjax.org/
# https://github.com/mathjax/MathJax/archive/master.zip

ORIGDIR="$(pwd)"
if [ ! -d "$ORIGDIR/common/js" ]; then
	echo "Error: This script should be executed at root of the repository"
	echo "$ORIGDIR/common/js is not a directory"
	exit 1
fi

TMPDIR="$(mktemp -d)"
cd "$TMPDIR"

echo "ORIGDIR: $ORIGDIR"
echo "TMPDIR: $TMPDIR"

wget https://github.com/mathjax/MathJax/archive/master.zip

cd "$ORIGDIR/common/js"
if [ -d MathJax-master ]; then
	echo "Removing old MathJax-master"
	rm -fR MathJax-master
fi

unzip "$TMPDIR/master.zip"

if [ -d "$TMPDIR" ]; then
	echo "Removing temporary directory $TMPDIR"
	rm -fR "$TMPDIR"
fi

echo "MathJax is successfully updated at $ORIGDIR/common/js"
