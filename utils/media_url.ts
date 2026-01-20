import { AppConstants } from "@/constants/constants";

export const getMediaUrl = (filename: string) => {
    return `${AppConstants.DRIVE_ROOT_URL}/${filename}`;
}