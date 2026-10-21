const { username, password } = process.env;
export const connectionStr =
  "mongodb+srv://" +
  username +
  ":" +
  password +
  "@cluster0.hgogt9y.mongodb.net/restoDB";
