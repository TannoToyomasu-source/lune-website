import { SectionHeading } from "@/components/ui/SectionHeading";
import { Typography } from "@/components/ui/Typography";
import styles from "./first.module.css";

export function FirstDirector() {
  return (
    <section
      className={`${styles.section} ${styles.director}`}
      aria-labelledby="director-heading"
    >
      <SectionHeading
        className={`${styles.sectionHeading} ${styles.reveal}`}
        eyebrow="DIRECTOR"
        title={<span id="director-heading">院長紹介</span>}
      />
      <div className={`${styles.directorGrid} ${styles.reveal}`}>
        <figure className={styles.directorPhoto}>
          <img
            src="/practitioner.jpg"
            alt="院長 おおさわ りな"
            width={800}
            height={1000}
            decoding="async"
            className={styles.directorImage}
          />
          <Typography variant="caption" as="figcaption">
            院長
          </Typography>
        </figure>
        <div className={styles.directorCopy}>
          <Typography variant="heading" as="h3" className={styles.directorTitle}>
            変わっていく身体と、
            <br />
            これからの毎日に寄り添う。
          </Typography>
          <Typography variant="body" className={styles.bodyText}>
            私が目指しているのは、その場の痛みやつらさを和らげるだけではありません。ホームケアや栄養についてもお伝えしながら、ご自身でも身体を整えられる力を育み、この先も健やかに過ごせる身体づくりをサポートしたいと考えています。
          </Typography>
          <Typography variant="body" className={styles.bodyText}>
            私自身も、骨折やスポーツによるケガ、生理による不調など、身体の悩みを経験してきました。だからこそ、身体だけでなく、その時の不安や気持ちにも寄り添うことを大切にしています。
          </Typography>
          <Typography variant="body" className={styles.bodyText}>
            完全マンツーマンだからこそ、小さな違和感や誰にも話せなかったお悩みも安心してご相談ください。痛みや身体の変化をそのままにせず、一緒にこれからの毎日を心地よく過ごせる身体をつくっていきましょう。
          </Typography>
          <dl className={styles.profileList}>
            <div>
              <Typography variant="label" as="dt">
                院長
              </Typography>
              <Typography variant="small" as="dd">
                おおさわ　りな
              </Typography>
            </div>
            <div>
              <Typography variant="label" as="dt">
                資格
              </Typography>
              <Typography variant="small" as="dd">
                柔道整復師、ファスティングカウンセラー、公認ウェルネス栄養指導士
              </Typography>
            </div>
            <div>
              <Typography variant="label" as="dt">
                経歴
              </Typography>
              <Typography variant="small" as="dd">
                整形外科クリニック・産後ケア施設での経験を経て、
                当院を開院。
              </Typography>
            </div>
          </dl>
        </div>
      </div>
    </section>
  );
}
