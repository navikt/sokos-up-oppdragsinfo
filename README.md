# Oppdragsinfo mikrofrontend

(Kort beskrivelse av applikasjonen)
</br>Mer dokumentasjon kan du finne under mappen [dokumentasjon](dokumentasjon)
</br>Backend til applikasjonen er [sokos-oppdrag](https://github.com/navikt/sokos-oppdrag)

## Miljøer

- [Q1-miljø](https://utbetalingsportalen.intern.dev.nav.no/oppdragsinfo)
- [QX-miljø](https://utbetalingsportalen-qx.intern.nav.no/oppdragsinfo)

## Tilganger

### Hvordan få tilgang

For å få tilgang til selve skjermbildet (basistilgang):

- `0000-GA-SOKOS-MF-OPPDRAGSINFO` (selve applikasjon i Utbetalingsportalen)

Tilgang fås ved ta kontakt med din identansvarlig. Det kan noen ganger være en strevsomt å få på plass tilganger
i identrutinene. Det er derfor viktig å benytte riktig begrep i kommunikasjon med dem.

### Beskrivelse av AD-grupper og hva de heter i identrutinen

| Navn Identrutinen                                            | AD-gruppe                                    | Beskrivelse                                                             |
| ------------------------------------------------------------ | -------------------------------------------- | ----------------------------------------------------------------------- |
| Utbetalingsportalen - oppdragsinfo - Applikasjonstilgang     | 0000-GA-SOKOS-MF-Oppdragsinfo                | Basis tilgang                                                           |
| Utbetalingsportalen – oppdragsinfo - lesetilgang - NØS       | 0000-GA-SOKOS-MF-OppdragsInfo-NØS-READ       | Lese tilgang for NØS                                                    |
| Utbetalingsportalen – oppdragsinfo - lesetilgang - NØP       | 0000-GA-SOKOS-MF-OppdragsInfo-NØP-READ       | Lese tilgang for NØP                                                    |
| Utbetalingsportalen – oppdragsinfo - lesetilgang – nasjonalt | 0000-GA-SOKOS-MF-OppdragsInfo-nasjonalt-READ | Lese tilgang for landekkende                                            |
| Økonomiportalen - Egne ansatte                               | 0000-GA-okonomi-egne_ansatte                 | Tilgang for å se egne ansatte                                           |
| Økonomiportalen - Fortrolig                                  | 0000-GA-okonomi-fortrolig                    | Tilgang for å se fortrolig, kode 6 (Adressebeskyttede personer)         |
| Økonomiportalen - Strengt fortrolig                          | 0000-GA-okonomi-strengt_fortrolig            | Tilgang for å se strengt fortrolig, kode 7 (Adressebeskyttede personer) |

## Kom i gang

1. Installere [Node.js](https://nodejs.dev/en/)
2. Installer [pnpm](https://pnpm.io/)
3. Installere dependencies `pnpm install`
4. Start appen lokalt `pnpm run dev` (Mock Service Worker) eller mot backend lokalt `pnpm run dev:backend` [sokos-oppdrag](https://github.com/navikt/sokos-oppdrag)
5. Appen nås på <http://localhost:5173/oppdragsinfo>

NB! Anbefaler sette opp [ModHeader](https://modheader.com/) extension på Chrome for å sende med Obo-token i `Authorization` header når du kjører mot backend lokalt da den krever at token inneholder NavIdent.

# Henvendelser

Spørsmål knyttet til koden eller prosjektet kan stilles som issues her på Github.
Interne henvendelser kan sendes via Slack i kanalen #po-utbetaling.
