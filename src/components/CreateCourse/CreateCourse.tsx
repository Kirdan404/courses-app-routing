import { ChangeEvent, FormEvent, useEffect, useState } from "react";

import Button from "../../common/Button/Button";
import Input from "../../common/Input/Input";
import AuthorItem from "../AuthorItem/AuthorItem";
import "./CreateCourse.css";
import { mockedAuthorsList } from "../../constants";
import getCourseDuration from "../../helpers/getCourseDuration";

type CreateCourseFormState = {
  title: string;
  description: string;
  duration: string;
};

type Author = {
  id: string;
  name: string;
};

type Course = {
  id: string;
  title: string;
  description: string;
  creationDate: string;
  duration: number;
  authors: string[];
};

type CreateCourseProps = {
  authors?: Author[];
  onAddAuthor?: (author: Author) => void;
  onAddCourse?: (course: Course) => void;
  onCancel?: () => void;
};

const initialFormState: CreateCourseFormState = {
  title: "",
  description: "",
  duration: "",
};

const createId = () =>
  typeof crypto !== "undefined" && typeof crypto.randomUUID === "function"
    ? crypto.randomUUID()
    : Math.random().toString(36).slice(2);

const formatDate = (date: Date) => {
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
};

export default function CreateCourse({
  authors: authorsProp = mockedAuthorsList,
  onAddAuthor,
  onAddCourse,
  onCancel,
}: CreateCourseProps = {}) {
  const sourceAuthors: Author[] = Array.isArray(authorsProp) ? authorsProp : [];
  const initialAuthors: Author[] = sourceAuthors.map((a) => ({
    id: a.id,
    name: a.name,
  }));

  const [form, setForm] = useState<CreateCourseFormState>(initialFormState);
  const [errors, setErrors] = useState<Partial<CreateCourseFormState>>({});
  const [authors, setAuthors] = useState<Author[]>(initialAuthors);
  const [courseAuthors, setCourseAuthors] = useState<Author[]>([]);
  const [newAuthorName, setNewAuthorName] = useState("");
  const [authorError, setAuthorError] = useState<string | undefined>(undefined);
  const fallbackAuthors: Author[] = [
    { id: "fallback-1", name: "Author One" },
    { id: "fallback-2", name: "Author Two" },
  ];

  useEffect(() => {
    if (Array.isArray(authorsProp)) {
      setAuthors(authorsProp);
    }
  }, [authorsProp]);

  const formattedDuration = getCourseDuration(form.duration);

  const handleInputChange =
    (field: keyof CreateCourseFormState) =>
    (e: ChangeEvent<HTMLInputElement>) => {
      setForm((prev) => ({ ...prev, [field]: e.target.value }));
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    };

  const handleDescriptionChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setForm((prev) => ({ ...prev, description: e.target.value }));
    setErrors((prev) => ({ ...prev, description: undefined }));
  };

  const handleDurationChange = (e: ChangeEvent<HTMLInputElement>) => {
    const nextValue = e.target.value;
    if (!/^\d*$/.test(nextValue)) return;

    setForm((prev) => ({ ...prev, duration: nextValue }));
    setErrors((prev) => ({ ...prev, duration: undefined }));
  };

  const handleAddExistingAuthor = (author: Author) => {
    if (courseAuthors.some((a) => a.id === author.id)) return;
    setCourseAuthors((prev) => [...prev, author]);
    setAuthors((prev) => prev.filter((a) => a.id !== author.id));
  };

  const handleRemoveCourseAuthor = (author: Author) => {
    setCourseAuthors((prev) => prev.filter((a) => a.id !== author.id));
    setAuthors((prev) => (prev.some((a) => a.id === author.id) ? prev : [...prev, author]));
  };

  const handleCreateAuthor = () => {
    const trimmed = newAuthorName.trim();
    if (!trimmed) {
      setAuthorError("Author name is required.");
      return;
    }

    if (trimmed.length < 2) {
      setAuthorError("Author name should be at least 2 characters.");
      return;
    }

    if (authors.some((a) => a.name === trimmed) || courseAuthors.some((a) => a.name === trimmed)) {
      setAuthorError("Author already exists.");
      return;
    }

    const newAuthor = { id: createId(), name: trimmed };
    setAuthors((prev) => [...prev, newAuthor]);
    onAddAuthor?.(newAuthor);
    setNewAuthorName("");
    setAuthorError(undefined);
  };

  const validateForm = () => {
    const nextErrors: Partial<CreateCourseFormState> = {};

    const trimmedTitle = form.title.trim();
    const trimmedDescription = form.description.trim();

    if (!trimmedTitle || trimmedTitle.length < 2) {
      nextErrors.title = "Title is required and should be at least 2 characters.";
    }

    if (!form.description.trim() || trimmedDescription.length < 2) {
      nextErrors.description = "Description is required and should be at least 2 characters.";
    }

    const trimmedDuration = form.duration.trim();

    if (!trimmedDuration) {
      nextErrors.duration = "Duration is required.";
    } else if (!/^\d+$/.test(trimmedDuration)) {
      nextErrors.duration = "Duration must be a number.";
    } else if (Number(trimmedDuration) <= 0) {
      nextErrors.duration = "Duration should be more than 0 minutes.";
    }

    setErrors(nextErrors);

    return Object.keys(nextErrors).length === 0;
  };

  const submitForm = () => {
    const isValid = validateForm();
    if (!isValid) return;

    const newCourse: Course = {
      id: createId(),
      title: form.title.trim(),
      description: form.description.trim(),
      creationDate: formatDate(new Date()),
      duration: Number(form.duration.trim()),
      authors: courseAuthors.map((author) => author.id),
    };

    onAddCourse?.(newCourse);

    // reset form and move authors back for next creation
    setForm(initialFormState);
    setErrors({});
    setAuthors((prev) => [...prev, ...courseAuthors]);
    setCourseAuthors([]);
    setNewAuthorName("");
    setAuthorError(undefined);
  };

  const handleFormSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    submitForm();
  };

  return (
    <>
      <div className="container-create-course-page">
        <div className="container-create-course-header">
          <h3 className="create-course-main-header">Course Edit/Create Page</h3>
        </div>
        <div className="container-create-course-form">
          <form onSubmit={handleFormSubmit} noValidate>
            <div className="container-create-course-main-info">
              <h4 className="create-course-sub-header">
                Main Info
              </h4>
              <Input 
                labelText="Title"
                placeholderText="Input text"
                type="text"
                value={form.title}
                onChange={handleInputChange("title")}
                className={`create-course-input-title${errors.title ? " input-error" : ""}`}
              />
              {errors.title && <span className="validation-error">{errors.title}</span>}
              <label>
                Description
                <textarea 
                  className={`create-course-textarea-description${errors.description ? " input-error" : ""}`}
                  placeholder="Input text"
                  value={form.description}
                  onChange={handleDescriptionChange}
                />
              </label>
              {errors.description && <span className="validation-error">{errors.description}</span>}
            </div>
            <div className="container-create-course-duration">
              <h4 className="create-course-sub-header">
                Duration
              </h4>
              <div className="create-course-duration-input">
                <Input
                  labelText="Duration"
                  placeholderText="Input text"
                  type="text"
                  value={form.duration}
                  onChange={handleDurationChange}
                  className={`create-course-input-duration${errors.duration ? " input-error" : ""}`}
                />
                <span className="create-course-formatted-duration">
                  {formattedDuration}
                </span>
              </div>
              {errors.duration && <span className="validation-error">{errors.duration}</span>}
            </div>
            <div className="container-create-course-authors">
              <div className="container-create-course-authors-edit">
                  <div className="container-create-course-authors-creation-block">
                    <h4 className="create-course-sub-header">
                      Authors
                    </h4>
                    <div className="container-create-course-authors-create">
                    <Input
                      placeholderText="Input text"
                      labelText="Author Name"
                      type="text"
                      value={newAuthorName}
                      onChange={(e) => {
                        setNewAuthorName(e.target.value);
                        setAuthorError(undefined);
                      }}
                      className={`create-course-input-author${authorError ? " input-error" : ""}`}
                    />
                    <Button
                      buttonText="CREATE AUTHOR"
                      className="btn-primary"
                      type="button"
                      onClick={handleCreateAuthor}
                    />
                    {authorError && (
                      <span className="validation-error">{authorError}</span>
                    )}
                  </div>
                    <div className="container-create-course-authors-edit">
                      <h5 className="create-course-small-header">
                        Authors List
                      </h5>
                      {(authors.length ? authors : fallbackAuthors).map((author) => (
                        <AuthorItem
                          key={author.id}
                          name={author.name}
                          onAdd={authors.length ? () => handleAddExistingAuthor(author) : undefined}
                        />
                      ))}
                    </div>
                  </div>
                </div>
                <div className="container-create-course-authors-show">
                  <h4 className="create-course-sub-header">
                    Course Authors
                  </h4>
                {courseAuthors.length === 0 ? (
                  <span className="create-course-authors-show-list">
                    Author list is empty
                  </span>
                ) : (
                  courseAuthors.map((author) => (
                    <AuthorItem
                      key={author.id}
                      name={author.name}
                      onDelete={() => handleRemoveCourseAuthor(author)}
                    />
                  ))
                )}
                </div>
              </div>
          </form>
        </div>
        <div className="container-create-course-buttons">
          <Button
            className="btn-primary"
            buttonText="CANCEL"
            type="button"
            onClick={() => {
              setForm(initialFormState);
              setErrors({});
              setCourseAuthors([]);
              setNewAuthorName("");
              setAuthorError(undefined);
              onCancel?.();
            }}
          />
          <Button
            className="btn-primary"
            buttonText="CREATE COURSE"
            type="submit"
            onClick={submitForm}
          />
        </div>
      </div>
    </>
  );
}
