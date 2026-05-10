import { describe, it, expect, vi } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { MemoryRouter } from 'react-router'
import SignUpForm from '../../../features/authentication/SignUpForm'

function renderSignUpForm(props = {}) {
  const defaults = { userSignUp: vi.fn(), isError: false, isPending: false, ...props }
  const qc = new QueryClient()
  return {
    ...render(
      <QueryClientProvider client={qc}>
        <MemoryRouter>
          <SignUpForm {...defaults} />
        </MemoryRouter>
      </QueryClientProvider>
    ),
    userSignUp: defaults.userSignUp,
  }
}

async function fillValidForm(user) {
  await user.type(screen.getByPlaceholderText(/Austin/i), 'Alice')
  await user.type(screen.getByPlaceholderText('Post'), 'Smith')
  await user.type(screen.getByPlaceholderText(/postmalone/i), 'alice@domain.com')
  const [passInput, confirmInput] = screen.getAllByPlaceholderText(/Password/i)
  await user.type(passInput, 'ValidP@ss1')
  await user.type(confirmInput, 'ValidP@ss1')
}

describe('SignUpForm', () => {
  it('renders all 5 input fields', () => {
    renderSignUpForm()

    expect(screen.getByPlaceholderText(/Austin/i)).toBeInTheDocument()
    expect(screen.getByPlaceholderText('Post')).toBeInTheDocument()
    expect(screen.getByPlaceholderText(/postmalone/i)).toBeInTheDocument()
    const passwordFields = screen.getAllByPlaceholderText(/Password/i)
    expect(passwordFields).toHaveLength(2)
  })

  it('shows required errors when submitted empty', async () => {
    const user = userEvent.setup()
    renderSignUpForm()

    await user.click(screen.getByRole('button'))

    await waitFor(() => {
      const errors = screen.getAllByText('This field is required')
      expect(errors.length).toBeGreaterThan(0)
    })
  })

  it('shows email format error for invalid email', async () => {
    const user = userEvent.setup()
    renderSignUpForm()

    await user.type(screen.getByPlaceholderText(/Austin/i), 'Alice')
    await user.type(screen.getByPlaceholderText('Post'), 'Smith')
    await user.type(screen.getByPlaceholderText(/postmalone/i), 'bademail')
    await user.click(screen.getByRole('button'))

    await waitFor(() =>
      expect(screen.getByText(/valid email address/i)).toBeInTheDocument()
    )
  })

  it('shows password strength error for weak password', async () => {
    const user = userEvent.setup()
    renderSignUpForm()

    await user.type(screen.getByPlaceholderText(/Austin/i), 'Alice')
    await user.type(screen.getByPlaceholderText('Post'), 'Smith')
    await user.type(screen.getByPlaceholderText(/postmalone/i), 'alice@domain.com')
    const [passInput] = screen.getAllByPlaceholderText(/Password/i)
    await user.type(passInput, 'weakonly')
    await user.click(screen.getByRole('button'))

    await waitFor(() =>
      expect(screen.getByText(/uppercase letter/i)).toBeInTheDocument()
    )
  })

  it('shows mismatch error when passwords differ', async () => {
    const user = userEvent.setup()
    renderSignUpForm()

    await user.type(screen.getByPlaceholderText(/Austin/i), 'Alice')
    await user.type(screen.getByPlaceholderText('Post'), 'Smith')
    await user.type(screen.getByPlaceholderText(/postmalone/i), 'alice@domain.com')
    const [passInput, confirmInput] = screen.getAllByPlaceholderText(/Password/i)
    await user.type(passInput, 'ValidP@ss1')
    await user.type(confirmInput, 'DifferentP@ss2')
    await user.click(screen.getByRole('button'))

    await waitFor(() =>
      expect(screen.getByText(/needs to match/i)).toBeInTheDocument()
    )
  })

  it('calls userSignUp with all field values on valid submit', async () => {
    const user = userEvent.setup()
    const { userSignUp } = renderSignUpForm()

    await fillValidForm(user)
    await user.click(screen.getByRole('button'))

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
})
