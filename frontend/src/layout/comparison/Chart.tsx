/**
 * @jsx react-jsx
 * @jsxImportSource react
 */

import { useStore } from "@nanostores/react";
import useResizeObserver from "@react-hook/resize-observer";
import { DecompositionsSelectedStore } from "@stores/decompositions-selected.store";
import { ForcedGraphMode } from "@stores/forced-graph-mode.store";
import { ResultsSelectedStore } from "@stores/results-selected.store";
import { computed } from "nanostores";
import { RefObject, useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import ForceGraph2D, {NodeObject, GraphData} from "react-force-graph-2d"
import ForceGraph3D from 'react-force-graph-3d';
import { DecompositionSchema, ServiceSchema } from "shared-schemas";
import colors from 'tailwindcss/colors';
import { DecompositionsColoursStore, getRandomColor } from "./decompositions-colours.store";
import { DecompositionsShowingStore } from "./decompositions-showing.store";

const NODE_R = 4;

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

function generateGraphData(services: Map<string, ServiceSchema>): GraphData {
  // 1st get all Nodes
  const nodes: {id: string}[] = [];
  for (const {id} of services.values()) {
    nodes.push({id});
  }

  // 2nd make Connections
  const links: {[source: string]: string}[] = []
  for (const {id, relationships} of services.values()) {
    for (const relation of relationships || []) {
      links.push({
        ["source"]: id,
        ["target"]: relation.id
      })
    }
  }

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
  const decompositionColours = useStore(DecompositionsColoursStore);

  const decompositionMap = useStore(computed(DecompositionsShowingStore, (store) =>{
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
    const map = new Map<string, ServiceSchema>()
    for (const {services} of decompositionMap.values()) {
      if (services == null) {
        continue;
      }
      for (const service of services) {
        const previous = map.get(service.id) ?? service;
        map.set(service.id, previous);
      }
    }
    return map;
  }, [decompositionMap]);


  const graphData = useMemo(() => {
    return generateGraphData(serviceMap)
  }, [serviceMap])

  const containerRef = useRef<HTMLDivElement>(null);

  const {width, height} = useSize(containerRef);

  const graphMode = useStore(ForcedGraphMode)

  const slate100 = useMemo(() => {
    return colors.slate[100]
  }, [])

  return (
    <div ref={containerRef} className="border border-gray-200 rounded-lg">
    {graphMode === "false" ?
      (
      <ForceGraph2D
        width={width}
        backgroundColor={slate100}
        height={height}
        graphData={graphData}
        nodeRelSize={NODE_R}
        autoPauseRedraw={false}
        nodeColor={({id}) => {
          const service = serviceMap.get(id as string)!;
          if (typeof service.decomposition === "object") {
            return getRandomColor()
          }
          const decomposition = decompositionMap.get(service.decomposition)!;
          return decompositionColours.get(decomposition.id)!;
        }}
        nodeVal={({id}) => {
          const service = serviceMap.get(id as string);
          if (service == null) {
            return 1;
          }
          return service.modules.length
        }}
        linkWidth={(link) => {
          return 3;
        }}
      />
    ) : (
      <ForceGraph3D
        width={width}
        backgroundColor={slate100}
        height={height}
        graphData={graphData}
        nodeRelSize={NODE_R}
        nodeColor={({id}) => {
          const service = serviceMap.get(id as string)!;
          if (typeof service.decomposition === "object") {
            return getRandomColor()
          }
          const decomposition = decompositionMap.get(service.decomposition)!;
          return decompositionColours.get(decomposition.id)!;
        }}
        nodeVal={({id}) => {
          const service = serviceMap.get(id as string);
          if (service == null) {
            return 1;
          }
          return service.modules.length
        }}
        linkWidth={(link) => {
          return 3;
        }}
      />
    )
    }
    </div>
  );
};
export default Chart;
