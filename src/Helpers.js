// get color code depending on the research category
export function getCategoryColorCode(category) {
    switch (category) {
        case "TheoryResearch":
            return "#ffff00";
        case "MilitaryResearch":
            return "#ff4e4e";
        case "EngineeringResearch":
            return "#66ff66";
        case "GeopoliticResearch":
            return "#5050ff";
        default:
            return "#FFFFFF";
    }
}

// get color depending on the action name
export function getActionColorCode(action) {
    switch (action.toLowerCase()) {
        case "agricole":
            return "#29b913";
        case "miniere":
            return "#9f9f9f";
        case "militaire":
            return "#ff0000";
        case "espionnage":
            return "#ff0000";
        case "diplomatique":
            return "#ff00ff";
        case "technologique":
            return "#00ff00";
        default:
            return '#FFEDA0';
    }
}

// get formated date with the right timezone of the user
export function getFormatedDate(date) {
    return new Date(date).toLocaleString('fr-FR', { timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone });
}

// get name of the tech category depending on the category
export function getTechCategoryName(category) {
    switch (category) {
        case "TheoryResearch":
            return "Théorie";
        case "MilitaryResearch":
            return "Militaire";
        case "EngineeringResearch":
            return "Ingénierie";
        case "GeopoliticResearch":
            return "Géopolitique";
        default:
            return "Inconnu";
    }
}

// get the color from its status
export function getColorFromStatus(status) {
    switch (status.toLowerCase()) {
        case "undiscovered":
            return "#868686";
        case "researching":
            return "#ff5600";
        case "researched":
            return "#60d203";
        default:
            return "#000000";
    }
}

// get the pourcentage of the research from a startSearchingDate and a endSearchingDate
export function getResearchPourcentage(startSearchingDate, endSearchingDate) {
    const startDate = new Date(startSearchingDate + 'Z');
    const endDate = new Date(endSearchingDate + 'Z');
    const currentDate = new Date();
    const total = endDate - startDate;
    const current = currentDate - startDate;

    // S'assurer que le pourcentage est entre 0% et 100%
    const percentage = Math.min(Math.max((current / total) * 100, 0), 100);

    return percentage.toFixed(2);
}

// get color depending on the availability of the research
export function getAvailabilityColor(availability) {
    switch (availability.toLowerCase()) {
        case "available":
            return "rgba(96,210,3,0.5)";
        case "notenoughsciencepoints":
        case "prerequisitetechresearchnotcompleted":
            return "rgba(255,86,0,0.5)";
        case "techresearchalreadyinprogressorcompleted":
        case "anothertechresearchisalreadyinprogress":
            return "rgba(134,134,134,0.5)";
        default:
            return "#000000";
    }
}

// get text depending on the availability of the research
export function getAvailabilityText(availability) {
    switch (availability.toLowerCase()) {
        case "available":
            return "Disponible";
        case "notenoughsciencepoints":
            return "Pas assez de points de recherche";
        case "prerequisitetechresearchnotcompleted":
            return "Recherche(s) prérequise(s) non complétée(s)";
        case "techresearchalreadyinprogressorcompleted":
            return "Recherche déjà en cours ou complétée";
        case "anothertechresearchisalreadyinprogress":
            return "Une autre recherche est déjà en cours";
        default:
            return "Inconnu";
    }
}

// Fonction pour obtenir le temps formaté entre deux dates
// Format des dates fournies : "2024-09-24T16:33:37.387406"
// Format de retour : "23h 59m 59s"
// Prend en compte le fuseau horaire local
export function getFormatedTimeBetweenTwoDates(startSearchingDate, endSearchingDate) {
    const endDate = new Date(endSearchingDate + 'Z');

    // Obtenir la date actuelle
    const currentDate = new Date();

    // Calculer le temps restant en millisecondes
    const remainingTime = endDate - currentDate;

    // Si le temps restant est négatif, le définir à zéro
    const remainingTimePositive = Math.max(0, remainingTime);

    // Convertir le temps restant en heures, minutes et secondes
    const hours = Math.floor(remainingTimePositive / 3600000);
    const minutes = Math.floor((remainingTimePositive % 3600000) / 60000);
    const seconds = Math.floor((remainingTimePositive % 60000) / 1000);

    return `${hours}h ${minutes}m ${seconds}s`;
}
