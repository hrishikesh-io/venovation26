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

/* =========================================================================
   4×4 SPARK Sliding Puzzle Definitions
   ========================================================================= */
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
  14: { char: '✦',  accent: true  },
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
    arr = [...SOLVED_STATE];
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
  } while (!isSolvable(arr) || isSolved(arr));
  return arr;
}

function isSolved(tiles: number[]): boolean {
  return tiles.every((val, idx) => val === idx);
}

export const HeroSection: React.FC = () => {
  const [tiles, setTiles] = useState<number[]>(SOLVED_STATE);
  const [moves, setMoves] = useState(0);
  const [won, setWon] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    setTiles(shuffleTiles());
  }, []);

  // Confetti effect on puzzle solve
  useEffect(() => {
    if (!won || !canvasRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const colors = ['#DC2626', '#F59E0B', '#0052FF', '#FFFFFF', '#10B981'];
    const particles = Array.from({ length: 60 }, () => ({
      x: canvas.width / 2,
      y: canvas.height / 2,
      vx: (Math.random() - 0.5) * 10,
      vy: (Math.random() - 0.8) * 10,
      size: Math.random() * 5 + 3,
      color: colors[Math.floor(Math.random() * colors.length)],
      alpha: 1,
    }));

    let animId: number;
    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      let alive = false;
      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.2;
        p.alpha -= 0.015;
        if (p.alpha > 0) {
          alive = true;
          ctx.save();
          ctx.globalAlpha = p.alpha;
          ctx.fillStyle = p.color;
          ctx.fillRect(p.x, p.y, p.size, p.size);
          ctx.restore();
        }
      }
      if (alive) {
        animId = requestAnimationFrame(render);
      }
    };
    animId = requestAnimationFrame(render);
    return () => cancelAnimationFrame(animId);
  }, [won]);

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
    <section className="relative pt-32 pb-16 md:pt-36 md:pb-24 overflow-hidden bg-tech-grid bg-radial-glow bg-[#08090E]">
      {/* Background ambient lighting - Red, Gold, Blue Theme */}
      <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[350px] bg-red-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/3 right-10 w-[450px] h-[450px] bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 xl:gap-10 items-stretch">
          
          {/* ============================================================== */}
          {/* CONTAINER 1 (LEFT): ONLY TOPIC / BRAND IDENTITY               */}
          {/* ============================================================== */}
          <div className="rounded-3xl bg-[#0F1322]/95 backdrop-blur-xl border border-slate-800 p-6 sm:p-8 lg:p-10 shadow-2xl flex flex-col justify-between gap-6 relative overflow-hidden text-white">
            
            {/* Top Bar: College & Fest Pills */}
            <div className="space-y-3">
              <div className="flex flex-wrap items-center gap-2">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-500/15 border border-red-500/25 text-red-400 text-xs font-mono font-medium">
                  <Sparkles className="h-3.5 w-3.5 text-amber-400 animate-pulse" />
                  <span>ANNUAL TECH FEST 2026</span>
                </div>
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-900 border border-slate-700 text-slate-300 text-xs font-mono font-medium">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-ping" />
                  <span>GPTC VENNIKULAM</span>
                </div>
              </div>

              {/* Host Institution Name */}
              <div className="flex items-start gap-2 text-slate-300 font-mono text-xs sm:text-sm uppercase tracking-wider">
                <GraduationCap className="h-4 w-4 text-amber-400 shrink-0 mt-0.5" />
                <span className="leading-snug">
                  Mahakavi Vennikulam Gopalakurup Memorial Govt. Polytechnic College
                </span>
              </div>
            </div>

            {/* Core Topic Heading Lockup - Perfectly Aligned */}
            <div className="flex flex-col items-start gap-2.5 sm:gap-3 py-1">
              {/* Line 1: Topic Tag */}
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/15 border border-amber-500/25 text-amber-400 text-xs font-mono font-semibold tracking-wider">
                <span className="h-1.5 w-1.5 rounded-full bg-amber-400 animate-pulse" />
                <span>MAIN TOPIC // INNOVATION SUMMIT</span>
              </div>

              {/* Line 2: Headline */}
              <h1 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-[2.65rem] xl:text-[3rem] font-black tracking-tight text-white leading-tight">
                VENOVATION <span className="text-amber-400">26.</span>
              </h1>

              {/* Line 3: Tagline */}
              <p className="font-display text-sm sm:text-base md:text-lg lg:text-xl font-extrabold text-slate-200 tracking-wider uppercase">
                INNOVATION BEYOND LIMITS.
              </p>

              {/* Topic Badges: Fest Days & Theme */}
              <div className="flex items-center gap-2.5 flex-wrap pt-2">
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-[#14192D] border border-slate-700 shadow-sm text-white">
                  <Calendar className="h-3.5 w-3.5 text-blue-400 shrink-0" />
                  <div className="flex items-center gap-1.5 text-xs font-mono">
                    <span className="text-slate-400 uppercase tracking-widest text-[9px]">DATES:</span>
                    <span className="font-display font-bold text-white whitespace-nowrap">Mar 24 &bull; 25, 2026</span>
                  </div>
                </div>

                <div className="relative flex items-center gap-2 px-3 py-1.5 rounded-xl bg-gradient-to-r from-red-600 via-amber-500 to-amber-600 border border-amber-400/40 shadow-sm text-white overflow-hidden">
                  <Flame className="h-3.5 w-3.5 text-white shrink-0 animate-pulse" />
                  <div className="flex items-center gap-1.5 text-xs font-mono">
                    <span className="text-amber-100/90 uppercase tracking-widest text-[9px]">THEME:</span>
                    <span className="font-display font-bold text-white whitespace-nowrap">SPARK '26</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="pt-4 border-t border-slate-800 flex flex-wrap items-center gap-3">
              <Link to="/register" className="flex-1 sm:flex-none">
                <Button
                  variant="primary"
                  size="lg"
                  className="w-full sm:w-auto font-bold shadow-xl shadow-blue-500/25 group px-7 bg-gradient-to-r from-red-600 via-amber-500 to-blue-600 hover:brightness-110"
                  rightIcon={<ArrowRight className="h-4 w-4 ml-1 transition-transform group-hover:translate-x-1" />}
                >
                  Register Now
                </Button>
              </Link>

              <Link to="/programs" className="flex-1 sm:flex-none">
                <Button
                  variant="outline"
                  size="lg"
                  className="w-full sm:w-auto font-semibold border-slate-700 hover:border-amber-400 text-slate-200 hover:text-white px-7 bg-[#14192D]"
                >
                  Explore Programs &darr;
                </Button>
              </Link>
            </div>

            {/* Corner Decorative Accent */}
            <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-amber-500/10 to-transparent rounded-bl-full pointer-events-none" />
          </div>

          {/* ============================================================== */}
          {/* CONTAINER 2 (RIGHT): FULL INTERACTIVE PUZZLE CONSOLE           */}
          {/* ============================================================== */}
          <div className="rounded-3xl bg-[#0A0D18] border border-slate-800 p-6 sm:p-8 text-white shadow-2xl relative overflow-hidden flex flex-col justify-between">
            {/* Tech grid texture */}
            <div className="absolute inset-0 bg-tech-grid-dark opacity-35 pointer-events-none" />
            
            {/* Ambient glow */}
            <div className="absolute -top-24 -right-24 w-48 h-48 bg-blue-600/20 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-red-600/15 rounded-full blur-3xl pointer-events-none" />

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

              <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-400 text-xs font-mono font-medium">
                <Zap className="h-3.5 w-3.5" />
                <span>FULL 4&times;4 PUZZLE</span>
              </div>
            </div>

            {/* Win Alert Banner */}
            {won && (
              <div className="relative z-20 mb-3 text-center py-2.5 px-3 rounded-xl border border-amber-500/50 bg-amber-950/90 text-amber-300 font-display font-bold text-sm sm:text-base animate-bounce-subtle">
                🎉 SPARK Puzzle Solved in {moves} moves!
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
                            ? 'bg-gradient-to-br from-red-600 via-amber-500 to-blue-600 text-white border border-amber-400/40 shadow-md shadow-red-500/20'
                            : 'bg-slate-800/90 text-white border border-slate-700/80 hover:border-slate-500',
                        isMovable && !won
                          ? 'cursor-pointer hover:scale-105 hover:border-amber-400 hover:shadow-lg hover:shadow-amber-500/30 active:scale-95'
                          : '',
                        won && !isEmpty ? 'animate-pulse-win' : '',
                      ].join(' ')}
                    >
                      {label?.char}
                    </button>
                  );
                })}
              </div>

              {/* Status Hint */}
              <p className="mt-2.5 text-center text-[11px] font-mono text-slate-400">
                {won
                  ? 'Awesome! You unlocked the SPARK badge.'
                  : 'Arrange tiles to spell VENOVATION 26.'}
              </p>
            </div>

            {/* Bottom Controls Bar */}
            <div className="relative z-10 flex items-center justify-between pt-3 mt-2 border-t border-slate-800/80">
              <div className="flex items-center gap-2">
                <span className="font-mono text-xs text-slate-400">Moves:</span>
                <span className="px-2.5 py-0.5 rounded-lg bg-slate-900 border border-slate-700 font-mono text-xs font-bold text-amber-400">
                  {moves}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={handleShuffle}
                  className="px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-700 hover:border-amber-400 text-slate-300 hover:text-white text-xs font-mono font-medium flex items-center gap-1.5 transition active:scale-95"
                >
                  <Shuffle className="h-3 w-3 text-amber-400" />
                  <span>Shuffle</span>
                </button>
                <button
                  onClick={handleReset}
                  className="px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-700 hover:border-slate-500 text-slate-400 hover:text-white text-xs font-mono font-medium flex items-center gap-1.5 transition active:scale-95"
                >
                  <RotateCcw className="h-3 w-3" />
                  <span>Reset</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
