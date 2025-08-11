import { StatusCodes } from "http-status-codes";
import { Request, Response } from "express";
import { validation } from "../../shared/middleware";
import * as yup from "yup";
import { IOrder, ORDER_STATUS } from "../../database/models/Order";
import { OrderProvider } from "../../database/providers/order";

interface IBodyProps extends Omit<IOrder, "id" | "created_at"> { }

export const createValidation = validation((getSchema) => ({
  body: getSchema<IBodyProps>(yup.object().shape({
    customer_name: yup.string().required().min(3).max(150),
    customer_phone: yup.string().required().min(9).max(9),
    customer_email: yup.string().required().email(),
    item_id: yup.number().required(),
    item_price: yup.number().required(),
    quantity: yup.number().required(),
    status: yup.mixed<ORDER_STATUS>().oneOf(Object.values(ORDER_STATUS)).required(),
  }))
}));

export const create = async (req: Request<{}, {}, IOrder>, res: Response) => {
  const result = await OrderProvider.create(req.body);

  if (result instanceof Error) return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
    errors: {
      default: result.message
    }
  });

  return res.status(StatusCodes.CREATED).json(result);
};