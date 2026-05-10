import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import QuestionComponent from '../../../components/QuestionComponent'
import { MemoryRouter } from 'react-router'

const OPTIONS = ['Da Vinci', 'Picasso', 'Monet', 'Dali']

function renderQuestion(props = {}) {
  const defaultProps = {
    question: 'Who painted Mona Lisa?',
    options: OPTIONS,
    onOptionClick: vi.fn(),
    selectedOption: null,
    ...props,
  }
  return {
    ...render(
      <MemoryRouter>
        <QuestionComponent {...defaultProps} />
      </MemoryRouter>
    ),
    onOptionClick: defaultProps.onOptionClick,
  }
}

describe('QuestionComponent', () => {
  it('renders the question text in an h3', () => {
    renderQuestion()
    expect(screen.getByRole('heading', { level: 3, name: /Mona Lisa/i })).toBeInTheDocument()
  })

  it('renders one option per entry in options array', () => {
    renderQuestion()
    OPTIONS.forEach((opt) => expect(screen.getByText(opt)).toBeInTheDocument())
  })

  it('renders options with alphabet labels A, B, C, D', () => {
    renderQuestion()
    ;['A', 'B', 'C', 'D'].forEach((letter) =>
      expect(screen.getByText(letter)).toBeInTheDocument()
    )
  })

  it('passes onOptionClick to each option', () => {
    const { onOptionClick } = renderQuestion()

    fireEvent.click(screen.getByText('Picasso'))

    expect(onOptionClick).toHaveBeenCalledWith('Picasso')
  })

  it('renders nothing for options when options is undefined', () => {
    renderQuestion({ options: undefined })

    // Should not throw; no option elements rendered
    expect(screen.queryByText('Da Vinci')).not.toBeInTheDocument()
  })
})
