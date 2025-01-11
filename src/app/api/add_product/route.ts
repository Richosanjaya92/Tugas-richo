import { connectMongoDB } from "@/libs/MongoConnect";
import Product from "@/libs/models/Product";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    console.log("body : ", body);
    const { imgSrc, fileKey, name, category, price } = body;

    await connectMongoDB();

    const data = await Product.create({
      imgSrc,
      fileKey,
      name,
      category,
      price,
    });

    console.log(data);

    return NextResponse.json({ msg: "Product added Successfully", data });
  } catch (error) {
    console.log("ini err:", error);
    return NextResponse.json(
      {
        error,
        msg: "Something went wrong",
      },
      { status: 400 }
    );
  }
}
