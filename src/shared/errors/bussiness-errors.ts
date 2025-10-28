/* eslint-disable prettier/prettier */
export class BusinessLogicException extends Error {
    error: BusinessError;
    constructor(message: string, error: BusinessError) {
        super(message);
        this.error = error;
    }
}
export enum BusinessError {
    NOT_FOUND = 'NOT_FOUND',
    PRECONDITION_FAILED = 'PRECONDITION_FAILED',
    BAD_REQUEST = 'BAD_REQUEST',
}