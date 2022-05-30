module.exports = {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  daisyui: {
    themes: [
      {
        mytheme: {
          primary: "#566dfb",
          secondary: "#F000B8",
          accent: "#F5F5FA",
          neutral: "#3D4451",
          "base-100": "#FFFFFF",
          "text-c": "#3a426d",
          info: "#3ABFF8",
          success: "#36D399",
          warning: "#FBBD23",
          error: "#F87272",
        },
      },
    ],
  },
  plugins: [require("daisyui")],
};
