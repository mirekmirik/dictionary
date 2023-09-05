import { Routes, Route } from 'react-router-dom'
import { ROUTES } from '../utils/routes'
import Auth from '../components/Header/Auth/Auth'
import useAuth from '../hooks/use-auth'
import Search from '../components/Search/Search'
import Dictionary from '../components/Dictionary/Dictionary'
import Marked from '../components/Marked/Marked'
import Recents from '../components/Recents/Recents'
import AI from '../components/AI/AI'
import PageNotFound from '../components/PageNotFound/PageNotFound'


const AppRoutes = () => {
    const { user } = useAuth()

    return (
        <Routes>
            <Route path={ROUTES.HOME} element={<><Search /><Dictionary /></>} />
            {!user && <Route path={ROUTES.AUTH} element={<Auth />} />}
            {user && <Route path={ROUTES.FAVOURITES} element={<Marked />} />}
            {user && <Route path={ROUTES.RECENTS} element={<Recents />} />}
            {user && <Route path={ROUTES.AI} element={<AI />} />}
            <Route path="*" element={<PageNotFound />} />
        </Routes>
    )
}

export default AppRoutes