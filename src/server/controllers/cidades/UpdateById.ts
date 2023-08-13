import { StatusCodes } from "http-status-codes";
import { Request, Response } from "express";
import * as yup from "yup";

import { validation } from "../../shared/middleware";

interface IParamProps {
  id?: number;
}

interface IBodyProps{
  nome: string;
}

export const updateByIdValidation = validation((getSchema) => ({
  body: getSchema<IBodyProps>(yup.object().shape({
    nome: yup.string().required().min(3)
  })),
  
  params: getSchema<IParamProps>(yup.object().shape({
    id: yup.number().integer().optional().moreThan(0),
  }))
}));

export const updateById = async (req: Request<IParamProps, {}, IBodyProps>, res: Response) => {

  if(Number(req.params.id) === 99999) return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
    errors:{
      default: "Registo não encontrado"
    }
  });

  return res.status(StatusCodes.NO_CONTENT).send();
};