[![CI](https://github.com/digabi/koe-ohje/actions/workflows/ci.yml/badge.svg)](https://github.com/digabi/koe-ohje/actions/workflows/ci.yml)

# koe-ohje

Kokelaan käyttöympäristön ohje, joka näytetään YTL:n digitaalisen ylioppilaskokeen kokelaalle Firefox-selaimella.

Kokeissa käytettävä versio ohjeesta löytyy osoitteesta https://cheat.abitti.fi/ (release haara). Nykyinen versio löytyy testiympäristöstä (master haara) https://cheat.test.abitti.fi.

## Projektin käynnistäminen

Projektin kehitystä varten tarvitset Node.js version 18 https://nodejs.org/en/ (tarkempi versio löytyy `.nvmrc` tiedostosta)

1. Asenna projektin riippuvuudet komennolla `npm install`
1. Jos käsittelet ohjelmointivälilehteä, aja myös `make update-pyodide`
1. Generoi HTML tiedostot komennolla `npm run build:internet` (varsinaisen koetilanteen versio käyttää `npm run build`)
1. Tämän jälkeen voit ajaa projektia lokaalisti komennolla `npm run start`. Lokaalin koe-ohjeen löydät osoitteesta http://localhost:8080
1. Testien ajamiseksi pysäytä yllä mainittu paikallinen kehityspalvelin, jonka käynnistit `npm run start` -komennolla. Käynnistä testit `npm run test`. Jos haluat nähdä selaimen, aja testit `PUPPETEER_DEBUG=1 npm run test`.

TypeScript muutokset näkyvät selaimessa automaattisesti kun projekti on käynnissä. Jotta HTML tiedostojen muutokset tulevat näkyviin, pitää ne generoida uudelleen `npm run build:internet` komennolla.

## Ohjeet muutosten ehdottamiseen

YTL ottaa vastaan muutosehdotuksia. Ennen isompaa muutosta kannattaa ensin keskustella aiheesta GitHub issuen kautta https://github.com/digabi/koe-ohje/issues.

1.  Tee tästä koodihakemistosta oma kopiosi (fork): (https://help.github.com/articles/fork-a-repo/)
2.  Tee muutokset omaan koodihakemistoosi ([clone](https://help.github.com/articles/cloning-a-repository/), [commit](https://github.com/abhikp/git-test/wiki/Committing-changes), [push](https://help.github.com/articles/pushing-to-a-remote/)): esim. [https://guides.github.com/activities/hello-world/](https://guides.github.com/activities/hello-world/)
3.  Lähetä muutosehdotus (pull request): (https://help.github.com/articles/creating-a-pull-request/)

### Huomioitavaa muutosehdotuskesta

- Ohje on kaksikielinen (käännöksiin saa tarvittaessa apua muutosehdotuksen yhteydessä tai GitHub issuen kautta)

### HTML-struktuuri

HTML-struktuuri on selostettu tarkemmin [tässä dokumentissa](HTML.md). Tutustu tähän ennen muutosten tekemistä, jotta lähdekoodin yleinen rakenne pysyisi yhtenäisenä ja muiden olisi helppo lisätä kaavoja myös tulevaisuudessa.

### Uusien kaavojen luominen

1. Rakenna [testisivulle](content/test/testpage.html) esimerkiksi uusi kaava, jonka haluaisit lisätä kokoelmaan
2. Kopioi ja liitä se oikeaan taulukkoon paikassa `content/tab-*<aineen_nimi>.html`
3. Älä vie versiohallintaan testisivua
4. Tarkista, että rakenne on oikein ja että ääkköset toimivat (käytössä oltava UTF-8 enkoodaus). Ongelma voi syntyä,
   jos tiedostot tallennetaan Windowsin oletus enkoodauksella. Esimerkiksi Unix-ympäristössä UTF-8 muutos tapahtuu seuraavalla tavalla

```
file tab-<aine>.html // antaa nykyisen enkoodauksen
iconv -f ISO-8859-1 -t UTF-8 tab-<aine>.html > tab-math.html // korvaa nykyisen ISO-enkoodauksen UTF-8
```

### Kaavat näkövammaisille

Matemaattiset kaavat generoidaan näkövammaisille MathML-muodossa, joka voidaan kuunnella NVDA:n MathCAT-fi -laajennoksella.

1. Asenna [NVDA](https://www.nvaccess.org/download/) (vain Windowsille)
1. Seuraa Celian [testausohjeita](https://github.com/samimaattaCelia/MathCAT-fi#testaa-suomenkielist%C3%A4-mathcat-lis%C3%A4osaa-nvda-ruudunlukijalla) ja asenna MathCAT ja MathCAT-fi.
    * NVDA menu (keypad insert + n) > Tools > Add-on store > Available add-ons > MathCAT > Actions > Install
    * Sulje NVDA ja käynnistä se uudelleen
    * Kopioi Languages-hakemiston sisältö testausohjeessa mainitulla tavalla
    * Käynnistä NVDA uudelleen: keypad insert + n > Exit > Alasvetovalikosta "Restart" > OK
    * NVDA:n kieleksi suomi: keypad insert + n > Preferences > Settings > General > NVDA Language: Finnish > Restart now
    * NVDA:n syntetisaattori suomi: keypad insert + n > Asetukset > Asetukset > Puhe > Syntetisaattori "eSpeak NG" > Vaihda
    * MathCATin asetukset suomi: keypad insert + n > Asetukset > MathCATin asetukset > Kieli: Suomi (fi) > OK

SVG-muotoiset kaavat on peitetty näkövammaisilta

## Vinkkejä

- Varsinainen aputiedosto löytyy `content/index.html`. Välilehdet löytyvät `content/tab-*.html`.
- Testisivu kaavojen luomiselle löytyy `content/test/testpage.html`.
- Lopulliset näytettävät tiedostot löytyvät `content/build` -kansion alta ja sen alaisia tiedostoja ei pidä muokata käsin (nämä generoidaan automaattisesti ja eivät ole versionhallinnassa).
- Voit katsoa rakentamatonta sivua lataamalla selaimeen `content/index.html`-tiedoston (lokaalin tiedoston avaavat oikein Firefox/Safari). Ruotsinkielisen tiedoston voit ladata lisäämällä URL:iin `?sv` eli näin: `file:///polku-omalla-levyllasi/content/index.html?sv`

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

## Kiitämme

- Videot: Peter Ahlroos
- Matematiikka: Lotta Oinonen
- Fysiikka: Riitta Salmenoja, Ville Havu, Kristian Meinander
- Kemia: Katariina Tammi
- [FontAwesome 5](https://github.com/FortAwesome/Font-Awesome)

