
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
