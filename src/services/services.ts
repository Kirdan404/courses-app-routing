import { API_BASE_URL } from "../constants";
import type { Author, Course } from "../types/course";

type ApiResponse<T> = {
    result?: T;
};

export const getCourses = async (): Promise<Course[]> => {
    const response = await fetch(`${API_BASE_URL}/courses/all`);
    const data = (await response.json()) as ApiResponse<Course[]>;
    if (!response.ok) {
        throw new Error("Failed to fetch courses");
    }
    return data.result ?? [];
};

export const getAuthors = async (): Promise<Author[]> => {
    const response = await fetch(`${API_BASE_URL}/authors/all`);
    const data = (await response.json()) as ApiResponse<Author[]>;
    if (!response.ok) {
        throw new Error("Failed to fetch authors");
    }
    return data.result ?? [];
};
