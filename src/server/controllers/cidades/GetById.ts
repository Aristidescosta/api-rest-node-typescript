import { StatusCodes } from "http-status-codes";
import { Request, Response } from "express";
import * as yup from "yup";

import { validation } from "../../shared/middleware";
interface IQueryProps {
  id?: number;
}

export const getBuyIdValidation = validation((getSchema) => ({
  params: getSchema<IQueryProps>(yup.object().shape({
    id: yup.number().integer().optional().moreThan(0),
  }))
}));

export const getBuyId = async (req: Request<{}, {}, {}, IQueryProps>, res: Response) => {

  console.log(req.params);

  return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send("Não implementado!");
};