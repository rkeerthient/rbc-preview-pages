import {
  GetHeadConfig,
  GetPath,
  GetRedirects,
  HeadConfig,
  Template,
  TemplateConfig,
  TemplateProps,
  TemplateRenderProps,
} from "@yext/pages";
import { Image } from "@yext/pages/components";
import { LexicalRichText } from "@yext/react-components";
import * as React from "react";
import { useState } from "react";
import { IoIosPeople, IoMdPin } from "react-icons/io";
import { IoOpenOutline } from "react-icons/io5";
import Schema from "../components/Schema";
import Banner from "../components/banner";
import "../index.css";
import Insights from "../components/relatedInsights";
import ClientStories from "../components/clientStories";
import BlogPosts from "../components/relatedBlogs";
import Solutions from "../components/solutions";
import TeamMembersCarousel from "../components/TeamMembersCarousel";
/**
 * Required when Knowledge Graph data is used for a template.
 */
export const config: TemplateConfig = {
  stream: {
    $id: "my-team-id-1",
    // Specifies the exact data that each generated document will contain. This data is passed in
    // directly as props to the default exported function.
    fields: [
      "id",
      "uid",
      "meta",
      "name",
      "address",
      "mainPhone",
      "hours",
      "description",
      "slug",
      "geocodedCoordinate",
      "photoGallery",
      "c_associatedAdvisors.meta",
      "c_associatedAdvisors.address",
      "c_associatedAdvisors.name",
      "c_associatedAdvisors.photoGallery",
      "c_associatedAdvisors.slug",
      "c_associatedAdvisors.mainPhone",
      "c_associatedTeam.name",
      "c_associatedTeam.description",
      "c_associatedTeam.slug",
      "c_heroBanner",
      "c_richTextDescription",
      "c_associatedBlogs.landingPageUrl",
      "c_associatedBlogs.description",
      "c_associatedBlogs.name",
      "c_associatedBlogs.c_category",
      "c_associatedBlogs.c_datePublished",
      "c_associatedBlogs.photoGallery",
      "c_associatedClientStories.landingPageUrl",
      "c_associatedClientStories.title",
      "c_associatedClientStories.description",
      "c_associatedClientStories.name",
      "c_associatedClientStories.photoGallery",
      "c_associatedInsights.title",
      "c_associatedInsights.description",
      "c_associatedInsights.name",
      "c_associatedInsights.externalArticlePostDate",
      "c_associatedInsights.c_category",
      "c_associatedInsights.photoGallery",
      "c_associatedSolutions.landingPageUrl",
      "c_associatedSolutions.title",
      "c_associatedSolutions.description",
      "c_associatedSolutions.name",
      "c_associatedSolutions.c_category",
      "c_associatedSolutions.photoGallery",
      "c_professionalServicePlace.meta",
      "c_professionalServicePlace.address",
      "c_professionalServicePlace.name",
      "c_professionalServicePlace.photoGallery",
      "c_professionalServicePlace.slug",
      "c_professionalServicePlace.mainPhone",
    ],
    // Defines the scope of entities that qualify for this stream.
    filter: {
      entityTypes: ["location"],
      savedFilterIds: ["1377662830"],
    },
    // The entity language profiles that documents will be generated for.
    localization: {
      locales: ["en"],
      primary: false,
    },
  },
};

/**
 * Defines the path that the generated file will live at for production.
 *
 * NOTE: This currently has no impact on the local dev path. Local dev urls currently
 * take on the form: featureName/entityId
 */
export const getPath: GetPath<TemplateProps> = ({ document }) => {
  return document.slug
    ? document.slug
    : `${document.locale}/${document.address.region}/${document.address.city}/${
        document.address.line1
      }-${document.id.toString()}`;
};

/**
 * Defines a list of paths which will redirect to the path created by getPath.
 *
 * NOTE: This currently has no impact on the local dev path. Redirects will be setup on
 * a new deploy.
 */
export const getRedirects: GetRedirects<TemplateProps> = ({ document }) => {
  return [`index-old/${document.id.toString()}`];
};

/**
 * This allows the user to define a function which will take in their template
 * data and procude a HeadConfig object. When the site is generated, the HeadConfig
 * will be used to generate the inner contents of the HTML document's <head> tag.
 * This can include the title, meta tags, script tags, etc.
 */
export const getHeadConfig: GetHeadConfig<TemplateRenderProps> = ({
  relativePrefixToRoot,
  path,
  document,
}): HeadConfig => {
  return {
    title: document.name,
    charset: "UTF-8",
    viewport: "width=device-width, initial-scale=1",
    tags: [
      {
        type: "meta",
        attributes: {
          name: "description",
          content: document.description,
        },
      },
    ],
  };
};

/**
 * This is the main template. It can have any name as long as it's the default export.
 * The props passed in here are the direct stream document defined by `config`.
 *
 * There are a bunch of custom components being used from the src/components folder. These are
 * an example of how you could create your own. You can set up your folder structure for custom
 * components any way you'd like as long as it lives in the src folder (though you should not put
 * them in the src/templates folder as this is specific for true template files).
 */
const Team: Template<TemplateRenderProps> = ({
  relativePrefixToRoot,
  path,
  document,
}) => {
  const cpy = document;
  const {
    _site,
    name,
    address,
    mainPhone,
    hours,
    description,
    slug,
    geocodedCoordinate,
    photoGallery,
    c_associatedAdvisors,
    c_heroBanner,
    c_richTextDescription,
    c_associatedTeam,
    c_associatedBlogs,
    c_associatedClientStories,
    c_associatedInsights,
    c_professionalServicePlace,
    c_associatedSolutions,
    uid,
  } = document;
  const [pathLink, setPathLink] = useState<string>();

  return (
    <>
      <Schema document={cpy}></Schema>
      <span className="hidden md:block">
        <Image image={_site.c_deskHeader}></Image>
      </span>
      <span className="block md:hidden">
        <Image image={_site.c_mobHeader}></Image>
      </span>

      <div>
        <div className="bg-white w-full mb-4 ">
          <div>
            {photoGallery && (
              <Banner
                headshot={""}
                img={photoGallery[0].image.url}
                name={name}
                mainPhone={mainPhone}
                address={address}
                title=""
              ></Banner>
            )}
            <div className="flex flex-col  md:flex-row  mt-16 gap-16 centered-container ">
              <div className="w-full md:w-2/3 flex flex-col gap-4">
                {c_richTextDescription && (
                  <LexicalRichText
                    serializedAST={JSON.stringify(c_richTextDescription.json)}
                    nodeClassNames={{
                      heading: {
                        h2: `text-4xl font-semibold m-0 mb-3 p-0`,
                        h3: `text-3xl font-normal m-0 mb-3 p-0`,
                        h4: `text-2xl font-normal m-0 mb-3 p-0`,
                      },
                      paragraph: `mt-2 text-lg font-light`,
                      list: {
                        ul: "p-0 m-0 ml-4 list-disc my-4",
                        ol: "p-0 m-0 ml-4, list-decimal",
                        listitem: "mx-8 my-0 text-lg font-light",
                      },
                      link: `text-[#006ac3] hover:underline hover:cursor-pointer hover:bg-[#e3f4ff]`,
                    }}
                  ></LexicalRichText>
                )}
              </div>
              <div className="w-full md:w-1/3">
                <span className=" hidden md:block">
                  <div className="  gap-y-5">
                    <div className="text-3xl font-normal m-0 mb-3 p-0 text-[#003168]">
                      We are located at
                    </div>
                    <div className=" p-4 bg-[#f3f4f5] gap-y-3 flex flex-col gap-2 text-[#006ac3]">
                      <div className="flex gap-2 items-center">
                        <div>
                          <IoMdPin className="h-6 w-6"></IoMdPin>
                        </div>
                        <div className="flex flex-col">
                          <div>{address.line1}</div>
                          {address.line2 && <div>{address.line2}</div>}
                          <div>
                            {address.city}, {address.region}{" "}
                            {address.postalCode}
                          </div>
                        </div>
                      </div>

                      {c_associatedAdvisors
                        .filter(
                          (item: any) => item.meta.entityType.id === "location"
                        )
                        .map((item: any, index: any) => (
                          <div className="flex gap-2 items-center" key={index}>
                            <div>
                              <IoMdPin className="h-6 w-6"></IoMdPin>
                            </div>
                            <div className="flex flex-col">
                              <div>{item.address.line1}</div>
                              {item.address.line2 && <div>{address.line2}</div>}
                              <div>
                                {item.address.city}, {item.address.region}{" "}
                                {item.address.postalCode}
                              </div>
                            </div>
                          </div>
                        ))}
                    </div>
                  </div>
                </span>

                <div className="flex flex-col gap-2 mt-8">
                  {c_associatedAdvisors && (
                    <>
                      <div className="text-3xl font-normal text-[#003168]">
                        Our Advisors
                      </div>
                      {c_associatedAdvisors
                        .filter(
                          (item: any) =>
                            item.meta.entityType.id === "financialProfessional"
                        )
                        .map((item: any, index: any) => (
                          <div key={index}>
                            <div className="flex gap-2 items-center">
                              <div>
                                {item.photoGallery ? (
                                  <img
                                    src={item.photoGallery[0].image.url}
                                    className="flex mx-auto w-20 flex-shrink-0 rounded-full"
                                  />
                                ) : (
                                  <img
                                    src={`https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRswQ6yRLM_0gnBNKav75aOHQm3UoX-zpgnICPNEgg4VA&s`}
                                    className="flex mx-auto  w-20 flex-shrink-0 rounded-full"
                                  />
                                )}
                              </div>
                              <div className="flex flex-col">
                                <div className="text-[#002750] text-2xl font-light">
                                  {item.name.split("-")[0]}
                                </div>
                                <div className="text-[#585858] text-lg font-light">
                                  {item.name.split("-")[1]}
                                </div>
                                <a
                                  href={`/${item.slug}`}
                                  className="w-fit text-center px-6 py-2 border-[#002750] border text-[#002750] bg-white"
                                >
                                  Know more
                                </a>
                              </div>
                            </div>

                            <hr className="h-8 mt-5" />
                          </div>
                        ))}
                    </>
                  )}

                  {c_associatedTeam && (
                    <>
                      <div className="text-3xl font-normal m-0 mb-3 p-0 text-[#003168]">
                        Our Teams
                      </div>
                      <div className="flex flex-col ">
                        {c_associatedTeam.map((item: any, index: any) => (
                          <div key={index}>
                            <div className="flex flex-col">
                              <div className="text-[#002750] text-2xl font-light">
                                {item.name}
                              </div>
                              <div className="text-[#585858] text-lg font-light">
                                {item.description}
                              </div>
                              <a
                                href={`/${item.slug}`}
                                className="w-fit text-center px-6 py-2 border-[#002750] border text-[#002750] bg-white mt-5"
                              >
                                Know more
                              </a>
                            </div>
                            <hr className="h-8 mt-5" />
                          </div>
                        ))}
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-4 mt-8">
            {c_associatedBlogs && <BlogPosts inpData={cpy}></BlogPosts>}
            {c_associatedClientStories && (
              <ClientStories
                inpData={cpy}
                title={"Client Stories"}
              ></ClientStories>
            )}
            {c_associatedInsights && <Insights inpData={cpy} />}
            {c_associatedSolutions && <Solutions inpData={cpy}></Solutions>}
            {c_professionalServicePlace && (
              <TeamMembersCarousel inpData={cpy}></TeamMembersCarousel>
            )}
          </div>
        </div>
      </div>
      <span className="hidden md:block mt-8">
        <Image image={_site.c_deskFooter}></Image>
      </span>
      <span className="block md:hidden">
        <Image image={_site.c_mobFooter}></Image>
      </span>
      {pathLink?.includes("preview") && (
        <a
          href={`https://sandbox.yext.com/s/3194448/entity/edit3?entityIds=${uid}`}
          className="border bg-gray-200 px-4 py-2 fixed bottom-10 right-10"
        >
          Edit
        </a>
      )}
    </>
  );
};

export default Team;
