const SITE_URL = "https://mdsabbir.dev";
const DEFAULT_IMAGE = "/assets/images/banner/banner-user-image-04.png";

export const DEFAULT_OG_IMAGE = {
  url: `${SITE_URL}${DEFAULT_IMAGE}`,
  width: 525,
  height: 525,
  alt: "Md Sabbir Hossain - Full Stack Developer",
};

export function generateOGMetadata({
  title,
  description,
  url,
  type = "website",
  image = DEFAULT_OG_IMAGE,
  canonicalUrl,
  authors = ["Md Sabbir Hossain"],
  publishedTime,
  modifiedTime,
  tags = [],
  twitterCreator = "@sabbir1054",
}) {
  const imageArray = Array.isArray(image) ? image : [image];

  const ogData = {
    type,
    locale: "en_US",
    url: url || SITE_URL,
    siteName: "mdsabbir.dev",
    title,
    description,
    images: imageArray,
  };

  if (type === "article") {
    ogData.authors = authors;
    if (publishedTime) ogData.publishedTime = publishedTime;
    if (modifiedTime) ogData.modifiedTime = modifiedTime;
    if (tags.length > 0) ogData.tags = tags;
  }

  return {
    title,
    description,
    alternates: {
      canonical: canonicalUrl || url?.replace(SITE_URL, "") || "/",
    },
    openGraph: ogData,
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: imageArray.map((img) => (typeof img === "string" ? img : img.url)),
      ...(twitterCreator && { creator: twitterCreator }),
    },
  };
}

export function getFullImageUrl(imageSrc) {
  if (!imageSrc) return `${SITE_URL}${DEFAULT_IMAGE}`;
  if (imageSrc.startsWith("http")) return imageSrc;
  return `${SITE_URL}${imageSrc}`;
}

export function getArticleOGImage(imageSrc = null) {
  const url = getFullImageUrl(imageSrc);
  return {
    url,
    width: 1200,
    height: 630,
    alt: "Article image",
  };
}

export function getWebsiteOGImage(imageSrc = null) {
  const url = getFullImageUrl(imageSrc);
  return {
    url,
    width: 525,
    height: 525,
    alt: "Md Sabbir Hossain - Full Stack Developer",
  };
}

export const SITE_URL_CONST = SITE_URL;
