import { SectionTitleLight2 } from "../SectionTitles";
import SectionBg from "../../assets/images/contactUs.jpg";
import ContactForm from "./ContactForm";

const ContactUs = () => {
  return (
    <section className="contactUsWrap py-[4.5rem] md:py-[5.5rem] lg:py-[6.5rem] xl:py-[7.5rem] relative w-full">
      <div
        className="fixedBg bg-center bg-no-repeat before:absolute before:z-[1] before:inset-0 before:opacity-90 before:bg-accent bg-accent bg-blend-multiply overflow-hidden"
        style={{ backgroundImage: `url(${SectionBg})` }}
      ></div>
      <div className="container sm:container md:container lg:container xl:container 2xl:container mx-auto">
        <SectionTitleLight2
          title="Contactame"
          titleInner=", te responderé lo antes posible."
          desc="Si tienes alguna pregunta o deseas contactarme, puedes hacerlo a través del siguiente formulario."
        ></SectionTitleLight2>
        <div className="contactUs grid gap-[1.875rem] lg:grid-cols-1 md:grid-cols-1 grid-cols-1 relative w-full">
          <div>
            <ContactForm></ContactForm>
          </div>
          {/* Contact Us */}
        </div>
      </div>
      {/* Contact Us Wrap */}
    </section>
  );
};

export default ContactUs;
