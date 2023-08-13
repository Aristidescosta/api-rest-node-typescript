import { Router } from "express";


import { CidadeController } from "../controllers/index";

const router = Router();


router.get("/", (_, res) =>{
  res.send("Olá mundo");
});

router.delete("/cidades/:id", CidadeController.deleteByIdValidation, CidadeController.deleteById);
router.put("/cidades/:id", CidadeController.updateByIdValidation, CidadeController.updateById);
router.get("/cidades/:id", CidadeController.getBuyIdValidation, CidadeController.getBuyId);
router.get("/cidades", CidadeController.getAllValidation, CidadeController.getAll);
router.post("/cidades", CidadeController.createValidation, CidadeController.create);
export { router };