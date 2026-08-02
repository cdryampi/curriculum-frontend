"""Generate the public Spanish CV 2026 from verified portfolio facts."""

from argparse import ArgumentParser
from pathlib import Path

from reportlab.lib import colors
from reportlab.lib.enums import TA_LEFT
from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import ParagraphStyle, getSampleStyleSheet
from reportlab.lib.units import cm
from reportlab.platypus import (
    HRFlowable,
    KeepTogether,
    Paragraph,
    SimpleDocTemplate,
    Spacer,
    Table,
    TableStyle,
)
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont


NAVY = colors.HexColor("#172238")
BLUE = colors.HexColor("#2457E6")
MUTED = colors.HexColor("#526075")
LIME = colors.HexColor("#DFF37D")
PAPER = colors.HexColor("#F6F4EF")
LINE = colors.HexColor("#DCD8CF")


def register_fonts():
    font_dir = Path(r"C:\Windows\Fonts")
    pdfmetrics.registerFont(TTFont("CVSans", str(font_dir / "arial.ttf")))
    pdfmetrics.registerFont(TTFont("CVSansBold", str(font_dir / "arialbd.ttf")))


def styles():
    base = getSampleStyleSheet()
    return {
        "body": ParagraphStyle("body", parent=base["BodyText"], fontName="CVSans", fontSize=9.3, leading=13.2, textColor=NAVY, spaceAfter=6),
        "muted": ParagraphStyle("muted", parent=base["BodyText"], fontName="CVSans", fontSize=8.5, leading=12, textColor=MUTED),
        "section": ParagraphStyle("section", parent=base["Heading2"], fontName="CVSansBold", fontSize=10.5, leading=13, textColor=BLUE, spaceBefore=12, spaceAfter=5, uppercase=True),
        "project": ParagraphStyle("project", parent=base["BodyText"], fontName="CVSans", fontSize=8.4, leading=11.5, textColor=NAVY, spaceAfter=3),
        "project_title": ParagraphStyle("project_title", parent=base["BodyText"], fontName="CVSansBold", fontSize=8.7, leading=11.5, textColor=NAVY),
        "meta": ParagraphStyle("meta", parent=base["BodyText"], fontName="CVSans", fontSize=8.1, leading=10.5, textColor=MUTED),
    }


def header(canvas, document):
    canvas.saveState()
    width, height = A4
    canvas.setFillColor(NAVY)
    canvas.rect(0, height - 4.1 * cm, width, 4.1 * cm, fill=1, stroke=0)
    canvas.setFillColor(LIME)
    canvas.rect(0, height - 4.1 * cm, width, 0.15 * cm, fill=1, stroke=0)
    canvas.setFont("CVSansBold", 21)
    canvas.setFillColor(PAPER)
    canvas.drawString(1.7 * cm, height - 1.7 * cm, "YANPIERE RAFAEL SÁNCHEZ GASTELU")
    canvas.setFont("CVSansBold", 9.5)
    canvas.setFillColor(LIME)
    canvas.drawString(1.7 * cm, height - 2.35 * cm, "DESARROLLADOR FULL STACK")
    canvas.setFont("CVSans", 8.5)
    canvas.setFillColor(colors.HexColor("#D7DEEA"))
    canvas.drawString(1.7 * cm, height - 2.95 * cm, "Mataró, Barcelona  |  yampiersanchezgastelu@gmail.com  |  yampi.eu")
    canvas.drawString(1.7 * cm, height - 3.42 * cm, "github.com/cdryampi  |  linkedin.com/in/yanpiere-sanchez-gastelu")
    canvas.setStrokeColor(LINE)
    canvas.line(1.7 * cm, 1.35 * cm, width - 1.7 * cm, 1.35 * cm)
    canvas.setFont("CVSans", 7.6)
    canvas.setFillColor(MUTED)
    canvas.drawString(1.7 * cm, 0.86 * cm, "CV 2026 - perfil público y evidencia verificable")
    canvas.drawRightString(width - 1.7 * cm, 0.86 * cm, f"Pagina {document.page}")
    canvas.restoreState()


def section(title, s):
    return [Spacer(1, 2), Paragraph(title, s["section"]), HRFlowable(width="100%", thickness=0.6, color=LINE, spaceAfter=5)]


def bullet_line(label, text, s):
    return Paragraph(f"<b>{label}</b> {text}", s["body"])


def build_story(s):
    story = []
    story += section("Perfil", s)
    story.append(Paragraph(
        "Desarrollador full stack con experiencia en sistemas, desarrollo web y producto digital. Combino Python y Django con React, Vue y TypeScript para construir CMS, APIs, herramientas internas y experiencias web mantenibles. Actualmente desarrollo proyectos propios y profundizo en automatización, IA aplicada y despliegue continuo.",
        s["body"],
    ))

    story += section("Competencias", s)
    skills = [
        ["Backend", "Python, Django, APIs REST, Flask, FastAPI, PHP, Laravel"],
        ["Frontend", "JavaScript, TypeScript, React, Vue, Astro, Tailwind CSS"],
        ["Datos y plataforma", "PostgreSQL, MySQL, Supabase, Docker, GitHub Actions, Vercel, Dokploy"],
        ["Calidad e IA", "Playwright, Vitest, Zod, OpenAI, MCP, LLM, automatización"],
    ]
    skills_table = Table([[Paragraph(f"<b>{label}</b>", s["project_title"]), Paragraph(value, s["project"])] for label, value in skills], colWidths=[3.3 * cm, 13.2 * cm])
    skills_table.setStyle(TableStyle([("VALIGN", (0, 0), (-1, -1), "TOP"), ("LINEBELOW", (0, 0), (-1, -1), 0.35, LINE), ("TOPPADDING", (0, 0), (-1, -1), 5), ("BOTTOMPADDING", (0, 0), (-1, -1), 5)]))
    story.append(skills_table)

    story += section("Proyectos públicos destacados", s)
    projects = [
        ("Curriculum CMS", "React, Django REST, Tailwind", "CMS bilingüe para CV, portfolio y contacto.", "github.com/cdryampi/curriculum-frontend"),
        ("Gaudeix Codex", "Django, DRF, Docker, CI/CD", "Plataforma modular de turismo, comercio y eventos municipales.", "github.com/cdryampi/gaudeix-codex"),
        ("AI Suite", "Python, Flask, Astro, LLM", "Entorno local-first para flujos de IA, miniapps y artefactos.", "github.com/cdryampi/ai-suite"),
        ("Task Inkor", "Vue 3, Supabase, OpenAI", "Gestor de tareas con asistencia contextual y etiquetado inteligente.", "github.com/cdryampi/task_inkor"),
        ("Tienda Django", "Django, Stripe, PostgreSQL", "Ecommerce con autenticación, pagos e internacionalización.", "github.com/cdryampi/tienda-django"),
        ("Escandallo", "Laravel, React, Docker", "Monorepo API REST y SPA con entorno reproducible.", "github.com/cdryampi/escandallo"),
    ]
    project_rows = []
    for title, stack, description, link in projects:
        project_rows.append([Paragraph(title, s["project_title"]), Paragraph(f"{description}<br/><font color='#526075'>{stack} - {link}</font>", s["project"])])
    project_table = Table(project_rows, colWidths=[4.0 * cm, 12.5 * cm])
    project_table.setStyle(TableStyle([("VALIGN", (0, 0), (-1, -1), "TOP"), ("LINEBELOW", (0, 0), (-1, -1), 0.35, LINE), ("TOPPADDING", (0, 0), (-1, -1), 4), ("BOTTOMPADDING", (0, 0), (-1, -1), 4)]))
    story.append(project_table)

    story += section("Experiencia", s)
    entries = [
        ("2024 - actualidad", "Desarrollo continuo", "Proyectos propios y práctica full stack en CMS, APIs, automatización, IA aplicada y despliegues."),
        ("2023 - 2024", "Ajuntament de Cabrera de Mar", "Desarrollo full stack de CMS, turismo, comercio local y gestión de eventos con Django y PostgreSQL."),
        ("2021 - 2023", "Epinium · Maneko · Inqbarna", "Desarrollo web y móvil, prototipado funcional, WordPress, Kotlin y soporte técnico."),
        ("2019 - 2021", "Güell Consulting", "Desarrollo Django, migraciones ecommerce, CRM, pruebas y resolución de incidencias."),
    ]
    for dates, role, description in entries:
        story.append(KeepTogether([Paragraph(dates, s["meta"]), Paragraph(role, s["project_title"]), Paragraph(description, s["project"])]))

    story += section("Formación e idiomas", s)
    story.append(bullet_line("Formación:", "DAW - Desarrollo de Aplicaciones Web; ASIX - Sistemas Informáticos y Redes; Python Institute - Python Essentials 1.", s))
    story.append(bullet_line("Idiomas:", "español nativo, catalán fluido, inglés conversacional.", s))
    story.append(Spacer(1, 4))
    story.append(Paragraph("Disponibilidad para posiciones full stack, colaboraciones de producto y proyectos que necesiten una base técnica fiable.", s["muted"]))
    return story


def main():
    parser = ArgumentParser()
    parser.add_argument("--output", type=Path, required=True)
    args = parser.parse_args()
    args.output.parent.mkdir(parents=True, exist_ok=True)
    register_fonts()
    document = SimpleDocTemplate(
        str(args.output), pagesize=A4, rightMargin=1.7 * cm, leftMargin=1.7 * cm,
        topMargin=4.25 * cm, bottomMargin=1.75 * cm, title="CV Yanpiere Rafael Sanchez Gastelu 2026",
        author="Yanpiere Rafael Sanchez Gastelu",
    )
    document.build(build_story(styles()), onFirstPage=header, onLaterPages=header)
    print(args.output)


if __name__ == "__main__":
    main()
