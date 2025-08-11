import * as create from "./Create";
import * as getAll from "./getAll";
import * as count from "./count";
import * as getById from "./getById";
import * as updateById from "./UpdateById";
import * as deleteById from "./DeleteById";

export const ItemProvider = {
  ...create,
  ...getAll,
  ...getById,
  ...count,
  ...updateById,
  ...deleteById
};