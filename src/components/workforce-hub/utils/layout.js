import dagre from 'dagre';
import { Position } from 'reactflow';

const nodeWidth = 250;
const nodeHeight = 160; // Increased from 80 to account for full card height

export const getLayoutedElements = (nodes, edges, direction = 'BT') => {
  const dagreGraph = new dagre.graphlib.Graph();
  dagreGraph.setDefaultEdgeLabel(() => ({}));

  // nodesep: horizontal spacing between nodes in the same rank
  // ranksep: vertical spacing between ranks (rows)
  dagreGraph.setGraph({ rankdir: direction, nodesep: 50, ranksep: 150 });

  nodes.forEach((node) => {
    dagreGraph.setNode(node.id, { width: nodeWidth, height: nodeHeight });
  });

  edges.forEach((edge) => {
    dagreGraph.setEdge(edge.source, edge.target);
  });

  dagre.layout(dagreGraph);

  const layoutedNodes = nodes.map((node) => {
    const nodeWithPosition = dagreGraph.node(node.id);
    if (direction === 'LR') {
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
      x: nodeWithPosition.x - nodeWidth / 2,
      y: nodeWithPosition.y - nodeHeight / 2,
    };

    return node;
  });

  return { nodes: layoutedNodes, edges };
};
