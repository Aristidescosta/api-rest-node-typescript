import { ETableNames } from "../../ETableNames";
import { Knex } from "../../knex";
import { IOrder } from "../../models/Order";

export const getAll = async (
  page: number,
  limit: number,
  filter: string,
  id = 0
): Promise<IOrder[] | Error> => {
  try {
    const result = await Knex<IOrder>(ETableNames.orders)
      .select("*")
      .modify((query) => {
        if (id > 0) {
          query.where("id", id);
        }
        if (filter) {
          query.orWhereRaw("LOWER(customer_name) LIKE ?", [`%${filter.toLowerCase()}%`]);
        }
      })
      .offset((page - 1) * limit)
      .limit(limit);


    if (id > 0 && result.every((order: IOrder) => Number(order.id) !== id)) {
      const orderById = await Knex(ETableNames.orders)
        .select("*")
        .where("id", id)
        .first();
      if (orderById) return [...result, orderById];
    }

    return result;
  } catch (error) {
    console.error("Erro ao consultar os pedidos:", error);

    const message =
      error instanceof Error
        ? error.message
        : "Erro desconhecido ao buscar no banco de dados";

    return new Error(`Erro ao consultar os pedidos: ${message}`);
  }
};
