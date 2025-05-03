// Configuration for MSAL authentication
export const msalConfig = {
  auth: {
    clientId: "YOUR_ONEDRIVE_APPLICATION_ID", // Replace with your OneDrive app registration client ID
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
  graphPhotosFolder: "Photos", // Main folder for all photos in OneDrive
};