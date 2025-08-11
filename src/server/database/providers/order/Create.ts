import { ETableNames } from "../../ETableNames";
import { Knex } from "../../knex";
import { IOrder } from "../../models/Order";

export const create = async (
  item: Omit<IOrder, "id" | "created_at">
): Promise<number | Error> => {
  try {
    const total = item.item_price * item.quantity;
    const [result] = await Knex(ETableNames.orders)
      .insert({...item, total})
      .returning("id");

    if (typeof result === "object") return Number(result.id);
    if (typeof result === "number") return result;

    return new Error("Erro ao cadastrar o pedido: retorno inválido do banco.");
  } catch (error) {
    console.error("Erro ao cadastrar o pedido:", error);

    const message =
      error instanceof Error
        ? error.message
        : "Erro desconhecido ao inserir no banco de dados";

    return new Error(`Erro ao cadastrar o pedido: ${message}`);
  }
};
