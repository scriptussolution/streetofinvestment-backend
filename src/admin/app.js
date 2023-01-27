import AuthLogo from "./extensions/my-logo.png"
import MenuLogo from "./extensions/logo.png"
import favicon from "./extensions/favicon.ico"

export default {
  config: {
    auth: {
      logo: AuthLogo,
    },
    head: {
      favicon: favicon,
    },
    menu: {
      logo: MenuLogo,
    },
    translations: {
      en: {
        "Auth.form.button.login.strapi": "Log In",
        "Auth.form.register.subtitle": "Credentials are only used to authenticate. All saved data will be stored in your database.",
        "Auth.form.welcome.title": "Welcome",
        "Auth.form.welcome.subtitle": "Login to your account",
        "app.components.LeftMenu.navbrand.title": "Dashboard",
        "app.components.LeftMenu.navbrand.workplace": " ",
        "app.components.HomePage.welcomeBlock.content": "Congrats! You are logged as administrator.",
        "HomePage.welcome.congrats.content": "You are logged in as the first administrator. To discover the powerful features provided,",
        "Settings.application.strapi-version": "version",
        "Settings.application.strapiVersion": "version",
        "Settings.permissions.users.listview.header.subtitle": "All the users who have access to the admin panel",
        "admin.pages.MarketPlacePage.offline.subtitle": "You need to be connected to the Internet to access Market.",
        "admin.pages.MarketPlacePage.plugin.tooltip.madeByStrapi": " ",
        "admin.pages.MarketPlacePage.plugin.tooltip.verified": "Plugin verified",
        "admin.pages.MarketPlacePage.subtitle": "Get more out of It",
        "app.components.BlockLink.blog.content": "Read the latest news about the ecosystem.",
        "app.components.BlockLink.tutorial.content": "Follow step-by-step instructions to use and customize.",
      },
    },
  },
  bootstrap(app) {
    console.log(app);
  },
};
