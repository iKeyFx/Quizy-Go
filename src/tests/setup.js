import '@testing-library/jest-dom'
import { cleanup } from '@testing-library/react'
import { afterEach, beforeAll, afterAll, vi } from 'vitest'
import { server } from './mocks/server'

beforeAll(() => server.listen({ onUnhandledRequest: 'warn' }))

afterEach(() => {
  server.resetHandlers()
  cleanup()
  localStorage.clear()
  vi.clearAllMocks()
})

afterAll(() => server.close())

vi.mock('react-lazy-load-image-component', () => ({
  LazyLoadImage: ({ src, alt, ...props }) => {
    const React = require('react')
    return React.createElement('img', { src, alt, ...props })
  },
}))
