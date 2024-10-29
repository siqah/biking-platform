import Dashboard from "./components/Dashboard";
import RoutesList from "./components/RoutesList";
import AppRoutes from "./Routes";

function App() {
  return (
    <AppRoutes>
      
      <Dashboard />
      <RoutesList />
    </AppRoutes>
  );
}

export default App;
