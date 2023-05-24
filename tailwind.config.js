const plugin = require("tailwindcss/plugin");

const customStyle = plugin(function ({ addUtilities }) {
    addUtilities({
        ".rotate-y-0": {
            transform: "rotateY(0deg)",
        },
        ".rotate-y-180": {
            transform: "rotateY(180deg)",
        },
        ".rotate-y-360": {
            transform: "rotateY(360deg)",
        },
        ".translate-z-30px": {
            transform: "translateZ(60px)",
        },
        ".preserve-3d": {
            transformStyle: "preserve-3d",
        },
        ".transition-bg-color": {
            transition: "background-color 1s",
        },
        ".hidden-divtext": {
            display: "-webkit-box",
            "-webkit-box-orient": "vertical",
            overflow: "hidden",
        },
        ".hidden-text-1": {
            display: "-webkit-box",
            "-webkit-line-clamp": "1",
            "-webkit-box-orient": "vertical",
            overflow: "hidden",
        },
        ".hover-room": {
            backgroundSize: "150%",
            backgroundPosition: "center",
        }
    });
});

/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./src/**/*.{js,jsx,ts,tsx,html}",
        "./public/index.html",
        "./node_modules/flowbite/**/*.js",
    ],
    theme: {
        extend: {
            fontFamily: { valky: ["NVNValky"] },
            screens: {
                "3xl": "1920px",
                "2xl": "1536px",
                "xl": "1280px",
                "lg": "1024px",
                "md": "768px",
                "sm": "480px",
            },
            zIndex: {
                "-1": -1, // -1    :background
                1: 1, // 1     :flag
                2: 2, // 2     :flag content
                // 40    :sidebar
                // 50    :layout header
            },
            colors: {
                main: "var(--main-color)",
                background: {
                    DEFAULT: "var(--main-background)",
                    100: "var(--background1)",
                    200: "var(--background2)",
                },
                gray: {
                    100: "var(--gray-001)",
                    200: "var(--gray-002)",
                    300: "var(--gray-003)",
                    400: "var(--gray-004)",
                },
                button: "var(--button-color)",
                icon: "var(--icon-color)",
                cancel: "var(--cancel-color)",
            },
            boxShadow: {
                DEFAULT: "0px 4px 4px rgba(0, 0, 0, 0.25)",
            },
            fontSize: {
                // follow figma
                "wap-regular": ["10px", "15.6px"],
                "wap-regular1": ["12px", "15.6px"],
                "wap-regular2": ["14px", "18.2px"],
                normal: ["16px", "20px"],
                normal1: ["18px", "23.4px"],
                normal2: ["24px", "31.2px"],
                title: ["32px", "41.6px"],
                header2: ["40px", "52px"],
            },
            keyframes: {},
            animation: {},
            borderRadius: {
                xs: "4px",
                sm: "8px",
                md: "10px",
                lg: "20px",
                xl: "24px",
            },
        },
        container: {
            screens: {
                // theo deign figma
                sm: "560px",
                md: "660px",
                lg: "900px",
                xl: "1100px",
                "2xl": "1320px",
                "3xl": "1648px",
            },
            padding: "0rem",
            center: true,
        },
    },
    plugins: [
        customStyle,
        require("@tailwindcss/line-clamp"),
        require("flowbite/plugin"),
        plugin(function ({
            addVariant,
            addBase,
            addUtilities,
            addComponents,
            theme,
        }) {
            addVariant("child", "& > *");
            addVariant("child-hover", "& > *:hover");
            addVariant("first", "&:nth-child(1)");
            addVariant("second", "&:nth-child(2)");
            addVariant("third", "&:nth-child(3)");
            addComponents({});
            addBase({
                body: {
                    padding: 0,
                    margin: 0,
                    fontWeight: 400,
                    fontSize: "16px",
                    lineHeight: "20px",
                    background: theme("colors.bg.100"),
                    // width: '100vw',
                    minHeight: "100vh",
                    backgroundColor: theme("colors.background[DEFAULT]"),
                },
                p: {
                    padding: 0,
                    margin: 0,
                    fontWeight: 400,
                    fontSize: "14px",
                    lineHeight: "20px",
                },
                a: {
                    textDecoration: "none",
                    backgroundColor: "transparent",
                },
            });
            addComponents({
                ".btn": {
                    display: "flex",
                    minWidth: "100px",
                    height: "48px",
                    padding: "0 20px",
                    justifyContent: "center",
                    alignItems: "center",
                    borderRadius: "8px",
                    backgroundColor: theme("colors.white"),
                },
            });

            addUtilities({
                ".scrollbar-none-height": {
                    /* IE and Edge */
                    "-ms-overflow-style": "none",

                    /* Firefox */
                    "scrollbar-width": "none",

                    /* Safari and Chrome */
                    "&::-webkit-scrollbar": {
                        display: "none",
                    },
                },
                ".text-editor ": {
                    "*": {
                        color: "white !important",
                    },
                },
                ".h-screen-head": {
                    height: "calc(100vh - 96px)",
                },
            });
        }),
    ],
};