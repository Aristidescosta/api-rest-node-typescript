import { ETableNames } from "../../ETableNames";
import { Knex } from "../../knex";
import { IItem } from "../../models/Item";

export const getAll = async (page: number, limit: number, filter: string, id = 0): Promise<IItem[] | Error> => {
  try {
    const result = await Knex(ETableNames.item)
      .select("*")
      .where("id", Number(id))
      .orWhere("name", "like", `%${filter}%`)
      .offset((page - 1) * limit)
      .limit(limit);

    if (id > 0 && result.every(item => Number(item.id) !== id)) {
      const resultById = await Knex(ETableNames.item)
        .select("*")
        .where("id", "=", id)
        .first();
      if (resultById) return [...result, resultById];
    }
    return result;

  } catch (error) {
    console.error(error);
    return new Error("Erro ao consultar os items");
  }
};