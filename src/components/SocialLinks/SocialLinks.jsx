import React from "react"
import useSocialLinks from "../../hooks/UseListSocialLinksHook"
import { iconMappings } from "../../data/social/icons"
import { SocialLinksSkeleton } from "../Skeleton"

const SocialLinks = () => {
  const { data: socialLinks, loading, error, refetch } = useSocialLinks()

  if (error) {
    return (
      <div className="socialLinks flex flex-col items-center justify-center gap-5" role="alert">
        <p className="text-red-400 text-xs">Error al cargar enlaces.</p>
        <button
          type="button"
          onClick={refetch}
          className="bg-accent text-white px-2 py-1 rounded text-xs font-bold hover:bg-accent2 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
        >
          Reintentar
        </button>
      </div>
    )
  }

  if (loading) return <SocialLinksSkeleton />

  const list = (socialLinks || []).slice(0, 8)

  return (
    <div className="socialLinks flex flex-col items-center justify-center gap-5 section-fade-in">
      {list.length === 0 ? (
        <p className="text-white/40 text-xs">Sin enlaces sociales</p>
      ) : (
        list.map((item, index) => (
          <a
            className="inline-block"
            href={item.profile_link}
            title={item.social_media}
            target="_blank"
            key={`${item.social_media}-${index}`}
            rel="noopener noreferrer"
            aria-label={item.social_media}
          >
            {iconMappings[item.social_media?.toLowerCase()] || item.social_media}
          </a>
        ))
      )}
    </div>
  )
}

export default SocialLinks

