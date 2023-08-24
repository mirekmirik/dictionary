import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Wrapper from './UI/Wrapper';
import Header from './components/Header/Header';
import { useTheme } from './hooks/use-theme';
import Search from './components/Search/Search';
import Dictionary from './components/Dictionary/Dictionary';

function App() {
  const { Creator } = useTheme()
  return (
    <ThemeProvider theme={Creator}>
      <CssBaseline />
      <Wrapper>
        <Header />
        <Search />
        <Dictionary />
      </Wrapper>
    </ThemeProvider>
  );
}

export default App;
