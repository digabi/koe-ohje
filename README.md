# koe-ohje

Kokelaan käyttöympäristön ohje, joka näytetään YTL:n digitaalisen ylioppilaskokeen kokelaalle WebKit-selaimella (ks. `digabi-koe-browser.py`).

## Kaavakokoelma ja taulukot

Osoitteesta https://tables.abitti.fi/content/taulukot löytyy kaavakokoelma ja taulukot.

## Ohjeet muutosten ehdottamiseen

YTL ottaa vastaan muutosehdotuksia erityisesti kaavakokoelmaan. Muutosehdotukset on tehtävä pull requestina:

 1. Tee tästä koodihakemistosta oma kopiosi (fork): (https://help.github.com/articles/fork-a-repo/)
 2. Tee muutokset omaan koodihakemistoosi ([clone](https://help.github.com/articles/cloning-a-repository/), [commit](https://github.com/abhikp/git-test/wiki/Committing-changes), [push](https://help.github.com/articles/pushing-to-a-remote/)): esim. [https://guides.github.com/activities/hello-world/](https://guides.github.com/activities/hello-world/)
 3. Lähetä muokkausehdotus (pull request): (https://help.github.com/articles/creating-a-pull-request/)

Muutosehdotuksien tekijöiden on hyvä huomata, että kaavakokoelma on kaksikielinen.

## Vinkkejä

 * Varsinainen aputiedosto löytyy `content/index.html`. Välilehdet löytyvät `content/tab-*.html`.
 * Voit katsoa tiedostoa lataamalla selaimeen `content/index.html`-tiedoston. Ruotsinkielisen tiedoston
   voit ladata lisäämällä URL:iin `?sv` eli näin: `file:///polku-omalla-levyllasi/content/index.html?sv`

## Videoiden lisääminen

Tutki ensin uuden videotiedoston äänenvoimakkuus:

`$ ffmpeg -i videotiedosto.mov -af "volumedetect" -f null /dev/null`
`[Parsed_volumedetect_0 @ 0xb4cd900] mean_volume: -30.1 dB`
`[Parsed_volumedetect_0 @ 0xb4cd900] max_volume: -9.8 dB`

Nyt haluat lisätä äänenvoimakkuutta 9.8 dB (ks. edellinen `max_volume` ja skaalata videon 640px leveyteen:

`ffmpeg -i "/home/user/input_video.mpg" -codec:v libvpx -quality good -cpu-used 0 -b:v 600k -qmin 10 -qmax 42 -maxrate 500k -bufsize 1000k -threads 2 -vf scale=640:-1 -af "volume=9.8dB" -an -pass 1 -f webm /dev/null`
`ffmpeg -i "/home/user/input_video.mpg" -codec:v libvpx -quality good -cpu-used 0 -b:v 600k -qmin 10 -qmax 42 -maxrate 500k -bufsize 1000k -threads 2 -vf scale=640:-1 -af "volume=9.8dB" -codec:a libvorbis -b:a 128k -pass 2 -f webm output.webm`

Tuloksena on `output.webm`

## Lisenssi

This work is licensed under a Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International License (CC-BY-NC-SA).

## Kiitämme

 * Peter Ahlroos: Videot
 * Riitta Salmenoja: Mekaniikan kaavoja
