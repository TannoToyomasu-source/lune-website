/**
 * 店舗・アクセス情報
 */
export const CLINIC = {
  name: "Lune 東川口 浦和美園",
  postalCode: "〒333-0811",
  addressLines: ["埼玉県川口市戸塚2-22-33", "エスポワール306"],
  phoneLabel: "電話番号",
  phoneDisplay: "090-2908-1058",
  phoneTel: "09029081058",
  /** Google マップ（店名検索：ピンに Lune と表示） */
  googleMapsUrl:
    "https://www.google.com/maps/search/?api=1&query=Lune+%E6%9D%B1%E5%B7%9D%E5%8F%A3+%E6%B5%A6%E5%92%8C%E7%BE%8E%E5%9C%92",
  googleMapsEmbedUrl:
    "https://maps.google.com/maps?q=Lune+%E6%9D%B1%E5%B7%9D%E5%8F%A3+%E6%B5%A6%E5%92%8C%E7%BE%8E%E5%9C%92&z=16&hl=ja&output=embed&iwloc=",
  parkingTitle: "駐車場について",
  parkingBody: [
    "専用の駐車場はございませんが、建物の下にコインパーキングがございます。お車でお越しの際は、そちらをご利用ください。",
    "お車でお越しの方は施術料金から500円オフさせていただきます。",
  ],
  /** 駐車場簡易地図 */
  parkingMapSrc: "/map.png",
  parkingMapAlt: "駐車場の簡易案内図",
} as const;
