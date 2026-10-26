import Link from "next/link";
import Magnetic from "@/components/ui/magnetic";
import { routes } from "@/lib/routing";
import { image } from "@/lib/sanity/image";

type Props = {
  nextProject: {
    title: string;
    slug: string;
    thumbnail?: {
      _type: "image";
      asset?: {
        _ref: string;
        _type: "reference";
      };
    };
    backgroundColor?: string;
  };
  workSlug: string;
};

export default function WorkDetailNextCase({ nextProject, workSlug }: Props) {
  return (
    <section className="bg-page-dark text-page-dark-foreground">
      <div className=" max-w-8xl py-10 md:py-20 mx-auto px-[calc(var(--container-padding)*2)] text-center">
        <Link
          href={routes.project(workSlug, nextProject.slug)}
          className="group flex flex-col justify-center relative pb-44 overflow-hidden"
        >
          <div>
            <p className="text-base lg:text-xl text-gray-300">Next Case</p>

            <h2 className="mt-10 md:mt-20 text-5xl md:text-7xl lg:text-9xl font-medium leading-none uppercase">
              {nextProject.title}
            </h2>
          </div>

          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[320px] md:max-w-md">
            <div
              className="relative aspect-4/3 overflow-hidden border-[5vw] md:border-[2vw] transition-transform duration-500 ease-out group-hover:translate-y-[25%] md:translate-y-[75%] translate-y-[35%]"
              style={{
                backgroundImage: `url(${image.preset(nextProject?.thumbnail, {
                  width: 500,
                  quality: 75,
                })})`,
                borderColor: nextProject?.backgroundColor || "#ebebeb",
                borderWidth: 25,
                backgroundPosition: "top center",
              }}
            />
          </div>
        </Link>

        <div className="border-t border-gray-500 pb-10 md:pb-16" />

        <Magnetic
          as="link"
          href={routes.work(workSlug)}
          variant="outline"
          className="min-w-52"
        >
          All Work
        </Magnetic>
      </div>
    </section>
  );
}
