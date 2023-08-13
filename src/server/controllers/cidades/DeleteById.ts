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

  console.log(req.params);

  return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send("Não implementado!");
};