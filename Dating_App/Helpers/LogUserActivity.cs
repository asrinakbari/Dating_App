using Dating_App.Extentions;
using Dating_App.Interfaces;
using Microsoft.AspNetCore.Mvc.Filters;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.Extensions.DependencyInjection;

namespace Dating_App.Helpers
{
    public class LogUserActivity : IAsyncActionFilter
    {
        public async Task OnActionExecutionAsync(ActionExecutingContext context, ActionExecutionDelegate next)
        {
            var resultContext = await next();

            if (resultContext.HttpContext.User.Identity.IsAuthenticated) return;

            //var username = resultContext.HttpContext.User.GetUsername();
            //if (username != null)
            //{
            //    var repo = resultContext.HttpContext.RequestServices.GetService<IUserRepository>();
            //    var user = await repo.GetUserByUsernameAsync(username);
            //    user.LastActive = DateTime.Now;
            //    await repo.SaveAllAsync();
            //}
        }
    }
}
