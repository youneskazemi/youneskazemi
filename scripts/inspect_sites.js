async function inspect(url) {
  try {
    console.log(`\n=== Inspecting ${url} ===`);
    const res = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
      }
    });
    const html = await res.text();
    const titleMatch = html.match(/<title[^>]*>([^<]+)<\/title>/i);
    const descMatch = html.match(/<meta[^>]*name=["']description["'][^>]*content=["']([^"']+)["']/i) ||
                      html.match(/<meta[^>]*content=["']([^"']+)["'][^>]*name=["']description["']/i);
    const ogTitle = html.match(/<meta[^>]*property=["']og:title["'][^>]*content=["']([^"']+)["']/i);
    const ogDesc = html.match(/<meta[^>]*property=["']og:description["'][^>]*content=["']([^"']+)["']/i);
    const manifest = html.match(/<link[^>]*rel=["']manifest["'][^>]*href=["']([^"']+)["']/i);

    console.log('Status:', res.status);
    console.log('Title:', titleMatch ? titleMatch[1].trim() : 'N/A');
    console.log('Description:', descMatch ? descMatch[1].trim() : 'N/A');
    console.log('OG Title:', ogTitle ? ogTitle[1].trim() : 'N/A');
    console.log('OG Desc:', ogDesc ? ogDesc[1].trim() : 'N/A');
    console.log('Manifest:', manifest ? manifest[1] : 'None');

    // Extract headings (h1, h2)
    const h1s = [...html.matchAll(/<h1[^>]*>([\s\S]*?)<\/h1>/gi)].map(m => m[1].replace(/<[^>]+>/g, '').trim()).filter(Boolean);
    const h2s = [...html.matchAll(/<h2[^>]*>([\s\S]*?)<\/h2>/gi)].map(m => m[1].replace(/<[^>]+>/g, '').trim()).filter(Boolean);
    console.log('H1s:', h1s.slice(0, 5));
    console.log('H2s:', h2s.slice(0, 8));
  } catch (e) {
    console.error(`Error inspecting ${url}:`, e.message);
  }
}

async function run() {
  await inspect('https://sorkhdan.ir');
  await inspect('https://ekramshop.com');
  await inspect('https://latorin.ir');
  await inspect('https://jrfit.ir');
}

run();
