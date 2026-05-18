import React from "react"
import useSocialLinks from "../../hooks/UseListSocialLinksHook"
import { iconMappings } from "../../data/social/icons"
import { SocialLinksSkeleton } from "../Skeleton"

const SocialLinks = () => {
  const { data: socialLinks, loading, error, refetch } = useSocialLinks()

  if (error) {
    return (
      <div className="socialLinks flex flex-col items-center justify-center gap-5">
        <p className="text-red-400 text-xs">Error al cargar enlaces.</p>
        <button className="bg-accent text-white px-2 py-1 rounded text-xs font-bold hover:bg-accent2" onClick={refetch}>Reintentar</button>
      </div>
    )
  }

  if (loading) return <SocialLinksSkeleton />

  return (
    <div className="socialLinks flex flex-col items-center justify-center gap-5">
      {socialLinks && socialLinks.map(
        (item, index) =>
          index < 8 && (
            <a className="inline-block" href={item.profile_link} title={item.social_media} target="_blank" key={`${item.social_media}-${index}`} rel="noreferrer">
              {iconMappings[item.social_media] || item.social_media}
            </a>
          )
      )}
    </div>
  )
}

export default SocialLinks
