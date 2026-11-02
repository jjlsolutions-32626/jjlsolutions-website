/**
 * Cloudflare Pages Function: /api/reviews
 *
 * Fetches Facebook page reviews/ratings and returns them as JSON.
 * Caches responses for 24 hours to minimize API calls.
 *
 * Required environment variables (set in Cloudflare Pages dashboard):
 * - FB_PAGE_ID: Your Facebook Page ID
 * - FB_PAGE_TOKEN: Facebook Page Access Token with pages_read_engagement permission
 */

const CACHE_TTL = 86400; // 24 hours in seconds
const CACHE_KEY = 'fb-reviews-cache';

export async function onRequest(context) {
    const { env } = context;

    // CORS headers for the response
    const headers = {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Cache-Control': 'public, max-age=3600' // Browser cache 1 hour
    };

    try {
        // Check for required environment variables
        const pageId = env.FB_PAGE_ID;
        const accessToken = env.FB_PAGE_TOKEN;

        if (!pageId || !accessToken) {
            console.error('Missing FB_PAGE_ID or FB_PAGE_TOKEN environment variables');
            return new Response(JSON.stringify([]), { headers });
        }

        // Try to get cached response from KV (if available)
        let cachedData = null;
        if (env.REVIEWS_CACHE) {
            try {
                cachedData = await env.REVIEWS_CACHE.get(CACHE_KEY, { type: 'json' });
                if (cachedData) {
                    return new Response(JSON.stringify(cachedData), { headers });
                }
            } catch (e) {
                console.error('KV cache read error:', e);
            }
        }

        // Fetch from Facebook Graph API
        const fbUrl = new URL(`https://graph.facebook.com/v18.0/${pageId}/ratings`);
        fbUrl.searchParams.set('fields', 'reviewer{name},review_text,recommendation_type,created_time');
        fbUrl.searchParams.set('access_token', accessToken);
        fbUrl.searchParams.set('limit', '25');

        const fbResponse = await fetch(fbUrl.toString());

        if (!fbResponse.ok) {
            const errorText = await fbResponse.text();
            console.error('Facebook API error:', fbResponse.status, errorText);

            // Return cached data if available, otherwise empty array
            if (cachedData) {
                return new Response(JSON.stringify(cachedData), { headers });
            }
            return new Response(JSON.stringify([]), { headers });
        }

        const fbData = await fbResponse.json();

        // Transform and filter reviews (only those with text)
        const reviews = (fbData.data || [])
            .filter(r => r.review_text && r.review_text.trim().length > 0)
            .map(r => ({
                name: r.reviewer?.name || 'Facebook User',
                text: r.review_text,
                recommendation_type: r.recommendation_type || null,
                date: r.created_time
            }))
            .sort((a, b) => new Date(b.date) - new Date(a.date)); // Newest first

        // Cache the result in KV (if available)
        if (env.REVIEWS_CACHE) {
            try {
                await env.REVIEWS_CACHE.put(CACHE_KEY, JSON.stringify(reviews), {
                    expirationTtl: CACHE_TTL
                });
            } catch (e) {
                console.error('KV cache write error:', e);
            }
        }

        return new Response(JSON.stringify(reviews), { headers });

    } catch (error) {
        console.error('Reviews API error:', error);

        // Return empty array on any error - never expose error details
        return new Response(JSON.stringify([]), { headers });
    }
}
