import * as create from "./Create";
import * as getAll from "./GetAll";
import * as count from "./count";
import * as updateStatus from "./UpdateStatus";
import * as deleteOrderById from "./DeleteOrderById";
import * as getAllPaginated from "./GetAllPaginated";

export const OrderProvider = {
  ...create,
  ...getAll,
  ...count,
  ...updateStatus,
  ...deleteOrderById,
  ...getAllPaginated
};