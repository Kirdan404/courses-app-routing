import { useMemo, useState } from "react";

import Header from "./components/Header/Header";
import EmptyCourseList from "./components/EmptyCourseList/EmptyCourseList";
import Courses from "./components/Courses/Courses";
import CourseInfo from "./components/CourseInfo/CourseInfo";
import { logout, mockedAuthorsList, mockedCoursesList } from "./constants";

const App = () => {
  const [selectedCourseId, setSelectedCourseId] = useState<string | null>(null);
  const [authors, setAuthors] = useState(mockedAuthorsList);
  const [courses, setCourses] = useState(mockedCoursesList);

  const authorsDictionary = useMemo(() => {
    const dictionary: Record<string, string> = {};
    authors.forEach((author) => {
      dictionary[author.id] = author.name;
    });
    return dictionary;
  }, [authors]);

  const resolveAuthorNames = (authorIds: string[]) =>
    authorIds
      .map((authorId) => authorsDictionary[authorId])
      .filter((name): name is string => Boolean(name));

  const selectedCourse = useMemo(
    () =>
      selectedCourseId
        ? courses.find((course) => course.id === selectedCourseId) ?? null
        : null,
    [selectedCourseId, courses]
  );

  const handleShowCourse = (courseId: string) => setSelectedCourseId(courseId);
  const handleBackToCourses = () => setSelectedCourseId(null);

  const handleAddAuthor = (author: { id: string; name: string }) => {
    setAuthors((prev) => [...prev, author]);
  };

  const handleAddCourse = (course: {
    id: string;
    title: string;
    description: string;
    creationDate: string;
    duration: number;
    authors: string[];
  }) => {
    setCourses((prev) => [...prev, course]);
  };

  const content = selectedCourse ? (
    <CourseInfo
      id={selectedCourse.id}
      title={selectedCourse.title}
      description={selectedCourse.description}
      duration={selectedCourse.duration}
      creationDate={selectedCourse.creationDate}
      authors={resolveAuthorNames(selectedCourse.authors)}
      onBack={handleBackToCourses}
    />
  ) : courses.length > 0 ? (
    <Courses courses={courses} authors={authors} onShowCourse={handleShowCourse} />
  ) : (
    <EmptyCourseList />
  );

  return (
    <>
      <Header buttonText={logout} onButtonClick={() => {}} userName="Harry Potter" />
      {/* <Login/> */}
      <main>{content}</main>
      {/* <CreateCourse
        authors={authors}
        onAddAuthor={handleAddAuthor}
        onAddCourse={handleAddCourse}
      /> */}
    </>
  );
};

export default App;
