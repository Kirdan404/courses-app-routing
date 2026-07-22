export function formatCreationDate(creationDate: string) {
    const [day, month, year] = creationDate.split("/");

    return `${day}.${month}.${year}`;
}

export default formatCreationDate;
