import React, { useState, useEffect, useMemo, useCallback, useRef } from 'react';
import {
  LayoutDashboard, BookOpen, Zap, Trophy, Timer, BarChart3, Settings,
  ChevronRight, ChevronLeft, Check, X, Lock, Play, Award, Flame,
  Target, TrendingUp, Clock, Calendar, BookMarked, Lightbulb,
  Menu, Home, GraduationCap, Brain, Atom, Sparkles, RotateCcw,
  CheckCircle2, XCircle, AlertCircle, Star, ArrowRight, Bookmark,
  FileText, PenTool, Radio, Compass, Flag, Eye, EyeOff, HelpCircle,
} from 'lucide-react';
import {
  LineChart, Line, BarChart, Bar, RadarChart, Radar,
  PolarGrid, PolarAngleAxis, PolarRadiusAxis,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  Cell, PieChart, Pie, AreaChart, Area,
} from 'recharts';

// ═══════════════════════════════════════════════════════════════════
// CURRICULUM — AP Physics C content
// ═══════════════════════════════════════════════════════════════════

const curriculum = {
  mechanics: {
    id: 'mechanics',
    title: 'Mechanics',
    subtitle: 'The physics of motion and force',
    accent: '#c15a3a',
    accentSoft: '#f3d9cd',
    icon: Atom,
    description: 'Classical mechanics — the foundation. From the elegant calculus of motion to the deep symmetries of energy and momentum.',
    modules: [
      {
        id: 'kinematics',
        videoId: 'CPfhndPaLyk',
        videoTitle: 'Flipping Physics — AP Physics C Review',
        title: 'Kinematics',
        subtitle: 'Motion in One and Two Dimensions',
        estimatedMinutes: 45,
        description: 'The calculus of motion: how position, velocity, and acceleration relate as derivatives and integrals.',
        lesson: {
          sections: [
            {
              heading: 'Position, velocity, and acceleration',
              body: 'Kinematics is the geometry of motion. We describe an object\'s location with a position function x(t), and everything else follows from calculus. Velocity is the time-derivative of position; acceleration is the time-derivative of velocity. On the AP exam, you will constantly move between graphs, equations, and physical intuition.',
              formulas: [
                { expr: 'v(t) = \\frac{dx}{dt}', desc: 'Instantaneous velocity is the slope of x vs. t' },
                { expr: 'a(t) = \\frac{dv}{dt} = \\frac{d^2x}{dt^2}', desc: 'Acceleration is the slope of v vs. t' },
              ],
            },
            {
              heading: 'Constant acceleration — the kinematic equations',
              body: 'When acceleration is constant, integration gives four equations that relate position, velocity, acceleration, and time. These only apply for constant a. For a varying force, integrate directly.',
              formulas: [
                { expr: 'v = v_0 + at', desc: 'Velocity from initial velocity and time' },
                { expr: 'x = x_0 + v_0 t + \\tfrac{1}{2}at^2', desc: 'Position from initial conditions' },
                { expr: 'v^2 = v_0^2 + 2a(x - x_0)', desc: 'Velocity without time' },
              ],
            },
            {
              heading: 'Projectile motion',
              body: 'A projectile is any object in free-fall after launch — only gravity acts on it. The trick: horizontal and vertical motion are independent. Horizontally, velocity is constant. Vertically, acceleration is −g. Solve each axis separately, then combine.',
            },
          ],
          workedExample: {
            title: "Non-constant acceleration",
            problem: "A particle moves along the x-axis with position x(t) = 3t³ − 2t² + 5 (meters). Find its velocity and acceleration at t = 2 seconds, and the average velocity over the first 2 seconds.",
            given: ["x(t) = 3t³ − 2t² + 5 m", "t = 2 s"],
            find: "v(2), a(2), and v_avg over [0, 2]",
            steps: [
              {
                description: "Velocity is the time derivative of position.",
                latex: "v(t) = \\frac{dx}{dt} = 9t^2 - 4t",
              },
              {
                description: "Evaluate at t = 2 s.",
                latex: "v(2) = 9(4) - 4(2) = 28 \\;\\mathrm{m/s}",
              },
              {
                description: "Acceleration is the derivative of velocity (or second derivative of position).",
                latex: "a(t) = \\frac{dv}{dt} = 18t - 4",
              },
              {
                description: "Evaluate at t = 2 s.",
                latex: "a(2) = 18(2) - 4 = 32 \\;\\mathrm{m/s^2}",
              },
              {
                description: "Average velocity is total displacement over total time.",
                latex: "v_{avg} = \\frac{x(2) - x(0)}{2 - 0} = \\frac{(24 - 8 + 5) - 5}{2} = \\frac{16}{2} = 8 \\;\\mathrm{m/s}",
              },
            ],
            answer: "v(2) = 28 \\;\\mathrm{m/s},\\quad a(2) = 32 \\;\\mathrm{m/s^2},\\quad v_{avg} = 8 \\;\\mathrm{m/s}",
            insight: "Average velocity (8 m/s) ≠ instantaneous velocity (28 m/s) when acceleration is non-constant. Always check whether the problem wants instantaneous or average.",
          },
          checkpoint: {
            question: 'A particle\'s position is x(t) = 3t³ − 2t² + 5 meters. What is its acceleration at t = 2 s?',
            options: ['8 m/s²', '28 m/s²', '32 m/s²', '36 m/s²'],
            correct: 2,
            explanation: 'v(t) = dx/dt = 9t² − 4t, and a(t) = dv/dt = 18t − 4. At t = 2: a = 36 − 4 = 32 m/s².',
          },
        },
        quiz: [
          {
            q: 'A car accelerates uniformly from rest to 30 m/s over 12 seconds. What distance does it travel?',
            options: ['90 m', '180 m', '360 m', '720 m'],
            correct: 1,
            explanation: 'Using x = ½(v₀+v)t = ½(0+30)(12) = 180 m. Or: a = 30/12 = 2.5 m/s², x = ½(2.5)(12²) = 180 m.',
          },
          {
            q: 'An object\'s velocity is v(t) = 4t − t² m/s. At what time does it momentarily stop?',
            options: ['t = 0 s only', 't = 4 s only', 't = 0 and t = 4 s', 't = 2 s'],
            correct: 2,
            explanation: 'Setting v = 0: t(4 − t) = 0, so t = 0 or t = 4 s. The object starts at rest, accelerates, then decelerates back to rest.',
          },
          {
            q: 'A ball is thrown horizontally at 20 m/s from a 45-m cliff. How far from the base does it land? (g = 10 m/s²)',
            options: ['30 m', '45 m', '60 m', '90 m'],
            correct: 2,
            explanation: 'Vertical: 45 = ½(10)t² → t = 3 s. Horizontal: x = 20(3) = 60 m.',
          },
          {
            q: 'If a(t) = 6t and the particle starts at rest at x = 0, what is x(t)?',
            options: ['x = 3t²', 'x = t³', 'x = 2t³', 'x = 6t²'],
            correct: 1,
            explanation: 'Integrate: v = ∫6t dt = 3t² (v₀=0). Integrate again: x = ∫3t² dt = t³ (x₀=0).',
          },
          {
            q: 'A projectile launches at 30° above horizontal with speed 40 m/s. What is its maximum height? (g = 10 m/s²)',
            options: ['10 m', '20 m', '40 m', '80 m'],
            correct: 1,
            explanation: 'v_y = 40 sin(30°) = 20 m/s. At peak, v_y = 0: h = v_y²/(2g) = 400/20 = 20 m.',
          },
        ],
      },
      {
        id: 'newtons-laws',
        videoId: '7BtM7FOAuo4',
        videoTitle: 'Flipping Physics — AP Physics C Review',
        title: "Newton's Laws",
        subtitle: 'Force, Mass, and the Laws of Motion',
        estimatedMinutes: 50,
        description: 'The three laws that underpin classical mechanics, and the art of free-body diagrams.',
        lesson: {
          sections: [
            {
              heading: "The three laws",
              body: "Newton's first law: an object's momentum stays constant unless acted on by a net external force. The second law: F_net = ma, or more generally F = dp/dt. The third law: forces come in equal-and-opposite pairs between two objects.",
              formulas: [
                { expr: '\\Sigma \\vec{F} = m\\vec{a}', desc: 'Net force equals mass times acceleration' },
                { expr: '\\vec{F}_{AB} = -\\vec{F}_{BA}', desc: "Newton's third law: action–reaction pairs" },
              ],
            },
            {
              heading: 'Free-body diagrams',
              body: 'Isolate one object. Draw every force acting on it as an arrow. Common forces: gravity (mg, downward), normal force (perpendicular to surface), friction (parallel to surface, opposing relative motion), tension (along rope, away from object), applied forces. Then apply ΣF = ma along each axis.',
            },
            {
              heading: 'Friction',
              body: 'Static friction resists motion up to a maximum: f_s ≤ μ_s N. Kinetic friction is f_k = μ_k N, directed opposite to velocity. Usually μ_k < μ_s — it\'s easier to keep something sliding than to start it.',
              formulas: [
                { expr: 'f_{s,\\,\\max} = \\mu_s N', desc: 'Maximum static friction' },
                { expr: 'f_k = \\mu_k N', desc: 'Kinetic friction (constant during sliding)' },
              ],
            },
          ],
          workedExample: {
            title: "Block on an inclined plane with friction",
            problem: "A 5.0 kg block sits on a 30° incline. The coefficient of kinetic friction is μ_k = 0.20. Find the acceleration of the block as it slides down.",
            given: ["m = 5.0 kg", "θ = 30°", "μ_k = 0.20", "g = 9.8 m/s²"],
            find: "Acceleration a down the incline",
            steps: [
              {
                description: "Resolve gravity into components parallel and perpendicular to the incline. The component along the incline drives motion; the perpendicular sets the normal force.",
                latex: "mg\\sin\\theta \\;\\text{(parallel, down the slope)}, \\quad mg\\cos\\theta \\;\\text{(perpendicular)}",
              },
              {
                description: "On the incline, the normal force balances the perpendicular gravity component.",
                latex: "N = mg\\cos\\theta",
              },
              {
                description: "Kinetic friction opposes motion, pointing up the incline since the block slides down.",
                latex: "f_k = \\mu_k N = \\mu_k mg\\cos\\theta",
              },
              {
                description: "Apply Newton's 2nd law along the incline (down-slope positive).",
                latex: "ma = mg\\sin\\theta - \\mu_k mg\\cos\\theta",
              },
              {
                description: "Mass cancels — a remarkable result for friction-on-incline problems.",
                latex: "a = g(\\sin\\theta - \\mu_k \\cos\\theta)",
              },
              {
                description: "Plug in numbers.",
                latex: "a = 9.8\\,(0.500 - 0.20 \\times 0.866) = 9.8\\,(0.327) \\approx 3.20 \\;\\mathrm{m/s^2}",
              },
            ],
            answer: "a \\approx 3.20 \\;\\mathrm{m/s^2} \\;\\text{down the incline}",
            insight: "Notice mass canceled. On an incline with kinetic friction, the acceleration depends only on θ and μ_k — a heavy block and a light block slide down at the same rate.",
          },
          checkpoint: {
            question: 'A 5-kg block rests on a surface with μ_s = 0.4. What minimum horizontal force starts it moving? (g = 10 m/s²)',
            options: ['10 N', '15 N', '20 N', '25 N'],
            correct: 2,
            explanation: 'N = mg = 50 N. f_s,max = μ_s N = 0.4(50) = 20 N. Any force above 20 N starts motion.',
          },
        },
        quiz: [
          {
            q: 'Two blocks, 3 kg and 2 kg, are connected by a light string over a frictionless pulley (Atwood machine). What is the acceleration? (g = 10 m/s²)',
            options: ['1 m/s²', '2 m/s²', '5 m/s²', '10 m/s²'],
            correct: 1,
            explanation: 'Net force on the system: (3 − 2)g = 10 N. Total mass: 5 kg. a = 10/5 = 2 m/s².',
          },
          {
            q: 'A 10-kg block on a 30° incline has μ_k = 0.2. What is its acceleration down the incline? (g = 10 m/s²)',
            options: ['1.7 m/s²', '3.3 m/s²', '5.0 m/s²', '6.7 m/s²'],
            correct: 1,
            explanation: 'a = g(sinθ − μ_k cosθ) = 10(0.5 − 0.2·0.866) = 10(0.327) ≈ 3.3 m/s².',
          },
          {
            q: 'A rocket of mass m ejects gas at rate dm/dt with exhaust velocity v_e. What is the thrust?',
            options: ['m·v_e', 'v_e · dm/dt', 'm · dv/dt', 'v_e / (dm/dt)'],
            correct: 1,
            explanation: 'Thrust = v_e · |dm/dt| — the rate of momentum carried away by exhaust. This comes from F = dp/dt applied to variable-mass systems.',
          },
          {
            q: 'A horizontal force F pushes a 4-kg block against a wall. The coefficient of static friction between block and wall is 0.5. What minimum F keeps the block from sliding down? (g = 10 m/s²)',
            options: ['20 N', '40 N', '80 N', '100 N'],
            correct: 2,
            explanation: 'Normal force N = F (horizontal). Friction supports weight: μ_s N ≥ mg → F ≥ mg/μ_s = 40/0.5 = 80 N.',
          },
        ],
      },
      {
        id: 'work-energy',
        videoId: '1i4VCWYGQZo',
        videoTitle: 'Flipping Physics — AP Physics C Review',
        title: 'Work, Energy & Power',
        subtitle: 'Energy Conservation and its Consequences',
        estimatedMinutes: 55,
        description: 'The energy perspective: when forces become scalars, and what conservation laws buy you.',
        lesson: {
          sections: [
            {
              heading: 'Work and the work–energy theorem',
              body: 'Work is the line integral of force along a path: W = ∫F·dr. For a constant force, W = Fd cos θ. The work–energy theorem says the net work done on an object equals its change in kinetic energy.',
              formulas: [
                { expr: 'W = \\int \\vec{F}\\cdot d\\vec{r}', desc: 'Work as a line integral' },
                { expr: 'W_{net} = \\Delta K = \\tfrac{1}{2}mv^2 - \\tfrac{1}{2}mv_0^2', desc: 'Work–energy theorem' },
              ],
            },
            {
              heading: 'Conservative forces and potential energy',
              body: 'A conservative force can be written as F = −dU/dx (1D) or F = −∇U (3D). Gravity and springs are conservative; friction is not. For conservative forces, total mechanical energy K + U is conserved.',
              formulas: [
                { expr: 'U_{grav} = mgh', desc: 'Near-Earth gravitational PE' },
                { expr: 'U_{spring} = \\tfrac{1}{2}kx^2', desc: 'Spring PE from equilibrium' },
                { expr: 'F = -\\frac{dU}{dx}', desc: 'Force from potential (1D)' },
              ],
            },
            {
              heading: 'Power',
              body: 'Power is the rate of doing work: P = dW/dt. For a force applied to a moving object: P = F·v. On the AP exam, power shows up in motors, pumps, and anything lifting or accelerating continuously.',
              formulas: [
                { expr: 'P = \\frac{dW}{dt} = \\vec{F}\\cdot\\vec{v}', desc: 'Instantaneous power' },
              ],
            },
          ],
          workedExample: {
            title: "Block sliding down an incline with friction",
            problem: "A 2.0 kg block slides 3.0 m down a frictionless 30° incline, then encounters a horizontal rough patch with μ_k = 0.30. How far does it travel on the rough patch before stopping?",
            given: ["m = 2.0 kg", "θ = 30°", "d_incline = 3.0 m", "μ_k = 0.30", "g = 9.8 m/s²"],
            find: "Distance d on rough patch before stopping",
            steps: [
              {
                description: "Find speed at the bottom of the incline using energy conservation. Height dropped is h = d sin θ.",
                latex: "h = d_{\\text{incline}} \\sin\\theta = 3.0\\,(0.5) = 1.5 \\;\\mathrm{m}",
              },
              {
                description: "Set GPE lost equal to KE gained (no friction on incline).",
                latex: "mgh = \\tfrac{1}{2}mv^2 \\;\\;\\Rightarrow\\;\\; v = \\sqrt{2gh}",
              },
              {
                description: "Calculate v.",
                latex: "v = \\sqrt{2 \\times 9.8 \\times 1.5} \\approx 5.42 \\;\\mathrm{m/s}",
              },
              {
                description: "On the rough patch, friction does negative work that removes all KE.",
                latex: "-f_k\\,d = 0 - \\tfrac{1}{2}mv^2",
              },
              {
                description: "Use f_k = μ_k mg (level surface, so N = mg).",
                latex: "\\mu_k mg \\cdot d = \\tfrac{1}{2}mv^2 \\;\\;\\Rightarrow\\;\\; d = \\frac{v^2}{2\\mu_k g}",
              },
              {
                description: "Plug in.",
                latex: "d = \\frac{(5.42)^2}{2 \\times 0.30 \\times 9.8} = \\frac{29.4}{5.88} \\approx 5.0 \\;\\mathrm{m}",
              },
            ],
            answer: "d \\approx 5.0 \\;\\mathrm{m}",
            insight: "Energy conservation lets you skip dynamics entirely. The hardest step is identifying what energy converts to what — once you do, the algebra is short.",
          },
          checkpoint: {
            question: 'A 2-kg object slides down a frictionless ramp from height 5 m. What is its speed at the bottom? (g = 10 m/s²)',
            options: ['5 m/s', '10 m/s', '14 m/s', '20 m/s'],
            correct: 1,
            explanation: 'Energy conservation: mgh = ½mv² → v = √(2gh) = √(100) = 10 m/s.',
          },
        },
        quiz: [
          {
            q: 'A spring with k = 200 N/m is compressed 0.1 m, then releases a 0.5-kg block on a frictionless surface. What is the block\'s speed when the spring is relaxed?',
            options: ['1 m/s', '2 m/s', '4 m/s', '8 m/s'],
            correct: 1,
            explanation: '½kx² = ½mv²: ½(200)(0.01) = ½(0.5)v² → v² = 4 → v = 2 m/s.',
          },
          {
            q: 'A force F(x) = 3x² acts on a particle moving from x = 0 to x = 2 m. What work is done?',
            options: ['6 J', '8 J', '12 J', '24 J'],
            correct: 1,
            explanation: 'W = ∫₀² 3x² dx = x³|₀² = 8 J.',
          },
          {
            q: 'A 1500-kg car climbs a hill at 20 m/s, gaining 10 m of height per 100 m of road. What power does this require (ignore friction; g = 10 m/s²)?',
            options: ['15 kW', '30 kW', '150 kW', '300 kW'],
            correct: 1,
            explanation: 'Vertical speed = 20 · (10/100) = 2 m/s. P = mgv_vert = 1500 · 10 · 2 = 30,000 W = 30 kW.',
          },
          {
            q: 'The potential energy of a particle is U(x) = x³ − 3x. At what value of x is there a stable equilibrium?',
            options: ['x = −1', 'x = 0', 'x = 1', 'x = 3'],
            correct: 2,
            explanation: 'dU/dx = 3x² − 3 = 0 → x = ±1. Stable requires d²U/dx² > 0. d²U/dx² = 6x, positive at x = 1.',
          },
        ],
      },
      {
        id: 'momentum',
        videoId: 'WtUbnIr7WbU',
        videoTitle: 'Flipping Physics — AP Physics C Review',
        title: 'Momentum & Impulse',
        subtitle: 'Linear Momentum and Collisions',
        estimatedMinutes: 45,
        description: 'Momentum conservation — one of the deepest principles in physics — and what elastic vs. inelastic collisions teach us.',
        lesson: {
          sections: [
            {
              heading: 'Momentum and impulse',
              body: 'Momentum is p = mv. Newton\'s second law, in its truest form, is F = dp/dt. Integrating gives impulse: J = ∫F dt = Δp. A large force over a short time and a small force over a long time can produce the same impulse.',
              formulas: [
                { expr: '\\vec{p} = m\\vec{v}', desc: 'Linear momentum' },
                { expr: '\\vec{J} = \\int \\vec{F}\\,dt = \\Delta\\vec{p}', desc: 'Impulse–momentum theorem' },
              ],
            },
            {
              heading: 'Conservation of momentum',
              body: 'If no external forces act on a system, total momentum is conserved. This applies in collisions, explosions, and recoils. Even when mechanical energy is lost (inelastic collision), momentum is still conserved — this is why it\'s so powerful.',
            },
            {
              heading: 'Elastic vs. inelastic collisions',
              body: 'In an elastic collision, both momentum and kinetic energy are conserved. In a perfectly inelastic collision, objects stick together — momentum is conserved, but maximum kinetic energy is lost. Real collisions are somewhere between.',
              formulas: [
                { expr: "v_1' - v_2' = -(v_1 - v_2)", desc: 'Elastic collision: relative velocity reverses' },
              ],
            },
            {
              heading: 'Center of mass',
              body: 'The center of mass moves as if all mass were concentrated there and all external forces acted there. Its velocity: v_cm = (Σmᵢvᵢ)/M. In an isolated system, v_cm is constant.',
            },
          ],
          workedExample: {
            title: "Perfectly inelastic collision",
            problem: "A 1500 kg car moving east at 20 m/s collides with a 2500 kg truck moving north at 12 m/s. They stick together. Find the velocity (magnitude and direction) of the wreckage just after impact.",
            given: ["m_1 = 1500 kg, v_1 = 20 m/s east", "m_2 = 2500 kg, v_2 = 12 m/s north", "Collision is perfectly inelastic"],
            find: "Final velocity vector v_f",
            steps: [
              {
                description: "Conservation of momentum applies in each direction independently.",
                latex: "p_x: \\;m_1 v_1 = (m_1 + m_2)\\,v_{fx}",
              },
              {
                description: "Solve for the east component of v_f.",
                latex: "v_{fx} = \\frac{m_1 v_1}{m_1 + m_2} = \\frac{1500 \\times 20}{4000} = 7.5 \\;\\mathrm{m/s}",
              },
              {
                description: "Same idea for the north component.",
                latex: "v_{fy} = \\frac{m_2 v_2}{m_1 + m_2} = \\frac{2500 \\times 12}{4000} = 7.5 \\;\\mathrm{m/s}",
              },
              {
                description: "Combine into a magnitude.",
                latex: "|v_f| = \\sqrt{v_{fx}^2 + v_{fy}^2} = \\sqrt{56.25 + 56.25} \\approx 10.6 \\;\\mathrm{m/s}",
              },
              {
                description: "And a direction (angle north of east).",
                latex: "\\theta = \\tan^{-1}\\!\\left(\\frac{v_{fy}}{v_{fx}}\\right) = \\tan^{-1}(1) = 45°",
              },
            ],
            answer: "|v_f| \\approx 10.6 \\;\\mathrm{m/s},\\;\\; 45° \\;\\text{north of east}",
            insight: "In 2D collisions, momentum conservation gives you two scalar equations (one per axis). Treat each axis as its own 1D problem, then combine.",
          },
          checkpoint: {
            question: 'A 2-kg ball moving at 3 m/s collides head-on and sticks to a 1-kg ball at rest. Final velocity of the combined object?',
            options: ['1 m/s', '2 m/s', '3 m/s', '6 m/s'],
            correct: 1,
            explanation: 'Momentum conservation: 2(3) + 1(0) = 3·v → v = 2 m/s.',
          },
        },
        quiz: [
          {
            q: 'A 70-kg person lands on a trampoline at 10 m/s and bounces back at 8 m/s. If contact lasts 0.2 s, what is the average force from the trampoline?',
            options: ['700 N', '3500 N', '6300 N', '12600 N'],
            correct: 2,
            explanation: 'Δp = m(v_f − v_i) = 70(8 − (−10)) = 1260 kg·m/s. F = Δp/Δt = 1260/0.2 = 6300 N.',
          },
          {
            q: 'A 5-kg object at rest explodes into two pieces. A 2-kg piece moves east at 6 m/s. What is the velocity of the 3-kg piece?',
            options: ['4 m/s west', '4 m/s east', '6 m/s west', '9 m/s west'],
            correct: 0,
            explanation: 'Initial momentum = 0. 2(6) + 3(v) = 0 → v = −4 m/s (i.e., 4 m/s west).',
          },
          {
            q: 'In a perfectly elastic 1D collision, a moving ball of mass m strikes an identical ball at rest. What happens?',
            options: [
              'Both move forward with equal speeds',
              'They stick together',
              'The moving ball stops; the other takes its velocity',
              'They bounce back with equal speeds'
            ],
            correct: 2,
            explanation: 'For equal masses in an elastic 1D collision, velocities are exchanged. This is the famous Newton\'s cradle result.',
          },
          {
            q: 'Two particles: 1 kg at (0, 0) and 3 kg at (4 m, 0). Where is the center of mass?',
            options: ['(1 m, 0)', '(2 m, 0)', '(3 m, 0)', '(4 m, 0)'],
            correct: 2,
            explanation: 'x_cm = (1·0 + 3·4)/(1+3) = 12/4 = 3 m.',
          },
        ],
      },
      {
        id: 'rotation',
        videoId: 'cFeZt_0UzVg',
        videoTitle: 'Flipping Physics — AP Physics C Review',
        title: 'Rotational Motion',
        subtitle: 'Angular Kinematics, Torque & Angular Momentum',
        estimatedMinutes: 60,
        description: 'Everything you know about linear motion — with a rotational twin. Torque, moment of inertia, angular momentum.',
        lesson: {
          sections: [
            {
              heading: 'Angular analogs',
              body: 'Rotation mirrors translation: angle θ replaces position, angular velocity ω = dθ/dt replaces v, angular acceleration α = dω/dt replaces a. For constant α, the kinematic equations take the same form with angular variables.',
              formulas: [
                { expr: '\\omega = \\frac{d\\theta}{dt}', desc: 'Angular velocity' },
                { expr: 'v_t = r\\omega', desc: 'Linear-angular connection' },
              ],
            },
            {
              heading: 'Moment of inertia',
              body: 'The rotational mass. I = Σmᵢrᵢ² for discrete masses, or I = ∫r² dm for continuous bodies. Common results: solid cylinder ½MR², hoop MR², solid sphere (2/5)MR², rod about center (1/12)ML². The parallel-axis theorem: I = I_cm + Md².',
              formulas: [
                { expr: 'I = \\int r^2\\,dm', desc: 'Moment of inertia' },
                { expr: 'I_{\\|} = I_{cm} + Md^2', desc: 'Parallel-axis theorem' },
              ],
            },
            {
              heading: 'Torque, Newton\'s 2nd law for rotation',
              body: 'Torque: τ = r × F, magnitude rF sin θ. Newton\'s second law for rotation: Στ = Iα. Rotational kinetic energy: K_rot = ½Iω². For rolling without slipping: v = Rω, and K_total = ½mv² + ½Iω².',
              formulas: [
                { expr: '\\vec{\\tau} = \\vec{r}\\times\\vec{F}', desc: 'Torque (vector form)' },
                { expr: '\\Sigma\\vec{\\tau} = I\\vec{\\alpha}', desc: "Newton's 2nd law, angular" },
                { expr: 'K_{rot} = \\tfrac{1}{2}I\\omega^2', desc: 'Rotational kinetic energy' },
              ],
            },
            {
              heading: 'Angular momentum and its conservation',
              body: 'Angular momentum L = Iω (or r × p for a particle). When no external torque acts, L is conserved. This is why a figure skater spins faster by pulling in her arms — reducing I while L stays constant increases ω.',
              formulas: [
                { expr: '\\vec{L} = I\\vec{\\omega}', desc: 'Angular momentum of a rigid body' },
              ],
            },
          ],
          workedExample: {
            title: "Rolling without slipping down an incline",
            problem: "A solid uniform cylinder (I = ½MR²) of mass M and radius R rolls without slipping down an incline of angle θ from rest. Find its acceleration.",
            given: ["Solid cylinder, I = ½MR²", "Rolls without slipping", "Incline angle θ", "Released from rest"],
            find: "Linear acceleration a of the center of mass",
            steps: [
              {
                description: "Apply Newton's 2nd law along the incline. Let f be the static friction force (up the incline).",
                latex: "Ma = Mg\\sin\\theta - f",
              },
              {
                description: "Apply Newton's 2nd law for rotation about the center of mass. Friction is the only force producing torque (gravity and normal pass through the axis).",
                latex: "I\\alpha = fR",
              },
              {
                description: "Rolling-without-slipping constraint links linear and angular acceleration.",
                latex: "a = R\\alpha \\;\\;\\Rightarrow\\;\\; \\alpha = a/R",
              },
              {
                description: "Substitute the constraint into the rotational equation, then solve for f.",
                latex: "\\tfrac{1}{2}MR^2 \\cdot \\frac{a}{R} = fR \\;\\;\\Rightarrow\\;\\; f = \\tfrac{1}{2}Ma",
              },
              {
                description: "Substitute f back into the translational equation.",
                latex: "Ma = Mg\\sin\\theta - \\tfrac{1}{2}Ma \\;\\;\\Rightarrow\\;\\; \\tfrac{3}{2}Ma = Mg\\sin\\theta",
              },
              {
                description: "Solve for a.",
                latex: "a = \\tfrac{2}{3}g\\sin\\theta",
              },
            ],
            answer: "a = \\tfrac{2}{3} g\\sin\\theta",
            insight: "A rolling object accelerates slower than a sliding one (which would be g sin θ) because some KE goes into rotation. Different shapes have different fractions: hoop ½, sphere 5/7, cylinder 2/3.",
          },
          checkpoint: {
            question: 'A solid cylinder (I = ½MR²) and a hoop (I = MR²) of equal mass and radius roll down the same incline. Which reaches the bottom first?',
            options: ['Cylinder', 'Hoop', 'Same time', 'Depends on angle'],
            correct: 0,
            explanation: 'The cylinder has smaller I relative to MR², so less energy goes into rotation — more goes into translation. It accelerates faster.',
          },
        },
        quiz: [
          {
            q: 'A disk with I = 0.5 kg·m² experiences a net torque of 4 N·m. What is its angular acceleration?',
            options: ['2 rad/s²', '4 rad/s²', '8 rad/s²', '16 rad/s²'],
            correct: 2,
            explanation: 'α = τ/I = 4/0.5 = 8 rad/s².',
          },
          {
            q: 'A figure skater with I = 4 kg·m² spins at 2 rad/s. She pulls in her arms, reducing I to 1 kg·m². What is her new angular velocity?',
            options: ['0.5 rad/s', '2 rad/s', '4 rad/s', '8 rad/s'],
            correct: 3,
            explanation: 'Angular momentum conserved: I₁ω₁ = I₂ω₂ → 4(2) = 1(ω₂) → ω₂ = 8 rad/s.',
          },
          {
            q: 'A solid sphere (I = (2/5)MR²) rolls without slipping down an incline of height h. What is its speed at the bottom?',
            options: ['√(gh)', '√(10gh/7)', '√(2gh)', '√(gh/2)'],
            correct: 1,
            explanation: 'mgh = ½mv² + ½Iω² = ½mv² + ½(2/5)mR²(v/R)² = (7/10)mv² → v = √(10gh/7).',
          },
          {
            q: 'A uniform rod of length L and mass M pivots about one end. What is its moment of inertia?',
            options: ['(1/12)ML²', '(1/6)ML²', '(1/3)ML²', 'ML²'],
            correct: 2,
            explanation: 'About the center, I_cm = (1/12)ML². Parallel-axis to the end: I = (1/12)ML² + M(L/2)² = (1/3)ML².',
          },
        ],
      },
      {
        id: 'oscillations',
        videoId: 'nEsqBVtXRsE',
        videoTitle: 'Flipping Physics — AP Physics C Review',
        title: 'Simple Harmonic Motion',
        subtitle: 'Oscillations & Periodic Motion',
        estimatedMinutes: 40,
        description: 'The universal motion: anything near equilibrium oscillates sinusoidally. Springs, pendulums, and why sine waves rule physics.',
        lesson: {
          sections: [
            {
              heading: 'What makes motion "simple harmonic"',
              body: 'Simple harmonic motion (SHM) occurs when the restoring force is proportional to displacement: F = −kx. The solution is sinusoidal: x(t) = A cos(ωt + φ), where ω = √(k/m) is the angular frequency.',
              formulas: [
                { expr: '\\omega = \\sqrt{\\tfrac{k}{m}}', desc: 'Angular frequency of mass-spring' },
                { expr: 'T = 2\\pi\\sqrt{\\tfrac{m}{k}}', desc: 'Period of mass-spring' },
                { expr: 'x(t) = A\\cos(\\omega t + \\phi)', desc: 'Position in SHM' },
              ],
            },
            {
              heading: 'Energy in SHM',
              body: 'Energy sloshes between kinetic and potential forms. At maximum displacement, all energy is potential: E = ½kA². At equilibrium, all is kinetic: E = ½mv_max². These must be equal: v_max = Aω.',
              formulas: [
                { expr: 'E_{total} = \\tfrac{1}{2}kA^2', desc: 'Total energy in SHM' },
              ],
            },
            {
              heading: 'The simple pendulum',
              body: 'For small angles, sin θ ≈ θ, and the pendulum obeys SHM. Period T = 2π√(L/g) depends only on length and gravity — not mass or amplitude (as long as the amplitude is small).',
              formulas: [
                { expr: 'T = 2\\pi\\sqrt{\\tfrac{L}{g}}', desc: 'Simple pendulum period (small angle)' },
                { expr: 'T = 2\\pi\\sqrt{\\tfrac{I}{mgd}}', desc: 'Physical pendulum' },
              ],
            },
          ],
          workedExample: {
            title: "Energy and speed in SHM",
            problem: "A 0.50 kg mass on a spring (k = 200 N/m) is released from rest with displacement A = 0.10 m. Find the period, the maximum speed, and the speed when x = A/2.",
            given: ["m = 0.50 kg", "k = 200 N/m", "A = 0.10 m", "Released from rest at x = A"],
            find: "T, v_max, and v at x = A/2",
            steps: [
              {
                description: "Period of a mass-spring oscillator.",
                latex: "T = 2\\pi\\sqrt{\\frac{m}{k}} = 2\\pi\\sqrt{\\frac{0.50}{200}} = 2\\pi(0.05) \\approx 0.314 \\;\\mathrm{s}",
              },
              {
                description: "Total mechanical energy equals spring PE at full amplitude.",
                latex: "E = \\tfrac{1}{2}kA^2 = \\tfrac{1}{2}(200)(0.10)^2 = 1.0 \\;\\mathrm{J}",
              },
              {
                description: "Maximum speed occurs at x = 0, where all energy is kinetic.",
                latex: "\\tfrac{1}{2}m v_{\\max}^2 = E \\;\\;\\Rightarrow\\;\\; v_{\\max} = \\sqrt{\\frac{2E}{m}} = \\sqrt{\\frac{2}{0.50}} = 2.0 \\;\\mathrm{m/s}",
              },
              {
                description: "At x = A/2, use conservation: total = KE + spring PE.",
                latex: "\\tfrac{1}{2}mv^2 + \\tfrac{1}{2}k(A/2)^2 = \\tfrac{1}{2}kA^2",
              },
              {
                description: "Solve for v.",
                latex: "v = \\sqrt{\\frac{k}{m}}\\sqrt{A^2 - (A/2)^2} = \\sqrt{\\frac{k}{m}} \\cdot \\frac{\\sqrt{3}}{2}A",
              },
              {
                description: "Plug in.",
                latex: "v = \\sqrt{400} \\cdot \\frac{\\sqrt{3}}{2}(0.10) = 20 \\times 0.0866 \\approx 1.73 \\;\\mathrm{m/s}",
              },
            ],
            answer: "T \\approx 0.314 \\;\\mathrm{s},\\;\\; v_{\\max} = 2.0 \\;\\mathrm{m/s},\\;\\; v(A/2) \\approx 1.73 \\;\\mathrm{m/s}",
            insight: "At half-amplitude, the mass has lost only ¼ of the available KE — so it's still moving at √(3)/2 ≈ 87% of v_max. The KE-PE exchange is heavily skewed toward the turning points.",
          },
          checkpoint: {
            question: 'A 2-kg mass on a spring (k = 50 N/m) oscillates with amplitude 0.1 m. What is its maximum speed?',
            options: ['0.1 m/s', '0.5 m/s', '1.0 m/s', '5.0 m/s'],
            correct: 1,
            explanation: 'ω = √(k/m) = 5 rad/s. v_max = Aω = 0.1(5) = 0.5 m/s.',
          },
        },
        quiz: [
          {
            q: 'A pendulum has period 2 s on Earth. What is its period on the Moon (g_moon = g/6)?',
            options: ['2/√6 s', '2 s', '2√6 s', '12 s'],
            correct: 2,
            explanation: 'T ∝ 1/√g. If g decreases by factor 6, T increases by √6: T_moon = 2√6 s.',
          },
          {
            q: 'A spring oscillator has x(t) = 0.2 cos(4t) m. At what displacement is KE equal to PE?',
            options: ['0.1 m', '0.14 m', '0.17 m', '0.2 m'],
            correct: 1,
            explanation: 'Total energy ½kA² splits equally when ½kx² = ½(½kA²) → x² = A²/2 → x = A/√2 = 0.2/√2 ≈ 0.14 m.',
          },
          {
            q: 'For SHM, acceleration is maximum when:',
            options: ['v = 0 (at turning points)', 'v = v_max (at equilibrium)', 'x = A/2', 'It is always constant'],
            correct: 0,
            explanation: 'a = −ω²x, so |a| is max when |x| is max — at the turning points, where velocity is zero.',
          },
        ],
      },
      {
        id: 'gravitation',
        videoId: 'Bqly7yhFLKE',
        videoTitle: 'Flipping Physics — AP Physics C Review',
        title: 'Gravitation',
        subtitle: "Newton's Law of Universal Gravitation & Orbits",
        estimatedMinutes: 45,
        description: 'Newton\'s great insight: the same force that drops an apple keeps the Moon in orbit. Orbits, energy, and escape velocity.',
        lesson: {
          sections: [
            {
              heading: "Newton's law of universal gravitation",
              body: 'Every mass attracts every other mass with a force F = GMm/r², along the line between them. G = 6.67×10⁻¹¹ N·m²/kg². For spherically symmetric bodies, we can treat all the mass as concentrated at the center — the "shell theorem."',
              formulas: [
                { expr: 'F = \\frac{GMm}{r^2}', desc: 'Universal gravitation' },
                { expr: 'g = \\frac{GM}{r^2}', desc: 'Gravitational field strength' },
              ],
            },
            {
              heading: 'Gravitational potential energy',
              body: 'Taking U = 0 at infinity: U(r) = −GMm/r. This is negative because gravity is attractive — you have to do positive work against gravity to move an object to infinity.',
              formulas: [
                { expr: 'U = -\\frac{GMm}{r}', desc: 'Gravitational PE (U = 0 at ∞)' },
              ],
            },
            {
              heading: 'Circular orbits',
              body: 'For a circular orbit: gravity provides centripetal force. GMm/r² = mv²/r, giving v = √(GM/r). The orbital period T² ∝ r³ (Kepler\'s third law). Total orbital energy: E = −GMm/(2r) — always negative for bound orbits.',
              formulas: [
                { expr: 'v_{orbit} = \\sqrt{\\tfrac{GM}{r}}', desc: 'Circular orbital speed' },
                { expr: 'T^2 = \\frac{4\\pi^2}{GM}\\,r^3', desc: "Kepler's third law" },
                { expr: 'E_{orbit} = -\\frac{GMm}{2r}', desc: 'Total energy of circular orbit' },
              ],
            },
            {
              heading: 'Escape velocity',
              body: 'The minimum speed needed to escape to infinity with zero final kinetic energy. Setting total energy to zero: ½mv² − GMm/r = 0, so v_esc = √(2GM/r). For Earth\'s surface, v_esc ≈ 11.2 km/s.',
              formulas: [
                { expr: 'v_{esc} = \\sqrt{\\tfrac{2GM}{R}}', desc: 'Escape velocity from surface' },
              ],
            },
          ],
          workedExample: {
            title: "Earth's orbital period (Kepler's third law)",
            problem: "Compute Earth's orbital period using only Newton's law of gravitation. The Sun has mass M = 1.99 × 10³⁰ kg and Earth's orbit has radius r = 1.50 × 10¹¹ m.",
            given: ["M_sun = 1.99 × 10³⁰ kg", "r = 1.50 × 10¹¹ m", "G = 6.67 × 10⁻¹¹ N·m²/kg²"],
            find: "Orbital period T (in days)",
            steps: [
              {
                description: "For a circular orbit, gravity provides the centripetal force.",
                latex: "\\frac{GMm}{r^2} = \\frac{m v^2}{r}",
              },
              {
                description: "Solve for v, then use v = 2πr/T to get Kepler's third law.",
                latex: "v = \\sqrt{\\frac{GM}{r}} \\;\\;\\Rightarrow\\;\\; T = \\frac{2\\pi r}{v} = 2\\pi\\sqrt{\\frac{r^3}{GM}}",
              },
              {
                description: "Compute r³ and GM.",
                latex: "r^3 = (1.50\\times 10^{11})^3 = 3.375 \\times 10^{33}\\;\\mathrm{m^3}",
              },
              {
                description: "GM = (6.67×10⁻¹¹)(1.99×10³⁰).",
                latex: "GM \\approx 1.327 \\times 10^{20}\\;\\mathrm{m^3/s^2}",
              },
              {
                description: "Plug in.",
                latex: "T = 2\\pi\\sqrt{\\frac{3.375 \\times 10^{33}}{1.327 \\times 10^{20}}} = 2\\pi\\sqrt{2.543 \\times 10^{13}}",
              },
              {
                description: "Compute final value.",
                latex: "T \\approx 2\\pi (5.04 \\times 10^6)\\;\\mathrm{s} \\approx 3.17 \\times 10^7\\;\\mathrm{s} \\approx 367\\;\\mathrm{days}",
              },
            ],
            answer: "T \\approx 3.17 \\times 10^7 \\;\\mathrm{s} \\;\\approx\\; 367\\;\\text{days}",
            insight: "The slight discrepancy from 365.25 days is from rounding G, M, and r — not from physics. With more precise inputs you'd recover Earth's actual year. Newton's gravitation derives Kepler exactly.",
          },
          checkpoint: {
            question: 'A satellite\'s orbital radius doubles. What happens to its orbital period?',
            options: ['Stays the same', 'Increases by √2', 'Increases by 2', 'Increases by 2√2'],
            correct: 3,
            explanation: "Kepler's 3rd law: T² ∝ r³. If r doubles, T² increases by 8, so T increases by √8 = 2√2.",
          },
        },
        quiz: [
          {
            q: 'A planet orbits with period T at radius r. Another at radius 4r has period:',
            options: ['2T', '4T', '8T', '16T'],
            correct: 2,
            explanation: "T² ∝ r³. (T₂/T₁)² = 64, so T₂ = 8T.",
          },
          {
            q: 'The ratio of escape velocity to circular orbital velocity at the same radius is:',
            options: ['1', '√2', '2', '2√2'],
            correct: 1,
            explanation: 'v_esc = √(2GM/r), v_orbit = √(GM/r). Ratio = √2.',
          },
          {
            q: 'What work must be done to move a 1000-kg satellite from a circular orbit at radius r to one at radius 2r around Earth? (Express in terms of GM_E · m / r)',
            options: ['+GMm/(4r)', '+GMm/(2r)', '−GMm/(4r)', '+GMm/r'],
            correct: 0,
            explanation: 'E = −GMm/(2r). ΔE = E_final − E_initial = −GMm/(4r) − (−GMm/(2r)) = +GMm/(4r). Positive work is required.',
          },
        ],
      },
    ],
  },

  em: {
    id: 'em',
    title: 'Electricity & Magnetism',
    subtitle: 'The physics of charge and field',
    accent: '#4f46b8',
    accentSoft: '#dcd7f6',
    icon: Zap,
    description: 'From static charges to radiating waves. The interplay of electric and magnetic fields is the foundation of everything from circuits to light itself.',
    modules: [
      {
        id: 'electrostatics',
        videoId: 'nhPrnpIiv_A',
        videoTitle: 'Flipping Physics — AP Physics C Review',
        title: 'Electrostatics',
        subtitle: "Charge, Coulomb's Law & Electric Fields",
        estimatedMinutes: 50,
        description: "The starting point: static charges, the inverse-square electric force, and field lines.",
        lesson: {
          sections: [
            {
              heading: "Charge and Coulomb's law",
              body: 'Charge is quantized (e = 1.6×10⁻¹⁹ C) and conserved. Like charges repel, unlike attract. Coulomb\'s law: the force between two point charges is F = kq₁q₂/r², where k = 1/(4πε₀) ≈ 9×10⁹ N·m²/C².',
              formulas: [
                { expr: '\\vec{F} = \\frac{kq_1 q_2}{r^2}\\,\\hat{r}', desc: "Coulomb's law" },
                { expr: 'k = \\frac{1}{4\\pi\\varepsilon_0} \\approx 9\\times 10^9\\;\\mathrm{N\\cdot m^2/C^2}', desc: 'Coulomb constant' },
              ],
            },
            {
              heading: 'The electric field',
              body: 'The electric field at a point is the force per unit charge that would be felt by a small test charge placed there: E = F/q. For a point charge: E = kQ/r², pointing away from positive Q. Field lines visualize E: tangent to lines = direction of E; density = magnitude.',
              formulas: [
                { expr: '\\vec{E} = \\frac{\\vec{F}}{q}', desc: 'Definition of electric field' },
                { expr: 'E_{\\text{point}} = \\frac{kQ}{r^2}', desc: 'Field of a point charge' },
              ],
            },
            {
              heading: 'Field of continuous charge distributions',
              body: 'For a continuous distribution, integrate: E = k ∫dq/r² (as a vector). Key results you should know: infinite line of charge E = 2kλ/r (perpendicular); infinite sheet E = σ/(2ε₀) (perpendicular, uniform); charged disk/ring on axis — derivable from integration.',
            },
          ],
          workedExample: {
            title: "Field on the perpendicular bisector of two charges",
            problem: "Two point charges +Q sit at (−a, 0) and (+a, 0). Find the electric field at point P = (0, y) on the y-axis.",
            given: ["Charges +Q at (±a, 0)", "Point P at (0, y) with y > 0"],
            find: "Electric field vector E at P",
            steps: [
              {
                description: "Distance from each charge to P (Pythagorean theorem).",
                latex: "r = \\sqrt{a^2 + y^2}",
              },
              {
                description: "Each charge's field at P has magnitude kQ/r².",
                latex: "|E_1| = |E_2| = \\frac{kQ}{a^2 + y^2}",
              },
              {
                description: "By symmetry, the x-components cancel — only the y-component survives.",
                latex: "E_x = 0,\\quad E_y = 2|E_1|\\cos\\theta",
              },
              {
                description: "cos θ is the projection along y, which is y/r.",
                latex: "\\cos\\theta = \\frac{y}{\\sqrt{a^2 + y^2}}",
              },
              {
                description: "Combine.",
                latex: "E_y = 2 \\cdot \\frac{kQ}{a^2 + y^2} \\cdot \\frac{y}{\\sqrt{a^2 + y^2}} = \\frac{2kQy}{(a^2 + y^2)^{3/2}}",
              },
            ],
            answer: "\\vec{E}(0,y) = \\frac{2kQy}{(a^2 + y^2)^{3/2}}\\,\\hat{y}",
            insight: "Symmetry is a superpower in electrostatics: any pair of identical charges symmetric about an axis lets you cancel one component before doing any algebra. Limit checks: as y → ∞, this falls like 1/y² (acts like a point charge of 2Q). As y → 0, it goes to 0 (the two fields perfectly cancel between them along the bisector).",
          },
          checkpoint: {
            question: 'Two charges, +3 μC and −3 μC, sit 2 m apart. What is the magnitude of the electric field at the midpoint?',
            options: ['0 N/C', '2.7×10⁴ N/C', '5.4×10⁴ N/C', '2.7×10⁵ N/C'],
            correct: 2,
            explanation: 'Both fields point from + to −, i.e., in the same direction at the midpoint. Each has magnitude kq/r² = 9×10⁹ · 3×10⁻⁶ / 1² = 2.7×10⁴ N/C. Total: 5.4×10⁴ N/C.',
          },
        },
        quiz: [
          {
            q: 'Two point charges, +4 μC and +9 μC, are 5 m apart. Where on the line between them is the electric field zero?',
            options: ['2 m from +4 μC', '3 m from +4 μC', '2 m from +9 μC', 'Nowhere on the line'],
            correct: 0,
            explanation: 'Let distance from +4μC = x. Set k(4)/x² = k(9)/(5−x)². Taking square roots: 2/x = 3/(5−x) → 10 − 2x = 3x → x = 2 m.',
          },
          {
            q: 'The electric field at distance r from a long uniformly charged wire (linear charge density λ) is:',
            options: ['kλ/r²', '2kλ/r', 'kλ/r', 'λ/(2ε₀r)'],
            correct: 1,
            explanation: "E = λ/(2πε₀r) = 2kλ/r for an infinite line of charge.",
          },
          {
            q: 'An electron (q = −e, m = 9.1×10⁻³¹ kg) enters a uniform E field of 1000 N/C. What is its acceleration?',
            options: ['1.8×10¹⁴ m/s²', '1.1×10⁻²⁷ m/s²', '1.76×10¹⁴ m/s²', '9.1×10⁻¹⁹ m/s²'],
            correct: 2,
            explanation: 'a = F/m = qE/m = (1.6×10⁻¹⁹)(1000)/(9.1×10⁻³¹) ≈ 1.76×10¹⁴ m/s².',
          },
        ],
      },
      {
        id: 'gauss',
        videoId: 'EojpjIED_qg',
        videoTitle: 'Flipping Physics — AP Physics C Review',
        title: "Gauss's Law",
        subtitle: 'Flux, Symmetry, and Electric Fields',
        estimatedMinutes: 50,
        description: "Gauss's law turns symmetry into a calculational superpower. Master the three geometries (sphere, cylinder, plane) and you can handle almost any AP E&M field problem.",
        lesson: {
          sections: [
            {
              heading: 'Electric flux',
              body: 'Flux measures how much field passes through a surface: Φ_E = ∫E·dA. For a flat surface in a uniform field, Φ = EA cos θ. Think of it as "field × area perpendicular to field."',
              formulas: [
                { expr: '\\Phi_E = \\int \\vec{E}\\cdot d\\vec{A}', desc: 'Electric flux through a surface' },
              ],
            },
            {
              heading: "Gauss's law",
              body: "The total flux through a closed surface equals the enclosed charge divided by ε₀: ∮E·dA = Q_enc/ε₀. This is always true, but only useful for computing E when symmetry makes E·dA trivial.",
              formulas: [
                { expr: '\\oint \\vec{E}\\cdot d\\vec{A} = \\frac{Q_{enc}}{\\varepsilon_0}', desc: "Gauss's law" },
              ],
            },
            {
              heading: 'Three key symmetries',
              body: 'Spherical symmetry → spherical Gaussian surface. Outside a point charge (or sphere): E = kQ/r². Inside a uniformly charged sphere: E = kQr/R³. Cylindrical symmetry → cylindrical Gaussian surface. Planar symmetry → "pillbox" Gaussian surface. For infinite sheet: E = σ/(2ε₀).',
            },
            {
              heading: 'Conductors in electrostatic equilibrium',
              body: 'Inside a conductor, E = 0 (charges would keep moving otherwise). All excess charge sits on the surface. Field just outside the surface is σ/ε₀, perpendicular to the surface.',
            },
          ],
          workedExample: {
            title: "Field of a uniformly charged sphere",
            problem: "A solid insulating sphere of radius R has uniform volume charge density ρ. Find the electric field both inside (r < R) and outside (r > R) the sphere.",
            given: ["Solid sphere, radius R", "Uniform volume charge density ρ", "Total charge Q = (4/3)πR³ρ"],
            find: "E(r) for r < R and r > R",
            steps: [
              {
                description: "By spherical symmetry, E points radially and depends only on r. Choose a Gaussian sphere of radius r.",
                latex: "\\oint \\vec{E}\\cdot d\\vec{A} = E(r)\\,(4\\pi r^2)",
              },
              {
                description: "Outside (r > R): all of Q is enclosed.",
                latex: "E(r)\\,(4\\pi r^2) = \\frac{Q}{\\varepsilon_0} \\;\\;\\Rightarrow\\;\\; E_{\\text{out}}(r) = \\frac{kQ}{r^2}",
              },
              {
                description: "Inside (r < R): only a fraction of charge is enclosed — the part in volume (4/3)πr³.",
                latex: "Q_{enc} = \\rho \\cdot \\tfrac{4}{3}\\pi r^3 = Q\\,\\frac{r^3}{R^3}",
              },
              {
                description: "Apply Gauss's law inside.",
                latex: "E(r)\\,(4\\pi r^2) = \\frac{Q\\,r^3 / R^3}{\\varepsilon_0}",
              },
              {
                description: "Solve for E inside.",
                latex: "E_{\\text{in}}(r) = \\frac{kQ}{R^3}\\,r",
              },
            ],
            answer: "E_{\\text{out}}(r) = \\frac{kQ}{r^2},\\quad E_{\\text{in}}(r) = \\frac{kQ}{R^3}\\,r",
            insight: "Outside, the sphere acts exactly like a point charge at its center (shell theorem in action). Inside, E grows linearly with r — it's zero at the center and matches the outside formula at r = R. The two expressions agree at the boundary, as they must.",
          },
          checkpoint: {
            question: 'A point charge +Q sits at the center of a cubic Gaussian surface. What is the flux through one face?',
            options: ['Q/ε₀', 'Q/(6ε₀)', 'Q/(4πε₀)', '0'],
            correct: 1,
            explanation: 'Total flux = Q/ε₀. By symmetry, the flux is the same through each of the 6 faces, so one face gets Q/(6ε₀).',
          },
        },
        quiz: [
          {
            q: 'A solid insulating sphere of radius R has uniform charge Q. What is E at r = R/2?',
            options: ['kQ/R²', 'kQ/(2R²)', 'kQ/(4R²)', '0'],
            correct: 1,
            explanation: 'Inside: E = kQr/R³. At r = R/2: E = kQ(R/2)/R³ = kQ/(2R²).',
          },
          {
            q: 'An infinite sheet of charge has surface charge density σ. A parallel second sheet has charge density −σ. What is the field between them?',
            options: ['0', 'σ/(2ε₀)', 'σ/ε₀', '2σ/ε₀'],
            correct: 2,
            explanation: 'Each sheet creates σ/(2ε₀). Between the sheets, fields add: σ/(2ε₀) + σ/(2ε₀) = σ/ε₀.',
          },
          {
            q: 'A hollow conducting sphere carries net charge +Q. A point charge −q is placed inside the cavity. What is the charge on the outer surface?',
            options: ['Q', 'Q − q', 'Q + q', '−q'],
            correct: 1,
            explanation: "Inner surface: +q (induced to cancel the cavity charge, by Gauss's law applied inside the conductor). Conservation of charge on the conductor: total = Q, so outer = Q − q.",
          },
        ],
      },
      {
        id: 'circuits',
        videoId: 'FYsfp4bZc2w',
        videoTitle: 'Flipping Physics — AP Physics C Review',
        title: 'Electric Circuits',
        subtitle: 'Resistors, Capacitors, Kirchhoff\'s Laws',
        estimatedMinutes: 55,
        description: "Ohm's law, Kirchhoff's rules, RC circuits, and the art of simplifying networks. Critical AP territory.",
        lesson: {
          sections: [
            {
              heading: "Current, resistance, Ohm's law",
              body: 'Current I is the flow rate of charge: I = dQ/dt. For ohmic materials: V = IR. Power dissipated: P = IV = I²R = V²/R. Resistance comes from R = ρL/A, where ρ is resistivity.',
              formulas: [
                { expr: 'V = IR', desc: "Ohm's law" },
                { expr: 'P = IV = I^2 R = \\frac{V^2}{R}', desc: 'Power in a resistor' },
              ],
            },
            {
              heading: 'Resistors in series and parallel',
              body: 'Series: R_total = R₁ + R₂ + … (same current, voltages add). Parallel: 1/R_total = 1/R₁ + 1/R₂ + … (same voltage, currents add).',
            },
            {
              heading: "Kirchhoff's laws",
              body: "Junction rule: current in = current out (charge conservation). Loop rule: sum of voltage changes around any closed loop = 0 (energy conservation). Together these handle any circuit, no matter how complex.",
              formulas: [
                { expr: '\\sum I_{\\text{in}} = \\sum I_{\\text{out}}', desc: 'Junction rule' },
                { expr: '\\sum \\Delta V = 0 \\;\\text{(loop)}', desc: 'Loop rule' },
              ],
            },
            {
              heading: 'Capacitors and RC circuits',
              body: 'Capacitance: C = Q/V. For parallel plates: C = ε₀A/d. Energy stored: U = ½CV² = Q²/(2C). Charging RC circuit: Q(t) = Q_f(1 − e^(−t/RC)). Discharging: Q(t) = Q₀ e^(−t/RC). Time constant τ = RC.',
              formulas: [
                { expr: 'C = \\frac{Q}{V}', desc: 'Capacitance definition' },
                { expr: 'U_C = \\tfrac{1}{2}CV^2 = \\frac{Q^2}{2C}', desc: 'Energy in capacitor' },
                { expr: '\\tau = RC', desc: 'RC time constant' },
              ],
            },
            {
              heading: 'Capacitors in series and parallel',
              body: 'Capacitors behave opposite to resistors. Parallel: C_total = C₁ + C₂. Series: 1/C_total = 1/C₁ + 1/C₂.',
            },
          ],
          workedExample: {
            title: "RC circuit — when does the capacitor reach 90% charge?",
            problem: "A 12 V battery, a 2.0 kΩ resistor, and an uncharged 100 μF capacitor are wired in series. The switch is closed at t = 0. Find the time at which the capacitor reaches 90% of its final charge.",
            given: ["ε = 12 V", "R = 2.0 × 10³ Ω", "C = 100 × 10⁻⁶ F = 1.0 × 10⁻⁴ F", "Initially uncharged"],
            find: "Time t at which q(t) = 0.90 Q_max",
            steps: [
              {
                description: "The time constant.",
                latex: "\\tau = RC = (2000)(10^{-4}) = 0.20 \\;\\mathrm{s}",
              },
              {
                description: "Charging equation.",
                latex: "q(t) = Q_{\\max}\\!\\left(1 - e^{-t/\\tau}\\right)",
              },
              {
                description: "Set q(t) = 0.90 Q_max and divide both sides by Q_max.",
                latex: "0.90 = 1 - e^{-t/\\tau} \\;\\;\\Rightarrow\\;\\; e^{-t/\\tau} = 0.10",
              },
              {
                description: "Take the natural log.",
                latex: "-\\frac{t}{\\tau} = \\ln(0.10) = -\\ln(10) \\approx -2.303",
              },
              {
                description: "Solve for t.",
                latex: "t = 2.303\\,\\tau = 2.303 \\times 0.20 \\approx 0.46 \\;\\mathrm{s}",
              },
            ],
            answer: "t \\approx 0.46 \\;\\mathrm{s} \\;\\;(\\approx 2.3\\,\\tau)",
            insight: "Useful rule of thumb: 1τ ≈ 63%, 2τ ≈ 86%, 3τ ≈ 95%, 5τ ≈ 99% charged. At 5τ a capacitor is essentially fully charged for engineering purposes.",
          },
          checkpoint: {
            question: 'Three 6-Ω resistors are in parallel. What is the equivalent resistance?',
            options: ['2 Ω', '3 Ω', '6 Ω', '18 Ω'],
            correct: 0,
            explanation: '1/R = 1/6 + 1/6 + 1/6 = 3/6 = 1/2. R = 2 Ω.',
          },
        },
        quiz: [
          {
            q: 'A 12-V battery is connected to 4-Ω and 2-Ω resistors in series. What is the current?',
            options: ['1 A', '2 A', '3 A', '6 A'],
            correct: 1,
            explanation: 'R_total = 6 Ω. I = V/R = 12/6 = 2 A.',
          },
          {
            q: 'In an RC discharging circuit with τ = 2 s and initial charge Q₀, how much charge remains at t = 2 s?',
            options: ['Q₀/2', 'Q₀/e', 'Q₀/e²', 'Q₀'],
            correct: 1,
            explanation: 'Q(t) = Q₀ e^(−t/τ). At t = τ: Q = Q₀/e ≈ 0.37 Q₀.',
          },
          {
            q: 'A 10-μF capacitor and a 5-μF capacitor are in series. Their equivalent capacitance is:',
            options: ['3.3 μF', '5 μF', '7.5 μF', '15 μF'],
            correct: 0,
            explanation: '1/C = 1/10 + 1/5 = 3/10 → C = 10/3 ≈ 3.3 μF.',
          },
          {
            q: 'A 2-Ω resistor carries 3 A for 10 s. How much energy is dissipated?',
            options: ['6 J', '60 J', '180 J', '600 J'],
            correct: 2,
            explanation: 'P = I²R = 9(2) = 18 W. E = Pt = 18(10) = 180 J.',
          },
        ],
      },
      {
        id: 'magnetism',
        videoId: 'Sn1GVo2btKA',
        videoTitle: 'Flipping Physics — AP Physics C Review',
        title: 'Magnetic Fields',
        subtitle: 'Magnetic Force, Biot–Savart, Ampère\'s Law',
        estimatedMinutes: 55,
        description: "Moving charges create magnetic fields; magnetic fields exert forces on moving charges. The surprising geometry of cross products.",
        lesson: {
          sections: [
            {
              heading: 'Magnetic force on a moving charge',
              body: 'F = qv × B — perpendicular to both velocity and field. A charged particle in a uniform B field undergoes circular motion with radius r = mv/(qB) and period T = 2πm/(qB) — independent of speed.',
              formulas: [
                { expr: '\\vec{F} = q\\vec{v}\\times\\vec{B}', desc: 'Lorentz force (magnetic)' },
                { expr: 'r = \\frac{mv}{qB}', desc: 'Radius of cyclotron motion' },
              ],
            },
            {
              heading: 'Magnetic force on a current-carrying wire',
              body: 'A current I in a wire of length L in a field B feels: F = IL × B. This is the force behind motors. For a current loop in a uniform field: net force = 0, but there\'s a torque τ = μ × B, where μ = NIA (magnetic moment).',
              formulas: [
                { expr: '\\vec{F} = I\\vec{L}\\times\\vec{B}', desc: 'Force on a current-carrying wire' },
                { expr: '\\mu = NIA', desc: 'Magnetic moment of a coil' },
              ],
            },
            {
              heading: 'Biot–Savart law',
              body: 'The field created by a current element: dB = (μ₀/4π) (I dL × r̂)/r². Integrating gives key results: field of an infinite straight wire B = μ₀I/(2πr); field at center of a circular loop B = μ₀I/(2R); field on axis of loop is derivable from integration.',
              formulas: [
                { expr: 'd\\vec{B} = \\frac{\\mu_0}{4\\pi}\\,\\frac{I\\,d\\vec{l}\\times\\hat{r}}{r^2}', desc: 'Biot–Savart law' },
                { expr: 'B_{\\text{wire}} = \\frac{\\mu_0 I}{2\\pi r}', desc: 'Field of long straight wire' },
              ],
            },
            {
              heading: "Ampère's law",
              body: 'The magnetic analog of Gauss\'s law: ∮B·dL = μ₀I_enc. Useful for highly symmetric situations: long wires, solenoids (B = μ₀nI inside), toroids.',
              formulas: [
                { expr: '\\oint \\vec{B}\\cdot d\\vec{l} = \\mu_0 I_{enc}', desc: "Ampère's law" },
                { expr: 'B_{\\text{solenoid}} = \\mu_0 n I', desc: 'Field inside an ideal solenoid' },
              ],
            },
          ],
          workedExample: {
            title: "Charged particle in a magnetic field",
            problem: "A proton (m = 1.67 × 10⁻²⁷ kg, q = 1.60 × 10⁻¹⁹ C) enters a uniform 0.50 T magnetic field perpendicular to its velocity of 3.0 × 10⁶ m/s. Find the radius of its circular path and the period.",
            given: ["m = 1.67 × 10⁻²⁷ kg", "q = 1.60 × 10⁻¹⁹ C", "v = 3.0 × 10⁶ m/s", "B = 0.50 T (perpendicular to v)"],
            find: "Radius r and period T",
            steps: [
              {
                description: "The magnetic force on a moving charge provides centripetal force.",
                latex: "qvB = \\frac{mv^2}{r}",
              },
              {
                description: "Solve for r.",
                latex: "r = \\frac{mv}{qB}",
              },
              {
                description: "Plug in.",
                latex: "r = \\frac{(1.67\\times 10^{-27})(3.0\\times 10^6)}{(1.60\\times 10^{-19})(0.50)} = \\frac{5.01\\times 10^{-21}}{8.0\\times 10^{-20}}",
              },
              {
                description: "Compute.",
                latex: "r \\approx 0.063 \\;\\mathrm{m} = 6.3 \\;\\mathrm{cm}",
              },
              {
                description: "Period is circumference over speed.",
                latex: "T = \\frac{2\\pi r}{v} = \\frac{2\\pi m}{qB}",
              },
              {
                description: "Plug in.",
                latex: "T = \\frac{2\\pi(1.67\\times 10^{-27})}{(1.60\\times 10^{-19})(0.50)} \\approx 1.31 \\times 10^{-7}\\;\\mathrm{s}",
              },
            ],
            answer: "r \\approx 6.3 \\;\\mathrm{cm},\\;\\; T \\approx 1.31 \\times 10^{-7}\\;\\mathrm{s}",
            insight: "Notice T = 2πm/(qB) — independent of speed! Faster particles trace bigger circles in the same time. This is the principle behind cyclotrons.",
          },
          checkpoint: {
            question: 'A proton moves east at 10⁶ m/s in a magnetic field pointing north. What direction is the magnetic force?',
            options: ['Up', 'Down', 'West', 'South'],
            correct: 0,
            explanation: 'F = qv × B. East × North = Up (right-hand rule). For a positive charge, force is in that direction.',
          },
        },
        quiz: [
          {
            q: 'A 2-m straight wire carries 5 A perpendicular to a 0.4-T field. What is the force on the wire?',
            options: ['1 N', '4 N', '10 N', '40 N'],
            correct: 1,
            explanation: 'F = BIL = 0.4 × 5 × 2 = 4 N.',
          },
          {
            q: 'A charged particle moves in a circle of radius r in a magnetic field B. If its speed doubles, the new radius is:',
            options: ['r/2', 'r', '2r', '4r'],
            correct: 2,
            explanation: 'r = mv/(qB). r ∝ v, so doubling v doubles r.',
          },
          {
            q: 'Two parallel wires, 1 m apart, carry currents of 3 A and 4 A in the same direction. The force per unit length between them is (μ₀/2π = 2×10⁻⁷):',
            options: ['Attractive, 2.4×10⁻⁶ N/m', 'Repulsive, 2.4×10⁻⁶ N/m', 'Attractive, 6×10⁻⁶ N/m', '0'],
            correct: 0,
            explanation: 'F/L = μ₀I₁I₂/(2πd) = 2×10⁻⁷ × 12 / 1 = 2.4×10⁻⁶ N/m. Same direction currents attract.',
          },
        ],
      },
      {
        id: 'induction',
        videoId: 'E7HhWFb-478',
        videoTitle: 'Flipping Physics — AP Physics C Review',
        title: 'Electromagnetic Induction',
        subtitle: "Faraday's Law, Lenz's Law & Inductance",
        estimatedMinutes: 55,
        description: "A changing magnetic flux creates an EMF. The principle behind every generator, transformer, and inductor — and the final piece before Maxwell's equations.",
        lesson: {
          sections: [
            {
              heading: 'Magnetic flux',
              body: 'Like electric flux: Φ_B = ∫B·dA. For a flat loop in a uniform field, Φ_B = BA cos θ, where θ is between B and the loop\'s normal. Units: webers (Wb) = T·m².',
              formulas: [
                { expr: '\\Phi_B = \\int \\vec{B}\\cdot d\\vec{A}', desc: 'Magnetic flux' },
              ],
            },
            {
              heading: "Faraday's and Lenz's laws",
              body: "Faraday: the EMF induced in a loop equals the negative rate of change of flux. ε = −dΦ_B/dt. The negative sign is Lenz's law: the induced current opposes the change in flux. If flux is increasing, the induced current creates a field opposing the external flux; if decreasing, the induced current tries to maintain it.",
              formulas: [
                { expr: '\\varepsilon = -\\frac{d\\Phi_B}{dt}', desc: "Faraday's law" },
              ],
            },
            {
              heading: 'Motional EMF',
              body: 'A conducting rod of length L moving with velocity v perpendicular to a magnetic field B induces an EMF: ε = BLv. This is the principle behind generators — mechanical motion becomes electric energy.',
              formulas: [
                { expr: '\\varepsilon = BLv', desc: 'Motional EMF (rod in uniform field)' },
              ],
            },
            {
              heading: 'Inductance and RL circuits',
              body: 'An inductor opposes changes in current: V_L = L(dI/dt). For a solenoid, L = μ₀n²Vol. Energy stored: U = ½LI². An RL circuit has current growing as I(t) = (V/R)(1 − e^(−Rt/L)) when switched on; time constant τ = L/R.',
              formulas: [
                { expr: 'V_L = L\\,\\frac{dI}{dt}', desc: 'Voltage across inductor' },
                { expr: 'U_L = \\tfrac{1}{2}LI^2', desc: 'Energy stored in inductor' },
                { expr: '\\tau = L/R', desc: 'RL time constant' },
              ],
            },
          ],
          workedExample: {
            title: "Motional EMF on a sliding rod",
            problem: "A 0.40 m conducting rod slides at constant velocity v = 5.0 m/s along parallel rails connected by a 2.0 Ω resistor. The whole assembly sits in a uniform 0.30 T magnetic field perpendicular to the rail plane. Find the induced EMF, the induced current, and the force needed to keep the rod moving.",
            given: ["L = 0.40 m", "v = 5.0 m/s", "B = 0.30 T (⊥ to plane)", "R = 2.0 Ω"],
            find: "EMF, current I, and external force F_ext",
            steps: [
              {
                description: "Motional EMF for a rod sweeping out flux.",
                latex: "\\varepsilon = BLv = (0.30)(0.40)(5.0) = 0.60 \\;\\mathrm{V}",
              },
              {
                description: "Induced current via Ohm's law.",
                latex: "I = \\frac{\\varepsilon}{R} = \\frac{0.60}{2.0} = 0.30 \\;\\mathrm{A}",
              },
              {
                description: "The current-carrying rod in the field experiences a force F = BIL — opposing the motion (Lenz's law).",
                latex: "F_{mag} = BIL = (0.30)(0.30)(0.40) = 0.036 \\;\\mathrm{N}",
              },
              {
                description: "To maintain constant velocity, the external force must balance F_mag.",
                latex: "F_{ext} = 0.036 \\;\\mathrm{N}",
              },
              {
                description: "Sanity check via power: external work rate = electrical power dissipated.",
                latex: "F_{ext}\\, v = (0.036)(5.0) = 0.18 \\;\\mathrm{W} = I^2 R = (0.30)^2(2.0) = 0.18 \\;\\mathrm{W} \\;\\checkmark",
              },
            ],
            answer: "\\varepsilon = 0.60\\;\\mathrm{V},\\;\\; I = 0.30\\;\\mathrm{A},\\;\\; F_{ext} = 0.036\\;\\mathrm{N}",
            insight: "Energy bookkeeping closes the loop: every joule of work you do pushing the rod ends up dissipated in the resistor. This is exactly how generators work — mechanical input → electrical output, with magnetic flux as the intermediary.",
          },
          checkpoint: {
            question: 'A 50-turn coil of area 0.02 m² sits in a field that changes from 0.1 T to 0.5 T over 2 seconds. What is the induced EMF?',
            options: ['0.1 V', '0.2 V', '0.5 V', '1.0 V'],
            correct: 1,
            explanation: 'ε = N|dΦ/dt| = N·A·|dB/dt| = 50(0.02)(0.4/2) = 50(0.02)(0.2) = 0.2 V.',
          },
        },
        quiz: [
          {
            q: 'A 0.5-m rod moves at 4 m/s perpendicular to a 0.2-T field. The motional EMF is:',
            options: ['0.1 V', '0.4 V', '1.0 V', '2.0 V'],
            correct: 1,
            explanation: 'ε = BLv = 0.2(0.5)(4) = 0.4 V.',
          },
          {
            q: 'An inductor with L = 2 H carries current that increases at 3 A/s. The voltage across it is:',
            options: ['1.5 V', '2 V', '3 V', '6 V'],
            correct: 3,
            explanation: 'V = L(dI/dt) = 2(3) = 6 V.',
          },
          {
            q: 'In an RL circuit with time constant τ = L/R, after time t = 3τ, the current reaches approximately what fraction of its final value?',
            options: ['37%', '63%', '95%', '99%'],
            correct: 2,
            explanation: 'I(t) = I_f(1 − e^(−t/τ)). At t = 3τ: I/I_f = 1 − e^(−3) ≈ 1 − 0.05 = 0.95.',
          },
          {
            q: "A square loop of side 0.1 m rotates at 10 rad/s in a 0.5-T field. What is the peak EMF?",
            options: ['0.005 V', '0.05 V', '0.1 V', '0.5 V'],
            correct: 1,
            explanation: 'ε_peak = BAω = 0.5(0.01)(10) = 0.05 V.',
          },
        ],
      },
    ],
  },
};

// Flatten curriculum for easy lookup
const allModules = [
  ...curriculum.mechanics.modules.map(m => ({ ...m, subjectId: 'mechanics' })),
  ...curriculum.em.modules.map(m => ({ ...m, subjectId: 'em' })),
];

// Mock exam bank — mixed questions for full-length practice
const mockExamQuestions = [
  { subject: 'mechanics', topic: 'Kinematics', q: 'A ball is dropped from rest. How far does it fall in the 3rd second? (g = 10 m/s²)', options: ['15 m', '25 m', '30 m', '45 m'], correct: 1, explanation: 'Distance in nth second: d_n = g(n − 0.5) = 10(2.5) = 25 m.' },
  { subject: 'mechanics', topic: "Newton's Laws", q: 'A block on a frictionless 37° incline (sin37°=0.6). Its acceleration is:', options: ['4 m/s²', '6 m/s²', '8 m/s²', '10 m/s²'], correct: 1, explanation: 'a = g sinθ = 10(0.6) = 6 m/s².' },
  { subject: 'mechanics', topic: 'Energy', q: 'A 2-kg pendulum bob is released from a height 0.5 m above the bottom of its swing. Its speed at the bottom is (g=10):', options: ['2 m/s', '√10 m/s', '5 m/s', '10 m/s'], correct: 1, explanation: 'v = √(2gh) = √10 m/s ≈ 3.16 m/s.' },
  { subject: 'mechanics', topic: 'Momentum', q: 'A 5-kg object moving at 4 m/s collides elastically with a stationary 3-kg object. After the collision, the 5-kg object\'s velocity is:', options: ['0.5 m/s', '1 m/s', '2 m/s', '3 m/s'], correct: 1, explanation: 'For elastic 1D: v₁\' = (m₁−m₂)/(m₁+m₂)·v₁ = (2/8)(4) = 1 m/s.' },
  { subject: 'mechanics', topic: 'Rotation', q: 'The rotational kinetic energy of a wheel with I = 2 kg·m² spinning at 5 rad/s is:', options: ['5 J', '10 J', '25 J', '50 J'], correct: 2, explanation: 'K = ½Iω² = ½(2)(25) = 25 J.' },
  { subject: 'mechanics', topic: 'SHM', q: 'A mass-spring system has period 2 s. If the mass is quadrupled, the new period is:', options: ['1 s', '2 s', '4 s', '8 s'], correct: 2, explanation: 'T = 2π√(m/k). T ∝ √m, so 4m → T doubles → 4 s.' },
  { subject: 'mechanics', topic: 'Gravitation', q: 'A satellite at altitude r₀ has speed v₀. At altitude 4r₀ (from center), its speed in circular orbit is:', options: ['v₀/4', 'v₀/2', 'v₀/√2', '2v₀'], correct: 1, explanation: 'v = √(GM/r), v ∝ 1/√r. At 4r: v = v₀/2.' },
  { subject: 'em', topic: 'Electrostatics', q: 'Two +3 μC charges are 0.3 m apart. The force between them is:', options: ['0.3 N', '0.9 N', '9 N', '90 N'], correct: 1, explanation: 'F = k q₁q₂/r² = 9×10⁹ · 9×10⁻¹² / 0.09 = 0.9 N.' },
  { subject: 'em', topic: "Gauss's Law", q: "A solid conducting sphere of radius R carries charge Q. Inside the sphere (r < R), E =", options: ['kQ/r²', 'kQ/R²', 'kQr/R³', '0'], correct: 3, explanation: 'Inside a conductor in electrostatic equilibrium, E = 0.' },
  { subject: 'em', topic: 'Circuits', q: 'A 9-V battery drives current through a 3-Ω resistor in series with a 6-Ω resistor. Voltage across the 6-Ω resistor:', options: ['2 V', '3 V', '6 V', '9 V'], correct: 2, explanation: 'I = 9/9 = 1 A. V = IR = 1(6) = 6 V.' },
  { subject: 'em', topic: 'Capacitors', q: 'A 5-μF capacitor is charged to 100 V. Energy stored:', options: ['2.5×10⁻²  J', '0.025 J', '0.05 J', '0.5 J'], correct: 1, explanation: 'U = ½CV² = ½(5×10⁻⁶)(10⁴) = 0.025 J.' },
  { subject: 'em', topic: 'Magnetism', q: 'A 2-m wire carries 5 A perpendicular to a 0.3-T field. The force on it is:', options: ['1.5 N', '3 N', '15 N', '30 N'], correct: 1, explanation: 'F = BIL = 0.3(5)(2) = 3 N.' },
  { subject: 'em', topic: 'Biot–Savart', q: 'At distance 0.5 m from a long wire carrying 10 A, the magnetic field is:', options: ['2×10⁻⁶ T', '4×10⁻⁶ T', '10⁻⁵ T', '10⁻⁴ T'], correct: 1, explanation: 'B = μ₀I/(2πr) = (4π×10⁻⁷)(10)/(2π · 0.5) = 4×10⁻⁶ T.' },
  { subject: 'em', topic: 'Induction', q: 'A loop\'s flux changes from 0 to 0.4 Wb in 0.2 s. The induced EMF is:', options: ['0.8 V', '2 V', '4 V', '8 V'], correct: 1, explanation: '|ε| = |dΦ/dt| = 0.4/0.2 = 2 V.' },
  { subject: 'em', topic: 'RL Circuits', q: 'An RL circuit (L = 4 H, R = 2 Ω) is switched on. Its time constant is:', options: ['0.5 s', '2 s', '4 s', '8 s'], correct: 1, explanation: 'τ = L/R = 4/2 = 2 s.' },
  { subject: 'mechanics', topic: 'Kinematics', q: 'A projectile is launched at 45° with speed 20 m/s. Range (g=10):', options: ['10 m', '20 m', '40 m', '80 m'], correct: 2, explanation: 'R = v² sin(2θ)/g = 400·1/10 = 40 m.' },
  { subject: 'mechanics', topic: 'Friction', q: 'A block slides on a surface with μ_k = 0.2 and decelerates. Deceleration (g = 10):', options: ['1 m/s²', '2 m/s²', '5 m/s²', '20 m/s²'], correct: 1, explanation: 'a = μ_k g = 0.2(10) = 2 m/s².' },
  { subject: 'em', topic: 'Potential', q: 'The electric potential at distance 0.1 m from a +1 μC charge is:', options: ['9×10³ V', '9×10⁴ V', '9×10⁵ V', '9×10⁶ V'], correct: 1, explanation: 'V = kQ/r = 9×10⁹ · 10⁻⁶ / 0.1 = 9×10⁴ V.' },
  { subject: 'em', topic: 'Circuits', q: "Three 4-Ω resistors in parallel have equivalent resistance:", options: ['1.33 Ω', '2 Ω', '4 Ω', '12 Ω'], correct: 0, explanation: '1/R = 3/4, so R = 4/3 ≈ 1.33 Ω.' },
  { subject: 'mechanics', topic: 'Circular Motion', q: "A 0.5-kg ball swings on a 1-m string in a horizontal circle at 4 m/s. Tension:", options: ['2 N', '4 N', '8 N', '16 N'], correct: 2, explanation: 'T = mv²/r = 0.5(16)/1 = 8 N.' },
];

// ═══════════════════════════════════════════════════════════════════
// STORAGE LAYER — thin wrappers around window.storage
// ═══════════════════════════════════════════════════════════════════

const STORAGE_KEYS = {
  PROFILE: 'pcm-profile',
  PROGRESS: 'pcm-progress',
  PRACTICE: 'pcm-practice',
  EXAMS: 'pcm-exams',
  ACHIEVEMENTS: 'pcm-achievements',
};

async function loadState(key, defaultValue) {
  try {
    if (!window.storage) return defaultValue;
    const result = await window.storage.get(key);
    if (!result) return defaultValue;
    return JSON.parse(result.value);
  } catch {
    return defaultValue;
  }
}

async function saveState(key, value) {
  try {
    if (!window.storage) return;
    await window.storage.set(key, JSON.stringify(value));
  } catch (e) {
    console.error('save failed', key, e);
  }
}

// ═══════════════════════════════════════════════════════════════════
// DERIVED / HELPER FUNCTIONS
// ═══════════════════════════════════════════════════════════════════

function computeMastery(progress, moduleId) {
  const p = progress[moduleId];
  if (!p) return 0;
  const lessonDone = p.lessonDone ? 40 : 0;
  const quizzes = p.quizAttempts || [];
  if (quizzes.length === 0) return lessonDone;
  const best = Math.max(...quizzes.map(a => a.score / a.total));
  return Math.round(lessonDone + best * 60);
}

function computeOverallProgress(progress) {
  const total = allModules.reduce((sum, m) => sum + computeMastery(progress, m.id), 0);
  return Math.round(total / allModules.length);
}

function subjectMastery(progress, subjectId) {
  const mods = curriculum[subjectId].modules;
  const total = mods.reduce((sum, m) => sum + computeMastery(progress, m.id), 0);
  return Math.round(total / mods.length);
}

function formatDate(iso) {
  if (!iso) return '';
  const d = new Date(iso);
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
}

function daysBetween(isoA, isoB) {
  const a = new Date(isoA); a.setHours(0,0,0,0);
  const b = new Date(isoB); b.setHours(0,0,0,0);
  return Math.round((b - a) / 86400000);
}

function todayISO() {
  return new Date().toISOString().slice(0, 10);
}

// Deterministic daily-problem picker based on date string
function pickDailyProblem(dateStr) {
  let hash = 0;
  for (let i = 0; i < dateStr.length; i++) hash = (hash * 31 + dateStr.charCodeAt(i)) | 0;
  const idx = Math.abs(hash) % mockExamQuestions.length;
  return { ...mockExamQuestions[idx], _idx: idx };
}

// Returns the module that should be completed before this one (the previous module
// in the same subject's sequence), or null for the first module in a subject.
function getPrerequisite(moduleId) {
  const mod = allModules.find(m => m.id === moduleId);
  if (!mod) return null;
  const subjectMods = curriculum[mod.subjectId].modules;
  const idx = subjectMods.findIndex(m => m.id === moduleId);
  if (idx <= 0) return null;
  return { ...subjectMods[idx - 1], subjectId: mod.subjectId };
}

// Soft-lock check: a module is "recommended later" if its prereq is below 40% mastery.
// We never hard-lock; the user can always click through. The UI just nudges.
function isPrereqMet(progress, moduleId) {
  const prereq = getPrerequisite(moduleId);
  if (!prereq) return true;
  return computeMastery(progress, prereq.id) >= 40;
}

const ACHIEVEMENTS = [
  { id: 'first-lesson', title: 'First Steps', desc: 'Complete your first lesson', icon: BookOpen },
  { id: 'first-quiz', title: 'Quiz Rookie', desc: 'Complete your first quiz', icon: CheckCircle2 },
  { id: 'perfect-quiz', title: 'Flawless', desc: 'Score 100% on a quiz', icon: Star },
  { id: 'week-streak', title: 'On Fire', desc: 'Maintain a 7-day practice streak', icon: Flame },
  { id: 'module-master', title: 'Module Master', desc: 'Reach 100% mastery on a module', icon: Trophy },
  { id: 'first-exam', title: 'Exam Tested', desc: 'Complete a mock exam', icon: FileText },
  { id: 'mechanics-done', title: 'Mechanical Mind', desc: 'Complete all Mechanics lessons', icon: Atom },
  { id: 'em-done', title: 'Field Theorist', desc: 'Complete all E&M lessons', icon: Zap },
];

// ═══════════════════════════════════════════════════════════════════
// UI PRIMITIVES & STYLE
// ═══════════════════════════════════════════════════════════════════

const THEME = {
  paper: '#faf6ee',
  paperDeep: '#f3ecdf',
  ink: '#141820',
  inkSoft: '#3f4755',
  muted: '#78808f',
  line: '#e6ddc9',
  accent: '#1f4d3f',      // forest green (primary brand)
  accentSoft: '#cfdfd4',
  mech: '#c15a3a',        // terracotta
  mechSoft: '#f3d9cd',
  em: '#4f46b8',          // indigo
  emSoft: '#dcd7f6',
  gold: '#c49434',
  goldSoft: '#f1e2b4',
  success: '#4a7c59',
  error: '#b94a3a',
};

// Inject fonts and custom CSS once
function StyleInject() {
  // Load KaTeX once, globally. Idempotent — won't reload if it's already there.
  useEffect(() => {
    if (document.getElementById('katex-css')) return;
    const link = document.createElement('link');
    link.id = 'katex-css';
    link.rel = 'stylesheet';
    link.href = 'https://cdnjs.cloudflare.com/ajax/libs/KaTeX/0.16.9/katex.min.css';
    document.head.appendChild(link);

    const script = document.createElement('script');
    script.id = 'katex-js';
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/KaTeX/0.16.9/katex.min.js';
    script.async = true;
    document.head.appendChild(script);
  }, []);

  return (
    <style>{`
      @import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400;9..144,500;9..144,600;9..144,700&family=DM+Sans:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500;600&display=swap');
      .font-display { font-family: 'Fraunces', 'Times New Roman', serif; font-optical-sizing: auto; }
      .font-sans-x { font-family: 'DM Sans', system-ui, sans-serif; }
      .font-mono-x { font-family: 'JetBrains Mono', ui-monospace, monospace; }
      .pcm-root { font-family: 'DM Sans', system-ui, sans-serif; color: ${THEME.ink}; }
      .grid-bg {
        background-image:
          linear-gradient(rgba(20,24,32,0.04) 1px, transparent 1px),
          linear-gradient(90deg, rgba(20,24,32,0.04) 1px, transparent 1px);
        background-size: 32px 32px;
      }
      .noise { position: relative; }
      .noise::after {
        content: ''; position: absolute; inset: 0; pointer-events: none; opacity: .35;
        background-image: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='140' height='140'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2'/><feColorMatrix values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.06 0'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>");
        mix-blend-mode: multiply;
      }
      .hover-rise { transition: transform .2s ease, box-shadow .2s ease; }
      .hover-rise:hover { transform: translateY(-2px); box-shadow: 0 10px 30px -12px rgba(20,24,32,0.18); }
      .btn-primary {
        background: ${THEME.ink}; color: ${THEME.paper};
        transition: background .15s ease, transform .1s ease;
      }
      .btn-primary:hover { background: ${THEME.accent}; }
      .btn-primary:active { transform: translateY(1px); }
      .pill {
        font-family: 'JetBrains Mono', ui-monospace, monospace;
        font-size: 10px; letter-spacing: 0.08em; text-transform: uppercase;
      }
      .formula-box {
        background: ${THEME.paperDeep}; border-left: 3px solid ${THEME.accent};
        padding: 14px 18px; border-radius: 4px;
        display: flex; flex-direction: column; gap: 4px;
      }
      .formula-box .katex { font-size: 1.05em; }
      .formula-box .katex-display { margin: 0; padding: 0; }
      .katex-fallback {
        font-family: 'JetBrains Mono', ui-monospace, monospace;
        font-size: 14px; color: ${THEME.ink};
      }
      .video-frame {
        position: relative; width: 100%; padding-bottom: 56.25%;
        border-radius: 8px; overflow: hidden; background: ${THEME.ink};
        box-shadow: 0 4px 20px -8px rgba(20,24,32,0.25);
      }
      .video-frame iframe {
        position: absolute; top: 0; left: 0; width: 100%; height: 100%; border: 0;
      }
      @keyframes fadein { from { opacity: 0; transform: translateY(6px); } to { opacity: 1; transform: translateY(0); } }
      .fade-in { animation: fadein .4s ease both; }
      @keyframes stagger-1 { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
      .stagger > * { animation: stagger-1 .5s ease both; }
      .stagger > *:nth-child(1) { animation-delay: .05s; }
      .stagger > *:nth-child(2) { animation-delay: .12s; }
      .stagger > *:nth-child(3) { animation-delay: .19s; }
      .stagger > *:nth-child(4) { animation-delay: .26s; }
      .stagger > *:nth-child(5) { animation-delay: .33s; }
      .stagger > *:nth-child(6) { animation-delay: .40s; }
      .stagger > *:nth-child(7) { animation-delay: .47s; }
      .stagger > *:nth-child(8) { animation-delay: .54s; }
      .divider-dot::before { content: '·'; margin: 0 8px; color: ${THEME.muted}; }
      .ring-accent { box-shadow: 0 0 0 2px ${THEME.accent}; }
      .scroll-y { overflow-y: auto; scrollbar-width: thin; scrollbar-color: ${THEME.line} transparent; }
    `}</style>
  );
}

// ─── KaTeX components ─────────────────────────────────────────────
// <Tex>F = ma</Tex> renders inline math; <TexBlock>...</TexBlock> renders display math.
// Both gracefully fall back to monospace text if KaTeX hasn't loaded yet
// (the user briefly sees the raw expression, then it upgrades when KaTeX arrives).
function Tex({ children, display = false }) {
  const ref = useRef(null);
  const expr = typeof children === 'string' ? children : '';

  useEffect(() => {
    if (!ref.current) return;
    let cancelled = false;
    const tryRender = () => {
      if (cancelled) return;
      if (window.katex && ref.current) {
        try {
          window.katex.render(expr, ref.current, {
            displayMode: display,
            throwOnError: false,
            errorColor: THEME.error,
            output: 'html',
            strict: false,
          });
        } catch (e) {
          if (ref.current) ref.current.textContent = expr;
        }
      } else {
        // Retry shortly — KaTeX may still be loading from CDN
        setTimeout(tryRender, 80);
      }
    };
    tryRender();
    return () => { cancelled = true; };
  }, [expr, display]);

  // Initial fallback: show raw expression in mono font until KaTeX renders
  return (
    <span
      ref={ref}
      className={display ? 'block' : 'katex-fallback'}
      style={display ? { textAlign: 'center', margin: '6px 0' } : {}}
    >
      {expr}
    </span>
  );
}

function TexBlock({ children }) {
  return <Tex display>{children}</Tex>;
}

// YouTube embed component — lazy-loaded with a click-to-play poster so the
// page isn't loading 12 iframes at once.
function VideoEmbed({ videoId, title, startSeconds = 0 }) {
  const [loaded, setLoaded] = useState(false);
  if (!videoId) return null;

  const thumb = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
  const src = `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0${startSeconds ? `&start=${startSeconds}` : ''}`;

  return (
    <div className="video-frame">
      {loaded ? (
        <iframe
          src={src}
          title={title || 'Video lesson'}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      ) : (
        <button
          onClick={() => setLoaded(true)}
          className="absolute inset-0 group cursor-pointer"
          style={{
            backgroundImage: `linear-gradient(rgba(20,24,32,0.35), rgba(20,24,32,0.55)), url(${thumb})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
          aria-label={`Play: ${title || 'Video lesson'}`}
        >
          <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
            <div
              className="w-16 h-16 md:w-20 md:h-20 rounded-full flex items-center justify-center transition group-hover:scale-110"
              style={{ background: THEME.accent, boxShadow: '0 10px 40px -10px rgba(0,0,0,0.4)' }}
            >
              <Play size={28} fill="white" stroke="white" />
            </div>
            {title && (
              <div className="mt-4 px-4 py-1.5 rounded-full text-xs font-medium" style={{ background: 'rgba(20,24,32,0.7)', backdropFilter: 'blur(4px)' }}>
                {title}
              </div>
            )}
          </div>
        </button>
      )}
    </div>
  );
}

// Worked example — fully solved problem with LaTeX-rendered steps
function WorkedExample({ example, accentColor }) {
  const [showSolution, setShowSolution] = useState(false);
  if (!example) return null;
  const c = accentColor || THEME.accent;

  return (
    <Card className="p-6" style={{ background: 'white', borderColor: c, borderWidth: 2 }}>
      <div className="flex items-center gap-2 mb-3">
        <PenTool size={16} style={{ color: c }} />
        <span className="pill" style={{ color: c }}>Worked example</span>
      </div>
      <h3 className="font-display text-xl mb-3" style={{ letterSpacing: '-0.01em' }}>
        {example.title || 'Try this problem'}
      </h3>
      <p className="text-base leading-relaxed mb-4" style={{ color: THEME.ink }}>
        {example.problem}
      </p>

      <div className="grid sm:grid-cols-2 gap-3 mb-5">
        <div className="p-3 rounded-lg" style={{ background: THEME.paperDeep }}>
          <div className="pill mb-2" style={{ color: THEME.muted }}>Given</div>
          <ul className="text-sm space-y-1" style={{ color: THEME.inkSoft }}>
            {example.given.map((g, i) => <li key={i}>• {g}</li>)}
          </ul>
        </div>
        <div className="p-3 rounded-lg" style={{ background: THEME.paperDeep }}>
          <div className="pill mb-2" style={{ color: THEME.muted }}>Find</div>
          <div className="text-sm" style={{ color: THEME.inkSoft }}>{example.find}</div>
        </div>
      </div>

      {!showSolution ? (
        <Button onClick={() => setShowSolution(true)} size="sm" variant="outline">
          Reveal solution <ChevronRight size={14} />
        </Button>
      ) : (
        <div className="fade-in space-y-4">
          <div className="flex items-center gap-2">
            <span className="pill" style={{ color: c }}>Solution</span>
            <span className="text-xs" style={{ color: THEME.muted }}>{example.steps.length} steps</span>
          </div>
          {example.steps.map((step, i) => (
            <div key={i} className="border-l-2 pl-4 py-1" style={{ borderColor: THEME.line }}>
              <div className="flex items-start gap-2 mb-2">
                <span className="pill mt-0.5 shrink-0" style={{ color: c }}>{i + 1}</span>
                <p className="text-sm leading-relaxed" style={{ color: THEME.inkSoft }}>{step.description}</p>
              </div>
              {step.latex && (
                <div className="ml-7 my-2 px-3 py-2 rounded" style={{ background: THEME.paperDeep }}>
                  <TexBlock>{step.latex}</TexBlock>
                </div>
              )}
            </div>
          ))}
          <div
            className="mt-4 p-4 rounded-lg flex items-start gap-3"
            style={{ background: c + '15', borderLeft: `4px solid ${c}` }}
          >
            <CheckCircle2 size={18} style={{ color: c }} className="mt-0.5 shrink-0" />
            <div className="flex-1">
              <div className="pill mb-1" style={{ color: c }}>Answer</div>
              <TexBlock>{example.answer}</TexBlock>
            </div>
          </div>
          {example.insight && (
            <div className="mt-2 p-3 rounded-lg flex items-start gap-2" style={{ background: THEME.paperDeep }}>
              <Lightbulb size={14} style={{ color: THEME.gold }} className="mt-0.5 shrink-0" />
              <div className="text-xs" style={{ color: THEME.inkSoft }}>
                <strong style={{ color: THEME.ink }}>Why this matters: </strong>{example.insight}
              </div>
            </div>
          )}
        </div>
      )}
    </Card>
  );
}

function Card({ children, className = '', style = {}, ...rest }) {
  return (
    <div
      className={`bg-white border rounded-lg ${className}`}
      style={{ borderColor: THEME.line, ...style }}
      {...rest}
    >
      {children}
    </div>
  );
}

function Button({ children, onClick, variant = 'primary', size = 'md', className = '', disabled = false, type = 'button', ...rest }) {
  const base = 'inline-flex items-center justify-center gap-2 font-medium rounded transition cursor-pointer';
  const sizes = { sm: 'px-3 py-1.5 text-sm', md: 'px-5 py-2.5 text-sm', lg: 'px-6 py-3 text-base' };
  const variants = {
    primary: 'btn-primary',
    outline: 'border bg-transparent hover:bg-[color:var(--line)]',
    ghost: 'hover:bg-[color:var(--paperDeep)]',
    soft: '',
  };
  const style = variant === 'outline'
    ? { color: THEME.ink, borderColor: THEME.ink }
    : variant === 'soft'
    ? { background: THEME.accentSoft, color: THEME.accent }
    : {};
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${base} ${sizes[size]} ${variants[variant]} ${disabled ? 'opacity-40 cursor-not-allowed' : ''} ${className}`}
      style={style}
      {...rest}
    >
      {children}
    </button>
  );
}

function Pill({ children, color, bg }) {
  return (
    <span
      className="pill inline-flex items-center px-2 py-1 rounded"
      style={{ color, background: bg }}
    >
      {children}
    </span>
  );
}

function ProgressBar({ value, color = THEME.ink, bg = THEME.line, height = 6 }) {
  return (
    <div className="w-full rounded-full overflow-hidden" style={{ background: bg, height }}>
      <div
        className="h-full rounded-full transition-all duration-500"
        style={{ width: `${Math.min(100, Math.max(0, value))}%`, background: color }}
      />
    </div>
  );
}

function EmptyHeader({ eyebrow, title, subtitle, children }) {
  return (
    <div className="mb-10">
      {eyebrow && (
        <div className="pill mb-3" style={{ color: THEME.muted }}>
          {eyebrow}
        </div>
      )}
      <h1 className="font-display text-4xl md:text-5xl mb-2" style={{ color: THEME.ink, letterSpacing: '-0.02em', lineHeight: 1.05 }}>
        {title}
      </h1>
      {subtitle && <p className="text-base md:text-lg max-w-2xl" style={{ color: THEME.inkSoft }}>{subtitle}</p>}
      {children}
    </div>
  );
}


// ═══════════════════════════════════════════════════════════════════
// ONBOARDING
// ═══════════════════════════════════════════════════════════════════

function Onboarding({ onComplete }) {
  const [step, setStep] = useState(0);
  const [name, setName] = useState('');
  const [targetDate, setTargetDate] = useState('');
  const [level, setLevel] = useState('');
  const [focus, setFocus] = useState('both');

  // Compute default target: first Monday of next May
  useEffect(() => {
    const now = new Date();
    const year = now.getMonth() >= 4 ? now.getFullYear() + 1 : now.getFullYear();
    setTargetDate(`${year}-05-13`);
  }, []);

  const steps = [
    {
      eyebrow: 'Welcome',
      title: 'Let\'s set up your prep.',
      sub: 'PhysicsC Mastery adapts to you. A few quick questions and we\'ll build your study plan.',
      body: (
        <div>
          <label className="block pill mb-2" style={{ color: THEME.muted }}>What should we call you?</label>
          <input
            value={name}
            onChange={e => setName(e.target.value)}
            placeholder="Your first name"
            autoFocus
            className="w-full px-4 py-3 rounded border font-display text-xl"
            style={{ borderColor: THEME.line, background: 'white' }}
          />
        </div>
      ),
      canAdvance: () => name.trim().length > 0,
    },
    {
      eyebrow: 'Step 2 of 4',
      title: 'When is your exam?',
      sub: 'We\'ll pace your study plan against this date.',
      body: (
        <div>
          <label className="block pill mb-2" style={{ color: THEME.muted }}>Exam date</label>
          <input
            type="date"
            value={targetDate}
            onChange={e => setTargetDate(e.target.value)}
            className="px-4 py-3 rounded border font-mono-x text-base"
            style={{ borderColor: THEME.line, background: 'white' }}
          />
          <p className="text-sm mt-3" style={{ color: THEME.muted }}>
            Typical AP Physics C exams are held in early–mid May.
          </p>
        </div>
      ),
      canAdvance: () => !!targetDate,
    },
    {
      eyebrow: 'Step 3 of 4',
      title: 'Where are you starting from?',
      sub: 'No judgment — we just need a baseline to calibrate difficulty.',
      body: (
        <div className="space-y-2">
          {[
            { id: 'new', t: 'Brand new', d: 'I\'m just starting physics' },
            { id: 'some', t: 'Some background', d: 'I\'ve taken an intro physics course' },
            { id: 'strong', t: 'Strong background', d: 'I\'ve done calculus-based physics before' },
          ].map(o => (
            <button
              key={o.id}
              onClick={() => setLevel(o.id)}
              className="w-full text-left p-4 rounded border transition hover:bg-[color:var(--pd)]"
              style={{
                borderColor: level === o.id ? THEME.ink : THEME.line,
                background: level === o.id ? THEME.paperDeep : 'white',
                borderWidth: level === o.id ? 2 : 1,
              }}
            >
              <div className="font-display text-lg">{o.t}</div>
              <div className="text-sm" style={{ color: THEME.muted }}>{o.d}</div>
            </button>
          ))}
        </div>
      ),
      canAdvance: () => !!level,
    },
    {
      eyebrow: 'Step 4 of 4',
      title: 'Which part are you taking?',
      sub: 'AP Physics C is two exams. You can take one or both.',
      body: (
        <div className="space-y-2">
          {[
            { id: 'mechanics', t: 'Mechanics only', d: 'Motion, forces, energy, rotation' },
            { id: 'em', t: 'Electricity & Magnetism only', d: 'Fields, circuits, induction' },
            { id: 'both', t: 'Both exams', d: 'The full AP Physics C curriculum' },
          ].map(o => (
            <button
              key={o.id}
              onClick={() => setFocus(o.id)}
              className="w-full text-left p-4 rounded border transition"
              style={{
                borderColor: focus === o.id ? THEME.ink : THEME.line,
                background: focus === o.id ? THEME.paperDeep : 'white',
                borderWidth: focus === o.id ? 2 : 1,
              }}
            >
              <div className="font-display text-lg">{o.t}</div>
              <div className="text-sm" style={{ color: THEME.muted }}>{o.d}</div>
            </button>
          ))}
        </div>
      ),
      canAdvance: () => !!focus,
    },
  ];

  const s = steps[step];

  return (
    <div className="min-h-screen flex items-center justify-center px-6 py-12 grid-bg" style={{ background: THEME.paper }}>
      <div className="w-full max-w-xl fade-in">
        <div className="mb-8 flex items-center gap-3">
          <div
            className="w-10 h-10 rounded flex items-center justify-center"
            style={{ background: THEME.ink, color: THEME.paper }}
          >
            <Atom size={20} strokeWidth={2.2} />
          </div>
          <div className="font-display text-xl" style={{ letterSpacing: '-0.01em' }}>
            PhysicsC<span style={{ color: THEME.accent }}> Mastery</span>
          </div>
        </div>

        <Card className="p-8 md:p-10" style={{ background: 'white' }}>
          <div className="pill mb-4" style={{ color: THEME.accent }}>{s.eyebrow}</div>
          <h1 className="font-display text-3xl md:text-4xl mb-2" style={{ letterSpacing: '-0.02em', lineHeight: 1.1 }}>
            {s.title}
          </h1>
          <p className="mb-8" style={{ color: THEME.inkSoft }}>{s.sub}</p>

          <div className="mb-8">{s.body}</div>

          <div className="flex items-center justify-between">
            <div className="flex gap-1.5">
              {steps.map((_, i) => (
                <div
                  key={i}
                  className="h-1 rounded-full transition-all"
                  style={{
                    width: i === step ? 28 : 8,
                    background: i <= step ? THEME.ink : THEME.line,
                  }}
                />
              ))}
            </div>
            <div className="flex gap-2">
              {step > 0 && (
                <Button variant="ghost" onClick={() => setStep(step - 1)}>
                  <ChevronLeft size={16} /> Back
                </Button>
              )}
              {step < steps.length - 1 ? (
                <Button
                  disabled={!s.canAdvance()}
                  onClick={() => setStep(step + 1)}
                >
                  Continue <ChevronRight size={16} />
                </Button>
              ) : (
                <Button
                  disabled={!s.canAdvance()}
                  onClick={() => onComplete({ name: name.trim(), targetDate, level, focus, createdAt: new Date().toISOString() })}
                >
                  Build my plan <ArrowRight size={16} />
                </Button>
              )}
            </div>
          </div>
        </Card>

        <p className="text-center text-xs mt-6" style={{ color: THEME.muted }}>
          Your progress is saved locally to this browser.
        </p>
      </div>
    </div>
  );
}


// ═══════════════════════════════════════════════════════════════════
// SIDEBAR / NAVIGATION
// ═══════════════════════════════════════════════════════════════════

function Sidebar({ view, setView, profile, overallPct, streak, onReset }) {
  const nav = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'studyplan', label: 'Study Plan', icon: Calendar },
    { id: 'courses', label: 'Courses', icon: BookOpen },
    { id: 'practice', label: 'Daily Practice', icon: Zap },
    { id: 'exam', label: 'Mock Exams', icon: FileText },
    { id: 'labs', label: 'Labs', icon: Compass },
    { id: 'progress', label: 'Progress', icon: BarChart3 },
    { id: 'achievements', label: 'Achievements', icon: Trophy },
  ];

  const daysUntil = profile.targetDate ? daysBetween(todayISO(), profile.targetDate) : null;

  return (
    <aside
      className="hidden md:flex flex-col w-64 border-r shrink-0 sticky top-0 h-screen"
      style={{ background: THEME.paper, borderColor: THEME.line }}
    >
      <div className="px-5 pt-6 pb-4">
        <div className="flex items-center gap-2.5 mb-1">
          <div
            className="w-8 h-8 rounded flex items-center justify-center shrink-0"
            style={{ background: THEME.ink, color: THEME.paper }}
          >
            <Atom size={16} strokeWidth={2.2} />
          </div>
          <div className="font-display text-lg" style={{ letterSpacing: '-0.01em' }}>
            PhysicsC <span style={{ color: THEME.accent }}>Mastery</span>
          </div>
        </div>
      </div>

      <div
        className="mx-4 mb-3 p-3 rounded-lg border"
        style={{ background: 'white', borderColor: THEME.line }}
      >
        <div className="flex items-center justify-between mb-2">
          <span className="pill" style={{ color: THEME.muted }}>Overall mastery</span>
          <span className="font-mono-x text-xs font-semibold">{overallPct}%</span>
        </div>
        <ProgressBar value={overallPct} color={THEME.accent} />
        <div className="flex items-center justify-between mt-3 pt-3 border-t" style={{ borderColor: THEME.line }}>
          <div className="flex items-center gap-1.5">
            <Flame size={14} style={{ color: streak > 0 ? THEME.mech : THEME.muted }} fill={streak > 0 ? THEME.mech : 'none'} />
            <span className="text-xs font-mono-x">{streak} day{streak === 1 ? '' : 's'}</span>
          </div>
          {daysUntil !== null && daysUntil >= 0 && (
            <span className="text-xs font-mono-x" style={{ color: THEME.muted }}>
              {daysUntil}d to exam
            </span>
          )}
        </div>
      </div>

      <nav className="flex-1 px-2 scroll-y">
        {nav.map(item => {
          const Icon = item.icon;
          const active = view.type === item.id
            || (item.id === 'courses' && ['module', 'lesson', 'quiz'].includes(view.type))
            || (item.id === 'exam' && view.type === 'custom-test');
          return (
            <button
              key={item.id}
              onClick={() => setView({ type: item.id })}
              className="w-full flex items-center gap-3 px-3 py-2.5 rounded-md mb-0.5 text-left transition"
              style={{
                background: active ? THEME.ink : 'transparent',
                color: active ? THEME.paper : THEME.ink,
              }}
              onMouseEnter={e => { if (!active) e.currentTarget.style.background = THEME.paperDeep; }}
              onMouseLeave={e => { if (!active) e.currentTarget.style.background = 'transparent'; }}
            >
              <Icon size={17} strokeWidth={active ? 2.2 : 1.8} />
              <span className="text-sm font-medium">{item.label}</span>
            </button>
          );
        })}
      </nav>

      <div className="p-4 border-t" style={{ borderColor: THEME.line }}>
        <div className="flex items-center gap-2.5 mb-2">
          <div
            className="w-8 h-8 rounded-full flex items-center justify-center font-display font-semibold text-sm shrink-0"
            style={{ background: THEME.accentSoft, color: THEME.accent }}
          >
            {(profile.name?.[0] || '?').toUpperCase()}
          </div>
          <div className="min-w-0 flex-1">
            <div className="text-sm font-medium truncate">{profile.name || 'Student'}</div>
            <div className="text-xs truncate" style={{ color: THEME.muted }}>
              Target {formatDate(profile.targetDate)}
            </div>
          </div>
        </div>
        <button
          onClick={onReset}
          className="w-full text-xs px-2 py-1.5 rounded transition"
          style={{ color: THEME.muted }}
          onMouseEnter={e => e.currentTarget.style.color = THEME.ink}
          onMouseLeave={e => e.currentTarget.style.color = THEME.muted}
        >
          Reset progress
        </button>
      </div>
    </aside>
  );
}

function MobileNav({ view, setView }) {
  const nav = [
    { id: 'dashboard', label: 'Home', icon: Home },
    { id: 'courses', label: 'Courses', icon: BookOpen },
    { id: 'practice', label: 'Practice', icon: Zap },
    { id: 'exam', label: 'Exams', icon: FileText },
    { id: 'progress', label: 'Progress', icon: BarChart3 },
  ];
  return (
    <nav
      className="md:hidden fixed bottom-0 left-0 right-0 border-t flex justify-around py-1.5 z-40"
      style={{ background: THEME.paper, borderColor: THEME.line }}
    >
      {nav.map(item => {
        const Icon = item.icon;
        const active = view.type === item.id;
        return (
          <button
            key={item.id}
            onClick={() => setView({ type: item.id })}
            className="flex flex-col items-center gap-0.5 px-2 py-1.5 rounded transition min-w-[60px]"
            style={{ color: active ? THEME.ink : THEME.muted }}
          >
            <Icon size={19} strokeWidth={active ? 2.2 : 1.6} />
            <span className="text-[10px] font-medium">{item.label}</span>
          </button>
        );
      })}
    </nav>
  );
}


// ═══════════════════════════════════════════════════════════════════
// DASHBOARD
// ═══════════════════════════════════════════════════════════════════

function Dashboard({ profile, progress, streak, setView, exams, achievements }) {
  const overall = computeOverallProgress(progress);
  const mechPct = subjectMastery(progress, 'mechanics');
  const emPct = subjectMastery(progress, 'em');
  const daysUntil = profile.targetDate ? daysBetween(todayISO(), profile.targetDate) : null;

  // Recommend the first module with lowest mastery that isn't complete
  const recommended = [...allModules]
    .map(m => ({ m, mastery: computeMastery(progress, m.id) }))
    .filter(x => x.mastery < 100)
    .sort((a, b) => a.mastery - b.mastery)[0];

  const hour = new Date().getHours();
  const greeting = hour < 12 ? 'Good morning' : hour < 17 ? 'Good afternoon' : 'Good evening';

  // Radar: mastery across 6 big categories
  const radarData = [
    { topic: 'Kinematics', score: computeMastery(progress, 'kinematics') },
    { topic: 'Dynamics', score: computeMastery(progress, 'newtons-laws') },
    { topic: 'Energy', score: computeMastery(progress, 'work-energy') },
    { topic: 'Momentum', score: computeMastery(progress, 'momentum') },
    { topic: 'Rotation', score: computeMastery(progress, 'rotation') },
    { topic: 'Gravity', score: computeMastery(progress, 'gravitation') },
    { topic: 'Electrostatic', score: computeMastery(progress, 'electrostatics') },
    { topic: 'Circuits', score: computeMastery(progress, 'circuits') },
    { topic: 'Magnetism', score: computeMastery(progress, 'magnetism') },
    { topic: 'Induction', score: computeMastery(progress, 'induction') },
  ];

  // Recent exams (up to 4)
  const recentExams = [...exams].sort((a, b) => b.date.localeCompare(a.date)).slice(0, 4);

  return (
    <div className="max-w-6xl mx-auto px-5 md:px-10 py-10 md:py-14 pb-24 md:pb-14 stagger">
      {/* Hero */}
      <div className="mb-10 flex items-start justify-between flex-wrap gap-6">
        <div>
          <div className="pill mb-3" style={{ color: THEME.muted }}>
            {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
          </div>
          <h1 className="font-display text-4xl md:text-5xl mb-2" style={{ letterSpacing: '-0.02em', lineHeight: 1.05 }}>
            {greeting}, <em style={{ color: THEME.accent }}>{profile.name}</em>.
          </h1>
          <p className="text-lg" style={{ color: THEME.inkSoft }}>
            {daysUntil !== null && daysUntil > 0
              ? <>You have <span className="font-mono-x font-semibold">{daysUntil} days</span> until your exam. Let's keep moving.</>
              : daysUntil === 0
              ? <>Exam day. You've prepared — trust the work.</>
              : <>Every problem you do today compounds.</>
            }
          </p>
        </div>
        {streak > 0 && (
          <div
            className="px-4 py-3 rounded-lg border flex items-center gap-3"
            style={{ borderColor: THEME.mech, background: THEME.mechSoft }}
          >
            <Flame size={24} style={{ color: THEME.mech }} fill={THEME.mech} />
            <div>
              <div className="font-mono-x text-xl font-semibold" style={{ color: THEME.mech }}>{streak}</div>
              <div className="text-xs" style={{ color: THEME.mech }}>day streak</div>
            </div>
          </div>
        )}
      </div>

      {/* Main grid */}
      <div className="grid md:grid-cols-3 gap-5 mb-6">
        {/* Continue learning */}
        <Card className="md:col-span-2 p-6 md:p-7 hover-rise relative overflow-hidden" style={{ background: 'white' }}>
          <div className="pill mb-2" style={{ color: THEME.accent }}>▸ Pick up where you left off</div>
          {recommended ? (
            <>
              <h2 className="font-display text-2xl md:text-3xl mb-1" style={{ letterSpacing: '-0.015em' }}>
                {recommended.m.title}
              </h2>
              <p className="mb-5 max-w-lg" style={{ color: THEME.inkSoft }}>{recommended.m.description}</p>
              <div className="flex items-center gap-4 mb-5">
                <Pill color={recommended.m.subjectId === 'mechanics' ? THEME.mech : THEME.em} bg={recommended.m.subjectId === 'mechanics' ? THEME.mechSoft : THEME.emSoft}>
                  {curriculum[recommended.m.subjectId].title}
                </Pill>
                <span className="text-sm flex items-center gap-1.5" style={{ color: THEME.muted }}>
                  <Clock size={13} /> ~{recommended.m.estimatedMinutes} min
                </span>
                <span className="text-sm font-mono-x" style={{ color: THEME.muted }}>
                  {recommended.mastery}% mastery
                </span>
              </div>
              <Button onClick={() => setView({ type: 'module', moduleId: recommended.m.id })}>
                {recommended.mastery === 0 ? 'Start' : 'Continue'} <ArrowRight size={16} />
              </Button>
            </>
          ) : (
            <>
              <h2 className="font-display text-2xl md:text-3xl mb-1">All modules mastered.</h2>
              <p style={{ color: THEME.inkSoft }}>Take a mock exam to prove it.</p>
              <Button className="mt-5" onClick={() => setView({ type: 'exam' })}>
                Go to mock exams <ArrowRight size={16} />
              </Button>
            </>
          )}
          <Sparkles size={120} className="absolute -right-6 -bottom-6 opacity-[0.05]" />
        </Card>

        {/* Daily practice card */}
        <Card className="p-6 hover-rise flex flex-col" style={{ background: THEME.ink, color: THEME.paper, borderColor: THEME.ink }}>
          <div className="pill mb-3" style={{ color: THEME.goldSoft }}>Today's challenge</div>
          <div className="flex-1">
            <h3 className="font-display text-xl mb-3 leading-snug" style={{ letterSpacing: '-0.01em' }}>
              One problem. Five minutes. Keep your streak alive.
            </h3>
            <div className="flex items-center gap-2 mb-5 text-sm" style={{ color: THEME.goldSoft }}>
              <Zap size={14} /> <span className="font-mono-x">Randomized · timed · graded</span>
            </div>
          </div>
          <Button
            onClick={() => setView({ type: 'practice' })}
            className="w-full"
            style={{ background: THEME.gold, color: THEME.ink }}
          >
            Solve today's problem <ArrowRight size={16} />
          </Button>
        </Card>
      </div>

      {/* Subject progress */}
      <div className="grid md:grid-cols-2 gap-5 mb-6">
        <SubjectCard
          subject={curriculum.mechanics}
          mastery={mechPct}
          progress={progress}
          setView={setView}
        />
        <SubjectCard
          subject={curriculum.em}
          mastery={emPct}
          progress={progress}
          setView={setView}
        />
      </div>

      {/* Skill radar + recent exams */}
      <div className="grid md:grid-cols-3 gap-5 mb-6">
        <Card className="md:col-span-2 p-6" style={{ background: 'white' }}>
          <div className="flex items-start justify-between mb-3">
            <div>
              <div className="pill" style={{ color: THEME.muted }}>Skill map</div>
              <h3 className="font-display text-xl mt-1">Your mastery by topic</h3>
            </div>
          </div>
          <div style={{ height: 280 }}>
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart data={radarData}>
                <PolarGrid stroke={THEME.line} />
                <PolarAngleAxis
                  dataKey="topic"
                  tick={{ fontSize: 10, fill: THEME.inkSoft }}
                />
                <PolarRadiusAxis domain={[0, 100]} tick={false} axisLine={false} />
                <Radar
                  dataKey="score"
                  stroke={THEME.accent}
                  fill={THEME.accent}
                  fillOpacity={0.18}
                  strokeWidth={2}
                />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card className="p-6" style={{ background: 'white' }}>
          <div className="pill" style={{ color: THEME.muted }}>Recent exams</div>
          <h3 className="font-display text-xl mt-1 mb-4">Mock exam history</h3>
          {recentExams.length === 0 ? (
            <div className="py-8 text-center">
              <FileText size={28} style={{ color: THEME.muted }} className="mx-auto mb-2" />
              <p className="text-sm mb-3" style={{ color: THEME.muted }}>No mock exams yet.</p>
              <Button size="sm" variant="outline" onClick={() => setView({ type: 'exam' })}>
                Take your first
              </Button>
            </div>
          ) : (
            <div className="space-y-3">
              {recentExams.map((ex, i) => (
                <div key={i} className="flex items-center justify-between pb-3 border-b last:border-b-0" style={{ borderColor: THEME.line }}>
                  <div>
                    <div className="text-sm font-medium">{ex.name}</div>
                    <div className="text-xs" style={{ color: THEME.muted }}>{formatDate(ex.date)}</div>
                  </div>
                  <div className="text-right">
                    <div className="font-mono-x font-semibold text-base">{Math.round(ex.score * 100)}%</div>
                    <div className="text-[10px]" style={{ color: THEME.muted }}>{ex.correct}/{ex.total}</div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </Card>
      </div>

      {/* Achievements preview */}
      <Card className="p-6" style={{ background: 'white' }}>
        <div className="flex items-center justify-between mb-4">
          <div>
            <div className="pill" style={{ color: THEME.muted }}>Milestones</div>
            <h3 className="font-display text-xl mt-1">Achievements</h3>
          </div>
          <button
            onClick={() => setView({ type: 'achievements' })}
            className="text-sm flex items-center gap-1"
            style={{ color: THEME.accent }}
          >
            View all <ChevronRight size={14} />
          </button>
        </div>
        <div className="grid grid-cols-4 md:grid-cols-8 gap-3">
          {ACHIEVEMENTS.map(a => {
            const earned = achievements.includes(a.id);
            const Icon = a.icon;
            return (
              <div
                key={a.id}
                className="aspect-square rounded-lg flex flex-col items-center justify-center p-2 text-center transition"
                style={{
                  background: earned ? THEME.goldSoft : THEME.paperDeep,
                  opacity: earned ? 1 : 0.45,
                }}
              >
                <Icon size={22} style={{ color: earned ? THEME.gold : THEME.muted }} strokeWidth={1.6} />
                <div className="text-[9px] mt-1 leading-tight" style={{ color: earned ? THEME.ink : THEME.muted }}>
                  {a.title}
                </div>
              </div>
            );
          })}
        </div>
      </Card>
    </div>
  );
}

function SubjectCard({ subject, mastery, progress, setView }) {
  const Icon = subject.icon;
  const completed = subject.modules.filter(m => computeMastery(progress, m.id) === 100).length;
  return (
    <Card
      className="p-6 hover-rise cursor-pointer relative overflow-hidden"
      style={{ background: 'white' }}
      onClick={() => setView({ type: 'courses', subject: subject.id })}
    >
      <div className="flex items-start gap-4 mb-4">
        <div
          className="w-11 h-11 rounded flex items-center justify-center shrink-0"
          style={{ background: subject.accentSoft, color: subject.accent }}
        >
          <Icon size={22} strokeWidth={2} />
        </div>
        <div className="flex-1 min-w-0">
          <div className="pill mb-1" style={{ color: subject.accent }}>
            {subject.id === 'mechanics' ? 'Mechanics' : 'E & M'}
          </div>
          <h3 className="font-display text-xl leading-tight" style={{ letterSpacing: '-0.01em' }}>
            {subject.title}
          </h3>
          <p className="text-sm mt-1" style={{ color: THEME.inkSoft }}>{subject.subtitle}</p>
        </div>
      </div>
      <div className="flex items-center justify-between mb-2 mt-5">
        <span className="text-sm font-mono-x" style={{ color: THEME.muted }}>
          {completed}/{subject.modules.length} modules mastered
        </span>
        <span className="text-sm font-mono-x font-semibold">{mastery}%</span>
      </div>
      <ProgressBar value={mastery} color={subject.accent} bg={subject.accentSoft} />
    </Card>
  );
}


// ═══════════════════════════════════════════════════════════════════
// COURSES — subject + module browsing
// ═══════════════════════════════════════════════════════════════════

function CoursesView({ progress, setView, initialSubject }) {
  const [tab, setTab] = useState(initialSubject || 'mechanics');
  const subject = curriculum[tab];

  return (
    <div className="max-w-6xl mx-auto px-5 md:px-10 py-10 md:py-14 pb-24 md:pb-14">
      <EmptyHeader
        eyebrow="Curriculum"
        title="Full AP Physics C course"
        subtitle="Both exams, aligned to the College Board CED. Work through modules in order or jump to what you need to review."
      />

      {/* Subject tabs */}
      <div className="flex gap-2 mb-8 flex-wrap">
        {Object.values(curriculum).map(s => {
          const active = s.id === tab;
          const Icon = s.icon;
          return (
            <button
              key={s.id}
              onClick={() => setTab(s.id)}
              className="flex items-center gap-2 px-4 py-2.5 rounded-full border transition"
              style={{
                background: active ? s.accent : 'white',
                borderColor: active ? s.accent : THEME.line,
                color: active ? 'white' : THEME.ink,
              }}
            >
              <Icon size={16} strokeWidth={1.8} />
              <span className="font-medium">{s.title}</span>
              <span className="pill ml-1" style={{ color: active ? 'white' : THEME.muted }}>
                {subjectMastery(progress, s.id)}%
              </span>
            </button>
          );
        })}
      </div>

      {/* Subject header */}
      <div className="mb-8 max-w-2xl">
        <p className="font-display text-xl italic" style={{ color: THEME.inkSoft, letterSpacing: '-0.01em' }}>
          "{subject.description}"
        </p>
      </div>

      {/* Module list */}
      <div className="space-y-3 stagger">
        {subject.modules.map((m, idx) => {
          const mastery = computeMastery(progress, m.id);
          const done = mastery === 100;
          const prereq = getPrerequisite(m.id);
          const prereqMet = isPrereqMet(progress, m.id);
          const isLocked = !prereqMet && mastery === 0;
          return (
            <div
              key={m.id}
              className="group border rounded-lg p-5 md:p-6 hover-rise cursor-pointer"
              style={{
                background: 'white',
                borderColor: THEME.line,
                opacity: isLocked ? 0.78 : 1,
              }}
              onClick={() => setView({ type: 'module', moduleId: m.id })}
            >
              <div className="flex items-start gap-4 md:gap-6">
                <div
                  className="w-10 h-10 md:w-12 md:h-12 rounded shrink-0 flex items-center justify-center font-display text-lg"
                  style={{
                    background: done ? subject.accent : isLocked ? THEME.line : subject.accentSoft,
                    color: done ? 'white' : isLocked ? THEME.muted : subject.accent,
                  }}
                >
                  {done ? <Check size={20} strokeWidth={2.5} /> : isLocked ? <Lock size={16} /> : <span>{idx + 1}</span>}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-4 mb-1">
                    <h3 className="font-display text-xl md:text-2xl" style={{ letterSpacing: '-0.01em' }}>
                      {m.title}
                    </h3>
                    <ChevronRight size={20} style={{ color: THEME.muted }} className="shrink-0 transition group-hover:translate-x-1" />
                  </div>
                  <p className="text-sm md:text-base mb-3" style={{ color: THEME.inkSoft }}>
                    {m.description}
                  </p>
                  {isLocked && prereq && (
                    <div
                      className="inline-flex items-center gap-1.5 mb-3 text-xs px-2.5 py-1 rounded-full"
                      style={{ background: THEME.paperDeep, color: THEME.gold, border: `1px solid ${THEME.goldSoft}` }}
                    >
                      <Lightbulb size={11} />
                      Recommended: build up <strong style={{ color: THEME.ink, fontWeight: 600 }}>{prereq.title}</strong> first
                    </div>
                  )}
                  <div className="flex items-center gap-4 flex-wrap text-xs mb-3" style={{ color: THEME.muted }}>
                    <span className="flex items-center gap-1 font-mono-x">
                      <Clock size={12} /> {m.estimatedMinutes} min
                    </span>
                    <span className="flex items-center gap-1 font-mono-x">
                      <BookMarked size={12} /> {m.lesson.sections.length} sections
                    </span>
                    <span className="flex items-center gap-1 font-mono-x">
                      <PenTool size={12} /> {m.quiz.length} questions
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="flex-1 max-w-xs">
                      <ProgressBar value={mastery} color={subject.accent} bg={subject.accentSoft} />
                    </div>
                    <span className="text-xs font-mono-x font-semibold" style={{ color: subject.accent }}>
                      {mastery}%
                    </span>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}


// ═══════════════════════════════════════════════════════════════════
// MODULE DETAIL + LESSON + QUIZ
// ═══════════════════════════════════════════════════════════════════

function ModuleView({ moduleId, progress, setView, onCompleteLesson }) {
  const module = allModules.find(m => m.id === moduleId);
  if (!module) return null;
  const subject = curriculum[module.subjectId];
  const mastery = computeMastery(progress, moduleId);
  const modProg = progress[moduleId] || {};
  const quizAttempts = modProg.quizAttempts || [];
  const bestScore = quizAttempts.length ? Math.max(...quizAttempts.map(a => a.score / a.total)) : 0;
  const Icon = subject.icon;
  const prereq = getPrerequisite(moduleId);
  const prereqMastery = prereq ? computeMastery(progress, prereq.id) : 100;
  const showPrereqNudge = prereq && prereqMastery < 40 && mastery === 0;

  return (
    <div className="max-w-4xl mx-auto px-5 md:px-10 py-10 md:py-14 pb-24 md:pb-14">
      <button
        onClick={() => setView({ type: 'courses', subject: module.subjectId })}
        className="flex items-center gap-1.5 mb-8 text-sm transition"
        style={{ color: THEME.muted }}
        onMouseEnter={e => e.currentTarget.style.color = THEME.ink}
        onMouseLeave={e => e.currentTarget.style.color = THEME.muted}
      >
        <ChevronLeft size={16} /> All {subject.title} modules
      </button>

      <div className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <Pill color={subject.accent} bg={subject.accentSoft}>{subject.title}</Pill>
          <span className="flex items-center gap-1 text-xs font-mono-x" style={{ color: THEME.muted }}>
            <Clock size={12} /> {module.estimatedMinutes} min
          </span>
        </div>
        <h1 className="font-display text-4xl md:text-5xl mb-3" style={{ letterSpacing: '-0.02em', lineHeight: 1.05 }}>
          {module.title}
        </h1>
        <p className="font-display text-xl italic mb-3" style={{ color: THEME.inkSoft, letterSpacing: '-0.01em' }}>
          {module.subtitle}
        </p>
        <p className="text-lg max-w-2xl" style={{ color: THEME.inkSoft }}>
          {module.description}
        </p>
      </div>

      {showPrereqNudge && (
        <Card className="p-4 md:p-5 mb-6 flex items-start gap-3" style={{ background: THEME.paperDeep, borderColor: THEME.goldSoft }}>
          <Lightbulb size={18} style={{ color: THEME.gold }} className="shrink-0 mt-0.5" />
          <div className="flex-1">
            <div className="text-sm font-semibold mb-0.5" style={{ color: THEME.ink }}>
              You haven't built up <em>{prereq.title}</em> yet
            </div>
            <div className="text-sm" style={{ color: THEME.inkSoft }}>
              This module assumes you're comfortable with the previous one. You can still proceed — but you may find it easier if you spend a session on {prereq.title} first.
            </div>
          </div>
          <Button size="sm" variant="outline" onClick={() => setView({ type: 'module', moduleId: prereq.id })}>
            Go there
          </Button>
        </Card>
      )}

      <Card className="p-5 md:p-6 mb-6" style={{ background: subject.accentSoft, borderColor: subject.accent }}>
        <div className="flex items-center justify-between">
          <div>
            <div className="pill mb-1" style={{ color: subject.accent }}>Current mastery</div>
            <div className="font-display text-3xl" style={{ color: subject.accent }}>
              {mastery}%
            </div>
          </div>
          <Icon size={40} style={{ color: subject.accent, opacity: 0.4 }} />
        </div>
        <div className="mt-3">
          <ProgressBar value={mastery} color={subject.accent} bg="white" height={8} />
        </div>
      </Card>

      {/* Steps */}
      <div className="space-y-3 mb-8">
        <StepRow
          num="1"
          title="Watch the video lecture & read the lesson"
          desc={module.videoId ? "Calculus-based video review + written walkthrough + concept checkpoint" : "Core concepts, formulas, and worked intuition"}
          done={modProg.lessonDone}
          actionLabel={modProg.lessonDone ? 'Review' : 'Start lesson'}
          onClick={() => setView({ type: 'lesson', moduleId })}
          subject={subject}
        />
        <StepRow
          num="2"
          title="Take the module quiz"
          desc={`${module.quiz.length} questions · immediate feedback · unlimited retries`}
          done={bestScore >= 0.8}
          actionLabel={quizAttempts.length ? `Retake (best ${Math.round(bestScore * 100)}%)` : 'Start quiz'}
          onClick={() => setView({ type: 'quiz', moduleId })}
          subject={subject}
          disabled={!modProg.lessonDone}
        />
      </div>

      {quizAttempts.length > 0 && (
        <Card className="p-5" style={{ background: 'white' }}>
          <div className="pill mb-3" style={{ color: THEME.muted }}>Quiz history</div>
          <div className="space-y-2">
            {quizAttempts.slice(-5).reverse().map((a, i) => (
              <div key={i} className="flex items-center justify-between py-1">
                <span className="text-sm font-mono-x" style={{ color: THEME.muted }}>
                  {formatDate(a.date)}
                </span>
                <div className="flex items-center gap-3">
                  <span className="font-mono-x text-sm">{a.score}/{a.total}</span>
                  <span
                    className="pill px-2 py-0.5 rounded"
                    style={{
                      color: a.score / a.total >= 0.8 ? THEME.success : THEME.mech,
                      background: a.score / a.total >= 0.8 ? '#dfecdf' : THEME.mechSoft,
                    }}
                  >
                    {Math.round((a.score / a.total) * 100)}%
                  </span>
                </div>
              </div>
            ))}
          </div>
        </Card>
      )}
    </div>
  );
}

function StepRow({ num, title, desc, done, actionLabel, onClick, subject, disabled }) {
  return (
    <div
      className="border rounded-lg p-5 flex items-center gap-4 hover-rise"
      style={{ background: 'white', borderColor: THEME.line, opacity: disabled ? 0.5 : 1 }}
    >
      <div
        className="w-10 h-10 rounded-full flex items-center justify-center font-display font-semibold shrink-0"
        style={{
          background: done ? THEME.success : subject.accentSoft,
          color: done ? 'white' : subject.accent,
        }}
      >
        {done ? <Check size={18} strokeWidth={2.5} /> : num}
      </div>
      <div className="flex-1 min-w-0">
        <div className="font-display text-lg" style={{ letterSpacing: '-0.01em' }}>{title}</div>
        <div className="text-sm" style={{ color: THEME.muted }}>{desc}</div>
      </div>
      <Button
        size="sm"
        variant={done ? 'outline' : 'primary'}
        onClick={onClick}
        disabled={disabled}
      >
        {disabled ? <><Lock size={14} />Locked</> : <>{actionLabel}<ChevronRight size={14} /></>}
      </Button>
    </div>
  );
}

// ─── LESSON ───
function LessonView({ moduleId, progress, setView, onCompleteLesson }) {
  const module = allModules.find(m => m.id === moduleId);
  const subject = curriculum[module.subjectId];
  const [checkpointAnswer, setCheckpointAnswer] = useState(null);
  const [checkpointShown, setCheckpointShown] = useState(false);

  const handleComplete = () => {
    onCompleteLesson(moduleId);
    setView({ type: 'module', moduleId });
  };

  return (
    <div className="max-w-3xl mx-auto px-5 md:px-10 py-10 md:py-14 pb-24 md:pb-14">
      <button
        onClick={() => setView({ type: 'module', moduleId })}
        className="flex items-center gap-1.5 mb-6 text-sm transition"
        style={{ color: THEME.muted }}
      >
        <ChevronLeft size={16} /> Back to module
      </button>

      <div className="mb-8">
        <Pill color={subject.accent} bg={subject.accentSoft}>
          Lesson · {subject.title}
        </Pill>
        <h1 className="font-display text-3xl md:text-5xl mt-3 mb-2" style={{ letterSpacing: '-0.02em', lineHeight: 1.05 }}>
          {module.title}
        </h1>
        <p className="font-display text-lg italic" style={{ color: THEME.inkSoft }}>
          {module.subtitle}
        </p>
      </div>

      {/* Video lecture — featured at top of lesson */}
      {module.videoId && (
        <div className="mb-10">
          <div className="flex items-center gap-2 mb-3">
            <span className="pill" style={{ color: subject.accent }}>▸ Video lecture</span>
            <span className="text-xs" style={{ color: THEME.muted }}>{module.videoTitle}</span>
          </div>
          <VideoEmbed videoId={module.videoId} title={`${module.title} — ${module.videoTitle}`} />
          <p className="text-xs mt-2" style={{ color: THEME.muted }}>
            Watch the full review, then continue reading below for the written walkthrough and concept checkpoint.
          </p>
        </div>
      )}

      <article className="space-y-10">
        {module.lesson.sections.map((section, i) => (
          <section key={i} className="fade-in">
            <div className="flex items-baseline gap-3 mb-3">
              <span
                className="pill font-mono-x"
                style={{ color: subject.accent }}
              >
                §{String(i + 1).padStart(2, '0')}
              </span>
              <h2 className="font-display text-2xl" style={{ letterSpacing: '-0.01em' }}>
                {section.heading}
              </h2>
            </div>
            <p className="text-base md:text-[17px] leading-relaxed mb-4" style={{ color: THEME.inkSoft }}>
              {section.body}
            </p>
            {section.formulas && (
              <div className="space-y-3">
                {section.formulas.map((f, fi) => (
                  <div key={fi} className="formula-box">
                    <TexBlock>{f.expr}</TexBlock>
                    <div className="text-xs" style={{ color: THEME.muted, fontFamily: 'DM Sans, sans-serif' }}>
                      {f.desc}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>
        ))}

        {/* Worked example — appears after all sections, before checkpoint */}
        {module.lesson.workedExample && (
          <WorkedExample example={module.lesson.workedExample} accentColor={subject.accent} />
        )}

        {/* Concept checkpoint */}
        {module.lesson.checkpoint && (
          <Card className="p-6" style={{ background: THEME.paperDeep, borderColor: subject.accent, borderWidth: 2 }}>
            <div className="flex items-center gap-2 mb-3">
              <Lightbulb size={16} style={{ color: subject.accent }} />
              <span className="pill" style={{ color: subject.accent }}>Concept checkpoint</span>
            </div>
            <h3 className="font-display text-xl mb-4" style={{ letterSpacing: '-0.01em' }}>
              {module.lesson.checkpoint.question}
            </h3>
            <div className="space-y-2">
              {module.lesson.checkpoint.options.map((opt, i) => {
                const selected = checkpointAnswer === i;
                const correct = module.lesson.checkpoint.correct === i;
                const shown = checkpointShown;
                return (
                  <button
                    key={i}
                    onClick={() => {
                      if (!shown) {
                        setCheckpointAnswer(i);
                        setCheckpointShown(true);
                      }
                    }}
                    className="w-full text-left p-3.5 rounded border transition flex items-center gap-3"
                    style={{
                      borderColor: shown
                        ? (correct ? THEME.success : selected ? THEME.error : THEME.line)
                        : selected ? THEME.ink : THEME.line,
                      background: shown
                        ? (correct ? '#e3f0e3' : selected ? THEME.mechSoft : 'white')
                        : 'white',
                    }}
                  >
                    <span className="font-mono-x text-xs w-5" style={{ color: THEME.muted }}>
                      {String.fromCharCode(65 + i)}
                    </span>
                    <span className="flex-1 text-sm">{opt}</span>
                    {shown && correct && <Check size={18} style={{ color: THEME.success }} />}
                    {shown && !correct && selected && <X size={18} style={{ color: THEME.error }} />}
                  </button>
                );
              })}
            </div>
            {checkpointShown && (
              <div className="mt-4 p-3 rounded text-sm fade-in" style={{ background: 'white', border: `1px solid ${THEME.line}` }}>
                <span className="pill" style={{ color: THEME.muted }}>Explanation</span>
                <p className="mt-1" style={{ color: THEME.ink }}>{module.lesson.checkpoint.explanation}</p>
              </div>
            )}
          </Card>
        )}
      </article>

      <div className="mt-10 pt-6 border-t flex items-center justify-between" style={{ borderColor: THEME.line }}>
        <Button variant="outline" onClick={() => setView({ type: 'module', moduleId })}>
          <ChevronLeft size={16} /> Back
        </Button>
        <Button onClick={handleComplete}>
          Mark lesson complete <Check size={16} />
        </Button>
      </div>
    </div>
  );
}

// ─── QUIZ ───
function QuizView({ moduleId, setView, onCompleteQuiz }) {
  const module = allModules.find(m => m.id === moduleId);
  const subject = curriculum[module.subjectId];
  const quiz = module.quiz;
  const [idx, setIdx] = useState(0);
  const [answers, setAnswers] = useState({});
  const [showFeedback, setShowFeedback] = useState(false);
  const [done, setDone] = useState(false);

  const q = quiz[idx];
  const selected = answers[idx];

  const submit = () => setShowFeedback(true);
  const next = () => {
    if (idx < quiz.length - 1) {
      setIdx(idx + 1);
      setShowFeedback(false);
    } else {
      const score = Object.keys(answers).reduce((acc, k) => {
        return acc + (answers[k] === quiz[k].correct ? 1 : 0);
      }, 0);
      onCompleteQuiz(moduleId, { score, total: quiz.length, answers, date: new Date().toISOString() });
      setDone(true);
    }
  };

  if (done) {
    const score = Object.keys(answers).reduce((a, k) => a + (answers[k] === quiz[k].correct ? 1 : 0), 0);
    const pct = score / quiz.length;
    const wrong = quiz.map((q, i) => ({ q, i, ans: answers[i] })).filter(x => x.ans !== x.q.correct);
    return (
      <div className="max-w-2xl mx-auto px-5 md:px-10 py-10 md:py-14 pb-24 md:pb-14">
        <div className="text-center mb-8">
          <div
            className="w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center"
            style={{ background: pct >= 0.8 ? THEME.success : pct >= 0.6 ? THEME.gold : THEME.mech, color: 'white' }}
          >
            {pct >= 0.8 ? <Trophy size={28} /> : <Target size={28} />}
          </div>
          <div className="pill mb-2" style={{ color: THEME.muted }}>Quiz complete</div>
          <h1 className="font-display text-5xl mb-2" style={{ letterSpacing: '-0.02em' }}>
            {score}<span style={{ color: THEME.muted }}>/{quiz.length}</span>
          </h1>
          <p className="text-lg" style={{ color: THEME.inkSoft }}>
            {pct === 1 ? 'Perfect score. Onward.' : pct >= 0.8 ? 'Great work — you\'ve mastered this module.' : pct >= 0.5 ? 'Solid attempt. Review the missed questions below.' : 'Keep at it. Review the lesson and try again.'}
          </p>
        </div>

        {wrong.length > 0 && (
          <Card className="p-5 mb-6" style={{ background: 'white' }}>
            <div className="pill mb-3" style={{ color: THEME.mech }}>Review these</div>
            <div className="space-y-4">
              {wrong.map(({ q, i }) => (
                <div key={i} className="pb-4 border-b last:border-b-0" style={{ borderColor: THEME.line }}>
                  <div className="text-sm font-medium mb-2">{q.q}</div>
                  <div className="text-xs mb-1" style={{ color: THEME.muted }}>
                    Correct: <span className="font-mono-x" style={{ color: THEME.success }}>{q.options[q.correct]}</span>
                  </div>
                  <div className="text-xs" style={{ color: THEME.inkSoft }}>{q.explanation}</div>
                </div>
              ))}
            </div>
          </Card>
        )}

        <div className="flex gap-3 justify-center flex-wrap">
          <Button variant="outline" onClick={() => setView({ type: 'lesson', moduleId })}>
            <BookOpen size={16} /> Review lesson
          </Button>
          <Button onClick={() => {
            setIdx(0); setAnswers({}); setShowFeedback(false); setDone(false);
          }}>
            <RotateCcw size={16} /> Retake
          </Button>
          <Button variant="primary" onClick={() => setView({ type: 'module', moduleId })}>
            Continue <ArrowRight size={16} />
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto px-5 md:px-10 py-10 md:py-14 pb-24 md:pb-14">
      <button
        onClick={() => setView({ type: 'module', moduleId })}
        className="flex items-center gap-1.5 mb-6 text-sm"
        style={{ color: THEME.muted }}
      >
        <ChevronLeft size={16} /> Exit quiz
      </button>

      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <Pill color={subject.accent} bg={subject.accentSoft}>{module.title}</Pill>
          <span className="font-mono-x text-sm" style={{ color: THEME.muted }}>
            Question {idx + 1} of {quiz.length}
          </span>
        </div>
        <div className="w-full h-1 rounded-full overflow-hidden" style={{ background: THEME.line }}>
          <div
            className="h-full transition-all duration-500 rounded-full"
            style={{ width: `${((idx + 1) / quiz.length) * 100}%`, background: subject.accent }}
          />
        </div>
      </div>

      <h2 className="font-display text-2xl md:text-3xl mb-6 leading-snug" style={{ letterSpacing: '-0.015em' }}>
        {q.q}
      </h2>

      <div className="space-y-2.5 mb-6">
        {q.options.map((opt, i) => {
          const isSelected = selected === i;
          const isCorrect = q.correct === i;
          const shown = showFeedback;
          return (
            <button
              key={i}
              onClick={() => !shown && setAnswers({ ...answers, [idx]: i })}
              className="w-full text-left p-4 rounded-lg border transition flex items-center gap-3"
              style={{
                borderColor: shown
                  ? (isCorrect ? THEME.success : isSelected ? THEME.error : THEME.line)
                  : isSelected ? THEME.ink : THEME.line,
                background: shown
                  ? (isCorrect ? '#e3f0e3' : isSelected ? THEME.mechSoft : 'white')
                  : isSelected ? THEME.paperDeep : 'white',
                borderWidth: (shown && (isCorrect || isSelected)) || (!shown && isSelected) ? 2 : 1,
              }}
            >
              <span
                className="w-7 h-7 rounded-full flex items-center justify-center font-mono-x text-xs shrink-0 border"
                style={{
                  borderColor: shown && isCorrect ? THEME.success : shown && isSelected ? THEME.error : THEME.line,
                  background: isSelected ? THEME.ink : 'transparent',
                  color: isSelected ? 'white' : THEME.ink,
                }}
              >
                {String.fromCharCode(65 + i)}
              </span>
              <span className="flex-1 text-sm md:text-base">{opt}</span>
              {shown && isCorrect && <CheckCircle2 size={20} style={{ color: THEME.success }} />}
              {shown && !isCorrect && isSelected && <XCircle size={20} style={{ color: THEME.error }} />}
            </button>
          );
        })}
      </div>

      {showFeedback && (
        <Card className="p-4 mb-6 fade-in" style={{ background: THEME.paperDeep, borderColor: subject.accent }}>
          <div className="flex items-start gap-2">
            <Lightbulb size={18} style={{ color: subject.accent }} className="mt-0.5 shrink-0" />
            <div>
              <div className="pill mb-1" style={{ color: subject.accent }}>Explanation</div>
              <p className="text-sm" style={{ color: THEME.ink }}>{q.explanation}</p>
            </div>
          </div>
        </Card>
      )}

      <div className="flex justify-end">
        {!showFeedback ? (
          <Button disabled={selected === undefined} onClick={submit}>
            Check answer <ChevronRight size={16} />
          </Button>
        ) : (
          <Button onClick={next}>
            {idx === quiz.length - 1 ? 'Finish quiz' : 'Next question'} <ChevronRight size={16} />
          </Button>
        )}
      </div>
    </div>
  );
}


// ═══════════════════════════════════════════════════════════════════
// DAILY PRACTICE
// ═══════════════════════════════════════════════════════════════════

function PracticeView({ practice, onSubmitPractice }) {
  const today = todayISO();
  const problem = useMemo(() => pickDailyProblem(today), [today]);
  const doneToday = practice.lastCompleted === today;
  const [selected, setSelected] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [timed, setTimed] = useState(false);
  const [timeLeft, setTimeLeft] = useState(180);
  const [started, setStarted] = useState(doneToday);

  useEffect(() => {
    if (!timed || !started || submitted) return;
    if (timeLeft <= 0) { setSubmitted(true); return; }
    const t = setTimeout(() => setTimeLeft(tl => tl - 1), 1000);
    return () => clearTimeout(t);
  }, [timed, started, timeLeft, submitted]);

  const submit = () => {
    if (!submitted) {
      setSubmitted(true);
      const correct = selected === problem.correct;
      onSubmitPractice({ correct, date: today });
    }
  };

  return (
    <div className="max-w-2xl mx-auto px-5 md:px-10 py-10 md:py-14 pb-24 md:pb-14">
      <EmptyHeader
        eyebrow="Daily practice"
        title="Today's problem"
        subtitle="Every day you solve one problem, you strengthen both your knowledge and your habit. Compound interest for your brain."
      />

      {/* Streak stats */}
      <div className="grid grid-cols-3 gap-3 mb-8">
        <Card className="p-4 text-center" style={{ background: 'white' }}>
          <div className="pill mb-1" style={{ color: THEME.mech }}>Streak</div>
          <div className="font-display text-3xl flex items-center justify-center gap-1">
            <Flame size={24} style={{ color: THEME.mech }} fill={practice.streak > 0 ? THEME.mech : 'none'} />
            {practice.streak || 0}
          </div>
        </Card>
        <Card className="p-4 text-center" style={{ background: 'white' }}>
          <div className="pill mb-1" style={{ color: THEME.muted }}>Solved</div>
          <div className="font-display text-3xl">{practice.totalSolved || 0}</div>
        </Card>
        <Card className="p-4 text-center" style={{ background: 'white' }}>
          <div className="pill mb-1" style={{ color: THEME.muted }}>Accuracy</div>
          <div className="font-display text-3xl">
            {practice.totalSolved ? Math.round((practice.totalCorrect || 0) / practice.totalSolved * 100) : 0}%
          </div>
        </Card>
      </div>

      {doneToday && !submitted ? (
        <Card className="p-8 text-center" style={{ background: 'white' }}>
          <CheckCircle2 size={44} style={{ color: THEME.success }} className="mx-auto mb-3" />
          <h3 className="font-display text-2xl mb-2">Today's problem complete.</h3>
          <p className="mb-5" style={{ color: THEME.inkSoft }}>
            Come back tomorrow for a new challenge. Your streak is safe.
          </p>
          <p className="text-sm" style={{ color: THEME.muted }}>
            Next problem resets at midnight local time.
          </p>
        </Card>
      ) : !started ? (
        <Card className="p-8" style={{ background: 'white' }}>
          <div className="mb-6">
            <div className="pill mb-2" style={{ color: THEME.muted }}>Today's topic</div>
            <h3 className="font-display text-2xl">{problem.topic}</h3>
            <Pill color={problem.subject === 'mechanics' ? THEME.mech : THEME.em} bg={problem.subject === 'mechanics' ? THEME.mechSoft : THEME.emSoft}>
              {problem.subject === 'mechanics' ? 'Mechanics' : 'E & M'}
            </Pill>
          </div>

          <label className="flex items-center gap-3 p-4 rounded border cursor-pointer mb-5" style={{ borderColor: THEME.line }}>
            <input
              type="checkbox"
              checked={timed}
              onChange={e => setTimed(e.target.checked)}
              className="w-4 h-4"
            />
            <div>
              <div className="font-medium text-sm">Timed mode</div>
              <div className="text-xs" style={{ color: THEME.muted }}>
                3 minutes on the clock — simulate real exam pressure
              </div>
            </div>
          </label>

          <Button className="w-full" size="lg" onClick={() => setStarted(true)}>
            <Play size={16} /> Start problem
          </Button>
        </Card>
      ) : (
        <Card className="p-6 md:p-8" style={{ background: 'white' }}>
          {timed && !submitted && (
            <div className="flex items-center justify-between mb-4 pb-3 border-b" style={{ borderColor: THEME.line }}>
              <Pill color={problem.subject === 'mechanics' ? THEME.mech : THEME.em} bg={problem.subject === 'mechanics' ? THEME.mechSoft : THEME.emSoft}>
                {problem.topic}
              </Pill>
              <div
                className="flex items-center gap-1.5 font-mono-x font-semibold"
                style={{ color: timeLeft < 30 ? THEME.error : THEME.ink }}
              >
                <Timer size={16} />
                {Math.floor(timeLeft / 60)}:{String(timeLeft % 60).padStart(2, '0')}
              </div>
            </div>
          )}

          <h2 className="font-display text-2xl mb-6 leading-snug" style={{ letterSpacing: '-0.015em' }}>
            {problem.q}
          </h2>

          <div className="space-y-2 mb-6">
            {problem.options.map((opt, i) => {
              const isSelected = selected === i;
              const isCorrect = problem.correct === i;
              const shown = submitted;
              return (
                <button
                  key={i}
                  onClick={() => !shown && setSelected(i)}
                  className="w-full text-left p-4 rounded-lg border flex items-center gap-3 transition"
                  style={{
                    borderColor: shown ? (isCorrect ? THEME.success : isSelected ? THEME.error : THEME.line) : isSelected ? THEME.ink : THEME.line,
                    background: shown
                      ? (isCorrect ? '#e3f0e3' : isSelected ? THEME.mechSoft : 'white')
                      : isSelected ? THEME.paperDeep : 'white',
                    borderWidth: (shown && (isCorrect || isSelected)) || (!shown && isSelected) ? 2 : 1,
                  }}
                >
                  <span
                    className="w-7 h-7 rounded-full flex items-center justify-center font-mono-x text-xs shrink-0 border"
                    style={{
                      borderColor: shown && isCorrect ? THEME.success : shown && isSelected ? THEME.error : THEME.line,
                      background: isSelected ? THEME.ink : 'transparent',
                      color: isSelected ? 'white' : THEME.ink,
                    }}
                  >
                    {String.fromCharCode(65 + i)}
                  </span>
                  <span className="flex-1 text-sm md:text-base">{opt}</span>
                  {shown && isCorrect && <CheckCircle2 size={20} style={{ color: THEME.success }} />}
                  {shown && !isCorrect && isSelected && <XCircle size={20} style={{ color: THEME.error }} />}
                </button>
              );
            })}
          </div>

          {submitted && (
            <div className="fade-in">
              <div className="p-4 rounded mb-5" style={{ background: THEME.paperDeep }}>
                <div className="pill mb-2" style={{ color: THEME.accent }}>Explanation</div>
                <p className="text-sm" style={{ color: THEME.ink }}>{problem.explanation}</p>
              </div>
              <Card className="p-4 text-center" style={{ background: selected === problem.correct ? '#e3f0e3' : THEME.mechSoft }}>
                <div className="font-display text-xl" style={{ color: selected === problem.correct ? THEME.success : THEME.mech }}>
                  {selected === problem.correct ? 'Correct!' : 'Not quite.'}
                </div>
                <div className="text-sm mt-1" style={{ color: THEME.inkSoft }}>
                  Come back tomorrow for a new problem.
                </div>
              </Card>
            </div>
          )}

          <div className="flex justify-end mt-5">
            {!submitted && (
              <Button disabled={selected === null} onClick={submit}>
                Submit <Check size={16} />
              </Button>
            )}
          </div>
        </Card>
      )}
    </div>
  );
}


// ═══════════════════════════════════════════════════════════════════
// MOCK EXAM — full-length timed practice
// ═══════════════════════════════════════════════════════════════════

function MockExamView({ setView, onCompleteExam }) {
  const [stage, setStage] = useState('intro'); // intro | running | review
  const [examQuestions] = useState(() => {
    // shuffle + pick all questions (deterministic per session start)
    const shuffled = [...mockExamQuestions]
      .map(q => ({ q, r: Math.random() }))
      .sort((a, b) => a.r - b.r)
      .map(x => x.q);
    return shuffled;
  });
  const [answers, setAnswers] = useState({}); // index → choice
  const [flagged, setFlagged] = useState({}); // index → bool
  const [currentIdx, setCurrentIdx] = useState(0);
  const EXAM_SECONDS = 40 * 60; // 40 minutes for 20 questions
  const [timeLeft, setTimeLeft] = useState(EXAM_SECONDS);
  const [result, setResult] = useState(null);

  const submitExam = useCallback(() => {
    let correct = 0;
    const breakdown = {};
    examQuestions.forEach((q, i) => {
      const topic = q.topic;
      if (!breakdown[topic]) breakdown[topic] = { correct: 0, total: 0 };
      breakdown[topic].total += 1;
      if (answers[i] === q.correct) {
        correct += 1;
        breakdown[topic].correct += 1;
      }
    });
    const total = examQuestions.length;
    const score = correct / total;
    const res = {
      name: `Mock Exam ${formatDate(todayISO())}`,
      date: todayISO(),
      score,
      correct,
      total,
      breakdown,
      questions: examQuestions,
      answers,
    };
    setResult(res);
    onCompleteExam(res);
    setStage('review');
  }, [answers, examQuestions, onCompleteExam]);

  // Countdown — intentionally does NOT depend on submitExam
  // (submitExam changes whenever answers change, which would reset the timer
  //  on every click if it were a dep — freezing the clock for fast users).
  useEffect(() => {
    if (stage !== 'running') return;
    if (timeLeft <= 0) return;
    const t = setTimeout(() => setTimeLeft(s => s - 1), 1000);
    return () => clearTimeout(t);
  }, [stage, timeLeft]);

  // Auto-submit when time runs out
  useEffect(() => {
    if (stage === 'running' && timeLeft <= 0) {
      submitExam();
    }
  }, [stage, timeLeft, submitExam]);

  if (stage === 'intro') {
    return (
      <div className="max-w-3xl mx-auto fade-in">
        <EmptyHeader
          eyebrow="Mock Exam"
          title="Test yourself under exam conditions"
          subtitle="Run a full-length practice exam, or build a custom test focused on the topics you care about."
        />

        {/* Two test-mode options */}
        <div className="grid md:grid-cols-2 gap-4 mb-6">
          <Card className="p-6 hover-rise" style={{ background: 'white' }}>
            <div
              className="w-11 h-11 rounded-lg flex items-center justify-center mb-3"
              style={{ background: THEME.accent, color: 'white' }}
            >
              <FileText size={20} />
            </div>
            <h3 className="font-display text-xl mb-1">Full-length exam</h3>
            <p className="text-sm mb-4" style={{ color: THEME.inkSoft }}>
              {mockExamQuestions.length} mixed questions, 40-minute timer, full AP-style format.
            </p>
            <Button onClick={() => setStage('running')} size="sm">
              Begin <Play size={14} />
            </Button>
          </Card>
          <Card className="p-6 hover-rise" style={{ background: 'white' }}>
            <div
              className="w-11 h-11 rounded-lg flex items-center justify-center mb-3"
              style={{ background: THEME.gold, color: 'white' }}
            >
              <Target size={20} />
            </div>
            <h3 className="font-display text-xl mb-1">Custom test</h3>
            <p className="text-sm mb-4" style={{ color: THEME.inkSoft }}>
              Pick the topics, choose 5–20 questions, optional timer. Great for targeted review.
            </p>
            <Button onClick={() => setView({ type: 'custom-test' })} variant="outline" size="sm">
              Configure <ArrowRight size={14} />
            </Button>
          </Card>
        </div>

        <Card className="p-6">
          <div className="p-5 rounded-lg border" style={{ borderColor: THEME.line, background: THEME.paperDeep }}>
            <div className="flex items-start gap-3">
              <Lightbulb size={20} style={{ color: THEME.gold }} className="mt-0.5 shrink-0" />
              <div>
                <div className="font-semibold mb-1" style={{ color: THEME.ink }}>Before you start a full exam</div>
                <ul className="text-sm space-y-1" style={{ color: THEME.inkSoft }}>
                  <li>• Find a quiet space — 40 uninterrupted minutes.</li>
                  <li>• Pencil, paper, and a non-programmable calculator allowed.</li>
                  <li>• You can flag questions and return to them before submitting.</li>
                  <li>• The timer auto-submits at zero.</li>
                </ul>
              </div>
            </div>
          </div>
        </Card>
      </div>
    );
  }

  if (stage === 'review' && result) {
    const pct = Math.round(result.score * 100);
    return (
      <div className="max-w-4xl mx-auto fade-in">
        <EmptyHeader
          eyebrow="Exam Complete"
          title={pct >= 70 ? 'Well done.' : 'A solid reference point.'}
          subtitle="Review your answers below. Focus your next sessions on the weakest topics."
        />

        <Card className="p-8 mb-6" style={{ background: THEME.ink, color: 'white' }}>
          <div className="flex items-end justify-between flex-wrap gap-4">
            <div>
              <div className="pill mb-2" style={{ color: THEME.gold, background: 'rgba(196,148,52,0.15)' }}>Your score</div>
              <div className="font-display text-6xl" style={{ letterSpacing: '-0.03em' }}>{pct}%</div>
              <div className="text-sm mt-2" style={{ color: 'rgba(255,255,255,0.7)' }}>
                {result.correct} correct out of {result.total}
              </div>
            </div>
            <div className="flex gap-6 text-right">
              <div>
                <div className="text-xs uppercase tracking-wider" style={{ color: 'rgba(255,255,255,0.5)' }}>Time used</div>
                <div className="font-mono-x text-xl">
                  {Math.floor((EXAM_SECONDS - timeLeft) / 60)}:{String((EXAM_SECONDS - timeLeft) % 60).padStart(2, '0')}
                </div>
              </div>
            </div>
          </div>
        </Card>

        <Card className="p-6 mb-6">
          <h3 className="font-display text-xl mb-4">By topic</h3>
          <div className="space-y-3">
            {Object.entries(result.breakdown).map(([topic, b]) => {
              const p = b.correct / b.total;
              const color = p >= 0.7 ? THEME.success : p >= 0.4 ? THEME.gold : THEME.error;
              return (
                <div key={topic}>
                  <div className="flex justify-between text-sm mb-1">
                    <span style={{ color: THEME.ink }}>{topic}</span>
                    <span className="font-mono-x" style={{ color }}>{b.correct}/{b.total}</span>
                  </div>
                  <ProgressBar value={p * 100} color={color} />
                </div>
              );
            })}
          </div>
        </Card>

        <Card className="p-6 mb-6">
          <h3 className="font-display text-xl mb-4">Question review</h3>
          <div className="space-y-3">
            {result.questions.map((q, i) => {
              const userAns = result.answers[i];
              const isCorrect = userAns === q.correct;
              const isUnanswered = userAns === undefined;
              return (
                <details key={i} className="rounded border p-4" style={{ borderColor: THEME.line, background: 'white' }}>
                  <summary className="cursor-pointer flex items-center gap-3 font-medium">
                    <span
                      className="w-7 h-7 rounded-full flex items-center justify-center shrink-0 text-xs font-mono-x"
                      style={{
                        background: isUnanswered ? THEME.line : isCorrect ? '#e3f0e3' : THEME.mechSoft,
                        color: isUnanswered ? THEME.muted : isCorrect ? THEME.success : THEME.error,
                      }}
                    >
                      {isUnanswered ? '—' : isCorrect ? '✓' : '✗'}
                    </span>
                    <span className="pill" style={{ color: q.subject === 'mechanics' ? THEME.mech : THEME.em, background: q.subject === 'mechanics' ? THEME.mechSoft : THEME.emSoft }}>{q.topic}</span>
                    <span className="text-sm flex-1 truncate" style={{ color: THEME.ink }}>{q.q}</span>
                  </summary>
                  <div className="mt-4 pl-10 space-y-2 text-sm">
                    {q.options.map((opt, oi) => (
                      <div
                        key={oi}
                        className="p-2 rounded"
                        style={{
                          background: oi === q.correct ? '#e3f0e3' : oi === userAns && !isCorrect ? THEME.mechSoft : 'transparent',
                          color: oi === q.correct ? THEME.success : oi === userAns && !isCorrect ? THEME.error : THEME.inkSoft,
                        }}
                      >
                        <span className="font-mono-x mr-2">{String.fromCharCode(65 + oi)}.</span>{opt}
                        {oi === q.correct && <span className="ml-2 text-xs">(correct)</span>}
                        {oi === userAns && oi !== q.correct && <span className="ml-2 text-xs">(your answer)</span>}
                      </div>
                    ))}
                    <div className="mt-3 p-3 rounded" style={{ background: THEME.paperDeep }}>
                      <div className="pill mb-1" style={{ color: THEME.accent }}>Explanation</div>
                      <div style={{ color: THEME.ink }}>{q.explanation}</div>
                    </div>
                  </div>
                </details>
              );
            })}
          </div>
        </Card>

        <div className="flex gap-3 justify-end">
          <Button variant="outline" onClick={() => setView({ type: 'progress' })}>
            View progress <BarChart3 size={16} />
          </Button>
          <Button onClick={() => setView({ type: 'dashboard' })}>
            Back to dashboard <ArrowRight size={16} />
          </Button>
        </div>
      </div>
    );
  }

  // Running exam
  const q = examQuestions[currentIdx];
  const answered = Object.keys(answers).length;
  const flaggedCount = Object.values(flagged).filter(Boolean).length;

  return (
    <div className="max-w-5xl mx-auto">
      {/* Sticky header with timer + progress */}
      <div
        className="sticky top-0 z-20 -mx-4 px-4 py-3 mb-5 border-b flex items-center justify-between flex-wrap gap-3"
        style={{ background: THEME.paper, borderColor: THEME.line }}
      >
        <div className="flex items-center gap-4">
          <div className="pill" style={{ color: THEME.accent }}>Mock Exam</div>
          <div className="text-sm" style={{ color: THEME.inkSoft }}>
            Question <span className="font-mono-x font-semibold" style={{ color: THEME.ink }}>{currentIdx + 1}</span> of {examQuestions.length}
            <span className="mx-2 opacity-40">·</span>
            <span className="font-mono-x">{answered}</span> answered
            {flaggedCount > 0 && <>
              <span className="mx-2 opacity-40">·</span>
              <Flag size={13} className="inline mr-1" style={{ color: THEME.gold }} />
              <span className="font-mono-x">{flaggedCount}</span> flagged
            </>}
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div
            className="flex items-center gap-1.5 font-mono-x font-semibold px-3 py-1 rounded-md"
            style={{
              background: timeLeft < 120 ? '#fce5e0' : THEME.paperDeep,
              color: timeLeft < 120 ? THEME.error : THEME.ink,
            }}
          >
            <Timer size={16} />
            {Math.floor(timeLeft / 60)}:{String(timeLeft % 60).padStart(2, '0')}
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              if (confirm(`Submit exam? You've answered ${answered} of ${examQuestions.length}.`)) {
                submitExam();
              }
            }}
          >
            Submit
          </Button>
        </div>
      </div>

      <div className="grid md:grid-cols-[1fr,240px] gap-6">
        <Card className="p-7">
          <div className="flex items-center gap-2 mb-4">
            <span
              className="pill"
              style={{
                color: q.subject === 'mechanics' ? THEME.mech : THEME.em,
                background: q.subject === 'mechanics' ? THEME.mechSoft : THEME.emSoft,
              }}
            >
              {q.topic}
            </span>
            <button
              onClick={() => setFlagged({ ...flagged, [currentIdx]: !flagged[currentIdx] })}
              className="ml-auto inline-flex items-center gap-1.5 text-xs px-2.5 py-1 rounded-md border transition"
              style={{
                borderColor: flagged[currentIdx] ? THEME.gold : THEME.line,
                background: flagged[currentIdx] ? THEME.goldSoft : 'transparent',
                color: flagged[currentIdx] ? THEME.gold : THEME.inkSoft,
              }}
            >
              <Flag size={12} />
              {flagged[currentIdx] ? 'Flagged' : 'Flag for review'}
            </button>
          </div>

          <h2 className="font-display text-2xl mb-6 leading-snug" style={{ letterSpacing: '-0.015em' }}>
            {q.q}
          </h2>

          <div className="space-y-2 mb-6">
            {q.options.map((opt, i) => {
              const isSelected = answers[currentIdx] === i;
              return (
                <button
                  key={i}
                  onClick={() => setAnswers({ ...answers, [currentIdx]: i })}
                  className="w-full text-left p-4 rounded-lg border flex items-center gap-3 transition"
                  style={{
                    borderColor: isSelected ? THEME.ink : THEME.line,
                    background: isSelected ? THEME.paperDeep : 'white',
                    borderWidth: isSelected ? 2 : 1,
                  }}
                >
                  <span
                    className="w-7 h-7 rounded-full flex items-center justify-center font-mono-x text-xs shrink-0 border"
                    style={{
                      borderColor: isSelected ? THEME.ink : THEME.line,
                      background: isSelected ? THEME.ink : 'transparent',
                      color: isSelected ? 'white' : THEME.ink,
                    }}
                  >
                    {String.fromCharCode(65 + i)}
                  </span>
                  <span className="flex-1 text-sm md:text-base">{opt}</span>
                </button>
              );
            })}
          </div>

          <div className="flex justify-between">
            <Button
              variant="outline"
              onClick={() => setCurrentIdx(Math.max(0, currentIdx - 1))}
              disabled={currentIdx === 0}
            >
              <ChevronLeft size={16} /> Previous
            </Button>
            {currentIdx < examQuestions.length - 1 ? (
              <Button onClick={() => setCurrentIdx(currentIdx + 1)}>
                Next <ChevronRight size={16} />
              </Button>
            ) : (
              <Button
                onClick={() => {
                  if (confirm(`Submit exam? You've answered ${answered} of ${examQuestions.length}.`)) {
                    submitExam();
                  }
                }}
              >
                Submit exam <Check size={16} />
              </Button>
            )}
          </div>
        </Card>

        {/* Question palette */}
        <Card className="p-4 h-fit sticky top-24">
          <div className="pill mb-3" style={{ color: THEME.inkSoft }}>Questions</div>
          <div className="grid grid-cols-5 md:grid-cols-4 gap-1.5">
            {examQuestions.map((_, i) => {
              const isAnswered = answers[i] !== undefined;
              const isFlagged = flagged[i];
              const isCurrent = i === currentIdx;
              return (
                <button
                  key={i}
                  onClick={() => setCurrentIdx(i)}
                  className="aspect-square rounded flex items-center justify-center text-xs font-mono-x relative border transition"
                  style={{
                    background: isCurrent ? THEME.ink : isAnswered ? THEME.accentSoft : 'white',
                    color: isCurrent ? 'white' : isAnswered ? THEME.accent : THEME.muted,
                    borderColor: isCurrent ? THEME.ink : isAnswered ? THEME.accent : THEME.line,
                    fontWeight: isAnswered || isCurrent ? 600 : 400,
                  }}
                >
                  {i + 1}
                  {isFlagged && (
                    <Flag
                      size={8}
                      className="absolute top-0.5 right-0.5"
                      style={{ color: isCurrent ? THEME.gold : THEME.gold, fill: THEME.gold }}
                    />
                  )}
                </button>
              );
            })}
          </div>
          <div className="mt-4 pt-3 border-t text-xs space-y-1.5" style={{ borderColor: THEME.line, color: THEME.muted }}>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded" style={{ background: THEME.accentSoft, border: `1px solid ${THEME.accent}` }} />
              <span>Answered</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded border" style={{ borderColor: THEME.line }} />
              <span>Not yet</span>
            </div>
            <div className="flex items-center gap-2">
              <Flag size={10} style={{ color: THEME.gold, fill: THEME.gold }} />
              <span>Flagged</span>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════
// PROGRESS VIEW — detailed stats
// ═══════════════════════════════════════════════════════════════════

function ProgressView({ profile, progress, practice, exams }) {
  const mechMastery = subjectMastery(progress, 'mechanics');
  const emMastery = subjectMastery(progress, 'em');
  const overall = computeOverallProgress(progress);

  // Chart of quiz scores over time
  const quizData = [];
  allModules.forEach(mod => {
    const attempts = progress[mod.id]?.quizAttempts || [];
    attempts.forEach(a => {
      quizData.push({
        date: a.date,
        score: Math.round((a.score / a.total) * 100),
        module: mod.title,
      });
    });
  });
  quizData.sort((a, b) => a.date.localeCompare(b.date));

  // Module mastery data
  const moduleData = allModules.map(m => ({
    name: m.title.length > 14 ? m.title.slice(0, 13) + '…' : m.title,
    fullName: m.title,
    mastery: computeMastery(progress, m.id),
    subject: m.subjectId,
  }));

  // Exam history data — show last 5 exams in chronological order (oldest → newest)
  // so the bar chart reads left-to-right as time progresses.
  const examData = [...exams]
    .sort((a, b) => a.date.localeCompare(b.date))
    .slice(-5)
    .map(e => ({
      date: formatDate(e.date),
      score: Math.round(e.score * 100),
    }));

  // Practice accuracy
  const practiceAccuracy = practice.totalSolved > 0
    ? Math.round((practice.totalCorrect / practice.totalSolved) * 100)
    : 0;

  return (
    <div className="max-w-6xl mx-auto fade-in">
      <EmptyHeader
        eyebrow="Analytics"
        title="Your progress"
        subtitle="A map of how you're moving through the curriculum and where to focus next."
      />

      {/* Top stats */}
      <div className="grid md:grid-cols-4 gap-4 mb-6">
        <Card className="p-5">
          <div className="pill mb-2" style={{ color: THEME.accent }}>Overall</div>
          <div className="font-display text-4xl" style={{ letterSpacing: '-0.02em' }}>{overall}%</div>
          <ProgressBar value={overall} color={THEME.accent} height={4} />
          <div className="text-xs mt-2" style={{ color: THEME.muted }}>Across {allModules.length} modules</div>
        </Card>
        <Card className="p-5">
          <div className="pill mb-2" style={{ color: THEME.mech }}>Mechanics</div>
          <div className="font-display text-4xl" style={{ letterSpacing: '-0.02em', color: THEME.mech }}>{mechMastery}%</div>
          <ProgressBar value={mechMastery} color={THEME.mech} height={4} />
          <div className="text-xs mt-2" style={{ color: THEME.muted }}>{curriculum.mechanics.modules.length} modules</div>
        </Card>
        <Card className="p-5">
          <div className="pill mb-2" style={{ color: THEME.em }}>E&M</div>
          <div className="font-display text-4xl" style={{ letterSpacing: '-0.02em', color: THEME.em }}>{emMastery}%</div>
          <ProgressBar value={emMastery} color={THEME.em} height={4} />
          <div className="text-xs mt-2" style={{ color: THEME.muted }}>{curriculum.em.modules.length} modules</div>
        </Card>
        <Card className="p-5">
          <div className="pill mb-2" style={{ color: THEME.gold }}>Daily practice</div>
          <div className="font-display text-4xl" style={{ letterSpacing: '-0.02em' }}>
            {practice.streak || 0}<span className="text-base ml-1" style={{ color: THEME.muted }}>day streak</span>
          </div>
          <div className="text-xs mt-2" style={{ color: THEME.muted }}>
            {practice.totalSolved || 0} problems · {practiceAccuracy}% accurate
          </div>
        </Card>
      </div>

      {/* Quiz performance over time */}
      {quizData.length > 0 && (
        <Card className="p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="font-display text-xl">Quiz scores over time</h3>
              <div className="text-sm" style={{ color: THEME.muted }}>Every attempt, plotted in order</div>
            </div>
          </div>
          <div style={{ height: 260 }}>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={quizData} margin={{ top: 10, right: 10, left: -15, bottom: 0 }}>
                <CartesianGrid stroke={THEME.line} strokeDasharray="2 3" vertical={false} />
                <XAxis
                  dataKey="date"
                  tick={{ fontSize: 11, fill: THEME.muted }}
                  tickFormatter={d => formatDate(d).split(',')[0]}
                />
                <YAxis
                  domain={[0, 100]}
                  tick={{ fontSize: 11, fill: THEME.muted }}
                />
                <Tooltip
                  contentStyle={{ background: THEME.paper, border: `1px solid ${THEME.line}`, borderRadius: 6, fontSize: 12 }}
                  labelFormatter={d => formatDate(d)}
                  formatter={(v, _n, p) => [`${v}%`, p.payload.module]}
                />
                <Line
                  type="monotone"
                  dataKey="score"
                  stroke={THEME.accent}
                  strokeWidth={2.5}
                  dot={{ fill: THEME.accent, r: 4 }}
                  activeDot={{ r: 6 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Card>
      )}

      {/* Module mastery bars */}
      <Card className="p-6 mb-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="font-display text-xl">Mastery by module</h3>
            <div className="text-sm" style={{ color: THEME.muted }}>40% from lesson + 60% from your best quiz</div>
          </div>
        </div>
        <div className="space-y-3">
          {moduleData.map(m => (
            <div key={m.fullName}>
              <div className="flex justify-between text-sm mb-1">
                <span className="flex items-center gap-2">
                  <span
                    className="w-1.5 h-1.5 rounded-full"
                    style={{ background: m.subject === 'mechanics' ? THEME.mech : THEME.em }}
                  />
                  <span style={{ color: THEME.ink }}>{m.fullName}</span>
                </span>
                <span className="font-mono-x" style={{ color: m.mastery >= 80 ? THEME.success : m.mastery >= 40 ? THEME.inkSoft : THEME.muted }}>
                  {m.mastery}%
                </span>
              </div>
              <ProgressBar
                value={m.mastery}
                color={m.subject === 'mechanics' ? THEME.mech : THEME.em}
                height={5}
              />
            </div>
          ))}
        </div>
      </Card>

      <div className="grid md:grid-cols-2 gap-5 mb-6">
        {/* Exam history */}
        <Card className="p-6">
          <h3 className="font-display text-xl mb-4">Recent mock exams</h3>
          {examData.length === 0 ? (
            <div className="text-center py-10 text-sm" style={{ color: THEME.muted }}>
              <FileText size={32} className="mx-auto mb-2 opacity-40" />
              <div>No mock exams yet.</div>
              <div className="text-xs mt-1">Take one once you've completed a few modules.</div>
            </div>
          ) : (
            <div style={{ height: 220 }}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={examData} margin={{ top: 10, right: 10, left: -15, bottom: 0 }}>
                  <CartesianGrid stroke={THEME.line} strokeDasharray="2 3" vertical={false} />
                  <XAxis dataKey="date" tick={{ fontSize: 11, fill: THEME.muted }} />
                  <YAxis domain={[0, 100]} tick={{ fontSize: 11, fill: THEME.muted }} />
                  <Tooltip
                    contentStyle={{ background: THEME.paper, border: `1px solid ${THEME.line}`, borderRadius: 6, fontSize: 12 }}
                    formatter={v => [`${v}%`, 'Score']}
                  />
                  <Bar dataKey="score" fill={THEME.accent} radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          )}
        </Card>

        {/* Profile summary */}
        <Card className="p-6">
          <h3 className="font-display text-xl mb-4">Study profile</h3>
          <div className="space-y-3 text-sm">
            <div className="flex justify-between py-2 border-b" style={{ borderColor: THEME.line }}>
              <span style={{ color: THEME.muted }}>Name</span>
              <span style={{ color: THEME.ink }}>{profile.name}</span>
            </div>
            <div className="flex justify-between py-2 border-b" style={{ borderColor: THEME.line }}>
              <span style={{ color: THEME.muted }}>Target exam</span>
              <span style={{ color: THEME.ink }}>{formatDate(profile.targetDate)}</span>
            </div>
            <div className="flex justify-between py-2 border-b" style={{ borderColor: THEME.line }}>
              <span style={{ color: THEME.muted }}>Days remaining</span>
              <span className="font-mono-x font-semibold" style={{ color: THEME.accent }}>
                {Math.max(0, daysBetween(todayISO(), profile.targetDate))}
              </span>
            </div>
            <div className="flex justify-between py-2 border-b" style={{ borderColor: THEME.line }}>
              <span style={{ color: THEME.muted }}>Starting level</span>
              <span style={{ color: THEME.ink }} className="capitalize">{profile.level}</span>
            </div>
            <div className="flex justify-between py-2 border-b" style={{ borderColor: THEME.line }}>
              <span style={{ color: THEME.muted }}>Focus</span>
              <span style={{ color: THEME.ink }} className="capitalize">{profile.focus === 'both' ? 'Both sections' : profile.focus}</span>
            </div>
            <div className="flex justify-between py-2">
              <span style={{ color: THEME.muted }}>Joined</span>
              <span style={{ color: THEME.ink }}>{formatDate(profile.createdAt)}</span>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════
// ACHIEVEMENTS VIEW
// ═══════════════════════════════════════════════════════════════════

function AchievementsView({ achievements }) {
  const earned = new Set(achievements);
  const earnedCount = ACHIEVEMENTS.filter(a => earned.has(a.id)).length;

  return (
    <div className="max-w-4xl mx-auto fade-in">
      <EmptyHeader
        eyebrow="Achievements"
        title="Your milestones"
        subtitle={`${earnedCount} of ${ACHIEVEMENTS.length} earned. Every one marks real progress.`}
      />

      <Card className="p-6 mb-6" style={{ background: THEME.ink, color: 'white' }}>
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div>
            <div className="pill mb-2" style={{ color: THEME.gold, background: 'rgba(196,148,52,0.15)' }}>Progress</div>
            <div className="font-display text-4xl" style={{ letterSpacing: '-0.02em' }}>
              {earnedCount}<span className="opacity-40" style={{ fontSize: '0.7em' }}> / {ACHIEVEMENTS.length}</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {ACHIEVEMENTS.map(a => (
              <div
                key={a.id}
                className="w-3 h-3 rounded-full"
                style={{
                  background: earned.has(a.id) ? THEME.gold : 'rgba(255,255,255,0.15)',
                }}
              />
            ))}
          </div>
        </div>
      </Card>

      <div className="grid md:grid-cols-2 gap-4 stagger-in">
        {ACHIEVEMENTS.map(a => {
          const isEarned = earned.has(a.id);
          const Icon = a.icon;
          return (
            <Card
              key={a.id}
              className="p-5 flex items-start gap-4 hover-rise"
              style={{
                background: isEarned ? 'white' : THEME.paperDeep,
                borderColor: isEarned ? THEME.gold : THEME.line,
                opacity: isEarned ? 1 : 0.7,
              }}
            >
              <div
                className="w-14 h-14 rounded-xl flex items-center justify-center shrink-0"
                style={{
                  background: isEarned ? THEME.goldSoft : 'white',
                  border: `1px solid ${isEarned ? THEME.gold : THEME.line}`,
                }}
              >
                {isEarned ? (
                  <Icon size={26} style={{ color: THEME.gold }} />
                ) : (
                  <Lock size={22} style={{ color: THEME.muted }} />
                )}
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="font-display text-lg" style={{ color: isEarned ? THEME.ink : THEME.muted }}>
                    {a.title}
                  </h3>
                  {isEarned && (
                    <span className="pill" style={{ color: THEME.gold, background: THEME.goldSoft }}>
                      Earned
                    </span>
                  )}
                </div>
                <p className="text-sm" style={{ color: isEarned ? THEME.inkSoft : THEME.muted }}>
                  {a.desc}
                </p>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════
// STUDY PLAN — personalized day-by-day schedule
// ═══════════════════════════════════════════════════════════════════

function buildStudyPlan(profile, progress) {
  const today = todayISO();
  const target = profile.targetDate;
  const totalDays = Math.max(1, daysBetween(today, target));

  // Pull modules user actually needs to study, ordered by curriculum sequence,
  // then weighted toward whichever is least mastered.
  const focusFilter = (m) => {
    if (profile.focus === 'mechanics') return m.subjectId === 'mechanics';
    if (profile.focus === 'em') return m.subjectId === 'em';
    return true;
  };

  const modulesToStudy = allModules
    .filter(focusFilter)
    .map(m => ({
      ...m,
      mastery: computeMastery(progress, m.id),
    }));

  // Allocate study load across remaining days. Roughly: less mastered → more days.
  // Total weight = sum(100 - mastery + 30); the "+30" gives every module at least some review.
  const weights = modulesToStudy.map(m => Math.max(15, 100 - m.mastery + 30));
  const totalWeight = weights.reduce((a, b) => a + b, 0);

  // Assign at least 1 day per module if we have enough days
  const dayBudget = Math.max(modulesToStudy.length, totalDays);
  const allocations = weights.map(w => Math.max(1, Math.round((w / totalWeight) * dayBudget)));

  // Build the schedule day-by-day
  const schedule = [];
  let dayIdx = 0;
  modulesToStudy.forEach((m, mi) => {
    const days = allocations[mi];
    for (let d = 0; d < days; d++) {
      if (dayIdx >= totalDays && totalDays > 0) break;
      const date = new Date(today);
      date.setDate(date.getDate() + dayIdx);
      const dateISO = date.toISOString().slice(0, 10);

      // Decide what to do that day:
      // day 0 of module → lesson + checkpoint
      // day 1 → quiz
      // day 2+ → review + practice
      let task;
      if (d === 0) {
        task = { kind: 'lesson', label: 'Lesson + checkpoint', time: m.estimatedMinutes || 30 };
      } else if (d === 1 && days > 1) {
        task = { kind: 'quiz', label: 'Module quiz', time: 15 };
      } else {
        task = { kind: 'review', label: 'Review + practice problem', time: 20 };
      }

      schedule.push({
        date: dateISO,
        dayIdx,
        moduleId: m.id,
        moduleTitle: m.title,
        subjectId: m.subjectId,
        ...task,
      });
      dayIdx++;
    }
  });

  // Always reserve last 3 days for mock exams + review (if we have the budget)
  if (totalDays >= 4) {
    const examDays = Math.min(3, Math.floor(totalDays / 7) + 1);
    for (let i = examDays; i >= 1; i--) {
      const date = new Date(today);
      date.setDate(date.getDate() + (totalDays - i));
      const dateISO = date.toISOString().slice(0, 10);
      // Replace any existing entry for that day
      const existing = schedule.findIndex(s => s.date === dateISO);
      const examTask = {
        date: dateISO,
        dayIdx: totalDays - i,
        moduleId: null,
        moduleTitle: 'Mock Exam',
        subjectId: 'exam',
        kind: 'exam',
        label: i === 1 ? 'Final mock exam' : 'Full-length mock exam',
        time: 40,
      };
      if (existing >= 0) schedule[existing] = examTask;
      else schedule.push(examTask);
    }
  }

  // Sort by date and return
  schedule.sort((a, b) => a.date.localeCompare(b.date));
  return schedule;
}

function StudyPlanView({ profile, progress, setView }) {
  const [showAll, setShowAll] = useState(false);
  const plan = useMemo(() => buildStudyPlan(profile, progress), [profile, progress]);
  const today = todayISO();
  const todayTask = plan.find(t => t.date === today);
  const upcoming = plan.filter(t => t.date >= today);
  const visible = showAll ? upcoming : upcoming.slice(0, 14);
  const totalMinutes = upcoming.reduce((sum, t) => sum + (t.time || 0), 0);
  const examCount = upcoming.filter(t => t.kind === 'exam').length;
  const lessonCount = upcoming.filter(t => t.kind === 'lesson').length;

  const taskColor = (kind) => {
    if (kind === 'lesson') return THEME.accent;
    if (kind === 'quiz') return THEME.gold;
    if (kind === 'exam') return THEME.mech;
    return THEME.em;
  };

  const taskIcon = (kind) => {
    if (kind === 'lesson') return BookOpen;
    if (kind === 'quiz') return CheckCircle2;
    if (kind === 'exam') return FileText;
    return RotateCcw;
  };

  return (
    <div className="max-w-5xl mx-auto fade-in">
      <EmptyHeader
        eyebrow="Study Plan"
        title="Your path to exam day"
        subtitle={`A personalized schedule built around your target date and current mastery. Adjusts itself as you make progress.`}
      />

      {/* Hero summary */}
      <Card className="p-7 mb-6" style={{ background: THEME.ink, color: 'white' }}>
        <div className="grid md:grid-cols-4 gap-5">
          <div>
            <div className="pill mb-2" style={{ color: THEME.accentSoft, background: 'rgba(207,223,212,0.15)' }}>Days remaining</div>
            <div className="font-display text-5xl" style={{ letterSpacing: '-0.03em' }}>
              {Math.max(0, daysBetween(today, profile.targetDate))}
            </div>
            <div className="text-xs mt-1" style={{ color: 'rgba(255,255,255,0.6)' }}>until {formatDate(profile.targetDate)}</div>
          </div>
          <div>
            <div className="pill mb-2" style={{ color: THEME.accentSoft, background: 'rgba(207,223,212,0.15)' }}>Time budget</div>
            <div className="font-display text-5xl" style={{ letterSpacing: '-0.03em' }}>
              {Math.round(totalMinutes / 60)}<span className="text-lg ml-1" style={{ color: 'rgba(255,255,255,0.5)' }}>hr</span>
            </div>
            <div className="text-xs mt-1" style={{ color: 'rgba(255,255,255,0.6)' }}>{totalMinutes} min total</div>
          </div>
          <div>
            <div className="pill mb-2" style={{ color: THEME.accentSoft, background: 'rgba(207,223,212,0.15)' }}>Lessons ahead</div>
            <div className="font-display text-5xl" style={{ letterSpacing: '-0.03em' }}>{lessonCount}</div>
            <div className="text-xs mt-1" style={{ color: 'rgba(255,255,255,0.6)' }}>core sessions</div>
          </div>
          <div>
            <div className="pill mb-2" style={{ color: THEME.accentSoft, background: 'rgba(207,223,212,0.15)' }}>Mock exams</div>
            <div className="font-display text-5xl" style={{ letterSpacing: '-0.03em' }}>{examCount}</div>
            <div className="text-xs mt-1" style={{ color: 'rgba(255,255,255,0.6)' }}>scheduled</div>
          </div>
        </div>
      </Card>

      {/* Today's task */}
      {todayTask && (
        <Card className="p-6 mb-6 hover-rise" style={{ borderColor: taskColor(todayTask.kind), borderWidth: 2 }}>
          <div className="flex items-start gap-4">
            <div
              className="w-14 h-14 rounded-xl flex items-center justify-center shrink-0"
              style={{ background: taskColor(todayTask.kind), color: 'white' }}
            >
              {React.createElement(taskIcon(todayTask.kind), { size: 26 })}
            </div>
            <div className="flex-1">
              <div className="pill mb-1" style={{ color: taskColor(todayTask.kind) }}>Today · {formatDate(todayTask.date)}</div>
              <h3 className="font-display text-2xl mb-1">{todayTask.moduleTitle}</h3>
              <p className="text-sm" style={{ color: THEME.inkSoft }}>
                {todayTask.label} · approximately {todayTask.time} min
              </p>
            </div>
            <Button
              size="sm"
              onClick={() => {
                if (todayTask.kind === 'exam') setView({ type: 'exam' });
                else if (todayTask.kind === 'quiz') setView({ type: 'quiz', moduleId: todayTask.moduleId });
                else if (todayTask.kind === 'lesson') setView({ type: 'lesson', moduleId: todayTask.moduleId });
                else setView({ type: 'module', moduleId: todayTask.moduleId });
              }}
            >
              Start <ArrowRight size={14} />
            </Button>
          </div>
        </Card>
      )}

      {/* Schedule list */}
      <Card className="p-6 mb-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="font-display text-xl">Schedule</h3>
            <div className="text-sm" style={{ color: THEME.muted }}>
              {showAll ? `All ${upcoming.length} upcoming days` : `Next ${visible.length} days`}
            </div>
          </div>
          {upcoming.length > 14 && (
            <Button variant="ghost" size="sm" onClick={() => setShowAll(!showAll)}>
              {showAll ? 'Show less' : `Show all ${upcoming.length}`}
            </Button>
          )}
        </div>

        {visible.length === 0 ? (
          <div className="text-center py-10">
            <Calendar size={32} className="mx-auto mb-2 opacity-40" style={{ color: THEME.muted }} />
            <p className="text-sm" style={{ color: THEME.muted }}>
              Your study plan is empty. Update your target date in your profile.
            </p>
          </div>
        ) : (
          <div className="space-y-2">
            {visible.map((task, i) => {
              const isToday = task.date === today;
              const Icon = taskIcon(task.kind);
              const c = taskColor(task.kind);
              return (
                <div
                  key={`${task.date}-${i}`}
                  className="flex items-center gap-4 p-3 rounded-lg border transition cursor-pointer hover:bg-opacity-50"
                  style={{
                    borderColor: isToday ? c : THEME.line,
                    background: isToday ? 'white' : 'transparent',
                    borderWidth: isToday ? 2 : 1,
                  }}
                  onClick={() => {
                    if (task.kind === 'exam') setView({ type: 'exam' });
                    else if (task.kind === 'quiz') setView({ type: 'quiz', moduleId: task.moduleId });
                    else if (task.kind === 'lesson') setView({ type: 'lesson', moduleId: task.moduleId });
                    else if (task.moduleId) setView({ type: 'module', moduleId: task.moduleId });
                  }}
                >
                  <div className="text-center shrink-0 w-14">
                    <div className="text-[10px] uppercase tracking-wider" style={{ color: THEME.muted }}>
                      {new Date(task.date + 'T00:00').toLocaleDateString('en-US', { weekday: 'short' })}
                    </div>
                    <div className="font-display text-lg leading-none" style={{ color: isToday ? c : THEME.ink }}>
                      {new Date(task.date + 'T00:00').getDate()}
                    </div>
                  </div>
                  <div
                    className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0"
                    style={{ background: c + '20', color: c }}
                  >
                    <Icon size={17} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-medium truncate text-sm" style={{ color: THEME.ink }}>
                      {task.moduleTitle}
                    </div>
                    <div className="text-xs truncate" style={{ color: THEME.muted }}>
                      {task.label}
                    </div>
                  </div>
                  <div className="text-xs font-mono-x shrink-0" style={{ color: THEME.muted }}>
                    {task.time}m
                  </div>
                  <ChevronRight size={16} className="shrink-0 opacity-40" />
                </div>
              );
            })}
          </div>
        )}
      </Card>

      <Card className="p-5 flex items-start gap-3" style={{ background: THEME.paperDeep }}>
        <Lightbulb size={18} style={{ color: THEME.gold }} className="shrink-0 mt-0.5" />
        <div className="text-sm" style={{ color: THEME.inkSoft }}>
          <strong style={{ color: THEME.ink }}>How this plan works.</strong> Modules with lower mastery get more days. The plan reweights itself every time you complete something — so as you improve, the schedule shifts to spend less time on what you've mastered and more on weak spots. The last few days are reserved for full-length practice exams.
        </div>
      </Card>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════
// CUSTOM PRACTICE TEST — pick topics & length
// ═══════════════════════════════════════════════════════════════════

function CustomTestView({ setView, onCompleteExam }) {
  const allTopics = useMemo(() => {
    const topics = new Set();
    mockExamQuestions.forEach(q => topics.add(q.topic));
    return [...topics].sort();
  }, []);

  const [selectedTopics, setSelectedTopics] = useState(new Set(allTopics));
  const [length, setLength] = useState(10);
  const [timed, setTimed] = useState(true);
  const [stage, setStage] = useState('config'); // config | running | review
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [currentIdx, setCurrentIdx] = useState(0);
  const [timeLeft, setTimeLeft] = useState(0);
  const [result, setResult] = useState(null);

  const availableCount = mockExamQuestions.filter(q => selectedTopics.has(q.topic)).length;
  const actualLength = Math.min(length, availableCount);

  const toggleTopic = (topic) => {
    const next = new Set(selectedTopics);
    if (next.has(topic)) next.delete(topic);
    else next.add(topic);
    setSelectedTopics(next);
  };

  const startTest = () => {
    const pool = mockExamQuestions.filter(q => selectedTopics.has(q.topic));
    const shuffled = [...pool].map(q => ({ q, r: Math.random() })).sort((a, b) => a.r - b.r).map(x => x.q);
    const picked = shuffled.slice(0, actualLength);
    setQuestions(picked);
    setAnswers({});
    setCurrentIdx(0);
    setTimeLeft(timed ? actualLength * 90 : 0); // 90 sec per question if timed
    setStage('running');
  };

  const submitTest = useCallback(() => {
    let correct = 0;
    const breakdown = {};
    questions.forEach((q, i) => {
      const topic = q.topic;
      if (!breakdown[topic]) breakdown[topic] = { correct: 0, total: 0 };
      breakdown[topic].total += 1;
      if (answers[i] === q.correct) {
        correct += 1;
        breakdown[topic].correct += 1;
      }
    });
    const total = questions.length;
    const score = correct / total;
    const res = {
      name: `Custom Test · ${formatDate(todayISO())}`,
      date: todayISO(),
      score,
      correct,
      total,
      breakdown,
      questions,
      answers,
      isCustom: true,
    };
    setResult(res);
    onCompleteExam(res);
    setStage('review');
  }, [questions, answers, onCompleteExam]);

  // Countdown — split from expiration so it doesn't reset on every answer
  useEffect(() => {
    if (stage !== 'running' || !timed) return;
    if (timeLeft <= 0) return;
    const t = setTimeout(() => setTimeLeft(s => s - 1), 1000);
    return () => clearTimeout(t);
  }, [stage, timed, timeLeft]);

  useEffect(() => {
    if (stage === 'running' && timed && timeLeft <= 0) {
      submitTest();
    }
  }, [stage, timed, timeLeft, submitTest]);

  if (stage === 'config') {
    return (
      <div className="max-w-3xl mx-auto fade-in">
        <EmptyHeader
          eyebrow="Custom Practice Test"
          title="Build your own quiz"
          subtitle="Pick the topics, set the length, and choose whether to run against the clock."
        />

        <Card className="p-7 mb-5">
          <h3 className="font-display text-xl mb-1">Topics</h3>
          <p className="text-sm mb-4" style={{ color: THEME.muted }}>
            {selectedTopics.size} of {allTopics.length} selected · {availableCount} questions in pool
          </p>
          <div className="flex gap-2 mb-4 flex-wrap">
            <button
              onClick={() => setSelectedTopics(new Set(allTopics))}
              className="text-xs px-3 py-1 rounded-full border transition"
              style={{ borderColor: THEME.line, color: THEME.inkSoft }}
            >
              Select all
            </button>
            <button
              onClick={() => setSelectedTopics(new Set(allTopics.filter(t => {
                const m = allModules.find(mod => mod.title === t || t.toLowerCase().includes(mod.title.toLowerCase()));
                return m && m.subjectId === 'mechanics';
              })))}
              className="text-xs px-3 py-1 rounded-full border transition"
              style={{ borderColor: THEME.mech, color: THEME.mech, background: THEME.mechSoft }}
            >
              Mechanics only
            </button>
            <button
              onClick={() => setSelectedTopics(new Set(allTopics.filter(t => {
                const m = allModules.find(mod => mod.title === t || t.toLowerCase().includes(mod.title.toLowerCase()));
                return m && m.subjectId === 'em';
              })))}
              className="text-xs px-3 py-1 rounded-full border transition"
              style={{ borderColor: THEME.em, color: THEME.em, background: THEME.emSoft }}
            >
              E&M only
            </button>
            <button
              onClick={() => setSelectedTopics(new Set())}
              className="text-xs px-3 py-1 rounded-full border transition"
              style={{ borderColor: THEME.line, color: THEME.muted }}
            >
              Clear
            </button>
          </div>
          <div className="grid sm:grid-cols-2 gap-2">
            {allTopics.map(topic => {
              const isSelected = selectedTopics.has(topic);
              const count = mockExamQuestions.filter(q => q.topic === topic).length;
              return (
                <button
                  key={topic}
                  onClick={() => toggleTopic(topic)}
                  className="flex items-center justify-between gap-2 p-3 rounded-lg border text-sm transition text-left"
                  style={{
                    borderColor: isSelected ? THEME.accent : THEME.line,
                    background: isSelected ? THEME.accentSoft : 'white',
                    color: THEME.ink,
                  }}
                >
                  <span className="flex items-center gap-2 min-w-0">
                    <div
                      className="w-4 h-4 rounded shrink-0 border flex items-center justify-center"
                      style={{
                        background: isSelected ? THEME.accent : 'white',
                        borderColor: isSelected ? THEME.accent : THEME.line,
                      }}
                    >
                      {isSelected && <Check size={11} style={{ color: 'white' }} strokeWidth={3} />}
                    </div>
                    <span className="truncate">{topic}</span>
                  </span>
                  <span className="text-xs font-mono-x shrink-0" style={{ color: THEME.muted }}>{count}</span>
                </button>
              );
            })}
          </div>
        </Card>

        <Card className="p-7 mb-5">
          <h3 className="font-display text-xl mb-4">Length</h3>
          <div className="grid grid-cols-4 gap-2 mb-4">
            {[5, 10, 15, 20].map(n => (
              <button
                key={n}
                onClick={() => setLength(n)}
                disabled={n > availableCount && availableCount > 0}
                className="p-4 rounded-lg border text-center transition"
                style={{
                  borderColor: length === n ? THEME.ink : THEME.line,
                  background: length === n ? THEME.ink : 'white',
                  color: length === n ? 'white' : n > availableCount ? THEME.muted : THEME.ink,
                  opacity: n > availableCount ? 0.4 : 1,
                  borderWidth: length === n ? 2 : 1,
                }}
              >
                <div className="font-display text-2xl">{n}</div>
                <div className="text-xs" style={{ color: length === n ? 'rgba(255,255,255,0.7)' : THEME.muted }}>questions</div>
              </button>
            ))}
          </div>
          {actualLength < length && availableCount > 0 && (
            <p className="text-xs" style={{ color: THEME.gold }}>
              Only {availableCount} questions match your topics — your test will have {actualLength}.
            </p>
          )}
        </Card>

        <Card className="p-5 mb-6">
          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={timed}
              onChange={e => setTimed(e.target.checked)}
              className="w-4 h-4"
            />
            <div className="flex-1">
              <div className="font-medium text-sm">Timed mode</div>
              <div className="text-xs" style={{ color: THEME.muted }}>
                90 seconds per question · {timed ? `${Math.round(actualLength * 90 / 60)} min total` : 'no time limit'}
              </div>
            </div>
            <Timer size={18} style={{ color: timed ? THEME.accent : THEME.muted }} />
          </label>
        </Card>

        <div className="flex gap-3 justify-end">
          <Button variant="outline" onClick={() => setView({ type: 'exam' })}>
            Cancel
          </Button>
          <Button
            onClick={startTest}
            disabled={selectedTopics.size === 0 || availableCount === 0}
          >
            Start test ({actualLength} questions) <Play size={16} />
          </Button>
        </div>
      </div>
    );
  }

  if (stage === 'review' && result) {
    const pct = Math.round(result.score * 100);
    return (
      <div className="max-w-3xl mx-auto fade-in">
        <EmptyHeader
          eyebrow="Custom Test Complete"
          title={pct >= 80 ? 'Strong work.' : pct >= 60 ? 'Decent run.' : 'Useful feedback.'}
          subtitle="Review your answers, then build another test or return to the dashboard."
        />

        <Card className="p-7 mb-5" style={{ background: THEME.ink, color: 'white' }}>
          <div className="flex items-end justify-between flex-wrap gap-4">
            <div>
              <div className="pill mb-2" style={{ color: THEME.gold, background: 'rgba(196,148,52,0.15)' }}>Your score</div>
              <div className="font-display text-6xl" style={{ letterSpacing: '-0.03em' }}>{pct}%</div>
              <div className="text-sm mt-2" style={{ color: 'rgba(255,255,255,0.7)' }}>
                {result.correct} correct out of {result.total}
              </div>
            </div>
          </div>
        </Card>

        <Card className="p-6 mb-5">
          <h3 className="font-display text-xl mb-4">By topic</h3>
          <div className="space-y-3">
            {Object.entries(result.breakdown).map(([topic, b]) => {
              const p = b.correct / b.total;
              const c = p >= 0.7 ? THEME.success : p >= 0.4 ? THEME.gold : THEME.error;
              return (
                <div key={topic}>
                  <div className="flex justify-between text-sm mb-1">
                    <span style={{ color: THEME.ink }}>{topic}</span>
                    <span className="font-mono-x" style={{ color: c }}>{b.correct}/{b.total}</span>
                  </div>
                  <ProgressBar value={p * 100} color={c} />
                </div>
              );
            })}
          </div>
        </Card>

        <div className="flex gap-3 justify-end">
          <Button variant="outline" onClick={() => { setStage('config'); setResult(null); }}>
            Build another <RotateCcw size={16} />
          </Button>
          <Button onClick={() => setView({ type: 'dashboard' })}>
            Back to dashboard <ArrowRight size={16} />
          </Button>
        </div>
      </div>
    );
  }

  // Running test — reuse compact in-test layout
  const q = questions[currentIdx];
  const answered = Object.keys(answers).length;

  return (
    <div className="max-w-4xl mx-auto">
      <div
        className="sticky top-0 z-20 -mx-4 px-4 py-3 mb-5 border-b flex items-center justify-between flex-wrap gap-3"
        style={{ background: THEME.paper, borderColor: THEME.line }}
      >
        <div className="flex items-center gap-4">
          <div className="pill" style={{ color: THEME.accent }}>Custom Test</div>
          <div className="text-sm" style={{ color: THEME.inkSoft }}>
            <span className="font-mono-x font-semibold" style={{ color: THEME.ink }}>{currentIdx + 1}</span>
            <span className="opacity-50"> / {questions.length}</span>
            <span className="mx-2 opacity-40">·</span>
            <span className="font-mono-x">{answered}</span> answered
          </div>
        </div>
        <div className="flex items-center gap-3">
          {timed && (
            <div
              className="flex items-center gap-1.5 font-mono-x font-semibold px-3 py-1 rounded-md"
              style={{
                background: timeLeft < 60 ? '#fce5e0' : THEME.paperDeep,
                color: timeLeft < 60 ? THEME.error : THEME.ink,
              }}
            >
              <Timer size={16} />
              {Math.floor(timeLeft / 60)}:{String(timeLeft % 60).padStart(2, '0')}
            </div>
          )}
          <Button variant="outline" size="sm" onClick={submitTest}>
            Submit
          </Button>
        </div>
      </div>

      <Card className="p-7">
        <div className="flex items-center gap-2 mb-4">
          <span
            className="pill"
            style={{
              color: q.subject === 'mechanics' ? THEME.mech : THEME.em,
              background: q.subject === 'mechanics' ? THEME.mechSoft : THEME.emSoft,
            }}
          >
            {q.topic}
          </span>
        </div>
        <h2 className="font-display text-2xl mb-6 leading-snug" style={{ letterSpacing: '-0.015em' }}>
          {q.q}
        </h2>
        <div className="space-y-2 mb-6">
          {q.options.map((opt, i) => {
            const isSelected = answers[currentIdx] === i;
            return (
              <button
                key={i}
                onClick={() => setAnswers({ ...answers, [currentIdx]: i })}
                className="w-full text-left p-4 rounded-lg border flex items-center gap-3 transition"
                style={{
                  borderColor: isSelected ? THEME.ink : THEME.line,
                  background: isSelected ? THEME.paperDeep : 'white',
                  borderWidth: isSelected ? 2 : 1,
                }}
              >
                <span
                  className="w-7 h-7 rounded-full flex items-center justify-center font-mono-x text-xs shrink-0 border"
                  style={{
                    borderColor: isSelected ? THEME.ink : THEME.line,
                    background: isSelected ? THEME.ink : 'transparent',
                    color: isSelected ? 'white' : THEME.ink,
                  }}
                >
                  {String.fromCharCode(65 + i)}
                </span>
                <span className="flex-1 text-sm md:text-base">{opt}</span>
              </button>
            );
          })}
        </div>
        <div className="flex justify-between">
          <Button variant="outline" onClick={() => setCurrentIdx(Math.max(0, currentIdx - 1))} disabled={currentIdx === 0}>
            <ChevronLeft size={16} /> Previous
          </Button>
          {currentIdx < questions.length - 1 ? (
            <Button onClick={() => setCurrentIdx(currentIdx + 1)}>
              Next <ChevronRight size={16} />
            </Button>
          ) : (
            <Button onClick={submitTest}>
              Submit test <Check size={16} />
            </Button>
          )}
        </div>
      </Card>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════
// SIMULATOR — interactive projectile motion (SVG, no extra deps)
// ═══════════════════════════════════════════════════════════════════

function ProjectileSimulator() {
  const [v0, setV0] = useState(20);    // m/s
  const [angle, setAngle] = useState(45); // degrees
  const [g, setG] = useState(9.8);
  const [playing, setPlaying] = useState(false);
  const [t, setT] = useState(0);
  const animRef = useRef(null);

  const angleRad = (angle * Math.PI) / 180;
  const vx = v0 * Math.cos(angleRad);
  const vy0 = v0 * Math.sin(angleRad);
  const tFlight = (2 * vy0) / g;
  const range = vx * tFlight;
  const hMax = (vy0 * vy0) / (2 * g);

  // Build trajectory points
  const points = useMemo(() => {
    const arr = [];
    const steps = 80;
    for (let i = 0; i <= steps; i++) {
      const ti = (i / steps) * tFlight;
      const x = vx * ti;
      const y = vy0 * ti - 0.5 * g * ti * ti;
      arr.push({ x, y, t: ti });
    }
    return arr;
  }, [vx, vy0, g, tFlight]);

  // Animation
  useEffect(() => {
    if (!playing) return;
    let last = performance.now();
    const loop = (now) => {
      const dt = (now - last) / 1000;
      last = now;
      setT(prev => {
        const next = prev + dt;
        if (next >= tFlight) {
          setPlaying(false);
          return 0;
        }
        return next;
      });
      animRef.current = requestAnimationFrame(loop);
    };
    animRef.current = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(animRef.current);
  }, [playing, tFlight]);

  // Reset t when params change
  useEffect(() => {
    if (!playing) setT(0);
  }, [v0, angle, g, playing]);

  // Current ball position
  const ballX = vx * t;
  const ballY = vy0 * t - 0.5 * g * t * t;

  // SVG viewBox sizing — fit max range with padding
  const padding = 40;
  const maxX = Math.max(range, 1) * 1.1;
  const maxY = Math.max(hMax, 1) * 1.6;
  const W = 700;
  const H = 320;
  const sx = (x) => padding + (x / maxX) * (W - 2 * padding);
  const sy = (y) => H - padding - (y / maxY) * (H - 2 * padding);

  // Polyline path
  const pathStr = points.map(p => `${sx(p.x).toFixed(1)},${sy(p.y).toFixed(1)}`).join(' ');

  return (
    <Card className="p-6 mb-5">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="font-display text-xl">Projectile motion</h3>
          <p className="text-sm" style={{ color: THEME.muted }}>
            Launch a projectile and watch the parabola form. Drag the sliders to see how each parameter shapes the trajectory.
          </p>
        </div>
      </div>

      {/* SVG canvas */}
      <div
        className="rounded-lg border overflow-hidden mb-4"
        style={{ background: 'white', borderColor: THEME.line }}
      >
        <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-auto block">
          {/* Grid */}
          <defs>
            <pattern id="proj-grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke={THEME.line} strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width={W} height={H} fill="url(#proj-grid)" />
          {/* Ground line */}
          <line x1={padding} y1={H - padding} x2={W - padding} y2={H - padding} stroke={THEME.ink} strokeWidth="1.5" />
          {/* Origin marker */}
          <circle cx={sx(0)} cy={sy(0)} r="4" fill={THEME.ink} />
          {/* Trajectory polyline */}
          <polyline
            points={pathStr}
            fill="none"
            stroke={THEME.accent}
            strokeWidth="2"
            strokeOpacity="0.6"
            strokeDasharray="3 3"
          />
          {/* Apex marker */}
          <circle cx={sx(range / 2)} cy={sy(hMax)} r="3" fill={THEME.gold} />
          <text x={sx(range / 2) + 8} y={sy(hMax) + 4} fontSize="11" fill={THEME.gold} fontFamily="JetBrains Mono, monospace">
            h_max = {hMax.toFixed(1)} m
          </text>
          {/* Range marker */}
          <line
            x1={sx(range)} y1={sy(0) + 5}
            x2={sx(range)} y2={sy(0) + 18}
            stroke={THEME.mech} strokeWidth="1.5"
          />
          <text x={sx(range)} y={sy(0) + 32} fontSize="11" fill={THEME.mech} fontFamily="JetBrains Mono, monospace" textAnchor="middle">
            R = {range.toFixed(1)} m
          </text>
          {/* Velocity vector at launch */}
          {!playing && t === 0 && (
            <g>
              <line
                x1={sx(0)} y1={sy(0)}
                x2={sx(0) + Math.cos(angleRad) * 50}
                y2={sy(0) - Math.sin(angleRad) * 50}
                stroke={THEME.ink}
                strokeWidth="2"
                markerEnd="url(#proj-arrow)"
              />
              <defs>
                <marker id="proj-arrow" markerWidth="10" markerHeight="10" refX="8" refY="5" orient="auto">
                  <path d="M0,0 L10,5 L0,10 Z" fill={THEME.ink} />
                </marker>
              </defs>
            </g>
          )}
          {/* Ball */}
          <circle
            cx={sx(ballX)}
            cy={sy(ballY)}
            r="7"
            fill={THEME.mech}
            stroke="white"
            strokeWidth="2"
          />
        </svg>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-4 gap-3 mb-5">
        <div className="p-3 rounded-lg text-center" style={{ background: THEME.paperDeep }}>
          <div className="text-[10px] uppercase tracking-wider" style={{ color: THEME.muted }}>Range</div>
          <div className="font-mono-x font-semibold text-lg" style={{ color: THEME.mech }}>{range.toFixed(1)} m</div>
        </div>
        <div className="p-3 rounded-lg text-center" style={{ background: THEME.paperDeep }}>
          <div className="text-[10px] uppercase tracking-wider" style={{ color: THEME.muted }}>Max height</div>
          <div className="font-mono-x font-semibold text-lg" style={{ color: THEME.gold }}>{hMax.toFixed(1)} m</div>
        </div>
        <div className="p-3 rounded-lg text-center" style={{ background: THEME.paperDeep }}>
          <div className="text-[10px] uppercase tracking-wider" style={{ color: THEME.muted }}>Flight time</div>
          <div className="font-mono-x font-semibold text-lg" style={{ color: THEME.accent }}>{tFlight.toFixed(2)} s</div>
        </div>
        <div className="p-3 rounded-lg text-center" style={{ background: THEME.paperDeep }}>
          <div className="text-[10px] uppercase tracking-wider" style={{ color: THEME.muted }}>Current t</div>
          <div className="font-mono-x font-semibold text-lg" style={{ color: THEME.ink }}>{t.toFixed(2)} s</div>
        </div>
      </div>

      {/* Controls */}
      <div className="space-y-4">
        <div>
          <div className="flex justify-between text-sm mb-1.5">
            <label style={{ color: THEME.ink }}>Initial speed v₀</label>
            <span className="font-mono-x font-semibold">{v0} m/s</span>
          </div>
          <input
            type="range"
            min="5" max="50" step="1"
            value={v0}
            onChange={e => setV0(Number(e.target.value))}
            disabled={playing}
            className="w-full"
            style={{ accentColor: THEME.accent }}
          />
        </div>
        <div>
          <div className="flex justify-between text-sm mb-1.5">
            <label style={{ color: THEME.ink }}>Launch angle θ</label>
            <span className="font-mono-x font-semibold">{angle}°</span>
          </div>
          <input
            type="range"
            min="5" max="85" step="1"
            value={angle}
            onChange={e => setAngle(Number(e.target.value))}
            disabled={playing}
            className="w-full"
            style={{ accentColor: THEME.accent }}
          />
        </div>
        <div>
          <div className="flex justify-between text-sm mb-1.5">
            <label style={{ color: THEME.ink }}>Gravity g</label>
            <span className="font-mono-x font-semibold">{g} m/s²</span>
          </div>
          <input
            type="range"
            min="1.6" max="24.8" step="0.1"
            value={g}
            onChange={e => setG(Number(e.target.value))}
            disabled={playing}
            className="w-full"
            style={{ accentColor: THEME.accent }}
          />
          <div className="text-xs mt-1" style={{ color: THEME.muted }}>
            Earth: 9.8 · Moon: 1.6 · Mars: 3.7 · Jupiter: 24.8
          </div>
        </div>
      </div>

      <div className="flex gap-2 mt-5">
        <Button onClick={() => { setT(0); setPlaying(true); }} disabled={playing}>
          {playing ? 'Launching…' : 'Launch'} <Play size={14} />
        </Button>
        <Button variant="outline" onClick={() => { setPlaying(false); setT(0); }}>
          Reset <RotateCcw size={14} />
        </Button>
      </div>

      <div className="mt-5 p-4 rounded-lg" style={{ background: THEME.paperDeep }}>
        <div className="pill mb-2" style={{ color: THEME.accent }}>Try this</div>
        <ul className="text-sm space-y-1" style={{ color: THEME.inkSoft }}>
          <li>• Set θ = 45° — that's the angle that maximizes range on flat ground.</li>
          <li>• Try θ = 30° and θ = 60° with the same v₀. Notice the ranges match. (Why?)</li>
          <li>• Drop g to lunar gravity (1.6) — same launch travels much further.</li>
        </ul>
      </div>
    </Card>
  );
}

// ═══════════════════════════════════════════════════════════════════
// SHM — Mass on spring with optional damping
// ═══════════════════════════════════════════════════════════════════

function SHMSimulator() {
  const [k, setK] = useState(20);     // N/m (spring constant)
  const [m, setM] = useState(1);      // kg
  const [A, setA] = useState(0.6);    // m (amplitude)
  const [b, setB] = useState(0);      // damping (kg/s)
  const [playing, setPlaying] = useState(true);
  const [t, setT] = useState(0);
  const animRef = useRef(null);

  const omega0 = Math.sqrt(k / m);
  // Damped angular frequency: ω = sqrt(ω₀² - (b/2m)²)
  const gamma = b / (2 * m);
  const omegaD = omega0 > gamma ? Math.sqrt(omega0 * omega0 - gamma * gamma) : 0;
  const T = (2 * Math.PI) / (omegaD || omega0);
  const isUnderdamped = gamma < omega0;

  // x(t) for the simulation
  const x = isUnderdamped
    ? A * Math.exp(-gamma * t) * Math.cos(omegaD * t)
    : A * Math.exp(-gamma * t); // overdamped/critical — just decays

  // Animation
  useEffect(() => {
    if (!playing) return;
    let last = performance.now();
    const loop = (now) => {
      const dt = (now - last) / 1000;
      last = now;
      setT(prev => prev + dt);
      animRef.current = requestAnimationFrame(loop);
    };
    animRef.current = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(animRef.current);
  }, [playing]);

  // SVG layout
  const W = 700, H = 240;
  const wallX = 60;
  const eqX = 350;     // equilibrium x position
  const massSize = 44;
  const xPx = eqX + x * 200;  // 200 px per meter

  // Build the spring as a zigzag path
  const numCoils = 12;
  const springPath = (() => {
    const startX = wallX + 8;
    const endX = xPx - massSize / 2;
    const length = endX - startX;
    const segLen = length / (numCoils * 2);
    const ampY = 16;
    let pts = [`M ${startX} ${H / 2}`];
    for (let i = 0; i < numCoils * 2; i++) {
      const px = startX + (i + 1) * segLen;
      const py = H / 2 + (i % 2 === 0 ? -ampY : ampY);
      pts.push(`L ${px} ${py}`);
    }
    pts.push(`L ${endX} ${H / 2}`);
    return pts.join(' ');
  })();

  // x(t) graph data
  const graphPoints = useMemo(() => {
    const arr = [];
    const totalGraphTime = 2 * T;
    const steps = 120;
    for (let i = 0; i <= steps; i++) {
      const ti = (i / steps) * totalGraphTime;
      const xi = isUnderdamped
        ? A * Math.exp(-gamma * ti) * Math.cos(omegaD * ti)
        : A * Math.exp(-gamma * ti);
      arr.push({ t: ti, x: xi });
    }
    return arr;
  }, [T, A, gamma, omegaD, isUnderdamped]);

  return (
    <Card className="p-6 mb-5">
      <div className="mb-4">
        <h3 className="font-display text-xl">Mass on a spring (SHM)</h3>
        <p className="text-sm" style={{ color: THEME.muted }}>
          Drag the sliders to feel how spring stiffness, mass, and damping shape the oscillation.
        </p>
      </div>

      <div className="rounded-lg border overflow-hidden mb-4" style={{ background: 'white', borderColor: THEME.line }}>
        <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-auto block">
          {/* Wall */}
          <pattern id="wall-hatch" width="6" height="6" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
            <line x1="0" y1="0" x2="0" y2="6" stroke={THEME.muted} strokeWidth="1.2" />
          </pattern>
          <rect x={wallX - 12} y={H/2 - 60} width="14" height="120" fill="url(#wall-hatch)" />
          <line x1={wallX + 2} y1={H/2 - 60} x2={wallX + 2} y2={H/2 + 60} stroke={THEME.ink} strokeWidth="2" />
          {/* Equilibrium dashed line */}
          <line x1={eqX} y1={H/2 - 70} x2={eqX} y2={H/2 + 70} stroke={THEME.muted} strokeWidth="1" strokeDasharray="4 4" />
          <text x={eqX} y={H/2 + 88} fontSize="11" fill={THEME.muted} fontFamily="JetBrains Mono, monospace" textAnchor="middle">x = 0</text>
          {/* Spring path */}
          <path d={springPath} stroke={THEME.accent} strokeWidth="2.5" fill="none" />
          {/* Mass */}
          <rect
            x={xPx - massSize / 2}
            y={H/2 - massSize / 2}
            width={massSize}
            height={massSize}
            rx="4"
            fill={THEME.mech}
            stroke={THEME.ink}
            strokeWidth="2"
          />
          <text x={xPx} y={H/2 + 5} fontSize="14" fill="white" fontFamily="DM Sans, sans-serif" textAnchor="middle" fontWeight="600">m</text>
          {/* Position label */}
          <text x={xPx} y={H/2 - massSize/2 - 10} fontSize="11" fill={THEME.ink} fontFamily="JetBrains Mono, monospace" textAnchor="middle">
            x = {x.toFixed(2)} m
          </text>
        </svg>
      </div>

      {/* x(t) graph */}
      <div className="rounded-lg border overflow-hidden mb-5" style={{ background: 'white', borderColor: THEME.line, padding: 12 }}>
        <div className="text-xs mb-2" style={{ color: THEME.muted }}>x(t) — position vs. time</div>
        <svg viewBox="0 0 600 140" className="w-full h-auto block">
          {/* Axes */}
          <line x1="40" y1="70" x2="580" y2="70" stroke={THEME.line} strokeWidth="1" />
          <line x1="40" y1="20" x2="40" y2="120" stroke={THEME.line} strokeWidth="1" />
          {/* Trajectory */}
          <polyline
            points={graphPoints.map(p => {
              const px = 40 + (p.t / (2 * T)) * 540;
              const py = 70 - (p.x / (A || 1)) * 45;
              return `${px.toFixed(1)},${py.toFixed(1)}`;
            }).join(' ')}
            fill="none" stroke={THEME.accent} strokeWidth="2"
          />
          {/* Current time marker */}
          <line
            x1={40 + ((t % (2 * T)) / (2 * T)) * 540}
            y1="20"
            x2={40 + ((t % (2 * T)) / (2 * T)) * 540}
            y2="120"
            stroke={THEME.mech} strokeWidth="1.5" strokeDasharray="3 3"
          />
          <circle
            cx={40 + ((t % (2 * T)) / (2 * T)) * 540}
            cy={70 - (x / (A || 1)) * 45}
            r="4"
            fill={THEME.mech}
          />
          <text x="42" y="18" fontSize="10" fill={THEME.muted} fontFamily="JetBrains Mono, monospace">+A</text>
          <text x="42" y="125" fontSize="10" fill={THEME.muted} fontFamily="JetBrains Mono, monospace">−A</text>
          <text x="575" y="85" fontSize="10" fill={THEME.muted} fontFamily="JetBrains Mono, monospace" textAnchor="end">t</text>
        </svg>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-5">
        <div className="p-3 rounded-lg text-center" style={{ background: THEME.paperDeep }}>
          <div className="text-[10px] uppercase tracking-wider" style={{ color: THEME.muted }}>ω₀</div>
          <div className="font-mono-x font-semibold text-base" style={{ color: THEME.accent }}>{omega0.toFixed(2)} rad/s</div>
        </div>
        <div className="p-3 rounded-lg text-center" style={{ background: THEME.paperDeep }}>
          <div className="text-[10px] uppercase tracking-wider" style={{ color: THEME.muted }}>Period T</div>
          <div className="font-mono-x font-semibold text-base" style={{ color: THEME.gold }}>{T.toFixed(2)} s</div>
        </div>
        <div className="p-3 rounded-lg text-center" style={{ background: THEME.paperDeep }}>
          <div className="text-[10px] uppercase tracking-wider" style={{ color: THEME.muted }}>Frequency</div>
          <div className="font-mono-x font-semibold text-base" style={{ color: THEME.mech }}>{(1/T).toFixed(2)} Hz</div>
        </div>
        <div className="p-3 rounded-lg text-center" style={{ background: THEME.paperDeep }}>
          <div className="text-[10px] uppercase tracking-wider" style={{ color: THEME.muted }}>Damping</div>
          <div className="font-mono-x font-semibold text-base" style={{ color: THEME.ink }}>
            {b === 0 ? 'none' : isUnderdamped ? 'under' : 'over/crit'}
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <SimSlider label="Spring constant k" value={k} setValue={setK} min={5} max={80} step={1} unit="N/m" />
        <SimSlider label="Mass m" value={m} setValue={setM} min={0.2} max={5} step={0.1} unit="kg" />
        <SimSlider label="Initial amplitude A" value={A} setValue={setA} min={0.1} max={1.5} step={0.05} unit="m" />
        <SimSlider label="Damping b" value={b} setValue={setB} min={0} max={5} step={0.05} unit="kg/s" />
      </div>

      <div className="flex gap-2 mt-5">
        <Button onClick={() => setPlaying(!playing)} size="sm">
          {playing ? 'Pause' : 'Play'} <Play size={14} />
        </Button>
        <Button variant="outline" size="sm" onClick={() => { setT(0); }}>
          Reset time <RotateCcw size={14} />
        </Button>
      </div>

      <div className="mt-5 p-4 rounded-lg" style={{ background: THEME.paperDeep }}>
        <div className="pill mb-2" style={{ color: THEME.accent }}>Try this</div>
        <ul className="text-sm space-y-1" style={{ color: THEME.inkSoft }}>
          <li>• Quadruple k. Period halves — because T ∝ √(m/k).</li>
          <li>• Slowly raise damping. The amplitude envelope decays exponentially.</li>
          <li>• Push damping past critical (≈ 2√(km)). The oscillation dies — no overshoot.</li>
        </ul>
      </div>
    </Card>
  );
}

// ═══════════════════════════════════════════════════════════════════
// ELECTRIC FIELD LINES — drag charges, see the field
// ═══════════════════════════════════════════════════════════════════

function ElectricFieldSimulator() {
  // Default configuration: a dipole
  const [charges, setCharges] = useState([
    { id: 1, x: 250, y: 200, q: 1 },
    { id: 2, x: 450, y: 200, q: -1 },
  ]);
  const [showLines, setShowLines] = useState(true);
  const [showArrows, setShowArrows] = useState(true);
  const [draggingId, setDraggingId] = useState(null);
  const svgRef = useRef(null);

  const W = 700, H = 400;

  // Compute electric field at a point
  const fieldAt = (x, y) => {
    let Ex = 0, Ey = 0;
    charges.forEach(c => {
      const dx = x - c.x;
      const dy = y - c.y;
      const r2 = dx * dx + dy * dy;
      if (r2 < 100) return; // avoid singularity near a charge
      const r = Math.sqrt(r2);
      const k = 50000; // arbitrary scaling
      const E = (k * c.q) / r2;
      Ex += E * (dx / r);
      Ey += E * (dy / r);
    });
    return { Ex, Ey };
  };

  // Generate field lines starting from positive charges
  const fieldLines = useMemo(() => {
    if (!showLines) return [];
    const lines = [];
    const linesPerCharge = 12;
    charges.forEach(c => {
      if (c.q <= 0) return;
      const numLines = Math.round(linesPerCharge * Math.abs(c.q));
      for (let i = 0; i < numLines; i++) {
        const angle = (i / numLines) * 2 * Math.PI;
        const path = [];
        let x = c.x + 18 * Math.cos(angle);
        let y = c.y + 18 * Math.sin(angle);
        path.push(`M ${x.toFixed(1)} ${y.toFixed(1)}`);

        for (let step = 0; step < 250; step++) {
          const { Ex, Ey } = fieldAt(x, y);
          const mag = Math.sqrt(Ex * Ex + Ey * Ey);
          if (mag < 0.01) break;
          const dx = (Ex / mag) * 4;
          const dy = (Ey / mag) * 4;
          x += dx;
          y += dy;
          if (x < 0 || x > W || y < 0 || y > H) break;
          // Stop near a negative charge
          let nearNeg = false;
          for (const cc of charges) {
            if (cc.q < 0) {
              const d = Math.hypot(x - cc.x, y - cc.y);
              if (d < 18) { nearNeg = true; break; }
            }
          }
          path.push(`L ${x.toFixed(1)} ${y.toFixed(1)}`);
          if (nearNeg) break;
        }
        lines.push(path.join(' '));
      }
    });
    return lines;
  }, [charges, showLines]);

  // Background arrow grid (vector field at sample points)
  const arrows = useMemo(() => {
    if (!showArrows) return [];
    const arr = [];
    const spacing = 50;
    for (let x = spacing; x < W; x += spacing) {
      for (let y = spacing; y < H; y += spacing) {
        // Skip if very close to a charge
        let near = false;
        for (const c of charges) {
          if (Math.hypot(x - c.x, y - c.y) < 30) { near = true; break; }
        }
        if (near) continue;
        const { Ex, Ey } = fieldAt(x, y);
        const mag = Math.sqrt(Ex * Ex + Ey * Ey);
        if (mag < 0.05) continue;
        const len = Math.min(20, Math.log10(1 + mag * 10) * 7);
        const ux = (Ex / mag) * len;
        const uy = (Ey / mag) * len;
        arr.push({ x, y, ux, uy, mag });
      }
    }
    return arr;
  }, [charges, showArrows]);

  // Drag handlers
  const handlePointerMove = (e) => {
    if (draggingId === null) return;
    const svg = svgRef.current;
    if (!svg) return;
    const pt = svg.createSVGPoint();
    pt.x = e.clientX;
    pt.y = e.clientY;
    const ctm = svg.getScreenCTM();
    if (!ctm) return;
    const local = pt.matrixTransform(ctm.inverse());
    setCharges(prev => prev.map(c => c.id === draggingId
      ? { ...c, x: Math.max(20, Math.min(W - 20, local.x)), y: Math.max(20, Math.min(H - 20, local.y)) }
      : c
    ));
  };

  const addCharge = (sign) => {
    const id = Math.max(0, ...charges.map(c => c.id)) + 1;
    setCharges([...charges, { id, x: 350 + (Math.random() - 0.5) * 200, y: 200 + (Math.random() - 0.5) * 100, q: sign }]);
  };

  const removeCharge = (id) => {
    setCharges(charges.filter(c => c.id !== id));
  };

  const presets = {
    dipole: [
      { id: 1, x: 250, y: 200, q: 1 },
      { id: 2, x: 450, y: 200, q: -1 },
    ],
    parallel: [
      { id: 1, x: 200, y: 150, q: 1 },
      { id: 2, x: 200, y: 250, q: 1 },
      { id: 3, x: 500, y: 150, q: -1 },
      { id: 4, x: 500, y: 250, q: -1 },
    ],
    quadrupole: [
      { id: 1, x: 250, y: 150, q: 1 },
      { id: 2, x: 450, y: 250, q: 1 },
      { id: 3, x: 450, y: 150, q: -1 },
      { id: 4, x: 250, y: 250, q: -1 },
    ],
  };

  return (
    <Card className="p-6 mb-5">
      <div className="mb-4">
        <h3 className="font-display text-xl">Electric field lines</h3>
        <p className="text-sm" style={{ color: THEME.muted }}>
          Drag the charges to see how the field reshapes itself. Lines flow from + to −.
        </p>
      </div>

      <div className="flex gap-2 flex-wrap mb-3">
        <Button size="sm" variant="outline" onClick={() => setCharges(presets.dipole)}>Dipole</Button>
        <Button size="sm" variant="outline" onClick={() => setCharges(presets.parallel)}>Parallel plates</Button>
        <Button size="sm" variant="outline" onClick={() => setCharges(presets.quadrupole)}>Quadrupole</Button>
        <span style={{ flex: 1 }} />
        <Button size="sm" onClick={() => addCharge(1)}>+ charge</Button>
        <Button size="sm" variant="outline" onClick={() => addCharge(-1)}>− charge</Button>
      </div>

      <div className="rounded-lg border overflow-hidden mb-4" style={{ background: 'white', borderColor: THEME.line }}>
        <svg
          ref={svgRef}
          viewBox={`0 0 ${W} ${H}`}
          className="w-full h-auto block"
          style={{ touchAction: 'none', cursor: draggingId ? 'grabbing' : 'default' }}
          onPointerMove={handlePointerMove}
          onPointerUp={() => setDraggingId(null)}
          onPointerLeave={() => setDraggingId(null)}
        >
          {/* Grid */}
          <defs>
            <pattern id="ef-grid" width="50" height="50" patternUnits="userSpaceOnUse">
              <path d="M 50 0 L 0 0 0 50" fill="none" stroke={THEME.line} strokeWidth="0.5" />
            </pattern>
            <marker id="ef-arrow" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
              <path d="M0,0 L6,3 L0,6 Z" fill={THEME.em} fillOpacity="0.7" />
            </marker>
          </defs>
          <rect width={W} height={H} fill="url(#ef-grid)" />

          {/* Vector field arrows */}
          {arrows.map((a, i) => (
            <line
              key={i}
              x1={a.x} y1={a.y}
              x2={a.x + a.ux} y2={a.y + a.uy}
              stroke={THEME.em}
              strokeWidth="1.2"
              strokeOpacity={Math.min(0.7, 0.3 + Math.log10(1 + a.mag * 5) * 0.15)}
              markerEnd="url(#ef-arrow)"
            />
          ))}

          {/* Field lines */}
          {fieldLines.map((path, i) => (
            <path key={i} d={path} stroke={THEME.accent} strokeWidth="1.5" fill="none" strokeOpacity="0.7" />
          ))}

          {/* Charges */}
          {charges.map(c => (
            <g key={c.id} style={{ cursor: 'grab' }}>
              <circle
                cx={c.x} cy={c.y} r="18"
                fill={c.q > 0 ? THEME.mech : THEME.em}
                stroke="white" strokeWidth="3"
                onPointerDown={(e) => { e.target.setPointerCapture?.(e.pointerId); setDraggingId(c.id); }}
              />
              <text
                x={c.x} y={c.y + 6} fontSize="20" fill="white" fontWeight="700"
                textAnchor="middle" pointerEvents="none"
                fontFamily="DM Sans, sans-serif"
              >
                {c.q > 0 ? '+' : '−'}
              </text>
              {charges.length > 1 && (
                <circle
                  cx={c.x + 14} cy={c.y - 14} r="7"
                  fill="white" stroke={THEME.line} strokeWidth="1"
                  style={{ cursor: 'pointer' }}
                  onClick={() => removeCharge(c.id)}
                />
              )}
              {charges.length > 1 && (
                <text
                  x={c.x + 14} y={c.y - 11} fontSize="11" fill={THEME.muted}
                  textAnchor="middle" pointerEvents="none"
                  fontFamily="DM Sans, sans-serif"
                >×</text>
              )}
            </g>
          ))}
        </svg>
      </div>

      <div className="flex gap-3 flex-wrap">
        <label className="flex items-center gap-2 text-sm cursor-pointer">
          <input type="checkbox" checked={showLines} onChange={e => setShowLines(e.target.checked)} className="w-4 h-4" />
          Field lines
        </label>
        <label className="flex items-center gap-2 text-sm cursor-pointer">
          <input type="checkbox" checked={showArrows} onChange={e => setShowArrows(e.target.checked)} className="w-4 h-4" />
          Vector arrows
        </label>
      </div>

      <div className="mt-5 p-4 rounded-lg" style={{ background: THEME.paperDeep }}>
        <div className="pill mb-2" style={{ color: THEME.accent }}>Try this</div>
        <ul className="text-sm space-y-1" style={{ color: THEME.inkSoft }}>
          <li>• Drag the two charges close together. The dipole field crowds between them.</li>
          <li>• Click "Parallel plates" — between the plates, the field becomes nearly uniform.</li>
          <li>• Add a third charge of either sign and see where the lines reroute.</li>
        </ul>
      </div>
    </Card>
  );
}

// ═══════════════════════════════════════════════════════════════════
// RC CIRCUIT — charging / discharging capacitor
// ═══════════════════════════════════════════════════════════════════

function RCCircuitSimulator() {
  const [V, setV] = useState(9);      // volts (battery)
  const [R, setR] = useState(1000);   // ohms
  const [C, setC] = useState(0.001);  // farads
  const [mode, setMode] = useState('charging'); // 'charging' | 'discharging'
  const [t, setT] = useState(0);
  const [playing, setPlaying] = useState(true);
  const [speed, setSpeed] = useState(1);
  const animRef = useRef(null);

  const tau = R * C;

  // q(t) and i(t)
  const Q_max = C * V;
  const q = mode === 'charging'
    ? Q_max * (1 - Math.exp(-t / tau))
    : Q_max * Math.exp(-t / tau);
  const Vc = q / C;
  const i = mode === 'charging'
    ? (V / R) * Math.exp(-t / tau)
    : -(V / R) * Math.exp(-t / tau);

  useEffect(() => {
    if (!playing) return;
    let last = performance.now();
    const loop = (now) => {
      const dt = (now - last) / 1000 * speed;
      last = now;
      setT(prev => Math.min(prev + dt, 5 * tau));
      animRef.current = requestAnimationFrame(loop);
    };
    animRef.current = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(animRef.current);
  }, [playing, speed, tau]);

  // Reset when mode or params change
  useEffect(() => { setT(0); }, [mode, R, C, V]);

  // Graph data: q(t)/Q_max as percentage
  const graphPoints = useMemo(() => {
    const arr = [];
    const steps = 80;
    const totalTime = 5 * tau;
    for (let s = 0; s <= steps; s++) {
      const ti = (s / steps) * totalTime;
      const qi = mode === 'charging'
        ? Q_max * (1 - Math.exp(-ti / tau))
        : Q_max * Math.exp(-ti / tau);
      arr.push({ t: ti, q: qi / Q_max });
    }
    return arr;
  }, [mode, tau, Q_max]);

  const W = 700, H = 280;
  const fillPct = q / Q_max;

  return (
    <Card className="p-6 mb-5">
      <div className="mb-4">
        <h3 className="font-display text-xl">RC circuit</h3>
        <p className="text-sm" style={{ color: THEME.muted }}>
          Watch a capacitor charge or discharge through a resistor. The time constant τ = RC sets the pace.
        </p>
      </div>

      <div className="flex gap-2 mb-4">
        <Button size="sm" onClick={() => { setMode('charging'); setT(0); }} variant={mode === 'charging' ? 'primary' : 'outline'}>
          Charging
        </Button>
        <Button size="sm" onClick={() => { setMode('discharging'); setT(0); }} variant={mode === 'discharging' ? 'primary' : 'outline'}>
          Discharging
        </Button>
      </div>

      {/* Circuit diagram */}
      <div className="rounded-lg border overflow-hidden mb-4" style={{ background: 'white', borderColor: THEME.line }}>
        <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-auto block">
          {/* Wires */}
          <g stroke={THEME.ink} strokeWidth="2.5" fill="none">
            {/* Top wire */}
            <line x1="120" y1="80" x2="320" y2="80" />
            <line x1="380" y1="80" x2="580" y2="80" />
            {/* Right wire */}
            <line x1="580" y1="80" x2="580" y2="180" />
            <line x1="580" y1="220" x2="580" y2="240" />
            <line x1="580" y1="240" x2="120" y2="240" />
            {/* Left wire */}
            <line x1="120" y1="240" x2="120" y2="80" />
          </g>

          {/* Battery (only in charging mode) */}
          {mode === 'charging' ? (
            <g>
              <line x1="115" y1="150" x2="125" y2="150" stroke={THEME.ink} strokeWidth="2" />
              <line x1="105" y1="170" x2="135" y2="170" stroke={THEME.ink} strokeWidth="3" />
              <line x1="115" y1="190" x2="125" y2="190" stroke={THEME.ink} strokeWidth="2" />
              <line x1="105" y1="210" x2="135" y2="210" stroke={THEME.ink} strokeWidth="3" />
              <text x="92" y="155" fontSize="11" fill={THEME.ink} fontFamily="JetBrains Mono, monospace" textAnchor="end">+</text>
              <text x="92" y="215" fontSize="11" fill={THEME.ink} fontFamily="JetBrains Mono, monospace" textAnchor="end">−</text>
              <text x="92" y="180" fontSize="13" fill={THEME.accent} fontFamily="JetBrains Mono, monospace" textAnchor="end" fontWeight="600">{V}V</text>
            </g>
          ) : (
            // Wire instead of battery for discharging
            <line x1="120" y1="80" x2="120" y2="240" stroke={THEME.ink} strokeWidth="2.5" />
          )}

          {/* Resistor (zigzag) */}
          <g>
            <path d="M 320 80 L 330 70 L 345 90 L 360 70 L 375 90 L 380 80" stroke={THEME.mech} strokeWidth="2.5" fill="none" />
            <text x="350" y="55" fontSize="12" fill={THEME.mech} fontFamily="JetBrains Mono, monospace" textAnchor="middle" fontWeight="600">R = {R}Ω</text>
          </g>

          {/* Capacitor */}
          <g>
            <line x1="580" y1="180" x2="580" y2="180" stroke={THEME.ink} />
            <line x1="555" y1="180" x2="605" y2="180" stroke={THEME.em} strokeWidth="3" />
            <line x1="555" y1="220" x2="605" y2="220" stroke={THEME.em} strokeWidth="3" />
            {/* Charge indicator on plates */}
            <rect
              x="555" y={180 - 4 - 12 * fillPct}
              width="50" height={12 * fillPct}
              fill={THEME.em}
              opacity="0.4"
            />
            <rect
              x="555" y="220"
              width="50" height={12 * fillPct}
              fill={THEME.em}
              opacity="0.4"
              transform={`translate(0, ${4})`}
            />
            <text x="615" y="185" fontSize="11" fill={THEME.em} fontFamily="JetBrains Mono, monospace" fontWeight="600">+</text>
            <text x="615" y="225" fontSize="11" fill={THEME.em} fontFamily="JetBrains Mono, monospace" fontWeight="600">−</text>
            <text x="620" y="205" fontSize="12" fill={THEME.em} fontFamily="JetBrains Mono, monospace" fontWeight="600">C = {(C*1000).toFixed(2)}mF</text>
          </g>

          {/* Current indicator (animated dot) */}
          {Math.abs(i) > 0.0001 && (() => {
            // Position dot along the loop based on time
            const loopT = (t * 2) % 4;  // 0..4 cycles around the loop
            const isCharging = mode === 'charging';
            // simple single dot moving CW (charging) or CCW (discharging)
            let dotX, dotY;
            if (loopT < 1) {  // top wire: left to right (charging) or right to left (discharging)
              const f = loopT;
              dotX = isCharging ? 130 + f * 440 : 570 - f * 440;
              dotY = 80;
            } else if (loopT < 2) {
              const f = loopT - 1;
              dotX = isCharging ? 580 : 120;
              dotY = isCharging ? 80 + f * 160 : 240 - f * 160;
            } else if (loopT < 3) {
              const f = loopT - 2;
              dotX = isCharging ? 580 - f * 440 : 130 + f * 440;
              dotY = 240;
            } else {
              const f = loopT - 3;
              dotX = isCharging ? 130 : 580;
              dotY = isCharging ? 240 - f * 160 : 80 + f * 160;
            }
            return (
              <circle cx={dotX} cy={dotY} r="5" fill={THEME.gold} stroke={THEME.ink} strokeWidth="1" opacity={Math.min(1, Math.abs(i) * 100)} />
            );
          })()}
        </svg>
      </div>

      {/* q(t) and i(t) graphs */}
      <div className="grid md:grid-cols-2 gap-3 mb-5">
        <div className="rounded-lg border p-3" style={{ background: 'white', borderColor: THEME.line }}>
          <div className="text-xs mb-2" style={{ color: THEME.muted }}>Charge q(t) / Q_max</div>
          <svg viewBox="0 0 300 100" className="w-full h-auto block">
            <line x1="20" y1="90" x2="290" y2="90" stroke={THEME.line} />
            <line x1="20" y1="10" x2="20" y2="90" stroke={THEME.line} />
            <polyline
              points={graphPoints.map(p => `${20 + (p.t / (5 * tau)) * 270},${90 - p.q * 75}`).join(' ')}
              fill="none" stroke={THEME.em} strokeWidth="2"
            />
            <line x1={20 + (Math.min(t, 5 * tau) / (5 * tau)) * 270} y1="10" x2={20 + (Math.min(t, 5 * tau) / (5 * tau)) * 270} y2="90"
              stroke={THEME.mech} strokeWidth="1" strokeDasharray="2 3" />
            <text x="22" y="20" fontSize="9" fill={THEME.muted} fontFamily="JetBrains Mono, monospace">1.0</text>
            <text x="22" y="93" fontSize="9" fill={THEME.muted} fontFamily="JetBrains Mono, monospace">0</text>
            {/* τ marker */}
            <line x1={20 + (1 / 5) * 270} y1="85" x2={20 + (1 / 5) * 270} y2="93" stroke={THEME.muted} strokeWidth="1" />
            <text x={20 + (1 / 5) * 270} y="103" fontSize="9" fill={THEME.muted} fontFamily="JetBrains Mono, monospace" textAnchor="middle">τ</text>
          </svg>
        </div>
        <div className="rounded-lg border p-3" style={{ background: 'white', borderColor: THEME.line }}>
          <div className="text-xs mb-2" style={{ color: THEME.muted }}>Current i(t) / i_max</div>
          <svg viewBox="0 0 300 100" className="w-full h-auto block">
            <line x1="20" y1="50" x2="290" y2="50" stroke={THEME.line} />
            <line x1="20" y1="10" x2="20" y2="90" stroke={THEME.line} />
            <polyline
              points={graphPoints.map(p => {
                const i_norm = mode === 'charging' ? Math.exp(-p.t / tau) : -Math.exp(-p.t / tau);
                return `${20 + (p.t / (5 * tau)) * 270},${50 - i_norm * 35}`;
              }).join(' ')}
              fill="none" stroke={THEME.mech} strokeWidth="2"
            />
            <text x="22" y="20" fontSize="9" fill={THEME.muted} fontFamily="JetBrains Mono, monospace">+1</text>
            <text x="22" y="53" fontSize="9" fill={THEME.muted} fontFamily="JetBrains Mono, monospace">0</text>
            <text x="22" y="93" fontSize="9" fill={THEME.muted} fontFamily="JetBrains Mono, monospace">−1</text>
          </svg>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-5">
        <div className="p-3 rounded-lg text-center" style={{ background: THEME.paperDeep }}>
          <div className="text-[10px] uppercase tracking-wider" style={{ color: THEME.muted }}>Time constant</div>
          <div className="font-mono-x font-semibold text-base" style={{ color: THEME.accent }}>τ = {tau.toFixed(2)}s</div>
        </div>
        <div className="p-3 rounded-lg text-center" style={{ background: THEME.paperDeep }}>
          <div className="text-[10px] uppercase tracking-wider" style={{ color: THEME.muted }}>Time elapsed</div>
          <div className="font-mono-x font-semibold text-base" style={{ color: THEME.ink }}>{t.toFixed(2)}s</div>
        </div>
        <div className="p-3 rounded-lg text-center" style={{ background: THEME.paperDeep }}>
          <div className="text-[10px] uppercase tracking-wider" style={{ color: THEME.muted }}>V_C</div>
          <div className="font-mono-x font-semibold text-base" style={{ color: THEME.em }}>{Vc.toFixed(2)} V</div>
        </div>
        <div className="p-3 rounded-lg text-center" style={{ background: THEME.paperDeep }}>
          <div className="text-[10px] uppercase tracking-wider" style={{ color: THEME.muted }}>Current</div>
          <div className="font-mono-x font-semibold text-base" style={{ color: THEME.mech }}>{(i * 1000).toFixed(2)} mA</div>
        </div>
      </div>

      <div className="space-y-4">
        <SimSlider label="Battery EMF" value={V} setValue={setV} min={1} max={24} step={0.5} unit="V" />
        <SimSlider label="Resistance R" value={R} setValue={setR} min={100} max={10000} step={100} unit="Ω" />
        <SimSlider label="Capacitance C" value={C * 1000} setValue={(v) => setC(v / 1000)} min={0.1} max={5} step={0.1} unit="mF" />
        <SimSlider label="Animation speed" value={speed} setValue={setSpeed} min={0.25} max={4} step={0.25} unit="x" />
      </div>

      <div className="flex gap-2 mt-5">
        <Button size="sm" onClick={() => setPlaying(!playing)}>
          {playing ? 'Pause' : 'Play'} <Play size={14} />
        </Button>
        <Button variant="outline" size="sm" onClick={() => setT(0)}>
          Reset <RotateCcw size={14} />
        </Button>
      </div>

      <div className="mt-5 p-4 rounded-lg" style={{ background: THEME.paperDeep }}>
        <div className="pill mb-2" style={{ color: THEME.accent }}>Try this</div>
        <ul className="text-sm space-y-1" style={{ color: THEME.inkSoft }}>
          <li>• At t = τ, the capacitor charges to about 63% of its final voltage. Watch the dashed line.</li>
          <li>• Double R or double C — τ doubles. Same shape, slower clock.</li>
          <li>• Switch to discharging mode. Same exponential, mirrored — q decays from full to zero.</li>
        </ul>
      </div>
    </Card>
  );
}

// Shared slider component for simulators
function SimSlider({ label, value, setValue, min, max, step, unit, disabled }) {
  return (
    <div>
      <div className="flex justify-between text-sm mb-1.5">
        <label style={{ color: THEME.ink }}>{label}</label>
        <span className="font-mono-x font-semibold">
          {typeof value === 'number' ? value.toFixed(step < 1 ? 2 : 0) : value} {unit}
        </span>
      </div>
      <input
        type="range"
        min={min} max={max} step={step}
        value={value}
        onChange={e => setValue(Number(e.target.value))}
        disabled={disabled}
        className="w-full"
        style={{ accentColor: THEME.accent }}
      />
    </div>
  );
}
function SimulatorView() {
  const [active, setActive] = useState('projectile');
  const tabs = [
    { id: 'projectile', label: 'Projectile motion', desc: 'Launch parameters & trajectory', accent: THEME.mech, sub: 'mechanics' },
    { id: 'shm', label: 'Mass on a spring', desc: 'SHM, period, damping', accent: THEME.accent, sub: 'mechanics' },
    { id: 'efield', label: 'Electric field lines', desc: 'Drag charges, see the field', accent: THEME.em, sub: 'em' },
    { id: 'rc', label: 'RC circuit', desc: 'Charging & discharging', accent: THEME.gold, sub: 'em' },
  ];

  return (
    <div className="max-w-5xl mx-auto fade-in">
      <EmptyHeader
        eyebrow="Labs"
        title="Interactive simulators"
        subtitle="Build intuition by playing. Adjust the parameters and watch the physics unfold in real time."
      />

      {/* Tab grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mb-6">
        {tabs.map(tab => {
          const isActive = active === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActive(tab.id)}
              className="p-4 rounded-lg border text-left transition"
              style={{
                background: isActive ? tab.accent : 'white',
                color: isActive ? 'white' : THEME.ink,
                borderColor: isActive ? tab.accent : THEME.line,
                borderWidth: isActive ? 2 : 1,
              }}
            >
              <div className="pill mb-1" style={{ color: isActive ? 'rgba(255,255,255,0.7)' : tab.accent }}>
                {tab.sub === 'mechanics' ? 'Mechanics' : 'E & M'}
              </div>
              <div className="font-display text-sm md:text-base leading-tight">{tab.label}</div>
              <div className="text-[11px] mt-1" style={{ color: isActive ? 'rgba(255,255,255,0.7)' : THEME.muted }}>{tab.desc}</div>
            </button>
          );
        })}
      </div>

      {active === 'projectile' && <ProjectileSimulator />}
      {active === 'shm' && <SHMSimulator />}
      {active === 'efield' && <ElectricFieldSimulator />}
      {active === 'rc' && <RCCircuitSimulator />}

      <Card className="p-6" style={{ background: THEME.paperDeep }}>
        <div className="flex items-start gap-3">
          <Lightbulb size={18} style={{ color: THEME.gold }} className="shrink-0 mt-0.5" />
          <div className="text-sm" style={{ color: THEME.inkSoft }}>
            <strong style={{ color: THEME.ink }}>How to use these labs.</strong> Each simulator pairs with a module — try the projectile lab after Kinematics, the spring after SHM, the field after Electrostatics, and the RC circuit after Circuits. The point isn't to memorize the equations — it's to feel them in your hands.
          </div>
        </div>
      </Card>
    </div>
  );
}
// ═══════════════════════════════════════════════════════════════════
// APP — top-level state & routing
// ═══════════════════════════════════════════════════════════════════

function App() {
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState(null);
  const [progress, setProgress] = useState({});
  const [practice, setPractice] = useState({ streak: 0, lastCompleted: null, totalSolved: 0, totalCorrect: 0 });
  const [exams, setExams] = useState([]);
  const [achievements, setAchievements] = useState([]);
  const [view, setView] = useState({ type: 'dashboard' });
  const [toast, setToast] = useState(null);

  // Load all state from storage on mount
  useEffect(() => {
    let cancelled = false;
    (async () => {
      const [p, prog, prac, ex, ach] = await Promise.all([
        loadState(STORAGE_KEYS.PROFILE, null),
        loadState(STORAGE_KEYS.PROGRESS, {}),
        loadState(STORAGE_KEYS.PRACTICE, { streak: 0, lastCompleted: null, totalSolved: 0, totalCorrect: 0 }),
        loadState(STORAGE_KEYS.EXAMS, []),
        loadState(STORAGE_KEYS.ACHIEVEMENTS, []),
      ]);
      if (cancelled) return;
      setProfile(p);
      setProgress(prog || {});
      setPractice(prac || { streak: 0, lastCompleted: null, totalSolved: 0, totalCorrect: 0 });
      setExams(ex || []);
      setAchievements(ach || []);
      setLoading(false);
    })();
    return () => { cancelled = true; };
  }, []);

  // Scroll to top when view type changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [view.type]);

  // Toast auto-dismiss
  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(() => setToast(null), 3200);
    return () => clearTimeout(t);
  }, [toast]);

  // Award any new achievements based on passed-in state snapshots.
  // Uses the setAchievements updater form so it always sees the latest array,
  // avoiding stale-closure issues when multiple state changes happen in quick succession.
  // Returns the list of newly-earned achievement IDs so callers can decide how to surface them.
  const awardAchievements = useCallback((p, prog, prac, ex) => {
    let newlyEarned = [];
    setAchievements(prevAch => {
      const earned = new Set(prevAch);
      newlyEarned = [];
      const tryAward = (id) => {
        if (!earned.has(id)) {
          earned.add(id);
          newlyEarned.push(id);
        }
      };

      if (Object.values(prog).some(m => m?.lessonDone)) tryAward('first-lesson');
      if (Object.values(prog).some(m => (m?.quizAttempts || []).length > 0)) tryAward('first-quiz');
      if (Object.values(prog).some(m => (m?.quizAttempts || []).some(a => a.score === a.total))) tryAward('perfect-quiz');
      if ((prac?.streak || 0) >= 7) tryAward('week-streak');
      if (allModules.some(m => computeMastery(prog, m.id) >= 100)) tryAward('module-master');
      if ((ex || []).length > 0) tryAward('first-exam');
      if (curriculum.mechanics.modules.every(m => prog[m.id]?.lessonDone)) tryAward('mechanics-done');
      if (curriculum.em.modules.every(m => prog[m.id]?.lessonDone)) tryAward('em-done');

      if (newlyEarned.length === 0) return prevAch;
      const updated = [...prevAch, ...newlyEarned];
      saveState(STORAGE_KEYS.ACHIEVEMENTS, updated);
      return updated;
    });
    return newlyEarned;
  }, []);

  // Queue a toast, preferring achievement notifications over success messages.
  // If an achievement was just earned, it wins; otherwise the given toast is used.
  const showToastWithPriority = useCallback((baseToast, newlyEarned) => {
    if (newlyEarned && newlyEarned.length > 0) {
      const a = ACHIEVEMENTS.find(x => x.id === newlyEarned[0]);
      if (a) {
        setToast({ type: 'achievement', title: 'Achievement unlocked', subtitle: a.title, icon: a.icon });
        return;
      }
    }
    if (baseToast) setToast(baseToast);
  }, []);

  // Handlers --------------------------------------------------------------

  const handleOnboardingComplete = useCallback((p) => {
    setProfile(p);
    saveState(STORAGE_KEYS.PROFILE, p);
    setView({ type: 'dashboard' });
  }, []);

  const onCompleteLesson = useCallback((moduleId) => {
    setProgress(prev => {
      const next = {
        ...prev,
        [moduleId]: {
          ...(prev[moduleId] || { quizAttempts: [] }),
          lessonDone: true,
          quizAttempts: prev[moduleId]?.quizAttempts || [],
        },
      };
      saveState(STORAGE_KEYS.PROGRESS, next);
      const newlyEarned = awardAchievements(profile, next, practice, exams);
      showToastWithPriority(
        { type: 'success', title: 'Lesson complete', subtitle: 'Quiz unlocked.', icon: Check },
        newlyEarned
      );
      return next;
    });
  }, [profile, practice, exams, awardAchievements, showToastWithPriority]);

  const onCompleteQuiz = useCallback((moduleId, attempt) => {
    setProgress(prev => {
      const existing = prev[moduleId] || { lessonDone: false, quizAttempts: [] };
      const next = {
        ...prev,
        [moduleId]: {
          ...existing,
          quizAttempts: [...(existing.quizAttempts || []), attempt],
        },
      };
      saveState(STORAGE_KEYS.PROGRESS, next);
      const pct = Math.round((attempt.score / attempt.total) * 100);
      const newlyEarned = awardAchievements(profile, next, practice, exams);
      showToastWithPriority(
        { type: 'success', title: 'Quiz submitted', subtitle: `You scored ${pct}%.`, icon: CheckCircle2 },
        newlyEarned
      );
      return next;
    });
  }, [profile, practice, exams, awardAchievements, showToastWithPriority]);

  const onSubmitPractice = useCallback(({ correct, date }) => {
    setPractice(prev => {
      let newStreak = 1;
      if (prev.lastCompleted) {
        const diff = daysBetween(prev.lastCompleted, date);
        if (diff === 0) newStreak = prev.streak; // same day (shouldn't happen)
        else if (diff === 1) newStreak = prev.streak + 1;
        else newStreak = 1;
      }
      const next = {
        streak: newStreak,
        lastCompleted: date,
        totalSolved: (prev.totalSolved || 0) + 1,
        totalCorrect: (prev.totalCorrect || 0) + (correct ? 1 : 0),
      };
      saveState(STORAGE_KEYS.PRACTICE, next);
      const newlyEarned = awardAchievements(profile, progress, next, exams);
      if (newlyEarned.length > 0) showToastWithPriority(null, newlyEarned);
      return next;
    });
  }, [profile, progress, exams, awardAchievements, showToastWithPriority]);

  const onCompleteExam = useCallback((res) => {
    setExams(prev => {
      const next = [...prev, res];
      saveState(STORAGE_KEYS.EXAMS, next);
      const newlyEarned = awardAchievements(profile, progress, practice, next);
      if (newlyEarned.length > 0) showToastWithPriority(null, newlyEarned);
      return next;
    });
  }, [profile, progress, practice, awardAchievements, showToastWithPriority]);

  const onReset = useCallback(async () => {
    if (!confirm('Reset all progress? This will clear your lessons, quizzes, practice, and exam history. Your account will go back to onboarding.')) return;
    await Promise.all([
      saveState(STORAGE_KEYS.PROFILE, null),
      saveState(STORAGE_KEYS.PROGRESS, {}),
      saveState(STORAGE_KEYS.PRACTICE, { streak: 0, lastCompleted: null, totalSolved: 0, totalCorrect: 0 }),
      saveState(STORAGE_KEYS.EXAMS, []),
      saveState(STORAGE_KEYS.ACHIEVEMENTS, []),
    ]);
    try { if (window.storage) await window.storage.delete(STORAGE_KEYS.PROFILE); } catch {}
    setProfile(null);
    setProgress({});
    setPractice({ streak: 0, lastCompleted: null, totalSolved: 0, totalCorrect: 0 });
    setExams([]);
    setAchievements([]);
    setView({ type: 'dashboard' });
  }, []);

  // Render ----------------------------------------------------------------

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: THEME.paper, color: THEME.ink }}>
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl mb-4" style={{ background: THEME.accent, color: 'white' }}>
            <Atom size={24} className="animate-spin" style={{ animationDuration: '3s' }} />
          </div>
          <div className="font-display text-xl">PhysicsC Mastery</div>
          <div className="text-sm mt-1" style={{ color: THEME.muted }}>Loading your progress…</div>
        </div>
      </div>
    );
  }

  if (!profile) {
    return <Onboarding onComplete={handleOnboardingComplete} />;
  }

  const overallPct = computeOverallProgress(progress);

  // Route to the appropriate view
  let content = null;
  switch (view.type) {
    case 'dashboard':
      content = <Dashboard profile={profile} progress={progress} streak={practice.streak || 0} setView={setView} exams={exams} achievements={achievements} />;
      break;
    case 'courses':
      content = <CoursesView progress={progress} setView={setView} initialSubject={view.subject || 'mechanics'} />;
      break;
    case 'module':
      content = <ModuleView moduleId={view.moduleId} progress={progress} setView={setView} onCompleteLesson={onCompleteLesson} />;
      break;
    case 'lesson':
      content = <LessonView moduleId={view.moduleId} progress={progress} setView={setView} onCompleteLesson={onCompleteLesson} />;
      break;
    case 'quiz':
      content = <QuizView moduleId={view.moduleId} setView={setView} onCompleteQuiz={onCompleteQuiz} />;
      break;
    case 'practice':
      content = <PracticeView practice={practice} onSubmitPractice={onSubmitPractice} />;
      break;
    case 'exam':
      content = <MockExamView setView={setView} onCompleteExam={onCompleteExam} />;
      break;
    case 'custom-test':
      content = <CustomTestView setView={setView} onCompleteExam={onCompleteExam} />;
      break;
    case 'studyplan':
      content = <StudyPlanView profile={profile} progress={progress} setView={setView} />;
      break;
    case 'labs':
      content = <SimulatorView />;
      break;
    case 'progress':
      content = <ProgressView profile={profile} progress={progress} practice={practice} exams={exams} />;
      break;
    case 'achievements':
      content = <AchievementsView achievements={achievements} />;
      break;
    default:
      content = <Dashboard profile={profile} progress={progress} streak={practice.streak || 0} setView={setView} exams={exams} achievements={achievements} />;
  }

  return (
    <div className="min-h-screen grid-bg" style={{ background: THEME.paper, color: THEME.ink, fontFamily: "'DM Sans', system-ui, sans-serif" }}>
      <div className="flex">
        <Sidebar
          view={view}
          setView={setView}
          profile={profile}
          overallPct={overallPct}
          streak={practice.streak || 0}
          onReset={onReset}
        />
        <main className="flex-1 min-w-0 px-4 md:px-10 py-6 md:py-10 pb-28 md:pb-10">
          {content}
        </main>
      </div>
      <MobileNav view={view} setView={setView} />

      {/* Toast */}
      {toast && (
        <div
          className="fixed bottom-24 md:bottom-6 right-4 md:right-6 z-50 flex items-center gap-3 px-4 py-3 rounded-lg shadow-xl fade-in"
          style={{
            background: THEME.ink,
            color: 'white',
            maxWidth: 360,
            border: `1px solid ${toast.type === 'achievement' ? THEME.gold : THEME.accent}`,
          }}
        >
          <div
            className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0"
            style={{
              background: toast.type === 'achievement' ? THEME.gold : THEME.accent,
              color: 'white',
            }}
          >
            {toast.icon && React.createElement(toast.icon, { size: 18 })}
          </div>
          <div className="flex-1">
            <div className="text-xs uppercase tracking-wider" style={{ color: toast.type === 'achievement' ? THEME.gold : THEME.accentSoft }}>
              {toast.title}
            </div>
            <div className="text-sm font-medium">{toast.subtitle}</div>
          </div>
          <button
            onClick={() => setToast(null)}
            className="opacity-60 hover:opacity-100 transition"
          >
            <X size={14} />
          </button>
        </div>
      )}
    </div>
  );
}

export default function PhysicsCMastery() {
  return (
    <>
      <StyleInject />
      <App />
    </>
  );
}
