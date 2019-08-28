# split-pdf

A command line to split a pdf file into multiple files

<!-- toc -->
* [split-pdf](#split-pdf)
* [Usage](#usage)
* [Commands](#commands)
<!-- tocstop -->

# Usage

<!-- usage -->
```sh-session
$ npm install -g @mmogib/split-pdf
$ split-pdf COMMAND
running command...
$ split-pdf (-v|--version|version)
@mmogib/split-pdf/0.0.1 linux-x64 node-v11.14.0
$ split-pdf --help [COMMAND]
USAGE
  $ split-pdf COMMAND
...
```
<!-- usagestop -->

# Commands

<!-- commands -->
* [`split-pdf help [COMMAND]`](#split-pdf-help-command)
* [`split-pdf start`](#split-pdf-start)

## `split-pdf help [COMMAND]`

display help for split-pdf

```
USAGE
  $ split-pdf help [COMMAND]

ARGUMENTS
  COMMAND  command to show help for

OPTIONS
  --all  see all commands in CLI
```

_See code: [@oclif/plugin-help](https://github.com/oclif/plugin-help/blob/v2.2.1/src/commands/help.ts)_

## `split-pdf start`

starts splitting your file. Make sure your pdf file and data file are both in the current directory.

```
USAGE
  $ split-pdf start

OPTIONS
  -h, --help  show CLI help
```

_See code: [src/commands/start.ts](https://github.com/mmogib/split-pdf/blob/v0.0.1/src/commands/start.ts)_
<!-- commandsstop -->
