function initialize(graph, source) {
  let distance = {};
  let predecessor = {};
  for (let node in graph) {
    distance[node] = Infinity;
    predecessor[node] = null;
  }
  distance[source] = 0;
  return { distance, predecessor };
}

function relax(node, neighbor, graph, distance, predecessor) {
  if (distance[neighbor] > distance[node] + graph[node][neighbor]) {
    distance[neighbor] = distance[node] + graph[node][neighbor];
    predecessor[neighbor] = node;
  }
}

function bellmanFord(graph, source) {
  let { distance, predecessor } = initialize(graph, source);
  let nodes = Object.keys(graph);

  for (let i = 0; i < nodes.length - 1; i++) {
    for (let node of nodes) {
      for (let neighbor in graph[node]) {
        relax(node, neighbor, graph, distance, predecessor);
      }
    }
  }

  for (let node of nodes) {
    for (let neighbor in graph[node]) {
      if (distance[neighbor] > distance[node] + graph[node][neighbor]) {
        throw new Error("Graph contains a negative weight cycle");
      }
    }
  }
  return { distance, predecessor };
}

// Example graph representing a smart grid
let graph = {
  Source1: { Substation1: 5, Substation2: 3 },
  Source2: { Substation2: 2 },
  Substation1: { Consumer1: 2, Consumer2: 3 },
  Substation2: { Consumer2: 1, Consumer3: 4 },
  Consumer1: {},
  Consumer2: {},
  Consumer3: {},
};

// Running the adapted Bellman-Ford algorithm
let source = "Source1";
let result = bellmanFord(graph, source);
console.log("Distance from Source:", result.distance);
console.log("Predecessors:", result.predecessor);
