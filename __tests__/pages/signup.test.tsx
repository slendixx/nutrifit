import {screen, render, waitFor} from '@testing-library/react';
import {NextRouter} from 'next/router';
import {RouterContext} from 'next/dist/shared/lib/router-context';
import user from '@testing-library/user-event';
import Signup from '../../pages/signup';

import {server} from '../__mocks__/msw/server';
import {rest} from 'msw';


function setupComponent() {
  const mockRouter = createMockRouter({});
  render(
    <RouterContext.Provider value={mockRouter}>
      <Signup/>
    </RouterContext.Provider>
  );
}

async function fillForm() {
  const emailInput = screen.getByRole('textbox', {
    name: /email/i,
  });
  const firstNameInput = screen.getByRole('textbox', {
    name: /first name/i,
  });
  const lastNameInput = screen.getByRole('textbox', {
    name: /last name/i,
  });
  const passwordInput = screen.getByLabelText(/^password/i);
  const confirmPasswordInput = screen.getByLabelText(/confirm password/i);

  await user.type(emailInput, 'brendajacobs@test.com');
  await user.type(firstNameInput, 'brenda');
  await user.type(lastNameInput, 'jacobs');
  await user.type(passwordInput, 'brenda123');
  await user.type(confirmPasswordInput, 'brenda123');
}

describe('header', () => {

  beforeEach(() => {
    setupComponent();
  });
  it('renders nav', () => {
    const signUpLink = screen.getByRole('link', {
      name: /sign up/i,
    });
    expect(signUpLink)
      .toBeInTheDocument();
    expect(signUpLink.getAttribute('href'))
      .toBe('/signup');
  });
  it('renders heading', () => {
    const heading = screen.getByRole('heading', {
      name: /sign up/i,
    });
    expect(heading)
      .toBeInTheDocument();
  });
  it('Renders site logo as link to \'/\'', () => {
    const logoLink = screen.getByRole('link', {
      name: /nutrifit logo/i,
    });
    expect(logoLink.getAttribute('href'))
      .toBe('/');
    expect(logoLink)
      .toBeInTheDocument();
  });
});
describe('sign up form', () => {
  beforeEach(() => {
    setupComponent();
  });
  it('renders input fields', () => {
    const emailInput = screen.getByRole('textbox', {
      name: /email/i,
    });
    expect(emailInput)
      .toBeInTheDocument();

    const firstNameInput = screen.getByRole('textbox', {
      name: /first name/i,
    });
    expect(firstNameInput)
      .toBeInTheDocument();

    const lastNameInput = screen.getByRole('textbox', {
      name: /last name/i,
    });
    expect(lastNameInput)
      .toBeInTheDocument();

    const passwordInput = screen.getByLabelText(/^password/i);
    expect(passwordInput)
      .toBeInTheDocument();

    const confirmPasswordInput = screen.getByLabelText(/confirm password/i);
    expect(confirmPasswordInput)
      .toBeInTheDocument();

    const submitButton = screen.getByRole('button', {
      name: /sign up/i,
    });
    expect(submitButton.getAttribute('type'))
      .toBe('submit');
    expect(submitButton)
      .toBeInTheDocument();
  });

});

describe('Form Validation', () => {
  beforeEach(async () => {
    setupComponent();
    await fillForm();
  });
  it('validates email field', async () => {

    const emailInput = screen.getByRole('textbox', {
      name: /email/i,
    });
    const submitButton = screen.getByRole('button', {
      name: /sign up/i,
    });
    let feedback;

    await clearField(emailInput);

    //validate non-empty field
    await user.click(submitButton);
    feedback = await screen.findByText(/email is required/i);
    expect(feedback)
      .toBeInTheDocument();
    expect(emailInput)
      .toBeInvalid();

    //validate field isn't longer than max length
    const invalidEmail = 'this-email-is-way-too-long-this-email-is-way-too-long-this-email-is-way-too-long-this-email-is-way-too-long-@test.com';
    await user.type(emailInput, invalidEmail);
    await user.click(submitButton);
    feedback = await screen.findByText(/email must be less than 100 characters long/i);
    expect(feedback)
      .toBeInTheDocument();
    expect(emailInput)
      .toBeInvalid();

    await clearField(emailInput);

    await user.type(emailInput, 'non-an-email');
    await user.click(submitButton);
    feedback = await screen.findByText(/must be a valid email/i);
    expect(feedback)
      .toBeInTheDocument();
    expect(emailInput)
      .toBeInvalid();

    await user.type(emailInput, 'valid-email@test.com');
    await user.click(submitButton);
    //expect field not to be invalid only after passing all validations
    expect(emailInput)
      .not
      .toBeInvalid();
    expect(feedback)
      .not
      .toBeInTheDocument();
  });
  it('validates first name field', async () => {
    const firstNameInput = screen.getByRole('textbox', {
      name: /first name/i,
    });
    const submitButton = screen.getByRole('button', {
      name: /sign up/i,
    });
    let feedback;

    await clearField(firstNameInput);

    //validate non-empty field
    await user.click(submitButton);
    feedback = await screen.findByText(/first name is required/i);
    expect(feedback)
      .toBeInTheDocument();
    expect(firstNameInput)
      .toBeInvalid();

    //validate field isn't longer than max length
    const invalidFirstName = 'this-first-name-is-way-too-long';
    await user.type(firstNameInput, invalidFirstName);
    await user.click(submitButton);
    feedback = await screen.findByText(/first name must be less than 30 characters long/i);
    expect(feedback)
      .toBeInTheDocument();
    expect(firstNameInput)
      .toBeInvalid();

    await clearField(firstNameInput);

    await user.type(firstNameInput, 'brenda');
    await user.click(submitButton);
    expect(feedback)
      .not
      .toBeInTheDocument();
    expect(firstNameInput)
      .not
      .toBeInvalid();
  });
  it('validates last name field', async () => {
    const lastNameInput = screen.getByRole('textbox', {
      name: /last name/i,
    });
    const submitButton = screen.getByRole('button', {
      name: /sign up/i,
    });
    let feedback;

    await clearField(lastNameInput);

    //validate non-empty field
    await user.click(submitButton);
    feedback = await screen.findByText(/last name is required/i);
    expect(feedback)
      .toBeInTheDocument();
    expect(lastNameInput)
      .toBeInvalid();

    //validate field isn't longer than max length
    const invalidLastName = '-this-last-name-is-way-too-long-';
    await user.type(lastNameInput, invalidLastName);
    await user.click(submitButton);
    feedback = await screen.findByText(/last name must be less than 30 characters long/i);
    expect(feedback)
      .toBeInTheDocument();
    expect(lastNameInput)
      .toBeInvalid();

    await clearField(lastNameInput);

    await user.type(lastNameInput, 'jacobs');
    await user.click(submitButton);
    expect(feedback)
      .not
      .toBeInTheDocument();
    expect(lastNameInput)
      .not
      .toBeInvalid();
  });
  it('validates password field', async () => {
    const passwordInput = screen.getByLabelText(/^password/i);
    const submitButton = screen.getByRole('button', {
      name: /sign up/i,
    });
    let feedback;

    await clearField(passwordInput);

    //validate non-empty field
    await user.click(submitButton);
    feedback = await screen.findByText(/password is required/i);
    expect(feedback)
      .toBeInTheDocument();
    expect(passwordInput)
      .toBeInvalid();

    //validate password is at least 8 characters long
    const invalidPassword = 'brenda';
    await user.type(passwordInput, invalidPassword);
    await user.click(submitButton);
    feedback = await screen.findByText(/password must be at least 8 characters long/i);
    expect(feedback)
      .toBeInTheDocument();
    expect(passwordInput)
      .toBeInvalid();

    await clearField(passwordInput);

    await user.type(passwordInput, 'brenda123');
    await user.click(submitButton);
    expect(feedback)
      .not
      .toBeInTheDocument();
    expect(passwordInput)
      .not
      .toBeInvalid();
  });
  it('validates confirm password field', async () => {
    const confirmPasswordInput = screen.getByLabelText(/confirm password/i);
    const submitButton = screen.getByRole('button', {
      name: /sign up/i,
    });
    let feedback;

    await clearField(confirmPasswordInput);

    const invalidConfirmPassword = 'non-matching-value'; //password is brenda123
    await user.type(confirmPasswordInput, invalidConfirmPassword);
    await user.click(submitButton);
    feedback = await screen.findByText(/Passwords don't match/i);
    expect(feedback)
      .toBeInTheDocument();
    expect(confirmPasswordInput)
      .toBeInvalid();

    await clearField(confirmPasswordInput);

    await user.type(confirmPasswordInput, 'brenda123');
    await user.click(submitButton);

    expect(feedback)
      .not
      .toBeInTheDocument();
    expect(confirmPasswordInput)
      .not
      .toBeInvalid();
  });
});
it('on form submit shows progress bar', async () => {

  setupComponent();

  const submitButton = screen.getByRole('button', {
    name: /sign up/i,
  });
  let spinner = screen.queryByRole('progressbar');
  expect(spinner)
    .not
    .toBeInTheDocument();
  await fillForm();
  await user.click(submitButton);
  spinner = await screen.findByRole('progressbar');
  expect(spinner)
    .toBeInTheDocument();

  await waitFor(() => {
    expect(spinner)
      .not
      .toBeInTheDocument();
  });

});

it('shows an alert with a message if an error occurs during form submit ', async () => {

  setupComponent();

  //mock an API response with any error HTTP  status code
  server.use(rest.post(
    process.env.NEXT_PUBLIC_API_HOST + '/api/signup',
    (req, res, context) => {
      return res.once(context.status(500), context.json({message: "something happened"}));
    }));

  //fill & submit form
  await fillForm();
  const submitButton = screen.getByRole('button', {
    name: /sign up/i,
  });
  await user.click(submitButton);

  const feedback = await screen.findByText(/something happened/i);
  expect(feedback)
    .toBeInTheDocument();
});

async function clearField(field: HTMLElement) {
  await user.clear(field);
}

function createMockRouter(router: Partial<NextRouter>): NextRouter {
  // @ts-ignore
  return {
    basePath: '',
    pathname: '/',
    route: '/',
    query: {},
    asPath: '/',
    back: jest.fn(),
    beforePopState: jest.fn(),
    prefetch: jest.fn(),
    push: jest.fn(),
    reload: jest.fn(),
    replace: jest.fn(),
    events: {
      on: jest.fn(),
      off: jest.fn(),
      emit: jest.fn(),
    },
    isFallback: false,
    isLocaleDomain: false,
    isReady: true,
    defaultLocale: 'en',
    domainLocales: [],
    isPreview: false,
    ...router,
  };
}
