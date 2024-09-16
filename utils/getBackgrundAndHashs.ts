import { generalBackgrounds } from "@/constants/generalBackgrounds";
import { plainBackground, rankBackgrounds } from "@/constants/rankBackgrounds";
import { defaultBlurhash, rankBlurhashes } from "@/constants/rankBlurhashes";
import { store } from "@/redux/store";

export const getBackgrundAndHashs = ({
  isGeneral = false,
}: { isGeneral?: boolean } = {}) => {
  const { rank } = store.getState().xp;

  // Select the background and blurhash based on the `isGeneral` flag
  const backgroundImageSource = isGeneral
    ? generalBackgrounds[rank] || plainBackground // Use general backgrounds
    : rankBackgrounds[rank] || plainBackground; // Use rank-specific backgrounds

  const backgroundBlurhash = rankBlurhashes[rank] || defaultBlurhash;

  return { backgroundImageSource, backgroundBlurhash };
};
