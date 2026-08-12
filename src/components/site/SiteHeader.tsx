"use client";

import { useEffect, useId, useState } from "react";
import { usePathname } from "next/navigation";
import { BRAND_NAME, BRAND_SHORT, BRAND_TAGLINE } from "@/lib/brand";
import { Button } from "@/components/ui/Button";
import { ReservationButton } from "@/components/ui/ReservationButton";
import { Typography } from "@/components/ui/Typography";
import { MENU_ITEMS } from "@/data/menus";
import styles from "./site-header.module.css";

type SiteHeaderProps = {
  visible: boolean;
  /** 次セクション上でヘッダーを塗りつぶしてかぶせる */
  solid?: boolean;
};

const NAV = [
  {
    label: "メニュー",
    href: "/top#menu",
    children: MENU_ITEMS.map((item) => ({
      label: item.title,
      href: `/menu/${item.slug}`,
    })),
  },
  { label: "初めての方へ", href: "/first" },
  { label: "News", href: "/news" },
  { label: "Q&A", href: "/qa" },
] as const;

function isActivePath(pathname: string, href: string) {
  const path = href.split("#")[0];
  if (!path) return false;
  return pathname === path || pathname.startsWith(`${path}/`);
}

function isMenuActive(pathname: string) {
  return pathname.startsWith("/menu");
}

export function SiteHeader({ visible, solid = false }: SiteHeaderProps) {
  const pathname = usePathname() ?? "";
  const [mobileOpen, setMobileOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const mobilePanelId = useId();
  const desktopMenuId = useId();

  useEffect(() => {
    setMobileOpen(false);
    setMenuOpen(false);
    setMobileMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!mobileOpen) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMobileOpen(false);
    };
    document.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  const solidClass = solid ? styles.headerSolid : "";

  const reserveVariant = solid ? "header" : "headerFill";

  return (
    <>
      <header
        className={[
          styles.header,
          visible ? styles.headerVisible : "",
          solidClass,
        ]
          .filter(Boolean)
          .join(" ")}
      >
        <a href="/top" className={styles.headerBrand} aria-label={BRAND_NAME}>
          <span className={styles.headerLogo}>
            <img
              src="/brand/Logo.png"
              alt=""
              width={288}
              height={348}
              decoding="async"
            />
          </span>
          <Typography variant="caption" as="span" className={styles.headerTag}>
            {BRAND_TAGLINE}
          </Typography>
        </a>
        <nav className={styles.headerNav} aria-label="メインナビゲーション">
          {NAV.map((item) => {
            if ("children" in item && item.children) {
              const active = isMenuActive(pathname);
              return (
                <div
                  key={item.label}
                  className={[
                    styles.navMenu,
                    menuOpen ? styles.navMenuOpen : "",
                    active ? styles.navActive : "",
                  ]
                    .filter(Boolean)
                    .join(" ")}
                  onMouseEnter={() => setMenuOpen(true)}
                  onMouseLeave={() => setMenuOpen(false)}
                >
                  <Button
                    variant="text"
                    type="button"
                    className={[styles.navTextButton, styles.navMenuButton]
                      .filter(Boolean)
                      .join(" ")}
                    aria-expanded={menuOpen}
                    aria-haspopup="true"
                    aria-controls={desktopMenuId}
                    onClick={() => setMenuOpen((v) => !v)}
                  >
                    {item.label}
                  </Button>
                  <div id={desktopMenuId} className={styles.navDropdown}>
                    {item.children.map((child) => (
                      <Button
                        key={child.href}
                        variant="text"
                        href={child.href}
                        className={styles.navDropdownText}
                        aria-current={
                          isActivePath(pathname, child.href) ? "page" : undefined
                        }
                      >
                        {child.label}
                      </Button>
                    ))}
                  </div>
                </div>
              );
            }

            const active = isActivePath(pathname, item.href);
            return (
              <Button
                key={item.href}
                variant="text"
                href={item.href}
                className={[
                  styles.navTextButton,
                  active ? styles.navActive : "",
                ]
                  .filter(Boolean)
                  .join(" ")}
                aria-current={active ? "page" : undefined}
              >
                {item.label}
              </Button>
            );
          })}
        </nav>
        <ReservationButton variant={reserveVariant} />
      </header>

      <header
        className={[
          styles.mobileHeader,
          visible ? styles.mobileHeaderVisible : "",
          solidClass,
        ]
          .filter(Boolean)
          .join(" ")}
      >
        <a href="/top" className={styles.headerLogo} aria-label={BRAND_NAME}>
          <img
            src="/brand/Logo.png"
            alt={BRAND_SHORT}
            width={288}
            height={348}
            decoding="async"
          />
        </a>
        <div className={styles.mobileActions}>
          <ReservationButton variant={reserveVariant} />
          <button
            type="button"
            className={[
              styles.menuButton,
              mobileOpen ? styles.menuButtonOpen : "",
            ]
              .filter(Boolean)
              .join(" ")}
            aria-label={mobileOpen ? "メニューを閉じる" : "メニューを開く"}
            aria-expanded={mobileOpen}
            aria-controls={mobilePanelId}
            onClick={() => setMobileOpen((v) => !v)}
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </header>

      <div
        id={mobilePanelId}
        className={[
          styles.mobilePanel,
          mobileOpen ? styles.mobilePanelOpen : "",
        ]
          .filter(Boolean)
          .join(" ")}
        hidden={!mobileOpen}
      >
        <nav className={styles.mobileNav} aria-label="モバイルナビゲーション">
          {NAV.map((item) => {
            if ("children" in item && item.children) {
              return (
                <div key={item.label}>
                  <button
                    type="button"
                    className={styles.mobileMenuToggle}
                    aria-expanded={mobileMenuOpen}
                    onClick={() => setMobileMenuOpen((v) => !v)}
                  >
                    <span>{item.label}</span>
                    <span aria-hidden="true">{mobileMenuOpen ? "−" : "+"}</span>
                  </button>
                  {mobileMenuOpen ? (
                    <div className={styles.mobileSubnav}>
                      {item.children.map((child) => (
                        <a
                          key={child.href}
                          href={child.href}
                          onClick={() => setMobileOpen(false)}
                        >
                          {child.label}
                        </a>
                      ))}
                    </div>
                  ) : null}
                </div>
              );
            }

            return (
              <Typography
                key={item.href}
                variant="label"
                as="a"
                href={item.href}
                onClick={() => setMobileOpen(false)}
              >
                {item.label}
              </Typography>
            );
          })}
        </nav>
      </div>

      {mobileOpen ? (
        <button
          type="button"
          className={styles.mobileBackdrop}
          aria-label="メニューを閉じる"
          onClick={() => setMobileOpen(false)}
        />
      ) : null}
    </>
  );
}
