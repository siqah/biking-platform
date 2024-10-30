const routes = [
  { name: 'Trail A', distance: '15 km', difficulty: 'Medium' },
  { name: 'Trail B', distance: '10 km', difficulty: 'Easy' },
  { name: 'Trail C', distance: '20 km', difficulty: 'Hard' },
];

function RoutesList() {
  return (
    <div className="max-w-md mx-auto p-4">
      <ul className="space-y-4">
        {routes.map((route, index) => (
          <li
            key={index}
            className="p-4 bg-white rounded-lg shadow-md border border-gray-200"
          >
            <div className="text-lg font-semibold">{route.name}</div>
            <div className="text-sm text-gray-600">
              Distance: {route.distance}, Difficulty: {route.difficulty}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default RoutesList;
