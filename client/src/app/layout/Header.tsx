import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { Box, List, ListItem, Switch } from '@mui/material';
import { NavLink } from 'react-router-dom';


const rightLinks = [
    {title: 'login', path: '/login'},
    {title: 'register', path: '/register'},
]

const midLinks = [
    {title: 'inventory', path: ''},
    {title: 'catalog', path: 'catalog'},
    {title: 'about', path: 'about'},
    {title: 'contact', path: 'contact'},
]

const navStyles = {
    color: 'inherit',
    textDecoration: 'none',
    typography: 'h6',
    '&:hover': {
        color: 'grey.500'
    },
    '&.active': {
        color: 'text.secondary'
    }
}

const navStyles1 = {
  color: 'inherit',
  textDecoration: 'none',
  typography: 'h6'
}

interface Props{
    darkMode:boolean;
    handleThemeChange: () => void;
}

export default function Header({handleThemeChange, darkMode}: Props) {
  return (
      <AppBar position="static" sx={{mb: 4}}>
        <Toolbar sx={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
        
        <Box display='flex' alignItems='center'>
          <Typography variant="h6" component={NavLink}
          to='/'
          sx={navStyles1}>
            RE-STORE
          </Typography>
          <Switch checked={darkMode} onChange={handleThemeChange} />
        </Box>

          <List sx={{display: 'flex'}}>
            {midLinks.map(({title, path}) => (
                <ListItem
                    component={NavLink}
                    to={path}
                    key={path}
                    sx={navStyles}
                >
                    {title.toUpperCase()}
                </ListItem>
                
            ))}
          </List>

          <List sx={{display: 'flex'}}>
            {rightLinks.map(({title, path}) => (
                <ListItem
                    component={NavLink}
                    to={path}
                    key={path}
                    sx={navStyles}
                >
                    {title.toUpperCase()}
                </ListItem>
                
            ))}
          </List>

        </Toolbar>
      </AppBar>
  );
}