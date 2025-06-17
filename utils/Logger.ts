export class Logger {
    constructor(private className: string) {}

    info(message: string): void {
        console.log(`[INFO] [${this.className}] ${new Date().toISOString()} - ${message}`);
    }

    error(message: string): void {
        console.error(`[ERROR] [${this.className}] ${new Date().toISOString()} - ${message}`);
    }

    warn(message: string): void {
        console.warn(`[WARN] [${this.className}] ${new Date().toISOString()} - ${message}`);
    }
}
