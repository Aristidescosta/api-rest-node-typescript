import { Request, Response } from "express";
import * as yup from "yup";
import { validation } from "../../shared/middleware";
import { StatusCodes } from "http-status-codes";

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

export const updateById = async (req: Request<{}, {}, IBodyProps, IParamProps>, res: Response) => {

  console.log(req.params, req.body);

  return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send("Não implementado!");
};