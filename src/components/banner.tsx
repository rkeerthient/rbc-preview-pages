import { Image } from "@yext/pages/components";
import * as React from "react";
export type Address = {
  line1: string;
  line2?: string;
  city: string;
  region: string;
  postalCode: string;
  countryCode: string;
};

type Banner = {
  name: string;
  address?: Address;
  openTime?: string;
  children?: React.ReactNode;
  img: string;
  mainPhone: string;
  title: string;
  headshot: any;
};

const Banner = (props: Banner) => {
  const { name, children, img, mainPhone, address, headshot, title } = props;

  return (
    <>
      <div className="relative h-auto">
        <div
          className="bg-cover bg-center "
          style={{ backgroundImage: `url("${img}")`, height: "550px" }}
        ></div>
        <div className="h-full w-full absolute top-0 left-0 z-2">
          <div className=" w-full absolute flex items-center justify-center flex-col h-full text-white">
            <div className="relative text-center w-full">
              <div className="absolute top-1/2 left-[15%] -translate-y-1/2 -translate-x-[15%]	">
                <div className="font-medium">
                  <div className="flex gap-6">
                    <div>
                      {headshot && (
                        <Image
                          className="inline-block !w-32 rounded-full"
                          image={headshot}
                        />
                      )}
                    </div>
                    <div className="flex flex-col gap-3  text-left  text-lg">
                      <div className="text-[#003168] text-5xl">{name}</div>
                      <div className="text-black flex flex-col">
                        <div>
                          {address?.line1}, {address?.line2}
                        </div>
                        <div>
                          {address?.city}, {address?.region}{" "}
                          {address?.postalCode}
                        </div>
                        <div>
                          {mainPhone &&
                            mainPhone
                              .replace("+1", "")
                              .replace(/\D+/g, "")
                              .replace(/(\d{3})(\d{3})(\d{4})/, "$1-$2-$3")}
                        </div>
                        <div className="w-fit text-center px-8 py-3 border-[#002750] border text-[#002750] bg-white mt-6">
                          Contact Us
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {children}
    </>
  );
};

export default Banner;
