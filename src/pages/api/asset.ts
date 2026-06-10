import type { APIRoute } from "astro";

export const GET: APIRoute = async ({ request, locals }) => {
  // Get the key from the request
  const url = new URL(request.url);
  const key = url.searchParams.get("key");
  if (!key) {
    return new Response("Missing key", { status: 400 });
  }

  // Get the object from the bucket
  const bucket = locals.runtime.env.CLOUD_FILES;
  const object = await bucket.get(key as string);
  if (!object) {
    return new Response("Not found", { status: 404 });
  }

  // Get the data from the object and return it
  const data = await object.arrayBuffer();
  const contentType = object.httpMetadata?.contentType ?? "";

  return new Response(data, {
    headers: {
      "Content-Type": contentType,
    },
  });
};
