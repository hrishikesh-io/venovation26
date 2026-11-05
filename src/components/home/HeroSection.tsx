import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  Sparkles,
  Calendar,
  MapPin,
  Trophy,
  Flame,
  Layers,
  Shuffle,
  RotateCcw,
  Zap,
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
    <section className="relative pt-32 pb-20 md:pt-36 md:pb-24 overflow-hidden bg-tech-grid bg-radial-glow">
      {/* Background glowing orbs */}
      <div className="absolute top-1/4 left-1/3 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-brand-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/3 right-10 w-[450px] h-[450px] bg-cyan-400/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
          
          {/* ══════════════════════════════════════════════════════════════
              LEFT SIDE: Hero Content (with Headline in ONE line)
             ══════════════════════════════════════════════════════════════ */}
          <div className="lg:col-span-7 space-y-6 text-left">
            {/* Top Badges Row */}
            <div className="flex flex-wrap items-center gap-2.5">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-brand-500/10 border border-brand-500/20 text-brand-600 text-xs font-mono font-medium">
                <Sparkles className="h-3.5 w-3.5 text-brand-500 animate-pulse" />
                <span>ANNUAL NATIONAL TECH FEST &bull; MARCH 2026</span>
              </div>

              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-100 border border-slate-200 text-slate-700 text-xs font-mono font-medium">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-ping" />
                <span>GPTC VENNIKULAM</span>
              </div>
            </div>

            {/* Host College Name */}
            <div className="flex items-center gap-2 text-slate-500 font-mono text-xs sm:text-sm uppercase tracking-wider">
              <div className="h-1.5 w-1.5 rounded-full bg-brand-500" />
              <span>Mahakavi Vennikulam Gopalakurup Memorial Govt. Polytechnic College</span>
            </div>

            {/* Main Headline in ONE SAME LINE + Badges */}
            <div className="space-y-3">
              <h1 className="font-display text-4xl sm:text-6xl md:text-7xl xl:text-8xl font-black tracking-tight text-slate-950 leading-none whitespace-nowrap">
                VENOVATION <span className="text-brand-500">26.</span>
              </h1>

              {/* Fest Day & SPARK Badges */}
              <div className="flex items-center gap-2.5 flex-wrap pt-1">
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-950 border border-slate-800 shadow-md text-white">
                  <Calendar className="h-4 w-4 text-brand-400 shrink-0" />
                  <div className="flex items-center gap-1.5 text-xs font-mono">
                    <span className="text-slate-400 uppercase tracking-widest text-[9px]">FEST DAYS:</span>
                    <span className="font-display font-bold text-white whitespace-nowrap">Mar 24 &bull; 25, 2026</span>
                  </div>
                </div>

                <div className="relative flex items-center gap-2 px-3 py-1.5 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 border border-amber-400/40 shadow-md text-white overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/15 to-transparent -translate-x-full animate-[shimmer_2.5s_ease_infinite] pointer-events-none" />
                  <Flame className="h-4 w-4 text-white shrink-0 animate-pulse" />
                  <div className="flex items-center gap-1.5 text-xs font-mono">
                    <span className="text-amber-100/80 uppercase tracking-widest text-[9px]">THEME:</span>
                    <span className="font-display font-bold text-white whitespace-nowrap">SPARK '26</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Subtitle & Description */}
            <div className="space-y-2.5">
              <p className="text-xl sm:text-2xl font-display font-bold text-slate-800 tracking-tight">
                Innovation. Technology. Creativity.
              </p>
              <p className="text-slate-600 text-sm sm:text-base lg:text-lg leading-relaxed font-sans max-w-xl">
                Experience a celebration of technology, creativity, and engineering excellence where students compete, collaborate, and innovate beyond limits across 4 specialized streams.
              </p>
            </div>

            {/* Meta Chips */}
            <div className="flex flex-wrap items-center gap-2.5 text-xs sm:text-sm font-medium text-slate-700 pt-1">
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/90 border border-slate-200 shadow-sm">
                <MapPin className="h-4 w-4 text-brand-500" />
                <span>Vennikulam, Pathanamthitta</span>
              </div>
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/90 border border-slate-200 shadow-sm">
                <Trophy className="h-4 w-4 text-amber-500" />
                <span>₹1,50,000+ Prize Pool</span>
              </div>
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/90 border border-slate-200 shadow-sm">
                <Layers className="h-4 w-4 text-brand-500" />
                <span>4 Streams</span>
              </div>
            </div>

            {/* Action CTAs */}
            <div className="flex flex-wrap items-center gap-3.5 pt-2">
              <Link to="/register">
                <Button
                  variant="primary"
                  size="lg"
                  className="font-bold shadow-xl shadow-brand-500/30 group px-7"
                  rightIcon={<ArrowRight className="h-4 w-4 ml-1 transition-transform group-hover:translate-x-1" />}
                >
                  Register Now
                </Button>
              </Link>

              <Link to="/programs">
                <Button
                  variant="outline"
                  size="lg"
                  className="font-semibold border-slate-300 hover:border-brand-400 px-7"
                >
                  Explore Programs &darr;
                </Button>
              </Link>
            </div>
          </div>

          {/* ══════════════════════════════════════════════════════════════
              RIGHT SIDE: Interactive 4×4 SPARK Sliding Puzzle Console
             ══════════════════════════════════════════════════════════════ */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-sm lg:max-w-none">
              
              {/* Futuristic Tech Console Frame */}
              <div className="relative rounded-3xl bg-slate-950 p-5 sm:p-6 text-white shadow-2xl border border-slate-800 overflow-hidden group">
                {/* Tech grid inside card */}
                <div className="absolute inset-0 bg-tech-grid-dark opacity-35 pointer-events-none" />
                
                {/* Blue ambient glow */}
                <div className="absolute -top-24 -right-24 w-48 h-48 bg-brand-500/25 rounded-full blur-3xl pointer-events-none" />

                {/* Confetti canvas for win celebration */}
                <canvas
                  ref={canvasRef}
                  className="absolute inset-0 w-full h-full pointer-events-none z-30"
                  width={400}
                  height={450}
                  style={{ mixBlendMode: 'screen' }}
                />

                {/* Console Header Bar */}
                <div className="relative z-10 flex items-center justify-between pb-3 mb-4 border-b border-slate-800/80">
                  <div className="flex items-center gap-2">
                    <div className="h-2.5 w-2.5 rounded-full bg-rose-500/80" />
                    <div className="h-2.5 w-2.5 rounded-full bg-amber-500/80" />
                    <div className="h-2.5 w-2.5 rounded-full bg-emerald-500/80" />
                    <span className="ml-1.5 font-mono text-[11px] text-slate-400">spark-puzzle.sys</span>
                  </div>

                  <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-brand-500/15 border border-brand-500/30 text-brand-400 text-[10px] font-mono">
                    <Zap className="h-3 w-3" />
                    <span>4&times;4 SLIDER</span>
                  </div>
                </div>

                {/* Win Alert Banner */}
                {won && (
                  <div className="relative z-20 mb-3 text-center py-2 px-3 rounded-xl border border-emerald-500/50 bg-emerald-950/80 text-emerald-300 font-display font-bold text-sm animate-bounce-subtle">
                    🎉 Solved in {moves} moves!
                  </div>
                )}

                {/* 4×4 Puzzle Grid Container */}
                <div className="relative z-10 flex flex-col items-center">
                  <div
                    className="grid grid-cols-4 gap-1.5 p-2 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-xl w-full max-w-[320px]"
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
                            'relative aspect-square rounded-xl text-center font-display font-black text-lg select-none transition-all duration-150',
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

                  {/* Puzzle Controls & Stats */}
                  <div className="w-full max-w-[320px] mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs font-mono">
                    <div className="flex items-center gap-2">
                      <span className="text-slate-400 text-[11px]">Moves:</span>
                      <span className="text-base font-bold text-white tabular-nums">{moves}</span>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={handleShuffle}
                        className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-brand-500 hover:bg-brand-600 text-white text-[11px] font-semibold transition active:scale-95 shadow-md shadow-brand-500/20"
                      >
                        <Shuffle className="h-3 w-3" />
                        <span>Shuffle</span>
                      </button>

                      <button
                        onClick={handleReset}
                        className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-[11px] font-semibold border border-slate-700 transition active:scale-95"
                        title="Reset to solved order"
                      >
                        <RotateCcw className="h-3 w-3" />
                      </button>
                    </div>
                  </div>

                  {/* Solved Target Hint */}
                  <div className="w-full max-w-[320px] mt-3 flex items-center justify-between text-[10px] font-mono text-slate-500">
                    <span className="flex items-center gap-1">
                      <span className="text-brand-400">⚡</span>
                      <span>Target: VENOVATION 26</span>
                    </span>
                    <span className="text-slate-600">Click tile next to space</span>
                  </div>
                </div>

              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
