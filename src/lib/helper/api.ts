
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
    console.error("Failed to fetch homepage data:", error);
    return null;
  }
}

export function getImageUrl(path: string | null | undefined) {
  if (!path) return "";
  if (path.startsWith("http") || path.startsWith("data:")) return path;
  
  // Get base URL from env, ensuring no trailing slash
  const envBaseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:8000/api";
  const serverUrl = envBaseUrl.replace("/api", "").replace(/\/$/, "");
  
  // Ensure path starts with a single slash
  const cleanPath = path.startsWith("/") ? path : `/${path}`;
  
  return `${serverUrl}${cleanPath}`;
}
