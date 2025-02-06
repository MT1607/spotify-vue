import {ErrorApi} from "./error-api";
import {notify} from "../../plugin/notification";

export class ErrorHandle {
    constructor() {
    }
    handle = (error: unknown) => {
        if (error instanceof ErrorApi) {
            return this.handleApiError(error)
        }

        console.error(error);
        notify.error("An error occurred: " + error);
    }

    handleApiError = (error: ErrorApi) => {
        switch (error.status) {
            case 400:
                notify.error('Invalid request. Please check your input.');
                break;
            case 401:
                notify.error('Session expired. Please log in again.');
                break;
            case 403:
                notify.error('You don\'t have permission to perform this action.');
                break;
            case 404:
                notify.error('The requested resource was not found.');
                break;
            case 429:
                notify.error('Too many requests. Please try again later.');
                break;
            case 500:
            case 502:
            case 503:
                notify.error('Server error. Please try again later.');
                break;
            default:
                notify.error(error.message || 'Something went wrong');
        }
    }
}

export const errorHandle = new ErrorHandle();