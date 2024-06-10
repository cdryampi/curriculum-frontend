// En social/icons.js
import { ReactComponent as FacebookIcon } from "../../lib/icons/Facebook.svg";
import { ReactComponent as TwitterIcon } from "../../lib/icons/Twitter.svg";
import { ReactComponent as LinkedInIcon } from "../../lib/icons/LinkedIn.svg";
import { ReactComponent as GitHubIcon } from "../../lib/icons/GitHub.svg";


export const iconMappings = {
  facebook: <FacebookIcon className="h-7 w-7 md:h-10 md:w-10 fill-white hover:fill-accent2"></FacebookIcon>,
  twitter: <TwitterIcon className="h-7 w-7 md:h-10 md:w-10 fill-white hover:fill-accent2"></TwitterIcon>,
  linkedin: <LinkedInIcon className="h-7 w-7 md:h-10 md:w-10 fill-white hover:fill-accent2"></LinkedInIcon>,
  github: <GitHubIcon className="h-7 w-7 md:h-10 md:w-10 fill-white hover:fill-accent2"></GitHubIcon>,
  // Agrega más redes sociales según sea necesario
};
