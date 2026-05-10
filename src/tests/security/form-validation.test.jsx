import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { MemoryRouter } from 'react-router'
import SignUpForm from '../../features/authentication/SignUpForm'
import LoginForm from '../../ui/LoginForm'

function renderSignUpForm(props = {}) {
  const defaultProps = {
    userSignUp: vi.fn(),
    isError: false,
    isPending: false,
    ...props,
  }
  const qc = new QueryClient()
  return {
    ...render(
      <QueryClientProvider client={qc}>
        <MemoryRouter>
          <SignUpForm {...defaultProps} />
        </MemoryRouter>
      </QueryClientProvider>
    ),
    userSignUp: defaultProps.userSignUp,
  }
}

function renderLoginForm(props = {}) {
  const defaultProps = {
    loginAPi: vi.fn(),
    isPending: false,
    ...props,
  }
  const qc = new QueryClient()
  return {
    ...render(
      <QueryClientProvider client={qc}>
        <MemoryRouter>
          <LoginForm {...defaultProps} />
        </MemoryRouter>
      </QueryClientProvider>
    ),
    loginAPi: defaultProps.loginAPi,
  }
}

describe('SignUpForm — input validation', () => {
  it('shows required error for first name when empty', async () => {
    const user = userEvent.setup()
    renderSignUpForm()

    await user.click(screen.getByText('Sign Up'))

    await waitFor(() =>
      expect(screen.getAllByText('This field is required').length).toBeGreaterThan(0)
    )
  })

  it('shows required error for email when empty', async () => {
    const user = userEvent.setup()
    renderSignUpForm()

    await user.click(screen.getByText('Sign Up'))

    await waitFor(() =>
      expect(screen.getAllByText('This field is required').length).toBeGreaterThan(0)
    )
  })

  it('shows email pattern error for invalid email', async () => {
    const user = userEvent.setup()
    renderSignUpForm()

    await user.type(screen.getByPlaceholderText(/Austin/i), 'Alice')
    await user.type(screen.getByPlaceholderText('Post'), 'Smith')
    await user.type(screen.getByPlaceholderText(/postmalone/i), 'notanemail')
    await user.click(screen.getByText('Sign Up'))

    await waitFor(() =>
      expect(screen.getByText(/valid email address/i)).toBeInTheDocument()
    )
  })

  it('accepts a valid email format', async () => {
    const user = userEvent.setup()
    const { userSignUp } = renderSignUpForm()

    await user.type(screen.getByPlaceholderText(/Austin/i), 'Alice')
    await user.type(screen.getByPlaceholderText('Post'), 'Smith')
    await user.type(screen.getByPlaceholderText(/postmalone/i), 'alice@domain.com')
    const [passInput, confirmInput] = screen.getAllByPlaceholderText(/Password/i)
    await user.type(passInput, 'ValidP@ss1')
    await user.type(confirmInput, 'ValidP@ss1')
    await user.click(screen.getByText('Sign Up'))

    await waitFor(() => expect(userSignUp).toHaveBeenCalled())
    expect(screen.queryByText(/valid email address/i)).not.toBeInTheDocument()
  })

  it('shows minLength error for password shorter than 8 characters', async () => {
    const user = userEvent.setup()
    renderSignUpForm()

    await user.type(screen.getByPlaceholderText(/Austin/i), 'Alice')
    await user.type(screen.getByPlaceholderText('Post'), 'Smith')
    await user.type(screen.getByPlaceholderText(/postmalone/i), 'alice@domain.com')
    const [passInput] = screen.getAllByPlaceholderText(/Password/i)
    await user.type(passInput, 'Ab1@')
    await user.click(screen.getByText('Sign Up'))

    await waitFor(() =>
      expect(screen.getByText(/minimum of 8 characters/i)).toBeInTheDocument()
    )
  })

  it('shows pattern error for password without uppercase', async () => {
    const user = userEvent.setup()
    renderSignUpForm()

    await user.type(screen.getByPlaceholderText(/Austin/i), 'Alice')
    await user.type(screen.getByPlaceholderText('Post'), 'Smith')
    await user.type(screen.getByPlaceholderText(/postmalone/i), 'alice@domain.com')
    const [passInput] = screen.getAllByPlaceholderText(/Password/i)
    await user.type(passInput, 'lowercase1@')
    await user.click(screen.getByText('Sign Up'))

    await waitFor(() =>
      expect(screen.getByText(/uppercase letter/i)).toBeInTheDocument()
    )
  })

  it('shows pattern error for password without special character', async () => {
    const user = userEvent.setup()
    renderSignUpForm()

    await user.type(screen.getByPlaceholderText(/Austin/i), 'Alice')
    await user.type(screen.getByPlaceholderText('Post'), 'Smith')
    await user.type(screen.getByPlaceholderText(/postmalone/i), 'alice@domain.com')
    const [passInput] = screen.getAllByPlaceholderText(/Password/i)
    await user.type(passInput, 'NoSpecial1')
    await user.click(screen.getByText('Sign Up'))

    await waitFor(() =>
      expect(screen.getByText(/special character/i)).toBeInTheDocument()
    )
  })

  it('shows mismatch error when passwords do not match', async () => {
    const user = userEvent.setup()
    renderSignUpForm()

    await user.type(screen.getByPlaceholderText(/Austin/i), 'Alice')
    await user.type(screen.getByPlaceholderText('Post'), 'Smith')
    await user.type(screen.getByPlaceholderText(/postmalone/i), 'alice@domain.com')
    const [passInput, confirmInput] = screen.getAllByPlaceholderText(/Password/i)
    await user.type(passInput, 'ValidP@ss1')
    await user.type(confirmInput, 'DifferentP@ss1')
    await user.click(screen.getByText('Sign Up'))

    await waitFor(() =>
      expect(screen.getByText(/needs to match/i)).toBeInTheDocument()
    )
  })

  it('calls userSignUp with all form values on valid submit', async () => {
    const user = userEvent.setup()
    const { userSignUp } = renderSignUpForm()

    await user.type(screen.getByPlaceholderText(/Austin/i), 'Alice')
    await user.type(screen.getByPlaceholderText('Post'), 'Smith')
    await user.type(screen.getByPlaceholderText(/postmalone/i), 'alice@domain.com')
    const [passInput, confirmInput] = screen.getAllByPlaceholderText(/Password/i)
    await user.type(passInput, 'ValidP@ss1')
    await user.type(confirmInput, 'ValidP@ss1')
    await user.click(screen.getByText('Sign Up'))

    await waitFor(() =>
      expect(userSignUp).toHaveBeenCalledWith(
        { email: 'alice@domain.com', password: 'ValidP@ss1', fname: 'Alice', lname: 'Smith', confirmPassword: 'ValidP@ss1' },
        expect.any(Object)
      )
    )
  })

  it('disables all inputs when isPending is true', () => {
    renderSignUpForm({ isPending: true })

    const inputs = screen.getAllByRole('textbox')
    inputs.forEach((input) => expect(input).toBeDisabled())
  })

  it('renders XSS payload in firstName as escaped text, not executed HTML', async () => {
    const user = userEvent.setup()
    renderSignUpForm()

    const xssPayload = '<script>alert(1)</script>'
    await user.type(screen.getByPlaceholderText(/Austin/i), xssPayload)

    const input = screen.getByPlaceholderText(/Austin/i)
    expect(input.value).toBe(xssPayload)
    // React renders it as textContent, not innerHTML — no script element should appear
    expect(document.querySelector('script')).toBeNull()
  })
})

describe('LoginForm — input validation', () => {
  it('shows required error for email on empty submit', async () => {
    const user = userEvent.setup()
    renderLoginForm()

    await user.click(screen.getByRole('button'))

    await waitFor(() =>
      expect(screen.getAllByText('This field is required').length).toBeGreaterThan(0)
    )
  })

  it('shows minLength error for password shorter than 8 characters', async () => {
    const user = userEvent.setup()
    renderLoginForm()

    await user.type(screen.getByPlaceholderText(/johnssma/i), 'test@test.com')
    await user.type(screen.getByPlaceholderText(/^Password$/i), 'short')
    await user.click(screen.getByRole('button'))

    await waitFor(() =>
      expect(screen.getByText(/minimum of 8 characters/i)).toBeInTheDocument()
    )
  })

  it('calls loginAPi with email and password on valid submit', async () => {
    const user = userEvent.setup()
    const { loginAPi } = renderLoginForm()

    await user.type(screen.getByPlaceholderText(/johnssma/i), 'test@test.com')
    await user.type(screen.getByPlaceholderText(/^Password$/i), 'ValidPass1')
    await user.click(screen.getByRole('button'))

    await waitFor(() =>
      expect(loginAPi).toHaveBeenCalledWith(
        { email: 'test@test.com', password: 'ValidPass1' },
        expect.any(Object)
      )
    )
  })

  it('disables inputs when isPending is true', () => {
    renderLoginForm({ isPending: true })

    const inputs = screen.getAllByRole('textbox')
    inputs.forEach((input) => expect(input).toBeDisabled())
  })

  it('toggles password visibility when eye icon is clicked', async () => {
    const user = userEvent.setup()
    renderLoginForm()

    const passwordInput = screen.getByPlaceholderText(/^Password$/i)
    expect(passwordInput).toHaveAttribute('type', 'password')

    // Click the eye icon container
    const eyeIcon = passwordInput.parentElement.querySelector('div')
    await user.click(eyeIcon)

    expect(passwordInput).toHaveAttribute('type', 'text')
  })
})
