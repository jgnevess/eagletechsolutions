using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using eagletechapi.dto.usuario;

namespace eagletechapi.service.interfaces
{
    public interface IAuthService
    {
        Task<Dictionary<string, string>> Login(LoginDto loginDto);
    }
}