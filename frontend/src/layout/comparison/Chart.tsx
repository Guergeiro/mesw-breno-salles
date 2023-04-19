/**
 * @jsx react-jsx
 * @jsxImportSource react
 */

import { useStore } from "@nanostores/react";
import useResizeObserver from "@react-hook/resize-observer";
import { ForcedGraphMode } from "@stores/forced-graph-mode.store";
import { computed } from "nanostores";
import {
  RefObject,
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import ForceGraph2D, {
  ForceGraphMethods as ForceGraphMethods2D,
  GraphData as GraphData2D,
  NodeObject as NodeObject2D,
  LinkObject as LinkObject2D
} from "react-force-graph-2d";
import ForceGraph3D, {
  ForceGraphMethods as ForceGraphMethods3D,
  GraphData as GraphData3D,
  NodeObject as NodeObject3D,
  LinkObject as LinkObject3D
} from "react-force-graph-3d";
import { DecompositionSchema, ServiceSchema } from "shared-schemas";
import colors from "tailwindcss/colors";
import {
  DecompositionsColoursStore,
  getRandomColor,
} from "./decompositions-colours.store";
import { DecompositionsShowingStore } from "./decompositions-showing.store";
import { CanZoomResetStore } from "./can-zoom-reset.store";
import { addService, ServicesFocusedStore } from "./services-focused.store";

const NODE_R = 4;

type GraphData = GraphData2D | GraphData3D;

type NodeObject = NodeObject2D | NodeObject3D;

type LinkObject = LinkObject2D | LinkObject3D;

function generateGraphData(services: Map<string, ServiceSchema>): GraphData {
  // 1st get all Nodes
  const nodes: { id: string }[] = [];
  for (const { id } of services.values()) {
    nodes.push({ id });
  }

  // 2nd make Connections
  const links: { [source: string]: string }[] = [];
  for (const { id, relationships } of services.values()) {
    for (const relation of relationships || []) {
      links.push({
        ["source"]: id,
        ["target"]: relation.id,
      });
    }
  }

  return {
    nodes,
    links,
  };
}

function useSize(target?: RefObject<HTMLElement>) {
  const [size, setSize] = useState({
    width: window.innerWidth,
    height: (window.innerHeight * 3) / 4,
  });

  useLayoutEffect(() => {
    if (target?.current != null) {
      setSize(target.current.getBoundingClientRect());
    }
  }, [target]);

  if (target != null) {
    useResizeObserver(target, (entry) => {
      setSize(entry.contentRect);
    });
  }

  return size;
}

const Chart = () => {
  const decompositionColours = useStore(DecompositionsColoursStore);

  const decompositionMap = useStore(
    computed(DecompositionsShowingStore, (store) => {
      const map = new Map<string, DecompositionSchema>();

      for (const [key, value] of Object.entries(store)) {
        if (value == null) {
          continue;
        }
        const previous = map.get(key) ?? value;
        map.set(key, previous);
      }
      return map;
    })
  );

  const serviceMap = useMemo(() => {
    const map = new Map<string, ServiceSchema>();
    for (const { services } of decompositionMap.values()) {
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
    return generateGraphData(serviceMap);
  }, [serviceMap]);

  const containerRef = useRef<HTMLDivElement>(null);
  const fg2DRef = useRef<ForceGraphMethods2D>();
  const fg3DRef = useRef<ForceGraphMethods3D>();

  const handleNodeColor = useCallback(
    ({ id }: NodeObject) => {
      const service = serviceMap.get(id as string)!;
      if (typeof service.decomposition === "object") {
        return getRandomColor();
      }
      const decomposition = decompositionMap.get(service.decomposition)!;
      return decompositionColours.get(decomposition.id)!;
    },
    [serviceMap, decompositionMap, decompositionColours]
  );

  const handleNodeVal = useCallback(
    ({ id }: NodeObject) => {
      const service = serviceMap.get(id as string);
      if (service == null) {
        return 1;
      }
      return service.modules.length;
    },
    [serviceMap]
  );

  const handleNodeLabel = useCallback(
    ({ id }: NodeObject) => {
      const service = serviceMap.get(id as string)!;
      return service.name
    },
    [serviceMap]
  );

  const handleLinkWidth = useCallback((_link: LinkObject) => {
    return 3;
  }, [serviceMap])

  const handle2DNodeClick = useCallback(
    (node: NodeObject2D) => {
      // Aim at node from outside it
      const distance = NODE_R * 4;

      if (fg2DRef?.current != null) {
        fg2DRef.current.centerAt(node.x!, node.y!, 1000);
        fg2DRef.current.zoom(distance, 1000);
        CanZoomResetStore.set(true);
        addService(serviceMap.get(node.id as string)!)
      }
    },
    [fg2DRef, serviceMap]
  );

  const handle3DNodeClick = useCallback(
    (node: NodeObject3D) => {
      const distance = NODE_R * 12;
      const distRatio = 1 + distance / Math.hypot(node.x!, node.y!, node.z!);

      if (fg3DRef?.current != null) {
        fg3DRef.current.cameraPosition(
          {
            x: node.x! * distRatio,
            y: node.y! * distRatio,
            z: node.z! * distRatio,
          },
          {
            x: node.x!,
            y: node.y!,
            z: node.z!,
          },
          1000
        );
        CanZoomResetStore.set(true);
        addService(serviceMap.get(node.id as string)!)
      }
    },
    [fg3DRef, serviceMap]
  );

  const zoomReset = useStore(CanZoomResetStore);
  const fitZoom2D = useCallback(() => {
    if (zoomReset === false) {
      if (fg2DRef?.current != null) {
        fg2DRef.current.zoomToFit(400);
      }
    }
  }, [zoomReset, fg2DRef])
  const fitZoom3D = useCallback(() => {
    if (zoomReset === false) {
      if (fg3DRef?.current != null) {
        fg3DRef.current.zoomToFit(400);
      }
    }
  }, [zoomReset,fg3DRef])

  const { width, height } = useSize(containerRef);

  const graphMode = useStore(ForcedGraphMode);

  const slate100 = useMemo(() => {
    return colors.slate[100];
  }, []);

  return (
    <div ref={containerRef} className="border border-gray-200 rounded-lg">
      {graphMode === "false" ? (
        <ForceGraph2D
          ref={fg2DRef}
          width={width}
          backgroundColor={slate100}
          height={height}
          graphData={graphData}
          nodeRelSize={NODE_R}
          autoPauseRedraw={false}
          nodeColor={handleNodeColor}
          nodeVal={handleNodeVal}
          nodeLabel={handleNodeLabel}
          linkWidth={handleLinkWidth}
          onNodeClick={handle2DNodeClick}
          cooldownTicks={100}
          onEngineStop={fitZoom2D}
        />
      ) : (
        <ForceGraph3D
          ref={fg3DRef}
          width={width}
          backgroundColor={slate100}
          height={height}
          graphData={graphData}
          nodeRelSize={NODE_R}
          nodeColor={handleNodeColor}
          nodeOpacity={1}
          nodeResolution={64}
          nodeVal={handleNodeVal}
          nodeLabel={handleNodeLabel}
          linkWidth={handleLinkWidth}
          onNodeClick={handle3DNodeClick}
          cooldownTicks={100}
          onEngineStop={fitZoom3D}
        />
      )}
    </div>
  );
};
export default Chart;
