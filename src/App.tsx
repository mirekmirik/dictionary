import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Wrapper from './UI/Wrapper';
import Header from './components/Header/Header';
import { useTheme } from './hooks/use-theme';
import AppRoutes from './routes/routes';
import Footer from './components/Footer/Footer';
import { useDictionary } from './hooks/use-dictionary';
import { useEffect } from 'react';
import useAuth from './hooks/use-auth';


function App() {
  const { Creator } = useTheme()
  const { user } = useAuth()
  const { getFavouritesWords, getRecentlyWords } = useDictionary()

  useEffect(() => {
    if(!user) return;
    getFavouritesWords()
    getRecentlyWords()
  }, [user])

  return (
    <ThemeProvider theme={Creator}>
      <CssBaseline />
      <Wrapper>
        <Header />
        <AppRoutes />
        <Footer />
      </Wrapper>
    </ThemeProvider>
  );
}

export default App;
