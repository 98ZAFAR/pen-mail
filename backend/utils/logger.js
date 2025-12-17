const colors = {
  reset: "\x1b[0m",
  bright: "\x1b[1m",
  dim: "\x1b[2m",
  red: "\x1b[31m",
  green: "\x1b[32m",
  yellow: "\x1b[33m",
  blue: "\x1b[34m",
  magenta: "\x1b[35m",
  cyan: "\x1b[36m",
};

class Logger {
  constructor() {
    this.isDevelopment = process.env.NODE_ENV !== "production";
  }

  formatMessage(level, message, meta = {}) {
    const timestamp = new Date().toISOString();
    const metaString = Object.keys(meta).length
      ? `\n${JSON.stringify(meta, null, 2)}`
      : "";
    return `[${timestamp}] [${level}] ${message}${metaString}`;
  }

  info(message, meta = {}) {
    const formattedMessage = this.formatMessage("INFO", message, meta);
    console.log(`${colors.cyan}${formattedMessage}${colors.reset}`);
  }

  success(message, meta = {}) {
    const formattedMessage = this.formatMessage("SUCCESS", message, meta);
    console.log(`${colors.green}${formattedMessage}${colors.reset}`);
  }

  warn(message, meta = {}) {
    const formattedMessage = this.formatMessage("WARN", message, meta);
    console.warn(`${colors.yellow}${formattedMessage}${colors.reset}`);
  }

  error(message, meta = {}) {
    const formattedMessage = this.formatMessage("ERROR", message, meta);
    console.error(`${colors.red}${formattedMessage}${colors.reset}`);
  }

  debug(message, meta = {}) {
    if (this.isDevelopment) {
      const formattedMessage = this.formatMessage("DEBUG", message, meta);
      console.log(`${colors.magenta}${formattedMessage}${colors.reset}`);
    }
  }

  http(message, meta = {}) {
    if (this.isDevelopment) {
      const formattedMessage = this.formatMessage("HTTP", message, meta);
      console.log(`${colors.blue}${formattedMessage}${colors.reset}`);
    }
  }
}

module.exports = new Logger();
