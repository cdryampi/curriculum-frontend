import React from "react"
import PatternImg from "../../assets/images/patternImg.jpg"
import PatternImg2 from "../../assets/images/patternImg2.jpg"
import AboutUsBg from "../../assets/images/about-bg-cover-back.jpg"
import { SectionTitle } from "../SectionTitles"
import Signature from "../../lib/icons/Signature.svg?react"
import { GoDotFill } from "react-icons/go"
import { AboutUsSkeleton } from "../Skeleton"
import SafeImage from "../SafeImage/SafeImage"

const AboutUs = ({ userData, loading }) => {
  if (loading || !userData) return <AboutUsSkeleton />

  const isAvailable = () => {
    if (userData?.disponibilidad) {
      return (
        <span className="inline-flex items-center gap-2">
          <GoDotFill size="1.5rem" className="fill-accent" />
          <span className="mt-1.5">Disponible</span>
        </span>
      )
    } else {
      return (
        <span className="inline-flex items-center gap-2">
          <GoDotFill size="1.5rem" className="text-pinterest" />
          <span className="mt-1.5">No disponible</span>
        </span>
      )
    }
  }

  return (
    <section className="aboutUsWrap py-[4.5rem] md:py-[5.5rem] lg:py-[6.5rem] xl:py-[7.5rem] relative w-full" id="about">
      <div className="fixedBg bg-left-top bg-no-repeat opacity-20" style={{ backgroundImage: `url(${PatternImg})` }}></div>
      <div className="container mx-auto">
        <SectionTitle title="Sobre" titleInner="mí" desc={userData?.description} htmlDesc></SectionTitle>
        <div className="aboutUs relative w-full p-[1.25rem] lg:p-[1.875rem] mt-[5.9375rem] section-fade-in">
          <div
            className="aboutUsBg before:absolute before:inset-0 before:bg-gray before:rounded-[10px] before:sm:rounded-[1.25rem] before:md:rounded-[3.125rem] before:opacity-70 before:z-[1] bg-gray bg-blend-multiply absolute rounded-[10px] sm:rounded-[1.25rem] md:rounded-[3.125rem] inset-0 left-0 lg:left-[10.9375rem] bg-no-repeat bg-center bg-cover"
            style={{ backgroundImage: `url(${AboutUsBg})` }}
          ></div>
          <div className="grid gap-[1.875rem] lg:grid-cols-2 grid-cols-1">
            <div>
              <div className="aboutImg relative mt-[-5.625rem] ml-0 lg:ml-[-1.875rem]">
                <SafeImage
                  className="rounded-[10px] sm:rounded-[1.25rem] md:rounded-[3.125rem] relative z-[1] w-full"
                  src={userData?.foto?.file}
                  alt={userData?.foto?.title}
                  loading="lazy"
                  decoding="async"
                />
              </div>
            </div>
            <div>
              <div className="aboutCapWrap w-full">
                <div className="aboutCap relative rounded-[10px] sm:rounded-[1.25rem] md:rounded-[3.125rem] overflow-hidden z-[1] lg:py-12 xl:pt-[4.6875rem] xl:pb-[4.375rem] p-5 md:p-10 lg:px-[3.5rem] xl:px-20">
                  <div
                    className="aboutCapBg bg-white opacity-90 absolute rounded-[10px] sm:rounded-[1.25rem] md:rounded-[3.125rem] inset-0 bg-no-repeat bg-center bg-cover z-[-1]"
                    style={{ backgroundImage: `url(${PatternImg2})` }}
                  ></div>
                  <h3 className="text-accent2 font-light text-[1.5rem] md:text-[1.875rem] leading-tight font-Poppins">Hola,</h3>
                  <h4 className="text-accent2 font-light text-[1.325rem] md:text-[1.5rem] leading-normal font-Poppins">
                    yo soy {" "}
                    <span className="text-accent font-bold uppercase text-[1.5rem] md:text-[1.875rem]">
                      {userData?.nombre} {userData?.apellido}
                    </span>
                  </h4>
                  <ul className="grid grid-cols-1 gap-5 mt-6">
                    <li className="grid grid-cols-2 gap-4 text-[1rem] md:text-[1.125rem]">
                      <strong className="text-desc3 uppercase font-bold font-Poppins col-span-1">Edad:</strong>
                      <span className="text-desc2 font-semibold font-NunitoSans col-span-1">{userData?.edad}</span>
                    </li>
                    <li className="grid grid-cols-2 gap-4 text-[1rem] md:text-[1.125rem]">
                      <strong className="text-desc3 uppercase font-bold font-Poppins col-span-1">Teléfono:</strong>
                      <span className="text-desc2 font-semibold font-NunitoSans col-span-1">
                        <a className="text-desc2 font-semibold font-NunitoSans hover:text-accent" href={`tel:+34 ${userData?.telefono}`} title="teléfono">+34 {userData?.telefono}</a>
                      </span>
                    </li>
                    <li className="grid grid-cols-2 gap-4 text-[1rem] md:text-[1.125rem]">
                      <strong className="text-desc3 uppercase font-bold font-Poppins col-span-1">Email:</strong>
                      <span className="text-desc2 font-semibold font-NunitoSans col-span-1">
                        <a className="text-desc2 font-semibold font-NunitoSans hover:text-accent" href={`mailto:${userData?.correo_electronico}`} title="Enviar correo electrónico">{userData?.correo_electronico}</a>
                      </span>
                    </li>
                    <li className="grid grid-cols-2 gap-4 text-[1rem] md:text-[1.125rem]">
                      <strong className="text-desc3 uppercase font-bold font-Poppins col-span-1">Dirección:</strong>
                      <span className="text-desc2 font-semibold font-NunitoSans col-span-1">{userData?.direccion}</span>
                    </li>
                    <li className="grid grid-cols-2 gap-4 text-[1rem] md:text-[1.125rem]">
                      <strong className="text-desc3 uppercase font-bold font-Poppins col-span-1">Estado:</strong>
                      <span className="text-desc2 font-semibold font-NunitoSans col-span-1 uppercase flex items-center">{isAvailable()}</span>
                    </li>
                  </ul>
                  <Signature className="fill-accent h-[235px] w-[175px] mt-[-115px]"></Signature>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default AboutUs
