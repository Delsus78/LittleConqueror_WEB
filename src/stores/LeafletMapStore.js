import {defineStore} from "pinia";
import {computed, ref} from "vue";

export const  useLeafletMapStore
    = defineStore('leafletMap', () => {
    const polygonsDisplayed = ref({});
    const geoJsonLayer = ref(null);
    const isLoading = ref(false);

    function createPolygonFromCity(city, options) {
        const cityIdKey = city.osmType + city.id;
        const geojson = city.geojson;

        polygonsDisplayed.value[cityIdKey] = {geojson, options};
    }

    function removePolygons() {
        polygonsDisplayed.value = {};
        geoJsonLayer.value = null;
    }

    function setGeoJsonLayer(geojson, styleFunc) {
        geoJsonLayer.value = {geojson, styleFunc};
    }

    return { createPolygonFromCity, removePolygons,
        polygonsDisplayed, geoJsonLayer,
        setGeoJsonLayer, isLoading }
})
