import { Router } from "express";


import { CidadeController } from "../controllers/index";

const router = Router();


router.get("/", (_, res) =>{
  res.send("Olá mundo");
});

router.get("/cidades", CidadeController.getAllValidation, CidadeController.getAll);
router.post("/cidades", CidadeController.createValidation, CidadeController.create);

export { router };