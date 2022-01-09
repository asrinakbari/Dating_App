using Dating_App.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Dating_App.Interfaces
{
    public interface ITokenService
    {
        string CreateToken(AppUser user);
    }
}
