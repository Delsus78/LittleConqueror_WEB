<template>
  <v-network-graph
      ref="graph"
      style="height: 60vh" class="rounded-lg shadow-lg graph"
      :nodes="data.nodes"
      :edges="data.edges"
      :layouts="layouts"
      :configs="configs">
    <!-- Replace the node component :fill="data.nodes[nodeId].researchStatus === 'Undiscovered' ? config.colorOnUndiscovered : config.color" -->
    <template #override-node="{ nodeId, scale, config, ...slotProps }">
      <rect :x="-config.width / 2"
            :y="-config.height / 2"
            :width="config.width"
            :height="config.height"
            :rx="config.borderRadius"
            :ry="config.borderRadius"
            :stroke="data.nodes[nodeId].researchStatus === 'Undiscovered' ? config.colorOnUndiscovered : config.color"
            :stroke-width="config.borderWidth"
            fill="none"
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
          <font-awesome-icon icon="city" size="lg" />
        </div>
      </foreignObject>

      <!-- Nom avec soulignement -->
      <text
          :x="-config.width / 2 + 7"
          :y="-config.height / 2 + 10"
          :font-size="6"
          font-weight="bold"
          :fill="config.nameColor"
          text-decoration="underline"
          style="pointer-events: none">
        {{data.nodes[nodeId].name}}
      </text>

      <!-- Description avec retour à la ligne dynamique -->
      <foreignObject
          :x="-config.width / 2 + 35"
          :y="-config.height / 2 + 15"
          :width="config.width - 35"
          :height="config.height - 20">
        <div xmlns="http://www.w3.org/1999/xhtml"
             :style="`font-size: 5px; line-height: 1.5; color:` + config.descriptionColor + `;`">
          <p>{{data.nodes[nodeId].description}}</p>
        </div>
      </foreignObject>

      <!-- Coût en bas à droite -->
      <text
          :x="-config.width / 2 + 35"
          :y="config.height / 2 - 2"
          font-size="5"
          font-weight="bold"
          :style="`color:` + config.costColor + `;`">
        COST
      </text>
    </template>
  </v-network-graph>
</template>
<script setup>
import { useTechResearchStore } from "@/stores/index.js";
import {defineConfigs} from "v-network-graph";
import dagre from "dagre";
import {reactive, ref} from "vue";

const store = useTechResearchStore();
const researchData = await store.fetchTechResearches();
const nodeSize = 45;
const data = store.transformTechResearchesToVNetworkGraph(researchData);
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
      width: nodeSize * 3,
      height: nodeSize,
      borderRadius: 4,
      color: "#ff6f00",
      colorOnUndiscovered: "#333333",

      nameColor: "#ffffff",
      descriptionColor: "#ffffff",
      costColor: "#4a6dfc",
    },
    focusring: {
      visible: true,
      width: 4,
      padding: 3,
      color: "#eebb00",
      dasharray: "0",
    },
    hover: {
      color: "#983100",
      colorOnUndiscovered: "#333333",

      nameColor: "#ffffff",
      descriptionColor: "#ffffff",
      costColor: "#4a6dfc",
    },
    label: {
      visible: false,
    }
  },
  edge: {
    margin: 1,

    normal: {
      color: "#ff6f00",
      linecap: "round",
    },
    hover: {
      color: "#ff5500",
    },
  },
})

const layouts = reactive({
  nodes: {},
})

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
    align: "UR",
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
