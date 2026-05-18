const SectionTitle = ({ title, titleInner, desc, variant = "dark", align = "center", icon, htmlDesc }) => {
  const isLight = variant === "light";
  const textColor = isLight ? "text-white" : "text-accent2";
  const spanColor = isLight ? "text-white" : "text-accent";
  const descColor = isLight ? "text-desc" : "text-desc2";
  const bgDecor = isLight ? "bg-shapBgDark" : "bg-shapBg";
  const alignClass = align === "left" ? "" : "justify-center text-center";
  const withDecor = variant !== "no-decor";

  return (
    <div className={`secTitleWrap flex ${alignClass} w-full mb-[2.1875rem]`}>
      <div className="secTitle max-w-[100%] md:max-w-[90%] lg:max-w-[55%]">
        <h2 className={`${textColor} text-[1.875rem] md:text-[2.5rem] xl:text-[3.125rem] font-Poppins font-bold relative`}>
          {withDecor && (
            <i className={`h-[3.5rem] w-[3.5rem] md:h-[5.625rem] md:w-[5.625rem] rounded-[10px] md:rounded-[1.25rem] absolute ml-[-1.75rem] md:ml-[-2.8125rem] left-1/2 ${bgDecor} z-[-1] top-[-12%] md:top-[-15%]`}></i>
          )}
          {icon && icon}
          {title}{" "}
          <span className={`${spanColor} text-[1.875rem] md:text-[2.5rem] xl:text-[3.125rem] font-Caveat font-bold relative`}>
            {titleInner}
          </span>
        </h2>
        {desc && (
          htmlDesc
            ? <div className={`${descColor} text-[1rem] md:text-[1.25rem] sm:text-[1.225rem] mt-1`} dangerouslySetInnerHTML={{ __html: desc }} />
            : <p className={`${descColor} text-[1rem] md:text-[1.25rem] sm:text-[1.225rem] mt-1`}>{desc}</p>
        )}
      </div>
    </div>
  );
};

export default SectionTitle;
