import { NextRequest } from "next/server"
import { GetObjectCommand } from "@aws-sdk/client-s3"
import { s3 } from "@/lib/storage/s3"

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ key: string }> } // Explicitly state params is a Promise
) {
  const { key } = await params

  console.log("S3 Endpoint:", process.env.S3_ENDPOINT);
  console.log("Attempting to get Key:", key);
  
  try {
    const res = await s3.send(
      new GetObjectCommand({
        Bucket: process.env.S3_BUCKET!,
        Key: key,
      })
    )
    return new Response(res.Body as ReadableStream, {
      headers: {
        "Content-Type": res.ContentType || "application/octet-stream",
        "Cache-Control": "public, max-age=31536000, immutable",
      },
    })
  } catch(err) {
    console.error("Can't get image from s3!",err)
    return new Response("Error!", {status: 500})
  }

}