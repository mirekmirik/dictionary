import { Box } from '@mui/material'
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import RestoreIcon from '@mui/icons-material/Restore';
import FavoriteIcon from '@mui/icons-material/Favorite';
import SmartToyIcon from '@mui/icons-material/SmartToy';
import SearchIcon from '@mui/icons-material/Search';
import { Paper } from '@mui/material';
import useAuth from '../../hooks/use-auth';
import { NavLink, useLocation } from 'react-router-dom';
import { ROUTES } from '../../utils/routes';


export default function Footer() {
    const { user } = useAuth()
    const { pathname } = useLocation()

    const classNameActiveNavLink = ({ isActive, isPending }: { isActive: boolean, isPending: boolean }) => {
        return (isActive && pathname !== ROUTES.LOGIN) ? 'active' : isPending ? 'pending' : ''
    }

    return (
        <Box sx={{ width: 500 }}>
            <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }} elevation={3}>
                <BottomNavigation
                    sx={{ display: "flex", justifyContent: "space-evenly" }}
                >
                    <NavLink to={!user ? ROUTES.LOGIN : ROUTES.RECENTS} className={classNameActiveNavLink}>
                        <BottomNavigationAction label="Archived" icon={<RestoreIcon />} />
                    </NavLink>
                    <NavLink to={ROUTES.HOME} className={classNameActiveNavLink}>
                        <BottomNavigationAction label="Favourites" icon={<SearchIcon />} />
                    </NavLink>
                    <NavLink to={!user ? ROUTES.LOGIN : ROUTES.AI} className={classNameActiveNavLink}>
                        <BottomNavigationAction label="AI" icon={<SmartToyIcon />} />
                    </NavLink>
                    <NavLink to={!user ? ROUTES.LOGIN : ROUTES.FAVOURITES} className={classNameActiveNavLink}>
                        <BottomNavigationAction label="Favourites" icon={<FavoriteIcon />} />
                    </NavLink>
                </BottomNavigation>
            </Paper>
        </Box >
    );
}
