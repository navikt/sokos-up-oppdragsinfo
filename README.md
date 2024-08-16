# sokos-up-oppdragsinfo

# Kom i gang

1. Installere [Node.js](https://nodejs.dev/en/)
2. Installer [pnpm](https://pnpm.io/)
3. Installere dependencies `pnpm install`
4. Start appen lokalt `pnpm run dev` (mock) eller mot backend lokalt `pnpm run dev:backend` [sokos-oppdrag](https://github.com/navikt/sokos-oppdrag)
5. Appen nås på http://localhost:5173

### Start appen mot test miljøet

Endre vite.config.ts server.proxy innstilling med:

```javascript
proxy: {
   "/oppdrag-api/api/v1": {
   target: "https://sokos-oppdrag.dev-fss-pub.nais.io",
   rewrite: (path: string) => path.replace(/^\/oppdrag-api/, ""),
   changeOrigin: true,
   secure: true
  }
}
```

Start applikasjon med `pnpm run dev:backend` som backend loaklt.

NB! Anbefaler sette opp [ModHeader](https://modheader.com/) extension på Chrome for å sende med Obo-token i `Authorization` header når du kjører mot backend lokalt da den krever at token inneholder NavIdent.

# Henvendelser

Spørsmål knyttet til koden eller prosjektet kan stilles som issues her på Github.
Interne henvendelser kan sendes via Slack i kanalen #po-utbetaling.
