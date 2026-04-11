import { getUserFromToken } from "@/app/lib/auth";

export async function GET(req) {
  try {
    const user = await getUserFromToken(req);

    return Response.json({
      message: "Protected route accessed",
      userId: user.id,
    });
  } catch (err) {
    return Response.json(
      { error: err.message },
      { status: 401 }
    );
  }
}