const jdb = require("simple-json-db");
const cryptojs = require("crypto-js");

const db = new jdb("./spaces.json");

(async()=>{
  const { Chalk } = await getModule("chalk");
  const chalk = new Chalk();

  console.log(chalk)

  console.log(
    chalk.blue.bold("Welcome to the interactive space creation\n panel for PushSocket!")
  );

  const space_id = await prompt(chalk.green.bold("Please choose a space ID: "));
  let space_pass = await prompt(chalk.green.bold("Please choose a space password (blank = none): "));

  if (space_pass == "") 
    space_pass = "password";
  if (space_id == "") 
    return console.log(chalk.red.bold("Space ID mustn't be empty!"));

  db.set(space_id, {
    password: encrypt(space_pass)
  });

  if (db.has(space_id)) {
    console.log(chalk.green.bold.italic("Successfully created space!"));
    process.exit(1);
  } else {
    console.log(chalk.red.bold.italic("Failed to create space!"));
    process.exit(1);
  }
})();

async function prompt(text) {
  return new Promise((resolve) => {
    process.stdout.write(text);
    process.stdin.on("data", (data) => {
      resolve(data.toString().replace("\n", ""));
    });
  });
}

async function getModule(pathOrName) {
  return new Promise(async (resolve) => {
    let m = await import(pathOrName);

    resolve(m);
  });
}

function encrypt(data) {
  const enc = cryptojs.AES.encrypt(data, process.env.ENCRYPTION_KEY);

  return enc.toString();
}