// ===== CONFIGURATION =====
const CONFIG = {
    storageKey: 'reviewM107',
    themeKey: 'theme',
    progressKey: 'progress',
    quizKey: 'quizResults'
};

// ===== DOM HELPERS =====
const $ = (sel) => document.querySelector(sel);
const $$ = (sel) => document.querySelectorAll(sel);

// ===== THEME MANAGEMENT =====
const Theme = {
    init() {
        const saved = localStorage.getItem(CONFIG.themeKey);
        const system = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
        const theme = saved || system;
        this.set(theme);

        $('#themeToggle')?.addEventListener('click', () => this.toggle());
    },
    set(theme) {
        document.documentElement.setAttribute('data-theme', theme);
        $('#themeToggle').textContent = theme === 'dark' ? '☀️' : '🌙';
    },
    toggle() {
        const current = document.documentElement.getAttribute('data-theme');
        const next = current === 'dark' ? 'light' : 'dark';
        localStorage.setItem(CONFIG.themeKey, next);
        this.set(next);
    }
};

// ===== TABS MANAGEMENT (Scrollable) =====
const Tabs = {
    init() {
        const tabs = $$('.tab-btn');
        tabs.forEach(tab => {
            tab.addEventListener('click', () => this.activate(tab));
        });

        // Restore
        const last = localStorage.getItem('lastTab');
        if (last) {
            const tab = $(`[data-tab="${last}"]`);
            if (tab) this.activate(tab);
        }
    },
    activate(tab) {
        // UI
        $$('.tab-btn').forEach(t => t.classList.remove('active'));
        $$('.tab-panel').forEach(p => p.classList.remove('active'));

        tab.classList.add('active');
        const panel = $(`#${tab.dataset.tab}`);
        if (panel) panel.classList.add('active');

        // Scroll tab into view
        tab.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });

        // Save
        localStorage.setItem('lastTab', tab.dataset.tab);
    }
};

// ===== SIMULATIONS =====

// 1. Suspension Type Sim
const SuspensionSim = {
    setType(type) {
        // UI Buttons
        $$('.sim-btn').forEach(b => b.classList.remove('active'));
        event.target.classList.add('active'); // Assumes click event

        const mac = $('#macpherson-group');
        const wish = $('#wishbone-group');

        if (type === 'macpherson') {
            mac.style.display = 'block';
            wish.style.display = 'none';
        } else {
            mac.style.display = 'none';
            wish.style.display = 'block';
        }
    }
};

// 2. Body Movements Sim
const BodySim = {
    setMove(type) {
        const body = $('#car-body');
        // Reset animation
        body.style.animation = 'none';
        body.offsetHeight; /* Trigger reflow */

        // Define keyframes in JS or use classes? Classes is cleaner but inline styles work for dynamic.
        // We will use inline transform transitions for simplicity or simple CSS animations.
        // Actually, let's use a simple CSS class toggle approach if defined in CSS, but we defined SVG contents.
        // Let's us animate via Web Paint API or just JS requestAnimationFrame? 
        // Simplest: Add specific animation class.

        // Let's add keyframes dynamically or just use transforms.
        // Since we didn't add CSS keyframes for these specific moves in styles.css, let's do simple JS animation loop or styles.

        // We'll simulate by updating transform periodically or adding a class that has animation.
        // Let's add the classes to the element.

        // Clear previous transforms
        body.style.transformBox = 'fill-box';
        body.style.transformOrigin = 'center';

        if (type === 'roll') { // Roulis
            body.animate([
                { transform: 'translate(150px, 100px) rotate(0deg)' },
                { transform: 'translate(150px, 100px) rotate(5deg)' },
                { transform: 'translate(150px, 100px) rotate(-5deg)' },
                { transform: 'translate(150px, 100px) rotate(0deg)' }
            ], { duration: 2000, iterations: Infinity });
        } else if (type === 'pitch') { // Tangage (simulated by scaling Y? or moving up down)
            // Just bounce
            body.animate([
                { transform: 'translate(150px, 100px) scaleY(1)' },
                { transform: 'translate(150px, 100px) scaleY(0.9)' },
                { transform: 'translate(150px, 100px) scaleY(1)' }
            ], { duration: 1000, iterations: Infinity });
        } else if (type === 'yaw') { // Lacet (simulated by skew?)
            body.animate([
                { transform: 'translate(150px, 100px) skewX(0deg)' },
                { transform: 'translate(150px, 100px) skewX(10deg)' },
                { transform: 'translate(150px, 100px) skewX(-10deg)' },
                { transform: 'translate(150px, 100px) skewX(0deg)' }
            ], { duration: 2000, iterations: Infinity });
        }
    }
};

// 3. Pneumatic Sim
const PneumaticSim = {
    setLoad(val) {
        $('#loadVal').textContent = `${val} kg`;
        const body = $('#pneu-body');
        // Move body down based on load
        // Max 500kg -> 20px drop
        const y = (val / 500) * 20;
        body.setAttribute('transform', `translate(0, ${y})`);

        // Change color to show "strain"? No, just position.
    }
};

// 4. Safety Sim
const SafetySim = {
    crash() {
        const col = $('#safety-inner');
        // Animate collapse
        col.style.transition = 'width 0.2s ease';
        col.setAttribute('width', '100'); // Collapse to half
        col.setAttribute('x', '150'); // Move right
    },
    reset() {
        const col = $('#safety-inner');
        col.style.transition = 'width 0.5s ease';
        col.setAttribute('width', '200');
        col.setAttribute('x', '50');
    }
};

// 5. EPS Sim
const EPSSim = {
    setSpeed(speed) {
        $('#speedVal').textContent = `${speed} km/h`;
        const dot = $('#eps-dot');

        // Curve Logic: (0,0) -> (100%, 100%)
        // SVG Coord: x: 40->280, y: 40->180
        // Speed 0 -> 130
        const x = 40 + (speed / 130) * 240;

        // Assist (Inverse of speed roughly for visual)
        // Let's follow the quadratic curve path approximately or just linear for simplicity
        // y = x^2 roughly
        const t = speed / 130;
        const y = 40 + (t * t) * 140; // Quadratic drop

        dot.setAttribute('cx', x);
        dot.setAttribute('cy', y);

        const txt = $('#epsState');
        const pill = $('#epsStatePill');

        if (speed < 20) {
            txt.textContent = "Assistance Maximale (Manœuvres)";
            pill.style.borderColor = 'var(--c-success)';
            pill.style.background = 'rgba(16, 185, 129, 0.1)';
        } else if (speed < 90) {
            txt.textContent = "Assistance Modérée (Conduite)";
            pill.style.borderColor = 'var(--c-primary)';
            pill.style.background = 'rgba(59, 130, 246, 0.1)';
        } else {
            txt.textContent = "Assistance Faible (Sécurité)";
            pill.style.borderColor = 'var(--c-warning)';
            pill.style.background = 'rgba(245, 158, 11, 0.1)';
        }
    }
};

// 6. Geometry Master Sim
const GeoSim = {
    setCamber(val) {
        $('#camberVal').textContent = `${val}°`;
        const wheel = $('#geo-camber');
        // Rotate around center of wheel front view
        wheel.setAttribute('transform', `rotate(${val} 0 0)`);
    },
    setToe(val) {
        $('#toeVal').textContent = `${val}°`;
        const l = $('#geo-toe-l');
        const r = $('#geo-toe-r');

        // Toe in: Fronts point in. Left rotates CW (+), Right rotates CCW (-)
        // Wait, Toe In = Pincement. Left wheel turns Right (+), Right wheel turns Left (-) ?
        // Visual Check: Top view. Forward is Up (negative Y).
        // To point inward (Up-Right for Left Wheel), Angle is +

        l.setAttribute('transform', `translate(-60,0) rotate(${val})`);
        r.setAttribute('transform', `translate(60,0) rotate(${-val})`);
    },
    setCaster(val) {
        $('#casterVal').textContent = `${val}°`;
        const axis = $('#geo-caster');
        // Rotate pivot axis. Base is -5deg.
        // We add val.
        axis.setAttribute('transform', `rotate(${-val})`);
    }
};

// ===== QUIZ LOGIC =====
const Quiz = {
    // [Same as before, simplified for space]
    data: [
        { q: "Rôle de l'élément élastique (ressort)?", opts: ["Freiner les oscillations", "Absorber l'énergie cinétique", "Guider la roue"], c: 1 },
        { q: "Avantage de l'EPS?", opts: ["Assistance constante", "Assistance variable + Économie", "Plus lourd"], c: 1 },
        { q: "En virage, le véhicule subit:", opts: ["Du Tangage", "Du Roulis", "Du Pompage"], c: 1 },
        { q: "Si les roues convergent à l'avant:", opts: ["Ouverture", "Pincement", "Carrossage"], c: 1 },
        { q: "Suspension pneumatique maintient:", opts: ["Pression constante", "Garde au sol constante", "Vitesse constante"], c: 1 }
    ],
    init() {
        $('#quizBtn').addEventListener('click', () => $('#quizModal').classList.add('open'));
        $('#closeQuiz').addEventListener('click', () => $('#quizModal').classList.remove('open'));
        this.render();
    },
    render() {
        const body = $('#quizBody');
        body.innerHTML = this.data.map((q, i) => `
            <div style="margin-bottom:20px">
                <p><strong>${i + 1}. ${q.q}</strong></p>
                <div style="display:grid;gap:5px">
                    ${q.opts.map((o, oi) => `<button class="tab-btn" onclick="Quiz.check(this, ${i}, ${oi})">${o}</button>`).join('')}
                </div>
            </div>
        `).join('');
    },
    check(btn, qi, oi) {
        const isCorrect = this.data[qi].c === oi;
        btn.style.background = isCorrect ? 'var(--c-success)' : 'var(--c-danger)';
        btn.style.color = 'white';
        if (isCorrect) btn.textContent += " ✅";
        else btn.textContent += " ❌";
    }
};

// ===== INIT =====
document.addEventListener('DOMContentLoaded', () => {
    Theme.init();
    Tabs.init();
    Quiz.init();

    // Expose sims globally
    window.SuspensionSim = SuspensionSim;
    window.BodySim = BodySim;
    window.PneumaticSim = PneumaticSim;
    window.SafetySim = SafetySim;
    window.EPSSim = EPSSim;
    window.GeoSim = GeoSim;
    window.Quiz = Quiz;
});
