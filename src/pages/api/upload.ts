import type { APIRoute } from "astro";
import { API } from "../../utils/api";

export const POST: APIRoute = async ({ request, locals }) => {
  // Set the origin for the API
  API.init((locals.runtime as any).env.ORIGIN);

  // Handle CORS preflight requests
  if (request.method === "OPTIONS") {
    console.log("CORS preflight request from:", request.headers.get("Origin"));
    return API.cors(request);
  }

  try {
    // Check if bucket is available
    const bucket = locals.runtime.env.CLOUD_FILES;
    if (!bucket) {
      return API.error("Cloud storage not configured", request, 500);
    }

    const formData = await request.formData();
    const file = formData.get("file");

    if (!file || !(file instanceof File)) {
      return API.error("Missing or invalid file", request, 400);
    }

    // Generate unique filename with timestamp
    const timestamp = Date.now();
    const extension = file.name.split(".").pop() || "";
    const filename = `${timestamp}-${file.name}.${extension}`;

    // Upload to R2 bucket
    const object = await bucket.put(filename, file, {
      httpMetadata: {
        contentType: file.type,
      },
    });

    if (!object) {
      return API.error("Failed to upload file", request, 500);
    }

    return API.success(
      {
        success: true,
        filename,
        key: object.key,
        size: file.size,
        type: file.type,
      },
      request
    );
  } catch (error) {
    console.error("Upload error:", error);
    return API.error("Upload failed", request, 500);
  }
};
