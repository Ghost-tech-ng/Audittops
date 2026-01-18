// Simple in-memory logger for debugging Vercel deployments
// Stores the last N log entries in memory
// NOTE: This is ephemeral and resets on server restart/cold start

class DebugLogger {
    private logs: string[] = [];
    private readonly MAX_LOGS = 1000;

    constructor() {
        this.add("Logger initialized");
    }

    private timestamp(): string {
        return new Date().toISOString();
    }

    add(message: string, data?: any) {
        const entry = `[${this.timestamp()}] [INFO] ${message} ${data ? JSON.stringify(data) : ''}`;
        this.push(entry);
        console.log(entry); // Also log to stdout for Vercel dashboard
    }

    error(message: string, error?: any) {
        const errorStr = error instanceof Error ? `${error.message}\n${error.stack}` : JSON.stringify(error);
        const entry = `[${this.timestamp()}] [ERROR] ${message} ${errorStr ? ': ' + errorStr : ''}`;
        this.push(entry);
        console.error(entry);
    }

    private push(entry: string) {
        this.logs.push(entry);
        if (this.logs.length > this.MAX_LOGS) {
            this.logs.shift(); // Remove oldest
        }
    }

    getLogs(): string {
        return this.logs.join('\n');
    }

    clear() {
        this.logs = [];
        this.add("Logs cleared");
    }
}

export const debugLogger = new DebugLogger();
