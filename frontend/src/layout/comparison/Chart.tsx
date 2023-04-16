/**
 * @jsx react-jsx
 * @jsxImportSource react
 */

import { useStore } from "@nanostores/react";
import useResizeObserver from "@react-hook/resize-observer";
import { DecompositionsSelectedStore } from "@stores/decompositions-selected.store";
import { ResultsSelectedStore } from "@stores/results-selected.store";
import { computed } from "nanostores";
import { RefObject, useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import ForceGraph2D, {NodeObject, GraphData} from "react-force-graph-2d"
import { DecompositionSchema } from "shared-schemas";
import colors from 'tailwindcss/colors';

function getRandomColor(colours: string[]) {
  return colours[Math.floor(Math.random() * colours.length)];
}

const NODE_R = 8;

function genRandomTree(N = 300, reverse = false) {
  return {
    nodes: [...Array(N).keys()].map((i) => ({ id: i })),
    links: [...Array(N).keys()]
      .filter((id) => id)
      .map((id) => ({
        [reverse ? "target" : "source"]: id,
        [reverse ? "source" : "target"]: Math.round(Math.random() * (id - 1)),
      })),
  };
}

type Colour = {
  [key: string]: string | Colour;
}

const excludedPallets = ["50", "100", "200", "300"]

function extractAllTailwindColours(obj: Colour) {
  const colours: string[] =[]

  for (const [key, value] of Object.entries(obj)) {
    if (excludedPallets.includes(key)) {
      continue;
    }
    if (typeof value === "string") {
      colours.push(value);
    }
    if (typeof value === "object") {
      colours.push(...extractAllTailwindColours(value));
    }
  }

  return colours;
}

function generateGraphData(decompositions: Map<string, DecompositionSchema>): GraphData {
  // 1st get all Nodes
  const nodes: {id: string}[] = [];
  for (const {services} of decompositions.values()) {
    for (const {id} of services) {
      nodes.push({id});
    }
  }

  // 2nd make Connections
  const links: {[source: string]: string}[] = []
  return {
    nodes,
    links
  }
}

function useSize(target?: RefObject<HTMLElement>) {
  const [size, setSize] = useState({
    width: window.innerWidth,
    height: (window.innerHeight * 3) / 4
  })

  useLayoutEffect(() => {
    if (target?.current != null) {
      setSize(target.current.getBoundingClientRect());
    }
  }, [target])

  if (target != null) {
    useResizeObserver(target, entry => {
      setSize(entry.contentRect)
    })
  }

  return size;
}

const Chart = () => {
  const data = useMemo(() => {
    const gData = genRandomTree(80);

    // cross-link node objects
    gData.links.forEach((link) => {
      const a = gData.nodes[link.source];
      const b = gData.nodes[link.target];
      !a.neighbors && (a.neighbors = []);
      !b.neighbors && (b.neighbors = []);
      a.neighbors.push(b);
      b.neighbors.push(a);

      !a.links && (a.links = []);
      !b.links && (b.links = []);
      a.links.push(link);
      b.links.push(link);
    });

    return gData;
  }, []);

  const [highlightNodes, setHighlightNodes] = useState(new Set());
  const [highlightLinks, setHighlightLinks] = useState(new Set());
  const [hoverNode, setHoverNode] = useState<NodeObject | null>(null);

  const updateHighlight = () => {
    setHighlightNodes(highlightNodes);
    setHighlightLinks(highlightLinks);
  };

  const handleNodeHover = (node: NodeObject) => {
    highlightNodes.clear();
    highlightLinks.clear();
    if (node) {
      highlightNodes.add(node);
      node.neighbors.forEach((neighbor) => highlightNodes.add(neighbor));
      node.links.forEach((link) => highlightLinks.add(link));
    }

    setHoverNode(node || null);
    updateHighlight();
  };

  const handleLinkHover = (link) => {
    highlightNodes.clear();
    highlightLinks.clear();

    if (link) {
      highlightLinks.add(link);
      highlightNodes.add(link.source);
      highlightNodes.add(link.target);
    }

    updateHighlight();
  };

  const paintRing = useCallback(
     (node: NodeObject, ctx: CanvasRenderingContext2D) => {
      // add ring just for highlighted nodes
      ctx.beginPath();
      ctx.arc(node.x!, node.y!, NODE_R * 1.4, 0, 2 * Math.PI, false);
      ctx.fillStyle = node === hoverNode ? "red" : "orange";
      ctx.fill();
    },
    [hoverNode]
  );

  const tailwindColours = useMemo(() => {
    const colours = extractAllTailwindColours(colors as unknown as Colour);
    return colours
  }, []);

  const decompositionMap = useStore(computed(DecompositionsSelectedStore, (store) =>{
    const map = new Map<string, DecompositionSchema>()

    for (const [key, value] of Object.entries(store)) {
      if (value == null) {
        continue;
      }
      const previous = map.get(key) ?? value;
      map.set(key, previous);
    }
    return map;
  }))

  const serviceMap = useMemo(() => {
    const map = new Map<string, DecompositionSchema["services"][number]>()
    for (const {services} of decompositionMap.values()) {
      for (const service of services) {
        const previous = map.get(service.id) ?? service;
        map.set(service.id, previous);
      }
    }
    return map;
  }, [decompositionMap]);

  const serviceColours = useMemo(() => {
    const map = new Map<string, string>();
    for (const key of serviceMap.keys()) {
      const colour = map.get(key) ?? getRandomColor(tailwindColours);
      map.set(key, colour);
    }
    return map
  }, [serviceMap]);

  const decompositionColours = useMemo(() => {
    const map = new Map<string, string>();

    for (const key of decompositionMap.keys()) {
      const colour = map.get(key) ?? getRandomColor(tailwindColours);
      map.set(key, colour);
    }
    return map;
  }, [decompositionMap])

  const graphData = useMemo(() => {
    return generateGraphData(decompositionMap)
  }, [decompositionMap])

  const containerRef = useRef<HTMLDivElement>(null);

  const {width, height} = useSize(containerRef);

  return (
    <div ref={containerRef} className="border border-gray-200 rounded-lg">
      <ForceGraph2D
        width={width}
        height={height}
        graphData={graphData}
        nodeRelSize={NODE_R}
        autoPauseRedraw={false}
        nodeColor={({id}) => {
          return serviceColours.get(id as string) ?? getRandomColor(tailwindColours)
        }}
        nodeVal={({id}) => {
          const service = serviceMap.get(id as string);
          if (service == null) {
            return 1;
          }
          return service.modules.length
        }}
        linkWidth={(link) => (highlightLinks.has(link) ? 5 : 1)}
        linkDirectionalParticles={4}
        linkDirectionalParticleWidth={(link) =>
          highlightLinks.has(link) ? 4 : 0
        }
        nodeCanvasObjectMode={(node) =>
          highlightNodes.has(node) ? "before" : undefined
        }
        nodeCanvasObject={paintRing}
      />
    </div>
  );
};
export default Chart;
