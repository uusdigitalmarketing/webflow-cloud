import type { APIRoute } from "astro";
import { API } from "../../utils/api";

export const DELETE: APIRoute = async ({ request, locals }) => {
  try {
    API.init((locals.runtime as any).env.ORIGIN);

    const { key } = await request.json();

    if (!key) {
      return API.error("Missing file key", request, 400);
    }

    const bucket = locals.runtime.env.CLOUD_FILES;

    if (!bucket) {
      return API.error("Bucket not configured", request, 500);
    }

    await bucket.delete(key);

    return API.success(
      {
        success: true,
        message: "File deleted successfully",
      },
      request
    );
  } catch (error) {
    console.error(error);

    return API.error(
      "Failed to delete file",
      request,
      500
    );
  }
};