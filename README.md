# sokos-mikrofrontend-template

Brukes som utgangspunkt for å opprette nye mikrofrontends i Økonomiportalen.

NB! Navngi følgende: `sokos-op-appNavn` eg: `sokos-op-skattekort`

## Tilpass repo-et

1. Kjør `chmod 755 setupTemplate.sh`
2. Kjør:
   ```
   ./setupTemplate.sh
   ```
3. Kun spesifiser navnet på applikasjonen som skal stå etter sokos-op-`appNavn`. Hvis du ønsker `sokos-op-skattekort` så skriv inn bare `skattekort`.
4. Slett `setupTemplate.sh` hvis du er ferdig med endre navn på prosjektet

5. Sett riktig namespace og team i nais manifestene, de ligger i mappen under `nais/<cluster>`
6. Velg riktig ingress til appen i nais.yaml. Ingressen bør være `https://okonomiportalen.intern.dev.nav.no/appNavn`

# Kom i gang

1. Installere [Node.js](https://nodejs.dev/en/)
2. Installer [pnpm](https://pnpm.io/)
3. Installere dependencies `pnpm intall`
4. Start appen lokalt `pnpm run dev`
5. Appen nås på http://localhost:5173

# Henvendelser

Spørsmål knyttet til koden eller prosjektet kan stilles som issues her på Github.
Interne henvendelser kan sendes via Slack i kanalen #po-utbetaling.
