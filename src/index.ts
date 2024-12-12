import express from "express"
import path from "path"
import productRoutes from "./routes/productRoutes"


const app = express()

app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.use("/uploads", express.static(path.join(__dirname, "../uploads")))

app.use("/api/v1/products", productRoutes)

const PORT = process.env.PORT || 3000
app.listen(PORT, ()=> {
  console.log(`Server running on port ${PORT}`)
})