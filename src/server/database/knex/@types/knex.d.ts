import { ICidade } from "../../models";
import { IItem } from "../../models/Item";

declare module "knex/types/tables"{
  interface Tables{
    item: IItem
  }
}