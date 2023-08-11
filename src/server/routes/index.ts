import { Router } from "express";


import { CidadeController } from "../controllers/index";

const router = Router();


router.get("/", (_, res) =>{
  res.send("Olá mundo");
});

router.post("/cidades", CidadeController.createValidation, CidadeController.create);

export { router };