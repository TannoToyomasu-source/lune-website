import { Accordion } from "@/components/ui/Accordion";
import { ArrowRight } from "@/components/ui/ArrowRight";
import { Button } from "@/components/ui/Button";
import { SectionHeading } from "@/components/ui/SectionHeading";
import styles from "./first.module.css";

/** 初めての方へページ用 FAQ（Q&Aページと重複する項目は最新文面に揃える） */
const FAQ_ITEMS = [
  {
    question: "整体が初めてでも大丈夫ですか？",
    answer:
      "もちろん大丈夫です！初めての方にも安心していただけるように、まずはお身体の状態やお悩みをしっかりお聞きします。施術についても分かりやすくご説明しますので、分からないことがあれば遠慮なく聞いてください！",
  },
  {
    question: "どんな服装で行けばいいですか？",
    answer:
      "動きやすく、締め付けの少ない服装がおすすめです。お着替えもご用意しておりますのでお気軽にお越しください。",
  },
  {
    question: "子どもを連れて行っても大丈夫ですか？",
    answer:
      "はい、もちろん大丈夫です！お子様と一緒にご来院いただけます。院内には、お子様が遊べるようにおもちゃもご用意していますので、安心してお越しください。また、当院の建物にはエレベーターがございません。ベビーカーでお越しの方は、スタッフが建物の下までお迎えに行きますので、事前にお気軽にお声がけください。",
  },
  {
    question: "施術時間はどのくらいですか？",
    answer:
      "メニューにより異なりますが、カウンセリングを含め、おおむね60〜90分程度です。初めての方は少しお時間に余裕をもってお越しください。",
  },
  {
    question: "キャンセルはいつまでに連絡すればよいですか？",
    answer:
      "ご予定の変更は、可能な限り前日までにお知らせください。当日の急なご連絡についても、お気軽にご相談ください。",
  },
  {
    question: "駐車場はありますか？",
    answer:
      "専用の駐車場はございませんが、建物の下にコインパーキングがございます。お車でお越しの際は、そちらをご利用ください。お車でお越しの方は施術料金から500円オフさせていただきます。",
  },
] as const;

export function FirstFaq() {
  const mid = Math.ceil(FAQ_ITEMS.length / 2);
  const leftItems = FAQ_ITEMS.slice(0, mid);
  const rightItems = FAQ_ITEMS.slice(mid);

  return (
    <section
      className={`${styles.section} ${styles.faq}`}
      aria-labelledby="faq-heading"
    >
      <SectionHeading
        className={`${styles.sectionHeading} ${styles.reveal}`}
        eyebrow="FAQ"
        title={<span id="faq-heading">よくあるご質問</span>}
      />
      <div className={`${styles.faqWrap} ${styles.reveal}`}>
        <div className={styles.faqGrid}>
          <Accordion
            items={[...leftItems]}
            mode="multiple"
            defaultOpenIndex={null}
          />
          <Accordion
            items={[...rightItems]}
            mode="multiple"
            defaultOpenIndex={null}
          />
        </div>
        <div className={styles.faqMore}>
          <Button variant="text" href="/qa" className={styles.faqMoreButton}>
            Q&Aをもっと見る
            <ArrowRight className={styles.faqMoreArrow} />
          </Button>
        </div>
      </div>
    </section>
  );
}
