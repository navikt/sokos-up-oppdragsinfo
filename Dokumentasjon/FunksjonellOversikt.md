# Funksjonell Oversikt over Oppdragsinformasjonskjermbildet i Utbetalingsportalen

## Søk

Søkebildet nås på /oppdragsinfo/

Siden laster inn faggrupper fra backend. Disse vises i en nedtrekksmeny.

Her legger man inn Gjelder-ID og faggruppe.
Det er valgfritt å velge en faggruppe og dette fungerer bare som filter på de oppdrag man får i trefflisten basert på gjelder-id.

Når man skriver inn en ny Gjelder-ID og trykker enter eller klikker på "søk", vil vi sette et flagg som sender brukeren til Trefflistesiden dersom det er funnet noen oppdrag på personen.
Dette flagget settes ikke når man velger faggruppe.

### Ingen oppdrag

Dersom trefflisten ikke inneholder noen oppdrag eller personen ikke finnes
