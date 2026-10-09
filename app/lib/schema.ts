import { PERSON, SITE } from "./site";

/** The one Person entity for the site. Referenced by @id from the Organization, embedded whole on /about. */
export const PERSON_LD = {
  "@context": "https://schema.org",
  "@type": "Person",
  "@id": `${SITE.url}/about#person`,
  name: PERSON.name,
  givenName: PERSON.givenName,
  familyName: PERSON.familyName,
  jobTitle: PERSON.jobTitle,
  description: PERSON.bio,
  url: `${SITE.url}/about`,
  mainEntityOfPage: `${SITE.url}/about`,
  email: SITE.email,
  worksFor: { "@id": `${SITE.url}/#organization` },
  knowsAbout: PERSON.knowsAbout,
  hasOccupation: { "@type": "Occupation", name: "AI engineer", occupationLocation: { "@type": "City", name: SITE.locality } },
  ...(PERSON.image
    ? {
        image: {
          "@type": "ImageObject",
          "@id": `${SITE.url}/about#photo`,
          contentUrl: `${SITE.url}${PERSON.image}`,
          url: `${SITE.url}${PERSON.image}`,
          width: PERSON.imageWidth,
          height: PERSON.imageHeight,
          caption: `${PERSON.name}, ${PERSON.jobTitle} in ${SITE.locality}`,
          representativeOfPage: true,
        },
      }
    : {}),
  address: { "@type": "PostalAddress", addressLocality: SITE.locality, addressCountry: SITE.country },
  sameAs: [SITE.github, SITE.linkedin].filter(Boolean),
};
