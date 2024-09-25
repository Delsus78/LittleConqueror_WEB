import {defineStore, storeToRefs} from "pinia";
import {fetchWrapper} from "@/Fetchers/fetch-wrapper.js";
import {useAuthStore} from "@/stores/AuthStore.js";
import {getFormatedTimeBetweenTwoDates, getResearchPourcentage} from "@/Helpers.js";
import {reactive, ref} from "vue";

const baseUrl = `${import.meta.env.VITE_API_URL}`;

export const useTechResearchStore = defineStore('tech-research',() => {
    const techResearchTimeLeftMap = reactive({});
    const techResearchPourcentageMap = reactive({});

    async function fetchTechResearches() {
        const { userId } = storeToRefs(useAuthStore());

        const response = await fetchWrapper.get(`${baseUrl}/TechResearches/${userId.value}`)
            .catch(error => {
                console.error(error);
                return Promise.reject(error);
            });

        return response;
    }

    async function fetchSciencePoints() {
        const { userId } = storeToRefs(useAuthStore());

        const response = await fetchWrapper.get(`${baseUrl}/TechResearches/${userId.value}/SciencePoints`)
            .catch(error => {
                console.error(error);
                return Promise.reject(error);
            });

        return response;
    }

    async function postStartResearch(researchType, force = false) {
        const { userId } = storeToRefs(useAuthStore());

        const response = await fetchWrapper.post(`${baseUrl}/TechResearches/${userId.value}/start/${researchType}?force=${force}`)
            .catch(error => {
                console.error(error);
                return Promise.reject(error);
            });

        return response;
    }

    async function postCancelResearch(researchType) {
        const { userId } = storeToRefs(useAuthStore());

        const response = await fetchWrapper.post(`${baseUrl}/TechResearches/${userId.value}/cancel/${researchType}`)
            .catch(error => {
                console.error(error);
                return Promise.reject(error);
            });

        return response;
    }

    function transformTechResearchesToVNetworkGraph(techResearches) {
        const nodes = {
            "Root": {
                name: "Root",
                description: "Root",
                cost: 0,
                researchCategory: "root",
                researchStatus: "root"
            }
        };
        const edges = {};
        let edgeId = 0;

        techResearches.forEach(techResearch => {
            nodes[techResearch.researchType] = {
                ...techResearch,
                pourcentage: ref(0),
                formatedTimeLeft: ref(""),
            };

            // prerequisites
            if (techResearch.prerequisites.length === 0) {
                edges["edge_Root_to_"+techResearch.researchType] = {
                    source: "Root",
                    target: techResearch.researchType,
                    status: techResearch.researchStatus
                };
                edgeId++;
            }
            else {
                nodes[techResearch.researchType].prerequisitesData = techResearch.prerequisites.map(prerequisite => {
                    return {
                        name: techResearches.find(techResearch => techResearch.researchType === prerequisite).name,
                        researchType: prerequisite,
                        researchStatus: techResearches.find(techResearch => techResearch.researchType === prerequisite).researchStatus,
                        researchCategory: techResearches.find(techResearch => techResearch.researchType === prerequisite).researchCategory
                    };
                });
                techResearch.prerequisites.forEach(prerequisite => {
                    edges["edge_" + prerequisite + "_to_" + techResearch.researchType] = {
                        source: prerequisite,
                        target: techResearch.researchType,
                        status: techResearch.researchStatus
                    };
                    edgeId++;
                });
            }

            // starttime
            techResearchTimeLeftMap[techResearch.researchType] = getFormatedTimeBetweenTwoDates(techResearch.startSearchingDate, techResearch.endSearchingDate);
            techResearchPourcentageMap[techResearch.researchType] = getResearchPourcentage(techResearch.startSearchingDate, techResearch.endSearchingDate);

            if (techResearch.researchStatus.toLowerCase() === "researching") {
                setInterval(() => {
                    if (techResearch.endSearchingDate <= new Date()) {
                        techResearch.researchStatus = "Researched"
                    } else {
                        techResearchTimeLeftMap[techResearch.researchType] = getFormatedTimeBetweenTwoDates(techResearch.startSearchingDate, techResearch.endSearchingDate);
                        techResearchPourcentageMap[techResearch.researchType] = getResearchPourcentage(techResearch.startSearchingDate, techResearch.endSearchingDate);
                    }
                }, 1000)
            }
        });

        return { nodes, edges };
    }

    return { fetchTechResearches, transformTechResearchesToVNetworkGraph, fetchSciencePoints, postStartResearch, postCancelResearch,
        techResearchTimeLeftMap, techResearchPourcentageMap}
});