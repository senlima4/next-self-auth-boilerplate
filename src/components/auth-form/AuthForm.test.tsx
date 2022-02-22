import * as React from 'react'
import { screen, render, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import AuthForm from './AuthForm'

const authFn = jest.fn(() => Promise.resolve())

const MOCK_INPUT = {
  email: 'test@mail.com',
  password: 'test-password',
}

describe('Auth Form', () => {
  it('should not called auth fn when password is empty', async () => {
    render(<AuthForm handleAuth={authFn} />)

    const mailInput = screen.getByLabelText('Email') as HTMLInputElement
    const submitBtn = screen.getByRole('button', { name: 'Submit' })

    userEvent.type(mailInput, MOCK_INPUT.email)
    userEvent.click(submitBtn)

    await waitFor(() =>
      expect(screen.queryByText('Submitting')).not.toBeInTheDocument()
    )

    expect(mailInput.value).toBe(MOCK_INPUT.email)
    expect(authFn).not.toBeCalled()
  })

  it('should not called auth fn when email is empty', async () => {
    render(<AuthForm handleAuth={authFn} />)

    const pwdInput = screen.getByLabelText('Password') as HTMLInputElement
    const submitBtn = screen.getByRole('button', { name: 'Submit' })

    userEvent.type(pwdInput, MOCK_INPUT.password)
    userEvent.click(submitBtn)

    await waitFor(() =>
      expect(screen.queryByText('Submitting')).not.toBeInTheDocument()
    )

    expect(pwdInput.value).toBe(MOCK_INPUT.password)
    expect(authFn).not.toBeCalled()
  })

  it('should called auth fn when required fields are filled', async () => {
    render(<AuthForm handleAuth={authFn} />)

    const mailInput = screen.getByLabelText('Email') as HTMLInputElement
    const pwdInput = screen.getByLabelText('Password') as HTMLInputElement
    const submitBtn = screen.getByRole('button', { name: 'Submit' })

    userEvent.type(mailInput, MOCK_INPUT.email)
    userEvent.type(pwdInput, MOCK_INPUT.password)
    userEvent.click(submitBtn)

    await waitFor(() => expect(authFn).toHaveBeenCalledTimes(1))
  })
})
