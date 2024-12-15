# Oppdragsinfo mikrofrontend

(Kort beskrivelse av applikasjonen)
Mer dokumentasjon kan du finne under mappen [dokumentasjon](dokumentasjon)
Backend til applikasjonen er [sokos-oppdrag](https://github.com/navikt/sokos-oppdrag)

## Miljøer

- [Q1-miljø](https://utbetalingsportalen.intern.dev.nav.no/oppdragsinfo)
- [QX-miljø](https://utbetalingsportalen-qx.intern.nav.no/oppdragsinfo)

## Tilganger

### Hvordan få tilgang

Mininum av AD-gruppe som kreves for å få tilgang til skjermbildet:

- `0000-GA-SOKOS-MF-OPPDRAGSINFO-READ` (selve applikasjon i utbetalingsportalen)

Tilgang fås ved ta kontakt med din identansvarlig. Det kan noen ganger være en strevsomt å få på plass tilganger
i identrutinene. Det er derfor viktig å benytte riktig begrep i kommunikasjon med dem (kolonne 1 nedenfor)

### Beskrivelse av AD-grupper og hva de heter i identrutinen

| Navn Identrutinen | AD-gruppe | Applikasjonstilgang | Beskrivelse   |
| ----------------- | --------- | ------------------- | ------------- |
| Navn              | Navn      | X                   | Lesetilgang   |
| Navn              | Navn      | X                   | Skrivetilgang |

## Kom i gang

1. Installere [Node.js](https://nodejs.dev/en/)
2. Installer [pnpm](https://pnpm.io/)
3. Installere dependencies `pnpm install`
4. Start appen lokalt `pnpm run dev:mock` (Mock Service Worker) eller mot backend lokalt `pnpm run dev:backend` [sokos-oppdrag](https://github.com/navikt/sokos-oppdrag)
5. Appen nås på <http://localhost:5173/oppdragsinfo>

NB! Anbefaler sette opp [ModHeader](https://modheader.com/) extension på Chrome for å sende med Obo-token i `Authorization` header når du kjører mot backend lokalt da den krever at token inneholder NavIdent.

# Henvendelser

Spørsmål knyttet til koden eller prosjektet kan stilles som issues her på Github.
Interne henvendelser kan sendes via Slack i kanalen #po-utbetaling.
