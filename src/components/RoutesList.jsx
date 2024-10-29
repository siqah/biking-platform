import { Container, List, ListItem, ListItemText } from '@mui/material';

const routes = [
  { name: 'Trail A', distance: '15 km', difficulty: 'Medium' },
  { name: 'Trail B', distance: '10 km', difficulty: 'Easy' },
  { name: 'Trail C', distance: '20 km', difficulty: 'Hard' },
];

function RoutesList() {
  return (
    <Container>
      <List>
        {routes.map((route, index) => (
          <ListItem key={index}>
            <ListItemText
              primary={route.name}
              secondary={`Distance: ${route.distance}, Difficulty: ${route.difficulty}`}
            />
          </ListItem>
        ))}
      </List>
    </Container>
  );
}

export default RoutesList;
