import { act, render } from "@testing-library/react";
import UserContext, { UserProvider } from "./UserContext";

test("Se o UserProvider fornece os valores corretament", () => {
    let contextValue: any;
    render(
        <UserProvider>
            <UserContext.Consumer>
                {value => {
                    contextValue = value;
                    return null;
                }}
            </UserContext.Consumer>
        </UserProvider>
    );

    expect(contextValue.user).toBeNull();
    expect(contextValue.repos).toEqual([]);

    // inserido para atualização de estado 
    act(() => {
        contextValue.setUser({ login: "teste" });
    })
    
    expect(contextValue.user.login).toBe("teste");
})