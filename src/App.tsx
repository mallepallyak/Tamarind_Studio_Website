import { FormEvent, useEffect, useState } from "react"
import type { CSSProperties } from "react"

type LandingVariant = "paper-label" | "fabric-portal" | "after-dark"
type WardrobeVariant = "scrapbook-armoire" | "swatch-wall" | "paper-closet"
type PrototypeSet = "original" | "paper-study" | "cloth-paper" | "apricot-archive" | "coffee-ledger" | "black-atelier" | "wine-notebook" | "tailors-table" | "blush-scrapbook" | "ink-grid" | "rust-collage" | "midnight-fabric" | "paper-slip" | "coffee-patchwork" | "apricot-noir" | "tailors-cutting-mat" | "tailors-notes" | "tailors-pattern-room" | "apricot-muslin" | "apricot-coffee" | "peach-ledger" | "sunset-ink" | "apricot-patchwork" | "soft-saffron" | "notebook-buttons" | "pinned-slip" | "workroom-collage"
type Screen = "intro" | "landing" | "wardrobe"

type Fabric = {
  name: string
  note: string
  image: string
  tone: string
}

const landingVariants: { id: LandingVariant; label: string; note: string }[] = [
  {
    id: "paper-label",
    label: "The Paper Label",
    note: "Crumpled, bright, logo-led",
  },
  {
    id: "fabric-portal",
    label: "Fabric Portal",
    note: "Layered cloth and cut paper",
  },
  { id: "after-dark", label: "After Dark", note: "Rich, cinematic, minimal" },
]

const wardrobeVariants: { id: WardrobeVariant; label: string; note: string }[] = [
  {
    id: "scrapbook-armoire",
    label: "Scrapbook Armoire",
    note: "Hand-drawn paper wardrobe",
  },
  {
    id: "swatch-wall",
    label: "The Swatch Wall",
    note: "Gradient fabric pinboard",
  },
  {
    id: "paper-closet",
    label: "The Paper Closet",
    note: "Layered editorial collage",
  },
]

const prototypeSets: { id: PrototypeSet; label: string; note: string }[] = [
  {
    id: "original",
    label: "Original set",
    note: "The three existing directions",
  },
  {
    id: "paper-study",
    label: "Paper study",
    note: "Apricot, coffee, and black",
  },
  {
    id: "cloth-paper",
    label: "Cloth + paper",
    note: "Fabric workroom collage",
  },
  { id: "apricot-archive", label: "Apricot archive", note: "Muted apricot + ink" },
  { id: "coffee-ledger", label: "Coffee ledger", note: "Deep coffee paper" },
  { id: "black-atelier", label: "Black atelier", note: "Black and warm scraps" },
  { id: "wine-notebook", label: "Wine notebook", note: "Wine grid + paper" },
  { id: "tailors-table", label: "Tailor’s table", note: "Cutting-room objects" },
  { id: "blush-scrapbook", label: "Blush scrapbook", note: "Pink handmade collage" },
  { id: "ink-grid", label: "Ink grid", note: "Dark graph-paper study" },
  { id: "rust-collage", label: "Rust collage", note: "Burnt rust, quietly" },
  { id: "midnight-fabric", label: "Midnight fabric", note: "Near-black woven texture" },
  { id: "paper-slip", label: "Paper slip", note: "Taped note and slips" },
  { id: "coffee-patchwork", label: "Coffee patchwork", note: "Coffee textile layers" },
  { id: "apricot-noir", label: "Apricot noir", note: "Soft peach on black" },
  { id: "tailors-cutting-mat", label: "Cutting mat", note: "Ruler, shears, pattern grid" },
  { id: "tailors-notes", label: "Tailor’s notes", note: "Pencil marks and pinned scraps" },
  { id: "tailors-pattern-room", label: "Pattern room", note: "Pattern tissue and measurements" },
  { id: "apricot-muslin", label: "Apricot muslin", note: "Gentle peach and muslin" },
  { id: "apricot-coffee", label: "Apricot + coffee", note: "Warm paper with espresso" },
  { id: "peach-ledger", label: "Peach ledger", note: "Peach notebook and ink" },
  { id: "sunset-ink", label: "Sunset ink", note: "Dusty orange and near-black" },
  { id: "apricot-patchwork", label: "Apricot patchwork", note: "Peach with textile offcuts" },
  { id: "soft-saffron", label: "Soft saffron", note: "Washed golden apricot" },
  { id: "notebook-buttons", label: "Notebook links", note: "Handwritten actions on paper" },
  { id: "pinned-slip", label: "Pinned slip", note: "Taped invitation and note" },
  { id: "workroom-collage", label: "Workroom collage", note: "Tools, scraps and paper" },

]

/* Additional material and palette explorations; original sets retained. */
const fabrics: Fabric[] = [
  {
    name: "Garment 01",
    note: "Deep tamarind weave",
    image: "/assets/fabric-burgundy.png",
    tone: "wine",
  },
  {
    name: "Garment 02",
    note: "Golden silk",
    image: "/assets/fabric-gold.png",
    tone: "gold",
  },
  {
    name: "Garment 03",
    note: "Charcoal twill",
    image: "/assets/fabric-charcoal.png",
    tone: "charcoal",
  },
  {
    name: "Garment 04",
    note: "Red windowpane",
    image: "/assets/fabric-red-weave.png",
    tone: "red",
  },
]

function ArrowIcon() {
  return (
    <svg viewBox="0 0 28 14" aria-hidden="true">
      <path d="M1 7h24M19 1l6 6-6 6" />
    </svg>
  )
}

function HangerIcon() {
  return (
    <svg className="hanger-icon" viewBox="0 0 160 82" aria-hidden="true">
      <path d="M72 22c0-13 19-15 23-4 3 8-6 12-12 15v8l65 32H12l60-32" />
    </svg>
  )
}

function Logo({ light = false }: { light?: boolean }) {
  return (
    <img
      className={`brand-logo ${light ? "brand-logo--light" : ""}`}
      src="/assets/tamarind-logo.jpg"
      alt="Tamarind Studio"
    />
  )
}

function Intro({ onComplete }: { onComplete: () => void }) {
  const [zooming, setZooming] = useState(false)

  const finish = () => {
    if (zooming) return
    setZooming(true)
    window.setTimeout(onComplete, 1150)
  }

  return (
    <main className={`intro ${zooming ? "intro--zoom" : ""}`}>
      <video
        className="intro-film"
        src="/assets/tamarind-wardrobe-intro.mp4"
        autoPlay
        muted
        playsInline
        onEnded={finish}
      />
      <div className="intro-vignette" />
      <button className="skip-button" onClick={finish}>
        Skip film
      </button>
      <div className="wardrobe-push" aria-hidden="true">
        <span />
      </div>
    </main>
  )
}

function ConceptPicker<T extends string>({
  eyebrow,
  items,
  value,
  onChange,
}: {
  eyebrow: string
  items: { id: T; label: string; note: string }[]
  value: T
  onChange: (value: T) => void
}) {
  return (
    <aside className="concept-picker" aria-label={eyebrow}>
      <p>{eyebrow}</p>
      <div>
        {items.map((item, index) => (
          <button
            key={item.id}
            className={value === item.id ? "active" : ""}
            onClick={() => onChange(item.id)}
            aria-pressed={value === item.id}
          >
            <small>0{index + 1}</small>
            <span>
              {item.label}
              <i>{item.note}</i>
            </span>
          </button>
        ))}
      </div>
    </aside>
  )
}

function SetPicker({
  value,
  onChange,
}: {
  value: PrototypeSet
  onChange: (value: PrototypeSet) => void
}) {
  return (
    <nav className="set-picker" aria-label="Prototype sets">
      <p>Prototype sets</p>
      <div>
        {prototypeSets.map((set, index) => (
          <button
            key={set.id}
            className={value === set.id ? "active" : ""}
            onClick={() => onChange(set.id)}
            aria-pressed={value === set.id}
          >
            <small>0{index + 1}</small>
            <span>
              {set.label}
              <i>{set.note}</i>
            </span>
          </button>
        ))}
      </div>
    </nav>
  )
}

function Swatch({
  fabric,
  className = "",
}: {
  fabric: Fabric
  className?: string
}) {
  return (
    <figure className={`fabric-swatch ${className}`}>
      <img src={fabric.image} alt={`${fabric.note} fabric sample`} />
      <figcaption>{fabric.note}</figcaption>
    </figure>
  )
}

function SignupSheet({
  variant,
  prototypeSet,
  onClose,
  onComplete,
}: {
  variant: LandingVariant
  prototypeSet: PrototypeSet
  onClose: () => void
  onComplete: () => void
}) {
  const [submitted, setSubmitted] = useState(false)

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setSubmitted(true)
  }

  return (
    <div
      className={`signup-overlay signup-overlay--${variant} signup-overlay--set-${prototypeSet}`}
      role="dialog"
      aria-modal="true"
      aria-labelledby="signup-title"
    >
      <button
        className="signup-backdrop"
        onClick={onClose}
        aria-label="Close signup"
      />
      <section className="signup-sheet">
        <span className="tape tape--top" aria-hidden="true" />
        <button
          className="sheet-close"
          onClick={onClose}
          aria-label="Close signup"
        >
          ×
        </button>
        <div className="signup-swatch">
          <img src="/assets/fabric-red-weave.png" alt="" />
        </div>
        <p className="kicker">A note from the studio</p>
        {!submitted ? (
          <>
            <h2 id="signup-title">
              Come into
              <br />
              our wardrobe.
            </h2>
            <p className="signup-copy">
              First looks, tiny runs, and stories from the cutting table—sent
              only when there is something worth sharing.
            </p>
            <form onSubmit={submit}>
              <label>
                <span>Your name</span>
                <input
                  name="name"
                  autoComplete="name"
                  placeholder="Name"
                  required
                />
              </label>
              <label>
                <span>Email address</span>
                <input
                  name="email"
                  type="email"
                  autoComplete="email"
                  placeholder="you@email.com"
                  required
                />
              </label>
              <button type="submit">
                Save my spot <ArrowIcon />
              </button>
            </form>
          </>
        ) : (
          <div className="signup-success">
            <h2 id="signup-title">
              Your spot
              <br />
              is saved.
            </h2>
            <p>We’ll meet you inside the wardrobe.</p>
            <button onClick={onComplete}>
              Enter the dressing room <ArrowIcon />
            </button>
          </div>
        )}
        <p className="hand-note">Made slowly, sent thoughtfully.</p>
      </section>
    </div>
  )
}

function Landing({
  prototypeSet,
  onSetChange,
  onEnter,
}: {
  prototypeSet: PrototypeSet
  onSetChange: (value: PrototypeSet) => void
  onEnter: () => void
}) {
  const [variant, setVariant] = useState<LandingVariant>(() => (localStorage.getItem("ts-landing-layout") as LandingVariant) || "after-dark")
  useEffect(() => { localStorage.setItem("ts-landing-layout", variant) }, [variant])
  const [signupOpen, setSignupOpen] = useState(false)

  return (
    <main
      className={`landing landing--${variant} landing--set-${prototypeSet}`}
    >
      <header className="landing-header">
        <span>Edition 01 · Bittersweet</span>
        <span>Independent clothing studio · Edition 01</span>
      </header>

      <div className="paper-grain" aria-hidden="true" />
      {prototypeSet !== "original" && (
        <div className="set-collage" aria-hidden="true">
          <span className="set-collage__paper" />
          <span className="set-collage__fabric" />
          <span className="set-collage__tape" />
          <i>cut · pin · make</i>
          <div className="worktable-props"><span className="worktable-ruler"/><span className="worktable-scissors">✂</span><span className="worktable-pencil">✎</span><span className="worktable-tape">52 cm</span><span className="worktable-pattern">FRONT / CUT 2<br/>grainline ↓<br/>— — — — —</span><span className="worktable-pin">✳</span></div>
        </div>
      )}
      <Swatch
        fabric={fabrics[0]}
        className="landing-swatch landing-swatch--one"
      />
      <Swatch
        fabric={fabrics[1]}
        className="landing-swatch landing-swatch--two"
      />
      <Swatch
        fabric={fabrics[3]}
        className="landing-swatch landing-swatch--three"
      />

      <section className="landing-copy">
        <p className="kicker">Opening soon · Late summer</p>
        <div className="reveal-logo">
          <Logo
            light={
              (prototypeSet === "original" && variant === "after-dark") ||
              prototypeSet === "cloth-paper"
            }
          />
          {(["notebook-buttons", "pinned-slip", "tailors-notes", "peach-ledger", "apricot-muslin"] as PrototypeSet[]).includes(prototypeSet) && <div className="paper-note-actions"><button onClick={() => setSignupOpen(true)}>join the list ↗</button><button onClick={onEnter}>peek inside the wardrobe →</button></div>}
        </div>
        <h1>
          Clothes for <em>your good mood.</em>
        </h1>
        <p>
          Tactile pieces, rich colour, and small runs—made for plans that turn
          into stories.
        </p>
        <div className={`landing-actions ${(["notebook-buttons", "pinned-slip", "tailors-notes", "peach-ledger", "apricot-muslin"] as PrototypeSet[]).includes(prototypeSet) ? "landing-actions--hidden" : ""}`}>
          <button
            className="primary-action"
            onClick={() => setSignupOpen(true)}
          >
            Save my spot <ArrowIcon />
          </button>
          <button className="text-action" onClick={onEnter}>
            Preview the dressing room
          </button>
        </div>
      </section>

      <div className="landing-stamp" aria-hidden="true">
        <span>TS</span>
        <i>01</i>
      </div>
      <p className="landing-note">a little tart, a little sweet</p>

      <SetPicker value={prototypeSet} onChange={onSetChange} />
      {(
        <ConceptPicker
          eyebrow="Landing + signup directions"
          items={landingVariants}
          value={variant}
          onChange={setVariant}
        />
      )}
      {signupOpen && (
        <SignupSheet
          variant={variant}
          prototypeSet={prototypeSet}
          onClose={() => setSignupOpen(false)}
          onComplete={onEnter}
        />
      )}
    </main>
  )
}

function GarmentPlaceholder({
  fabric,
  index,
}: {
  fabric: Fabric
  index: number
}) {
  return (
    <button className={`garment garment--${index + 1}`}>
      <HangerIcon />
      <span className="garment-ghost">
        <i className="ghost-seam" />
        <b>
          silhouette
          <br />
          coming soon
        </b>
      </span>
      <span className="garment-label">
        <i style={{ backgroundImage: `url(${fabric.image})` }} />
        <span>
          <strong>{fabric.name}</strong>
          <small>{fabric.note}</small>
        </span>
        <b>Preview</b>
      </span>
    </button>
  )
}

function Wardrobe({
  prototypeSet,
  onSetChange,
  onHome,
}: {
  prototypeSet: PrototypeSet
  onSetChange: (value: PrototypeSet) => void
  onHome: () => void
}) {
  const [variant, setVariant] = useState<WardrobeVariant>(() => (localStorage.getItem("ts-wardrobe-layout") as WardrobeVariant) || "scrapbook-armoire")
  useEffect(() => { localStorage.setItem("ts-wardrobe-layout", variant) }, [variant])

  return (
    <main
      className={`collection collection--${variant} collection--set-${prototypeSet}`} style={{"--theme-index": prototypeSets.findIndex((item) => item.id === prototypeSet)} as CSSProperties}
    >
      <header className="collection-header">
        <button className="logo-button" onClick={onHome}>
          <Logo />
        </button>
        <p>Edition 01 · The first four</p>
        <button className="circle-button" aria-label="Shopping bag">
          Bag <span>0</span>
        </button>
      </header>

      <section className="collection-intro">
        <div>
          <p className="kicker">Tamarind dressing room</p>
          <h1>Choose a hanger.</h1>
        </div>
        <p>
          The clothes are still on the cutting table. For now, explore the
          fabrics and reserve a place by the rail.
        </p>
      </section>

      <section className="wardrobe-stage">
        <div className="wardrobe-scraps" aria-hidden="true">
          <span className="wardrobe-scrap wardrobe-scrap--one" />
          <span className="wardrobe-scrap wardrobe-scrap--two" />
          <span className="wardrobe-scrap wardrobe-scrap--three" />
          <i>cut · pin · wear</i>
        </div>
        <div className="workroom-annotations" aria-hidden="true"><span>01 / cut on fold</span><span>✂</span><span>measure twice, cut once</span></div>
        <div className="theme-wardrobe-decor" aria-hidden="true"><span className="theme-wardrobe-decor__ruler"/><span className="theme-wardrobe-decor__swatch"/><span className="theme-wardrobe-decor__slip">TAMARIND / STUDIO<br/>CUT 01 · KEEP</span><span className="theme-wardrobe-decor__thread">✳</span><span className="theme-wardrobe-decor__shears">✂</span></div>
        <div className="wardrobe-crown">
          <i>◇</i>
          <span>The first wardrobe</span>
          <i>◇</i>
        </div>
        <div className="wardrobe-shell">
          <div className="wardrobe-door wardrobe-door--left">
            <span />
          </div>
          <div className="wardrobe-interior">
            <div className="wardrobe-rail" />
            <div className="garment-grid">
              {fabrics.map((fabric, index) => (
                <GarmentPlaceholder
                  key={fabric.name}
                  fabric={fabric}
                  index={index}
                />
              ))}
            </div>
            <p className="wardrobe-caption">
              No mannequins. Just the piece, the fabric, and you.
            </p>
          </div>
          <div className="wardrobe-door wardrobe-door--right">
            <span />
          </div>
        </div>
      </section>

      <SetPicker value={prototypeSet} onChange={onSetChange} />
      {(
        <ConceptPicker
          eyebrow="Collection display directions"
          items={wardrobeVariants}
          value={variant}
          onChange={setVariant}
        />
      )}
    </main>
  )
}

export default function App() {
  const [screen, setScreen] = useState<Screen>("intro")
  const [prototypeSet, setPrototypeSet] = useState<PrototypeSet>("original")

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [screen])

  if (screen === "intro")
    return <Intro onComplete={() => setScreen("landing")} />
  if (screen === "wardrobe") {
    return (
      <Wardrobe
        prototypeSet={prototypeSet}
        onSetChange={setPrototypeSet}
        onHome={() => setScreen("landing")}
      />
    )
  }
  return (
    <Landing
      prototypeSet={prototypeSet}
      onSetChange={setPrototypeSet}
      onEnter={() => setScreen("wardrobe")}
    />
  )
}
