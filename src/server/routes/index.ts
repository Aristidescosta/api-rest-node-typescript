import { Router } from "express";

import { ItemController } from "../controllers/items";
import { OrderController } from "../controllers/orders";

const router = Router();


router.get("/", (_, res) => {
  res.send("Olá mundo");
});

/* ITEM */
router.post("/item", ItemController.createValidation, ItemController.create);
router.get("/items", ItemController.getAllValidation, ItemController.getAll);
router.get("/items/:id", ItemController.getByIdValidation, ItemController.getById);
router.put("/items/:id", ItemController.updateByIdValidation, ItemController.updateById);
router.delete("/items/:id", ItemController.deleteByIdValidation, ItemController.deleteById);

/* ORDERS */
router.post("/order", OrderController.createValidation, OrderController.create);
router.get("/orders", OrderController.getAllValidation, OrderController.getAll);
router.put("/orders/:id", OrderController.updateByIdValidation, OrderController.updateById);
router.delete("/orders/:id", OrderController.deleteByIdValidation, OrderController.deleteById);
export { router };