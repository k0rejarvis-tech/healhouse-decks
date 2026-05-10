# 2008 Brimley — ArchiVinci Render Kit

Source: `2008 Brimley - Feasibility Study R1 (2).pdf`  
Purpose: generate exterior, amenity, and pitch-board visuals from the feasibility study.

## Reality check

This is a concept-visualization kit, not architectural construction documentation. Use outputs in pitch docs with a clear note:

> Conceptual visualization only. Final massing, unit count, gross floor area, zoning, parking, code compliance, materials, and design subject to architectural, engineering, and municipal review.

## Extracted source pages

Exported to:

`outreach/real-estate/2008-brimley/assets/`

Useful files:

- `page-01.png` — cover / project identity
- `page-02.png` — zoning by-law summary
- `page-04.png` — key section / massing dimensions
- `page-06.png` — area table / unit mix options
- `page-07.png` — floor plan option
- `page-08.png` — floor plan option
- `page-09.png` — upper/lower floor plan option
- `page-10.png` — typical floor plan option
- `page-11.png` — lower basement plan option
- `page-12.png` — upper basement plan option

## Core extracted facts

- Address: 2008 Brimley Road, Toronto, Ontario
- Site: approximately 22.5m x 48.0m, 1,080 m²
- Proposed building envelope: approximately 19.0m x 25.0m
- Height: up to 19m
- Storeys: 6
- Proposed gross floor area: approximately 2,600 m²
- Residential feasibility with multiple stair options
- Unit table includes 1-bedroom, 2-bedroom, 3-bedroom, and 3-bedroom + den options
- Strongest pitch direction: boutique mid-rise urban infill residence with wellness/senior/independent-living optional positioning

## How to use ArchiVinci

1. Go to https://www.archivinci.com/
2. Log in.
3. Choose the closest module:
   - **Exterior Render** for the hero building image.
   - **Interior Render** for lobby / amenity / suite concepts.
   - **Plan / sketch / architecture render** if offered for floor plans or drawings.
4. Upload one of the exported PNG pages.
5. Use **high geometry fidelity / low-to-medium creativity** if the setting exists.
6. Generate 3–6 variations.
7. Pick one realistic direction, not the flashiest fantasy image.
8. Save the best outputs into `outreach/real-estate/2008-brimley/assets/renders/`.

## Best upload targets

### For exterior hero render

Start with:

- `page-04.png` — because it has the key section/massing dimensions.
- If ArchiVinci struggles with the section, use `page-01.png` or a cropped view from the plans as a loose input.

### For floor plan / unit visualization

Use:

- `page-07.png`
- `page-08.png`
- `page-09.png`
- `page-10.png`

### For pitch board facts

Use:

- `page-02.png`
- `page-06.png`

## Prompt 01 — exterior hero, realistic developer pitch

Use with `page-04.png` as input.

```text
Photorealistic architectural rendering for a real estate development pitch document. Boutique 6-storey urban infill apartment building at 2008 Brimley Road in Toronto, 19 metre height, compact 22.5m by 48m lot, warm contemporary Canadian architecture, human-scale street frontage, brick and limestone facade, bronze metal accents, large residential windows, subtle balconies, active ground-floor lobby and amenity space, landscaped sidewalk, mature street trees, realistic Scarborough/Toronto suburban-urban street context, dusk golden-hour lighting, people walking, parked cars, premium but feasible mid-rise rental or senior independent living concept, investor pitch quality, realistic proportions, preserve the simple 6-storey massing, no text, no logos, no impossible fantasy architecture.
```

Recommended settings:

- Creativity: medium-low
- Geometry preservation: high
- Style strength: medium
- Output count: 4

## Prompt 02 — exterior hero, senior independent living / Heal House style

```text
Photorealistic exterior render of a boutique 6-storey senior independent living residence in Toronto. Warm brick, limestone, and wood-toned soffits, generous windows, accessible ground-floor entry, transparent wellness lobby, calm residential scale, landscaped front setback, seating near entrance, mature trees, soft evening light, safe walkable neighbourhood context, premium but not luxury-tower, credible Canadian mid-rise architecture, investor presentation quality, preserve realistic 19m height and compact lot proportions, no text or signage.
```

## Prompt 03 — exterior hero, K0RE/TRMIG wellness residence

```text
Photorealistic architectural visualization of a 6-storey K0RE/TRMIG wellness-oriented urban residence on a compact Toronto infill lot. Ground floor includes wellness lounge, consultation rooms, cafe-style social area, and resident lobby. Upper floors contain efficient suites with large windows and subtle balconies. Warm masonry facade, bronze metal, natural wood accents, soft landscape lighting, biophilic planting, calm premium atmosphere, realistic Canadian urban context, dusk lighting, pitch deck quality, feasible proportions, no text, no logo.
```

## Prompt 04 — ground-floor lobby / amenity render

Use with a floor plan page or no source image.

```text
Photorealistic interior rendering of a ground-floor wellness lobby and resident lounge for a boutique Toronto mid-rise residence. Warm wood wall panels, stone flooring, soft indirect lighting, reception desk, small cafe counter, comfortable lounge seating, indoor planting, fireplace feature, accessible circulation, large street-facing windows, calm senior-friendly hospitality atmosphere, premium but practical materials, real estate pitch deck quality.
```

## Prompt 05 — courtyard / biophilic amenity render

```text
Photorealistic biophilic courtyard amenity for a compact urban infill residence. Central mature tree, lush planting, accessible walking loop, seating nooks, warm stone paving, soft landscape lighting, small water feature, residents sitting and talking, calm senior independent living / wellness residence atmosphere, Toronto mid-rise context, premium hospitality feeling, realistic scale, investor pitch quality.
```

## Prompt 06 — suite living / kitchen render

Use with a typical floor plan page.

```text
Photorealistic interior rendering of an efficient one-bedroom suite in a boutique Toronto mid-rise residence. Open-concept living and kitchenette, warm neutral finishes, large window, compact dining table, senior-friendly accessible circulation, soft daylight, durable materials, calm residential atmosphere, practical rental apartment layout, pitch deck quality, no text.
```

## Negative prompt / avoid

```text
Avoid futuristic towers, impossible cantilevers, fantasy mega-development, oversized luxury hotel scale, tropical climate, palm trees, incorrect number of storeys, distorted windows, unreadable text, fake logos, melted balconies, unrealistic streets, excessive glass tower aesthetic.
```

## Output naming convention

Save ArchiVinci outputs like:

- `renders/exterior-hero-v01.png`
- `renders/exterior-hero-v02.png`
- `renders/lobby-amenity-v01.png`
- `renders/courtyard-v01.png`
- `renders/suite-interior-v01.png`

## Best next output

Create a one-page **2008 Brimley TRMIG Opportunity Board** with:

- exterior hero render
- building overview
- zoning facts
- unit mix
- selected floor plan image
- amenity concept
- investment / operator thesis
- assumptions / risks
- next decision
