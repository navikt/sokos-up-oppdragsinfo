# Dokumentasjon(gammel løsning)

```mermaid
flowchart LR
    Søk
    Validering{Validering}
    Treffliste
    Oppdragsdetalj
    Enhetshistorikk
    Statushistorikk
    Oppdragslinjedetaljer
    Valuta
    Skyldner
    Enhet
    Grad
    Tekst
    Kid
    Kravhaver
    Maksdato
    Øvrig["Øvrige felter"]

    Søk --> Validering
    Validering -- Feil input --> Søk
    Validering --> Treffliste
    Treffliste -- Velger 1 --> Oppdragsdetalj
    Oppdragsdetalj --> Treffliste
    Validering -- Bare 1 treff--> Oppdragsdetalj
    Oppdragsdetalj --> Søk
    Oppdragsdetalj -.- Enhetshistorikk
    Oppdragsdetalj -.- Statushistorikk
    Oppdragsdetalj <---> Oppdragslinjedetaljer
    Oppdragslinjedetaljer -.- Valuta
    Oppdragslinjedetaljer -.- Skyldner
    Oppdragslinjedetaljer -.- Enhet
    Kid -.- Oppdragslinjedetaljer
    Kravhaver -.- Oppdragslinjedetaljer
    Maksdato -.- Oppdragslinjedetaljer
    Øvrig -.- Oppdragslinjedetaljer
    Grad -.- Oppdragslinjedetaljer
    Oppdragslinjedetaljer -.- Tekst
    Øvrig ~~~ Kravhaver
    Maksdato ~~~ Kravhaver
    Grad ~~~ Kravhaver
```

Stiplede linjer vil si at det er en popup

## Lister

Vi bruker [Aksels tabell](https://aksel.nav.no/komponenter/core/table#tabledemo-sortable),
innebygde sortable som erstatning for sorteringslenker,
og med innebygget pagination som erstatning for Forrige- og Neste-knapper.
Bare dette gjør den nye løsningen svært mye enklere enn den gamle.

NB! Det er også innebygget paginering i backend, slik ast vi slipper å hente ut mer data enn vi faktisk trenger for å
vise det saksbehandler kan se på skjermen.

## Popup

Mange av knappene i den gamle løsningen brukte knapper for å åpne popups for å vise forskjellig informasjon.
Vi kan bruke [Popover](https://aksel.nav.no/komponenter/core/popover) eller [Modal](https://aksel.nav.no/komponenter/core/modal)

## Navigering

I den gamle løsningen er det helt separate sider for visning av oppdrag og -linje, med knapper for å navigere mellom dem.

## Komponenter i Oppdragsinfo

### Søk

![Søk](sok.png)

Søket baserer seg på Faggruppe(nedtrekksmeny), Gjelder-ID, Fagsystem-ID og Dato FOM
Vi kan lene oss kraftig på [ORS sitt Posteringsøk](https://github.com/navikt/sokos-up-ors/blob/master/src/components/PosteringS%C3%B8kPanel.tsx)
men hvis vi kan validere med [Zod](https://zod.dev/) så kan det gi typesikkerhet i runtime som Typescript ikke har, med mindre kode.

Foretrekk BodyShort og BodyLong foran mye css og br-elementer

### Treffliste

![Treffliste](treffliste.png)

### Oppdragsdetaljtabell

![Oppdragsdetaljtabell](oppdrag.png)
Knappene øverst til høyre for Statushistorikk og enhetshistorikk viste en popup.
Treffliste navigerte tilbake til Treffliste
![Statushistorikk](statushistorikk.png)
![Enhetshistorikk](enhetshistorikk.png)

### Oppdragslinjedetaljtabell

![Oppdragslinjedetaljtabell](linje.png)

Knappene nederst er lenke til popuper:
![Øvrige felter...](øvrigeFelter.png)
