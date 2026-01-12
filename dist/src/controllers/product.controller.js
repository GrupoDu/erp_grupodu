import { prisma } from "../../lib/prisma.js";
class ProductController {
    async getAllProducts(req, res) {
        try {
            const allProducts = await prisma.produtos.findMany({
                where: {
                    product_type: "carro de mão",
                },
            });
            return res.status(200).json(allProducts);
        }
        catch (err) {
            return res.status(500).json({
                message: "Houve um erro de conexão",
                error: err.message,
            });
        }
    }
}
export default ProductController;
//# sourceMappingURL=product.controller.js.map