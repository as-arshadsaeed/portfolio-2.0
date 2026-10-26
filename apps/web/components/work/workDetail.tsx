import { Props } from "@portfolio/sanity";

import WorkDetailGallery from "./workDetailGallery";
import WorkDetailHeader from "./workDetailHeader";
import WorkDetailMeta from "./workDetailMeta";
import WorkDetailMobileGallery from "./workDetailMobileGallery";

const WorkDetailSection = ({ work }: Props) => {
  return (
    <>
      <WorkDetailHeader work={work} />

      <WorkDetailMeta work={work} />

      <WorkDetailGallery work={work} />

      <WorkDetailMobileGallery work={work} />
    </>
  );
};

export default WorkDetailSection;
