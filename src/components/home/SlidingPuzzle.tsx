import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Shuffle, RotateCcw, Trophy, Sparkles } from 'lucide-react';

/* ─────────────────────────────────────────────
   Puzzle image tiles: 4×4 grid representing
   a "SPARK" themed VENOVATION 26 graphic.
   Tile 0 = empty (bottom-right in solved state).
   Solved order: [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15]
   ───────────────────────────────────────────── */

const SIZE = 4;
const TOTAL = SIZE * SIZE;
const SOLVED_STATE = Array.from({ length: TOTAL }, (_, i) => i);

// Each tile has a label that forms the VENOVATION 26 spark design
const TILE_LABELS: Record<number, { char: string; accent: boolean }> = {
  0:  { char: 'V',  accent: false },
  1:  { char: 'E',  accent: false },
  2:  { char: 'N',  accent: false },
  3:  { char: 'O',  accent: false },
  4:  { char: 'V',  accent: false },
  5:  { char: 'A',  accent: true  }, // spark
  6:  { char: 'T',  accent: false },
  7:  { char: 'I',  accent: false },
  8:  { char: 'O',  accent: false },
  9:  { char: 'N',  accent: false },
  10: { char: '⚡', accent: true  }, // spark centre
  11: { char: '2',  accent: false },
  12: { char: '6',  accent: false },
  13: { char: '★',  accent: true  }, // star
  14: { char: '∞',  accent: true  }, // infinity - creativity symbol
  15: { char: '',   accent: false }, // empty slot
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

/* ─── Mini confetti canvas ─── */
interface Particle {
  x: number; y: number;
  vx: number; vy: number;
  color: string;
  size: number;
  life: number;
  rotation: number;
  rotationSpeed: number;
}

const COLORS = ['#0052FF', '#00C6FF', '#FFD700', '#FF6B6B', '#7CFC00', '#FF69B4'];

function useConfetti(active: boolean, canvasRef: React.RefObject<HTMLCanvasElement | null>) {
  const particles = useRef<Particle[]>([]);
  const rafRef = useRef<number>(0);
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  useEffect(() => {
    if (!active || prefersReducedMotion) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Spawn burst
    for (let i = 0; i < 120; i++) {
      particles.current.push({
        x: Math.random() * canvas.width,
        y: -10,
        vx: (Math.random() - 0.5) * 6,
        vy: Math.random() * 4 + 2,
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
        size: Math.random() * 8 + 4,
        life: 1,
        rotation: Math.random() * 360,
        rotationSpeed: (Math.random() - 0.5) * 10,
      });
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.current = particles.current.filter(p => p.life > 0.01);

      for (const p of particles.current) {
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.12; // gravity
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
  }, [active, prefersReducedMotion]);
}

export const SlidingPuzzle: React.FC = () => {
  const [tiles, setTiles] = useState<number[]>(shuffleTiles());
  const [moves, setMoves] = useState(0);
  const [won, setWon] = useState(false);
  const [pulseTile, setPulseTile] = useState<number | null>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const prefersReducedMotion = typeof window !== 'undefined'
    ? window.matchMedia('(prefers-reduced-motion: reduce)').matches
    : false;

  useConfetti(won, canvasRef);

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
      if (!prefersReducedMotion) setPulseTile(-1); // signal all tiles pulse
    }
  }, [tiles, won, prefersReducedMotion]);

  const handleShuffle = () => {
    setTiles(shuffleTiles());
    setMoves(0);
    setWon(false);
    setPulseTile(null);
  };

  const handleReset = () => {
    setTiles([...SOLVED_STATE]);
    setMoves(0);
    setWon(false);
    setPulseTile(null);
  };

  return (
    <section className="relative py-20 md:py-28 bg-[#050810] overflow-hidden">
      {/* Background ambient */}
      <div className="absolute inset-0 bg-tech-grid-dark opacity-30 pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-brand-500/8 rounded-full blur-3xl pointer-events-none" />

      {/* Confetti canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none z-30"
        width={800}
        height={600}
        style={{ mixBlendMode: 'screen' }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">

          {/* ── Left: Explanation ── */}
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/25 text-amber-400 text-xs font-mono font-medium">
              <Sparkles className="h-3.5 w-3.5 animate-pulse" />
              <span>THE SPARK PUZZLE · VENOVATION 26</span>
            </div>

            <h2 className="font-display font-black text-4xl sm:text-5xl text-white leading-tight">
              Can You Solve
              <span className="block text-brand-400 mt-1">The Spark?</span>
            </h2>

            <p className="text-slate-400 text-base leading-relaxed">
              A 4×4 sliding tile puzzle inspired by the spark of innovation. Slide the tiles into the correct order to reveal the VENOVATION 26 layout. Click any adjacent tile to move it into the empty slot.
            </p>

            <div className="space-y-3 text-sm text-slate-500">
              <div className="flex items-center gap-3">
                <div className="h-7 w-7 rounded-lg bg-brand-500/20 border border-brand-500/30 flex items-center justify-center text-brand-400 font-mono font-bold text-xs">⚡</div>
                <span>Spark tiles glow with electric blue</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="h-7 w-7 rounded-lg bg-amber-500/20 border border-amber-500/30 flex items-center justify-center text-amber-400 font-mono font-bold text-xs">★</div>
                <span>Special symbol tiles mark milestone positions</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="h-7 w-7 rounded-lg bg-slate-800 border border-slate-700 flex items-center justify-center text-slate-400 font-mono font-bold text-xs">□</div>
                <span>Empty tile is always at bottom-right when solved</span>
              </div>
            </div>

            <div className="flex gap-3 pt-2">
              <button
                id="puzzle-shuffle-btn"
                onClick={handleShuffle}
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-brand-500 hover:bg-brand-600 text-white text-sm font-semibold transition-all duration-200 shadow-lg shadow-brand-500/30 hover:shadow-brand-500/50 active:scale-95"
              >
                <Shuffle className="h-4 w-4" />
                Shuffle
              </button>
              <button
                id="puzzle-reset-btn"
                onClick={handleReset}
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-sm font-semibold border border-slate-700 transition-all duration-200 active:scale-95"
              >
                <RotateCcw className="h-4 w-4" />
                Reset
              </button>
            </div>

            <div className="flex items-center gap-4 font-mono text-xs">
              <span className="text-slate-500">Moves:</span>
              <span className="text-2xl font-black text-white tabular-nums">{moves}</span>
              {won && (
                <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-950 border border-emerald-700 text-emerald-400 text-xs font-semibold">
                  <Trophy className="h-3.5 w-3.5" />
                  SOLVED!
                </span>
              )}
            </div>
          </div>

          {/* ── Right: Puzzle Grid ── */}
          <div className="flex flex-col items-center gap-6">
            {/* Win Banner */}
            {won && (
              <div
                className={`w-full max-w-sm text-center py-3 px-4 rounded-2xl border border-emerald-700/60 bg-emerald-950/60 backdrop-blur-sm ${prefersReducedMotion ? '' : 'animate-bounce-subtle'}`}
                aria-live="polite"
              >
                <p className="text-emerald-300 font-display font-bold text-lg">🎉 Puzzle Solved!</p>
                <p className="text-emerald-500 text-xs font-mono mt-1">Completed in {moves} moves</p>
              </div>
            )}

            {/* Grid */}
            <div
              className="grid gap-1.5 p-3 rounded-2xl bg-slate-900/80 border border-slate-800 shadow-2xl"
              style={{ gridTemplateColumns: `repeat(${SIZE}, 1fr)`, width: 'min(340px, 90vw)' }}
              role="grid"
              aria-label="VENOVATION 26 sliding puzzle"
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
                    id={`puzzle-tile-${index}`}
                    onClick={() => handleTileClick(index)}
                    disabled={isEmpty || won}
                    aria-label={isEmpty ? 'Empty tile' : `Tile ${label?.char}`}
                    aria-disabled={isEmpty}
                    className={[
                      'relative aspect-square rounded-xl text-center font-display font-black text-xl sm:text-2xl select-none transition-all duration-150',
                      isEmpty
                        ? 'bg-slate-950 border-2 border-dashed border-slate-800 cursor-default'
                        : isAccent
                          ? 'bg-gradient-to-br from-brand-600 to-cyan-500 text-white border border-brand-400/40 shadow-lg shadow-brand-500/20'
                          : 'bg-slate-800 text-white border border-slate-700 hover:border-slate-500',
                      isMovable && !won
                        ? 'cursor-pointer hover:scale-105 hover:shadow-xl hover:shadow-brand-500/20 hover:border-brand-500/60 active:scale-95'
                        : !isEmpty ? 'cursor-not-allowed opacity-70' : '',
                      won && !isEmpty && !prefersReducedMotion
                        ? 'animate-pulse-win'
                        : '',
                    ].join(' ')}
                    style={{
                      transitionTimingFunction: 'cubic-bezier(0.34,1.56,0.64,1)',
                    }}
                  >
                    {!isEmpty && (
                      <>
                        <span className="flex items-center justify-center h-full w-full">
                          {label?.char}
                        </span>
                        {/* Position number (subtle) */}
                        <span className="absolute bottom-0.5 right-1 text-[8px] font-mono opacity-30 font-normal">
                          {tileId + 1}
                        </span>
                      </>
                    )}
                  </button>
                );
              })}
            </div>

            {/* Solved state indicator */}
            <div className="flex items-center gap-2 text-xs font-mono text-slate-600">
              <span>Target:</span>
              <div className="flex gap-0.5">
                {SOLVED_STATE.slice(0, 8).map(t => (
                  <div
                    key={t}
                    className={`h-3 w-3 rounded-sm ${t === TOTAL - 1 ? 'bg-slate-800' : TILE_LABELS[t]?.accent ? 'bg-brand-500' : 'bg-slate-700'}`}
                  />
                ))}
              </div>
              <span>→ ...</span>
              <div className="h-3 w-3 rounded-sm bg-slate-800 border border-dashed border-slate-600" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
