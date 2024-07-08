//src/index.js

import app from "./app";
const main = () => {
  app.listen(app.get("port"));
  console.log(`Puerto corriendo en ${app.get("port")}`);
};
main();
