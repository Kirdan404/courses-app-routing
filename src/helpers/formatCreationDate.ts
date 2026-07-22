export function formatCreationDate(creationDate: string) {
    const [month, day, year] = creationDate.split("/");

    return `${day}.${month}.${year}`;
}
