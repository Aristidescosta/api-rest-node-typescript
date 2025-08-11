import { ETableNames } from "../../ETableNames";
import { Knex } from "../../knex";
import { IItem } from "../../models/Item";


export const getById = async (id: number): Promise<IItem | Error> => {
  try {
    const result = await Knex(ETableNames.item)
      .select("")
      .where("id", "=", id)
      .first();

    if (result) return result;

    return new Error("Registro não encontrado");
  } catch (error) {
    console.log(error);
    return new Error("Erro ao consultar o registro");
  }
};