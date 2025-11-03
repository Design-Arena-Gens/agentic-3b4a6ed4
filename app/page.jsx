"use client";

import './globals.css';
import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useMemo, useRef, useState } from 'react';

const HINGLISH_SCRIPT = [
  "Ab design karega AI vs AI!", 
  "Kaunsa model banayega best look?",
  "Tum decide karoge ? vote do aur dekho kaun jeetega DesignArena mein!"
];

function useSpeech(scriptLines, enabled) {
  useEffect(() => {
    if (!enabled) return;
    const synth = typeof window !== 'undefined' ? window.speechSynthesis : null;
    if (!synth) return;
    let cancelled = false;
    const speakLine = (text, delay) => {
      setTimeout(() => {
        if (cancelled) return;
        const u = new SpeechSynthesisUtterance(text);
        u.rate = 1.03; u.pitch = 1.02; u.volume = 1;
        const voices = synth.getVoices();
        const prefer = voices.find(v => /hi|en-IN/i.test(v.lang)) || voices.find(v => /en/i.test(v.lang));
        if (prefer) u.voice = prefer;
        synth.speak(u);
      }, delay);
    };
    let t = 0;
    for (const line of scriptLines) {
      speakLine(line, t);
      t += Math.max(1500, 3500 * Math.min(1, line.length / 40));
    }
    return () => { cancelled = true; synth.cancel(); };
  }, [scriptLines, enabled]);
}

function Background() {
  return (
    <div className="neonGrid scanlines" aria-hidden>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.25 }}
        transition={{ duration: 1.2 }}
        style={{ position: 'fixed', inset: 0,
          background: 'radial-gradient(1000px 600px at 20% 10%, rgba(0,229,255,.08), transparent), radial-gradient(900px 600px at 80% 90%, rgba(138,46,255,.08), transparent)'}}
      />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.15 }}
        transition={{ duration: 1.6 }}
        style={{ position: 'fixed', inset: 0, background: 'conic-gradient(from 180deg at 50% 50%, rgba(255,60,255,.06), rgba(0,229,255,.06), rgba(255,223,110,.06), rgba(255,60,255,.06))'}}
      />
    </div>
  );
}

function GlitchText({ children, className }) {
  return (
    <div className={`glitchWrap ${className || ''}`}>
      <div>{children}</div>
      <div className="slice p" aria-hidden>{children}</div>
      <div className="slice c" aria-hidden>{children}</div>
    </div>
  );
}

function StartOverlay({ onStart }) {
  return (
    <div style={{ position: 'fixed', inset: 0, display: 'grid', placeItems: 'center', zIndex: 20,
      background: 'linear-gradient(180deg, rgba(5,6,10,.8), rgba(5,6,10,.9))'}}>
      <div style={{ textAlign: 'center', maxWidth: 820, padding: 24 }}>
        <h1 className="neonText" style={{ fontSize: 56, margin: 0, letterSpacing: .5 }}>DesignArena.ai</h1>
        <p style={{ opacity: .85, marginTop: 12 }}>Where AIs Compete, Creativity Wins.</p>
        <button className="buttonPrimary" onClick={onStart}>
          Enter the Arena
        </button>
      </div>
    </div>
  );
}

function Music({ play }) {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (play) { el.currentTime = 0; el.play().catch(() => {}); } else { el.pause(); }
  }, [play]);
  return (
    <audio ref={ref} preload="auto" loop>
      {/* royalty-free energetic electronic track (preview) */}
      <source src="https://cdn.pixabay.com/download/audio/2022/10/30/audio_2dbe7bbf0b.mp3?filename=future-bass-124697.mp3" type="audio/mpeg" />
    </audio>
  );
}

function Frame({ children }) {
  return (
    <div className="card" style={{ position: 'relative', padding: 18, borderRadius: 20, overflow: 'hidden' }}>
      <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(600px 300px at 10% 0%, rgba(0,229,255,.06), transparent), radial-gradient(600px 300px at 90% 100%, rgba(138,46,255,.06), transparent)' }} />
      <div style={{ position: 'relative' }}>{children}</div>
    </div>
  );
}

function PosterCard({ label, hue }) {
  return (
    <Frame>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
        <div style={{ aspectRatio: '3/4', borderRadius: 14, background: `linear-gradient(160deg, hsl(${hue} 90% 55% / .9), hsl(${(hue+60)%360} 90% 55% / .7))` }} />
        <div style={{ display: 'grid', gap: 8 }}>
          <div style={{ height: 16, width: '72%', borderRadius: 9999, background: 'rgba(255,255,255,.08)' }} />
          <div style={{ height: 16, width: '88%', borderRadius: 9999, background: 'rgba(255,255,255,.08)' }} />
          <div style={{ height: 12, width: '66%', borderRadius: 9999, background: 'rgba(255,255,255,.06)' }} />
          <div style={{ height: 12, width: '80%', borderRadius: 9999, background: 'rgba(255,255,255,.06)' }} />
          <div style={{ height: 12, width: '44%', borderRadius: 9999, background: 'rgba(255,255,255,.06)' }} />
          <div style={{ marginTop: 'auto', display: 'flex', gap: 8 }}>
            <span className="buttonPrimary" style={{ padding: '6px 12px' }}>Glitch</span>
            <span className="buttonPrimary" style={{ padding: '6px 12px' }}>Neon</span>
          </div>
        </div>
      </div>
      <div style={{ marginTop: 12, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <strong className="neonText">{label}</strong>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <span style={{ color: 'var(--gold)' }}>? ? ? ? ?</span>
          <span style={{ opacity: .8 }}>4.2</span>
        </div>
      </div>
    </Frame>
  );
}

function WebsiteCard({ label, hue }) {
  return (
    <Frame>
      <div style={{ display: 'grid', gap: 10 }}>
        <div style={{ height: 42, borderRadius: 12, background: 'rgba(255,255,255,.06)', display: 'grid', gridTemplateColumns: '60px 1fr 120px', gap: 8, alignItems: 'center', padding: 8 }}>
          <div style={{ height: 26, width: 26, borderRadius: 9999, background: `hsl(${hue} 90% 60%)` }} />
          <div style={{ height: 14, width: '80%', borderRadius: 9999, background: 'rgba(255,255,255,.12)' }} />
          <div style={{ height: 26, borderRadius: 8, background: `linear-gradient(90deg, hsl(${hue} 90% 60%), hsl(${(hue+30)%360} 90% 60%))` }} />
        </div>
        <div style={{ height: 160, borderRadius: 12, background: `linear-gradient(180deg, rgba(255,255,255,.02), rgba(255,255,255,.01)), conic-gradient(from 0deg, hsl(${hue} 90% 60% / .35), hsl(${(hue+120)%360} 90% 60% / .35), hsl(${(hue+240)%360} 90% 60% / .35), hsl(${hue} 90% 60% / .35))` }} />
      </div>
      <div style={{ marginTop: 12, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <strong className="neonText">{label}</strong>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <span style={{ color: 'var(--gold)' }}>? ? ? ? ?</span>
          <span style={{ opacity: .8 }}>4.8</span>
        </div>
      </div>
    </Frame>
  );
}

function LogoCard({ label, hue }) {
  return (
    <Frame>
      <div style={{ display: 'grid', gridTemplateColumns: '140px 1fr', gap: 14 }}>
        <div style={{ aspectRatio: '1/1', borderRadius: 16, background:
          `radial-gradient(circle at 30% 30%, hsl(${hue} 90% 65%), transparent 40%), radial-gradient(circle at 70% 70%, hsl(${(hue+180)%360} 90% 65%), transparent 42%),
           conic-gradient(from 0deg, hsl(${hue} 90% 50% / .6), hsl(${(hue+120)%360} 90% 50% / .6), hsl(${(hue+240)%360} 90% 50% / .6), hsl(${hue} 90% 50% / .6))` }} />
        <div style={{ display: 'grid', gap: 10, alignContent: 'center' }}>
          <div style={{ height: 18, width: '80%', borderRadius: 9999, background: 'rgba(255,255,255,.12)' }} />
          <div style={{ height: 14, width: '66%', borderRadius: 9999, background: 'rgba(255,255,255,.08)' }} />
          <div style={{ height: 12, width: '40%', borderRadius: 9999, background: 'rgba(255,255,255,.06)' }} />
        </div>
      </div>
      <div style={{ marginTop: 12, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <strong className="neonText">{label}</strong>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <span style={{ color: 'var(--gold)' }}>? ? ? ? ?</span>
          <span style={{ opacity: .8 }}>4.4</span>
        </div>
      </div>
    </Frame>
  );
}

function Art3DCard({ label, hue }) {
  return (
    <Frame>
      <div style={{ height: 220, borderRadius: 14, overflow: 'hidden', position: 'relative' }}>
        <motion.div initial={{ scale: 1.05 }} animate={{ scale: 1 }} transition={{ duration: 3, repeat: Infinity, repeatType: 'reverse' }}
          style={{ position: 'absolute', inset: 0, background:
            `radial-gradient(circle at 50% 30%, hsl(${hue} 90% 60% / .8), transparent 35%),
             radial-gradient(800px 120px at 20% 70%, rgba(255,255,255,.08), transparent 40%),
             linear-gradient(120deg, hsl(${(hue+30)%360} 90% 55% / .7), hsl(${(hue+210)%360} 90% 55% / .7))` }} />
        <motion.div initial={{ y: 40 }} animate={{ y: -40 }} transition={{ duration: 4, repeat: Infinity, repeatType: 'mirror' }}
          style={{ position: 'absolute', left: '10%', bottom: '-10%', height: 220, width: 220, borderRadius: '50%',
            background: `radial-gradient(circle at 30% 30%, rgba(255,255,255,.6), transparent 45%),
                         radial-gradient(circle at 70% 70%, rgba(0,0,0,.25), transparent 46%),
                         linear-gradient(130deg, hsl(${(hue+180)%360} 90% 55%), hsl(${(hue+60)%360} 90% 55%))`,
            filter: 'blur(1px)' }} />
      </div>
      <div style={{ marginTop: 12, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <strong className="neonText">{label}</strong>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <span style={{ color: 'var(--gold)' }}>? ? ? ? ?</span>
          <span style={{ opacity: .8 }}>4.9</span>
        </div>
      </div>
    </Frame>
  );
}

function VoteBar({ score, color }) {
  return (
    <div style={{ height: 14, background: 'rgba(255,255,255,.06)', borderRadius: 9999, overflow: 'hidden' }}>
      <motion.div initial={{ width: 0 }} animate={{ width: `${score}%` }} transition={{ duration: 1.2 }}
        style={{ height: '100%', background: `linear-gradient(90deg, ${color}, rgba(255,255,255,.3))` }} />
    </div>
  );
}

function Leaderboard({ items }) {
  return (
    <div className="card" style={{ padding: 16, borderRadius: 16 }}>
      <div style={{ display: 'grid', gap: 10 }}>
        {items.map((it, idx) => (
          <div key={it.name} style={{ display: 'grid', gridTemplateColumns: '120px 1fr 64px', gap: 10, alignItems: 'center' }}>
            <div style={{ opacity: .9 }}>{idx+1}. {it.name}</div>
            <VoteBar score={it.score} color={it.color} />
            <div style={{ textAlign: 'right', opacity: .8 }}>{it.score}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

const sceneDurations = [
  1700, // intro
  3600, // compare
  3200, // battle
  3200, // leaderboard
  1800, // slogan
  2200, // logo
];

export default function Page() {
  const [started, setStarted] = useState(false);
  const [scene, setScene] = useState(0);
  const [loopKey, setLoopKey] = useState(0);

  useSpeech(HINGLISH_SCRIPT, started);

  useEffect(() => {
    if (!started) return;
    let t = 0; let cancelled = false;
    for (let i = 0; i < sceneDurations.length; i++) {
      t += sceneDurations[i];
      setTimeout(() => { if (!cancelled) setScene(s => Math.min(s+1, sceneDurations.length-1)); }, t);
    }
    const total = sceneDurations.reduce((a,b)=>a+b,0);
    const loop = setTimeout(() => { if (!cancelled) { setScene(0); setLoopKey(k=>k+1); } }, total + 1200);
    return () => { cancelled = true; clearTimeout(loop); };
  }, [started, loopKey]);

  const LB = useMemo(() => ([
    { name: 'Model Nova', score: 96, color: 'linear-gradient(90deg, #00e5ff, #8a2eff)' },
    { name: 'Vision Pro', score: 92, color: 'linear-gradient(90deg, #ff3cff, #00e5ff)' },
    { name: 'Astra Studio', score: 89, color: 'linear-gradient(90deg, #34ffb9, #8a2eff)' },
    { name: 'FusionX', score: 86, color: 'linear-gradient(90deg, #ffdf6e, #ff3cff)' },
  ]), []);

  return (
    <div className="viewport">
      <Background />
      <Music play={started} />
      {!started && <StartOverlay onStart={() => setStarted(true)} />}

      <div style={{ position:'absolute', inset: 0, display: 'grid', placeItems: 'center', padding: 24 }}>
        <AnimatePresence mode="wait">
          {scene === 0 && (
            <motion.div key="intro" initial={{ opacity: 0, y: 30, scale: .98 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: -30, scale: .98 }} transition={{ duration: .8 }}
              style={{ textAlign: 'center' }}>
              <GlitchText>
                <h1 className="neonText chromatic" style={{ fontSize: 64, margin: 0 }}>AI vs AI</h1>
              </GlitchText>
              <p className="glowPink" style={{ marginTop: 10, fontSize: 18, opacity: .9 }}>Ab design karega ? blazing fast, neon vibes</p>
            </motion.div>
          )}

          {scene === 1 && (
            <motion.div key="compare" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: .6 }}
              style={{ width: 'min(1200px, 95vw)', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 18 }}>
              <div style={{ display: 'grid', gap: 14 }}>
                <PosterCard label="Poster ? Cyber Neon" hue={190} />
                <LogoCard label="Logo ? Quantum Pulse" hue={300} />
              </div>
              <div style={{ display: 'grid', gap: 14 }}>
                <WebsiteCard label="Website ? Hologrid" hue={220} />
                <Art3DCard label="3D ? Prisma Orb" hue={160} />
              </div>
            </motion.div>
          )}

          {scene === 2 && (
            <motion.div key="battle" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: .6 }}
              style={{ width: 'min(1100px, 92vw)', display: 'grid', gap: 16 }}>
              <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:16 }}>
                <Frame>
                  <div style={{ display: 'grid', gap: 10 }}>
                    <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center' }}>
                      <strong className="neonText">Model Nova</strong>
                      <span style={{ opacity:.8 }}>Votes</span>
                    </div>
                    <VoteBar score={78} color={'#00e5ff'} />
                    <VoteBar score={64} color={'#8a2eff'} />
                    <VoteBar score={52} color={'#ff3cff'} />
                  </div>
                </Frame>
                <Frame>
                  <div style={{ display: 'grid', gap: 10 }}>
                    <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center' }}>
                      <strong className="neonText">Vision Pro</strong>
                      <span style={{ opacity:.8 }}>Votes</span>
                    </div>
                    <VoteBar score={82} color={'#ff3cff'} />
                    <VoteBar score={70} color={'#ffdf6e'} />
                    <VoteBar score={58} color={'#34ffb9'} />
                  </div>
                </Frame>
              </div>
              <div style={{ display: 'grid', placeItems: 'center' }}>
                <button className="buttonPrimary" aria-label="Vote now">Vote Now</button>
              </div>
            </motion.div>
          )}

          {scene === 3 && (
            <motion.div key="leader" initial={{ opacity: 0, scale: .98 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: .98 }} transition={{ duration: .6 }}
              style={{ width: 'min(900px, 90vw)', display: 'grid', gap: 16 }}>
              <h2 className="glowGold" style={{ margin: 0, textAlign: 'center' }}>Leaderboard Rising</h2>
              <Leaderboard items={LB} />
            </motion.div>
          )}

          {scene === 4 && (
            <motion.div key="slogan" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: .6 }}
              style={{ textAlign: 'center' }}>
              <GlitchText>
                <h2 className="neonText" style={{ fontSize: 42, margin: 0 }}>Vote. Compare. Discover.</h2>
              </GlitchText>
              <p style={{ opacity: .85, marginTop: 8 }}>Electric energy. Fast cuts. Cinematic lighting.</p>
            </motion.div>
          )}

          {scene === 5 && (
            <motion.div key="logo" initial={{ opacity: 0, rotate: -3, scale: .9 }} animate={{ opacity: 1, rotate: 0, scale: 1 }} exit={{ opacity: 0 }} transition={{ duration: .8 }}
              style={{ textAlign: 'center' }}>
              <GlitchText>
                <h1 className="neonText" style={{ fontSize: 56, margin: 0 }}>DesignArena.ai</h1>
              </GlitchText>
              <div className="glowPink" style={{ marginTop: 10 }}>Where AIs Compete, Creativity Wins.</div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* corner HUD */}
      <div style={{ position:'fixed', top: 14, left: 16, display: 'flex', gap: 10, alignItems: 'center', opacity: .9 }}>
        <div style={{ width: 10, height: 10, borderRadius: 9999, background: 'var(--neon)', boxShadow: '0 0 12px rgba(0,229,255,.8)' }} />
        <span style={{ fontSize: 12, letterSpacing: 1.2, color: 'var(--muted)' }}>DesignArena ? Live</span>
      </div>

      <div style={{ position:'fixed', bottom: 16, right: 16, fontSize: 12, opacity: .6 }}>
        Cinematic Web ? ? DesignArena.ai
      </div>
    </div>
  );
}
