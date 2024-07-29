import bcolors from "./bcolors";

export default class Logger {
  debugLevel: string;
  cliLevel: string;
  fileLevel: string | null;
  filePath?: string | null;
  format?: string | null;

  levels: {
    [key: string]: number;
    DEBUG: number;
    INFO: number;
    WARNING: number;
    ERROR: number;
    SUCCESS: number;
  };
  colors: {
    [key: string]: string;
    DEBUG: string;
    INFO: string;
    WARNING: string;
    ERROR: string;
    SUCCESS: string;
  };

  constructor() {
    this.debugLevel = "DEBUG";
    this.cliLevel = "INFO";
    this.fileLevel = null;
    this.filePath = null;
    this.format = "{date} {value} {message}";
    this.levels = {
      DEBUG: 4,
      INFO: 3,
      WARNING: 2,
      ERROR: 1,
      SUCCESS: 0,
    };
    this.colors = {
      DEBUG: bcolors.OKCYAN,
      INFO: bcolors.OKBLUE,
      WARNING: bcolors.WARNING,
      ERROR: bcolors.FAIL,
      SUCCESS: bcolors.OKGREEN,
    };
  }

  static new() {
    return new Logger();
  }

  config({
    debug_level,
    cli,
    file = null,
    file_path = null,
    format = null,
  }: {
    debug_level: string;
    cli: string;
    file: string | null;
    file_path: string | null;
    format: string | null;
  }) {
    if (debug_level) this.debugLevel = debug_level;
    if (cli) this.cliLevel = cli;
    if (file) this.fileLevel = file || null;
    if (file_path) this.filePath = file_path || null;
    if (format) this.format = format || null;
  }

  log(level: string, ...messages: (string | number)[]) {
    const currentDate = new Date().toISOString();
    const message = messages.map((msg) => String(msg)).join(" ");
    const formattedMessage = this.format
      ? this.format
          .replace("{date}", currentDate)
          .replace("{value}", level)
          .replace("{message}", message)
      : null;

    if (this.levels[level] <= this.levels[this.cliLevel]) {
      console.log(
        `>>> ${this.colors[level]} ${level} ${bcolors.ENDC} ${message}`
      );
    }

    if (
      this.fileLevel &&
      this.levels[level] <= this.levels[this.fileLevel] &&
      this.filePath
    ) {
      this.writeToFile(formattedMessage);
    }
  }

  writeToFile(message: string | null) {
    const fs = require("fs");
    fs.appendFileSync(this.filePath, message + "\n", "utf8");
  }

  debug(...messages: (string | number)[]) {
    this.log("DEBUG", ...messages);
  }

  info(...messages: (string | number)[]) {
    this.log("INFO", ...messages);
  }

  warning(...messages: (string | number)[]) {
    this.log("WARNING", ...messages);
  }

  error(...messages: (string | number)[]) {
    this.log("ERROR", ...messages);
  }

  success(...messages: (string | number)[]) {
    this.log("SUCCESS", ...messages);
  }
}
