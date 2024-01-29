/**
 * This is an example of how to create a template that makes use of streams data.
 * The stream data originates from Yext's Knowledge Graph. When a template in
 * concert with a stream is built by the Yext Sites system, a static html page
 * is generated for every corresponding (based on the filter) stream document.
 *
 * Another way to think about it is that a page will be generated using this
 * template for every eligible entity in your Knowledge Graph.
 */

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
import { LexicalRichText } from "@yext/react-components";
import * as React from "react";
import { useEffect, useState } from "react";
import { EnumData } from "../components/EnumData";
import PhotoCarousel from "../components/PhotoCarousel";
import ServiceAreaMap from "../components/ServiceAreaMap";
import TeamCarousel from "../components/TeamCarousel";
import Banner from "../components/banner";
import ClientStories from "../components/clientStories";
import FAQs from "../components/faqs";
import Hours from "../components/hours";
import PageLayout from "../components/page-layout";
import BlogPosts from "../components/relatedBlogs";
import Insights from "../components/relatedInsights";
import Solutions from "../components/solutions";
import StaticMap from "../components/static-map";
import "../index.css";
import {
  C_awardsDashboard,
  C_clientFocuses,
  C_designations,
  C_hobbiesAndInterests,
  C_serviceAreas,
} from "../types/financial_professionals";

/**
 * Required when Knowledge Graph data is used for a template.
 */
export const config: TemplateConfig = {
  stream: {
    $id: "my-stream-id-1",
    // Specifies the exact data that each generated document will contain. This data is passed in
    // directly as props to the default exported function.
    fields: [
      "slug",
      "id",
      "name",
      "uid",
      "meta",
      "c_attestation",
      "c_advisorNickname",
      "c_recognitionTitle",
      "c_jobTitle",
      "c_jobTitleAbbreviation",
      "c_titleDisplay",
      "c_clientFocuses",
      "c_aboutAdvisorShortDescription",
      "c_expertiseCommentsRTv2",
      "c_expertiseComments",
      "c_profileDelegates.delegateEmail",
      "c_profileDelegates.delegateUserID",
      "c_profileDelegates.giveProfileControl",
      "c_associatedInsights.id",
      "c_languagesV2",
      "photoGallery",
      "emails",
      "hours",
      "mainPhone",
      "address",
      "headshot",

      "addressHidden",
      "c_inGoodStanding",

      "c_registrations",
      "c_educationDisplay.degree",
      "c_educationDisplay.school",
      "c_volunteeringDisplay",
      "c_organizationsDisplay",
      "c_awardsDashboard.nameOfAwardOrHonor",
      "c_awardsDashboard.yearsReceived",
      "c_industryLevelOfExperience",
      "c_designations.abbreviation",
      "c_designations.date",
      "c_designations.name",
      "c_hobbiesAndInterests",
      "c_fAQs.answer",
      "c_fAQs.question",
      "c_assetRanges",
      "c_meetingPreference",
      "c_preferredFirstName",
      "c_meetingPlacePreference",
      "c_inTouchPreference",
      "c_conversationPreference",
      "c_conversationFocus",
      "c_meetingTime",
      "c_disagreements",
      "c_recommendations",
      "c_charts",
      "c_introvertedOrExtroverted",
      "c_planning",
      "c_laidBack",
      "c_homeRepairs",
      "c_photoGallery.alternateText",
      "c_photoGallery.height",
      "c_photoGallery.url",
      "c_photoGallery.width",
      "c_matchFinderPhoto.alternateText",
      "c_matchFinderPhoto.height",
      "c_matchFinderPhoto.url",
      "c_matchFinderPhoto.width",
      "c_taskGroups",
      "c_teamMembers.name",
      "c_teamMembers.c_jobTitle",
      "c_teamMembers.slug",
      "c_teamMembers.photoGallery",
      "c_UpcomingEvents.name",
      "c_UpcomingEvents.id",
      "c_UpcomingEvents.photoGallery",
      "c_UpcomingEvents.time",
      "c_color",
      "c_fonts",
      "c_heroBanner",
      "c_template",
      "geocodedCoordinate",
      "c_teamDescriptionRTv2",
      "c_teamName",
      "c_serviceAreas",
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
      "c_associatedFAQs.answer",
      "c_associatedFAQs.question",
      "yearsOfExperience",
    ],
    // Defines the scope of entities that qualify for this stream.
    filter: {
      entityTypes: ["financialProfessional"],
      entityIds: ["4635269"],
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
const Professional: Template<TemplateRenderProps> = ({
  relativePrefixToRoot,
  path,
  document,
}) => {
  const cpy = document;
  const {
    _site,
    c_preferredFirstName,
    c_heroBanner,
    c_aboutAdvisorShortDescription,
    c_expertiseCommentsRTv2,
    c_hobbiesAndInterests,
    c_clientFocuses,
    c_languagesV2,
    geocodedCoordinate,
    c_fonts,
    c_educationDisplay,
    c_organizationsDisplay,
    c_designations,
    c_awardsDashboard,
    c_teamName,
    c_teamDescriptionRTv2,
    c_teamMembers,
    c_serviceAreas,
    c_associatedClientStories,
    c_associatedFAQs,
    c_associatedInsights,
    c_associatedSolutions,
    yearsOfExperience,
    c_template,
    c_associatedBlogs,
    c_UpcomingEvents,
    name,
    mainPhone,
    photoGallery,
    hours,
    address,
  } = document;
  const [pathLink, setPathLink] = useState<string>();
  useEffect(() => {
    if (typeof window === "object") {
      setPathLink(window.location.href);
    }
  }, []);

  return (
    <PageLayout _site={_site}>
      <div
        className={`bg-white py-16`}
        style={{
          fontFamily: c_fonts && c_fonts.toLowerCase().replaceAll(" ", ""),
        }}
      >
        <Banner
          headshot={photoGallery[0]}
          bannerImg={c_heroBanner}
          name={name.split("-")[0]}
          mainPhone={mainPhone}
          title={name.split("-")[1]}
        ></Banner>
        <div className="centered-container flex flex-col gap-4 text-[#252525]">
          {c_template !== "HORIZON" ? (
            <div className="centered-container my-4">
              <div className="flex w-full justify-evenly items-center">
                <div className=" ">
                  <div className="flex flex-col gap-2 ">
                    <div className="gap-y-8">
                      <div className="text-xl font-semibold mb-4">Address</div>
                      <div className=" gap-y-3">
                        <div>{address.line1}</div>
                        {address.line2 && <div>{address.line2}</div>}
                        <div>
                          {address.city}, {address.region} {address.postalCode}
                        </div>
                      </div>
                      <div className="w-fit mt-4 text-sm hover:border-b bg-[#025cae] text-white py-2 px-4 rounded-full font-bold border hover:cursor-pointer hover:border-[#d62211] hover:bg-white hover:text-[#d62211]">
                        Get Directions
                      </div>
                    </div>
                    <div></div>
                  </div>
                </div>
                <div className="w-1/3">
                  {geocodedCoordinate && (
                    <StaticMap
                      latitude={geocodedCoordinate.latitude}
                      longitude={geocodedCoordinate.longitude}
                    ></StaticMap>
                  )}
                </div>
                <div className=" ">
                  {hours && (
                    <div className="mt-2 !text-sm">
                      {JSON.stringify(hours) !== "{}" && (
                        <Hours title={"I'm available on"} hours={hours} />
                      )}
                    </div>
                  )}
                  {c_UpcomingEvents && (
                    <div className="flex flex-col gap-2 mt-8">
                      <div className="font-bold">Upcoming Events</div>
                      {c_UpcomingEvents.map((item, index) => (
                        <div key={index}>
                          {item.name} at{" "}
                          {new Date(item.time.start).toLocaleDateString(
                            "en-US"
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
              <div className="flex flex-col gap-2 my-4 mb-8">
                <div className="text-xl font-semibold ">About me</div>
                <div className="">{c_aboutAdvisorShortDescription}</div>
              </div>
            </div>
          ) : (
            <div className="w-full flex  flex-row gap-14 mt-4 centered-container">
              <div className="w-full md:w-2/3 ">
                <div className="text-xl font-semibold ">About me</div>
                <div className="">{c_aboutAdvisorShortDescription}</div>
                <div className="py-4 px-16 mx-auto my-auto hidden md:block  h-3/4 w-3/4">
                  {geocodedCoordinate && (
                    <StaticMap
                      latitude={geocodedCoordinate.latitude}
                      longitude={geocodedCoordinate.longitude}
                    ></StaticMap>
                  )}
                </div>
              </div>
              <div className="w-full md:w-1/3">
                <span className=" hidden md:block">
                  <div className="gap-y-5">
                    <div className="text-xl font-semibold mb-4">Address</div>
                    <div className="  gap-y-3">
                      <div>{address.line1}</div>
                      {address.line2 && <div>{address.line2}</div>}
                      <div>
                        {address.city}, {address.region} {address.postalCode}
                      </div>
                    </div>
                  </div>
                </span>
                {hours && (
                  <div className="mt-8">
                    {JSON.stringify(hours) !== "{}" && (
                      <Hours title={"I'm available on"} hours={hours} />
                    )}
                  </div>
                )}

                {c_UpcomingEvents && (
                  <div className="flex flex-col gap-2 mt-8">
                    <div className="font-bold">Upcoming Events</div>
                    {c_UpcomingEvents.map((item, index) => (
                      <div key={index}>
                        {item.name} at{" "}
                        {new Date(item.time.start).toLocaleDateString("en-US")}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
        <div className="centered-container flex flex-col gap-4 text-[#252525]">
          <div className="flex gap-4 mt-4 px-8">
            <div className="flex flex-col gap-2 w-4/5  text-[#252525]">
              <div className="flex w-full justify-between border-t pt-4 px-8">
                <div className=" flex flex-col gap-6">
                  <div className="flex flex-col gap-1">
                    <div className="font-semibold text-lg">Experience</div>
                    <div className=" font-light">{yearsOfExperience} years</div>
                  </div>
                  {c_languagesV2 && (
                    <div className="flex flex-col gap-1">
                      <div className="font-semibold text-lg">Languages</div>
                      <div className="flex flex-col font-light">
                        {c_languagesV2.map((item, index) => (
                          <div key={index}>{item}</div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
                <div className=" flex flex-col gap-6">
                  {c_educationDisplay && (
                    <div className="flex flex-col gap-1">
                      <div className="font-semibold text-lg">Education</div>
                      <div className="flex flex-col font-light">
                        {c_educationDisplay.map((item, index) => (
                          <div key={index}>
                            {item.degree}, {item.school}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
                {c_clientFocuses && (
                  <div className=" flex flex-col gap-6">
                    <div className="flex flex-col gap-1">
                      <div className="font-semibold text-lg">
                        Client Focuses
                      </div>
                      <div className="flex flex-col font-light">
                        {c_clientFocuses.map((item, index) => (
                          <div key={item}>{C_clientFocuses[item]}</div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full !bg-[#025cae] !text-white ">
        <div className="flex flex-col gap-2 p-4 py-16 centered-container">
          <div className="text-xl font-semibold">
            More about {c_preferredFirstName}!
          </div>
          <div>
            <LexicalRichText
              serializedAST={JSON.stringify(c_expertiseCommentsRTv2.json)}
            />
          </div>
          <PhotoCarousel data={photoGallery}></PhotoCarousel>
        </div>
      </div>
      <div className="w-full bg-white text-[#252525]">
        <div className="flex justify-between max-w-screen-2xl mx-auto p-16 py-10">
          <div className="w-1/3 px-4 flex flex-col gap-6">
            {c_organizationsDisplay && (
              <div className="flex flex-col gap-2">
                <div className="flex flex-col gap-1">
                  <div className="font-semibold text-lg">Organizations</div>
                  <div className="flex flex-col font-light">
                    {c_organizationsDisplay.map(
                      (item: string, index: number) => (
                        <div key={index}>{item}</div>
                      )
                    )}
                  </div>
                </div>
              </div>
            )}
            {c_designations && (
              <div className="flex flex-col gap-2">
                <div className="flex flex-col gap-1">
                  <div className="font-semibold text-lg">Designations</div>
                  <div className="flex flex-col font-light">
                    {c_designations.map(
                      (item: C_designations, index: number) => (
                        <div key={index}>
                          {item.name}{" "}
                          {item.abbreviation && `(${item.abbreviation})`} -{" "}
                          {item.date.toLocaleString("en-US")}
                        </div>
                      )
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
          <div className="flex px-4 w-1/3 flex-col gap-6">
            {c_clientFocuses && (
              <div className="flex flex-col gap-1">
                <div className="font-semibold text-lg">
                  Volunteer Experience
                </div>
                <div className="flex flex-col font-light">
                  {c_clientFocuses.map((item, index) => (
                    <div key={item}>{EnumData[item]}</div>
                  ))}
                </div>
              </div>
            )}
            {c_awardsDashboard && (
              <div className="flex flex-col gap-2">
                <div className="flex flex-col gap-1">
                  <div className="font-semibold text-lg">Awards</div>
                  <div className="flex flex-col font-light">
                    {c_awardsDashboard.map(
                      (item: C_awardsDashboard, index: number) => (
                        <div key={index}>
                          {item.nameOfAwardOrHonor} -{" "}
                          {item.yearsReceived?.sort((a, b) => a - b).join(", ")}
                        </div>
                      )
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
          {c_hobbiesAndInterests && (
            <div className="flex px-4 w-1/3 flex-col gap-6">
              <div className="flex flex-col gap-1">
                <div className="font-semibold text-lg">Hobbies & Interests</div>
                <div className="flex flex-col font-light">
                  {c_hobbiesAndInterests.map((item, index) => (
                    <div key={index}>{C_hobbiesAndInterests[item]}</div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      <div className="flex flex-col ">
        {c_associatedClientStories && (
          <ClientStories inpData={cpy}></ClientStories>
        )}
        {c_associatedInsights && <Insights inpData={cpy} />}
        {c_associatedFAQs && <FAQs inpData={cpy}></FAQs>}
        {c_associatedSolutions && <Solutions inpData={cpy}></Solutions>}
        {c_associatedBlogs && <BlogPosts inpData={cpy}></BlogPosts>}
      </div>
      {c_serviceAreas && (
        <div className="w-full bg-white ">
          <div className=" flex justify-between px-4 py-8 centered-container">
            <div className="w-1/2 flex justify-between items-center">
              {c_preferredFirstName} is based out of {address.city},
              {address.region}, but is licensed in the following states:{" "}
              {c_serviceAreas
                .map((item, index) => C_serviceAreas[item])
                .join(", ")}
            </div>
            <div className="w-1/2">
              <ServiceAreaMap data={c_serviceAreas} />
            </div>
          </div>
        </div>
      )}
      <div className="!bg-[#025cae] !text-white">
        {c_teamName && c_teamMembers && (
          <div className=" bg-[#f7f0e4] teamCarousel">
            <TeamCarousel
              teamName={c_teamName}
              teamMembersData={c_teamMembers}
              teamDescription={c_teamDescriptionRTv2}
            ></TeamCarousel>
          </div>
        )}
      </div>
    </PageLayout>
  );
};

export default Professional;
