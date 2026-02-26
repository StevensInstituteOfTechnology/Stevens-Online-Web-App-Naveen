import React, { useCallback, useEffect, useState, useMemo } from "react";
import ReactFlow, {
  useNodesState,
  useEdgesState,
  Background,
  Controls,
  MarkerType,
} from "reactflow";
import "reactflow/dist/style.css";

import { initialData } from "./data";
import { getLayoutedElements } from "./utils/layout";
import FoundationNode from "./nodes/FoundationNode";
import CertificateNode from "./nodes/CertificateNode";
import MastersNode from "./nodes/MastersNode";

// Register all 3 node types
const nodeTypes = {
  foundation: FoundationNode,
  certificate: CertificateNode,
  masters: MastersNode,
};

// Edge styling constants
const highlightedEdgeStyle = { stroke: "#eab308", strokeWidth: 3, opacity: 1 };

const SkillTree = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [selectedItem, setSelectedItem] = useState(null);

  // Extract certificates and masters from data for sidebar
  const certificates = useMemo(
    () => initialData.nodes.filter((n) => n.type === "certificate"),
    []
  );
  const masters = useMemo(
    () => initialData.nodes.filter((n) => n.type === "masters"),
    []
  );

  // Recursive traversal to find ALL connected nodes through ALL layers
  const getFilteredElements = useCallback(() => {
    if (!selectedItem) return { nodes: [], edges: [] };

    const connectedNodeIds = new Set([selectedItem]);
    const connectedEdgeIds = new Set();

    // Traverse outgoing edges (forward: toward Masters)
    const traverseOutgoing = (nodeId) => {
      initialData.edges.forEach((edge) => {
        if (edge.source === nodeId && !connectedEdgeIds.has(edge.id)) {
          connectedEdgeIds.add(edge.id);
          connectedNodeIds.add(edge.target);
          traverseOutgoing(edge.target);
        }
      });
    };

    // Traverse incoming edges (backward: toward Foundations)
    const traverseIncoming = (nodeId) => {
      initialData.edges.forEach((edge) => {
        if (edge.target === nodeId && !connectedEdgeIds.has(edge.id)) {
          connectedEdgeIds.add(edge.id);
          connectedNodeIds.add(edge.source);
          traverseIncoming(edge.source);
        }
      });
    };

    // Traverse BOTH directions to get full connected subgraph
    traverseOutgoing(selectedItem);
    traverseIncoming(selectedItem);

    // Filter nodes and edges
    const filteredNodes = initialData.nodes.filter((n) =>
      connectedNodeIds.has(n.id)
    );
    const filteredEdges = initialData.edges.filter((e) =>
      connectedEdgeIds.has(e.id)
    );

    return getLayoutedElements(filteredNodes, filteredEdges, "BT");
  }, [selectedItem]);

  // Update layout when selection changes
  useEffect(() => {
    if (!selectedItem) {
      setNodes([]);
      setEdges([]);
      return;
    }

    const { nodes: filteredNodes, edges: filteredEdges } =
      getFilteredElements();

    // Mark the selected node for highlighting
    const nodesWithSelection = filteredNodes.map((node) => ({
      ...node,
      data: { ...node.data, isSelected: node.id === selectedItem },
    }));

    // Apply animated edge styling
    const styledEdges = filteredEdges.map((edge) => ({
      ...edge,
      style: highlightedEdgeStyle,
      animated: true,
      markerEnd: {
        type: MarkerType.ArrowClosed,
        color: "#eab308",
      },
    }));

    setNodes(nodesWithSelection);
    setEdges(styledEdges);
  }, [selectedItem, getFilteredElements, setNodes, setEdges]);

  // Handle sidebar item click
  const handleSidebarSelect = (itemId) => {
    setSelectedItem(itemId === selectedItem ? null : itemId);
  };

  return (
    <div className="flex h-[600px] bg-gray-950 rounded-xl border border-gray-800 shadow-2xl overflow-hidden">
      {/* Sidebar */}
      <div className="w-64 border-r border-gray-800 overflow-y-auto flex-shrink-0">
        {/* Certificates Section */}
        <div className="p-4">
          <h3 className="text-blue-400 text-xs font-bold uppercase tracking-wider mb-3 flex items-center gap-2">
            <span>📜</span> Certificates
          </h3>
          <div className="space-y-2">
            {certificates.map((cert) => (
              <button
                key={cert.id}
                onClick={() => handleSidebarSelect(cert.id)}
                className={`w-full text-left p-3 rounded-lg transition-all duration-200 ${
                  selectedItem === cert.id
                    ? "bg-blue-500/20 border border-blue-500 shadow-lg shadow-blue-500/20"
                    : "bg-gray-800/50 border border-gray-700 hover:bg-gray-700/50 hover:border-gray-600"
                }`}
              >
                <span
                  className={`text-sm font-medium ${
                    selectedItem === cert.id ? "text-blue-300" : "text-white"
                  }`}
                >
                  {cert.data.label}
                </span>
                <p className="text-[10px] text-gray-400 mt-1">
                  {cert.data.credits} Credits
                </p>
              </button>
            ))}
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-800 mx-4" />

        {/* Master's Programs Section */}
        <div className="p-4">
          <h3 className="text-yellow-500 text-xs font-bold uppercase tracking-wider mb-3 flex items-center gap-2">
            <span>🎓</span> Master's Programs
          </h3>
          <div className="space-y-2">
            {masters.map((master) => (
              <button
                key={master.id}
                onClick={() => handleSidebarSelect(master.id)}
                className={`w-full text-left p-3 rounded-lg transition-all duration-200 ${
                  selectedItem === master.id
                    ? "bg-yellow-500/20 border border-yellow-500 shadow-lg shadow-yellow-500/20"
                    : "bg-gray-800/50 border border-gray-700 hover:bg-gray-700/50 hover:border-gray-600"
                }`}
              >
                <span
                  className={`text-sm font-medium ${
                    selectedItem === master.id
                      ? "text-yellow-300"
                      : "text-white"
                  }`}
                >
                  {master.data.label}
                </span>
                <p className="text-[10px] text-gray-400 mt-1">
                  {master.data.totalCredits} Total Credits
                </p>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Canvas Area */}
      <div className="flex-1 relative">
        {!selectedItem ? (
          /* Empty State */
          <div className="flex items-center justify-center h-full">
            <div className="text-center">
              <div className="text-6xl mb-4 opacity-50">🗺️</div>
              <p className="text-gray-400 text-lg font-medium">
                Select a Certificate or Program
              </p>
              <p className="text-gray-500 text-sm mt-2 max-w-[280px] mx-auto">
                to visualize the stackable pathway and see all connected courses
              </p>
            </div>
          </div>
        ) : (
          /* React Flow Canvas */
          <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            nodeTypes={nodeTypes}
            fitView
            fitViewOptions={{ padding: 0.3 }}
            attributionPosition="bottom-right"
            proOptions={{ hideAttribution: true }}
          >
            <Background color="#374151" gap={16} size={1} />
            <Controls className="!bg-white !border-gray-700 !fill-white [&>button]:!fill-gray-700 " />
          </ReactFlow>
        )}
      </div>
    </div>
  );
};

export default SkillTree;
