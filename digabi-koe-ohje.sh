#!/bin/bash

IS_FI=`echo "$LANG" | grep -P "^fi"`
IS_SV=`echo "$LANG" | grep -P "^sv"`

# Defaults to Finnish
DOC_LANG=fi

if [ "${IS_FI}" != "" ]; then
	echo "Finnish language selected"
	DOC_LANG=fi
elif [ "${IS_SV}" != "" ]; then
	echo "Swedish language selected"
	DOC_LANG=sv

	if [ ! -f /usr/share/digabi-koe-ohje/${DOC_LANG}/index.html ]; then
		echo "Oops, Swedish documentation is missing"
		DOC_LANG=fi
	fi
else
	echo "$0: No known language selected, defaults to ${DOC_LANG}"
fi

# Kill existing yelps
pkill -TERM -f "/usr/bin/yelp"

# Overwrite existing yelp configuration
if [ ! -d ~/.config/yelp/ ]; then
	mkdir -p ~/.config/yelp/
fi
echo "[documents/file%3A%2F%2F%2Fusr%2Fshare%2Fdigabi-koe-ohje%2Ffi]" >~/.config/yelp/yelp.cfg
echo "geometry=(800, 500)" >>~/.config/yelp/yelp.cfg
echo "" >>~/.config/yelp/yelp.cfg
echo "[documents/file%3A%2F%2F%2Fusr%2Fshare%2Fdigabi-koe-ohje%2Fsv]" >>~/.config/yelp/yelp.cfg
echo "geometry=(800, 500)" >>~/.config/yelp/yelp.cfg

# Start yelp
/usr/bin/yelp /usr/share/digabi-koe-ohje/${DOC_LANG}/index.html &
