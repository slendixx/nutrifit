import { screen, render } from '@testing-library/react';
import user from '@testing-library/user-event';
import Signup from '../../pages/signup';

describe('header', () => {
  beforeEach(() => {
    render(<Signup></Signup>);
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
    render(<Signup></Signup>);
  });
  it('renders input fields', () => {
    const emailInput = screen.getByRole('textbox', {
      name: /email/i,
    });
    expect(emailInput)
      .toBeRequired();
    expect(emailInput)
      .toBeInTheDocument();

    const firstNameInput = screen.getByRole('textbox', {
      name: /first name/i,
    });
    expect(firstNameInput)
      .toBeRequired();
    expect(firstNameInput)
      .toBeInTheDocument();

    const lastNameInput = screen.getByRole('textbox', {
      name: /last name/i,
    });
    expect(lastNameInput)
      .toBeRequired();
    expect(lastNameInput)
      .toBeInTheDocument();

    const passwordInput = screen.getByLabelText(/^password/i);
    expect(passwordInput)
      .toBeRequired();
    expect(passwordInput)
      .toBeInTheDocument();

    const confirmPasswordInput = screen.getByLabelText(/confirm password/i);
    expect(confirmPasswordInput)
      .toBeRequired();
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
    render(<Signup></Signup>);

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

    //fill fields with valid input
    await user.type(emailInput, 'brendajacobs@test.com');
    await user.type(firstNameInput, 'brenda');
    await user.type(lastNameInput, 'jacobs');
    await user.type(passwordInput, 'brenda123');
    await user.type(confirmPasswordInput, 'brenda123');
  });
  it('validates email field', async () => {

    const emailInput = screen.getByRole('textbox', {
      name: /email/i,
    });
    const submitButton = screen.getByRole('button', {
      name: /sign up/i,
    });
    let feedback = screen.queryByText(/email must be less than 100 characters long/i);

    await clearField(emailInput);

    const invalidEmail = 'this-email-is-way-too-long-this-email-is-way-too-long-this-email-is-way-too-long-this-email-is-way-too-long-@test.com';
    await user.type(emailInput, invalidEmail);
    expect(feedback)
      .not
      .toBeInTheDocument();
    expect(emailInput)
      .not
      .toBeInvalid();
    await user.click(submitButton);
    feedback = await screen.findByText(/email must be less than 100 characters long/i);
    expect(feedback)
      .toBeInTheDocument();
    expect(emailInput)
      .toBeInvalid();

    await clearField(emailInput);

    await user.type(emailInput, 'valid-email@test.com');
    await user.click(submitButton);
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
    let feedback = screen.queryByText(/first name must be less than 30 characters long/i);

    await clearField(firstNameInput);

    const invalidFirstName = 'this-first-name-is-way-too-long';
    await user.type(firstNameInput, invalidFirstName);
    expect(feedback)
      .not
      .toBeInTheDocument();
    expect(firstNameInput)
      .not
      .toBeInvalid();
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
    let feedback = screen.queryByText(/last name must be less than 30 characters long/i);

    await clearField(lastNameInput);

    const invalidFirstName = '-this-last-name-is-way-too-long-';
    await user.type(lastNameInput, invalidFirstName);
    expect(feedback)
      .not
      .toBeInTheDocument();
    expect(lastNameInput)
      .not
      .toBeInvalid();
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
    let feedback = screen.queryByText(/password must be at least 8 characters long/i);

    await clearField(passwordInput);

    const invalidPassword = 'brenda';
    await user.type(passwordInput, invalidPassword);
    expect(feedback)
      .not
      .toBeInTheDocument();
    expect(passwordInput)
      .not
      .toBeInvalid();
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
    let feedback = screen.queryByText(/Passwords don't match/i);

    await clearField(confirmPasswordInput);

    const invalidConfirmPassword = 'non-matching-value'; //password is brenda123
    await user.type(confirmPasswordInput, invalidConfirmPassword);
    expect(feedback)
      .not
      .toBeInTheDocument();
    expect(confirmPasswordInput)
      .not
      .toBeInvalid();
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
describe('on form submit', () => {
  beforeEach(() => {
    render(<Signup></Signup>);
  });
  it('redirects to \'my plans\' page', async () => {

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
    const submitButton = screen.getByRole('button', {
      name: /sign up/i,
    });
    //fill fields with valid input
    await user.type(emailInput, 'brendajacobs@test.com');
    await user.type(firstNameInput, 'brenda');
    await user.type(lastNameInput, 'jacobs');
    await user.type(passwordInput, 'brenda123');
    await user.type(confirmPasswordInput, 'brenda123');

    await user.click(submitButton);

    const heading = await screen.findByRole('heading', {
      name: /my plans/i
    });
    expect(heading)
      .toBeInTheDocument();
  });
});

async function clearField(field: HTMLElement) {
  await user.clear(field);
}
