import {library} from "@fortawesome/fontawesome-svg-core";
import {faCity, faMapMarkedAlt, faSignOutAlt, faTasks, faUser} from "@fortawesome/free-solid-svg-icons";

export function importIcons() {
    library.add(
        faUser,
        faMapMarkedAlt,
        faCity,
        faTasks,
        faSignOutAlt
    );
}