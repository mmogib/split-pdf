import { getPathsForSpecificExtensions, filePath } from "./fns";
import { fileOptions, init } from "./utilfns";
import { prompt, QuestionCollection } from "inquirer";
import chalk from "chalk";
import { Spinner } from "cli-spinner";
const log = console.log;

const cwd = process.cwd();
export const split = () => {
  const pdfFiles: filePath[] = getPathsForSpecificExtensions(cwd, [".pdf"]);
  if (pdfFiles.length === 0) {
    log(chalk.bgRed("No input pdf files found"));
    process.exit();
  }
  const csvFiles = getPathsForSpecificExtensions(cwd, [".csv", ".txt"]);

  const paretFolder: string = pdfFiles[0].parent;

  const questions: QuestionCollection = [
    {
      name: "inputFile",
      type: "list",
      choices: [...pdfFiles.map((pth: filePath) => pth.basename + pth.ext)],
      message: "choose the input file?",
      filter: v =>
        pdfFiles
          .filter((vv: filePath) => vv.basename + vv.ext === v)
          .map((pth: filePath) => pth.path)[0]
    },
    {
      name: "numPages",
      type: "input",
      message: "type number of pages to split the file.",
      default: "2"
    },
    {
      name: "dataFile",
      type: "list",
      choices: [
        "new",
        ...csvFiles.map((pth: filePath) => pth.basename + pth.ext)
      ],
      message: "choose the source of naming your output files.",
      filter: v =>
        v === "new"
          ? ""
          : csvFiles
              .filter((vv: filePath) => vv.basename + vv.ext === v)
              .map((pth: filePath) => pth.path)[0]
    },
    {
      name: "csvUserDefined",
      type: "input",
      message:
        "type the string that will be used for naming your output files.",
      default: "output",
      when: answers => answers["dataFile"] === ""
    },
    {
      name: "outputDir",
      type: "input",
      message: "type the string that will be used to save your output files.",
      default: "output_files",
      filter: v =>
        v
          .replace(/\\/g, "/")
          .split("/")
          .reduce(
            (vv1: string[], vv2: string) => [
              ...vv1,
              (vv1[vv1.length - 1] || "") + "/" + vv2
            ],
            []
          )
          .map((pth: string) => paretFolder + pth)
    }
  ];

  prompt(questions).then(
    async ({ inputFile, dataFile, outputDir, numPages, csvUserDefined }) => {
      const opts: fileOptions = {
        inputFile,
        dataFile: csvUserDefined === "new" ? "" : dataFile,
        outputDir,
        numPages
      };
      const spinner = new Spinner(
        chalk.magentaBright("%s Your file is being split. Please wait ...")
      );
      spinner.start();
      init(opts)
        .then(() => {
          spinner.stop();
          process.stdout.write("\n");
          log(chalk.green(" Done."));
        })
        .catch(err => {
          spinner.stop();
          process.stdout.write("\n");
          log(chalk.red("\n " + err));
        });
    }
  );
};
