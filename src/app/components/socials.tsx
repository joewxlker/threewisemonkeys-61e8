import { FC } from "react";
import { ProjectInfo } from "../models/project.model";
import Link from "next/link";
import Image from "next/image";

export const Socials: FC<{ config: ProjectInfo, icons: { href: string; image: string }[] }> = ({ config, icons }) => {
  return (
    <div className="flex w-full flex-row items-center justify-center gap-5 py-2">
      {icons.map(({ href, image }, idx) => (
        <Link
        href={href}
        target="_blank"
          key={idx}
          className="h-8 w-8 md:h-10 md:w-10 lg:h-10 lg:w-10 xl:h-10  xl:w-10"
        >
          <Image src={image} alt='' height={20} width={20} />
        </Link>
      ))}
    </div>
  );
};
