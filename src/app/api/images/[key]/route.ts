import { NextRequest } from "next/server"
import { S3Client, GetObjectCommand } from "@aws-sdk/client-s3"
import { s3 } from "@/entities/card/s3"
// import { s3 } from "@/entities/card/s3"

// const s3 = new S3Client({
//   region: "garage",
//   endpoint: process.env.S3_ENDPOINT,
//   credentials: {
//     accessKeyId: process.env.S3_KEY!,
//     secretAccessKey: process.env.S3_SECRET!,
//   },
// })

export async function GET(
  req: NextRequest,
  { params }: { params: { key: string } }
) {
  const { key } = await params

  console.log("S3 Endpoint:", process.env.S3_ENDPOINT);
  console.log("Attempting to get Key:", "cover_15568249");
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

}