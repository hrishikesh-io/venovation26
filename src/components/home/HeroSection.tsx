import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  Sparkles,
  Calendar,
  Flame,
  Shuffle,
  RotateCcw,
  Zap,
  GraduationCap,
} from 'lucide-react';
import { Button } from '../ui/Button';

/* ─────────────────────────────────────────────
   4×4 SPARK Sliding Puzzle Definitions
   ───────────────────────────────────────────── */
const SIZE = 4;
const TOTAL = SIZE * SIZE;
const SOLVED_STATE = Array.from({ length: TOTAL }, (_, i) => i);

const TILE_LABELS: Record<number, { char: string; accent: boolean }> = {
  0:  { char: 'V',  accent: false },
  1:  { char: 'E',  accent: false },
  2:  { char: 'N',  accent: false },
  3:  { char: 'O',  accent: false },
  4:  { char: 'V',  accent: false },
  5:  { char: 'A',  accent: true  },
  6:  { char: 'T',  accent: false },
  7:  { char: 'I',  accent: false },
  8:  { char: 'O',  accent: false },
  9:  { char: 'N',  accent: false },
  10: { char: '⚡', accent: true  },
  11: { char: '2',  accent: false },
  12: { char: '6',  accent: false },
  13: { char: '★',  accent: true  },
  14: { char: '∞',  accent: true  },
  15: { char: '',   accent: false },
};

function isSolvable(tiles: number[]): boolean {
  const arr = tiles.filter(t => t !== TOTAL - 1);
  let inversions = 0;
  for (let i = 0; i < arr.length; i++)
    for (let j = i + 1; j < arr.length; j++)
      if (arr[i] > arr[j]) inversions++;
  const emptyRow = Math.floor(tiles.indexOf(TOTAL - 1) / SIZE);
  const rowFromBottom = SIZE - emptyRow;
  if (SIZE % 2 === 1) return inversions % 2 === 0;
  if (rowFromBottom % 2 === 0) return inversions % 2 === 1;
  return inversions % 2 === 0;
}

function shuffleTiles(): number[] {
  let arr: number[];
  do {
    arr = [...SOLVED_STATE].sort(() => Math.random() - 0.5);
  } while (!isSolvable(arr) || isSolved(arr));
  return arr;
}

function isSolved(tiles: number[]): boolean {
  return tiles.every((t, i) => t === i);
}

interface Particle {
  x: number; y: number;
  vx: number; vy: number;
  color: string;
  size: number;
  life: number;
  rotation: number;
  rotationSpeed: number;
}

const CONFETTI_COLORS = ['#0052FF', '#00C6FF', '#FFD700', '#FF6B6B', '#7CFC00', '#FF69B4'];

export const HeroSection: React.FC = () => {
  // Puzzle State
  const [tiles, setTiles] = useState<number[]>(shuffleTiles());
  const [moves, setMoves] = useState(0);
  const [won, setWon] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particles = useRef<Particle[]>([]);
  const rafRef = useRef<number>(0);

  const prefersReducedMotion = typeof window !== 'undefined'
    ? window.matchMedia('(prefers-reduced-motion: reduce)').matches
    : false;

  // Confetti Animation when puzzle is solved
  useEffect(() => {
    if (!won || prefersReducedMotion) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    for (let i = 0; i < 90; i++) {
      particles.current.push({
        x: Math.random() * canvas.width,
        y: -10,
        vx: (Math.random() - 0.5) * 5,
        vy: Math.random() * 3 + 2,
        color: CONFETTI_COLORS[Math.floor(Math.random() * CONFETTI_COLORS.length)],
        size: Math.random() * 7 + 3,
        life: 1,
        rotation: Math.random() * 360,
        rotationSpeed: (Math.random() - 0.5) * 8,
      });
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.current = particles.current.filter(p => p.life > 0.01);

      for (const p of particles.current) {
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.1;
        p.life -= 0.012;
        p.rotation += p.rotationSpeed;

        ctx.save();
        ctx.globalAlpha = p.life;
        ctx.fillStyle = p.color;
        ctx.translate(p.x, p.y);
        ctx.rotate((p.rotation * Math.PI) / 180);
        ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size * 0.6);
        ctx.restore();
      }

      if (particles.current.length > 0) {
        rafRef.current = requestAnimationFrame(animate);
      }
    };

    rafRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafRef.current);
  }, [won, prefersReducedMotion]);

  const handleTileClick = useCallback((index: number) => {
    if (won) return;
    const emptyIndex = tiles.indexOf(TOTAL - 1);
    const row = Math.floor(index / SIZE);
    const col = index % SIZE;
    const emptyRow = Math.floor(emptyIndex / SIZE);
    const emptyCol = emptyIndex % SIZE;

    const isAdjacent =
      (row === emptyRow && Math.abs(col - emptyCol) === 1) ||
      (col === emptyCol && Math.abs(row - emptyRow) === 1);

    if (!isAdjacent) return;

    const newTiles = [...tiles];
    [newTiles[index], newTiles[emptyIndex]] = [newTiles[emptyIndex], newTiles[index]];
    setTiles(newTiles);
    setMoves(m => m + 1);

    if (isSolved(newTiles)) {
      setWon(true);
    }
  }, [tiles, won]);

  const handleShuffle = () => {
    setTiles(shuffleTiles());
    setMoves(0);
    setWon(false);
  };

  const handleReset = () => {
    setTiles([...SOLVED_STATE]);
    setMoves(0);
    setWon(false);
  };

  return (
    <section className="relative pt-32 pb-16 md:pt-36 md:pb-24 overflow-hidden bg-tech-grid bg-radial-glow">
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[350px] bg-brand-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/3 right-10 w-[450px] h-[450px] bg-cyan-400/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* ══════════════════════════════════════════════════════════════════
            SECTION 1 SPLIT INTO TWO DEDICATED CONTAINERS (50/50 ON DESKTOP,
            CLEAN STACKED ON MOBILE) — ZERO OVERLAP IN BOTH MODES
           ══════════════════════════════════════════════════════════════════ */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 xl:gap-10 items-stretch">
          
          {/* ──────────────────────────────────────────────────────────────
              CONTAINER 1 (LEFT): ONLY TOPIC / BRAND IDENTITY
             ────────────────────────────────────────────────────────────── */}
          <div className="rounded-3xl bg-white/90 backdrop-blur-xl border border-slate-200/90 p-6 sm:p-8 lg:p-10 shadow-xl shadow-slate-200/40 flex flex-col justify-between space-y-6 relative overflow-hidden">
            
            {/* Top Bar: College & Fest Pills */}
            <div className="space-y-3">
              <div className="flex flex-wrap items-center gap-2">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-500/10 border border-brand-500/20 text-brand-600 text-xs font-mono font-medium">
                  <Sparkles className="h-3.5 w-3.5 text-brand-500 animate-pulse" />
                  <span>ANNUAL TECH FEST 2026</span>
                </div>
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 border border-slate-200 text-slate-700 text-xs font-mono font-medium">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-ping" />
                  <span>GPTC VENNIKULAM</span>
                </div>
              </div>

              {/* Host Institution Name */}
              <div className="flex items-start gap-2 text-slate-500 font-mono text-xs sm:text-sm uppercase tracking-wider pt-1">
                <GraduationCap className="h-4 w-4 text-brand-500 shrink-0 mt-0.5" />
                <span className="leading-snug">
                  Mahakavi Vennikulam Gopalakurup Memorial Govt. Polytechnic College
                </span>
              </div>
            </div>

            {/* Core Topic Heading: Controlled length & decreased size to fit comfortably */}
            <div className="space-y-2.5 pt-2">
              <span className="text-[11px] font-mono uppercase tracking-widest text-slate-400 block">
                MAIN TOPIC // INNOVATION SUMMIT
              </span>

              {/* Headline with decreased size & controlled length */}
              <h1 className="font-display text-2xl sm:text-3xl md:text-4xl lg:text-[2.5rem] xl:text-[2.85rem] font-black tracking-tight text-slate-950 leading-none whitespace-nowrap">
                VENOVATION <span className="text-brand-500">26.</span>
              </h1>

              {/* Tagline */}
              <p className="text-base sm:text-lg md:text-xl font-display font-extrabold text-slate-800 tracking-tight uppercase pt-0.5">
                INNOVATION BEYOND LIMITS.
              </p>

              {/* Topic Badges: Fest Days & Theme */}
              <div className="flex items-center gap-2.5 flex-wrap pt-2">
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-950 border border-slate-800 shadow-sm text-white">
                  <Calendar className="h-3.5 w-3.5 text-brand-400 shrink-0" />
                  <div className="flex items-center gap-1.5 text-xs font-mono">
                    <span className="text-slate-400 uppercase tracking-widest text-[9px]">DATES:</span>
                    <span className="font-display font-bold text-white whitespace-nowrap">Mar 24 &bull; 25, 2026</span>
                  </div>
                </div>

                <div className="relative flex items-center gap-2 px-3 py-1.5 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 border border-amber-400/40 shadow-sm text-white overflow-hidden">
                  <Flame className="h-3.5 w-3.5 text-white shrink-0 animate-pulse" />
                  <div className="flex items-center gap-1.5 text-xs font-mono">
                    <span className="text-amber-100/80 uppercase tracking-widest text-[9px]">THEME:</span>
                    <span className="font-display font-bold text-white whitespace-nowrap">SPARK '26</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="pt-4 border-t border-slate-200/80 flex flex-wrap items-center gap-3">
              <Link to="/register" className="flex-1 sm:flex-none">
                <Button
                  variant="primary"
                  size="lg"
                  className="w-full sm:w-auto font-bold shadow-xl shadow-brand-500/25 group px-7"
                  rightIcon={<ArrowRight className="h-4 w-4 ml-1 transition-transform group-hover:translate-x-1" />}
                >
                  Register Now
                </Button>
              </Link>

              <Link to="/programs" className="flex-1 sm:flex-none">
                <Button
                  variant="outline"
                  size="lg"
                  className="w-full sm:w-auto font-semibold border-slate-300 hover:border-brand-400 px-7"
                >
                  Explore Programs &darr;
                </Button>
              </Link>
            </div>

            {/* Corner Decorative Accent */}
            <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-brand-500/10 to-transparent rounded-bl-full pointer-events-none" />
          </div>

          {/* ──────────────────────────────────────────────────────────────
              CONTAINER 2 (RIGHT): FULL INTERACTIVE PUZZLE CONSOLE
             ────────────────────────────────────────────────────────────── */}
          <div className="rounded-3xl bg-slate-950 border border-slate-800 p-6 sm:p-8 text-white shadow-2xl relative overflow-hidden flex flex-col justify-between">
            {/* Tech grid texture */}
            <div className="absolute inset-0 bg-tech-grid-dark opacity-35 pointer-events-none" />
            
            {/* Ambient blue top glow */}
            <div className="absolute -top-24 -right-24 w-48 h-48 bg-brand-500/25 rounded-full blur-3xl pointer-events-none" />

            {/* Confetti canvas for win celebration */}
            <canvas
              ref={canvasRef}
              className="absolute inset-0 w-full h-full pointer-events-none z-30"
              width={450}
              height={500}
              style={{ mixBlendMode: 'screen' }}
            />

            {/* Console Header Bar */}
            <div className="relative z-10 flex items-center justify-between pb-3.5 mb-4 border-b border-slate-800/80">
              <div className="flex items-center gap-2">
                <div className="h-2.5 w-2.5 rounded-full bg-rose-500" />
                <div className="h-2.5 w-2.5 rounded-full bg-amber-500" />
                <div className="h-2.5 w-2.5 rounded-full bg-emerald-500" />
                <span className="ml-1.5 font-mono text-xs text-slate-400">spark-puzzle.sys</span>
              </div>

              <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-500/15 border border-brand-500/30 text-brand-400 text-xs font-mono font-medium">
                <Zap className="h-3.5 w-3.5" />
                <span>FULL 4&times;4 PUZZLE</span>
              </div>
            </div>

            {/* Win Alert Banner */}
            {won && (
              <div className="relative z-20 mb-3 text-center py-2.5 px-3 rounded-xl border border-emerald-500/50 bg-emerald-950/90 text-emerald-300 font-display font-bold text-sm sm:text-base animate-bounce-subtle">
                🎉 Puzzle Solved in {moves} moves!
              </div>
            )}

            {/* 4×4 Puzzle Grid Container (Centered and Touch-friendly) */}
            <div className="relative z-10 flex-1 flex flex-col items-center justify-center my-2">
              <div
                className="grid grid-cols-4 gap-2 sm:gap-2.5 p-2.5 sm:p-3 rounded-2xl bg-slate-900/95 border border-slate-800 shadow-2xl w-full max-w-[320px] sm:max-w-[340px]"
                role="grid"
                aria-label="VENOVATION 26 spark sliding puzzle"
              >
                {tiles.map((tileId, index) => {
                  const isEmpty = tileId === TOTAL - 1;
                  const label = TILE_LABELS[tileId];
                  const isAccent = !isEmpty && label?.accent;
                  const isEmptyRow = Math.floor(index / SIZE);
                  const isEmptyCol = index % SIZE;
                  const emptyIndex = tiles.indexOf(TOTAL - 1);
                  const emptyRow = Math.floor(emptyIndex / SIZE);
                  const emptyCol = emptyIndex % SIZE;
                  const isMovable = !isEmpty && (
                    (isEmptyRow === emptyRow && Math.abs(isEmptyCol - emptyCol) === 1) ||
                    (isEmptyCol === emptyCol && Math.abs(isEmptyRow - emptyRow) === 1)
                  );

                  return (
                    <button
                      key={`pos-${index}`}
                      id={`hero-tile-${index}`}
                      onClick={() => handleTileClick(index)}
                      disabled={isEmpty || won}
                      aria-label={isEmpty ? 'Empty tile' : `Tile ${label?.char}`}
                      className={[
                        'relative aspect-square rounded-xl text-center font-display font-black text-lg sm:text-xl select-none transition-all duration-150',
                        isEmpty
                          ? 'bg-slate-950 border border-dashed border-slate-800 cursor-default'
                          : isAccent
                            ? 'bg-gradient-to-br from-brand-600 to-cyan-500 text-white border border-brand-400/40 shadow-md shadow-brand-500/20'
                            : 'bg-slate-800/90 text-white border border-slate-700/80 hover:border-slate-500',
                        isMovable && !won
                          ? 'cursor-pointer hover:scale-105 hover:border-brand-400 hover:shadow-lg hover:shadow-brand-500/30 active:scale-95'
                          : !isEmpty ? 'opacity-85' : '',
                        won && !isEmpty && !prefersReducedMotion ? 'animate-pulse-win' : '',
                      ].join(' ')}
                    >
                      {!isEmpty && (
                        <>
                          <span className="flex items-center justify-center h-full w-full">
                            {label?.char}
                          </span>
                          <span className="absolute bottom-0.5 right-1 text-[7px] font-mono opacity-30 font-normal">
                            {tileId + 1}
                          </span>
                        </>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Puzzle Controls & Status Bar */}
            <div className="relative z-10 w-full pt-4 mt-2 border-t border-slate-800/80 flex items-center justify-between text-xs font-mono">
              <div className="flex items-center gap-2">
                <span className="text-slate-400 text-xs">Moves:</span>
                <span className="text-lg font-bold text-white tabular-nums">{moves}</span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={handleShuffle}
                  className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-brand-500 hover:bg-brand-600 text-white text-xs font-semibold transition active:scale-95 shadow-md shadow-brand-500/20"
                >
                  <Shuffle className="h-3.5 w-3.5" />
                  <span>Shuffle</span>
                </button>

                <button
                  onClick={handleReset}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold border border-slate-700 transition active:scale-95"
                  title="Reset to solved order"
                >
                  <RotateCcw className="h-3.5 w-3.5" />
                  <span>Reset</span>
                </button>
              </div>
            </div>

            {/* Target Hint Bar */}
            <div className="relative z-10 w-full mt-2.5 pt-2 flex items-center justify-between text-[11px] font-mono text-slate-500">
              <span className="flex items-center gap-1 text-slate-400">
                <span className="text-brand-400">⚡</span>
                <span>Target: VENOVATION 26</span>
              </span>
              <span className="text-slate-500">Click tile next to space</span>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};
