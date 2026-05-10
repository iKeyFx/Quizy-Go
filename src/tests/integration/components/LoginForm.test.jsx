import { describe, it, expect, vi } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { MemoryRouter } from 'react-router'
import LoginForm from '../../../ui/LoginForm'

function renderLoginForm(props = {}) {
  const defaults = { loginAPi: vi.fn(), isPending: false, ...props }
  const qc = new QueryClient()
  return {
    ...render(
      <QueryClientProvider client={qc}>
        <MemoryRouter>
          <LoginForm {...defaults} />
        </MemoryRouter>
      </QueryClientProvider>
    ),
    loginAPi: defaults.loginAPi,
  }
}

describe('LoginForm', () => {
  it('renders email input, password input and submit button', () => {
    renderLoginForm()
    expect(screen.getByPlaceholderText(/johnssma/i)).toBeInTheDocument()
    expect(screen.getByPlaceholderText(/^Password$/i)).toBeInTheDocument()
    expect(screen.getByRole('button')).toBeInTheDocument()
  })

  it('shows "Log in" button text when not pending', () => {
    renderLoginForm()
    expect(screen.getByRole('button')).toHaveTextContent(/log in/i)
  })

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

  it('disables email and password inputs when isPending is true', () => {
    renderLoginForm({ isPending: true })

    const inputs = screen.getAllByRole('textbox')
    inputs.forEach((input) => expect(input).toBeDisabled())
  })

  it('toggles password visibility when eye icon is clicked', async () => {
    const user = userEvent.setup()
    renderLoginForm()

    const passwordInput = screen.getByPlaceholderText(/^Password$/i)
    expect(passwordInput).toHaveAttribute('type', 'password')

    const eyeContainer = passwordInput.parentElement.querySelector('div')
    await user.click(eyeContainer)

    expect(passwordInput).toHaveAttribute('type', 'text')

    await user.click(eyeContainer)
    expect(passwordInput).toHaveAttribute('type', 'password')
  })
})
