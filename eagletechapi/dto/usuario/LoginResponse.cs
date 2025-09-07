using eagletechapi.models.usuario;

namespace eagletechapi.dto.usuario;

public class LoginResponse(string token, string role, int matricula, UsuarioOut usuarioOut, bool firstLogin)
{
    public string Token { get; set; } = token;
    public string Role { get; set; } = role;
    public int Matricula { get; set; } = matricula;
    public UsuarioOut Usuario { get; set; } = usuarioOut;
    public bool FirstLogin { get; set; } = firstLogin;
}