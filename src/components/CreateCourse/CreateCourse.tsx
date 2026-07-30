import { useState } from "react";
import type { ChangeEvent, Dispatch, FormEvent, SetStateAction } from "react";
import Button from "../../common/Button/Button";
import Input from "../../common/Input/Input";
import Textarea from "../../common/Textarea/Textarea";
import { mockedAuthorsList } from "../../constants";
import getCourseDuration from "../../helpers/getCourseDuration";
import type { Author, Course } from "../../types/course";
import AuthorItem from "../AuthorItem/AuthorItem";
import "./CreateCourse.css";

type CreateCourseProps = Readonly<{
    changeMode: () => void;
    setCourses: Dispatch<SetStateAction<Course[]>>;
}>;

type CourseFormValues = {
    title: string;
    description: string;
    duration: string;
    authorName: string;
};

type CourseFormErrors = Partial<Record<keyof CourseFormValues, string>>;

const initialFormValues: CourseFormValues = {
    title: "",
    description: "",
    duration: "",
    authorName: "",
};

function generateId() {
    return crypto.randomUUID();
}

function getCurrentDate() {
    const currentDate = new Date();
    const day = String(currentDate.getDate()).padStart(2, "0");
    const month = String(currentDate.getMonth() + 1).padStart(2, "0");
    const year = currentDate.getFullYear();

    return `${day}/${month}/${year}`;
}

function CreateCourse({ changeMode, setCourses }: CreateCourseProps) {
    const [formValues, setFormValues] =
        useState<CourseFormValues>(initialFormValues);
    const [errors, setErrors] = useState<CourseFormErrors>({});
    const [courseAuthorIds, setCourseAuthorIds] = useState<string[]>([]);
    const [authorsList, setAuthorsList] = useState<Author[]>(mockedAuthorsList);

    const availableAuthors = authorsList.filter(
        (author) => !courseAuthorIds.includes(author.id)
    );
    const courseAuthors = authorsList.filter((author) =>
        courseAuthorIds.includes(author.id)
    );
    const durationInMinutes = Number(formValues.duration) || 0;

    function updateField(fieldName: keyof CourseFormValues, value: string) {
        setFormValues((currentValues) => ({
            ...currentValues,
            [fieldName]: value,
        }));

        if (errors[fieldName]) {
            setErrors((currentErrors) => ({
                ...currentErrors,
                [fieldName]: undefined,
            }));
        }
    }

    function handleInputChange(event: ChangeEvent<HTMLInputElement>) {
        const fieldName = event.target.name as keyof CourseFormValues;
        updateField(fieldName, event.target.value);
    }

    function handleDescriptionChange(event: ChangeEvent<HTMLTextAreaElement>) {
        updateField("description", event.target.value);
    }

    function handleDurationChange(event: ChangeEvent<HTMLInputElement>) {
        const numericValue = event.target.value.replace(/\D/g, "");
        updateField("duration", numericValue);
    }

    function handleCreateAuthor() {
        const trimmedAuthorName = formValues.authorName.trim();

        if (!trimmedAuthorName) {
            setErrors((currentErrors) => ({
                ...currentErrors,
                authorName: "Author name is required.",
            }));
            return;
        }

        if (trimmedAuthorName.length < 2) {
            setErrors((currentErrors) => ({
                ...currentErrors,
                authorName: "Author name should be at least 2 characters.",
            }));
            return;
        }

        setAuthorsList((currentAuthors) => [
            ...currentAuthors,
            {
                id: generateId(),
                name: trimmedAuthorName,
            },
        ]);
        updateField("authorName", "");
    }

    function handleAddAuthor(authorId: string) {
        setCourseAuthorIds((currentIds) => [...currentIds, authorId]);
    }

    function handleRemoveCourseAuthor(authorId: string) {
        setCourseAuthorIds((currentIds) =>
            currentIds.filter((id) => id !== authorId)
        );
    }

    function validateCourse() {
        const validationErrors: CourseFormErrors = {};
        const trimmedTitle = formValues.title.trim();
        const trimmedDescription = formValues.description.trim();

        if (trimmedTitle.length < 2) {
            validationErrors.title =
                "Title is required and should be at least 2 characters.";
        }

        if (trimmedDescription.length < 2) {
            validationErrors.description =
                "Description is required and should be at least 2 characters.";
        }

        if (!formValues.duration || durationInMinutes <= 0) {
            validationErrors.duration =
                "Duration is required and should be more than 0 minutes.";
        }

        return validationErrors;
    }

    function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();

        const validationErrors = validateCourse();
        setErrors((currentErrors) => ({
            authorName: currentErrors.authorName,
            ...validationErrors,
        }));

        if (Object.keys(validationErrors).length > 0) {
            return;
        }

        setCourses((currentCourses) => [
            ...currentCourses,
            {
                id: generateId(),
                title: formValues.title.trim(),
                description: formValues.description.trim(),
                creationDate: getCurrentDate(),
                duration: durationInMinutes,
                authors: courseAuthorIds,
            },
        ]);
        setFormValues(initialFormValues);
        setCourseAuthorIds([]);
        setErrors({});
        changeMode();
    }

    return (
        <main className="create-course">
            <h1 className="create-course__title">Course Edit/Create Page</h1>

            <form
                className="create-course__form"
                id="create-course-form"
                noValidate
                onSubmit={handleSubmit}
            >
                <section className="create-course__main-info">
                    <h2>Main Info</h2>
                    <Input
                        errorText={errors.title}
                        labelText="Title"
                        name="title"
                        placeholderText="Input text"
                        required
                        value={formValues.title}
                        onChange={handleInputChange}
                    />
                    <Textarea
                        errorText={errors.description}
                        labelText="Description"
                        name="description"
                        placeholderText="Input text"
                        required
                        value={formValues.description}
                        onChange={handleDescriptionChange}
                    />
                </section>

                <section className="create-course__duration">
                    <h2>Duration</h2>
                    <div className="create-course__duration-control">
                        <Input
                            errorText={errors.duration}
                            labelText="Duration"
                            name="duration"
                            placeholderText="Input text"
                            required
                            value={formValues.duration}
                            onChange={handleDurationChange}
                        />
                        <strong>{getCourseDuration(durationInMinutes)}</strong>
                    </div>
                </section>

                <div className="create-course__authors-columns">
                    <section className="create-course__authors">
                        <h2>Authors</h2>
                        <div className="create-course__author-control">
                            <Input
                                errorText={errors.authorName}
                                labelText="Author Name"
                                name="authorName"
                                placeholderText="Input text"
                                value={formValues.authorName}
                                onChange={handleInputChange}
                            />
                            <Button
                                buttonText="Create author"
                                onClick={handleCreateAuthor}
                            />
                        </div>

                        <h3>Authors List</h3>
                        <div className="create-course__authors-list">
                            {availableAuthors.length > 0 ? (
                                availableAuthors.map((author) => (
                                    <AuthorItem
                                        key={author.id}
                                        authorName={author.name}
                                        onAdd={() => handleAddAuthor(author.id)}
                                    />
                                ))
                            ) : (
                                <p>Author list is empty</p>
                            )}
                        </div>
                    </section>

                    <section className="create-course__course-authors">
                        <h2>Course Authors</h2>
                        <div className="create-course__authors-list">
                            {courseAuthors.length > 0 ? (
                                courseAuthors.map((author) => (
                                    <AuthorItem
                                        key={author.id}
                                        authorName={author.name}
                                        onDelete={() =>
                                            handleRemoveCourseAuthor(author.id)
                                        }
                                    />
                                ))
                            ) : (
                                <p>Author list is empty</p>
                            )}
                        </div>
                    </section>
                </div>
            </form>

            <div className="create-course__actions">
                <Button buttonText="Cancel" onClick={changeMode} />
                <Button
                    buttonText="Create course"
                    form="create-course-form"
                    type="submit"
                />
            </div>
        </main>
    );
}

export default CreateCourse;
