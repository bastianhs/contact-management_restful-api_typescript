import { logger } from "./application/logging";
import { web } from "./application/web";


export const port = process.env.PORT || 4000;
web.listen(port, () => {
  logger.info(`Listening on port ${port}`);
});
