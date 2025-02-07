import type { UserProfile } from "../../utils/types";
import axiosInstance from "./axios-instance";
import { ErrorApi } from "../../utils/error/error-api";

export class SpotifyService {
    async handleCallback(code: string) {
        try {
            const response = await axiosInstance.get('/callback', { params: { code } });

            if (!response.data.access_token || !response.data.refresh_token) {
                throw new Error("Missing access_token or refresh_token");
            }

            return response.data;
        } catch (e) {
            console.error("Error in handleCallback:", e.response?.data || e.message);
            throw this.handleError(e);
        }
    }

    async getUserProfile(accessToken: string): Promise<UserProfile> {
        try {
            const response = await axiosInstance.get('/profile', {
                params: { access_token: accessToken }
            });
            return response.data;
        } catch (e) {
            throw this.handleError(e);
        }
    }

    private handleError(error: any) {
        console.error("Spotify API Error:", error);

        if (!error.response) {
            return new ErrorApi("Network error or server is unreachable", 500);
        }

        return new ErrorApi(
            error.response.data?.message || "Unknown error from API",
            error.response.status,
        );
    }
}

export const spotifyService = new SpotifyService();