import { API_BASE_URL } from "../constants";
import type { Author, Course } from "../types/course";

type ApiResponse<T> = {
    result?: T;
};

export type LoginResponse = {
    successful?: boolean;
    result?: string;
    errors?: string[];
    user?: {
        name?: string;
        email?: string;
    };
};

export type RegistrationResponse = {
    successful?: boolean;
    errors?: string[];
};

type ServiceResponse<T> = {
    ok: boolean;
    data: T;
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

export const loginUser = async (
    email: string,
    password: string
): Promise<ServiceResponse<LoginResponse>> => {
    const response = await fetch(`${API_BASE_URL}/login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
    });
    const data = (await response.json()) as LoginResponse;

    return { ok: response.ok, data };
};

export const registerUser = async (
    name: string,
    email: string,
    password: string
): Promise<ServiceResponse<RegistrationResponse>> => {
    const response = await fetch(`${API_BASE_URL}/register`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, password }),
    });
    const data = (await response.json()) as RegistrationResponse;

    return { ok: response.ok, data };
};
