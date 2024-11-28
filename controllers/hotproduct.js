class HotProductController {
    static async getHotProducts(req, res, next) {
        try {
            const hotProducts = await HotProduct.findAll();
            res.status(200).json(hotProducts);
            next();
        } catch (error) {
            res.status(404).json({ message: "Hot products not found" });
            next(error);
        }
    }

    static async getHotProduct(req, res, next) {
        try {
            const { id } = req.params;
            const hotProduct = await HotProduct.findByPk(id);
            if (!hotProduct) {
                return res.status(404).json({ message: "Hot product not found" });
            }
            res.status(200).json(hotProduct);
        } catch (error) {
            next(error);
        }
    }

    static async createHotProduct(req, res, next) {
        try {
            const hotProduct = await HotProduct.create(req.body);
            res.status(201).json(hotProduct);
        } catch (error) {
            next(error);
        }
    }

    static async updateHotProduct(req, res, next) {
        try {
            const { id } = req.params;
            const hotProduct = await HotProduct.findByPk(id);
            if (!hotProduct) {
                return res.status(404).json({ message: "Hot product not found" });
            }
            await hotProduct.update(req.body);
            res.status(200).json(hotProduct);
        } catch (error) {
            next(error);
        }
    }

    static async deleteHotProduct(req, res, next) {
        try {
            const { id } = req.params;
            const hotProduct = await HotProduct.findByPk(id);
            if (!hotProduct) {
                return res.status(404).json({ message: "Hot product not found" });
            }
            await hotProduct.destroy();
            res.status(204).json();
        } catch (error) {
            next(error);
        }
    }
}