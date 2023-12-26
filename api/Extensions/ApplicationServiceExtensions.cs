using Microsoft.Extensions.Options;

namespace api.Extensions;

public static class ApplicationServiceExtensions
{
    public static IServiceCollection AddApplicationService(this IServiceCollection services, IConfiguration configuration)
    {
        ///// get values from this file: appsettings.Development.json /////
        // get section
        services.Configure<MongoDbSettings>(configuration.GetSection(nameof(MongoDbSettings)));

        // get values
        services.AddSingleton<IMongoDbSettings>(serviceProvider =>
        serviceProvider.GetRequiredService<IOptions<MongoDbSettings>>().Value);

        // get connectionString to the db
        services.AddSingleton<IMongoClient>(serviceProvider =>
        {
            MongoDbSettings uri = serviceProvider.GetRequiredService<IOptions<MongoDbSettings>>().Value;


            return new MongoClient(uri.ConnectionString);
        });

        services.AddCors(options =>
            {
                options.AddDefaultPolicy(policy =>
                    policy.AllowAnyHeader().AllowAnyMethod().WithOrigins("http://localhost:4200"));
            });

        return services;
    }
}