import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import * as yup from "yup";

import { validation } from "../../shared/middleware";
import { ORDER_STATUS } from "../../database/models/Order";
import { OrderProvider } from "../../database/providers/order";


interface IParamProps {
  id?: number;
}

interface IBodyProps {
  status: ORDER_STATUS
}

export const updateByIdValidation = validation(getSchema => ({
  body: getSchema<IBodyProps>(yup.object().shape({
    status: yup.mixed<ORDER_STATUS>().oneOf(Object.values(ORDER_STATUS)).required(),
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

  const result = await OrderProvider.updateStatus(req.params.id, req.body.status);

  if (result instanceof Error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      errors: {
        default: result.message
      }
    });
  }

  return res.status(StatusCodes.NO_CONTENT).json(result);
};