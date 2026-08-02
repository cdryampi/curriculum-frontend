import { useState } from "react"
import { Helmet } from "react-helmet-async"
import { FiArrowDownRight, FiArrowUpRight, FiCheck, FiDownload, FiGithub, FiLinkedin, FiMail, FiMenu, FiX } from "react-icons/fi"
import useCurrentLanguage from "../../hooks/useCurrentLanguage"
import usePDF from "../../hooks/UseGetPDFHook"
import { sendEmailService } from "../../api"
import "../../styles/project-media.css"

const copy = {
  es: {
    nav: ["Perfil", "Proyectos", "Experiencia", "Servicios", "Contacto"],
    eyebrow: "Hola · Allillanchu",
    title: "Desarrollador full stack para productos web que sí resuelven trabajo.",
    intro: "Combino Python y Django con React, Vue y TypeScript para crear CMS, herramientas internas, automatizaciones y experiencias web mantenibles.",
    primary: "Ver proyectos", secondary: "Hablemos", available: "Disponible para nuevas oportunidades",
    proof: ["Python · Django", "React · Vue · TypeScript", "APIs · CMS · Automatización", "Docker · CI/CD"],
    profileTitle: "Tecnología útil. Arquitectura clara. Entrega real.",
    profile: "Más de diez años entre informática, sistemas y desarrollo web. Mi foco actual: transformar necesidades operativas en productos digitales claros, sólidos y fáciles de mantener.",
    projectsTitle: "Proyectos que prueban el trabajo", projectsIntro: "Selección de producto público y verificable. Cada caso muestra una combinación concreta de arquitectura, interfaz y entrega.",
    filters: { all: "Todos", product: "Producto", architecture: "Arquitectura", ai: "IA aplicada", ecommerce: "Ecommerce" },
    experienceTitle: "Experiencia y desarrollo continuo", servicesTitle: "Cómo puedo aportar", educationTitle: "Base técnica", contactTitle: "¿Construimos algo útil?",
    contact: "Estoy abierto a posiciones full stack, colaboraciones de producto y proyectos que necesiten una base técnica fiable.",
    name: "Tu nombre", email: "Tu email", message: "Cuéntame el contexto", send: "Enviar mensaje", sending: "Enviando…", sent: "Mensaje enviado. Te responderé pronto.", error: "No se pudo enviar. Escríbeme directamente por email.",
    footer: "Desarrollador full stack · Mataró, Barcelona", cv: "Descargar CV", menu: "Abrir menú", profileAria: "Perfil profesional", skillsAria: "Competencias principales", filtersAria: "Filtrar proyectos",
    indices: ["01 / PERFIL", "02 / PROYECTOS", "03 / EXPERIENCIA", "04 / SERVICIOS", "05 / FORMACIÓN", "06 / CONTACTO"],
  },
  en: {
    nav: ["Profile", "Projects", "Experience", "Services", "Contact"],
    eyebrow: "Hello · Allillanchu",
    title: "Full-stack developer for web products that solve real work.",
    intro: "I combine Python and Django with React, Vue and TypeScript to build CMSs, internal tools, automations and maintainable web experiences.",
    primary: "View projects", secondary: "Let’s talk", available: "Open to new opportunities",
    proof: ["Python · Django", "React · Vue · TypeScript", "APIs · CMS · Automation", "Docker · CI/CD"],
    profileTitle: "Useful technology. Clear architecture. Real delivery.",
    profile: "Over ten years across IT, systems and web development. My current focus: turning operational needs into clear, robust and maintainable digital products.",
    projectsTitle: "Projects that prove the work", projectsIntro: "A selection of public, verifiable work. Each case shows a specific mix of architecture, interface and delivery.",
    filters: { all: "All", product: "Product", architecture: "Architecture", ai: "Applied AI", ecommerce: "Ecommerce" },
    experienceTitle: "Experience and continuous development", servicesTitle: "How I can help", educationTitle: "Technical foundation", contactTitle: "Let’s build something useful.",
    contact: "Open to full-stack roles, product collaborations and projects that need a reliable technical foundation.",
    name: "Your name", email: "Your email", message: "Tell me about the context", send: "Send message", sending: "Sending…", sent: "Message sent. I will reply soon.", error: "Could not send it. Please email me directly.",
    footer: "Full-stack developer · Mataró, Barcelona", cv: "Download CV", menu: "Open menu", profileAria: "Professional profile", skillsAria: "Core skills", filtersAria: "Filter projects",
    indices: ["01 / PROFILE", "02 / WORK", "03 / TIMELINE", "04 / SERVICES", "05 / EDUCATION", "06 / CONTACT"],
  },
}

const projects = [
  { title: "Curriculum CMS", category: "product", stack: ["React", "Django REST", "Tailwind"], es: "CMS propio para gestionar un CV web, contenido bilingüe, contacto y portfolio.", en: "A custom CMS for a web CV, bilingual content, contact and portfolio.", href: "https://github.com/cdryampi/curriculum-frontend" },
  { title: "Gaudeix Codex", category: "architecture", stack: ["Django", "DRF", "Docker", "CI/CD"], es: "Reconstrucción modular de una plataforma de turismo, comercio y eventos municipales.", en: "Modular rebuild of a tourism, local commerce and municipal events platform.", href: "https://github.com/cdryampi/gaudeix-codex" },
  { title: "AI Suite", category: "ai", stack: ["Python", "Flask", "Astro", "LLM"], es: "Plataforma local-first para ejecutar flujos de IA, miniapps, trabajos y artefactos.", en: "A local-first platform for AI workflows, mini apps, jobs and artifacts.", href: "https://github.com/cdryampi/ai-suite" },
  { title: "Task Inkor", category: "ai", stack: ["Vue 3", "Supabase", "OpenAI"], es: "Gestor de tareas con asistencia contextual, etiquetado inteligente y experiencia responsive.", en: "A task manager with contextual assistance, smart tagging and responsive UX.", href: "https://github.com/cdryampi/task_inkor" },
  { title: "Tienda Django", category: "ecommerce", stack: ["Django", "Stripe", "PostgreSQL"], es: "Ecommerce con autenticación, carrito, pagos, idiomas y pipeline de despliegue.", en: "Ecommerce with authentication, cart, payments, languages and deployment pipeline.", href: "https://github.com/cdryampi/tienda-django" },
  { title: "Escandallo", category: "product", stack: ["Laravel", "React", "Docker"], es: "Monorepo para una API REST y SPA con entorno reproducible en Docker/WSL.", en: "A monorepo for a REST API and SPA with a reproducible Docker/WSL environment.", href: "https://github.com/cdryampi/escandallo" },
]

const experience = {
  es: [
    ["2024 — actualidad", "Desarrollo continuo", "Proyectos propios y práctica full stack en CMS, APIs, automatización, IA aplicada y despliegues."],
    ["2023 — 2024", "Ajuntament de Cabrera de Mar", "Desarrollo full stack de CMS, turismo, comercio local y gestión de eventos con Django y PostgreSQL."],
    ["2021 — 2023", "Epinium · Maneko · Inqbarna", "Desarrollo web y móvil, prototipado funcional, WordPress, Kotlin y soporte técnico."],
    ["2019 — 2021", "Güell Consulting", "Desarrollo Django, migraciones ecommerce, CRM, pruebas y resolución de incidencias."],
  ],
  en: [
    ["2024 — present", "Continuous development", "Independent projects and full-stack practice across CMSs, APIs, automation, applied AI and deployments."],
    ["2023 — 2024", "Ajuntament de Cabrera de Mar", "Full-stack development for CMS, tourism, local commerce and event management with Django and PostgreSQL."],
    ["2021 — 2023", "Epinium · Maneko · Inqbarna", "Web and mobile development, functional prototyping, WordPress, Kotlin and technical support."],
    ["2019 — 2021", "Güell Consulting", "Django development, ecommerce migrations, CRM work, testing and incident resolution."],
  ],
}

const services = {
  es: [["01", "Producto y backoffice", "CMS, paneles internos y herramientas que reducen trabajo manual."], ["02", "APIs e integraciones", "Servicios Django/REST y conexiones fiables entre datos, negocio y frontend."], ["03", "Frontend moderno", "Interfaces React, Vue o TypeScript accesibles, rápidas y pensadas para uso real."]],
  en: [["01", "Product and back office", "CMSs, internal panels and tools that reduce manual work."], ["02", "APIs and integrations", "Django/REST services and reliable connections between data, business and frontend."], ["03", "Modern frontend", "Accessible, fast React, Vue or TypeScript interfaces designed for real use."]],
}

const education = {
  es: ["DAW · Desarrollo de Aplicaciones Web", "ASIX · Sistemas Informáticos y Redes", "Python Institute · Python Essentials 1"],
  en: ["DAW · Web Application Development", "ASIX · IT Systems and Networking", "Python Institute · Python Essentials 1"],
}

const HomePage = () => {
  const language = useCurrentLanguage() === "en" ? "en" : "es"
  const t = copy[language]
  const { data: pdfData } = usePDF()
  const [filter, setFilter] = useState("all")
  const [menuOpen, setMenuOpen] = useState(false)
  const [form, setForm] = useState({ name: "", email: "", message: "" })
  const [formState, setFormState] = useState("idle")
  const categories = ["all", ...new Set(projects.map((project) => project.category))]
  const visibleProjects = filter === "all" ? projects : projects.filter((project) => project.category === filter)
  const pdfUrl = pdfData?.resume_file?.file
  const targets = ["perfil", "proyectos", "experiencia", "servicios", "contacto"]
  const basePath = import.meta.env.BASE_URL.replace(/\/$/, "")
  const languageHref = `${basePath}/${language === "es" ? "en" : "es"}`
  const homeHref = `${basePath}/${language}`
  const submit = async (event) => {
    event.preventDefault()
    setFormState("sending")
    try {
      await sendEmailService(form.name, form.email, form.message)
      setFormState("sent")
      setForm({ name: "", email: "", message: "" })
    } catch {
      setFormState("error")
    }
  }

  return <main className="site-shell">
    <Helmet>
      <html lang={language} />
      <title>{language === "es" ? "Yanpiere Sánchez | Desarrollador Full Stack" : "Yanpiere Sánchez | Full-stack Developer"}</title>
      <meta name="description" content={t.intro} />
      <link rel="canonical" href={`https://yampi.eu/${language}`} />
      <meta property="og:title" content={language === "es" ? "Yanpiere Sánchez | Desarrollador Full Stack" : "Yanpiere Sánchez | Full-stack Developer"} />
      <meta property="og:description" content={t.intro} />
      <script type="application/ld+json">{JSON.stringify({ "@context": "https://schema.org", "@type": "ProfilePage", mainEntity: { "@type": "Person", name: "Yanpiere Rafael Sánchez Gastelu", jobTitle: "Full-stack developer", url: "https://yampi.eu", sameAs: ["https://github.com/cdryampi", "https://www.linkedin.com/in/yanpiere-sanchez-gastelu/"] } })}</script>
    </Helmet>
    <a className="skip-link" href="#main-content">{language === "es" ? "Saltar al contenido principal" : "Skip to main content"}</a>
    <header className="site-header">
      <a className="wordmark" href={homeHref}>YS<span>·</span>DEV</a>
      <nav aria-label={language === "es" ? "Navegación principal" : "Primary navigation"} className="desktop-nav">{targets.map((target, index) => <a key={target} href={`#${target}`}>{t.nav[index]}</a>)}</nav>
      <div className="header-actions">
        <a className="language-link" href={languageHref} hrefLang={language === "es" ? "en" : "es"}>{language === "es" ? "EN" : "ES"}</a>
        {pdfUrl && <a className="icon-link" href={pdfUrl} target="_blank" rel="noreferrer" aria-label={t.cv}><FiDownload /></a>}
        <button className="menu-button" aria-expanded={menuOpen} aria-label={t.menu} onClick={() => setMenuOpen((value) => !value)}>{menuOpen ? <FiX /> : <FiMenu />}</button>
      </div>
      {menuOpen && <nav className="mobile-nav" aria-label={language === "es" ? "Navegación móvil" : "Mobile navigation"}>{targets.map((target, index) => <a key={target} href={`#${target}`} onClick={() => setMenuOpen(false)}>{t.nav[index]}</a>)}</nav>}
    </header>
    <section id="main-content" className="hero section-grid" aria-labelledby="intro-title">
      <div className="hero-copy"><p className="eyebrow">{t.eyebrow}</p><h1 id="intro-title">{t.title}</h1><p className="hero-intro">{t.intro}</p><div className="hero-actions"><a className="button button-primary" href="#proyectos">{t.primary}<FiArrowDownRight /></a><a className="button button-secondary" href="#contacto">{t.secondary}<FiArrowUpRight /></a></div></div>
      <aside className="hero-card" aria-label={t.profileAria}><span className="availability"><FiCheck /> {t.available}</span><div className="monogram" aria-hidden="true">YS</div><p>Python / Django<br />React / Vue<br />Systems / Product</p><div className="hero-card-footer"><span>Barcelona</span><span>2026</span></div></aside>
    </section>
    <section className="proof-strip" aria-label={t.skillsAria}>{t.proof.map((item) => <span key={item}>{item}</span>)}</section>
    <section id="perfil" className="section-grid section profile-section"><p className="section-index">{t.indices[0]}</p><div><h2>{t.profileTitle}</h2><p className="large-copy">{t.profile}</p></div></section>
    <section id="proyectos" className="section projects-section"><div className="section-heading"><div><p className="section-index">{t.indices[1]}</p><h2>{t.projectsTitle}</h2></div><p>{t.projectsIntro}</p></div><div className="filter-row" aria-label={t.filtersAria}>{categories.map((category) => <button key={category} className={filter === category ? "active" : ""} aria-pressed={filter === category} onClick={() => setFilter(category)}>{t.filters[category]}</button>)}</div><div className="project-grid">{visibleProjects.map((project) => <a className="project-card" href={project.href} target="_blank" rel="noreferrer" key={project.title}><span className="project-number">0{projects.findIndex(({ title }) => title === project.title) + 1}</span><FiArrowUpRight className="project-arrow" /><p className="project-category">{t.filters[project.category]}</p><h3>{project.title}</h3><p>{project[language]}</p><div className="tag-row">{project.stack.map((tag) => <span key={tag}>{tag}</span>)}</div></a>)}</div><a className="github-link" href="https://github.com/cdryampi" target="_blank" rel="noreferrer"><FiGithub /> GitHub / cdryampi <FiArrowUpRight /></a></section>
    <section id="experiencia" className="section experience-section"><div className="section-heading"><div><p className="section-index">{t.indices[2]}</p><h2>{t.experienceTitle}</h2></div></div><ol className="timeline">{experience[language].map(([date, title, description]) => <li key={title}><span>{date}</span><div><h3>{title}</h3><p>{description}</p></div></li>)}</ol></section>
    <section id="servicios" className="section services-section"><div className="section-heading"><div><p className="section-index">{t.indices[3]}</p><h2>{t.servicesTitle}</h2></div></div><div className="service-grid">{services[language].map(([number, title, description]) => <article key={title}><span>{number}</span><h3>{title}</h3><p>{description}</p></article>)}</div></section>
    <section className="section education-section"><div><p className="section-index">{t.indices[4]}</p><h2>{t.educationTitle}</h2></div><ul>{education[language].map((item) => <li key={item}>{item}</li>)}</ul></section>
    <section id="contacto" className="contact-section"><div><p className="section-index">{t.indices[5]}</p><h2>{t.contactTitle}</h2><p>{t.contact}</p><div className="contact-links"><a href="mailto:yampiersanchezgastelu@gmail.com"><FiMail /> yampiersanchezgastelu@gmail.com</a><a href="https://www.linkedin.com/in/yanpiere-sanchez-gastelu/" target="_blank" rel="noreferrer"><FiLinkedin /> LinkedIn</a></div></div><form onSubmit={submit} aria-busy={formState === "sending"}><label>{t.name}<input required minLength="2" value={form.name} onChange={(event) => setForm({ ...form, name: event.target.value })} /></label><label>{t.email}<input required type="email" value={form.email} onChange={(event) => setForm({ ...form, email: event.target.value })} /></label><label>{t.message}<textarea required minLength="10" rows="4" value={form.message} onChange={(event) => setForm({ ...form, message: event.target.value })} /></label><button className="button button-primary" disabled={formState === "sending"}>{formState === "sending" ? t.sending : t.send}<FiArrowUpRight /></button>{formState === "sent" && <p className="form-success" role="status">{t.sent}</p>}{formState === "error" && <p className="form-error" role="alert">{t.error}</p>}</form></section>
    <footer><span>{t.footer}</span><span>© 2026 Yanpiere Sánchez</span></footer>
  </main>
}

export default HomePage
