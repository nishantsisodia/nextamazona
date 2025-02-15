
import { connectToDatabase } from ".";
import Product from "./models/product.model";
import { cwd } from "process";
import { loadEnvConfig } from '@next/env'
import data from "@/lib/data";

loadEnvConfig(cwd())

const main = async () => {
    try {
        const { products } = data
        await connectToDatabase(process.env.MONGO_URI)
        await Product.deleteMany()
        const createdProducts = await Product.insertMany(products)
        console.log({
            createdProducts,
            message: "seeded database successfully"
        });
        process.exit(0)

    } catch (error) {
        console.error(error)
        throw new Error('Failed to seed Database')
    }
}

main()