// @vitest-environment jsdom
import { describe, it, expect, beforeEach, vi } from "vitest"
import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { MemoryRouter } from "react-router-dom"
import LanguageSwitcher from "./LanguageSwitcher"

const changeLanguageMock = vi.hoisted(() => vi.fn())

vi.mock("react-i18next", () => ({
  useTranslation: () => ({
    t: (key) => key,
    i18n: {
      language: "es",
      resolvedLanguage: "es",
      changeLanguage: changeLanguageMock,
    },
  }),
}))

const renderSwitcher = () =>
  render(
    <MemoryRouter initialEntries={["/es"]}>
      <LanguageSwitcher />
    </MemoryRouter>
  )

describe("LanguageSwitcher", () => {
  beforeEach(() => changeLanguageMock.mockClear())

  it("renders the current language flag and code", () => {
    renderSwitcher()
    const trigger = screen.getByRole("button", { name: "common.language" })
    expect(trigger).toHaveTextContent("ES")
    expect(trigger.querySelector("svg")).toBeInTheDocument()
  })

  it("opens a listbox with one option per language", async () => {
    const user = userEvent.setup()
    renderSwitcher()
    await user.click(screen.getByRole("button", { name: "common.language" }))

    expect(screen.getByRole("listbox")).toBeInTheDocument()
    expect(screen.getAllByRole("option")).toHaveLength(3)
    expect(screen.getByRole("option", { name: /Español/i })).toBeInTheDocument()
    expect(screen.getByRole("option", { name: /English/i })).toBeInTheDocument()
    expect(screen.getByRole("option", { name: /Runasimi/i })).toBeInTheDocument()
  })

  it("changes language and closes the menu when an option is selected", async () => {
    const user = userEvent.setup()
    renderSwitcher()
    await user.click(screen.getByRole("button", { name: "common.language" }))
    await user.click(screen.getByRole("option", { name: /English/i }))

    expect(changeLanguageMock).toHaveBeenCalledWith("en")
    expect(screen.queryByRole("listbox")).not.toBeInTheDocument()
  })

  it("closes on Escape", async () => {
    const user = userEvent.setup()
    renderSwitcher()
    await user.click(screen.getByRole("button", { name: "common.language" }))
    expect(screen.getByRole("listbox")).toBeInTheDocument()
    await user.keyboard("{Escape}")
    expect(screen.queryByRole("listbox")).not.toBeInTheDocument()
  })
})
