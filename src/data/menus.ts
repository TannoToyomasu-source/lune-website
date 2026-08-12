export type MenuCourse = {
  name: string;
  duration: string;
  price: string;
  /** コース説明（カード中央） */
  summary: string;
  contents: readonly string[];
  recommended: readonly string[];
  /** 時間・料金の補足（初回時間など） */
  pricingNote?: string;
  /** コース個別画像（未指定時はメニュー共通画像） */
  image?: string;
};

export const MENU_ITEMS = [
  {
    slug: "body",
    label: "MENU 01",
    title: "歪み整体",
    price: "60分 / 11,000円〜",
    summary:
      "姿勢の歪みからくる肩こり、腰痛、首の痛みなど、症状に合わせて丁寧にヒアリングをしっかりとして根本ケアをして心地よく動ける身体を目指します。",
    image: "/treatment_13.png",
    imageAlt: "頭部と首まわりの施術の様子",
    enLabel: "Body Alignment",
    lead:
      "姿勢の歪みからくる肩こり、腰痛、首の痛みなど、症状に合わせて丁寧にヒアリングをしっかりとして根本ケアをして心地よく動ける身体を目指します。",
    description:
      "姿勢の歪みからくる肩こり、腰痛、首の痛みなど、症状に合わせて丁寧にヒアリングをしっかりとして根本ケアをして心地よく動ける身体を目指します。",
    courses: [
      {
        name: "全身歪み整体",
        duration: "60分",
        price: "11,000円",
        pricingNote: "※初回はカウンセリング\n含めて90分",
        image: "/treatment_13.png",
        summary:
          "姿勢、骨盤のバランスを正しく丁寧に整えていきます。",
        contents: [
          "カウンセリング",
          "姿勢、骨盤のバランスチェック",
          "骨盤を中心としたバランスを整える施術",
          "アフターケアのお伝え",
        ],
        recommended: [
          "姿勢の歪みが気になる方",
          "慢性的な痛みがある方",
          "デスクワーク、育児疲れがある方",
          "なんとなくの疲れが取れない方",
        ],
      },
      {
        name: "肩、首集中コース",
        duration: "60分",
        price: "11,000円",
        pricingNote: "※初回はカウンセリング\n含めて90分",
        image: "/treatment_18.png",
        summary:
          "肩こり、首こりに特化した全身のバランスを整えていくコースです。",
        contents: [
          "カウンセリング",
          "姿勢、骨盤のバランスチェック",
          "肩こり、首こりに特化した施術",
          "アフターケアのお伝え",
        ],
        recommended: [
          "肩こり、首こりが気になる方",
          "疲れると肩に痛みが出る方",
          "デスクワーク、育児疲れがある方",
        ],
      },
      {
        name: "腰痛集中コース",
        duration: "60分",
        price: "11,000円",
        pricingNote: "※初回はカウンセリング\n含めて90分",
        image: "/treatment_11.png",
        summary:
          "腰の痛みや疲労に特化した全身のバランスを整えていくコースです。",
        contents: [
          "カウンセリング",
          "姿勢、骨盤のバランスチェック",
          "腰痛に特化した施術",
          "アフターケアのお伝え",
        ],
        recommended: [
          "慢性的な腰の痛みがある方",
          "デスクワーク、育児疲れがある方",
          "ぎっくり腰になったことがある方",
          "長時間の立ち仕事の方",
        ],
      },
      {
        name: "スペシャルケアコース",
        duration: "90分",
        price: "17,000円",
        pricingNote: "※初回はカウンセリング\n含めて120分",
        image: "/treatment_10.png",
        summary:
          "小顔矯正とセットで全身の疲れをリセットするスペシャルケアです。",
        contents: [
          "カウンセリング",
          "姿勢、骨盤のバランスチェック",
          "全身の歪みの施術+小顔矯正",
          "アフターケアのお伝え",
        ],
        recommended: [
          "慢性的な痛みがある方",
          "より身体を整えたい方",
          "整体をしてもすぐに辛さが戻ってしまう方",
        ],
      },
    ],
  },
  {
    slug: "postpartum",
    label: "MENU 02",
    title: "産後ケア整体",
    price: "60分 / 12,000円〜",
    summary:
      "出産後の骨盤周りや姿勢の変化や、抱っこや授乳による肩、腰への負担などのお悩みに寄り添いながら、お子さんとの大切な時間を心地よく過ごせるお手伝いをさせていただきます。",
    image: "/treatment_14.png",
    imageAlt: "産後の腰・骨盤まわりの施術の様子",
    enLabel: "Postpartum Care",
    lead:
      "出産後の骨盤周りや姿勢の変化や、抱っこや授乳による肩、腰への負担などのお悩みに寄り添いながら、お子さんとの大切な時間を心地よく過ごせるお手伝いをさせていただきます。",
    description:
      "出産後の骨盤周りや姿勢の変化や、抱っこや授乳による肩、腰への負担などのお悩みに寄り添いながら、お子さんとの大切な時間を心地よく過ごせるお手伝いをさせていただきます。",
    courses: [
      {
        name: "産後ケア整体",
        duration: "60分",
        price: "12,000円",
        pricingNote: "※初回はカウンセリング\n含めて90分",
        image: "/treatment_13.png",
        summary:
          "出産後変化した骨盤周りを整えていき育児の負担を減らしていきます。",
        contents: [
          "カウンセリング",
          "姿勢、骨盤の開きとバランスチェック",
          "骨盤を中心としたバランスを整える施術",
          "アフターケアのお伝え",
        ],
        recommended: [
          "骨盤のぐらつきを感じる方",
          "産後から姿勢の歪みや身体の痛みがある方",
          "長時間の抱っこが辛い方",
          "なんとなくの疲れが取れない方",
        ],
      },
      {
        name: "産後スペシャルケア整体",
        duration: "90分",
        price: "18,000円",
        pricingNote: "※初回はカウンセリング\n含めて120分程度",
        image: "/treatment_14.png",
        summary:
          "骨盤周りを整えていき、さらに肩こり、首こりも辛い方におすすめの産後ケア整体＋小顔矯正のコースです。",
        contents: [
          "カウンセリング",
          "姿勢、骨盤の開きとバランスチェック",
          "産後ケア＋小顔矯正",
          "アフターケアのお伝え",
        ],
        recommended: [
          "肩こり、首こりが気になる方",
          "産後年数が経っている方",
          "お子さんを抱っこしている時間が長い方",
          "デスクワーク、育児疲れがある方",
        ],
      },
    ],
  },
  {
    slug: "maternity",
    label: "MENU 03",
    title: "マタニティケア整体",
    price: "60分 / 12,000円〜",
    summary:
      "妊娠中の腰やむくみなど、その時期に合わせた身体へのケアをし、ステキなマタニティライフが送れるようにサポートしていきます。また、赤ちゃんのためにも身体を整えて成長していきやすい環境を作っていきます。",
    image: "/treatment_6.png",
    imageAlt: "マタニティ期の腹部まわりの施術の様子",
    enLabel: "Maternity Care",
    lead:
      "妊娠中の腰やむくみなど、その時期に合わせた身体へのケアをし、ステキなマタニティライフが送れるようにサポートしていきます。また、赤ちゃんのためにも身体を整えて成長していきやすい環境を作っていきます。",
    description:
      "妊娠中の腰やむくみなど、その時期に合わせた身体へのケアをし、ステキなマタニティライフが送れるようにサポートしていきます。また、赤ちゃんのためにも身体を整えて成長していきやすい環境を作っていきます。",
    courses: [
      {
        name: "マタニティケア整体",
        duration: "60分",
        price: "12,000円",
        pricingNote: "※初回はカウンセリング\n含めて90分",
        image: "/treatment_6.png",
        summary:
          "仰向けと横向きで施術をしていき、週数により辛さが異なるマタニティの時期の腰回りや肩こりケアをしていきます。",
        contents: [
          "カウンセリング",
          "姿勢、骨盤のバランスチェック",
          "骨盤を中心としたバランスを整える施術",
          "アフターケアのお伝え",
        ],
        recommended: [
          "妊娠中、腰の痛みが辛い方",
          "切迫早産の予防をしたい方",
          "お腹が大きくなってきて不調が出てきた方",
          "赤ちゃんのためにケアをしたい方",
          "妊娠中でも仕事が忙しい方",
        ],
      },
      {
        name: "マタニティスペシャルケア整体",
        duration: "90分",
        price: "18,000円",
        pricingNote: "※初回はカウンセリング\n含めて120分程度",
        image: "/treatment_17.png",
        summary:
          "骨盤周りを整えていき、さらに肩こり、首こりも辛い方におすすめの産後ケア整体＋小顔矯正のコースです。",
        contents: [
          "カウンセリング",
          "姿勢、骨盤とバランスチェック",
          "マタニティケア＋小顔矯正",
          "アフターケアのお伝え",
        ],
        recommended: [
          "肩こり、首こりが気になる方",
          "徹底的にケアをしたい方",
          "2人目で育児もしながらマタニティの時期をお過ごしの方",
          "妊娠中でも仕事が忙しい方",
        ],
      },
    ],
  },
] as const;

export type MenuSlug = (typeof MENU_ITEMS)[number]["slug"];
export type MenuItem = (typeof MENU_ITEMS)[number];

export function getMenuBySlug(slug: string): MenuItem | undefined {
  return MENU_ITEMS.find((item) => item.slug === slug);
}

export function isMenuSlug(slug: string): slug is MenuSlug {
  return MENU_ITEMS.some((item) => item.slug === slug);
}
