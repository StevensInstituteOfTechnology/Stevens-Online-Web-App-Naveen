import dagre from 'dagre';
import { Position } from 'reactflow';

// Node dimensions by type
const nodeDimensions = {
  foundation: { width: 200, height: 100 },
  certificate: { width: 220, height: 120 },
  masters: { width: 260, height: 140 },
  default: { width: 220, height: 120 },
};

export const getLayoutedElements = (nodes, edges, direction = 'BT') => {
  const dagreGraph = new dagre.graphlib.Graph();
  dagreGraph.setDefaultEdgeLabel(() => ({}));

  // BT = Bottom to Top (3 rows: Foundations at bottom → Certificates → Degrees at top)
  // nodesep: horizontal spacing between nodes in the same row
  // ranksep: vertical spacing between rows
  dagreGraph.setGraph({
    rankdir: direction,
    nodesep: 100,  // Horizontal spacing between nodes in same row
    ranksep: 150,  // Vertical spacing between rows
    marginx: 50,
    marginy: 50,
  });

  nodes.forEach((node) => {
    const dims = nodeDimensions[node.type] || nodeDimensions.default;
    dagreGraph.setNode(node.id, { width: dims.width, height: dims.height });
  });

  edges.forEach((edge) => {
    dagreGraph.setEdge(edge.source, edge.target);
  });

  dagre.layout(dagreGraph);

  const layoutedNodes = nodes.map((node) => {
    const nodeWithPosition = dagreGraph.node(node.id);
    const dims = nodeDimensions[node.type] || nodeDimensions.default;

    if (direction === 'LR') {
      // Left to Right: edges go from left to right
      node.targetPosition = Position.Left;
      node.sourcePosition = Position.Right;
    } else if (direction === 'BT') {
      node.targetPosition = Position.Bottom;
      node.sourcePosition = Position.Top;
    } else {
      // TB (Top to Bottom)
      node.targetPosition = Position.Top;
      node.sourcePosition = Position.Bottom;
    }

    // We are shifting the dagre node position (anchor=center center) to the top left
    // so it matches the React Flow node anchor point (top left).
    node.position = {
      x: nodeWithPosition.x - dims.width / 2,
      y: nodeWithPosition.y - dims.height / 2,
    };

    return node;
  });

  return { nodes: layoutedNodes, edges };
};
