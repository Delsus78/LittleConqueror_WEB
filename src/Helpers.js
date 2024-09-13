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