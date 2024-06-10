// BottomBar2.js
import React from "react";
import useSocialLinks from "../../hooks/UseListSocialLinksHook";
import { iconMappings } from "../../data/social/icons";
import { Oval } from 'react-loader-spinner';

const SocialLinks = () => {
  const { data: socialLinks, loading, error } = useSocialLinks();

  if (error) {
      return <div>Error al cargar los enlaces sociales.</div>;
  }

  return (
      <div className="socialLinks flex flex-col items-center justify-center gap-5">
          {loading ? (
              <div className="flex justify-center items-center h-20">
                  <Oval
                      height={60}
                      width={60}
                      color="currentColor"
                      secondaryColor="currentColor"
                      strokeWidth={2}
                      ariaLabel="oval-loading"
                      visible={true}
                      className="text-success"
                  />
              </div>
          ) : (
                  <>
                          {socialLinks &&
                              socialLinks.map(
                                  (item, index) =>
                                      index < 3 && (
                                          <a
                                              className="inline-block"
                                              href={item.profile_link}
                                              title={item.social_media}
                                              target="_blank"
                                              key={index}
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