export function getCourseDuration(duration: number) {
    const hours = Math.floor(duration / 60);
    const minutes = duration % 60;

    const formattedHours = String(hours).padStart(2, "0");
    const formattedMinutes = String(minutes).padStart(2, "0");
    const hourText = hours === 1 ? "hour" : "hours";

    return `${formattedHours}:${formattedMinutes} ${hourText}`;
}

export default getCourseDuration;
