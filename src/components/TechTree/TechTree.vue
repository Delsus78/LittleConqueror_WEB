<template>
  <v-network-graph
      ref="graph"
      style="height: 60vh" class="rounded-lg shadow-lg graph"
      v-model:zoom-level="zoomLevel"
      :nodes="data.nodes"
      :edges="data.edges"
      :layouts="layouts"
      :configs="configs"
      :event-handlers="eventHandlers">
    <!-- Replace the node component :fill="data.nodes[nodeId].researchStatus === 'Undiscovered' ? config.colorOnUndiscovered : config.color" -->
    <template #override-node="{ nodeId, scale, config, ...slotProps }">
      <g v-if="data.nodes[nodeId].category !== 'root'">
        <rect :x="-config.width / 2"
              :y="-config.height / 2"
              :width="config.width"
              :height="config.height"
              :rx="config.borderRadius"
              :ry="config.borderRadius"
              :stroke="data.nodes[nodeId].researchStatus === 'Undiscovered' ? config.colorOnUndiscovered : config.color"
              :stroke-width="config.borderWidth"
              :fill="bgColor"
              :cursor="config.cursor"
              @click="slotProps.onClick"
              @mouseenter="slotProps.onMouseEnter"
              @mouseleave="slotProps.onMouseLeave"/>

        <!-- Icône font-awesome vue -->
        <foreignObject
            :x="-config.width / 2 + 7"
            :y="-config.height / 2 + 15"
            width="60"
            height="60">
          <div xmlns="http://www.w3.org/1999/xhtml">
            <TechIcon :tech-id="nodeId" size="lg"/>
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
            :x="-config.width / 2 - 10"
            :y="config.height / 2 - 13"
            :width="config.width"
            :height="config.height">
          <div xmlns="http://www.w3.org/1999/xhtml"
               class="text-wrap"
               :style="`
               font-weight: bold;
               font-size: 10px; color:` + config.costColor + `;`">
            <p class="text-end">{{data.nodes[nodeId].cost}}</p>
          </div>
        </foreignObject>

        <!-- pre-requis -->
        <rect :x="-config.width / 2 + 40"
              :y="-config.height / 2 + 16"
              :width="config.width / 1.5"
              :height="config.height / 2.5"
              :rx="config.borderRadius"
              :ry="config.borderRadius"
              :stroke="data.nodes[nodeId].researchStatus === 'Undiscovered' ? config.colorOnUndiscovered : config.color"
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

      </g>
      <g v-else>
        <foreignObject
            :x="-config.width / 2 + 10"
            :y="-config.height / 2 - 10"
            width="60"
            height="60">
          <div xmlns="http://www.w3.org/1999/xhtml">
            <TechIcon :tech-id="nodeId" size="4x" style="color: black;"/>
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
import {getCategoryColorCode} from "@/Helpers.js";
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
    autoPanAndZoomOnLoad: false,
    onBeforeInitialDisplay: () => layout("LR"),
  },
  node: {
    draggable: false,
    selectable: false,
    normal: {
      type: "rect",
      width: nodeSize * 3.6,
      height: nodeSize,
      borderRadius: 4,
      color: "black",
      colorOnUndiscovered: "#333333",

      nameColor: "#ffffff",
      descriptionColor: "#ffffff",
      costColor: "#000000",
      prerequisColor: "#f0f0f0",
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
    margin: 1,

    normal: {
      color: "#ffffff",
      linecap: "round",
    },
    hover: {
      color: "#ffffff",
    },
  },
})
const zoomLevel = ref(2)


const layouts = reactive({
  nodes: {},
})

const eventHandlers = {
  "view:load": () => {
    if (!graph.value) return
    // Pan the target node position to the center.
    const sizes = graph.value.getSizes()
    graph.value.panTo({
      x: sizes.width / 2 - layouts.nodes[targetNode].x,
      y: sizes.height / 2 - layouts.nodes[targetNode].y,
    })
  },
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
    ranksep: nodeSize,
  })
  // Default to assigning a new object as a label for each new edge.
  g.setDefaultEdgeLabel(() => ({}))

  // Add nodes to the graph. The first argument is the node id. The second is
  // metadata about the node. In this case we're going to add labels to each of
  // our nodes.
  Object.entries(data.nodes).forEach(([nodeId, node]) => {
    g.setNode(nodeId, { label: node.name, width: nodeSize * 3, height: nodeSize })
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
