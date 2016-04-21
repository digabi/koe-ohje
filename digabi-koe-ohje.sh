#!/bin/bash

IS_FI=`echo "$LANG" | grep -P "^fi"`
IS_SV=`echo "$LANG" | grep -P "^sv"`

# Defaults to Finnish
DOC_LANG=fi

check_binary () {
	if [ ! -x $1 ]; then
		echo "digabi-koe-ohje: $1 is missing"
		exit 1
	fi
}

# Check that needed tools are available
check_binary /usr/bin/yelp
check_binary /usr/bin/pgrep
check_binary /usr/bin/xdotool

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

# Start yelp
/usr/bin/yelp /usr/share/digabi-koe-ohje/${DOC_LANG}/index.html &

# Modify window size (get PID, Window ID and finally resize with xdotool)
YELP_WID=
try_count=0

while [[ -z $YELP_WID && $try_count -lt 100 ]]; do
	YELP_PID=`/usr/bin/pgrep -f /usr/bin/yelp`
	YELP_WID=`/usr/bin/xdotool search --all --onlyvisible --pid ${YELP_PID} 2>/dev/null | grep -P "^\d+$" | head -n 1`
	let "try_count=${try_count}+1"
done


if [ "${YELP_WID}" != "" ]; then
	xdotool windowsize --sync ${YELP_WID} 800 500
	xdotool windowmove --sync ${YELP_WID} 25 25
else
	echo "$0: Could not get WindowID for /usr/bin/yelp, could not adjust window"
fi
