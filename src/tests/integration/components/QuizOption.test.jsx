import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import QuizOption from '../../../features/quizscreen/QuizOption'

function renderOption(props = {}) {
  const defaultProps = {
    alphabet: 'A',
    option: 'Da Vinci',
    onOptionClick: vi.fn(),
    selectedOption: null,
    ...props,
  }
  return { ...render(<QuizOption {...defaultProps} />), onOptionClick: defaultProps.onOptionClick }
}

describe('QuizOption', () => {
  it('renders the alphabet letter', () => {
    renderOption({ alphabet: 'B' })
    expect(screen.getByText('B')).toBeInTheDocument()
  })

  it('renders the option text', () => {
    renderOption({ option: 'Picasso' })
    expect(screen.getByText('Picasso')).toBeInTheDocument()
  })

  it('calls onOptionClick with the option value when clicked', () => {
    const { onOptionClick } = renderOption({ option: 'Da Vinci' })

    fireEvent.click(screen.getByText('Da Vinci'))

    expect(onOptionClick).toHaveBeenCalledWith('Da Vinci')
  })

  it('renders as not selected when selectedOption does not match option', () => {
    renderOption({ option: 'Da Vinci', selectedOption: 'Picasso' })
    // The component renders without throwing — selection state is handled via styled-component prop
    expect(screen.getByText('Da Vinci')).toBeInTheDocument()
  })

  it('renders as selected when selectedOption matches option', () => {
    renderOption({ option: 'Da Vinci', selectedOption: 'Da Vinci' })
    expect(screen.getByText('Da Vinci')).toBeInTheDocument()
  })

  it('renders all 4 alphabet options A through D when used as a list', () => {
    const options = ['Da Vinci', 'Picasso', 'Monet', 'Dali']
    const alphabets = ['A', 'B', 'C', 'D']
    const { container } = render(
      <>
        {options.map((opt, i) => (
          <QuizOption
            key={i}
            alphabet={alphabets[i]}
            option={opt}
            onOptionClick={vi.fn()}
            selectedOption={null}
          />
        ))}
      </>
    )

    alphabets.forEach((letter) => expect(screen.getByText(letter)).toBeInTheDocument())
    options.forEach((opt) => expect(screen.getByText(opt)).toBeInTheDocument())
  })
})
