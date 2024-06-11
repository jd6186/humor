import {HttpStatus} from "@nestjs/common";

export const CustomHttpStatus = {
    FORBIDDEN: { code: 403, message: 'You do not have permission to access this resource.' },
    NOT_FOUND: { code: 404, message: 'The resource you are looking for was not found.' },
    INTERNAL_SERVER_ERROR: { code: 500, message: 'An internal server error occurred.' }
} as const;