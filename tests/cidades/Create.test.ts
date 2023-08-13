import { StatusCodes } from "http-status-codes";
import { testServer } from "../jest.setup";

describe("Cidades - Create", () => {
  it("Criar registo", async () => {
    const response = await testServer
      .post("/v1/cidades")
      .send({ "nome": "Luanda" });

    expect(response.statusCode).toEqual(StatusCodes.CREATED);
    expect(typeof response.body).toEqual("number");
  });

  it("Não pode criar um registo com o nome muito curto", async () => {
    const response = await testServer
      .post("/v1/cidades")
      .send({ "nome": "Lu" });

    expect(response.statusCode).toEqual(StatusCodes.BAD_REQUEST);
    expect(response.body).toHaveProperty("errors.body.nome");
  });

  it("Deve ser inserido o nome de uma cidade", async () => {
    const response = await testServer
      .post("/v1/cidades");

    expect(response.statusCode).toEqual(StatusCodes.BAD_REQUEST);
    expect(response.body).toHaveProperty("errors.body.nome");
  });
});