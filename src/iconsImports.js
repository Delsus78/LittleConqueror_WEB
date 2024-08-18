import {library} from "@fortawesome/fontawesome-svg-core";
import {
    faCity,
    faCoins,
    faGasPump,
    faGem,
    faMapMarkedAlt,
    faMountain,
    faPeopleRoof,
    faSignOutAlt,
    faTasks,
    faTree,
    faUser,
    faUtensils,
    faWeightHanging
} from "@fortawesome/free-solid-svg-icons";

export function importIcons() {
    library.add(
        faUser,
        faMapMarkedAlt,
        faCity,
        faTasks,
        faSignOutAlt,
        faUtensils,
        faTree,
        faMountain,
        faCoins,
        faWeightHanging,
        faGem,
        faGasPump,
        faPeopleRoof
    );
}