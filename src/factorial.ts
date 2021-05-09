import { config } from "./config.ts";
import { fillShifts } from "./fillShift.ts";
import { cac } from "../deps.ts";

const cli = cac("factorial");

cli
  .command("fill-shifts", "Fills the shifts of the given year and month")
  .option(
    "--year <year>",
    "Sets the year to fill the shifts. Defaults to current year.",
    {
      default: config.YEAR,
    },
  )
  .option(
    "--month <month>",
    "Sets the month to fill the shifts. Defaults to current month 5 days ago.",
    {
      default: config.MONTH,
    },
  )
  .option(
    "--email <email>",
    "The email of your factorial account. Also configurable via FACTORIAL_USER_EMAIL env variable.",
    {
      default: config.USER_EMAIL,
    },
  )
  .option(
    "--password <password>",
    "The password of your factorial account. Also configurable via FACTORIAL_USER_PASSWORD env variable.",
  )
  .example("factorial fill-shifts --year 2021 --month 1")
  .action(({ year, month, email, password = config.USER_PASSWORD }) => {
    if (email === "???" || password === "???") {
      console.log("error: Missing email/password\n");
      console.log("For more information try --help");
      Deno.exit(1);
    }

    return fillShifts(email, password, year, month);
  });

cli.help();

cli.version("1.0.0");

cli.parse(["deno", "cli", ...Deno.args], { run: false });

await cli.runMatchedCommand();