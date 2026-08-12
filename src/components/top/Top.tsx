"use client";

import {
  useEffect,
  useRef,
  useState,
  useSyncExternalStore,
} from "react";
import { ReservationButton } from "@/components/ui/ReservationButton";
import { Typography } from "@/components/ui/Typography";
import { SiteHeader } from "@/components/site/SiteHeader";
import { SiteFooter } from "@/components/site/SiteFooter";
import { ConcernsSection } from "./ConcernsSection";
import { MenuSection } from "./MenuSection";
import { NewsSection } from "./NewsSection";
import { ReasonsSection } from "./ReasonsSection";
import { FirstVisitSection } from "./FirstVisitSection";
import { AccessSection } from "./AccessSection";
import type { NewsPost } from "@/data/news";
import styles from "./top.module.css";

function subscribeReducedMotion(onStoreChange: () => void) {
  const media = window.matchMedia("(prefers-reduced-motion: reduce)");
  media.addEventListener("change", onStoreChange);
  return () => media.removeEventListener("change", onStoreChange);
}

function getReducedMotionSnapshot() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function getReducedMotionServerSnapshot() {
  return false;
}

type TopProps = {
  newsPosts?: NewsPost[];
};

/** 同一タブ内の初回ロードだけイントロ待ちする */
const INTRO_SEEN_KEY = "lune-top-intro-seen";

function hasSeenTopIntro() {
  try {
    return sessionStorage.getItem(INTRO_SEEN_KEY) === "1";
  } catch {
    return false;
  }
}

function markTopIntroSeen() {
  try {
    sessionStorage.setItem(INTRO_SEEN_KEY, "1");
  } catch {
    /* private mode など */
  }
}

/**
 * イントロ出現タイミング
 * ヒーロー → 受付時間 → ヘッダー → Scroll → スクロール解禁（自動でコンセプトへは進まない）
 */
const INTRO_HERO_MS = 900;
/** CTA delay 0.7s + fade 約1.5s で受付時間が落ち着いてから */
const INTRO_HEADER_MS = INTRO_HERO_MS + 2400;
const INTRO_SCROLL_HINT_MS = INTRO_HEADER_MS + 750;
/** Scroll 表示後に操作解禁 */
const INTRO_UNLOCK_MS = INTRO_SCROLL_HINT_MS + 650;

/**
 * TOPページ：風の動画背景 × 左寄せヒーローコピー
 */
export function Top({ newsPosts }: TopProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const conceptRef = useRef<HTMLElement>(null);
  const coverRef = useRef<HTMLElement>(null);
  const atmosphereStageRef = useRef<HTMLDivElement>(null);
  const concernsLayerRef = useRef<HTMLElement>(null);
  const reasonsLayerRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  const reducedMotion = useSyncExternalStore(
    subscribeReducedMotion,
    getReducedMotionSnapshot,
    getReducedMotionServerSnapshot,
  );

  const introUnlockedRef = useRef(reducedMotion);
  /** 初回ロードのイントロ待ち中だけ true */
  const [runIntro, setRunIntro] = useState(false);
  const [headerVisible, setHeaderVisible] = useState(reducedMotion);
  const [headerSolid, setHeaderSolid] = useState(false);
  const [conceptVisible, setConceptVisible] = useState(reducedMotion);
  const [heroVisible, setHeroVisible] = useState(reducedMotion);
  const [scrollHintVisible, setScrollHintVisible] = useState(reducedMotion);
  const [introUnlocked, setIntroUnlocked] = useState(reducedMotion);
  const [concernsActive, setConcernsActive] = useState(reducedMotion);
  const [reasonsActive, setReasonsActive] = useState(reducedMotion);

  useEffect(() => {
    introUnlockedRef.current = introUnlocked;
  }, [introUnlocked]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    if (reducedMotion) {
      video.pause();
      video.currentTime = 0;
      return;
    }
    void video.play().catch(() => {
      /* autoplay ブロック時は静止のまま */
    });
  }, [reducedMotion]);

  useEffect(() => {
    const skipIntro = () => {
      setRunIntro(false);
      setHeaderVisible(true);
      setConceptVisible(true);
      setHeroVisible(true);
      setScrollHintVisible(true);
      setIntroUnlocked(true);
      introUnlockedRef.current = true;
    };

    if (reducedMotion) {
      skipIntro();
      markTopIntroSeen();
      return;
    }

    /* 2回目以降（同一タブ）は待ちなし */
    if (hasSeenTopIntro()) {
      skipIntro();
      return;
    }

    setRunIntro(true);
    setHeaderVisible(false);
    setScrollHintVisible(false);
    setConceptVisible(false);
    setIntroUnlocked(false);
    introUnlockedRef.current = false;

    const timers = [
      window.setTimeout(() => setHeroVisible(true), INTRO_HERO_MS),
      window.setTimeout(() => setHeaderVisible(true), INTRO_HEADER_MS),
      window.setTimeout(() => setScrollHintVisible(true), INTRO_SCROLL_HINT_MS),
      window.setTimeout(() => {
        introUnlockedRef.current = true;
        setIntroUnlocked(true);
        setRunIntro(false);
        markTopIntroSeen();
      }, INTRO_UNLOCK_MS),
    ];
    return () => timers.forEach((id) => window.clearTimeout(id));
  }, [reducedMotion]);

  /* 初回ロードのイントロ中だけ、コンセプト表示完了までスクロールを抑止 */
  useEffect(() => {
    if (reducedMotion || introUnlocked || !runIntro) return;

    window.scrollTo(0, 0);

    const blockEvent = (event: Event) => {
      event.preventDefault();
    };
    const blockKeys = (event: KeyboardEvent) => {
      const keys = [
        "ArrowDown",
        "ArrowUp",
        "PageDown",
        "PageUp",
        "Home",
        "End",
        " ",
        "Spacebar",
      ];
      if (keys.includes(event.key)) event.preventDefault();
    };
    const keepIntroPosition = () => {
      if (introUnlockedRef.current) return;
      if (window.scrollY !== 0) window.scrollTo(0, 0);
    };

    window.addEventListener("wheel", blockEvent, { passive: false });
    window.addEventListener("touchmove", blockEvent, { passive: false });
    window.addEventListener("keydown", blockKeys);
    window.addEventListener("scroll", keepIntroPosition, { passive: true });

    return () => {
      window.removeEventListener("wheel", blockEvent);
      window.removeEventListener("touchmove", blockEvent);
      window.removeEventListener("keydown", blockKeys);
      window.removeEventListener("scroll", keepIntroPosition);
    };
  }, [introUnlocked, reducedMotion, runIntro]);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    let rafId = 0;
    let conceptShown = conceptVisible;
    let concernsRevealOn = concernsActive;
    let reasonsRevealOn = reasonsActive;
    let reasonsUnlocked = reasonsActive;
    let scrollHintOn = scrollHintVisible;
    let headerSolidOn = headerSolid;
    let headerVisibleOn = headerVisible;

    const easeOutCubic = (t: number) => 1 - (1 - t) ** 3;
    const mobileStackMq = window.matchMedia("(max-width: 899px)");
    const isMobileStack = () => reducedMotion || mobileStackMq.matches;

    const updateAtmosphereSwap = () => {
      const stage = atmosphereStageRef.current;
      const concerns = concernsLayerRef.current;
      const reasons = reasonsLayerRef.current;
      if (!stage || !concerns || !reasons) return;

      const vh = window.innerHeight;

      /* SP / 減モーション：縦積み。出現は IntersectionObserver 側で扱う */
      if (isMobileStack()) {
        concerns.style.opacity = "1";
        concerns.style.transform = "";
        concerns.style.pointerEvents = "";
        concerns.style.zIndex = "";
        concerns.removeAttribute("aria-hidden");
        reasons.style.opacity = "1";
        reasons.style.transform = "";
        reasons.style.pointerEvents = "";
        reasons.style.zIndex = "";
        reasons.removeAttribute("aria-hidden");
        return;
      }

      const stageTop = stage.getBoundingClientRect().top;
      const range = Math.max(1, stage.offsetHeight - vh);
      const raw = Math.min(1, Math.max(0, -stageTop / range));

      /* 悩みを読ませてから理由へ。理由の表示時間を長めに確保 */
      let swap = 0;
      if (raw < 0.32) swap = 0;
      else if (raw < 0.5) swap = (raw - 0.32) / 0.18;
      else swap = 1;
      swap = easeOutCubic(swap);

      /* 悩み：領域に入ったら順次表示（フェードアウト中も中身は維持） */
      const concernsVisible = stageTop < vh * 0.78;
      if (concernsVisible !== concernsRevealOn) {
        concernsRevealOn = concernsVisible;
        setConcernsActive(concernsVisible);
      }

      concerns.style.opacity = String(1 - swap);
      concerns.style.transform = `translate3d(0, ${swap * -28}px, 0)`;
      concerns.style.pointerEvents = swap > 0.55 ? "none" : "auto";
      concerns.style.zIndex = swap > 0.55 ? "0" : "2";
      concerns.setAttribute("aria-hidden", swap > 0.55 ? "true" : "false");

      /* 理由：一度表示したら区間内は維持（スタagger取りこぼし防止） */
      if (swap > 0.22) reasonsUnlocked = true;
      if (swap < 0.06) reasonsUnlocked = false;
      const reasonsVisible = reasonsUnlocked || swap > 0.22;
      reasons.style.opacity = reasonsVisible ? "1" : "0";
      reasons.style.transform = "";
      reasons.style.pointerEvents = reasonsVisible ? "auto" : "none";
      reasons.style.zIndex = reasonsVisible ? "3" : "1";
      reasons.setAttribute("aria-hidden", reasonsVisible ? "false" : "true");
      if (reasonsVisible !== reasonsRevealOn) {
        reasonsRevealOn = reasonsVisible;
        setReasonsActive(reasonsVisible);
      }
    };

    const update = () => {
      const vh = window.innerHeight;
      const concept = conceptRef.current;
      const mobile = isMobileStack();

      if (!conceptShown && introUnlockedRef.current && concept) {
        const conceptTop = concept.getBoundingClientRect().top;
        if (conceptTop < vh * 0.72) {
          conceptShown = true;
          setConceptVisible(true);
        }
      }

      /* PC のみクロスフェード計算。SP は IO に任せてメインスレッド負荷を下げる */
      if (!mobile) updateAtmosphereSwap();

      /* イントロ中はヘッダー／Scroll をタイマー制御に任せる */
      if (!introUnlockedRef.current) return;

      const cover = coverRef.current;
      if (!cover || !concept) return;

      const coverTop = cover.getBoundingClientRect().top;
      const conceptTop = concept.getBoundingClientRect().top;
      const coverAtTop = coverTop <= 64;

      /* ヒーローを過ぎたら SCROLL を隠す（値が変わったときだけ再レンダー） */
      const nextHint = conceptTop > vh * 0.55;
      if (nextHint !== scrollHintOn) {
        scrollHintOn = nextHint;
        setScrollHintVisible(nextHint);
      }

      if (coverAtTop) {
        if (!headerVisibleOn) {
          headerVisibleOn = true;
          setHeaderVisible(true);
        }
        if (!headerSolidOn) {
          headerSolidOn = true;
          setHeaderSolid(true);
        }
        return;
      }

      /* コンセプト・悩み・理由：追従（塗りなし） */
      if (headerSolidOn) {
        headerSolidOn = false;
        setHeaderSolid(false);
      }
      if (!headerVisibleOn) {
        headerVisibleOn = true;
        setHeaderVisible(true);
      }
    };

    const onScrollOrResize = () => {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(update);
    };

    const observers: IntersectionObserver[] = [];

    if (isMobileStack()) {
      const io = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            const visible = entry.isIntersecting;
            if (entry.target === conceptRef.current && visible && !conceptShown) {
              conceptShown = true;
              setConceptVisible(true);
            }
            if (entry.target === concernsLayerRef.current && visible !== concernsRevealOn) {
              concernsRevealOn = visible;
              setConcernsActive(visible);
            }
            if (entry.target === reasonsLayerRef.current && visible !== reasonsRevealOn) {
              reasonsRevealOn = visible;
              setReasonsActive(visible);
            }
          }
        },
        { root: null, rootMargin: "0px 0px -18% 0px", threshold: 0.08 },
      );

      if (conceptRef.current) io.observe(conceptRef.current);
      if (concernsLayerRef.current) io.observe(concernsLayerRef.current);
      if (reasonsLayerRef.current) io.observe(reasonsLayerRef.current);
      observers.push(io);

      /* レイヤーの初期スタイルだけ整える */
      updateAtmosphereSwap();
    }

    update();
    window.addEventListener("scroll", onScrollOrResize, { passive: true });
    window.addEventListener("resize", onScrollOrResize);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("scroll", onScrollOrResize);
      window.removeEventListener("resize", onScrollOrResize);
      observers.forEach((observer) => observer.disconnect());
    };
    // 初期値のみ参照。以降はローカル変数で差分管理する
    // eslint-disable-next-line react-hooks/exhaustive-deps -- scroll ループの再生成を避ける
  }, [reducedMotion]);

  return (
    <>
      <SiteHeader visible={headerVisible} solid={headerSolid} />

      <section
        id="top"
        ref={sectionRef}
        className={styles.intro}
        aria-label="イントロダクション"
      >
        <div className={styles.stickyVisual}>
          <video
            ref={videoRef}
            className={styles.bgVideo}
            src="/top_wind.mp4"
            muted
            loop
            playsInline
            preload="auto"
            aria-hidden="true"
          />
        </div>

        <div className={styles.scrollContent}>
          <section className={`${styles.panel} ${styles.hero}`} aria-label="ヒーロー">
            <div
              className={[
                styles.heroInner,
                heroVisible ? styles.heroVisible : "",
              ]
                .filter(Boolean)
                .join(" ")}
            >
              <Typography
                variant="label"
                as="p"
                className={`${styles.eyebrow} ${styles.revealItem}`}
              >
                女性のライフステージに寄り添う
              </Typography>

              <div className={`${styles.headlineRow} ${styles.revealItem}`}>
                <span className={styles.headlineRule} aria-hidden="true" />
                <Typography
                  variant="display"
                  as="h1"
                  className={styles.headline}
                >
                  <span className={styles.headlineLine}>変わっていく身体に、</span>
                  <br />
                  やさしく寄り添う。
                </Typography>
              </div>

              <Typography
                variant="lead"
                className={`${styles.lead} ${styles.revealItem}`}
              >
                今のあなたに合わせて、
                <br />
                心と身体を整える場所。
              </Typography>

              <div className={`${styles.cta} ${styles.revealItem}`}>
                <ReservationButton variant="filled" showHours />
              </div>
            </div>
          </section>

          <a
            href="#concept"
            className={[
              styles.scrollDown,
              scrollHintVisible ? styles.scrollDownVisible : "",
              introUnlocked ? styles.scrollDownReady : "",
            ]
              .filter(Boolean)
              .join(" ")}
            aria-label="下へスクロール"
            aria-hidden={!scrollHintVisible}
            tabIndex={scrollHintVisible && introUnlocked ? 0 : -1}
            onClick={(event) => {
              if (!introUnlocked) event.preventDefault();
            }}
          >
            <span className={styles.scrollDownLabel}>Scroll</span>
          </a>

          {/* Concept は通常スクロール → お悩み・理由が Concept と同じく追従し、下からカードが覆う */}
          <section
            id="concept"
            ref={conceptRef}
            className={`${styles.panel} ${styles.concept}`}
            aria-label="コンセプト"
          >
            <div
              className={[
                styles.conceptMedia,
                conceptVisible ? styles.conceptMediaVisible : "",
              ]
                .filter(Boolean)
                .join(" ")}
              aria-hidden="true"
            >
              <img
                src="/counseling.jpg"
                alt=""
                width={1200}
                height={900}
                decoding="async"
                className={`${styles.conceptMediaAsset} ${styles.conceptMediaLeft}`}
              />
              <img
                src="/treatment_7.png"
                alt=""
                width={800}
                height={1000}
                decoding="async"
                className={`${styles.conceptMediaAsset} ${styles.conceptMediaRight}`}
              />
            </div>
            <div
              className={[
                styles.conceptInner,
                conceptVisible ? styles.conceptVisible : "",
              ]
                .filter(Boolean)
                .join(" ")}
            >
              <div className={`${styles.conceptHeading} ${styles.revealItem}`}>
                <span className={styles.conceptRule} aria-hidden="true" />
                <Typography
                  variant="enLabel"
                  as="p"
                  className={styles.conceptLabel}
                >
                  Concept
                </Typography>
              </div>
              <div className={styles.conceptBody}>
                <Typography variant="lead" className={styles.revealItem}>
                  女性のライフステージは、
                  <br />
                  日々ゆらぎながら変化していきます。
                </Typography>
                <Typography variant="lead" className={styles.revealItem}>
                  妊娠、出産、産後、
                  <br />
                  そしてその先まで。
                </Typography>
                <Typography variant="lead" className={styles.revealItem}>
                  だからこそ、
                  <br />
                  その時々の「今」に寄り添うことを
                  <br />
                  大切にしています。
                </Typography>
              </div>
            </div>
          </section>

          <div
            ref={atmosphereStageRef}
            className={styles.atmosphereStage}
          >
            <div className={styles.atmosphere} aria-label="お悩みと選ばれる理由">
              <div className={styles.atmosphereFrost} aria-hidden="true" />
              <div className={styles.atmosphereInner}>
                <section
                  ref={concernsLayerRef}
                  className={`${styles.atmosphereLayer} ${styles.atmosphereConcerns}`}
                  aria-label="女性の身体のお悩み"
                >
                  <ConcernsSection active={concernsActive} />
                </section>
                <section
                  ref={reasonsLayerRef}
                  className={`${styles.atmosphereLayer} ${styles.atmosphereReasons}`}
                  aria-label="Luneが選ばれる理由"
                >
                  <ReasonsSection active={reasonsActive} />
                </section>
              </div>
            </div>
          </div>

          <section
            ref={coverRef}
            className={styles.cover}
            aria-label="メニュー・初めての方へ・お知らせ"
          >
            <div className={styles.cardStack}>
              <article
                className={`${styles.stackCard} ${styles.stackCardTall} ${styles.cardMenu}`}
                aria-label="メニューと初めての方へ"
              >
                <MenuSection />
                <FirstVisitSection />
              </article>
            </div>

            <section className={styles.newsBand} aria-label="お知らせ">
              <div className={styles.newsFrost} aria-hidden="true" />
              <div className={styles.newsInner}>
                <NewsSection posts={newsPosts} />
              </div>
            </section>
          </section>
        </div>
      </section>

      <AccessSection />
      <SiteFooter />
    </>
  );
}
