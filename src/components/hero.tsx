import { Badge } from "@/components/ui/badge";
//import Link from "next/link";
import React from "react";

const Hero = () => {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="max-w-(--breakpoint-xl) w-full mx-auto grid lg:grid-cols-2 gap-12 px-6 py-12">
        <div>
          <Badge
            variant="secondary"
            className="rounded-full py-1 border-border"
            asChild
          ></Badge>
          <h1 className="mt-6 max-w-[17ch] text-4xl md:text-5xl lg:text-[2.75rem] xl:text-[3.25rem] font-bold leading-[1.2]! tracking-tighter">
            Zerachiel
          </h1>
          <p className="mt-6 max-w-[60ch] sm:text-lg">
            L&apos;app ZERACHIEL nasce per offrire ai cittadini uno strumento
            digitale intuitivo per trovare e raggiungere facilmente le tombe dei
            propri cari all&apos;interno del cimitero comunale di Trapani.
            Grazie a una mappa interattiva e un sistema di navigazione
            intelligente, i visitatori potranno individuare rapidamente la
            posizione esatta della tomba e ricevere indicazioni per raggiungerla
            senza difficoltà.
          </p>
          <div className="mt-12 flex items-center gap-4"></div>
        </div>
        <img
          className="w-125 ml-30 bg-accent rounded-xl object-cover"
          src="zerachiel.png"
          alt="aaaaaaaaaaa"
        />
      </div>
    </div>
  );
};

export default Hero;
