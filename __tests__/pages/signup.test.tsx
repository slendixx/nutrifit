import { screen, render } from '@testing-library/react';
import Signup from '../../pages/signup';

describe('Rendering', () => {
  beforeEach(() => {
    render(<Signup></Signup>);
  });
  describe('header', () => {
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
});
