import { ETableNames } from "../../ETableNames";
import { Knex } from "../../knex";

export const updateStatus = async (
  id: number,
  status: string
): Promise<void | Error> => {
  try {
    const result = await Knex(ETableNames.orders)
      .update({ status })
      .where("id", "=", id);

    if (result > 0) return;

    return new Error("Erro ao atualizar o estado do pedido: ID não encontrado.");
  } catch (error) {
    console.error("Erro ao atualizar o estado do pedido:", error);

    const message =
      error instanceof Error
        ? error.message
        : "Erro desconhecido ao atualizar no banco de dados";

    return new Error(`Erro ao atualizar o estado do pedido: ${message}`);
  }
};
