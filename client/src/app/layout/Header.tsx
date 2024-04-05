import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { Box, List, ListItem, Switch } from '@mui/material';
import { NavLink } from 'react-router-dom';
import { useAppSelector } from '../store/configureStore';
import SignedInMenu from './SignedInMenu';

const rightLinks = [
  { title: 'log in', path: '/login' },
  { title: 'register', path: '/register' },
];

const midLinks = [
  { title: 'home', path: '' },
  { title: 'inventory', path: 'inventory' },
  { title: 'catalog', path: 'catalog' },
];

const navStyles = {
  color: 'inherit',
  textDecoration: 'none',
  typography: 'h6',
  '&:hover': {
    color: 'grey.500',
  },
  '&.active': {
    color: 'text.secondary',
  },
};

const navStyles1 = {
  color: 'inherit',
  textDecoration: 'none',
  typography: 'h6',
};

interface Props {
  darkMode: boolean;
  handleThemeChange: () => void;
}

export default function Header({ handleThemeChange, darkMode }: Props) {
  const { user } = useAppSelector((state) => state.account);

  return (
    <AppBar position="static" sx={{ mb: 4 }}>
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Box display="flex" alignItems="center">
          <Typography variant="h6" component={NavLink} to="" sx={navStyles1}>
            VENTAR
          </Typography>
          <Switch checked={darkMode} onChange={handleThemeChange} />
        </Box>
        <List sx={{ display: 'flex' }}>
          {midLinks.map(({ title, path }) => {
            // Render "Inventory" and "Catalog" links only if the user is logged in
            if (user || (title !== 'inventory' && title !== 'catalog')) {
              return (
                <ListItem component={NavLink} to={path} key={path} sx={navStyles}>
                  {title.toUpperCase()}
                </ListItem>
              );
            }
            return null;
          })}
        </List>
        {user ? (
          <SignedInMenu />
        ) : (
          <List sx={{ display: 'flex' }}>
            {rightLinks.map(({ title, path }) => (
              <ListItem component={NavLink} to={path} key={path} sx={navStyles}>
                {title.toUpperCase()}
              </ListItem>
            ))}
          </List>
        )}
      </Toolbar>
    </AppBar>
  );
}
