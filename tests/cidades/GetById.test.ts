import { StatusCodes } from "http-status-codes";
import { testServer } from "../jest.setup";

describe("Cidades - UpdateById", ()=>{
  it("Atualiza registo", async()=>{
    const response = await testServer
      .post("/v1/cidades")
      .send({ nome: "Luanda" });

    expect(response.statusCode).toEqual(StatusCodes.CREATED);

    const responseFound = await testServer
      .put(`/v1/cidades/${response.body}`)
      .send({ nome: "Luanda" });

    expect(responseFound.statusCode).toEqual(StatusCodes.NO_CONTENT);
  });

  it("Tenta atualizar registo que não existe", async()=>{
    const response = await testServer
      .put("/v1/cidades/99999")
      .send({ nome: "Luanda" });

    expect(response.statusCode).toEqual(StatusCodes.INTERNAL_SERVER_ERROR);
    expect(response.body).toHaveProperty("errors.default");
  });
});