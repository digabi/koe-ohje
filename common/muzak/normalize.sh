#!/bin/sh

FFMPEG=ffmpeg

rm *.wav

for this_mp3 in *.mp3
do
  this_wav=`basename $this_mp3 .mp3`.wav
  echo "Converting $this_mp3 --> $this_wav"
  $FFMPEG -loglevel 0 -y -i $this_mp3 $this_wav
  normalize-audio --gain=-9dB $this_wav
  rm $this_mp3
  ffmpeg -i $this_wav -codec:a libmp3lame -q:a 4 $this_mp3
  rm $this_wav
done
