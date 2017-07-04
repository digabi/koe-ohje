# HTML struktuuri tarkemmin

Itse taulukot noudattavat seuraavanlaista HTML-rakennetta. Huomaa että ruotsinkieliset versiot pitää
lisätä duplikaatteina eikä niitä ole seuraavassa tarkemmin eritelty selkeyden vuoksi

### Yleisrakenne

```html
<h3>Yläotsikko</h3>
    <div class="scrollwrap">
        <h4>Alaotsikko</h4>
        <table class="formulae">
        .
        . välissä LaTeX kaavoja ja soluja
        .
        </table>
    </div>
```

### Otsikot

`<h3></h3>` muodostavat automaattisesti sivupalkin ylätason otsikot, jotka voivat kuvata muunmuassa eri aiheita.

`<h4></h4>` on aihealueen alaotsikko.

Esimerkki matematiikasta

```html
<h3>Algebra</h3>
    <div class="scrollwrap">
        <h4>Itseisarvo</h4>
        .
        .
        .
    </div>
```

Kaavan lisääminen otsikkoon tapahtuu seuraavalla tavalla
```html
<h3>Geometria</h3>
<div class="scrollwrap">
    <h4>Pythagoran lauseke</h4>
    <span>\( a^2 + b^2 = c^2 \)</span>
    <table class="formulae">
        .
        .
        .
    </table>
</div>
```

Lopullinen otsikko näyttää tällöin sivulla muodolta `Pythagoran lauseke <kaava>`, josta vain edellisen esimerkin `<h4></h4>`
tagien sisäinen osa otetaan mukaan lopulliseen sisällysluetteloon.

### Kuvat

Tallenna kuvat aina `.svg`-muodossa ja kansioon `content/images`. Katso testisivulta miten kuvat upotetaan lähdekoodiin.

### Kielet

Suomen ja ruotsin kielen tuki on toteutettu niin, että lisäämällä mille tahansa HTML-elementille luokan `class="fi"` tai vastaavasti
`class="sv"`, saadaan eriteltyä suomenkieliset ja ruotsinkieliset kaavat. Kerrallaan on valittuna aina yksi kieli sivustolla, jolloin esimerkiksi
suomenkielinen valinta piilottaa automaattisesti kaikki ruotsinkieliset elementit.

### Muuta

Helpoin tapa on noudattaa jo olemassa olevaa lähdekoodia ja pitää sitä esimerkkinä, kun tekee uusia kaavoja.