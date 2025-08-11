import * as create from "./Create";
import * as getAll from "./GetAll";
import * as updateStatusById from "./UpdateStatus";
import * as deleteOrderById from "./DeleteOrderById";

export const OrderController = {
  ...create,
  ...getAll,
  ...updateStatusById,
  ...deleteOrderById
};