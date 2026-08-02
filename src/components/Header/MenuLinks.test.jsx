// @vitest-environment jsdom
import { describe, it, expect, vi } from "vitest"
import { render, screen } from "@testing-library/react"
import { MemoryRouter } from "react-router-dom"
import MenuLinks from "./MenuLinks"

vi.mock("react-i18next", () => ({
  useTranslation: () => ({ t: (key) => key, i18n: { language: "es" } }),
}))

vi.mock("../../hooks/useCurrentLanguage", () => ({
  default: () => "es",
}))

const renderLinks = (pdf) =>
  render(
    <MemoryRouter initialEntries={["/es"]}>
      <MenuLinks pdf_link={pdf} />
    </MemoryRouter>
  )

describe("MenuLinks", () => {
  it("shows the translated CV label instead of the internal PDF title slug", () => {
    renderLinks({ file: "/media/documents/yampi.pdf", title: "yampi_profile_pdf" })
    const link = screen.getByRole("link", { name: /nav.downloadCv/i })
    expect(link).toHaveAttribute("href", "/media/documents/yampi.pdf")
    expect(link.textContent).not.toContain("yampi_profile_pdf")
  })

  it("does not render a CV link when there is no PDF", () => {
    renderLinks(null)
    expect(screen.queryByRole("link", { name: /nav.downloadCv/i })).not.toBeInTheDocument()
  })
})
