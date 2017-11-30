# koe-ohje

Kokelaan käyttöympäristön ohje, joka näytetään YTL:n digitaalisen ylioppilaskokeen kokelaalle WebKit-selaimella (ks. `digabi-koe-browser.py`).

Ohje löytyy verkosta osoitteesta [https://cheat.abitti.fi/](https://cheat.abitti.fi/).

## Ohjeet muutosten ehdottamiseen

YTL ottaa vastaan muutosehdotuksia. Muutosehdotukset on tehtävä pull requestina:

 1. Tee tästä koodihakemistosta oma kopiosi (fork): (https://help.github.com/articles/fork-a-repo/)
 2. Tee muutokset omaan koodihakemistoosi ([clone](https://help.github.com/articles/cloning-a-repository/), [commit](https://github.com/abhikp/git-test/wiki/Committing-changes), [push](https://help.github.com/articles/pushing-to-a-remote/)): esim. [https://guides.github.com/activities/hello-world/](https://guides.github.com/activities/hello-world/)
 3. Lähetä muokkausehdotus (pull request): (https://help.github.com/articles/creating-a-pull-request/)

Muutosehdotuksien tekijöiden on hyvä huomata, että ohje on kaksikielinen.

## HTML-struktuuri

On selostettu tarkemmin [tässä dokumentissa](HTML.md). Katso se ensin muutosten tekemistä, jotta lähdekoodin yleinen rakenne pysyisi konsistenttina ja muiden olisi helppo lisätä kaavoja myös tulevaisuudessa.

## Muutosten tekemisen työnkulku

1. Rakenna [testisivulle](content/test/testpage.html) esimerkiksi uusi kaava, jonka haluaisit lisätä kokoelmaan
2. Kopioi ja liitä se oikeaan taulukkoon paikassa `content/tab-*<aineen_nimi>.html`
3. Älä vie versiohallintaan testisivua
4. Tarkista, että rakenne on oikein ja että ääkköset toimivat (käytössä oltava UTF-8 enkoodaus). Ongelma voi syntyä,
jos tiedostot tallennetaan Windowsin oletus enkoodauksella. Esimerkiksi Unix-ympäristössä UTF-8 muutos tapahtuu seuraavalla tavalla
```
file tab-<aine>.html // antaa nykyisen enkoodauksen
iconv -f ISO-8859-1 -t UTF-8 tab-<aine>.html > tab-math.html // korvaa nykyisen ISO-enkoodauksen UTF-8
```

### Huomioitavaa

Jotta matemaattisen notaation lataaminen olisi nopeaa käyttäjälle, on lopulliset sivut rakennettava ennakkoon jossain vaiheessa.
Tämä tarkoittaa, että kaavat muutetaan automaattisesti `LaTeX`-muodosta `.svg` muotoon (kaavasta kuviksi),
jolloin ne myös skaalautuvat hyvin ruudun resoluution ollessa mikä tahansa ja sivun lataus pysyy erittäin nopeana.

Käytännössä tämä luo uuden työvaiheen, jonka esimerkiksi tämän kaavakokoelman ylläpitäjä voi suorittaa sen jälkeen,
kun hän on hyväksynyt uuden kaavan lisäämisen kokoelmaan. Pilkottuna ne ovat seuraavat:

1. `npm` -paketinhallinnan [asentaminen](https://www.npmjs.com/get-npm?utm_source=house&utm_medium=homepage&utm_campaign=free%20orgs&utm_term=Install%20npm)
2. `npm install` komento tämän kansion juuressa (asentaa [riippuvuudet](package.json))
3. `npm run build` luo `/build`-kansioon staattisilla kuvilla korvatut taulukot

Lopulliset kaavataulukot sekä verkkosivulla, että kokelaan koneella näytetään siis `/build`-kansion alapuolelta.


## Vinkkejä

 * Varsinainen aputiedosto löytyy `content/index.html`. Välilehdet löytyvät `content/tab-*.html`.
 * Testisivu kaavojen luomiselle löytyy `content/test/testpage.html`. **Kokeile ensin muokata tähän sivuun ja sitten kopioi ja liitä lopullinen kaava
   haluttuun taulukkoon**
 * Lopulliset näytettävät tiedostot löytyvät `content/build` -kansion alta ja sen alaisia tiedostoja ei pidä muokata käsin.
 * Voit katsoa rakentamatonta sivua lataamalla selaimeen `content/index.html`-tiedoston (lokaalin tiedoston avaavat oikein Firefox/Safari). Ruotsinkielisen tiedoston voit ladata lisäämällä URL:iin `?sv` eli näin: `file:///polku-omalla-levyllasi/content/index.html?sv`

## Videoiden lisääminen

Tutki ensin uuden videotiedoston äänenvoimakkuus:

`$ ffmpeg -i videotiedosto.mov -af "volumedetect" -f null /dev/null`
`[Parsed_volumedetect_0 @ 0xb4cd900] mean_volume: -30.1 dB`
`[Parsed_volumedetect_0 @ 0xb4cd900] max_volume: -9.8 dB`

Nyt haluat lisätä äänenvoimakkuutta 9.8 dB (ks. edellinen `max_volume` ja skaalata videon 640px leveyteen:

```
ffmpeg -i "/home/user/input_video.mpg" -codec:v libvpx -quality good -cpu-used 0 -b:v 600k -qmin 10 -qmax 42 -maxrate 500k -bufsize 1000k -threads 2 -vf scale=640:-1 -af "volume=9.8dB" -an -pass 1 -f webm /dev/null`
ffmpeg -i "/home/user/input_video.mpg" -codec:v libvpx -quality good -cpu-used 0 -b:v 600k -qmin 10 -qmax 42 -maxrate 500k -bufsize 1000k -threads 2 -vf scale=640:-1 -af "volume=9.8dB" -codec:a libvorbis -b:a 128k -pass 2 -f webm output.webm
```

Tuloksena on `output.webm`

## Lisenssi

This work is double licensed under:
 * Creative Commons No Rights Reserved License ([CC0 1.0 Universal](https://creativecommons.org/publicdomain/zero/1.0/legalcode)) (except the FontAwesome `common/css/fa` which is licensed under the MIT License), and
 * [The MIT License](https://opensource.org/licenses/MIT).

## Kiitämme

 * Peter Ahlroos: Videot
 * Lotta Oinonen: Matematiikan sisältö
 * Riitta Salmenoja: Mekaniikan kaavoja
 * ([FontAwesome](http://fontawesome.io/)), MIT License
