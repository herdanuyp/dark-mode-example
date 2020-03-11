import styled from 'styled-components'

export const Form = styled.form`
  width: 300px;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0 auto;
  overflow: hidden;
`

export const Input = styled.input`
  width: 300px;
  height: 35px;
  border: ${(props) => props.border || '1px solid #ccc'};
  background-color: #fff;
`

export const Button = styled.button`
  width: 300px;
  height: 35px;
  background: linear-gradient(
    ${({ theme }) => theme.colors.linearOne},
    ${({ theme }) => theme.colors.linearTwo}
  );
  color: #fff;
  border-radius: 3px;
  outline: 0;
`

export const Label = styled.label`
  display: flex;
  flex-direction: column;
  color: ${({ theme }) => theme.colors.text};
  font-family: 'Raleway', sans-serif;
  font-size: 0.8em;
  margin: 0.5em 0;
  position: relative;
`

export const Text = styled.p`
  font-family: 'Raleway', sans-serif;
  color: ${(props) => props.color || '#4d4d4d'};
`