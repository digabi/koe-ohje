default_build_number=1

all:

build: content/*
	yarn build

update-mathjax:
	cp -r node_modules/mathjax/ common/

deb:
	yarn build
	if [ -d deb-root ]; then rm -fR deb-root/; fi

	# Executable
	mkdir -p deb-root/usr/local/bin/
	cp digabi-koe-ohje.sh deb-root/usr/local/bin/digabi-koe-ohje
	chmod 755 deb-root/usr/local/bin/*

	# Desktop entry
	mkdir -p deb-root/usr/share/applications/
	cp digabi-koe-ohje.desktop deb-root/usr/share/applications/

	# Content
	mkdir -p deb-root/usr/local/share/digabi-koe-ohje
	cp help-browser.svg deb-root/usr/local/share/digabi-koe-ohje/
	cp -r common/ deb-root/usr/local/share/digabi-koe-ohje/
	cp -r build/ deb-root/usr/local/share/digabi-koe-ohje/

	cp build/index.html deb-root/usr/local/share/digabi-koe-ohje/build/index-fi.html
	cp build/index.html deb-root/usr/local/share/digabi-koe-ohje/build/index-sv.html

	if [ "x$(BUILD_NUMBER)" = "x" ]; then BUILD_NUMBER=$(default_build_number); echo "Using default build number $$BUILD_NUMBER"; fi; \
	fpm -C deb-root/ -s dir --name digabi-koe-ohje --architecture native -t deb --version "1.1.$$BUILD_NUMBER" --depends abikit-browser .
