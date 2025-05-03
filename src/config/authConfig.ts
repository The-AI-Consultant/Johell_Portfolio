
// Azure AD (Microsoft identity platform) Configuration
export const msalConfig = {
  auth: {
    clientId: process.env.VITE_MSAL_CLIENT_ID || '',
    authority: `https://login.microsoftonline.com/${process.env.VITE_TENANT_ID}`,
    redirectUri: window.location.origin,
  },
  cache: {
    cacheLocation: 'sessionStorage',
    storeAuthStateInCookie: false,
  },
  auth: {
    clientId: import.meta.env.VITE_AZURE_CLIENT_ID || '',
    authority: "https://login.microsoftonline.com/common",
    redirectUri: window.location.origin,
  },
  cache: {
    cacheLocation: "sessionStorage",
    storeAuthStateInCookie: false,
  },
};

export const graphConfig = {
  graphMeEndpoint: "https://graph.microsoft.com/v1.0/me",
  graphDriveEndpoint: "https://graph.microsoft.com/v1.0/me/drive",
  graphPhotosFolder: "Photos",
  scopes: [
    "User.Read",
    "Files.Read",
    "Files.ReadWrite",
    "Files.Read.All",
    "Files.ReadWrite.All"
  ]
};
