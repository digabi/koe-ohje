#!/bin/bash

IS_FI=`echo "$LANG" | grep -P "^fi"`
IS_SV=`echo "$LANG" | grep -P "^sv"`

# Defaults to Finnish
DOC_LANG=fi
TITLE="Koejärjestelmän ohjeet"

if [ "${IS_FI}" != "" ]; then
	echo "Finnish language selected"
	DOC_LANG=fi
elif [ "${IS_SV}" != "" ]; then
	echo "Swedish language selected"
	DOC_LANG=sv
	TITLE="Provmiljöns instruktioner"

	if [ ! -f /usr/local/share/digabi-koe-ohje/build/index-${DOC_LANG}.html ]; then
		echo "Oops, Swedish documentation is missing"
		DOC_LANG=fi
		TITLE="Koejärjestelmän ohjeet"
	fi
else
	echo "$0: No known language selected, defaults to ${DOC_LANG}"
fi

# Kill existing browsers
pkill koeohje

# Start browser
abikit-browser -t "${TITLE}" -W 1045 -H 600 -x 30 -y 30 \
	-n koeohje -i /usr/local/share/digabi-koe-ohje/help-browser.svg \
	file:///usr/local/share/digabi-koe-ohje/build/index-${DOC_LANG}.html &
