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
        const nodes = {
            "Root": {
                name: "Root",
                description: "Root",
                cost: 0,
                category: "root",
                researchStatus: "root"
            }
        };
        const edges = {};
        let edgeId = 0;

        techResearches.forEach(techResearch => {
            nodes[techResearch.researchType] = {
                name: techResearch.name,
                description: techResearch.description,
                cost: techResearch.cost,
                category: techResearch.researchCategory,
                researchStatus: techResearch.researchType === "Gribouillis" ? "Researched" : techResearch.researchStatus
            };

            if (techResearch.prerequisites.length === 0) {
                edges["edge"+edgeId] = {
                    source: "Root",
                    target: techResearch.researchType
                };
                edgeId++;
            } else {
                nodes[techResearch.researchType].prerequisitesData = techResearch.prerequisites.map(prerequisite => {
                    return {
                        name: techResearches.find(techResearch => techResearch.researchType === prerequisite).name,
                        researchType: prerequisite,
                        researchStatus: techResearches.find(techResearch => techResearch.researchType === prerequisite).researchStatus,
                        category: techResearches.find(techResearch => techResearch.researchType === prerequisite).researchCategory
                    };
                });
                techResearch.prerequisites.forEach(prerequisite => {
                    edges["edge"+edgeId] = {
                        source: prerequisite,
                        target: techResearch.researchType
                    };
                    edgeId++;
                });
            }
        });

        return { nodes, edges };
    }

    return { fetchTechResearches, transformTechResearchesToVNetworkGraph }
});