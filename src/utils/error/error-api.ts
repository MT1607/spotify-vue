export class ErrorApi extends Error {
    public code?: string;
    public status: number;

    constructor(message: string, status?: number, code?: string,) {
        super(message);
        this.code = code;
        this.status = status;
        this.name = "ErrorApi"
    }
}