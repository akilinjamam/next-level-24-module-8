import app from './app';
import mongoose from 'mongoose';
import config from './app/config';
import { Server } from 'http';

let server: Server;

const port = config.port;
async function main() {
  try {
    await mongoose.connect(config.database_url as string);

    server = app.listen(port, () => {
      console.log(`app listening on port ${port}. http://localhost:${port}`);
    });
  } catch (error) {
    console.log(error);
  }
}

main();

// handling unhandle rejection

process.on('unhandledRejection', () => {
  console.log(`unhandleRejection is detected, sutting down....`);
  if (server) {
    server.close(() => {
      process.exit(1);
    });
  }
  process.exit(1);
});

//handling uncaughtExceptions
process.on('uncaughtException', () => {
  console.log(`uncaught exception is detected, shutting down...`);
});
