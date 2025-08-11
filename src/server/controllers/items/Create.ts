import { StatusCodes } from "http-status-codes";
import { ItemProvider } from "../../database/providers/item";
import { Request, Response } from "express";
import { IItem } from "../../database/models/Item";
import { validation } from "../../shared/middleware";
import * as yup from "yup";

interface IBodyProps extends Omit<IItem, "id"> { }

export const createValidation = validation((getSchema) => ({
  body: getSchema<IBodyProps>(yup.object().shape({
    name: yup.string().required().min(3).max(150),
    price: yup.number().required().positive()
  }))
}));

export const create = async (req: Request<{}, {}, IItem>, res: Response) => {
  const result = await ItemProvider.create(req.body);

  if (result instanceof Error) return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
    errors: {
      default: result.message
    }
  });

  return res.status(StatusCodes.CREATED).json(result);
};