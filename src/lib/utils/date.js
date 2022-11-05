export function formatDuration(date) {
    const duration = Math.abs(new Date().getTime() - new Date(date).getTime());
    const seconds = Math.floor(duration / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    const months = Math.floor(days / 30);
    const years = Math.floor(months / 12);

    return years > 0 ? years + " ans" : months > 0 ? months + " mois" : days > 0 ? days + " jours" : hours > 0 ? hours + " heures" : minutes > 0 ? minutes + " minutes" : seconds + " secondes";
}

export function formatDay(date) {
    return <>Le {new Date(date).toLocaleDateString("fr-FR", { day: "numeric" })}<sup>e</sup> du mois</>
}

export function formatDate(date) {
    return new Date(date).toLocaleDateString("fr-FR", { day: "2-digit", month: "2-digit", year: "2-digit" });
}