# @himanshu806/logger

## Description

NPM package to log your applications efficiently.

## Installation

```bash
npm i @himanshu806/logger
```

## Usage

```javascript
import Logger from "./logger";

const logger = Logger.new();
logger.config({
  debug_level: "DEBUG",
  cli: "INFO",
  file: "DEBUG",
  file_path: "./demo.log",
  format: "{date} {value} {message}",
});

logger.error("Something went wrong");
logger.warning("Didn't find data");
logger.debug("Values of a:", 42, "and b:", 24);
logger.info("Completed step a");
logger.success("Completed");
```

## Configuration

- **debug_level**: The level of logs to be displayed. Default: `"DEBUG"`
- **cli**: The level of logs to be displayed in the console. Default: `"INFO"`
- **file**: The level of logs to be written to the file. Default: `"null"`
- **file_path**: The path of the file to write logs. Default: `"null"`
- **format**: The format of the log message. Default: `"{date} {value} {message}"`
