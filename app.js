// Define Colors for each Ethnicity
const ethnicityColors = {
    'Serbs': '#3b82f6',       // Blue
    'Croats': '#ef4444',      // Red
    'Muslims': '#14b8a6',     // Teal
    'Slovenians': '#22c55e',  // Green
    'Macedonians': '#eab308', // Yellow
    'Montenegrins': '#f97316',// Orange
    'Albanians': '#ec4899',   // Pink
    'Hungarians': '#84cc16',  // Lime
    'Yugoslavs': '#a855f7',   // Purple
    'Romani': '#6366f1'       // Indigo
};

const map = L.map('map', {
    zoomControl: false // Custom placement later if needed
}).setView([44.0, 18.0], 6); // Centered roughly on Yugoslavia

// Add a dark minimal basemap (CartoDB Dark Matter)
L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
    subdomains: 'abcd',
    maxZoom: 19
}).addTo(map);

// Helper to format numbers with commas
const formatNumber = (num) => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

// Populate Legend
const legendContent = document.getElementById('legend-content');
for (const [ethnicity, color] of Object.entries(ethnicityColors)) {
    const item = document.createElement('div');
    item.className = 'legend-item';

    const colorBox = document.createElement('div');
    colorBox.className = 'legend-color';
    colorBox.style.background = color;

    const label = document.createElement('span');
    label.textContent = ethnicity;

    item.appendChild(colorBox);
    item.appendChild(label);
    legendContent.appendChild(item);
}

// Add markers for 1961 Census Data
censusData.forEach(municipality => {
    if (!municipality.lat || !municipality.lon) return;

    const majority = municipality.Majority;
    const color = ethnicityColors[majority] || '#ffffff';

    // Calculate radius based on population size (squareroot to keep area proportional)
    // Min radius 4, Max radius 25
    const radius = Math.max(4, Math.min(25, Math.sqrt(municipality.Total) / 10));

    const marker = L.circleMarker([municipality.lat, municipality.lon], {
        radius: radius,
        fillColor: color,
        color: '#1e293b', // Dark border
        weight: 1,
        opacity: 1,
        fillOpacity: 0.8
    }).addTo(map);

    // Construct HTML string for popup/tooltip content
    let popupHtml = `<div class="custom-popup">
                <h3>${municipality.Municipality}</h3>
                <div class="total">Total Population: ${formatNumber(municipality.Total)}</div>
                <table class="stats-table">`;

    // Sort ethnicities by population desc for the table
    const groups = [
        { name: 'Serbs', pop: municipality.Serbs },
        { name: 'Croats', pop: municipality.Croats },
        { name: 'Muslims', pop: municipality.Muslims },
        { name: 'Slovenians', pop: municipality.Slovenians },
        { name: 'Macedonians', pop: municipality.Macedonians },
        { name: 'Montenegrins', pop: municipality.Montenegrins },
        { name: 'Albanians', pop: municipality.Albanians },
        { name: 'Hungarians', pop: municipality.Hungarians },
        { name: 'Yugoslavs', pop: municipality.Yugoslavs },
        { name: 'Romani', pop: municipality.Romani }
    ].sort((a, b) => b.pop - a.pop);

    groups.forEach(group => {
        if (group.pop > 0) {
            const pct = ((group.pop / municipality.Total) * 100).toFixed(1);
            const isMajority = group.name === majority ? 'class="majority"' : '';
            popupHtml += `<tr ${isMajority}>
                        <td>${group.name}</td>
                        <td>${formatNumber(group.pop)} (${pct}%)</td>
                    </tr>`;
        }
    });

    popupHtml += `</table></div>`;

    // On Hover: Tooltip (fast interaction)
    marker.bindTooltip(`<b>${municipality.Municipality}</b><br>Majority: ${majority}`, {
        direction: 'top',
        offset: [0, -10],
        opacity: 0.95
    });

    // On Click: Full specific data
    marker.bindPopup(popupHtml, {
        maxWidth: 300
    });

    // Interaction effects
    marker.on('mouseover', function (e) {
        this.setStyle({
            weight: 3,
            color: '#ffffff',
            fillOpacity: 1
        });
    });
    marker.on('mouseout', function (e) {
        this.setStyle({
            weight: 1,
            color: '#1e293b',
            fillOpacity: 0.8
        });
    });
});
