import { describe, it, expect } from 'vitest'
import { formatTime } from '../../util/FormatTime'

describe('formatTime', () => {
  it('formats 0 seconds as 00:00', () => {
    expect(formatTime(0)).toBe('00:00')
  })

  it('formats 59 seconds as 00:59', () => {
    expect(formatTime(59)).toBe('00:59')
  })

  it('formats 60 seconds as 01:00', () => {
    expect(formatTime(60)).toBe('01:00')
  })

  it('formats 65 seconds as 01:05', () => {
    expect(formatTime(65)).toBe('01:05')
  })

  it('formats 599 seconds as 09:59', () => {
    expect(formatTime(599)).toBe('09:59')
  })

  it('formats 600 seconds as 10:00', () => {
    expect(formatTime(600)).toBe('10:00')
  })

  it('formats 3600 seconds as 60:00', () => {
    expect(formatTime(3600)).toBe('60:00')
  })

  it('pads single-digit seconds with leading zero', () => {
    expect(formatTime(5)).toBe('00:05')
  })

  it('pads single-digit minutes with leading zero', () => {
    expect(formatTime(125)).toBe('02:05')
  })
})
