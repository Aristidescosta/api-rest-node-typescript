import { StatusCodes } from "http-status-codes";
import { testServer } from "../jest.setup";

describe("Cidades - GetAll", () => {
  it("Listar as cidades", async () => {
    const response = await testServer
      .post("/v1/cidades")
      .send({ nome: "Luanda" });

    expect(response.statusCode).toEqual(StatusCodes.CREATED);

    const responseFound = await testServer
      .get("/v1/cidades")
      .send();

    expect(Number(responseFound.header["x-total-count"])).toBeGreaterThan(0);
    expect(responseFound.statusCode).toEqual(StatusCodes.OK);
    expect(responseFound.body.length).toBeGreaterThan(0);
  });

  it("Tenta apagar um registo que não existe", async () => {
    const response = await testServer
      .delete("/v1/cidades/99999")
      .send();

    expect(response.statusCode).toEqual(StatusCodes.INTERNAL_SERVER_ERROR);
    expect(response.body).toHaveProperty("errors.default");
  });
});