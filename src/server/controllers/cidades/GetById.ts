import { StatusCodes } from "http-status-codes";
import { Request, Response } from "express";
import * as yup from "yup";

import { validation } from "../../shared/middleware";
interface IParamProps {
  id?: number;
}

export const getBuyIdValidation = validation((getSchema) => ({
  params: getSchema<IParamProps>(yup.object().shape({
    id: yup.number().integer().optional().moreThan(0),
  }))
}));

export const getBuyId = async (req: Request<IParamProps>, res: Response) => {

  if(Number(req.params.id) === 99999) return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
    errors:{
      default: "Registo não encontrado"
    }
  });

  return res.status(StatusCodes.OK).json({
    id: req.params.id,
    nome: "Luanda"
  });
};