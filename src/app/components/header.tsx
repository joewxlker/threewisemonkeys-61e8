"use client";

import { useState, type FC, useCallback } from "react";
import { useSectionElements } from "../hooks/pageSections.hook";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Button } from "./button";
import { type ProjectInfo } from "~/app/models/project.model";

export const Header: FC<{ layout: string; config: ProjectInfo }> = ({
  layout,
  config,
}) => {
  const [menu, setMenu] = useState<boolean>(false);
  const sections = useSectionElements();
  const toggleMenu = useCallback(() => setMenu((prev) => !prev), [setMenu]);
  const router = useRouter();
  const navigate = useCallback(
    (href: string) => {
      router.push(href);
      setMenu(false);
    },
    [router, setMenu],
  );
  return (
    <div
      className={`${layout} fixed left-0 right-0 top-0 flex flex-row bg-p1 py-2 shadow-sm shadow-shadow`}
    >
      <div className="flex flex-1 flex-col justify-center">
        <Link href="/">
          <Image src="" alt="" height={40} width={40} />
        </Link>
      </div>
      <div className="flex-1" />
      <div className="hidden flex-1 flex-row items-center justify-evenly gap-5 md:flex lg:flex xl:flex">
        {sections?.map((section) => (
          <Link key={section.title} href={section.href}>
            <h3 className="font-body text-2xl text-t1">{section.title}</h3>
          </Link>
        ))}
        <Button href={config.dextools} text="CHART" />
      </div>
      <div className="flex flex-1 flex-row items-center justify-end md:hidden lg:hidden xl:hidden">
        <button
          className="flex h-10 w-10 items-center justify-center rounded bg-s1"
          type="button"
          onClick={toggleMenu}
        >
          <Image src="/icons/bars.svg" alt="" height={34} width={34} />
        </button>
      </div>
      <div
        className={`fixed left-0 top-0 h-screen w-screen backdrop-blur-sm transition-opacity duration-300 md:hidden lg:hidden xl:hidden ${
          menu ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      >
        <div className="relative h-full w-full">
          <div className="absolute bottom-0 left-0 right-0 top-20 bg-s1 text-t2">
            <header className="flex w-full flex-row items-center justify-between p-5">
              <p className="font-heading text-4xl">{config.meta.title}</p>
              <button
                className="flex h-10 w-10 items-center justify-center rounded"
                type="button"
                onClick={toggleMenu}
              >
                <Image src="/icons/x.svg" alt="" height={34} width={34} />
              </button>
            </header>
            <div className="flex flex-col gap-5 p-5">
              <Link href={config.dextools} target="_blank">
                <p className="font-heading text-3xl">CHART</p>
              </Link>
              {sections?.map((section) => (
                <button
                  className="flex flex-row items-center justify-start"
                  type="button"
                  onClick={() => navigate(section.href)}
                  key={section.title}
                >
                  <h3 className="font-body text-2xl">{section.title}</h3>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
