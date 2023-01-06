import Image from 'next/image';
import Link from 'next/link';
import MenuIcon from '@mui/icons-material/Menu';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Box from '@mui/material/Box';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import Stack from '@mui/material/Stack';
import Container from '@mui/material/Container';

const LOGO_WIDTH = 178;
const LOGO_HEIGHT = 99;

export default function Signup() {
  const theme = useTheme();
  const smallScreen = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <>
      <AppBar position="static">
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            {
              smallScreen ? (
                <>
                  <IconButton>
                    <MenuIcon
                      sx={{ color: 'primary.contrastText' }}
                    />
                  </IconButton>
                  <Box
                    flexGrow={1}
                    display={'flex'}
                    justifyContent={'center'}
                    py={0.5}
                  >
                    <Link
                      href={'/'}
                      style={{ transform: 'translateX(-25%)' }}
                    >
                      <Image
                        src="/images/nutrifit-logo-no-bg.png"
                        width={LOGO_WIDTH * 0.5}
                        height={LOGO_HEIGHT * 0.5}
                        alt="nutrifit logo"
                      ></Image>
                    </Link>
                  </Box>
                </>

              ) : (<>
                  <Box
                    py={0.5}
                  >
                    <Link
                      href={'/'}

                    >
                      <Image
                        src="/images/nutrifit-logo-sm-no-bg.png"
                        width={LOGO_WIDTH * 0.5}
                        height={LOGO_HEIGHT * 0.5}
                        alt="nutrifit logo"
                      ></Image>
                    </Link>
                  </Box>

                  <Box
                    ml={1}
                    flexGrow={1}
                  >
                    <Button
                      href="/signup"
                      sx={{ color: 'primary.contrastText' }}
                    >
                      Sign up
                    </Button>
                  </Box>
                </>
              )
            }
          </Toolbar>
        </Container>
      </AppBar>

      <Typography variant="h3" textAlign={'center'} fontWeight="bold" mt={2}>Sign up</Typography>
      <form>
        <Box display="flex" flexDirection="column" alignItems="center" mt={2}>
          <TextField sx={{ mt: 2 }} variant="standard" required id="email" label="Email"/>
          <TextField sx={{ mt: 2 }} variant="standard" required id="firstName" label="First Name"/>
          <TextField sx={{ mt: 2 }} variant="standard" required id="lastName" label="Last Name"/>
          <TextField sx={{ mt: 2 }} variant="standard"
                     required
                     id="password"
                     label="Password"
                     type="password"
          />
          <TextField sx={{ mt: 2 }}
                     required
                     id="confirmPassword"
                     label="Confirm Password"
                     type="password" variant="standard"
          />
          <Button sx={{ mt: 4 }} variant="outlined" type="submit">
            Sign Up
          </Button>
        </Box>
      </form>
    </>
  );
}
