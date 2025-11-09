/* eslint-disable prettier/prettier */
export class BussinessLogicException extends Error {
    error: BussinessError;
    constructor(message: string, error: BussinessError) {
        super(message);
        this.error = error;
    }
}
export enum BussinessError {
    NOT_FOUND = 'NOT_FOUND',
    PRECONDITION_FAILED = 'PRECONDITION_FAILED',
    BAD_REQUEST = 'BAD_REQUEST',
}