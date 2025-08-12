import { ETableNames } from "../../ETableNames";
import { Knex } from "../../knex";
import { IOrder } from "../../models/Order";

export const create = async (order: Omit<IOrder, "id" | "created_at">): Promise<IOrder | Error> => {
  try {
    const total = order.item_price * order.quantity;
    const [result] = await Knex(ETableNames.orders)
      .insert({...order, total})
      .returning("id");

    const id = typeof result === "object" ? Number(result.id) : Number(result);

    if (!id) {
      return new Error("Erro ao cadastrar o pedido");
    }

    // Buscar o pedido recém criado com join para trazer o item_name e item_price
    const newOrder = await Knex(ETableNames.orders)
      .join(
        ETableNames.item,
        `${ETableNames.orders}.item_id`,
        "=",
        `${ETableNames.item}.id`
      )
      .select(
        `${ETableNames.orders}.*`,
        `${ETableNames.item}.name as item_name`,
        `${ETableNames.item}.price as item_price`
      )
      .where(`${ETableNames.orders}.id`, id)
      .first();

    return newOrder as IOrder;
  } catch (error) {
    console.error(error);
    return new Error("Erro ao cadastrar o pedido");
  }
};

