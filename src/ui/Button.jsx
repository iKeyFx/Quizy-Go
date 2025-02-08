import styled, { css } from "styled-components";

const sizes = {
  small: css`
    font-size: 1.2rem;
    padding: 0.4rem 0.8rem;
    text-transform: uppercase;
    font-weight: 600;
    text-align: center;
  `,
  medium: css`
    font-size: 1.4rem;
    padding: 1.2rem 1.6rem;
    font-weight: 500;
  `,
  large: css`
    border: none;
    margin-top: 0.5rem;
    cursor: pointer;
    transition: background-color 0.3s;
    width: 100%;
    padding: 0.75rem;
    border-radius: 8px;
    font-size: 1rem;
    margin: 0 auto;
    font-weight: 500;

    &:disabled {
      cursor: not-allowed;
    }
    @media (max-width: 500px) {
      font-size: 12px;
    }
  `,
};

const variations = {
  prev: css`
    color: var(--color-white);
    background-color: var(--color-primary);

    &:hover {
      background-color: #5f3dc4;
    }
  `,
  next: css`
    color: var(--color-white);
    background: var(--color-primary-2);

    &:hover {
      background-color: #5f3dc4;
    }
  `,
  submit: css`
    color: var(--color-white);
    background: var(--color-green);

    &:hover {
      background-color: var(--color-green-1);
    }
  `,
};

const Button = styled.button`
  border: none;

  ${(props) => sizes[props.sizes]}
  ${(props) => variations[props.variations]}
`;

Button.defaultProps = {
  variations: "primary",
  sizes: "medium",
};
export default Button;
