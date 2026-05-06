
export async function getPageSettings() {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/page-settings`, {
      cache: 'no-store' // Ensure we get fresh data
    });
    if (!res.ok) return [];
    return res.json();
  } catch (error) {
    console.error("Failed to fetch page settings:", error);
    return [];
  }
}

export async function getpageData($slug:string) {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/content-pages/${$slug}`, {
      cache: 'no-store'
    });
    if (!res.ok) return null;
    return res.json();
  } catch (error) {
    console.error("Failed to fetch page data:", error);
    return null;
  }
}

export async function getBlogs(category?: string) {
  try {
    const url = category 
      ? `${process.env.NEXT_PUBLIC_BASE_URL}/blogs?category=${category}`
      : `${process.env.NEXT_PUBLIC_BASE_URL}/blogs`;
    const res = await fetch(url, { cache: 'no-store' });
    if (!res.ok) return [];
    return res.json();
  } catch (error) {
    console.error("Failed to fetch blogs:", error);
    return [];
  }
}

export async function getBlogBySlug(slug: string) {
  try {
    const url = `${process.env.NEXT_PUBLIC_BASE_URL}/blogs/${slug}`;
    console.log(`[API] Fetching blog post from: ${url}`);
    
    const res = await fetch(url, {
      cache: 'no-store'
    });
    
    if (!res.ok) {
      console.warn(`[API] Failed to fetch blog post. Status: ${res.status} for URL: ${url}`);
      return null;
    }
    
    return res.json();
  } catch (error) {
    console.error("[API] Error fetching blog post:", error);
    return null;
  }
}

export async function getFeaturedBlogs() {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/featured-blogs`, {
      cache: 'no-store'
    });
    if (!res.ok) return [];
    return res.json();
  } catch (error) {
    console.error("Failed to fetch featured blogs:", error);
    return [];
  }
}

export async function getServices() {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/services`, {
      cache: 'no-store'
    });
    if (!res.ok) return [];
    return res.json();
  } catch (error) {
    console.error("Failed to fetch services:", error);
    return [];
  }
}

export async function getServiceBySlug(slug: string) {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/services/${slug}`, {
      cache: 'no-store'
    });
    if (!res.ok) return null;
    return res.json();
  } catch (error) {
    console.error(`Failed to fetch service by slug ${slug}:`, error);
    return null;
  }
}

export async function getProjects() {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/projects`, {
      cache: 'no-store'
    });
    if (!res.ok) return [];
    return res.json();
  } catch (error) {
    console.error("Failed to fetch projects:", error);
    return [];
  }
}

export async function getProjectBySlug(slug: string) {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/projects/${slug}`, {
      cache: 'no-store'
    });
    if (!res.ok) return null;
    return res.json();
  } catch (error) {
    console.error("Failed to fetch project by slug:", error);
    return null;
  }
}

export function getImageUrl(path: string | null | undefined) {
  if (!path) return "";
  if (path.startsWith("http") || path.startsWith("data:")) return path;
  
  // If it's a frontend asset (starts with /assets), return as is
  if (path.startsWith("/assets")) return path;

  // Get base URL from env, ensuring no trailing slash
  const envBaseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:8000/api";
  const serverUrl = envBaseUrl.replace("/api", "").replace(/\/$/, "");
  
  // Ensure path starts with a single slash
  const cleanPath = path.startsWith("/") ? path : `/${path}`;
  
  return `${serverUrl}${cleanPath}`;
}

export async function getClientsArea() {
  try {
    const url = `${process.env.NEXT_PUBLIC_BASE_URL}/client-area`;
      
    const res = await fetch(url, { cache: "no-store" });

    if (!res.ok) return [];
    return res.json();
  } catch (error) {
    console.error("Failed to fetch client area:", error);
    return [];
  }
}
