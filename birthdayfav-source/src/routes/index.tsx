import { createFileRoute } from "@tanstack/react-router";
import { ArrowDown, ArrowRight, Check, RotateCcw, Sparkles } from "lucide-react";
import { useEffect, useRef, useState, type ButtonHTMLAttributes, type ReactNode } from "react";

import memoryCity from "@/assets/memory-city.jpg";
import memoryMorning from "@/assets/memory-morning.jpg";
import memorySeaside from "@/assets/memory-seaside.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "A Little Something for [NAME]" },
      {
        name: "description",
        content: "A private, cinematic birthday story made especially for [NAME].",
      },
      { property: "og:title", content: "A Little Something for [NAME]" },
      {
        property: "og:description",
        content: "A private birthday story, made with love and meant for one person.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: BirthdayStory,
});

/*
 * PERSONALIZE HERE
 * Replace every bracketed value below. Swap the imported memory images above
 * with your own photos while keeping the same `src` fields.
 */
const STORY = {
  name: "[NAME]",
  date: "[BIRTHDAY DATE]",
  openingNote: "A small story, made for one very special person.",
  reminders: [
    {
      number: "01",
      title: "You make ordinary days feel rare.",
      copy: "[ADD A SHORT NOTE ABOUT THE JOY THEY BRING TO EVERYDAY MOMENTS.]",
    },
    {
      number: "02",
      title: "Your kindness never goes unnoticed.",
      copy: "[ADD A MEMORY OF A SMALL, KIND THING THEY DID THAT STAYED WITH YOU.]",
    },
    {
      number: "03",
      title: "You are more loved than you know.",
      copy: "[ADD A HEARTFELT REMINDER IN YOUR OWN WORDS.]",
    },
  ],
  memories: [
    {
      src: memorySeaside,
      index: "I",
      date: "[DATE / PLACE]",
      caption: "[THE DAY TIME SEEMED TO SLOW DOWN]",
      alt: "Placeholder memory of a sunset walk by the sea",
    },
    {
      src: memoryCity,
      index: "II",
      date: "[DATE / PLACE]",
      caption: "[THE NIGHT WE FORGOT ABOUT THE RAIN]",
      alt: "Placeholder memory of a rainy evening in the city",
    },
    {
      src: memoryMorning,
      index: "III",
      date: "[DATE / PLACE]",
      caption: "[ONE OF THOSE PERFECTLY ORDINARY MORNINGS]",
      alt: "Placeholder memory of coffee and books in morning light",
    },
  ],
  wishLines: [
    "If I could give you one thing today…",
    "it wouldn’t be something wrapped.",
    "It would be the chance to see yourself",
    "the way I see you.",
    "Bright. Brave. Entirely unforgettable.",
  ],
  proposalMessage:
    "[ADD YOUR PERSONAL PROPOSAL MESSAGE HERE — TELL THEM WHAT THIS LOVE MEANS TO YOU AND WHAT YOU HOPE COMES NEXT.]",
  successMessage:
    "[ADD THE WORDS YOU WANT THEM TO READ THE MOMENT THEY SAY YES.]",
  closingMessage:
    "[ADD A FINAL, QUIET CLOSING NOTE — A PROMISE, A DATE, OR SIMPLY ‘I LOVE YOU.’]",
};

const SECTIONS = ["Opening", "Birthday", "Notes", "Memories", "A wish", "A thought", "One more", "For you"];
const STORAGE_KEY = "birthday-proposal-response";

type StoryButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "quiet" | "ghost";
  children: ReactNode;
};

function StoryButton({ variant = "primary", children, className = "", ...props }: StoryButtonProps) {
  return (
    <button className={`story-button story-button--${variant} ${className}`} {...props}>
      {children}
    </button>
  );
}

function BirthdayStory() {
  const [started, setStarted] = useState(false);
  const [proposalUnlocked, setProposalUnlocked] = useState(false);
  const [response, setResponse] = useState<"yes" | "not-yet" | null>(null);
  const [activeSection, setActiveSection] = useState(0);
  const [isHydrated, setIsHydrated] = useState(false);
  const storyRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const savedResponse = window.localStorage.getItem(STORAGE_KEY);
    if (savedResponse === "yes") {
      setResponse("yes");
      setStarted(true);
      setProposalUnlocked(true);
    }
    setIsHydrated(true);
  }, []);

  useEffect(() => {
    const revealNodes = document.querySelectorAll<HTMLElement>("[data-reveal]");
    const sectionNodes = document.querySelectorAll<HTMLElement>("[data-story-section]");
    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add("is-visible");
        });
      },
      { threshold: 0.16 },
    );
    const sectionObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const section = entry.target as HTMLElement;
          if (entry.isIntersecting) setActiveSection(Number(section.dataset["storySection"] ?? 0));
        });
      },
      { threshold: 0.52 },
    );
    revealNodes.forEach((node) => revealObserver.observe(node));
    sectionNodes.forEach((node) => sectionObserver.observe(node));
    return () => {
      revealObserver.disconnect();
      sectionObserver.disconnect();
    };
  }, [started, proposalUnlocked, response]);

  const scrollToSection = (index: number) => {
    document.querySelector(`[data-story-section="${index}"]`)?.scrollIntoView({ behavior: "smooth" });
  };

  const begin = () => {
    setStarted(true);
    window.setTimeout(() => scrollToSection(1), 120);
  };

  const unlockProposal = () => {
    setProposalUnlocked(true);
    window.setTimeout(() => scrollToSection(7), 120);
  };

  const acceptProposal = () => {
    window.localStorage.setItem(STORAGE_KEY, "yes");
    setResponse("yes");
  };

  const replay = () => {
    window.localStorage.removeItem(STORAGE_KEY);
    setResponse(null);
    setProposalUnlocked(false);
    setStarted(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <main ref={storyRef} className="story-shell">
      <div className="ambient-stars" aria-hidden="true" />
      <div className="film-grain" aria-hidden="true" />

      {started && (
        <nav className="chapter-nav" aria-label="Story chapters">
          <span className="chapter-count">{String(activeSection + 1).padStart(2, "0")}</span>
          <div className="chapter-track" aria-hidden="true">
            <span className="chapter-progress" style={{ transform: `scaleY(${(activeSection + 1) / SECTIONS.length})` }} />
          </div>
          <div className="chapter-dots">
            {SECTIONS.map((label, index) => (
              <button
                key={label}
                type="button"
                className={index === activeSection ? "chapter-dot is-active" : "chapter-dot"}
                aria-label={`Go to ${label}`}
                aria-current={index === activeSection ? "step" : undefined}
                onClick={() => scrollToSection(index)}
              />
            ))}
          </div>
          <span className="chapter-total">08</span>
        </nav>
      )}

      <section className="story-section opening" data-story-section="0" aria-labelledby="opening-title">
        <div className="opening-frame" aria-hidden="true" />
        <p className="eyebrow opening-date">{STORY.date}</p>
        <div className="opening-copy">
          <p className="kicker">A note for {STORY.name}</p>
          <h1 id="opening-title">Today is a little<br />more <em>special.</em></h1>
          <p className="opening-note">{STORY.openingNote}</p>
          <StoryButton onClick={begin} aria-label="Begin the birthday story">
            <span>Begin</span><ArrowDown size={16} aria-hidden="true" />
          </StoryButton>
        </div>
        <p className="opening-mark">Made with care · just for you</p>
      </section>

      {started && (
        <>
          <section className="story-section birthday" data-story-section="1" aria-labelledby="birthday-title">
            <div className="birthday-halo" aria-hidden="true" />
            <div className="celebration-stars" aria-hidden="true">
              {Array.from({ length: 16 }, (_, index) => <i key={index} />)}
            </div>
            <div className="birthday-copy" data-reveal>
              <p className="eyebrow">This day belongs to you</p>
              <h2 id="birthday-title"><span>Happy Birthday,</span>{STORY.name}</h2>
              <div className="ornament" aria-hidden="true"><span /><Sparkles size={18} /><span /></div>
              <p>May this next chapter bring you soft mornings, brave dreams,<br className="desktop-break" /> and a thousand reasons to smile.</p>
            </div>
            <button className="scroll-cue" type="button" onClick={() => scrollToSection(2)} aria-label="Continue to the next chapter">
              <span>Continue</span><ArrowDown size={14} />
            </button>
          </section>

          <section className="story-section reminders" data-story-section="2" aria-labelledby="reminders-title">
            <div className="section-heading" data-reveal>
              <p className="eyebrow">Keep these close</p>
              <h2 id="reminders-title">A few things I hope<br />you remember today…</h2>
            </div>
            <div className="reminder-list">
              {STORY.reminders.map((item) => (
                <article className="reminder-row" data-reveal key={item.number}>
                  <span className="reminder-number">{item.number}</span>
                  <h3>{item.title}</h3>
                  <p>{item.copy}</p>
                </article>
              ))}
            </div>
          </section>

          <section className="story-section memories" data-story-section="3" aria-labelledby="memories-title">
            <header className="memories-header" data-reveal>
              <div>
                <p className="eyebrow">A small archive</p>
                <h2 id="memories-title">Some moments<br />I keep returning to.</h2>
              </div>
              <p>[REPLACE THESE WITH YOUR OWN PHOTOS &amp; CAPTIONS]</p>
            </header>
            <div className="memory-grid">
              {STORY.memories.map((memory, index) => (
                <figure className={`memory memory--${index + 1}`} data-reveal key={memory.index}>
                  <div className="memory-image-wrap">
                    <img src={memory.src} alt={memory.alt} loading="lazy" width={912} height={1200} />
                    <span className="memory-index">{memory.index}</span>
                  </div>
                  <figcaption>
                    <span>{memory.date}</span>
                    <p>{memory.caption}</p>
                  </figcaption>
                </figure>
              ))}
            </div>
          </section>

          <section className="story-section wish" data-story-section="4" aria-labelledby="wish-title">
            <div className="wish-orbit" aria-hidden="true" />
            <div className="wish-lines" data-reveal>
              {STORY.wishLines.map((line, index) => (
                index === 0 ? <h2 id="wish-title" key={line}>{line}</h2> : <p key={line} className={index === 4 ? "wish-emphasis" : ""}>{line}</p>
              ))}
            </div>
          </section>

          <section className="story-section suspense" data-story-section="5" aria-labelledby="suspense-title">
            <div className="suspense-line" aria-hidden="true" />
            <div data-reveal>
              <p className="eyebrow">And still…</p>
              <h2 id="suspense-title">There’s something<br />I’ve wanted to tell you.</h2>
              <p className="suspense-copy">Something I’ve carried quietly, waiting for the right moment.</p>
            </div>
          </section>

          <section className="story-section threshold" data-story-section="6" aria-labelledby="threshold-title">
            <div className="threshold-symbol" aria-hidden="true"><span /><i /><span /></div>
            <div data-reveal>
              <p className="eyebrow">Take a breath</p>
              <h2 id="threshold-title">There’s just one<br />more page.</h2>
              <StoryButton variant="quiet" onClick={unlockProposal}>
                <span>Keep going…</span><ArrowRight size={16} />
              </StoryButton>
            </div>
          </section>

          {proposalUnlocked && (
            <section className="story-section proposal" data-story-section="7" aria-labelledby="proposal-title">
              <div className="proposal-aura" aria-hidden="true" />
              {response === "yes" && (
                <div className="confetti" aria-hidden="true">
                  {Array.from({ length: 32 }, (_, index) => <i key={index} />)}
                </div>
              )}
              <div className="proposal-inner" data-reveal>
                {response !== "yes" ? (
                  <>
                    <p className="eyebrow">The truest thing I know</p>
                    <h2 id="proposal-title">So, {STORY.name}…<br /><span>there’s one question<br />I want to ask you.</span></h2>
                    <p className="proposal-message">{STORY.proposalMessage}</p>
                    <div className="proposal-question">
                      <p>Will you be mine?</p>
                      <div className="proposal-actions">
                        <StoryButton onClick={acceptProposal}>
                          <span>Yes</span><Sparkles size={16} />
                        </StoryButton>
                        <StoryButton variant="ghost" onClick={() => setResponse("not-yet")}>
                          I need one more dramatic pause
                        </StoryButton>
                      </div>
                      {response === "not-yet" && (
                        <p className="playful-response" role="status">Completely fair. The stars can wait — take all the time you need.</p>
                      )}
                    </div>
                  </>
                ) : (
                  <div className="accepted" aria-live="polite">
                    <div className="accepted-mark"><Check size={30} /></div>
                    <p className="eyebrow">You said yes</p>
                    <h2 id="proposal-title">And suddenly,<br /><em>everything glows.</em></h2>
                    <p className="success-message">{STORY.successMessage}</p>
                    <div className="closing-note">
                      <span>One last note</span>
                      <p>{STORY.closingMessage}</p>
                    </div>
                    <StoryButton variant="ghost" onClick={replay}>
                      <RotateCcw size={15} /><span>Replay our story</span>
                    </StoryButton>
                  </div>
                )}
              </div>
              <footer className="story-footer">For {STORY.name}, always · {STORY.date}</footer>
            </section>
          )}
        </>
      )}

      {!isHydrated && <span className="sr-only">Loading your story</span>}
    </main>
  );
}