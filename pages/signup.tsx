import React, { useState } from 'react';
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
  const [invalidEmail, setInvalidEmail] = useState<boolean>(false);
  const [email, setEmail] = useState<string>('');
  const [invalidFirstName, setInvalidFirstName] = useState<boolean>(false);
  const [firstName, setFirstName] = useState<string>('');
  const [invalidLastName, setInvalidLastName] = useState<boolean>(false);
  const [lastName, setLastName] = useState<string>('');
  const [invalidPassword, setInvalidPassword] = useState<boolean>(false);
  const [password, setPassword] = useState<string>('');
  const [invalidConfirmPassword, setInvalidConfirmPassword] = useState<boolean>(false);
  const [confirmPassword, setConfirmPassword] = useState<string>('');

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setInvalidEmail(false);
    setInvalidFirstName(false);
    setInvalidLastName(false);
    setInvalidPassword(false);
    setInvalidConfirmPassword(false);

    if (email.length > 100) {
      setInvalidEmail(true);
      return;
    }
    if (firstName.length > 30) {
      setInvalidFirstName(true);
      return;
    }
    if (lastName.length > 30) {
      setInvalidLastName(true);
      return;
    }
    if (password.length < 8) {
      setInvalidPassword(true);
      return;
    }
    if (password !== confirmPassword) {
      setInvalidConfirmPassword(true);
      return;
    }
    //send form input
    // try {
    //
    //   const response = await fetch('/api/signup', {
    //     method: 'POST',
    //     headers: {
    //       'Content-Type': 'application/json'
    //     },
    //     body: JSON.stringify({
    //         email,
    //         firstName,
    //         lastName,
    //         password,
    //         confirmPassword
    //       }
    //     )
    //   });
    //   if (!response.ok) {
    //     throw new Error(response.statusText);
    //   }
    // } catch (error) {
    //
    // }

  }

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
      <Container
        maxWidth="xs">
        <form onSubmit={handleSubmit}>
          <Stack>

            <TextField sx={{ mt: 2 }} variant="standard" required id="email" label="Email"
                       fullWidth
                       type="email"
                       value={email}
                       onChange={(event) => {
                         setEmail(event.target.value);
                       }}
                       error={invalidEmail}
                       helperText={invalidEmail ? 'Email must be less than 100 characters long' : ''}/>
            <TextField sx={{ mt: 2 }} variant="standard" required id="firstName"
                       label="First Name" fullWidth
                       value={firstName}
                       onChange={(event) => {
                         setFirstName(event.target.value);
                       }}
                       error={invalidFirstName}
                       helperText={invalidFirstName ? 'First name must be less than 30 characters long' : ''}/>
            <TextField sx={{ mt: 2 }} variant="standard" required id="lastName" label="Last Name"
                       fullWidth
                       value={lastName}
                       onChange={(event) => {
                         setLastName(event.target.value);
                       }}
                       error={invalidLastName}
                       helperText={invalidLastName ? 'Last name must be less than 30 characters long' : ''}/>
            <TextField sx={{ mt: 2 }} variant="standard"
                       required
                       id="password"
                       label="Password"
                       type="password"
                       fullWidth
                       value={password}
                       onChange={(event) => {
                         setPassword(event.target.value);
                       }}
                       error={invalidPassword}
                       helperText={invalidPassword ? 'Password must be at least 8 characters long' : ''}
            />
            <TextField sx={{ mt: 2 }}
                       required
                       id="confirmPassword"
                       label="Confirm Password"
                       type="password" variant="standard"
                       fullWidth
                       value={confirmPassword}
                       onChange={(event) => {
                         setConfirmPassword(event.target.value);
                       }}
                       error={invalidConfirmPassword}
                       helperText={invalidConfirmPassword ? 'Passwords don\'t match' : ''}
            />
            <Box display="flex" justifyContent={smallScreen ? 'center' : 'end'}>
              <Button sx={{ mt: 4 }} variant="outlined" type="submit">
                Sign Up
              </Button>
            </Box>
          </Stack>
        </form>
      </Container>
    </>
  );
}
