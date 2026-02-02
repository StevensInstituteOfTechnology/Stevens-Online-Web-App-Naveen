import React, { useCallback, useEffect, useState } from "react";
import ReactFlow, {
  useNodesState,
  useEdgesState,
  addEdge,
  ConnectionLineType,
  Background,
  Controls,
  MiniMap,
  MarkerType,
} from "reactflow";
import "reactflow/dist/style.css";

import { initialData } from "./data";
import { getLayoutedElements } from "./utils/layout";
import CertificateNode from "./nodes/CertificateNode";
import MastersNode from "./nodes/MastersNode";

const nodeTypes = {
  certificate: CertificateNode,
  masters: MastersNode,
};

const SkillTree = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [selectedNode, setSelectedNode] = useState(null);

  // Initial Layout Calculation
  useEffect(() => {
    const { nodes: layoutedNodes, edges: layoutedEdges } = getLayoutedElements(
      initialData.nodes,
      initialData.edges
    );

    setNodes(layoutedNodes);
    setEdges(layoutedEdges);
  }, []);

  // --- Interaction Logic: "Light Up" Paths ---
  // When a node is clicked, we want to highlight all paths connected to it.
  const onNodeClick = useCallback(
    (event, node) => {
      setSelectedNode(node.id);

      // 1. Reset all edges to default style
      const resetEdges = edges.map((edge) => ({
        ...edge,
        style: { stroke: "#4b5563", strokeWidth: 1, opacity: 0.3 }, // Gray-600, dimmed
        animated: false,
        markerEnd: {
          type: MarkerType.ArrowClosed,
          color: "#4b5563",
        },
      }));

      // 2. Find all outgoing OR incoming paths depending on node type
      const connectedEdgeIds = new Set();
      const connectedNodeIds = new Set([node.id]);

      const traverseOutgoing = (currentNodeId) => {
        const outgoing = edges.filter((e) => e.source === currentNodeId);
        outgoing.forEach((edge) => {
          connectedEdgeIds.add(edge.id);
          connectedNodeIds.add(edge.target);
          traverseOutgoing(edge.target);
        });
      };

      const traverseIncoming = (currentNodeId) => {
        const incoming = edges.filter((e) => e.target === currentNodeId);
        incoming.forEach((edge) => {
          connectedEdgeIds.add(edge.id);
          connectedNodeIds.add(edge.source);
          traverseIncoming(edge.source);
        });
      };

      // Check if it's a Masters node (target) or Certificate node (source)
      // Based on our data, certificates are sources, masters are targets.
      // We can check if the node has outgoing edges (Certificate) or incoming edges (Masters)
      // Or rely on node type if available in node object passed to handler

      // Simple heuristic: traverse both directions to show full lineage?
      // Or specific logic:
      // If Certificate -> Show what it unlocks (outgoing)
      // If Masters -> Show requirements (incoming)

      if (node.type === "masters") {
        traverseIncoming(node.id);
      } else {
        traverseOutgoing(node.id);
      }

      // 3. Highlight connected edges and nodes
      const newEdges = resetEdges.map((edge) => {
        if (connectedEdgeIds.has(edge.id)) {
          return {
            ...edge,
            style: { stroke: "#eab308", strokeWidth: 3, opacity: 1 }, // Yellow-500
            animated: true,
            markerEnd: {
              type: MarkerType.ArrowClosed,
              color: "#eab308",
            },
          };
        }
        return edge;
      });

      // Option: Dim unconnected nodes? For now, let's just keep nodes fully visible
      // but maybe add a visual indicator.

      setEdges(newEdges);
    },
    [edges, setEdges]
  );

  // Reset when clicking on empty canvas
  const onPaneClick = useCallback(() => {
    setSelectedNode(null);
    // Reset styling to default state
    setEdges((eds) =>
      eds.map((e) => ({
        ...e,
        style: { stroke: "#b1b1b7", strokeWidth: 2 }, // Default gray
        animated: false,
        markerEnd: {
          type: MarkerType.ArrowClosed,
          color: "#b1b1b7",
        },
      }))
    );
  }, []);

  return (
    <div className="w-full h-[600px] bg-gray-950 rounded-xl border border-gray-800 shadow-2xl overflow-hidden relative">
      {/* Header Overlay */}
      <div className="absolute top-4 left-4 z-10 pointer-events-none">
        <h2 className="text-white text-xl font-bold tracking-tight uppercase drop-shadow-md">
          Career <span className="text-yellow-500">Pathways</span>
        </h2>
        <p className="text-gray-400 text-xs mt-1 max-w-[250px]">
          Select a <span className="text-blue-400 font-bold">Certificate</span>{" "}
          to see which{" "}
          <span className="text-yellow-500 font-bold">Master's Degrees</span> it
          unlocks, or select a{" "}
          <span className="text-yellow-500 font-bold">Master's Degree</span> to
          see its prerequisite{" "}
          <span className="text-blue-400 font-bold">Certificates</span>.
        </p>
      </div>

      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onNodeClick={onNodeClick}
        onPaneClick={onPaneClick}
        nodeTypes={nodeTypes}
        fitView
        attributionPosition="bottom-right"
        proOptions={{ hideAttribution: true }}
      >
        <Background color="#374151" gap={16} size={1} />
        <Controls className="!bg-gray-800 !border-gray-700 !fill-white [&>button]:!fill-white hover:[&>button]:!bg-gray-700" />
      </ReactFlow>
    </div>
  );
};

export default SkillTree;
