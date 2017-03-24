APPNAME = digabi-koe-ohje

all:

install:
	install -D -m 0755 digabi-koe-ohje.sh $(DESTDIR)/usr/bin/$(APPNAME)
	install -D -m 0755 digabi-koe-browser.py $(DESTDIR)/usr/bin/digabi-koe-browser
	install -d -m 0755 $(DESTDIR)/usr/share/$(APPNAME)
	install -D -m 0644 digabi-koe-ohje.desktop $(DESTDIR)/usr/share/applications/digabi-koe-ohje.desktop
	install -D -m 0644 help-browser.png $(DESTDIR)/usr/share/$(APPNAME)/help-browser.png

	# Common files (images etc)
	cp -r common $(DESTDIR)/usr/share/${APPNAME}/

	# Common content to Finnish/Swedish documentation
	cp -r content/ $(DESTDIR)/usr/share/$(APPNAME)/
	
	# Finnish/Swedish frontpage
	cp content/index.html $(DESTDIR)/usr/share/$(APPNAME)/content/index-fi.html
	cp content/index.html $(DESTDIR)/usr/share/$(APPNAME)/content/index-sv.html

	# Set perms
	find $(DESTDIR)/usr/share/$(APPNAME) -type f -exec chmod 644 {} \;
	find $(DESTDIR)/usr/share/$(APPNAME) -type d -exec chmod 755 {} \;
