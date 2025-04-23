/**
 * Custom logger utility for Playwright tests
 * Provides detailed logging for actions, assertions and steps
 */

enum LogLevel {
  INFO = 'INFO',
  DEBUG = 'DEBUG',
  ERROR = 'ERROR',
  WARNING = 'WARNING',
  SUCCESS = 'SUCCESS'
}

export class Logger {
  private static getTimestamp(): string {
    return new Date().toISOString();
  }

  private static formatMessage(level: LogLevel, message: string): string {
    const timestamp = this.getTimestamp();
    return `[${timestamp}] [${level}] ${message}`;
  }

  static info(message: string): void {
    console.log(`\x1b[36m${this.formatMessage(LogLevel.INFO, message)}\x1b[0m`);
  }

  static debug(message: string): void {
    console.log(`\x1b[90m${this.formatMessage(LogLevel.DEBUG, message)}\x1b[0m`);
  }

  static error(message: string): void {
    console.error(`\x1b[31m${this.formatMessage(LogLevel.ERROR, message)}\x1b[0m`);
  }

  static warning(message: string): void {
    console.warn(`\x1b[33m${this.formatMessage(LogLevel.WARNING, message)}\x1b[0m`);
  }

  static success(message: string): void {
    console.log(`\x1b[32m${this.formatMessage(LogLevel.SUCCESS, message)}\x1b[0m`);
  }

  static step(stepName: string): void {
    console.log(`\x1b[35m${this.formatMessage(LogLevel.INFO, `STEP: ${stepName}`)}\x1b[0m`);
  }

  static assertion(message: string, status: boolean): void {
    if (status) {
      this.success(`ASSERTION PASSED: ${message}`);
    } else {
      this.error(`ASSERTION FAILED: ${message}`);
    }
  }
}