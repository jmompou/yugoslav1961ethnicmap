# Yugoslavia 1961 Census Map

This project is an interactive web-based data visualization of the former Yugoslavia, based on the historical 1961 population census. 

## Features

It provides an interactive map (running entirely in your browser) that displays the demographic layout of Yugoslavia's municipalities in 1961. 

*   **Visual Overview:** Every municipality from the 1961 census is represented as a circle on the map.
*   **Population Size:** The size (radius) of each circle is proportional to the total population of that municipality.
*   **Majority Ethnicity:** The color of each circle instantly shows you which ethnic group formed the absolute majority in that specific area (e.g., Serbs in blue, Croats in red, Muslims in teal).
*   **Interactive Data (Hover & Click):**
    *   Hovering over a circle reveals the name of the municipality and its majority ethnicity.
    *   Clicking on a circle opens a detailed popup panel that lists the exact national composition of that municipality in English—showing both the absolute population numbers and percentages for every ethnic group (Montenegrins, Croats, Macedonians, Muslims, Slovenians, Serbs, Albanians, Hungarians, Romani, and Yugoslavs).

## How it was Built

1.  **Data Extraction:** The data was parsed from the official 1961 census PDF (`G19614001.pdf`). It was extracted using a custom Python script that parsed the tables and decoded the original text from an old encoding called YUSCII (where characters like `[` represented `Š`) to proper Latin characters.
2.  **Geocoding:** Since historical 1961 vector maps of the municipal borders were not publicly available as shapefiles or GeoJSONs, a secondary Python script was used to cross-reference the extracted municipality names against the massive **GeoNames** database. This successfully mapped the exact latitude and longitude coordinates for over 730 municipalities across the modern-day successor countries (Serbia, Bosnia and Herzegovina, Croatia, North Macedonia, Slovenia, and Montenegro).
3.  **Web Application:** Standard web technologies (HTML, CSS, JavaScript) were used to build the frontend.
    *   **Leaflet.js** was used as the mapping library, overlaying our data points on top of a dark, minimalist CartoDB basemap.
    *   The UI was designed with a modern **"Glassmorphism"** aesthetic, featuring translucent dark panels, blurred backgrounds, and a sleek typography system using Google's Inter font.

## Usage

You can view and interact with the final result anytime by opening the `index.html` file in your web browser! No server is required.
