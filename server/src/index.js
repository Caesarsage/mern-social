import { readConfig } from "./config.js";
import { startServer } from "./server.js"

export const launchServer = async () => {
  const app = await startServer(readConfig);

  const port = readConfig.port || 5000;
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
};

launchServer();