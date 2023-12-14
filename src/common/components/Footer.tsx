import React from "react";

import Container from "./Container";
import LogoWithName from "./LogoWithName";
import { FOOTER } from "@/src/common/utils/constants";
import { Separator } from "@/components/ui/separator";

const Footer = () => {
  return (
    <footer className="bg-blue-50 pt-16 pb-8">
      <Container className="space-y-4">
        <div className="flex gap-x-8 flex-col sm:flex-row gap-y-8 justify-between">
          <div className="space-y-4">
            <LogoWithName isResponsive={false} />
            <ul className="flex gap-x-4 items-center">
              {FOOTER.socials.map((item, index) => (
                <li
                  key={index}
                  className="border border-blue-200 p-2 rounded-md hover:bg-blue-500 hover:text-white cursor-pointer transition-colors text-blue-500"
                >
                  <item.Icon size={16} />
                </li>
              ))}
            </ul>
          </div>

          <div className="max-w-2xl flex flex-1 gap-8 flex-wrap justify-between items-center">
            {FOOTER.items.map((item, index) => (
              <ul key={index}>
                <li className="text-lg font-bold mb-4">{item.title}</li>
                {item.links.map((link, index) => (
                  <li
                    key={index}
                    className="hover:text-blue-500 cursor-pointer transition-colors mt-2 text-sm w-fit"
                  >
                    {link.name}
                  </li>
                ))}
              </ul>
            ))}
          </div>
        </div>
        <Separator color="red" />
        <p className="text-xs">All rights reserved &copy; 2023 Lawsuits.</p>
      </Container>
    </footer>
  );
};

export default Footer;
