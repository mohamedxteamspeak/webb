const SVG = {
    // 1. SUSPENSION: MACPHERSON vs WISHBONE
    suspension: `
    <svg viewBox="0 0 400 250" class="diagram">
        <defs>
            <linearGradient id="gMetal" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#9ca3af"/><stop offset="1" stop-color="#4b5563"/></linearGradient>
            <linearGradient id="gSpring" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#f59e0b"/><stop offset="1" stop-color="#d97706"/></linearGradient>
        </defs>
        
        <!-- STATIC: WHEEL & GROUND -->
        <g id="wheel-group" transform="translate(100, 150)">
            <rect x="-20" y="-20" width="40" height="80" fill="#333" rx="5" />
            <circle cx="0" cy="20" r="15" fill="#555" stroke="#111" stroke-width="2"/>
        </g>
        <line x1="20" y1="210" x2="380" y2="210" stroke="#10b981" stroke-width="4"/>
        
        <!-- MACPHERSON COMPONENTS (Default) -->
        <g id="macpherson-group">
            <path d="M100 130 L100 50" stroke="#2563eb" stroke-width="6" stroke-linecap="round" /> <!-- Strut -->
            <path d="M100 170 L200 170" stroke="#4b5563" stroke-width="4" /> <!-- Lower Arm -->
            <path d="M90 60 L110 60 L90 70 L110 80 L90 90 L110 100 L100 100" stroke="url(#gSpring)" stroke-width="3" fill="none"/>
            <text x="220" y="50" fill="#2563eb" font-weight="bold">MacPherson</text>
            <text x="220" y="70" font-size="12" fill="#6b7280">Jambe de force + Triangle inf.</text>
        </g>
        
        <!-- WISHBONE COMPONENTS (Hidden by default) -->
        <g id="wishbone-group" style="display:none">
            <path d="M100 130 L100 70" stroke="#2563eb" stroke-width="4" /> <!-- Shock -->
            <path d="M100 170 L200 170" stroke="#4b5563" stroke-width="4" /> <!-- Lower Arm -->
            <path d="M100 90 L180 90" stroke="#8b5cf6" stroke-width="4" /> <!-- Upper Arm -->
            <text x="220" y="50" fill="#8b5cf6" font-weight="bold">Double Triangles</text>
            <text x="220" y="70" font-size="12" fill="#6b7280">Triangles Supérieur + Inférieur</text>
        </g>

        <!-- CHASSIS -->
        <rect x="180" y="40" width="200" height="140" rx="10" fill="#cbd5e1" opacity="0.5"/>
    </svg>`,

    // 2. DAMPER PRINCIPLE
    damper: `
    <svg viewBox="0 0 200 200" class="diagram">
        <defs>
            <linearGradient id="oil" x1="0" y1="1" x2="0" y2="0"><stop offset="0" stop-color="#ef4444"/><stop offset="1" stop-color="#fca5a5"/></linearGradient>
        </defs>
        <rect x="70" y="20" width="60" height="160" fill="none" stroke="#333" stroke-width="3"/>
        <rect x="72" y="22" width="56" height="156" fill="url(#oil)" opacity="0.5"/>
        
        <!-- PISTON (Animated) -->
        <g class="piston-anim">
            <line x1="100" y1="0" x2="100" y2="100" stroke="#333" stroke-width="4"/>
            <rect x="75" y="90" width="50" height="10" fill="#1f2937"/>
            <circle cx="85" cy="95" r="2" fill="white" class="flow-anim"/>
            <circle cx="115" cy="95" r="2" fill="white" class="flow-anim"/>
        </g>
    </svg>`,

    // 3. MOVEMENTS
    movements: `
    <svg viewBox="0 0 300 150" class="diagram">
        <!-- Car Rear View -->
        <g id="car-body" transform="translate(150, 100)">
            <rect x="-60" y="-40" width="120" height="60" rx="10" fill="#3b82f6"/>
            <rect x="-40" y="-60" width="80" height="30" rx="5" fill="#93c5fd"/>
            <circle cx="-50" cy="20" r="15" fill="#1f2937"/>
            <circle cx="50" cy="20" r="15" fill="#1f2937"/>
        </g>
        <line x1="50" y1="120" x2="250" y2="120" stroke="#333" stroke-width="2"/>
    </svg>`,

    // 4. PNEUMATIC LOAD SIM
    pneumatic: `
    <svg viewBox="0 0 400 200" class="diagram">
        <!-- Ground -->
        <line x1="0" y1="180" x2="400" y2="180" stroke="#333" stroke-width="2"/>
        
        <!-- Wheels -->
        <circle cx="100" cy="165" r="15" fill="#1f2937"/>
        <circle cx="300" cy="165" r="15" fill="#1f2937"/>
        
        <!-- Body (Movable) -->
        <g id="pneu-body" transform="translate(0, 0)">
            <path d="M50 150 L350 150 L350 100 L300 80 L100 80 L50 100 Z" fill="#3b82f6" opacity="0.8"/>
            <!-- Air Bellows -->
            <circle cx="100" cy="140" r="10" fill="#60a5fa" stroke="#2563eb" stroke-width="2"/>
            <circle cx="300" cy="140" r="10" fill="#60a5fa" stroke="#2563eb" stroke-width="2"/>
        </g>
        
        <!-- Sensor/ECU -->
        <rect x="180" y="10" width="40" height="30" fill="#10b981" rx="4"/>
        <text x="200" y="30" text-anchor="middle" fill="white" font-size="10">ECU</text>
        <path d="M200 40 L200 140" stroke="#10b981" stroke-dasharray="4"/>
    </svg>`,

    // 5. STEERING
    steering: `
    <svg viewBox="0 0 300 150" class="diagram">
        <g transform="translate(150, 40)">
            <circle cx="0" cy="0" r="20" fill="none" stroke="#2563eb" stroke-width="4"/> <!-- Wheel -->
            <line x1="0" y1="0" x2="0" y2="50" stroke="#333" stroke-width="4"/>
            <rect x="-10" y="50" width="20" height="20" fill="#4b5563"/> <!-- Pinion -->
        </g>
        <!-- Rack -->
        <g class="rack-anim">
            <rect x="50" y="80" width="200" height="10" fill="#9ca3af"/>
            <line x1="50" y1="85" x2="250" y2="85" stroke="#4b5563" stroke-dasharray="5"/>
        </g>
    </svg>`,

    // 6. EPS GRAPH
    epsGraph: `
    <svg viewBox="0 0 300 200" class="diagram">
        <!-- Axes -->
        <line x1="40" y1="180" x2="280" y2="180" stroke="#333" stroke-width="2"/> <!-- X: Speed -->
        <line x1="40" y1="180" x2="40" y2="20" stroke="#333" stroke-width="2"/> <!-- Y: Assist -->
        <text x="280" y="170" font-size="10" fill="#666">Vitesse (km/h)</text>
        <text x="20" y="20" font-size="10" fill="#666">Assistance</text>
        
        <!-- Curve -->
        <path d="M40 40 Q100 40, 160 100 T280 180" fill="none" stroke="#3b82f6" stroke-width="3" stroke-dasharray="5"/>
        
        <!-- Interactive Dot -->
        <circle id="eps-dot" cx="40" cy="40" r="6" fill="#ef4444" stroke="white" stroke-width="2"/>
    </svg>`,

    // 7. SAFETY COLUMN
    safety: `
    <svg viewBox="0 0 300 100" class="diagram">
        <!-- Driver -->
        <circle cx="30" cy="50" r="15" fill="#f59e0b"/> 
        
        <!-- Column (Collapsible) -->
        <g id="safety-col">
            <rect x="50" y="45" width="200" height="10" fill="#9ca3af" rx="2"/>
            <rect id="safety-inner" x="50" y="45" width="200" height="10" fill="#4b5563" rx="2"/>
        </g>
        
        <!-- Gearbox -->
        <rect x="250" y="30" width="40" height="40" fill="#333"/>
    </svg>`,

    // 8. GEOMETRY MASTER
    geometryMaster: `
    <svg viewBox="0 0 400 300" class="diagram">
        <!-- TOP VIEW (Toe) -->
        <g transform="translate(100, 80)">
            <text x="0" y="-50" text-anchor="middle" font-size="12" fill="#666">VUE DESSUS (Parallélisme)</text>
            <!-- Left Wheel Top -->
            <g id="geo-toe-l" transform="translate(-60, 0)">
                <rect x="-10" y="-30" width="20" height="60" fill="#333" rx="3"/>
            </g>
            <!-- Right Wheel Top -->
            <g id="geo-toe-r" transform="translate(60, 0)">
                <rect x="-10" y="-30" width="20" height="60" fill="#333" rx="3"/>
            </g>
            <line x1="-60" y1="0" x2="60" y2="0" stroke="#ccc" stroke-dasharray="4"/>
        </g>

        <!-- FRONT VIEW (Camber) -->
        <g transform="translate(300, 80)">
             <text x="0" y="-50" text-anchor="middle" font-size="12" fill="#666">VUE FACE (Carrossage)</text>
             <!-- Wheel Front -->
             <g id="geo-camber" transform="translate(0, 0)">
                <rect x="-10" y="-40" width="20" height="80" fill="#2563eb" rx="4"/>
                <line x1="0" y1="-50" x2="0" y2="50" stroke="#ef4444" stroke-dasharray="4"/> <!-- Vertical Ref -->
             </g>
             <line x1="-50" y1="50" x2="50" y2="50" stroke="#333" stroke-width="2"/> <!-- Ground -->
        </g>

        <!-- SIDE VIEW (Caster) -->
        <g transform="translate(200, 220)">
            <text x="0" y="-60" text-anchor="middle" font-size="12" fill="#666">VUE CÔTÉ (Chasse)</text>
            <circle cx="0" cy="0" r="30" fill="none" stroke="#333" stroke-width="3"/>
            <line x1="-40" y1="30" x2="40" y2="30" stroke="#333" stroke-width="2"/> <!-- Ground -->
            
            <!-- Pivot Axis -->
            <g id="geo-caster" transform="rotate(-5)">
                <line x1="0" y1="-50" x2="0" y2="20" stroke="#10b981" stroke-width="3"/>
            </g>
            <line x1="0" y1="-50" x2="0" y2="30" stroke="#ccc" stroke-dasharray="4"/> <!-- Vertical -->
        </g>
    </svg>`
};

function insertDiagrams() {
    const containers = {
        'diagram-suspension': SVG.suspension,
        'diagram-damper': SVG.damper,
        'diagram-movements': SVG.movements,
        'diagram-pneumatic': SVG.pneumatic,
        'diagram-steering': SVG.steering,
        'diagram-eps-graph': SVG.epsGraph,
        'diagram-safety': SVG.safety,
        'diagram-geometry-master': SVG.geometryMaster,
        // Legacy fallbacks
        'diagram-eps': SVG.epsGraph,
        'diagram-geometry': SVG.geometryMaster,
        'diagram-parallelism': SVG.geometryMaster
    };

    for (const [id, svg] of Object.entries(containers)) {
        const el = document.getElementById(id);
        if (el) el.innerHTML = svg;
    }
}

document.addEventListener('DOMContentLoaded', insertDiagrams);
