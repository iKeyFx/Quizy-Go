import { render } from '@testing-library/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { MemoryRouter, Routes, Route } from 'react-router'

export function createTestQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: { retry: false, gcTime: 300_000 },
      mutations: { retry: false },
    },
  })
}

export function renderWithProviders(
  ui,
  {
    initialEntries = ['/'],
    routePath = '/',
    queryClient,
    preloadedUser = null,
  } = {}
) {
  const qc = queryClient ?? createTestQueryClient()

  if (preloadedUser) {
    localStorage.setItem('user', JSON.stringify(preloadedUser))
  }

  const Wrapper = ({ children }) => (
    <QueryClientProvider client={qc}>
      <MemoryRouter initialEntries={initialEntries}>
        <Routes>
          <Route path={routePath} element={children} />
        </Routes>
      </MemoryRouter>
    </QueryClientProvider>
  )

  return { ...render(ui, { wrapper: Wrapper }), queryClient: qc }
}

export function createHookWrapper(queryClient) {
  const qc = queryClient ?? createTestQueryClient()
  return {
    qc,
    wrapper: ({ children }) => (
      <QueryClientProvider client={qc}>
        <MemoryRouter>{children}</MemoryRouter>
      </QueryClientProvider>
    ),
  }
}
