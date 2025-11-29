import { Author } from "../store/authors/authorsSlice";
import { Course } from "../store/courses/coursesSlice";

const API_BASE = "http://localhost:4000";

export const getCourses = async (): Promise<Course[]> => {
  const response = await fetch(`${API_BASE}/courses/all`);
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data?.result || "Failed to fetch courses");
  }
  return data?.result || [];
};

export const getAuthors = async (): Promise<Author[]> => {
  const response = await fetch(`${API_BASE}/authors/all`);
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data?.result || "Failed to fetch authors");
  }
  return data?.result || [];
};
