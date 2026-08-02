// @vitest-environment jsdom
import { describe, it, expect, beforeEach, vi } from "vitest"
import { render, screen, waitFor } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import ContactForm from "./ContactForm"

const mocks = vi.hoisted(() => ({
  sendEmailHandler: vi.fn(),
  hookState: { loading: false, error: null, success: null },
}))

vi.mock("react-i18next", () => ({
  useTranslation: () => ({ t: (key) => key, i18n: { language: "es" } }),
}))

vi.mock("../../hooks/UseEmailSenderHook", () => ({
  default: () => ({
    sendEmailHandler: mocks.sendEmailHandler,
    loading: mocks.hookState.loading,
    error: mocks.hookState.error,
    success: mocks.hookState.success,
  }),
}))

vi.mock("react-toastify", () => ({
  toast: { success: vi.fn(), error: vi.fn() },
}))

describe("ContactForm", () => {
  const user = userEvent.setup()

  beforeEach(() => {
    mocks.sendEmailHandler.mockReset()
    mocks.sendEmailHandler.mockResolvedValue(true)
    mocks.hookState.loading = false
    mocks.hookState.error = null
    mocks.hookState.success = null
  })

  it("renders name, email and message fields", () => {
    render(<ContactForm />)
    expect(screen.getByLabelText("contact.name")).toBeInTheDocument()
    expect(screen.getByLabelText("contact.email")).toBeInTheDocument()
    expect(screen.getByLabelText("contact.message")).toBeInTheDocument()
  })

  it("shows validation errors and does not submit when empty", async () => {
    render(<ContactForm />)
    await user.click(screen.getByRole("button", { name: "contact.send" }))

    expect(await screen.findByText("contact.nameError")).toBeInTheDocument()
    expect(screen.getByText("contact.emailError")).toBeInTheDocument()
    expect(screen.getByText("contact.messageError")).toBeInTheDocument()
    expect(mocks.sendEmailHandler).not.toHaveBeenCalled()
  })

  it("submits when all fields are valid", async () => {
    render(<ContactForm />)
    await user.type(screen.getByLabelText("contact.name"), "Yampi")
    await user.type(screen.getByLabelText("contact.email"), "yampi@example.com")
    await user.type(
      screen.getByLabelText("contact.message"),
      "Este es un mensaje de prueba suficientemente largo"
    )
    await user.click(screen.getByRole("button", { name: "contact.send" }))

    await waitFor(() => expect(mocks.sendEmailHandler).toHaveBeenCalledTimes(1))
    expect(mocks.sendEmailHandler).toHaveBeenCalledWith(
      "Yampi",
      "yampi@example.com",
      "Este es un mensaje de prueba suficientemente largo"
    )
  })

  it("disables the submit button while sending", () => {
    mocks.hookState.loading = true
    render(<ContactForm />)
    expect(screen.getByRole("button", { name: "contact.sending" })).toBeDisabled()
  })

  it("marks invalid fields with aria-invalid and aria-describedby", async () => {
    render(<ContactForm />)
    await user.click(screen.getByRole("button", { name: "contact.send" }))

    const nameInput = await screen.findByLabelText("contact.name")
    expect(nameInput).toHaveAttribute("aria-invalid", "true")
    expect(nameInput).toHaveAttribute("aria-describedby", "contact-name-error")
  })
})
