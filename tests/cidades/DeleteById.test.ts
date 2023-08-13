import { StatusCodes } from "http-status-codes";
import { testServer } from "../jest.setup";

describe("Cidades - DeleteById", () => {
  it("Apagar registo", async () => {
    const response = await testServer
      .post("/v1/cidades")
      .send({ nome: "Luanda" });

    expect(response.statusCode).toEqual(StatusCodes.CREATED);

    const responseDeleted = await testServer
      .delete(`/v1/cidades/${response.body}`);

    expect(responseDeleted.statusCode).toEqual(StatusCodes.NO_CONTENT);
  });

  it("Tenta apagar um registo que não existe", async () => {
    const response = await testServer
      .delete("/v1/cidades/99999")
      .send();

    expect(response.statusCode).toEqual(StatusCodes.INTERNAL_SERVER_ERROR);
    expect(response.body).toHaveProperty("errors.default");
  });
});