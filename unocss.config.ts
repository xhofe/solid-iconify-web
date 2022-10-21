import {
  defineConfig,
  presetAttributify,
  presetIcons,
  presetTypography,
  presetUno,
  presetWebFonts,
  // transformerDirectives,
  // transformerVariantGroup,
} from "unocss";

export default defineConfig({
  shortcuts: [
    ["btn", "flex items-center justify-center py-2 px-4 rounded-md font-600 c-white"],
  ],
  presets: [
    presetUno(),
    presetAttributify(),
    // presetIcons({
    //   scale: 1.2,
    //   warn: true,
    // }),
    presetTypography(),
    presetWebFonts({
      fonts: {
        serif: [
          {
            name: "Noto Serif SC",
            weights: [900],
          },
        ],
      },
    }),
  ],
  transformers: [
    // transformerDirectives(),
    // transformerVariantGroup(),
  ],
});
