using Microsoft.Owin;
using Owin;

[assembly: OwinStartupAttribute(typeof(WebServiceBookStore.Startup))]
namespace WebServiceBookStore
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            ConfigureAuth(app);
        }
    }
}
