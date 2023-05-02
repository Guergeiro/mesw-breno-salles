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
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import ForceGraph2D, {
  ForceGraphMethods as ForceGraphMethods2D,
  LinkObject as LinkObject2D,
  NodeObject as NodeObject2D,
} from "react-force-graph-2d";
import ForceGraph3D, {
  ForceGraphMethods as ForceGraphMethods3D,
  LinkObject as LinkObject3D,
  NodeObject as NodeObject3D,
} from "react-force-graph-3d";
import { DecompositionSchema, ServiceSchema } from "shared-schemas";
import colors from "tailwindcss/colors";
import {
  BoxGeometry,
  Mesh,
  MeshLambertMaterial,
  MeshLambertMaterialParameters,
  SphereGeometry,
} from "three";
import { CanZoomResetStore } from "./can-zoom-reset.store";
import {
  DecompositionsColoursStore,
  getRandomColor,
  mixColors,
} from "./decompositions-colours.store";
import { DecompositionsShowingStore } from "./decompositions-showing.store";
import { addService, ServicesFocusedStore } from "./services-focused.store";
import { ShowModulesStore } from "./show-modules.store";

const NODE_R = 4;

type NodeObject = (NodeObject2D | NodeObject3D) & {
  links?: LinkObject[];
};

type LinkObject = LinkObject2D | LinkObject3D;

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

  const moduleToServiceMap = useMemo(() => {
    const map = new Map<string, ServiceSchema[]>();
    for (const service of serviceMap.values()) {
      for (const module of service.modules) {
        const previous = map.get(module) ?? [];
        previous.push(service);
        map.set(module, previous);
      }
    }
    return map;
  }, [serviceMap]);

  const showModules = useStore(ShowModulesStore);

  const generateGraphData = useCallback(() => {
    // 1st get all Modules
    const nodes: { id: string; links?: typeof links }[] = [];

    if (showModules === true) {
      for (const module of moduleToServiceMap.keys()) {
        nodes.push({ id: `module_${module}` });
      }
    }
    for (const service of serviceMap.keys()) {
      nodes.push({ id: `service_${service}` });
    }

    // 2nd make Connections
    const links: { [source: string]: string }[] = [];

    if (showModules === true) {
      for (const [module, services] of moduleToServiceMap.entries()) {
        for (const { id } of services) {
          links.push({
            source: `module_${module}`,
            target: `service_${id}`,
          });
        }
      }
    }
    for (const { id, relationships, relatedServices } of serviceMap.values()) {
      for (const relation of relationships || []) {
        const obj: Record<string, string> = {
          source: `service_${id}`,
        };
        if (typeof relation === "string") {
          obj.target = `service_${relation}`;
        } else {
          obj.target = `service_${relation.id}`;
        }
        links.push(obj);
      }
      for (const relation of relatedServices || []) {
        const obj: Record<string, string> = {
          source: `service_${id}`,
        };
        if (typeof relation === "string") {
          obj.target = `service_${relation}`;
        } else {
          obj.target = `service_${relation.id}`;
        }
        links.push(obj);
      }
    }

    for (const link of links) {
      const a = nodes.find(function ({ id }) {
        return link.source === id;
      });
      const b = nodes.find(function ({ id }) {
        return link.target === id;
      });
      if (a == null) {
        continue;
      }
      if (b == null) {
        continue;
      }
      if (a.links == null) {
        a.links = [];
      }
      a.links.push(link);
      if (b.links == null) {
        b.links = [];
      }
      b.links.push(link);
    }

    return {
      nodes,
      links,
    };
  }, [moduleToServiceMap, serviceMap, showModules]);

  const graphData = generateGraphData();

  const fg2DRef = useRef<ForceGraphMethods2D>();
  const fg3DRef = useRef<ForceGraphMethods3D>();

  const containerRef = useRef<HTMLDivElement>(null);

  const [hoverHighlight, setHoverHighlight] = useState(new Set<LinkObject>());

  const hasHighlight = useCallback(
    (link: LinkObject) => {
      return hoverHighlight.has(link);
    },
    [hoverHighlight]
  );

  const handleLinkWidth = useCallback(
    (link: LinkObject) => {
      const base = NODE_R / 2;
      if (hasHighlight(link)) {
        return 4 * base;
      }
      return base;
    },
    [hasHighlight]
  );

  const handleLinkHover = useCallback(
    (link: LinkObject | null) => {
      hoverHighlight.clear();
      if (link != null) {
        hoverHighlight.add(link);
      }
      setHoverHighlight(hoverHighlight);
    },
    [hoverHighlight]
  );

  const handleNodeHover = useCallback(
    (node: NodeObject | null) => {
      hoverHighlight.clear();
      if (node != null) {
        for (const link of node.links || []) {
          hoverHighlight.add(link);
        }
      }
      setHoverHighlight(hoverHighlight);
    },
    [hoverHighlight]
  );

  const handleLinkParticlesWidth = useCallback(
    (link: LinkObject) => {
      if (hasHighlight(link)) {
        return 4;
      }
      return 0;
    },
    [hasHighlight]
  );

  const mixDecompositionsColours = useCallback(
    (ids: string[]) => {
      const allColours: string[] = [];

      for (const id of ids) {
        allColours.push(decompositionColours.get(id) || getRandomColor());
      }

      const hex = mixColors(allColours);
      return `#${hex}`;
    },
    [decompositionColours]
  );

  const handleNodeColor = useCallback(
    (node: NodeObject) => {
      const [type, id] = (node.id as string).split("_");
      const idsToMix: string[] = [];
      if (type === "module") {
        for (const { decomposition } of moduleToServiceMap.get(id) ?? []) {
          if (typeof decomposition === "string") {
            idsToMix.push(decomposition);
          } else {
            idsToMix.push(decomposition.id);
          }
        }
      } else {
        const service = serviceMap.get(id);
        if (service != null) {
          if (typeof service.decomposition === "string") {
            idsToMix.push(service.decomposition);
          } else {
            idsToMix.push(service.decomposition.id);
          }
        }
      }

      return mixDecompositionsColours(idsToMix);
    },
    [moduleToServiceMap, serviceMap, mixDecompositionsColours]
  );

  const handleLinkParticlesColour = useCallback(
    ({ source, target }: LinkObject) => {
      if (typeof source !== "object") {
        return getRandomColor();
      }
      const sourceColour = handleNodeColor(source);
      if (typeof target !== "object") {
        return getRandomColor();
      }
      const targetColour = handleNodeColor(target);
      const hex = mixColors([sourceColour, targetColour]);
      return `#${hex}`;
    },
    [handleNodeColor]
  );

  const handleNodeVal = useCallback(
    (node: NodeObject) => {
      const [_, id] = (node.id as string).split("_");
      const service = serviceMap.get(id);
      if (service == null) {
        return 1;
      }
      return service.modules.length;
    },
    [serviceMap]
  );

  const handleNodeLabel = useCallback(
    (node: NodeObject) => {
      const [_, id] = (node.id as string).split("_");
      const service = serviceMap.get(id);
      if (service == null) {
        return id;
      }
      return service.name;
    },
    [serviceMap]
  );

  const handleNodeClick = useCallback(
    (node: NodeObject, cameraMove: () => boolean) => {
      const [type, id] = (node.id as string).split("_");
      if (type === "module") {
        return;
      }
      const hasMoved = cameraMove();
      if (hasMoved) {
        CanZoomResetStore.set(true);
        const service = serviceMap.get(id);
        if (service != null) {
          addService(service);
        }
      }
    },
    [serviceMap]
  );

  const handle2DNodeClick = useCallback(
    (node: NodeObject2D) => {
      handleNodeClick(node, function () {
        // Aim at node from outside it
        const distance = NODE_R * 4;

        if (fg2DRef?.current != null) {
          fg2DRef.current.centerAt(node.x as number, node.y as number, 1000);
          fg2DRef.current.zoom(distance, 1000);
          return true;
        }
        return false;
      });
    },
    [fg2DRef, handleNodeClick]
  );

  const handle3DNodeClick = useCallback(
    (node: NodeObject3D) => {
      handleNodeClick(node, function () {
        const distance = NODE_R * 12;
        const x = node.x as number;
        const y = node.y as number;
        const z = node.z as number;
        const distRatio = 1 + distance / Math.hypot(x, y, z);

        if (fg3DRef?.current != null) {
          fg3DRef.current.cameraPosition(
            {
              x: x * distRatio,
              y: y * distRatio,
              z: z * distRatio,
            },
            {
              x: x,
              y: y,
              z: z,
            },
            1000
          );
          return true;
        }
        return false;
      });
    },
    [fg3DRef, handleNodeClick]
  );

  const zoomReset = useStore(CanZoomResetStore);
  const fitZoom2D = useCallback(() => {
    if (zoomReset === false) {
      if (fg2DRef?.current != null) {
        fg2DRef.current.zoomToFit(400);
      }
    }
  }, [zoomReset, fg2DRef]);
  const fitZoom3D = useCallback(() => {
    if (zoomReset === false) {
      if (fg3DRef?.current != null) {
        fg3DRef.current.zoomToFit(400);
      }
    }
  }, [zoomReset, fg3DRef]);

  const focusedServices = useStore(ServicesFocusedStore);

  const handleNodeCanvasObject = useCallback(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (node: NodeObject2D, ctx: any) => {
      const [type, id] = (node.id as string).split("_");
      ctx.fillStyle = handleNodeColor(node);
      const x = node.x as number;
      const y = node.y as number;
      if (type === "module") {
        ctx.fillRect(x - NODE_R / 2, y - NODE_R / 2, NODE_R, NODE_R);
        return;
      }
      const size = Math.sqrt(Math.max(0, handleNodeVal(node) || 1)) * NODE_R;

      ctx.beginPath();
      ctx.arc(x, y, size, 0, 2 * Math.PI);
      ctx.fill();
      ctx.closePath();
      for (const service of focusedServices) {
        if (service.id === id) {
          ctx.strokeStyle = red500;
          ctx.stroke();
          break;
        }
      }
    },
    [handleNodeColor, handleNodeVal, focusedServices]
  );

  const handleNodeThreeObject = useCallback(
    (node: NodeObject3D) => {
      const [type, id] = (node.id as string).split("_");
      const color = handleNodeColor(node);
      const mesh = new Mesh();
      if (type === "module") {
        mesh.geometry = new BoxGeometry(NODE_R, NODE_R, NODE_R);
      } else {
        const size = Math.sqrt(Math.max(0, handleNodeVal(node) || 1)) * NODE_R;
        mesh.geometry = new SphereGeometry(size);
      }
      const materialProps: MeshLambertMaterialParameters = {
        color,
        transparent: false,
        opacity: 1,
      };
      for (const service of focusedServices) {
        if (service.id === id) {
          materialProps.wireframe = true;
          break;
        }
      }
      mesh.material = new MeshLambertMaterial(materialProps);

      return mesh;
    },
    [handleNodeColor, handleNodeVal, focusedServices]
  );

  const { width, height } = useSize(containerRef);

  const graphMode = useStore(ForcedGraphMode);

  const slate100 = useMemo(() => {
    return colors.slate[100];
  }, []);

  const red500 = useMemo(() => {
    return colors.red[500];
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
          nodeCanvasObject={handleNodeCanvasObject}
          nodeLabel={handleNodeLabel}
          linkWidth={handleLinkWidth}
          linkDirectionalParticles={4}
          linkDirectionalParticleWidth={handleLinkParticlesWidth}
          linkDirectionalParticleColor={handleLinkParticlesColour}
          onNodeClick={handle2DNodeClick}
          onNodeHover={handleNodeHover}
          onLinkHover={handleLinkHover}
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
          nodeThreeObject={handleNodeThreeObject}
          nodeResolution={64}
          nodeLabel={handleNodeLabel}
          linkWidth={handleLinkWidth}
          linkDirectionalParticles={4}
          linkDirectionalParticleWidth={handleLinkParticlesWidth}
          linkDirectionalParticleColor={handleLinkParticlesColour}
          onNodeClick={handle3DNodeClick}
          onLinkHover={handleLinkHover}
          cooldownTicks={100}
          onEngineStop={fitZoom3D}
        />
      )}
    </div>
  );
};
export default Chart;
