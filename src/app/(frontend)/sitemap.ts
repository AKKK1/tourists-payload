import type { MetadataRoute } from "next"

const routes = ["","/packages","/destinations","/about","/blog","/faq","/booking","/gallery","/why-georgia","/ranch"]

export default function sitemap(): MetadataRoute.Sitemap {
  return routes.map((route) => ({
    url: `https://www.georgiasoul.travel${route}`,
    lastModified: new Date(),
    changeFrequency: route === "" ? "weekly" : "monthly",
    priority: route === "" ? 1 : 0.8,
  }))
}
