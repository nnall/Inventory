const cors_proxy = require("cors-anywhere");

const host = "0.0.0.0"; // Set the desired host (e.g., '0.0.0.0' to listen on all network interfaces)
const port = 8080; // Set the desired port

cors_proxy
  .createServer({
    originWhitelist: [], // Set the origin whitelist to allow all origins or specify specific origins
  })
  .listen(port, host, () => {
    console.log(`CORS Anywhere proxy running on ${host}:${port}`);
  });
