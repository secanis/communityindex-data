## Gemeindeverzeichnis
Die Daten des BFS werden für die Applikationen von gemeindeverzeichnis.ch, siehe auch [https://gemeindeverzeichnis.ch](https://gemeindeverzeichnis.ch), verwendet.

Diese Gemeindedaten stammen aus einem Excel des BFS, welches unter dem folgenden Link zu finden ist: [https://opendata.swiss/de/dataset/regionalportraets-kennzahlen-aller-gemeinden](https://opendata.swiss/de/dataset/regionalportraets-kennzahlen-aller-gemeinden).

Dieser Datensatz beinhaltet sämtliche Gemeinder der Schweiz inkl. interessanter Kenndaten zu den jeweiligen Gemeinden.


## Verfügbare Datensätze

In diesem Repo wird eine Konvertierung dieses Execls als JSON Daten angeboten. Die Daten wurden auf drei Arten konvertiert.

- 2x als JSON (einmal normal formatiert und einmal verdichtet ohne Formattierung um Speicherplatz zu sparen)
- 1x als NeDB Datenbank File für Backend Systeme auf Basis von MongoDB oder NeDB und NodeJS

## Linzenz

Die Daten unterstehen den Lizenzbedignungen des BFS und der Opendata.swiss Plattfrom ([https://opendata.swiss/de/terms-of-use](https://opendata.swiss/de/terms-of-use))

**Freie Nutzung. Quellenangabe ist Pflicht. Kommerzielle Nutzung nur mit Bewilligung des Datenlieferanten zulässig.**

- Sie dürfen diesen Datensatz für nicht kommerzielle Zwecke nutzen.
- Sie dürfen diesen Datensatz für kommerzielle Zwecke nutzen, sofern Sie eine entsprechende Bewilligung beim Datenlieferanten eingeholt haben.
- Eine Quellenangabe ist Pflicht (Autor, Titel und Link zum Datensatz).