import type { Author } from "../types/course";

export default function getCourseAuthors(
    authorIds: string[],
    authors: Author[]
) {
    return authorIds.map((authorId) => {
        const author = authors.find(({ id }) => id === authorId);

        return author?.name ?? authorId;
    });
}
