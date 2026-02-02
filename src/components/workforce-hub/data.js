export const initialData = {
  nodes: [
    { "id": "cert-1", "type": "certificate", "data": { "label": "Cloud Architecture Certificate", "skills": "AWS, Azure, Microservices" }, "position": { "x": 0, "y": 0 } },
    { "id": "cert-2", "type": "certificate", "data": { "label": "AI for Business Certificate", "skills": "Machine Learning, Data Strategy, Python" }, "position": { "x": 0, "y": 100 } },
    { "id": "cert-3", "type": "certificate", "data": { "label": "Financial Tech Certificate", "skills": "Blockchain, Algorithmic Trading, Risk Mgmt" }, "position": { "x": 0, "y": 200 } },
    { "id": "cert-4", "type": "certificate", "data": { "label": "Strategic Leadership Certificate", "skills": "Org Behavior, Decision Making, Ethics" }, "position": { "x": 0, "y": 300 } },
    { "id": "ms-cs", "type": "masters", "data": { "label": "MS in Computer Science", "description": "Master advanced computing concepts." }, "position": { "x": 400, "y": 50 } },
    { "id": "mba", "type": "masters", "data": { "label": "Online MBA", "description": "Lead in the digital economy." }, "position": { "x": 400, "y": 150 } },
    { "id": "me-em", "type": "masters", "data": { "label": "ME in Engineering Management", "description": "Bridge the gap between engineering and business." }, "position": { "x": 400, "y": 250 } }
  ],
  edges: [
    { "id": "e1-1", "source": "cert-1", "target": "ms-cs", "animated": true },
    { "id": "e2-1", "source": "cert-2", "target": "ms-cs", "animated": true },
    { "id": "e2-2", "source": "cert-2", "target": "mba", "animated": true },
    { "id": "e3-1", "source": "cert-3", "target": "mba", "animated": true },
    { "id": "e4-1", "source": "cert-4", "target": "mba", "animated": true },
    { "id": "e4-2", "source": "cert-4", "target": "me-em", "animated": true }
  ]
};
