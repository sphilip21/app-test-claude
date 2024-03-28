import Keycloak from "keycloak-js";

const keycloak = new Keycloak({
  realm: "trg-dev",
  url: "https://keycloak.snap.triple.engineering/",
  clientId: "trg-dev-ui",
});

export default keycloak;