import { join } from "path";
import { mkdirSync } from "fs";
import * as rimraf from "rimraf";
import { PythonShell, Options } from "python-shell";

const script = join(__dirname, "./split.py");

export type fileOptions = {
  inputFile: string;
  dataFile: string;
  outputDir: string[];
  numPages: string;
};

export const init = async (opts: fileOptions): Promise<string> => {
  const outputDirStr = opts.outputDir[opts.outputDir.length - 1];
  const options: Options = {
    mode: "text",
    args: [opts.inputFile, outputDirStr, opts.numPages, opts.dataFile] //
  };
  return new Promise(async (resolve, reject) => {
    try {
      await Promise.all(
        opts.outputDir.map(async (pth: string) => rimraf.sync(pth))
      );

      await Promise.all(
        opts.outputDir.map(async (pth: string) => mkdirSync(pth))
      );
      let pyshell = new PythonShell(script, options);

      // sends a message to the Python script via stdin

      pyshell.on("message", function(message) {
        // received a message sent from the Python script (a simple "print" statement)
        resolve(message);
      });

      // end the input stream and allow the process to exit
      pyshell.end(function(err) {
        if (err) reject(err);
      });
    } catch (error) {
      reject(error);
    }
  });
};
