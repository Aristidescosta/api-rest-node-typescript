import { ETableNames } from "../../ETableNames";
import { Knex } from "../../knex";
import { IOrder } from "../../models/Order";

export interface IPaginatedResult<T> {
  data: T[];
  totalItems: number;
  totalPages: number;
  itemsPerPage: number;
  currentPage: number;
  isFirstPage: boolean;
  isLastPage: boolean;
}

export interface IOrderResult extends IOrder {
  item_name: string
}

export const getAllPaginated = async (
  page: number,
  limit: number,
  filter: string,
  id = 0
): Promise<IPaginatedResult<IOrderResult> | Error> => {
  try {
    const [result, countResult] = await Promise.all([
      Knex(ETableNames.orders)
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
        .modify((query) => {
          if (id > 0) {
            query.where(`${ETableNames.orders}.id`, id);
          }
          if (filter) {
            query.orWhereRaw(
              "LOWER(customer_name) LIKE ?",
              [`%${filter.toLowerCase()}%`]
            );
          }
        })
        .offset((page - 1) * limit)
        .limit(limit),

      Knex(ETableNames.orders)
        .modify((query) => {
          if (filter) {
            query.whereRaw(
              "LOWER(customer_name) LIKE ?",
              [`%${filter.toLowerCase()}%`]
            );
          }
        })
        .count<{ count: string }[]>("* as count")
    ]);


    const totalItems = Number(countResult[0]?.count || 0);
    const totalPages = Math.ceil(totalItems / limit);

    return {
      data: result,
      totalItems,
      totalPages,
      itemsPerPage: limit,
      currentPage: page,
      isFirstPage: page === 1,
      isLastPage: page === totalPages
    };

  } catch (error) {
    console.error("Erro ao consultar os pedidos:", error);
    return new Error("Erro ao consultar os pedidos");
  }
};
