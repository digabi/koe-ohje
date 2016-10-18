APPNAME = digabi-koe-ohje

all:

install:
	install -D -m 0755 digabi-koe-ohje.sh $(DESTDIR)/usr/bin/$(APPNAME)
	install -d -m 0755 $(DESTDIR)/usr/share/$(APPNAME)
	install -D -m 0644 digabi-koe-ohje.desktop $(DESTDIR)/usr/share/applications/digabi-koe-ohje.desktop

	# Common files (images etc)
	cp -r common $(DESTDIR)/usr/share/${APPNAME}/

	# Finnish documentation
	cp -r fi $(DESTDIR)/usr/share/$(APPNAME)/

	# Swedish documentation
	cp -r sv $(DESTDIR)/usr/share/$(APPNAME)/

	# Common content to Finnish/Swedish documentation
	cp -r content/* $(DESTDIR)/usr/share/$(APPNAME)/fi/
	cp -r content/* $(DESTDIR)/usr/share/$(APPNAME)/sv/

	# Set perms
	find $(DESTDIR)/usr/share/$(APPNAME) -type f -exec chmod 644 {} \;
	find $(DESTDIR)/usr/share/$(APPNAME) -type d -exec chmod 755 {} \;

preview-common: common/* common/css/* common/js/* common/pictures/*
	# Copy files to preview
	mkdir -p preview/common/
	cp -r common/* preview/common/

preview-fi: fi/* fi/videos/*
	# Copy files to fi
	mkdir -p preview/fi/
	cp -r fi/* preview/fi/

preview-sv: sv/* sv/videos/*
	# Copy files to sv
	mkdir -p preview/sv/
	cp -r sv/* preview/sv/

preview-content: content/*
	# Copy content to fi and sv
	cp -r content/* preview/fi/
	cp -r content/* preview/sv/

preview: preview-common preview-fi preview-sv preview-content
