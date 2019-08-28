import { Command, flags } from "@oclif/command";
import { split } from "../app";

export default class Start extends Command {
  static description =
    "starts splitting your file. Make sure your pdf file and data file are both in the current directory.";

  static flags = {
    help: flags.help({ char: "h" })
  };

  async run() {
    const { args, flags } = this.parse(Start);
    split();
  }
}
