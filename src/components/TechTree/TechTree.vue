<template>
    <v-network-graph
        ref="graph"
        style="height: 60vh"
        v-model:zoom-level="zoomLevel"
        :nodes="data.nodes"
        :edges="data.edges"
        :layouts="layouts"
        :configs="configs"
        :target-node="targetNode"
        :event-handlers="eventHandlers">

      <template #override-node="{ nodeId, scale, config, ...slotProps }">
        <defs>
          <linearGradient id="gradientAnime" gradientUnits="userSpaceOnUse" x1="0" y1="0" x2="600" y2="0">
            <stop offset="0%" stop-color="#ff0000"/>
            <stop offset="10%" stop-color="#ff9a00"/>
            <stop offset="20%" stop-color="#d0de21"/>
            <stop offset="30%" stop-color="#4fdc4a"/>
            <stop offset="40%" stop-color="#3fdad8"/>
            <stop offset="50%" stop-color="#2fc9e2"/>
            <stop offset="60%" stop-color="#1c7fee"/>
            <stop offset="70%" stop-color="#5f15f2"/>
            <stop offset="80%" stop-color="#ba0cf8"/>
            <stop offset="90%" stop-color="#fb07d9"/>
            <stop offset="100%" stop-color="#ff0000"/>
            <!-- Animation du gradient -->
            <animateTransform attributeName="gradientTransform"
                              type="translate" from="0,0" to="-600,0"
                              begin="0s" dur="6s" repeatCount="indefinite" />
          </linearGradient>
          <!-- Définition du filtre pour l'effet de flou et de luminosité -->
          <filter id="filtreGlow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="8" result="blur"/>
            <feColorMatrix in="blur" type="matrix" values="
        1.3 0 0 0 0
        0 1.3 0 0 0
        0 0 1.3 0 0
        0 0 0 1 0" result="bright"/>
            <feComponentTransfer in="bright">
              <feFuncA type="linear" slope="0.6"/>
            </feComponentTransfer>
          </filter>
        </defs>

        <g v-if="data.nodes[nodeId].category !== 'root'">
          <!-- Rectangle de fond -->
          <rect v-if="data.nodes[nodeId].rarity === 'legendary'"
              :x="-config.width / 2"
              :y="-config.height / 2"
              :width="config.width"
              :height="config.height"
              fill="url(#gradientAnime)"
              filter="url(#filtreGlow)"
              :rx="config.borderRadius"
              :ry="config.borderRadius"/>

          <rect :x="-config.width / 2"
                :y="-config.height / 2"
                :width="config.width"
                :height="config.height"
                :rx="config.borderRadius"
                :ry="config.borderRadius"
                :stroke="getColorFromStatus(data.nodes[nodeId].researchStatus)"
                :stroke-width="config.borderWidth"
                :fill="getCategoryColorCode(data.nodes[nodeId].category)"
                :cursor="config.cursor"
                @click="slotProps.onClick"
                @mouseenter="slotProps.onMouseEnter"
                @mouseleave="slotProps.onMouseLeave"/>

          <!-- Icône font-awesome vue -->
          <foreignObject
              :x="-config.width / 2 + 7"
              :y="-config.height / 2 + 15"
              width="30"
              height="30">
            <div xmlns="http://www.w3.org/1999/xhtml">
              <TechIcon :tech-id="nodeId" size="lg"/>
            </div>
          </foreignObject>

          <foreignObject v-if="data.nodes[nodeId].researchStatus.toLowerCase() === 'researched'"
              :x="config.width / 2 - 20"
              :y="config.height / 2 - 20"
              width="50"
              height="50">
            <div xmlns="http://www.w3.org/1999/xhtml">
              <InfoIcon resource-name="checked" size="2x" class="text-success"/>
            </div>
          </foreignObject>

          <!-- Nom avec soulignement -->
          <foreignObject
              :x="-config.width / 2 + 4"
              :y="-config.height / 2"
              :width="config.width"
              :height="config.height">
            <div xmlns="http://www.w3.org/1999/xhtml"
                 class="text-wrap"
                 :style="`
                 font-weight: bold;
                 font-size: 10px;
                 text-decoration: underline;
                 line-height: 1.5; color:` + config.color + `;`">
              <p>{{data.nodes[nodeId].name}}</p>
            </div>
          </foreignObject>

          <!-- Coût en bas à droite -->
          <foreignObject
              :x="config.width / 2 - 105"
              :y="config.height / 2 - 13"
              :width="100"
              :height="20">
            <div xmlns="http://www.w3.org/1999/xhtml"
                 class="text-wrap"
                 :style="`
                 font-weight: bold;
                 font-size: 10px; color:` + config.costColor + `;`">
              <p class="text-end">{{data.nodes[nodeId].cost}}</p>
            </div>
          </foreignObject>

          <!-- pre-requis TODO : STROKE IN COLOR OF THE REQUIREMENTS FULLFILLED OR NOT-->
          <rect :x="-config.width / 2 + 40"
                :y="-config.height / 2 + 16"
                :width="config.width / 1.5"
                :height="config.height / 4.5"
                :rx="config.borderRadius"
                :ry="config.borderRadius"
                stroke="black"
                :stroke-width="config.borderWidth"
                :fill="config.prerequisColor"
                :cursor="config.cursor"/>
          <foreignObject v-for=" (prereq, index) in data.nodes[nodeId].prerequisitesData"
              :x="-config.width / 2 + 45 + (index * 25)"
              :y="-config.height / 2 + 13"
              width="25"
              height="25">
            <div xmlns="http://www.w3.org/1999/xhtml">
              <TechIcon :tech-id="prereq.researchType" size="sm"
                        :style="`color: ` + getCategoryColorCode(prereq.category) + `;` +
                                `filter: drop-shadow(2px 0 2px rgb(0 0 0 / 1));`"/>
            </div>
          </foreignObject>

          <!-- ProgressBar for startSearchingDate and endSearchingDate -->
          <foreignObject v-if="data.nodes[nodeId].researchStatus.toLowerCase() === 'researching'"
              :x="-config.width / 2 + 5"
              :y="config.height / 2 - 10"
              width="90"
              height="10">
            <div xmlns="http://www.w3.org/1999/xhtml">
              <div class="progress">
                <div class="progress-bar bg-success" role="progressbar"
                     :style="`width: ` + getResearchPourcentage(data.nodes[nodeId].startSearchingDate, data.nodes[nodeId].endSearchingDate) + `%`"
                     aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"></div>
              </div>
            </div>
          </foreignObject>

        </g>
        <g v-else>
          <foreignObject
              :x="-config.width / 2 + 50"
              :y="-config.height / 2 + 13"
              width="60"
              height="60">
            <div xmlns="http://www.w3.org/1999/xhtml">
              <TechIcon :tech-id="nodeId" size="4x" class="text-white-50"/>
            </div>
          </foreignObject>
        </g>
      </template>
    </v-network-graph>
</template>
<script setup>
import {defineConfigs} from "v-network-graph";
import dagre from "dagre";
import {reactive, ref} from "vue";
import TechIcon from "@/components/icons/TechIcon.vue";
import {getCategoryColorCode, getColorFromStatus, getResearchPourcentage} from "@/Helpers.js";
import InfoIcon from "@/components/icons/InfoIcon.vue";
const { data, targetNode, bgColor } = defineProps({
  data: {
    type: Object,
    required: true,
  },
  targetNode: {
    type: String,
    required: true,
  },
  bgColor: {
    type: String,
    default: "#74c9ef",
  },
})

const nodeSize = 45;
const graph = ref();
const configs = defineConfigs({
  view: {
    autoPanAndZoomOnLoad: "fit-content",
    onBeforeInitialDisplay: () => layout("LR"),
  },
  node: {
    draggable: false,
    selectable: false,
    normal: {
      type: "rect",
      width: nodeSize * 3.6,
      height: nodeSize * 2,
      borderRadius: 4,
      color: "black",
      colorOnUndiscovered: "#333333",

      nameColor: "#ffffff",
      descriptionColor: "#ffffff",
      costColor: "#000000",
      prerequisColor: "#f0f0f0",
      borderWidth: 1,
    },
    hover: {
      color: "#ff6f00",
      bgColor: "#6085d7",
      colorOnUndiscovered: "#333333",

      nameColor: "#ffffff",
      descriptionColor: "#ffffff",
      costColor: "#000000",
      prerequisColor: "#f0f0f0",
    },
    label: {
      visible: false,
    }
  },
  edge: {
    margin: 0,

    normal: {
      color: "#ffffff",
      linecap: "round",
    },
    hover: {
      color: "#ffffff",
    },
  },
})
const zoomLevel = ref(1)


const layouts = reactive({
  nodes: {},
})

const eventHandlers = {

}

function layout(direction) {
  if (Object.keys(data.nodes).length <= 1 || Object.keys(data.edges).length == 0) {
    return
  }

  // convert graph
  // ref: https://github.com/dagrejs/dagre/wiki
  const g = new dagre.graphlib.Graph()
  // Set an object for the graph label
  g.setGraph({
    rankdir: direction,
    nodesep: nodeSize,
    edgesep: nodeSize,
    ranksep: nodeSize * 2,
  })
  // Default to assigning a new object as a label for each new edge.
  g.setDefaultEdgeLabel(() => ({}))

  // Add nodes to the graph. The first argument is the node id. The second is
  // metadata about the node. In this case we're going to add labels to each of
  // our nodes.
  Object.entries(data.nodes).forEach(([nodeId, node]) => {
    g.setNode(nodeId, { label: node.name, width: nodeSize * 3, height: nodeSize * 4 })
  })

  // Add edges to the graph.
  Object.values(data.edges).forEach(edge => {
    g.setEdge(edge.source, edge.target)
  })

  dagre.layout(g)

  g.nodes().forEach((nodeId) => {
    // update node position
    const x = g.node(nodeId).x
    const y = g.node(nodeId).y
    layouts.nodes[nodeId] = { x, y }
  })
}
</script>