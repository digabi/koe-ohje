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
	cp digabi-koe-ohje-firefox-esr deb-root/usr/local/bin/
	chmod 755 deb-root/usr/local/bin/*

	# Desktop entry
	mkdir -p deb-root/usr/share/applications/
	cp digabi-koe-ohje-firefox-esr.desktop deb-root/usr/share/applications/

	# Content
	mkdir -p deb-root/usr/local/share/digabi-koe-ohje
	cp help-browser.svg deb-root/usr/local/share/digabi-koe-ohje/
	cp -r common/ deb-root/usr/local/share/digabi-koe-ohje/
	cp -r build/ deb-root/usr/local/share/digabi-koe-ohje/

	cp build/index.html deb-root/usr/local/share/digabi-koe-ohje/build/index-fi.html
	cp build/index.html deb-root/usr/local/share/digabi-koe-ohje/build/index-sv.html

	if [ "x$(BUILD_NUMBER)" = "x" ]; then BUILD_NUMBER=$(default_build_number); echo "Using default build number $$BUILD_NUMBER"; fi; \
	fpm -C deb-root/ -s dir --name digabi-koe-ohje --architecture native -t deb --version "1.1.$$BUILD_NUMBER" .

zip: build
	zip -ry9 koe-ohje index.html LICENSE common/ build/

pyodide-build.tar.bz2:
	wget -O pyodide-build.tar.bz2 https://github.com/pyodide/pyodide/releases/download/0.18.1/pyodide-build-0.18.1.tar.bz2

update-pyodide: pyodide-build.tar.bz2
	-rm -fR common/pyodide/
	-rm -fR common/pyodide-temp/
	cd common; tar --get -j <../pyodide-build.tar.bz2
	mv common/pyodide/ common/pyodide-temp/
	mkdir common/pyodide/
	# Copy common Pyodide stuff we want to take to production
	cp common/pyodide-temp/*.ts common/pyodide/
	cp common/pyodide-temp/pyodide* common/pyodide/
	cd common/pyodide-temp; cp packages.json ../pyodide/
	# Copy required libraries
	cd common/pyodide-temp; cp numpy.* distutils.* ../pyodide/

	# Remove temp
	rm -fR common/pyodide-temp/
