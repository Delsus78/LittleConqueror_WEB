import {library} from "@fortawesome/fontawesome-svg-core";
import {
    faArrowDown,
    faArrowLeft, faArrowRight, faArrowUp,
    faCircleExclamation,
    faCity,
    faCoins, faEye,
    faGasPump,
    faGem, faHandshake,
    faMapMarkedAlt, faMicrochip,
    faMountain,
    faPeopleRoof, faQuestion, faShieldAlt,
    faSignOutAlt, faSnowplow,
    faTasks,
    faTree, faTriangleExclamation,
    faUser,
    faUtensils,
    faWeightHanging, faWheatAwn
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
        faPeopleRoof,
        faCircleExclamation,
        faTriangleExclamation,
        faShieldAlt,
        faEye,
        faHandshake,
        faSnowplow,
        faWheatAwn,
        faMicrochip,
        faQuestion,
        faArrowRight,
        faArrowLeft,
        faArrowDown,
        faArrowUp
    );
}