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
import CircularProgress from '@mui/material/CircularProgress';
import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import { useRouter } from 'next/router';
import axios from 'axios';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

const LOGO_WIDTH = 178;
const LOGO_HEIGHT = 99;

type Inputs = {
  email: string,
  firstName: string,
  lastName: string,
  password: string,
  confirmPassword: string
}
export default function Signup() {
  const theme = useTheme();
  const smallDevice = useMediaQuery(theme.breakpoints.down('sm'));
  const router = useRouter();
  const [navMenuAnchor, setNavMenuAnchor] = useState<null | HTMLElement>(null);
  const [showFeedback, setShowFeedback] = useState<boolean>(false);

  const {
    handleSubmit,
    control,
    watch,
    formState
  } = useForm<Inputs>(
//must provide default values otherwise a warning will be thrown
    //source: https://github.com/react-hook-form/documentation/issues/132
    {
      defaultValues: {
        email: '',
        firstName: '',
        lastName: '',
        password: '',
        confirmPassword: ''
      }
    }
  );

  const onSubmit: SubmitHandler<Inputs> = async (input) => {
    try {
      await axios.post(process.env.NEXT_PUBLIC_API_HOST + '/api/signup', {
        email: input.email,
        firstName: input.firstName,
        lastName: input.lastName,
        password: input.password,
      });

      await router.push('/plans');
    } catch (error) {
      setShowFeedback(true);
    }
  };

  function handleOpenNavMenu(event: React.MouseEvent<HTMLElement>) {
    setNavMenuAnchor(event.currentTarget);
  }

  const handleCloseFeedback = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }

    setShowFeedback(false);
  };

  return (
    <>
      <AppBar position="static">
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            {
              smallDevice ? (
                <>
                  <IconButton
                    onClick={handleOpenNavMenu}
                  >
                    <MenuIcon
                      sx={{ color: 'primary.contrastText' }}
                    />
                  </IconButton>
                  <Menu
                    id="navMenu"
                    anchorEl={navMenuAnchor}
                    anchorOrigin={{
                      vertical: 'bottom',
                      horizontal: 'left',
                    }}
                    keepMounted
                    transformOrigin={{
                      vertical: 'top',
                      horizontal: 'left'
                    }}
                    open={!!navMenuAnchor}
                    onClose={() => setNavMenuAnchor(null)}
                  >
                    <MenuItem>
                      <Button
                        href="/signup"
                        sx={{ color: 'text.primary' }}
                      >
                        Sign up
                      </Button>
                    </MenuItem>
                  </Menu>
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
                      />
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
      <Typography variant="h3" textAlign={'center'} fontWeight="bold" mt={2}>
        Sign up
      </Typography>
      {
        formState.isSubmitting &&
        <CircularProgress/>
      }
      <Container
        maxWidth="xs">
        <form onSubmit={handleSubmit(onSubmit)}>
          <Stack>
            <Controller
              name="email"
              control={control}
              rules={{
                required: 'Email is required',
                maxLength: {
                  value: 100,
                  message: 'Email must be less than 100 characters long'
                },
                //use a Regex to validate user typed a valid email
                validate: value => new RegExp(/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/g).test(value) || 'Must be a valid email'
              }} render={
              ({
                field: {
                  onChange,
                  value
                },
                fieldState: { error }
              }) =>
                <TextField sx={{ mt: 2 }} variant="standard" id="email" label="Email"
                           fullWidth
                           value={value}
                           error={!!error}
                           onChange={onChange}
                           helperText={error ? error.message : null}
                />
            }/>
            <Controller
              control={control}
              name="firstName"
              rules={
                {
                  required: 'First name is required',
                  maxLength: {
                    value: 30,
                    message: 'First name must be less than 30 characters long'
                  }
                }
              }
              render={(
                {
                  field: {
                    onChange,
                    value
                  },
                  fieldState: { error }

                }
              ) =>
                <TextField sx={{ mt: 2 }} variant="standard" id="firstName"
                           label="First Name" fullWidth
                           value={value}
                           onChange={onChange}
                           error={!!error}
                           helperText={error ? error.message : null}/>

              }
            />

            <Controller
              control={control}
              name={'lastName'}
              rules={{
                required: 'Last name is required',
                maxLength: {
                  value: 30,
                  message: 'Last name must be less than 30 characters long'
                }
              }}
              render={(
                {
                  field: {
                    onChange,
                    value
                  },
                  fieldState: { error }
                }
              ) =>
                <TextField sx={{ mt: 2 }} variant="standard" id="lastName"
                           label="Last Name"
                           fullWidth
                           value={value}
                           onChange={onChange}
                           error={!!error}
                           helperText={error ? error.message : null}/>

              }
            />
            <Controller
              control={control}
              name={'password'}
              rules={{
                required: 'Password is required',
                minLength: {
                  value: 8,
                  message: 'Password must be at least 8 characters long'
                }
              }}
              render={(
                {
                  field: {
                    onChange,
                    value
                  },
                  fieldState: { error }
                }
              ) =>
                <TextField sx={{ mt: 2 }} variant="standard"
                           id="password"
                           label="Password"
                           type="password"
                           fullWidth
                           value={value}
                           onChange={onChange}
                           error={!!error}
                           helperText={error ? error.message : null}

                />
              }
            />

            <Controller
              control={control}
              name={'confirmPassword'}
              rules={{
                validate: value => value === watch('password') || 'Passwords don\'t match'
              }}
              render={(
                {
                  field: {
                    onChange,
                    value
                  },
                  fieldState: { error }
                }
              ) =>
                <TextField sx={{ mt: 2 }}
                           id="confirmPassword"
                           label="Confirm Password"
                           type="password" variant="standard"
                           fullWidth
                           value={value}
                           onChange={onChange}
                           error={!!error}

                           helperText={error ? error.message : null}

                />

              }
            />
            <Box display="flex" justifyContent={smallDevice ? 'center' : 'end'}>
              <Button sx={{ mt: 4 }} variant="outlined" type="submit">
                Sign Up
              </Button>
            </Box>
          </Stack>
        </form>
      </Container>
      <Snackbar open={showFeedback} autoHideDuration={6000} onClose={handleCloseFeedback}>
        <Alert onClose={handleCloseFeedback} severity={'error'} sx={{ width: '100%' }}
               variant="outlined">
          An error occurred during your request
        </Alert>
      </Snackbar>
    </>
  );
}
