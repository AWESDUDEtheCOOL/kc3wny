import fs from "fs"
import path from "path"

export async function GET(req) {
  try {
    const imagesDirectory = path.join(process.cwd(), "public", "images")
    const files = await fs.promises.readdir(imagesDirectory)

    // Filter out non-image files (you can add more image extensions if needed)
    const imageFiles = files.filter(file => /\.(jpg|jpeg|png|gif|bmp|tiff)$/i.test(file))

    // Return the image file names
    return new Response(JSON.stringify(imageFiles), {
      headers: {
        "Content-Type": "application/json"
      }
    })
  } catch (error) {
    console.error("Error reading images:", error)
    return new Response(JSON.stringify({ error: "Failed to load images" }), {
      status: 500,
      headers: {
        "Content-Type": "application/json"
      }
    })
  }
}
