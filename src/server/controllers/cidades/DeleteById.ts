import { StatusCodes } from "http-status-codes";
import { Request, Response } from "express";
import * as yup from "yup";

import { validation } from "../../shared/middleware";

interface IParmProps {
  id?: number;
}

export const deleteByIdValidation = validation((getSchema) => ({
  params: getSchema<IParmProps>(yup.object().shape({
    id: yup.number().integer().optional().moreThan(0),
  }))
}));

export const deleteById = async (req: Request<IParmProps>, res: Response) => {

  if(Number(req.params.id) === 99999) return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
    errors:{
      default: "Registo não encontrado"
    }
  });

  return res.status(StatusCodes.NO_CONTENT).send();
};