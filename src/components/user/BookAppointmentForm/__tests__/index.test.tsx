import userEvent from '@testing-library/user-event'
import { render, screen } from 'test-utils'

import BookAppointment from '../BookAppointment'

describe('BookAppointmentForm', () => {
  test('renders correctly', () => {
    render(<BookAppointment />)

    const fileInput = screen.getByLabelText(/upload avatar/i)
    const emailInput = screen.getByRole('textbox', {
      name: 'Email',
    })
    const firstNameInput = screen.getByRole('textbox', {
      name: /first name/i,
    })
    const lastNameInput = screen.getByRole('textbox', {
      name: /last name/i,
    })
    const passwordInput = screen.getByLabelText('Password')
    const confirmPasswordInput = screen.getByLabelText('Confirm password')
    const showHideIconElement = screen.getAllByLabelText('show-hide_icon')
    const submitButton = screen.getByRole('button', { name: 'Create Account' })
    const createAccountParagraph = screen.getByText('Already have an account?')
    const redirectToRegisterLink = screen.getByRole('link', { name: 'Sign in' })

    expect(fileInput).toBeInTheDocument()
    expect(emailInput).toBeInTheDocument()
    expect(firstNameInput).toBeInTheDocument()
    expect(lastNameInput).toBeInTheDocument()
    expect(passwordInput).toBeInTheDocument()
    expect(confirmPasswordInput).toBeInTheDocument()
    expect(showHideIconElement).toHaveLength(2)
    expect(submitButton).toBeInTheDocument()
    expect(createAccountParagraph).toBeInTheDocument()
    expect(redirectToRegisterLink).toBeInTheDocument()
  })

  test('insert data and then submit form', async () => {
    const onSubmitMock = jest.fn()
    render(<BookAppointment />)

    // set onSubmitMock function as default form onsubmit function
    const formElement = screen.getByRole('BookAppointmentForm')
    formElement.onsubmit = onSubmitMock

    const fileInput = screen.getByLabelText(/upload avatar/i) as HTMLInputElement
    const emailInput = screen.getByRole('textbox', {
      name: 'Email',
    })
    const firstNameInput = screen.getByRole('textbox', {
      name: /first name/i,
    })
    const lastNameInput = screen.getByRole('textbox', {
      name: /last name/i,
    })
    const passwordInput = screen.getByLabelText('Password')
    const confirmPasswordInput = screen.getByLabelText('Confirm password')
    const submitButton = screen.getByRole('button', { name: 'Create Account' })

    // type and expect
    await userEvent.type(emailInput, 'test@gmail.com')
    await userEvent.type(firstNameInput, 'test')
    await userEvent.type(lastNameInput, 'testtest')
    await userEvent.type(passwordInput, 'Test123!')
    await userEvent.type(confirmPasswordInput, 'Test123!')
    expect(emailInput).toHaveValue('test@gmail.com')
    expect(firstNameInput).toHaveValue('test')
    expect(lastNameInput).toHaveValue('testtest')
    expect(passwordInput).toHaveValue('Test123!')
    expect(confirmPasswordInput).toHaveValue('Test123!')

    // submit form
    await userEvent.click(submitButton)
    expect(onSubmitMock).toHaveBeenCalledTimes(1)
  })
})
