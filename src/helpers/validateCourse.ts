type CourseValues = {
    title: string;
    description: string;
    duration: string;
};

type CourseValidationErrors = Partial<Record<keyof CourseValues, string>>;

export default function validateCourse({
    title,
    description,
    duration,
}: CourseValues): CourseValidationErrors {
    const validationErrors: CourseValidationErrors = {};

    if (title.trim().length < 2) {
        validationErrors.title =
            "Title is required and should be at least 2 characters.";
    }

    if (description.trim().length < 2) {
        validationErrors.description =
            "Description is required and should be at least 2 characters.";
    }

    if (!duration || Number(duration) <= 0) {
        validationErrors.duration =
            "Duration is required and should be greater than 0.";
    }

    return validationErrors;
}
