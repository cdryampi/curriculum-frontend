import { useEffect } from "react"
import { useLocation } from "react-router-dom"
import { Helmet } from "react-helmet-async"
import { Header } from "../../components/Header"
import { FeaturedArea } from "../../components/FeaturedArea"
import { AboutUs } from "../../components/AboutUs"
import { BottomBar2 } from "../../components/BottomBar"
import { EducationAndSkills } from "../../components/EducationAndSkills"
import { MyWorkExperience } from "../../components/MyWorkExperience"
import { Portfolio } from "../../components/Portfolio"
import { Services } from "../../components/Services"
import { ContactUs } from "../../components/ContactUs"
import { ScrollToTopButton } from "../../components/BackToTopComponent"
import useUserProfile from "../../hooks/UseProfileUserHook"
import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import { HeaderSkeleton, BottomBarSkeleton } from "../../components/Skeleton"
import { ErrorState } from "../../components/ErrorState"

const HomePage = () => {
  const { data: userData, loading, error, refetch } = useUserProfile()
  const pdf_data = userData?.resume_file
  const location = useLocation()

  useEffect(() => {
    if (!loading && location.hash) {
      const id = location.hash.replace("#", "")
      const element = document.getElementById(id)
      if (element) {
        element.scrollIntoView({ behavior: "smooth" })
        window.history.replaceState(null, "", window.location.pathname + window.location.search)
      }
    }
  }, [location, loading])

  const jsonLd = userData ? {
    "@context": "https://schema.org",
    "@type": "Person",
    name: `${userData.nombre} ${userData.apellido}`,
    givenName: userData.nombre,
    familyName: userData.apellido,
    jobTitle: userData.profesion,
    email: userData.correo_electronico,
    telephone: userData.telefono,
    address: { "@type": "PostalAddress", streetAddress: userData.direccion },
    image: userData.foto?.file,
    url: "https://cdryampi.github.io/curriculum-frontend/",
    sameAs: userData.socials_media?.map(s => s.profile_link) || [],
  } : null

  if (error) {
    return (
      <div className="pageLoader fixed flex-col justify-center items-center inset-0 flex bg-dark">
        <Helmet><title>Error - Currículum Yampi</title></Helmet>
        <ErrorState
          message="Error al cargar el perfil del usuario."
          onRetry={refetch}
          retryLabel="Reintentar"
        />
      </div>
    )
  }

  return (
    <main id="main-content"><div id="home">
      <Helmet>
        <title>Currículum de Yampi | Desarrollador Web Full Stack</title>
        <meta name="description" content={userData?.description ? userData.description.replace(/<[^>]*>/g, "").slice(0, 160) : "Descubre mi perfil profesional, experiencia y habilidades en desarrollo web."} />
        <meta property="og:title" content={`${userData?.nombre || "Yampi"} ${userData?.apellido || "Dev"} - Currículum`} />
        <meta property="og:description" content="Desarrollador Web Full Stack con experiencia en Django y React." />
        <meta property="og:type" content="profile" />
        <meta property="og:url" content="https://cdryampi.github.io/curriculum-frontend/" />
        <meta property="og:image" content={userData?.foto?.file || "/logo.png"} />
        <meta name="twitter:card" content="summary_large_image" />
        <link rel="canonical" href="https://cdryampi.github.io/curriculum-frontend/" />
        {jsonLd && <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>}
      </Helmet>

      {loading ? <HeaderSkeleton /> : <Header pdf={pdf_data} />}
      <FeaturedArea userData={userData} loading={loading} />
      <AboutUs userData={userData} loading={loading} />
      <Services />
      <Portfolio />
      <MyWorkExperience />
      <EducationAndSkills />
      <ToastContainer />
      <ContactUs />
      {loading ? <BottomBarSkeleton /> : <BottomBar2 />}
      <ScrollToTopButton />
    </div></main>
  )
}

export default HomePage
