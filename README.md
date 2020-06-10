![schweizer_gemeindeverzeichnis_logo.jpg](images/schweizer_gemeindeverzeichnis_logo.png)

> Neue Datenstruktur ab 2020 (Daten 2019 ebenfalls verfügbar)

## Gemeindeverzeichnis
Die Daten des BFS werden für die Applikationen von gemeindeverzeichnis.ch, siehe auch [https://gemeindeverzeichnis.ch](https://gemeindeverzeichnis.ch), verwendet.

Diese Gemeindedaten stammen aus einem Excel des BFS, welches unter dem folgenden Link zu finden ist:
- [Opendata Swiss - Regionalportraets und Kennzahlen aller Gemeinden](https://opendata.swiss/de/organization/bundesamt-fur-statistik-bfs?q=regionalportr%C3%A4ts&sort=score+desc%2C+metadata_modified+desc)
- [Website BFS - Regionalportraets und Kennzahlen aller Gemeinden](https://www.bfs.admin.ch/bfs/de/home/statistiken/regionalstatistik/regionale-portraets-kennzahlen/gemeinden.html)

Dieser Datensatz beinhaltet sämtliche Gemeinder der Schweiz inkl. interessanter Kenndaten zu den jeweiligen Gemeinden.

## Verfügbare Datensätze

In diesem Repo werden teils vorbereitete oder auch konvertierte Daten des BFS und anderen Datenhaltern angeboten.
Im Moment handelt es sich um die folgenden Daten:

- 21.03.01 - BFS Daten über die Kennzahlen der Gemeinden
- energy-city - Datensatz über alle Energiestädte der Schweiz

### Schema

Die Datenschemas werden aus den erstellten Daten generiert und ebenfalls im Release zur Verfügung gestellt.
Hierbei gilt es zu beachten, dass teilweise das BFS für z.B. nicht erhobene Daten einer Gemeinde Füllzeichen wie `-` oder `*` benützt.

## Anleitung

### Requirements

- GIT
- NodeJS

### Steps

- Git Clone
- `cd converter; npm install`
- Bevor der Converter Vorgang gestartet werden kann, müssen zuerst alle erforderlichen Daten vom [BFS])https://www.bfs.admin.ch/bfs/de/home/statistiken/regionalstatistik/regionale-portraets-kennzahlen/gemeinden.html) in den `./dist` Ordner heruntergeladen werden.
Per default werden alle Sprachen benötigt.
- Den Converter Vorgang wie folgt starten `cd converter` `./bin/run.cmd -L d -L e -L f -L i -I 21.03.01`
- Die generierten Files liegen danach unter `./dist/export`

## Lizenz / Daten Lizenz

Dieses Repo unterliegt der MIT Lizenz, siehe Github Link.

Die Daten unterstehen den Lizenzbedignungen des BFS und der Opendata.swiss Plattfrom ([https://opendata.swiss/de/terms-of-use](https://opendata.swiss/de/terms-of-use))

**Freie Nutzung. Quellenangabe ist Pflicht. Kommerzielle Nutzung nur mit Bewilligung des Datenlieferanten zulässig.**

- Sie dürfen diesen Datensatz für nicht kommerzielle Zwecke nutzen.
- Sie dürfen diesen Datensatz für kommerzielle Zwecke nutzen, sofern Sie eine entsprechende Bewilligung beim Datenlieferanten eingeholt haben.
- Eine Quellenangabe ist Pflicht (Autor, Titel und Link zum Datensatz).

## Development

```
cd converter
npm install
./bin/run --help
```
