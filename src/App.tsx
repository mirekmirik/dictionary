import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Wrapper from './UI/Wrapper';
import Header from './components/Header/Header';
import { useTheme } from './hooks/use-theme';

function App() {
  const [, , Creator] = useTheme()
  return (
    <ThemeProvider theme={Creator}>
      <CssBaseline />
      <Wrapper>
        <Header />
      </Wrapper>
    </ThemeProvider>
  );
}

export default App;
