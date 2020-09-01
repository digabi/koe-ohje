default_build_number=1

NODE_PATH = ~/.nvm/versions/node/v$(shell cat .nvmrc)/bin
YARN = PATH=$(NODE_PATH):$(PATH) $(NODE_PATH)/yarn

all:

node_modules: package.json
	$(YARN) install

build: content/* node_modules
	$(YARN) build

deb: build
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
