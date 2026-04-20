import React, { useRef, useEffect } from 'react';

const PARTICLE_COUNT = 90;
const CONNECTION_DIST = 130;
const MOUSE_REPEL_DIST = 130;
const MOUSE_REPEL_FORCE = 0.02;

function rand(min, max) { return Math.random() * (max - min) + min; }

export default function ParticleCanvas({ className = '' }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animId;
    let mouse = { x: -999, y: -999 };

    const resize = () => {
      canvas.width  = canvas.offsetWidth  || canvas.clientWidth  || 600;
      canvas.height = canvas.offsetHeight || canvas.clientHeight || 400;
    };
    resize();
    window.addEventListener('resize', resize, { passive: true });

    // Track mouse via WINDOW so it works even with pointer-events:none on canvas
    const onWindowMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      if (
        e.clientX >= rect.left && e.clientX <= rect.right &&
        e.clientY >= rect.top  && e.clientY <= rect.bottom
      ) {
        mouse.x = e.clientX - rect.left;
        mouse.y = e.clientY - rect.top;
      } else {
        mouse.x = -999; mouse.y = -999;
      }
    };
    const onWindowMouseLeave = () => { mouse.x = -999; mouse.y = -999; };
    window.addEventListener('mousemove', onWindowMouseMove, { passive: true });
    window.addEventListener('mouseleave', onWindowMouseLeave, { passive: true });

    // Click bursts — also via window so they fire through pointer-events:none
    let bursts = [];
    const onWindowClick = (e) => {
      const rect = canvas.getBoundingClientRect();
      if (
        e.clientX >= rect.left && e.clientX <= rect.right &&
        e.clientY >= rect.top  && e.clientY <= rect.bottom
      ) {
        bursts.push({ x: e.clientX - rect.left, y: e.clientY - rect.top, r: 0, max: 90, alpha: 1 });
      }
    };
    window.addEventListener('click', onWindowClick);

    // Particles
    const makeParticle = () => ({
      x: rand(0, canvas.width),
      y: rand(0, canvas.height),
      vx: rand(-0.35, 0.35),
      vy: rand(-0.35, 0.35),
      r: rand(1.5, 3.5),
      baseColor: `hsl(${rand(200, 230)},${rand(70, 100)}%,${rand(55, 75)}%)`,
      pulse: rand(0, Math.PI * 2),
      pulseSpeed: rand(0.012, 0.03),
    });

    let particles = Array.from({ length: PARTICLE_COUNT }, makeParticle);

    const draw = () => {
      const W = canvas.width, H = canvas.height;
      ctx.clearRect(0, 0, W, H);

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.pulse += p.pulseSpeed;

        // Mouse repulsion
        const dx = p.x - mouse.x, dy = p.y - mouse.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < MOUSE_REPEL_DIST && dist > 0) {
          const force = (MOUSE_REPEL_DIST - dist) * MOUSE_REPEL_FORCE;
          p.vx += (dx / dist) * force;
          p.vy += (dy / dist) * force;
        }

        p.vx *= 0.995; p.vy *= 0.995;
        const speed = Math.sqrt(p.vx * p.vx + p.vy * p.vy);
        if (speed > 1.2) { p.vx = (p.vx / speed) * 1.2; p.vy = (p.vy / speed) * 1.2; }

        p.x += p.vx; p.y += p.vy;
        if (p.x < 0) p.x = W; if (p.x > W) p.x = 0;
        if (p.y < 0) p.y = H; if (p.y > H) p.y = 0;

        // Connections
        for (let j = i + 1; j < particles.length; j++) {
          const q = particles[j];
          const ex = p.x - q.x, ey = p.y - q.y;
          const ed = Math.sqrt(ex * ex + ey * ey);
          if (ed < CONNECTION_DIST) {
            const opacity = (1 - ed / CONNECTION_DIST) * 0.45;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y); ctx.lineTo(q.x, q.y);
            ctx.strokeStyle = `rgba(74,159,212,${opacity})`;
            ctx.lineWidth = opacity * 1.4;
            ctx.stroke();
          }
        }
      }

      // Draw particles
      for (const p of particles) {
        const pulseFactor = 0.8 + 0.2 * Math.sin(p.pulse);
        const grd = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.r * 2.5 * pulseFactor);
        grd.addColorStop(0, p.baseColor.replace('hsl', 'hsla').replace(')', ', 0.95)'));
        grd.addColorStop(1, 'rgba(74,159,212,0)');
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r * 2.5 * pulseFactor, 0, Math.PI * 2);
        ctx.fillStyle = grd; ctx.fill();

        const mdx = p.x - mouse.x, mdy = p.y - mouse.y;
        const md = Math.sqrt(mdx * mdx + mdy * mdy);
        if (md < MOUSE_REPEL_DIST) {
          const glow = 1 - md / MOUSE_REPEL_DIST;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.r * 4 * glow, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(130,200,255,${glow * 0.6})`; ctx.fill();
        }
      }

      // Cursor ring
      if (mouse.x !== -999) {
        ctx.beginPath();
        ctx.arc(mouse.x, mouse.y, 22, 0, Math.PI * 2);
        ctx.strokeStyle = 'rgba(74,159,212,0.55)'; ctx.lineWidth = 1.5; ctx.stroke();
        ctx.beginPath();
        ctx.arc(mouse.x, mouse.y, 6, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(130,200,255,0.85)'; ctx.fill();
      }

      // Burst rings
      bursts = bursts.filter(b => b.alpha > 0.01);
      for (const b of bursts) {
        ctx.beginPath();
        ctx.arc(b.x, b.y, b.r, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(74,159,212,${b.alpha})`;
        ctx.lineWidth = 2; ctx.stroke();
        b.r += 3.5; b.alpha *= 0.87;
      }

      animId = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', onWindowMouseMove);
      window.removeEventListener('mouseleave', onWindowMouseLeave);
      window.removeEventListener('click', onWindowClick);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className={`particle-canvas ${className}`}
      style={{ pointerEvents: 'none' }}
    />
  );
}
