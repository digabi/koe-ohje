APPNAME = digabi-koe-ohje

all:

install:
	install -D -m 0755 digabi-koe-ohje.sh $(DESTDIR)/usr/bin/$(APPNAME)
	install -d -m 0755 /usr/share/$(APPNAME)
	
	# Common files
	cp -r common /usr/share/${APPNAME}/

	# Finnish documentation
	cp -r fi /usr/share/$(APPNAME)/
	
	# Don't copy Swedish front page to make yelp fallback to Finnish
	#cp -r sv /usr/share/$(APPNAME)/

	# Set perms
	find /usr/share/$(APPNAME) -type f -exec chmod 644 {} \;
	find /usr/share/$(APPNAME) -type d -exec chmod 755 {} \;
