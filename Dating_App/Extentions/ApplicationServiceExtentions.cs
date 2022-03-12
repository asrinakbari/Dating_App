using Dating_App.Data;
using Dating_App.Helpers;
using Dating_App.Interfaces;
using Dating_App.Services;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Dating_App.Extentions
{
    public static class ApplicationServiceExtentions
    {

        public static IServiceCollection AddApplicationService(this IServiceCollection services, IConfiguration config)
        {
            services.Configure<CloudinarySetting>(config.GetSection("CloudinarySetting"));
            services.AddScoped<ITokenService, TokenService>();
            services.AddScoped<LogUserActivity>();
            services.AddScoped<IPhotoService, PhotoService>();
            services.AddScoped<IMessageRepository, MessageRepository>();
            services.AddScoped<ILikesRepository, LikesRepository>();
            services.AddScoped<IUserRepository,UserRepository>();
            services.AddAutoMapper(typeof(AutoMapperProfiles).Assembly);
            services.AddDbContext<DataContext>(options =>
            {
                options.UseSqlServer(config.GetConnectionString("DefaultConnection"));
            });

            return services;
        }
    }
}
