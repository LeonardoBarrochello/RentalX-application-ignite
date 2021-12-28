export default class AppError {
    public readonly message: string;
    public readonly statusCode: number;

    constructor(message: string, status = 400) {
        this.message = message;
        this.statusCode = status;
    }
}
