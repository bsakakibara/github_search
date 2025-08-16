import * as api from "../services/api";

global.fetch = jest.fn();

test("loadUser retorna null se 404", async () => {
    (fetch as jest.Mock).mockResolvedValue({ status: 404 });
    const user = await api.loadUser("não-existe");
    expect(user).toBeNull;
})

test("loadUser retorna null em caso de erro de rede", async () => {
    global.fetch = jest.fn(() => Promise.reject("Erro de Rede")) as any;
    const user = await api.loadUser("qualquer");
    expect(user).toBeNull;
})

test("loadRepos retorna null em caso de erro de rede", async () => {
    global.fetch = jest.fn(() => Promise.reject("Erro de Rede")) as any;
    const user = await api.loadRepos("qualquer");
    expect(user).toBeNull;
})