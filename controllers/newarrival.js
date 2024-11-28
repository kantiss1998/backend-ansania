class NewArrivalController {
  static async getNewArrivals(req, res, next) {
    try {
      const newArrivals = await Product.findAll({
        order: [["createdAt", "DESC"]],
        limit: 10,
      });
      res.status(200).json(newArrivals);
    } catch (error) {
      res.status(404).json({ message: "New arrivals not found" });
      next(error);
    }
  }

  static async getNewArrival(req, res, next) {
    try {
      const { id } = req.params;
      const newArrival = await Product.findByPk(id);
      if (!newArrival) {
        return res.status(404).json({ message: "New arrival not found" });
      }
      res.status(200).json(newArrival);
    } catch (error) {
      res.status(500).json({ message: "Error retrieving new arrival" });
      next(error);
    }
  }

  static async createNewArrival(req, res, next) {
    try {
      const newArrival = await Product.create(req.body);
      res.status(201).json(newArrival);
    } catch (error) {
      if (error.name === "SequelizeValidationError") {
        return res.status(400).json({ message: error.errors[0].message });
      }
      next(error);
    }
  }

  static async updateNewArrival(req, res, next) {
    try {
      const { id } = req.params;
      const newArrival = await Product.findByPk(id);
      if (!newArrival) {
        return res.status(404).json({ message: "New arrival not found" });
      }
      await newArrival.update(req.body);
      res.status(200).json(newArrival);
    } catch (error) {
      if (error.name === "SequelizeValidationError") {
        return res.status(400).json({ message: error.errors[0].message });
      }
      next(error);
    }
  }

  static async deleteNewArrival(req, res, next) {
    try {
      const { id } = req.params;
      const newArrival = await Product.findByPk(id);
      if (!newArrival) {
        return res.status(404).json({ message: "New arrival not found" });
      }
      await newArrival.destroy();
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ message: "Error deleting new arrival" });
      next(error);
    }
  }
}
