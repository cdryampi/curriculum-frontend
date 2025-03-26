// BottomBar2.js
import React from "react";
import useSocialLinks from "../../hooks/UseListSocialLinksHook";
import { iconMappings } from "../../data/social/icons";
import { ClipLoader } from "react-spinners";

const SocialLinks = () => {
  const { data: socialLinks, loading, error } = useSocialLinks();
  if (error) {
    return <div>Error al cargar los enlaces sociales.</div>;
  }

  return (
    <div className="socialLinks flex flex-col items-center justify-center gap-5">
      {loading ? (
        <div className="flex justify-center items-center h-20">
          <ClipLoader size={60} color="#284be5" loading={true} />
        </div>
      ) : (
        <>
          {socialLinks &&
            socialLinks.map(
              (item, index) =>
                index < 8 && (
                  <a
                    className="inline-block"
                    href={item.profile_link}
                    title={item.social_media}
                    target="_blank"
                    key={`${item.social_media}-${index}`}
                    rel="noreferrer"
                  >
                    {iconMappings[item.social_media] || item.social_media}
                  </a>
                )
            )}
        </>
      )}
    </div>
  );
};

export default SocialLinks;
