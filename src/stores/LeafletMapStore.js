import {defineStore} from "pinia";
import {ref} from "vue";

export const  useLeafletMapStore
    = defineStore('leafletMap', () => {
    const polygonsDisplayed = ref({});

    function createPolygonFromCity(city, options) {
        const cityIdKey = city.osmType + city.id;
        const geojson = city.geojson;

        polygonsDisplayed.value[cityIdKey] = {geojson, options};
    }

    function removePolygon(cityIdKey) {
        polygonsDisplayed.value[cityIdKey].remove();
        polygonsDisplayed.value[cityIdKey] = null;
    }

    function removePolygons() {
        polygonsDisplayed.value = {};
    }


    return { createPolygonFromCity, removePolygon, removePolygons, polygonsDisplayed }
})
