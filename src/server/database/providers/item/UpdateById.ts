import { ETableNames } from "../../ETableNames";
import { Knex } from "../../knex";
import { IItem } from "../../models/Item";

export const updateById = async (
  id: number,
  item: Omit<IItem, "id">
): Promise<void | Error> => {
  try {
    const result = await Knex(ETableNames.item)
      .update(item)
      .where("id", "=", id);

    if (result > 0) return;

    return new Error(`Nenhum item encontrado com o ID ${id} para atualização.`);
  } catch (error) {
    console.error("Erro ao atualizar o item:", error);
    const message =
      error instanceof Error ? error.message : "Erro desconhecido no banco de dados";
    return new Error(`Erro ao atualizar o item: ${message}`);
  }
};
