import {defineStore, storeToRefs} from "pinia";
import {fetchWrapper} from "@/Fetchers/fetch-wrapper.js";
import {useAuthStore} from "@/stores/AuthStore.js";

const baseUrl = `${import.meta.env.VITE_API_URL}`;

export const useTechResearchStore = defineStore('tech-research',() => {

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
                ...techResearch
            };

            if (techResearch.prerequisites.length === 0) {
                edges["edge_Root_to_"+techResearch.researchType] = {
                    source: "Root",
                    target: techResearch.researchType,
                    status: techResearch.researchStatus
                };
                edgeId++;
            } else {
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
        });

        return { nodes, edges };
    }

    return { fetchTechResearches, transformTechResearchesToVNetworkGraph, fetchSciencePoints }
});