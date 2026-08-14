export default function formatCreationDate(creationDate: string) {
    const [day, month, year] = creationDate.split("/");

    return `${day}.${month}.${year}`;
}
