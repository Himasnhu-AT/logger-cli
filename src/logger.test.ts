import Logger from "./logger";

describe("Logger", () => {
  let logger: Logger;

  beforeEach(() => {
    jest.clearAllMocks();
    logger = Logger.new();
  });

  it("should log debug message", () => {
    logger.config({
      debug_level: "DEBUG",
      cli: "DEBUG",
      file: null,
      file_path: null,
      format: null,
    });
    const consoleSpy = jest.spyOn(console, "log").mockImplementation(() => {});
    logger.debug("Debug message");
    expect(consoleSpy).toHaveBeenCalledWith(
      ">>> \x1b[96m DEBUG \x1b[0m Debug message"
    );
  });

  it("should log info message", () => {
    logger.config({
      debug_level: "INFO",
      cli: "INFO",
      file: null,
      file_path: null,
      format: null,
    });
    const consoleSpy = jest.spyOn(console, "log");
    logger.info("Info message");
    expect(consoleSpy).toHaveBeenCalledWith(
      ">>> \x1b[94m INFO \x1b[0m Info message"
    );
  });

  it("should log warning message", () => {
    logger.config({
      debug_level: "WARNING",
      cli: "WARNING",
      file: null,
      file_path: null,
      format: null,
    });
    const consoleSpy = jest.spyOn(console, "log");
    logger.warning("Warning message");
    expect(consoleSpy).toHaveBeenCalledWith(
      ">>> \x1b[93m WARNING \x1b[0m Warning message"
    );
  });

  it("should log error message", () => {
    logger.config({
      debug_level: "ERROR",
      cli: "ERROR",
      file: null,
      file_path: null,
      format: null,
    });
    const consoleSpy = jest.spyOn(console, "log");
    logger.error("Error message");
    expect(consoleSpy).toHaveBeenCalledWith(
      ">>> \x1b[91m ERROR \x1b[0m Error message"
    );
  });

  it("should log success message", () => {
    logger.config({
      debug_level: "SUCCESS",
      cli: "SUCCESS",
      file: null,
      file_path: null,
      format: null,
    });
    const consoleSpy = jest.spyOn(console, "log");
    logger.success("Success message");
    expect(consoleSpy).toHaveBeenCalledWith(
      ">>> \x1b[92m SUCCESS \x1b[0m Success message"
    );
  });

  it("should write to file if fileLevel is set", () => {
    const fsSpy = jest.spyOn(logger, "writeToFile");
    logger.config({
      debug_level: "DEBUG",
      cli: "INFO",
      file: "DEBUG",
      file_path: "./demo.log",
      format: "{date} {value} {message}",
    });
    logger.debug("Debug message");
    expect(fsSpy).toHaveBeenCalledWith(
      expect.stringContaining("Debug message")
    );
  });
});
