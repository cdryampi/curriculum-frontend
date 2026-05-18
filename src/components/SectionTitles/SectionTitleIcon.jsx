import SectionTitle from "./SectionTitle";
import EducationIcon from "../../lib/icons/Mortarboard.svg?react";

const SectionTitleIcon = (props) => (
  <SectionTitle
    {...props}
    icon={<EducationIcon className="fill-accent w-[2.5rem] md:w-[3.75rem] inline-block align-middle" />}
  />
);

export default SectionTitleIcon;
