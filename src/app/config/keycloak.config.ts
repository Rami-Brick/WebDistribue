import {KeycloakConfig} from "keycloak-js";

const keycloakConfig: KeycloakConfig = {
  url: 'http://localhost:9090', // Keycloak server URL
  realm: 'CapFest-Project',      // Your Keycloak realm
  clientId: 'Cap'    // The client ID you configured in Keycloak for your front-end
};

export default keycloakConfig;
