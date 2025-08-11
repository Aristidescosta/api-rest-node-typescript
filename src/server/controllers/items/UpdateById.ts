import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import * as yup from "yup";

import { validation } from "../../shared/middleware";
import { IItem } from "../../database/models/Item";
import { ItemProvider } from "../../database/providers/item";


interface IParamProps {
  id?: number;
}

interface IBodyProps extends Omit<IItem, "id"> { }

export const updateByIdValidation = validation(getSchema => ({
  body: getSchema<IBodyProps>(yup.object().shape({
    name: yup.string().required().min(3).max(150),
    price: yup.number().required().positive()
  })),
  params: getSchema<IParamProps>(yup.object().shape({
    id: yup.number().integer().required().moreThan(0),
  })),
}));

export const updateById = async (req: Request<IParamProps, {}, IBodyProps>, res: Response) => {
  if (!req.params.id) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      errors: {
        default: "O parâmetro 'id' precisa ser informado."
      }
    });
  }

  const result = await ItemProvider.updateById(req.params.id, req.body);
  
  if (result instanceof Error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      errors: {
        default: result.message
      }
    });
  }
  console.log("TESTE");

  return res.status(StatusCodes.NO_CONTENT).json(result);
};