import { Link, useNavigate } from "react-router";
import { BodyShort, Box, Heading, List } from "@navikt/ds-react";

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <Box paddingBlock="20 16" data-aksel-template="404-v2">
      <div>
        <Heading level="1" size="large" spacing>
          Beklager, vi fant ikke siden
        </Heading>
        <BodyShort>
          Denne siden kan være slettet eller flyttet, eller det er en feil i
          lenken.
        </BodyShort>
        <List>
          <List.Item>Bruk gjerne søket eller menyen</List.Item>
          <List.Item>
            <Link to="" onClick={() => navigate(-1)}>
              Gå tilbake til forrige side
            </Link>
          </List.Item>
        </List>
      </div>
    </Box>
  );
}
