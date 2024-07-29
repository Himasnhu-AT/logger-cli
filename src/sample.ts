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
