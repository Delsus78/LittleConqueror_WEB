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

    function transformTechResearchesToVNetworkGraph(techResearches) {
        const nodes = {};
        const edges = {};
        let edgeId = 0;

        techResearches.forEach(techResearch => {
            nodes[techResearch.researchType] = {
                name: techResearch.name,
                description: techResearch.description,
                cost: techResearch.cost,
                category: techResearch.researchCategory,
                researchStatus: techResearch.researchStatus
            };

            techResearch.prerequisites.forEach(prerequisite => {
                edges["edge"+edgeId] = {
                    source: prerequisite,
                    target: techResearch.researchType
                };
                edgeId++;
            });
        });

        return { nodes, edges };
    }

    return { fetchTechResearches, transformTechResearchesToVNetworkGraph }
});