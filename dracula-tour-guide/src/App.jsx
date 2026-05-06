import { useState } from "react";

const CITIES = [
  {
    id: "london",
    name: "London",
    country: "United Kingdom",
    flag: "🇬🇧",
    dates: "20 May – 8 Jun 2026",
    timezone: "BST (UTC+1) — 9 hours behind AEST",
    currency: "British Pound (GBP £). Contactless payment accepted almost everywhere — tap your card or phone. ATMs widely available.",
    tipping: "Not mandatory. 10–12.5% in restaurants if service charge not included. No tipping in pubs, cafés, or taxis unless you want to round up.",
    weather: "Late May / early June: 14–20°C during the day, cooler at night. Rain is always possible — bring a light waterproof jacket. Daylight until ~9pm.",
    plugType: "Type G (three rectangular pins). You will need a travel adaptor — Australian plugs won't fit. Buy one at any supermarket or Boots.",
    voltage: "230V / 50Hz — same as Australia. No voltage converter needed, just the adaptor.",
    rideApp: "Uber",
    emergency: { police: "999", ambulance: "999", fire: "999", nonEmergency: "111 (NHS non-emergency medical advice, 24/7)" },
    embassy: { name: "Australian High Commission", address: "Australia House, Strand, London WC2B 4LA", phone: "+44 20 7379 4334", note: "Open Mon–Fri. Nearest Tube: Temple or Holborn." },
    pharmacy: "Boots pharmacies are everywhere — look for the blue logo. Several are open late, including Boots Piccadilly Circus (open until 9pm most days).",
    sim: "Buy a UK SIM at any Tesco, Sainsbury's, or phone shop. Vodafone, Three, and EE all have pay-as-you-go options from ~£10. Alternatively, check if your Australian carrier has a roaming add-on. Free Wi-Fi in most cafés.",
    transport: {
      overview: "London's public transport is excellent. The Tube (Underground), buses, and Overground all accept contactless payment — just tap your Australian bank card or phone at the barriers. No need to buy an Oyster card unless you prefer one.",
      apps: "Citymapper (best for London), Google Maps, TfL Go",
      tips: [
        "Contactless fares are capped daily — you won't pay more than ~£8.10/day in Zones 1–2",
        "Avoid rush hour (8–9:30am, 5–6:30pm) if you can — trains are packed",
        "Night Tube runs Fri/Sat nights on some lines (Central, Victoria, Jubilee, Northern, Piccadilly)",
        "Buses are £1.75 flat fare and a great way to see the city"
      ]
    },
    accommodation: [
      {
        name: "Mermaid Suites Hotel",
        address: "3–4 Blenheim Street, London W1S 1LA",
        phone: "+44 (0)20 7629 1875",
        email: "info@mermaidsuite.com",
        checkIn: "Wed 20 May",
        checkOut: "Tue 9 Jun",
        nearestTransport: "Bond Street station (Jubilee, Central, Elizabeth lines) — 3-min walk. Oxford Circus station (Victoria, Bakerloo, Central lines) — 5-min walk.",
        notes: "In Mayfair — very central. Plenty of shops, cafés, and restaurants within a few minutes' walk."
      }
    ],
    venues: [
      {
        name: "The London Palladium",
        dates: "Sat 23 May (bump in) – Sat 30 May",
        mainAddress: "8 Argyll Street, Soho, London W1F 7TF",
        stageAddress: "Great Marlborough Street (off Argyll Street)",
        nearestTransport: "Oxford Circus station (Victoria, Bakerloo, Central lines) — 2-min walk from stage door.",
        fromHotel: "~0.4 miles / ~9-minute walk from Mermaid Suites",
        directions: "Head south on Blenheim St, turn right onto New Bond St, continue to Oxford St, cross and walk down Argyll St. The Palladium is on your left.",
        coffee: [
          { name: "Hideaway Coffee House", rating: "4.8", reviews: 1220, address: "7 Farrier's Passage, W1D 7DP", note: "Hidden courtyard café in Soho — 5 min walk. Great flat whites.", hours: "Mon–Fri 7:30am–5pm, Sat 9am–5:30pm, Sun 9am–5pm" },
          { name: "Lever & Bloom", rating: "4.9", reviews: 888, address: "222 Shaftesbury Ave, WC2H 8EB", note: "Outstanding cinnamon buns and specialty coffee — 8 min walk.", hours: "Mon–Fri 8am–6pm, Sat–Sun 9am–6pm" }
        ],
        performances: [
          { date: "Sun 24 May", time: "7:00pm" }, { date: "Mon 25 May", time: "Matinée + Evening" },
          { date: "Tue 26 May", time: "7:00pm" }, { date: "Wed 27 May", time: "Matinée + Evening" },
          { date: "Thu 28 May", time: "7:00pm" }, { date: "Fri 29 May", time: "Matinée + Evening" },
          { date: "Sat 30 May", time: "TBC + Bump Out" }
        ]
      },
      {
        name: "Sadler's Wells Theatre",
        dates: "Tue 2 Jun (bump in) – Sun 7 Jun",
        mainAddress: "Rosebery Avenue, London EC1R 4TN",
        stageAddress: "Arlington Way, London EC1R 4TN",
        nearestTransport: "Angel station (Northern line) — 5-min walk. Buses 19, 38, 341 stop on Rosebery Avenue.",
        fromHotel: "~2.3 miles from Mermaid Suites. Walk (~53 min) or take the Tube.",
        directions: "Oxford Circus Tube → Victoria line to King's Cross St Pancras → walk (~15 min) or change to Northern line to Angel Station (then 5-min walk).",
        coffee: [
          { name: "Devotion Coffee", rating: "4.9", reviews: 112, address: "55 Rosebery Ave, EC1R 4SD", note: "On the same street as Sadler's Wells — excellent espresso.", hours: "Mon–Fri 7am–5pm, Sat 8am–5pm, Sun 9am–5pm" },
          { name: "Rose & Rose", rating: "4.9", reviews: 89, address: "400 St John St, EC1V 4NJ", note: "Cosy neighbourhood café near Angel — great matcha and coffee.", hours: "Mon–Thu 7:15am–5:30pm, Fri to 3:30pm" }
        ],
        performances: [
          { date: "Wed 3 Jun", time: "7:30pm" }, { date: "Thu 4 Jun", time: "7:30pm" },
          { date: "Fri 5 Jun", time: "7:30pm" }, { date: "Sat 6 Jun", time: "2:30pm + 7:30pm" },
          { date: "Sun 7 Jun", time: "1:00pm + 6:00pm + Bump Out" }
        ]
      }
    ],
    restDays: ["Sun 31 May – Mon 1 Jun", "Mon 8 Jun"],
    thingsToDo: [
      { category: "Near the Hotel (Mayfair / Soho)", items: ["Walk through Soho and Carnaby Street — great for food, coffee, and people-watching", "Regent's Park — 15-min walk north, perfect for stretching out on a rest day", "Hyde Park / Kensington Gardens — 20-min walk west", "Liberty London (Great Marlborough St, near the Palladium) — iconic department store"] },
      { category: "Free & Low-Cost", items: ["British Museum — free entry, 20 min by Tube (Tottenham Court Road)", "National Gallery / Trafalgar Square — free entry", "Tate Modern — free entry, walk across the Millennium Bridge from St Paul's", "South Bank walk along the Thames — street performers, food stalls, views", "Sky Garden — free viewing gallery at 20 Fenchurch St (book online)"] },
      { category: "Food", items: ["Borough Market (Southwark) — incredible street food, open Thu–Sat", "Dishoom (various locations) — Bombay-style café, worth the queue", "Flat Iron (various) — great steak for ~£15", "Pret A Manger, Leon, and Itsu for quick, affordable lunches everywhere", "Sunday roast at any decent pub — a London essential"] }
    ]
  },
  {
    id: "edinburgh",
    name: "Edinburgh",
    country: "United Kingdom",
    flag: "🇬🇧",
    dates: "9 – 13 Jun 2026",
    timezone: "BST (UTC+1) — 9 hours behind AEST",
    currency: "British Pound (GBP £). Same as London. Scottish banknotes look different but are legal tender.",
    tipping: "Same as London. Not mandatory.",
    weather: "Early June: 10–17°C. Can be windy. Layers are essential — the weather can change several times in a day.",
    plugType: "Type G — same as London. Your UK adaptor will work here.",
    voltage: "230V / 50Hz — same as Australia.",
    rideApp: "Uber",
    emergency: { police: "999", ambulance: "999", fire: "999", nonEmergency: "111" },
    embassy: { name: "Australian Honorary Consulate", address: "No permanent consulate — nearest full services at Australian High Commission in London.", phone: "+44 20 7379 4334 (London)", note: "For emergencies: 24-hour Consular Emergency Centre +61 2 6261 3305." },
    pharmacy: "Boots on Princes Street. Independent pharmacies on Nicolson Street near the venue.",
    sim: "Same UK SIM as London will work.",
    transport: {
      overview: "Edinburgh's compact Old Town and New Town are very walkable. Lothian Buses cover the wider city. Edinburgh Trams run from the airport to the city centre.",
      apps: "Google Maps, Lothian Buses app",
      tips: ["Single bus fare is £2.00 — exact change or contactless only", "The city centre is hilly — wear comfortable shoes", "Waverley Station is the main train station, right in the centre", "Most things you'll need are within walking distance"]
    },
    accommodation: [
      { name: "Travelodge Edinburgh Central", address: "33 St Mary's Street, Edinburgh EH1 1TA", nearestTransport: "Edinburgh Waverley station — 10-min walk. Bus stops on South Bridge / Nicolson Street — 5-min walk.", notes: "In the Old Town, close to the Royal Mile. ~15-min walk to Festival Theatre." },
      { name: "Travelodge Edinburgh Central Queen Street", address: "30–31 Queen Street, Edinburgh EH2 1JX", nearestTransport: "Edinburgh Waverley station — 10-min walk. St Andrew Square tram stop — 5-min walk.", notes: "In the New Town. ~31-min walk to Festival Theatre via Waverley." }
    ],
    venues: [
      {
        name: "Festival Theatre Edinburgh",
        dates: "Thu 11 Jun (bump in) – Sat 13 Jun",
        mainAddress: "13–29 Nicolson Street, Edinburgh EH8 9FT",
        stageAddress: "Same address — stage door at Nicolson Street",
        nearestTransport: "Lothian bus stops on Nicolson Street directly outside the venue. Edinburgh Waverley — 15-min walk north.",
        fromHotel: "~15 min walk from St Mary's St. ~31 min walk from Queen St.",
        directions: "From Queen St: south through Princes St Gardens or via Waverley Bridge, continue through Old Town and down Nicolson Street.",
        coffee: [
          { name: "Not Just Coffee", rating: "4.6", reviews: 146, address: "33 W Nicolson St, EH8 9DB", note: "Steps from the venue — great brownies and chai latte.", hours: "Mon–Sat 8:30am–5:30pm, Sun 9:30am–5:30pm" },
          { name: "Guajira Café & Coffee", rating: "4.9", reviews: 669, address: "18 St Mary's St, EH1 1SU", note: "Near St Mary's Travelodge — Colombian-inspired, fantastic brunch.", hours: "Tue–Sun 9:30am–5pm, closed Mon" }
        ],
        performances: [
          { date: "Fri 12 Jun", time: "7:30pm" },
          { date: "Sat 13 Jun", time: "2:30pm + 7:00pm + Bump Out" }
        ]
      }
    ],
    restDays: [],
    thingsToDo: [
      { category: "Must See", items: ["Edinburgh Castle — dominates the skyline, worth a visit", "Royal Mile — walk from the Castle down to Holyrood Palace", "Arthur's Seat — proper hill climb, stunning views (1.5–2 hrs return)", "Calton Hill — easier climb, beautiful panoramic views"] },
      { category: "Free & Low-Cost", items: ["National Museum of Scotland (Chambers St) — free, 5 min from venue", "Scottish National Gallery — free, on the Mound", "Walk through Princes Street Gardens", "Dean Village — hidden gem along the Water of Leith"] },
      { category: "Food", items: ["The Elephant House — famous café on Nicolson St, near the venue", "Mary's Milk Bar — artisan gelato on the Grassmarket", "Brew Lab and Cairngorm Coffee for specialty coffee", "Haggis, neeps, and tatties at any traditional pub"] }
    ]
  },
  {
    id: "sanfrancisco",
    name: "San Francisco",
    country: "United States",
    flag: "🇺🇸",
    dates: "29 Jun – 12 Jul 2026",
    timezone: "PDT (UTC−7) — 17 hours behind AEST",
    currency: "US Dollar (USD $). Cards accepted almost everywhere. Carry a small amount of cash for tips.",
    tipping: "Expected and important. 18–20% at sit-down restaurants. $1–2 per drink at bars. Tip rideshare drivers 15–20%. Not tipping is considered very rude.",
    weather: "San Francisco in July is NOT like the rest of California. Expect 13–20°C, heavy morning fog, and wind. Bring layers and a warm jacket.",
    plugType: "Type A/B (two flat parallel pins). You WILL need a different adaptor from the UK one. Buy at any Target, Walgreens, or airport shop.",
    voltage: "120V / 60Hz — DIFFERENT from Australia. Phone/laptop chargers are usually fine (check the small print). Hair dryers and straighteners may NOT work — check before plugging in.",
    rideApp: "Uber/Lyft",
    emergency: { police: "911", ambulance: "911", fire: "911", nonEmergency: "311 (city services)" },
    embassy: { name: "Australian Consulate-General", address: "575 Market Street, Suite 1800, San Francisco, CA 94105", phone: "+1 415 644 3620", note: "Open Mon–Fri. ~15-min walk from hotel. After-hours: +61 2 6261 3305." },
    pharmacy: "Walgreens and CVS are the main chains. Walgreens at 135 Powell Street is close to the hotel.",
    sim: "Buy a US prepaid SIM at any Target or phone shop. T-Mobile and Mint Mobile have affordable options. Or get an eSIM before you leave (Airalo or similar).",
    transport: {
      overview: "BART is the subway/metro (connects to the airport). Muni covers buses and light rail within the city. Cable cars are fun but more tourist than transport.",
      apps: "Google Maps, Citymapper, Uber/Lyft",
      tips: [
        "Get a Clipper card for BART and Muni — buy at any BART station or Walgreens",
        "Muni fare is $2.50 per ride (free transfers within 2 hours)",
        "BART from SFO airport to downtown is ~$10, about 30 minutes",
        "The Tenderloin area (near hotel and venue) can feel rough — stay aware at night, stick to main streets",
        "Uber/Lyft are widely used and often cheaper than taxis",
        "The hills are real — much hillier than it looks on a map"
      ]
    },
    accommodation: [
      {
        name: "Mr Pickwick Hotel",
        address: "85 Fifth Street, San Francisco, CA 94103",
        phone: "+1 415-421-7500",
        checkIn: "Mon 29 Jun", checkOut: "Mon 13 Jul",
        nearestTransport: "Powell Street BART/Muni station — 5-min walk (connects to airport and city-wide). Multiple Muni bus stops on Market Street.",
        notes: "Downtown near Union Square. The Tenderloin / Mid-Market neighbourhood is gritty — this is normal for this part of SF. Keep valuables out of sight and stay on well-lit main streets at night."
      }
    ],
    venues: [
      {
        name: "Orpheum Theatre",
        dates: "Tue 30 Jun (bump in) – Sun 12 Jul",
        mainAddress: "1192 Market Street, San Francisco, CA 94102",
        stageAddress: "Stage door on Grove Street (side of building)",
        nearestTransport: "Civic Center / UN Plaza BART/Muni station — 2-min walk (directly across the street).",
        fromHotel: "~0.6 miles / ~14-minute walk",
        directions: "Head west on Market Street from the hotel. The Orpheum is on the left, near Civic Center / UN Plaza.",
        coffee: [
          { name: "La Cuisine Cafe", rating: "4.6", reviews: 290, address: "1145 Market St, CA 94103", note: "Next door to the Orpheum — charming French-style café, great pastries. Opens 5am.", hours: "Daily 5am–7pm" },
          { name: "Paris Cafe", rating: "4.6", reviews: 116, address: "142 McAllister St, CA 94102", note: "Two blocks from the theatre — quiet, excellent croissants.", hours: "Mon–Fri 7am–6pm, Sat–Sun 8am–5pm" },
          { name: "Telescope Coffee", rating: "4.6", reviews: 283, address: "345 6th St, CA 94103", note: "Near the hotel — honeycomb latte is a favourite.", hours: "Mon–Fri 7am–4pm, Sat–Sun 7am–3pm" }
        ],
        performances: [
          { date: "Thu 2 Jul", time: "7:00pm (TBC)" }, { date: "Fri 3 Jul", time: "7:00pm" },
          { date: "Sat 4 Jul", time: "Mat + Eve (TBC) — US Independence Day" },
          { date: "Sun 5 Jul", time: "1:00pm + 6:00pm" }, { date: "Tue 7 Jul", time: "7:00pm" },
          { date: "Wed 8 Jul", time: "7:00pm" }, { date: "Thu 9 Jul", time: "7:00pm" },
          { date: "Fri 10 Jul", time: "7:00pm" }, { date: "Sat 11 Jul", time: "1:00pm + 7:00pm" },
          { date: "Sun 12 Jul", time: "1:00pm + Bump Out" }
        ]
      }
    ],
    restDays: ["Mon 6 Jul"],
    thingsToDo: [
      { category: "Must See", items: ["Golden Gate Bridge — walk or cycle across (~$30/day bike hire)", "Alcatraz Island — book well in advance at alcatrazcruises.com", "Cable car ride from Powell St to Fisherman's Wharf", "Painted Ladies / Alamo Square — the iconic 'Full House' houses", "Chinatown — oldest in North America, fantastic food"] },
      { category: "Free & Low-Cost", items: ["Golden Gate Park — massive park with gardens and museums", "Walk the Embarcadero from Ferry Building to Fisherman's Wharf", "Dolores Park in the Mission — people-watching and city views", "Street art in the Mission (Clarion Alley, Balmy Alley)"] },
      { category: "Food", items: ["Ferry Building Marketplace — artisan food hall (Sat farmer's market)", "Mission District burritos — La Taqueria or El Farolito", "Blue Bottle Coffee — multiple locations", "Tartine Bakery (Mission) — legendary pastries", "Dim sum in Chinatown — Good Mong Kok Bakery"] }
    ]
  },
  {
    id: "singapore",
    name: "Singapore",
    country: "Singapore",
    flag: "🇸🇬",
    dates: "13 – 19 Jul 2026",
    timezone: "SGT (UTC+8) — 2 hours behind AEST",
    currency: "Singapore Dollar (SGD $). Cards widely accepted. Hawker centres often cash-only — carry $20–50.",
    tipping: "Not expected. Many restaurants include 10% service charge. No need to tip.",
    weather: "Hot and humid. July: 25–32°C, humidity 80%+. Sudden tropical downpours most afternoons — they pass quickly. Stay hydrated. A/C is aggressive indoors — a light layer can be useful inside.",
    plugType: "Type G (three rectangular pins) — same as the UK. Your UK adaptor will work.",
    voltage: "230V / 50Hz — same as Australia. No issues.",
    rideApp: "Grab",
    emergency: { police: "999", ambulance: "995", fire: "995", nonEmergency: "1777 (non-emergency ambulance)" },
    embassy: { name: "Australian High Commission", address: "25 Napier Road, Singapore 258507", phone: "+65 6836 4100", note: "Open Mon–Fri. After-hours: +61 2 6261 3305." },
    pharmacy: "Guardian and Watsons — in most malls and MRT stations.",
    sim: "Buy a tourist SIM at Changi Airport (Singtel, StarHub, M1) from ~$15 for 100GB. Free Wi-Fi (Wireless@SG) in most public spaces.",
    transport: {
      overview: "Singapore's MRT is fast, clean, air-conditioned, and covers almost the entire island. Taxis and Grab (the local Uber) are affordable.",
      apps: "Google Maps, Citymapper, Grab (essential — install before you arrive)",
      tips: [
        "EZ-Link or SimplyGo card at any MRT station (~$5 + top-up). Or tap your bank card.",
        "MRT fares: typically $1–3 per trip. Trains run ~5:30am to midnight.",
        "Grab is the go-to rideshare app",
        "Esplanade MRT station (Circle Line) is directly connected to the venue",
        "Chewing gum is illegal to sell (you won't be arrested for having it, but don't litter)"
      ]
    },
    accommodation: [
      { name: "To Be Confirmed", address: "Details will be provided closer to the Singapore dates.", nearestTransport: "TBC.", notes: "Check with Jen (Company Manager) for updates." }
    ],
    venues: [
      {
        name: "Esplanade Theatre",
        dates: "Mon 13 Jul (bump in) – Sun 19 Jul",
        mainAddress: "1 Esplanade Drive, Singapore 038981",
        stageAddress: "Loading dock and stage door via Esplanade Drive",
        nearestTransport: "Esplanade MRT (Circle Line, Exit A) — 2-min walk, directly connected. City Hall MRT (East-West & North-South lines) — 5-min walk via underground link.",
        fromHotel: "TBC once accommodation is confirmed",
        directions: "Esplanade MRT (Circle Line, Exit A) is directly connected. Short MRT ride or taxi from most central hotels.",
        coffee: [
          { name: "Muro Coffee Esplanade", rating: "4.6", reviews: 70, address: "8 Raffles Ave, #01-13E Annexe", note: "In the Esplanade complex — homemade strawberry matcha is a standout. Closed Wednesdays.", hours: "Mon–Tue, Thu 9am–6pm, Fri–Sun 10am–8pm" },
          { name: "Blue Label Coffee", rating: "4.5", reviews: 111, address: "90 Bras Basah Rd, #B1-24", note: "Esplanade Xchange — specialty coffee and good food.", hours: "Mon–Fri 7:30am–5:30pm, Sat–Sun 9am–7pm" },
          { name: "Nanyang Old Coffee", rating: "4.3", reviews: 153, address: "90 Bras Basah Rd, #B1-25", note: "Traditional Singaporean kopi and kaya toast — the authentic local coffee experience.", hours: "Mon–Fri 7:30am–6pm, Sat–Sun 9am–7pm" }
        ],
        performances: [
          { date: "Tue 14 Jul", time: "8:00pm" }, { date: "Wed 15 Jul", time: "8:00pm" },
          { date: "Thu 16 Jul", time: "8:00pm" }, { date: "Fri 17 Jul", time: "8:00pm" },
          { date: "Sat 18 Jul", time: "3:00pm + 8:00pm" },
          { date: "Sun 19 Jul", time: "2:00pm + Bump Out" }
        ]
      }
    ],
    restDays: [],
    thingsToDo: [
      { category: "Must See", items: ["Marina Bay Sands — free light show nightly at 8pm and 9pm from the waterfront", "Gardens by the Bay — Supertree Grove light show free nightly (7:45pm + 8:45pm)", "Merlion Park — the famous statue, free", "Chinatown — temples, street art, hawker food", "Little India — colourful and vibrant"] },
      { category: "Free & Low-Cost", items: ["Botanic Gardens — UNESCO World Heritage, free entry", "Walk the Southern Ridges — 10km elevated trail through parks", "Haji Lane in Kampong Glam — street art, indie shops, cafés", "Henderson Waves bridge — stunning architectural walkway", "East Coast Park — beach, cycling, BBQ culture"] },
      { category: "Food (Singapore's best feature)", items: ["Hawker centres — incredible meals for $3–8 SGD", "Maxwell Food Centre — try Tian Tian Hainanese Chicken Rice", "Lau Pa Sat — heritage hawker centre, great satay", "Kaya toast + soft-boiled eggs + kopi at Ya Kun Kaya Toast", "Chilli crab at Jumbo Seafood or No Signboard (~$40–60pp)"] }
    ]
  }
];

const CONTACTS = [
  { role: "Artistic Director", name: "Joel Burke", email: "contact@bigliveco.com" },
  { role: "Executive Director", name: "Khalid Tarabay", email: "contact@bigliveco.com" },
  { role: "Company Manager", name: "Jennifer Burke", email: "contact@bigliveco.com" },
  { role: "Production Manager", name: "Locky Young", email: "contact@bigliveco.com" },
  { role: "Marketing Manager", name: "Jonathan Oakes", email: "contact@bigliveco.com" },
];

const Chev = ({ open }) => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" style={{ transform: open ? "rotate(180deg)" : "rotate(0)", transition: "transform 0.25s ease", flexShrink: 0 }}>
    <path d="M5 7.5L10 12.5L15 7.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);
const Section = ({ icon, title, children, defaultOpen = false }) => {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
      <button onClick={() => setOpen(!open)} style={{ width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between", padding: "16px 0", background: "none", border: "none", color: "#F5F0EB", cursor: "pointer", fontFamily: "'Playfair Display', Georgia, serif", fontSize: "15px", fontWeight: 500, letterSpacing: "0.5px", textAlign: "left", gap: "8px" }}>
        <span style={{ display: "flex", alignItems: "center", gap: "10px", flex: 1 }}><span style={{ fontSize: "18px", opacity: 0.7 }}>{icon}</span>{title}</span>
        <Chev open={open} />
      </button>
      {open && <div style={{ paddingBottom: "20px", color: "#bbb", fontSize: "14px", lineHeight: 1.7 }}>{children}</div>}
    </div>
  );
};
const IC = ({ label, value }) => (
  <div style={{ background: "rgba(255,255,255,0.03)", borderRadius: "8px", padding: "12px 14px", marginBottom: "8px", border: "1px solid rgba(255,255,255,0.05)" }}>
    <div style={{ fontSize: "11px", textTransform: "uppercase", letterSpacing: "1.5px", color: "#8A0B0B", fontWeight: 600, marginBottom: "4px" }}>{label}</div>
    <div style={{ color: "#e8e0d8", fontSize: "14px", lineHeight: 1.6 }}>{value}</div>
  </div>
);
const CC = ({ c }) => (
  <div style={{ background: "rgba(90,60,20,0.08)", borderRadius: "8px", padding: "12px 14px", marginBottom: "8px", border: "1px solid rgba(180,130,50,0.12)" }}>
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "4px" }}>
      <span style={{ fontWeight: 600, color: "#e8e0d8", fontSize: "14px" }}>☕ {c.name}</span>
      <span style={{ fontSize: "12px", color: "#d4a843", fontWeight: 600, whiteSpace: "nowrap", marginLeft: "8px" }}>★ {c.rating} ({c.reviews})</span>
    </div>
    <div style={{ fontSize: "12px", color: "#999", marginBottom: "3px" }}>{c.address}</div>
    <div style={{ fontSize: "13px", color: "#bbb", marginBottom: "3px" }}>{c.note}</div>
    <div style={{ fontSize: "11px", color: "#777" }}>{c.hours}</div>
  </div>
);

export default function TourGuide() {
  const [activeCity, setActiveCity] = useState("london");
  const [showContacts, setShowContacts] = useState(false);
  const city = CITIES.find(c => c.id === activeCity);

  return (
    <div style={{ background: "#0a0a0a", minHeight: "100vh", color: "#F5F0EB", fontFamily: "'Inter', system-ui, -apple-system, sans-serif" }}>
      <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;1,500;1,700&family=Inter:wght@300;400;500;600&display=swap" rel="stylesheet" />
      <div style={{ background: "linear-gradient(180deg, #111 0%, #0a0a0a 100%)", borderBottom: "1px solid rgba(138,11,11,0.3)", padding: "24px 20px 20px" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div>
            <div style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: "11px", letterSpacing: "3px", textTransform: "uppercase", color: "#8A0B0B", fontWeight: 600, marginBottom: "4px" }}>BIG Live</div>
            <h1 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: "26px", fontWeight: 700, margin: 0, letterSpacing: "1px", lineHeight: 1.2 }}>
              <span style={{ fontStyle: "italic", color: "#8A0B0B" }}>Dracula</span> International Tour
            </h1>
            <div style={{ fontSize: "13px", color: "#777", marginTop: "4px" }}>May – July 2026</div>
          </div>
          <button onClick={() => setShowContacts(!showContacts)} style={{ background: showContacts ? "#8A0B0B" : "rgba(138,11,11,0.15)", border: "1px solid rgba(138,11,11,0.4)", color: showContacts ? "#fff" : "#e05050", borderRadius: "8px", padding: "10px 14px", fontSize: "11px", fontWeight: 600, letterSpacing: "1px", textTransform: "uppercase", cursor: "pointer", transition: "all 0.2s ease" }}>
            {showContacts ? "✕ Close" : "☎ Contacts"}
          </button>
        </div>
      </div>
      {showContacts && (
        <div style={{ background: "#111", borderBottom: "1px solid rgba(138,11,11,0.3)", padding: "20px" }}>
          <h3 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: "16px", fontWeight: 600, margin: "0 0 14px" }}>Management Contacts</h3>
          {CONTACTS.map((c, i) => (
            <div key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", padding: "10px 0", borderBottom: i < CONTACTS.length - 1 ? "1px solid rgba(255,255,255,0.04)" : "none" }}>
              <div><div style={{ fontSize: "14px", fontWeight: 500, color: "#e8e0d8" }}>{c.name}</div><div style={{ fontSize: "12px", color: "#777", marginTop: "2px" }}>{c.role}</div></div>
              <a href={`mailto:${c.email}`} style={{ fontSize: "12px", color: "#8A0B0B", textDecoration: "none", fontWeight: 500 }}>{c.email}</a>
            </div>
          ))}
          <div style={{ marginTop: "14px", padding: "12px 14px", background: "rgba(138,11,11,0.08)", borderRadius: "8px", border: "1px solid rgba(138,11,11,0.15)" }}>
            <div style={{ fontSize: "12px", color: "#e05050", fontWeight: 600, marginBottom: "4px" }}>24/7 Consular Emergency</div>
            <div style={{ fontSize: "14px", color: "#e8e0d8" }}>+61 2 6261 3305 (Australian Government)</div>
          </div>
        </div>
      )}
      <>
          <div style={{ display: "flex", gap: 0, borderBottom: "1px solid rgba(255,255,255,0.06)", overflowX: "auto", WebkitOverflowScrolling: "touch" }}>
            {CITIES.map(c => (
              <button key={c.id} onClick={() => setActiveCity(c.id)} style={{ flex: "1 0 auto", padding: "14px 16px", background: activeCity === c.id ? "rgba(138,11,11,0.1)" : "transparent", border: "none", borderBottom: activeCity === c.id ? "2px solid #8A0B0B" : "2px solid transparent", color: activeCity === c.id ? "#F5F0EB" : "#666", cursor: "pointer", whiteSpace: "nowrap", fontSize: "13px", fontWeight: activeCity === c.id ? 600 : 400, letterSpacing: "0.5px" }}>
                <span style={{ marginRight: "6px" }}>{c.flag}</span>{c.name}
              </button>
            ))}
          </div>
          <div style={{ padding: "20px" }}>
            <div style={{ marginBottom: "20px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "4px" }}>
                <span style={{ fontSize: "24px" }}>{city.flag}</span>
                <h2 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: "28px", fontWeight: 700, margin: 0 }}>{city.name}</h2>
              </div>
              <div style={{ fontSize: "14px", color: "#777" }}>{city.dates}</div>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px", marginBottom: "16px" }}>
              <div style={{ background: "rgba(255,255,255,0.03)", borderRadius: "8px", padding: "12px", border: "1px solid rgba(255,255,255,0.05)" }}>
                <div style={{ fontSize: "18px", marginBottom: "4px" }}>🕐</div>
                <div style={{ fontSize: "11px", color: "#8A0B0B", textTransform: "uppercase", letterSpacing: "1px", fontWeight: 600, marginBottom: "2px" }}>Time Zone</div>
                <div style={{ fontSize: "13px", color: "#bbb", lineHeight: 1.4 }}>{city.timezone}</div>
              </div>
              <div style={{ background: "rgba(255,255,255,0.03)", borderRadius: "8px", padding: "12px", border: "1px solid rgba(255,255,255,0.05)" }}>
                <div style={{ fontSize: "18px", marginBottom: "4px" }}>🌡️</div>
                <div style={{ fontSize: "11px", color: "#8A0B0B", textTransform: "uppercase", letterSpacing: "1px", fontWeight: 600, marginBottom: "2px" }}>Weather</div>
                <div style={{ fontSize: "13px", color: "#bbb", lineHeight: 1.4 }}>{city.weather.split(".")[0]}.</div>
              </div>
            </div>
            <div style={{ background: "rgba(138,11,11,0.06)", borderRadius: "8px", padding: "12px 14px", marginBottom: "20px", border: "1px solid rgba(138,11,11,0.12)", display: "flex", gap: "10px", alignItems: "flex-start" }}>
              <span style={{ fontSize: "16px", flexShrink: 0 }}>🚕</span>
              <div style={{ fontSize: "13px", color: "#ccc", lineHeight: 1.5 }}>
                <strong style={{ color: "#e05050" }}>After dark:</strong> Use {city.rideApp} or a licensed taxi for late-night travel. If taking public transport at night, travel in groups — never alone.
              </div>
            </div>

            <Section icon="📅" title="Schedule & Performances" defaultOpen={true}>
              {city.venues.map((v, i) => (
                <div key={i} style={{ marginBottom: i < city.venues.length - 1 ? "20px" : 0 }}>
                  <div style={{ fontWeight: 600, color: "#e8e0d8", fontSize: "15px", marginBottom: "8px" }}>{v.name}</div>
                  <div style={{ fontSize: "13px", color: "#777", marginBottom: "10px" }}>{v.dates}</div>
                  <div style={{ display: "grid", gap: "4px" }}>
                    {v.performances.map((p, j) => (
                      <div key={j} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "8px 12px", background: "rgba(255,255,255,0.02)", borderRadius: "6px", border: "1px solid rgba(255,255,255,0.04)" }}>
                        <span style={{ fontWeight: 500, color: "#e8e0d8", fontSize: "13px" }}>{p.date}</span>
                        <span style={{ color: "#8A0B0B", fontSize: "13px", fontWeight: 500 }}>{p.time}</span>
                      </div>
                    ))}
                  </div>
                  {city.restDays.length > 0 && i === city.venues.length - 1 && (
                    <div style={{ marginTop: "12px" }}>
                      <div style={{ fontSize: "12px", color: "#777", textTransform: "uppercase", letterSpacing: "1px", fontWeight: 600, marginBottom: "6px" }}>Rest Days</div>
                      {city.restDays.map((rd, k) => (
                        <div key={k} style={{ padding: "8px 12px", background: "rgba(46,107,58,0.08)", borderRadius: "6px", border: "1px solid rgba(46,107,58,0.15)", color: "#6dbe82", fontSize: "13px", fontWeight: 500, marginBottom: "4px" }}>✦ {rd}</div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </Section>

            <Section icon="🏨" title="Accommodation">
              {city.accommodation.map((a, i) => (
                <div key={i} style={{ marginBottom: i < city.accommodation.length - 1 ? "16px" : 0 }}>
                  <div style={{ fontWeight: 600, color: "#e8e0d8", fontSize: "15px", marginBottom: "8px" }}>{a.name}</div>
                  <IC label="Address" value={a.address} />
                  {a.phone && <IC label="Phone" value={a.phone} />}
                  {a.email && <IC label="Email" value={a.email} />}
                  {a.checkIn && <IC label="Check-in / Check-out" value={`${a.checkIn} → ${a.checkOut}`} />}
                  <IC label="Nearest Public Transport" value={a.nearestTransport} />
                  {a.notes && <div style={{ fontSize: "13px", color: "#999", marginTop: "8px", lineHeight: 1.6, fontStyle: "italic" }}>💡 {a.notes}</div>}
                </div>
              ))}
            </Section>

            <Section icon="🎭" title="Venues & Directions">
              {city.venues.map((v, i) => (
                <div key={i} style={{ marginBottom: i < city.venues.length - 1 ? "20px" : 0 }}>
                  <div style={{ fontWeight: 600, color: "#e8e0d8", fontSize: "15px", marginBottom: "8px" }}>{v.name}</div>
                  <IC label="Main Entrance" value={v.mainAddress} />
                  <IC label="Stage Door" value={v.stageAddress} />
                  <IC label="Nearest Public Transport" value={v.nearestTransport} />
                  <IC label="From Hotel" value={v.fromHotel} />
                  <IC label="Directions" value={v.directions} />
                </div>
              ))}
            </Section>

            <Section icon="☕" title="Coffee Near the Venue">
              {city.venues.map((v, i) => (
                <div key={i} style={{ marginBottom: i < city.venues.length - 1 ? "16px" : 0 }}>
                  {city.venues.length > 1 && <div style={{ fontSize: "12px", color: "#8A0B0B", textTransform: "uppercase", letterSpacing: "1px", fontWeight: 600, marginBottom: "10px" }}>Near {v.name}</div>}
                  {v.coffee.map((c, j) => <CC key={j} c={c} />)}
                </div>
              ))}
            </Section>

            <Section icon="🚇" title="Getting Around">
              <div style={{ marginBottom: "12px", color: "#e8e0d8", lineHeight: 1.7 }}>{city.transport.overview}</div>
              <IC label="Useful Apps" value={city.transport.apps} />
              <div style={{ marginTop: "12px" }}>
                <div style={{ fontSize: "12px", color: "#8A0B0B", textTransform: "uppercase", letterSpacing: "1px", fontWeight: 600, marginBottom: "8px" }}>Tips</div>
                {city.transport.tips.map((t, i) => (
                  <div key={i} style={{ display: "flex", gap: "8px", marginBottom: "6px", fontSize: "13px", lineHeight: 1.6 }}>
                    <span style={{ color: "#8A0B0B", flexShrink: 0 }}>›</span><span>{t}</span>
                  </div>
                ))}
              </div>
            </Section>

            <Section icon="💰" title="Currency, Tipping & Essentials">
              <IC label="Currency" value={city.currency} />
              <IC label="Tipping" value={city.tipping} />
              <IC label="Weather" value={city.weather} />
              <IC label="Plug Type" value={city.plugType} />
              <IC label="Voltage" value={city.voltage} />
              <IC label="Pharmacy" value={city.pharmacy} />
              <IC label="SIM Card / Connectivity" value={city.sim} />
            </Section>

            <Section icon="🏥" title="Emergency & Support">
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px", marginBottom: "12px" }}>
                <div style={{ background: "rgba(138,11,11,0.1)", borderRadius: "8px", padding: "14px", border: "1px solid rgba(138,11,11,0.2)", textAlign: "center" }}>
                  <div style={{ fontSize: "22px", fontWeight: 700, color: "#e05050", fontFamily: "'Playfair Display', Georgia, serif" }}>{city.emergency.police}</div>
                  <div style={{ fontSize: "11px", color: "#999", textTransform: "uppercase", letterSpacing: "1px", marginTop: "4px" }}>Police</div>
                </div>
                <div style={{ background: "rgba(138,11,11,0.1)", borderRadius: "8px", padding: "14px", border: "1px solid rgba(138,11,11,0.2)", textAlign: "center" }}>
                  <div style={{ fontSize: "22px", fontWeight: 700, color: "#e05050", fontFamily: "'Playfair Display', Georgia, serif" }}>{city.emergency.ambulance}</div>
                  <div style={{ fontSize: "11px", color: "#999", textTransform: "uppercase", letterSpacing: "1px", marginTop: "4px" }}>Ambulance</div>
                </div>
              </div>
              {city.emergency.nonEmergency && <IC label="Non-Emergency" value={city.emergency.nonEmergency} />}
              <div style={{ marginTop: "12px" }}>
                <div style={{ fontWeight: 600, color: "#e8e0d8", fontSize: "14px", marginBottom: "8px" }}>{city.embassy.name}</div>
                <IC label="Address" value={city.embassy.address} />
                <IC label="Phone" value={city.embassy.phone} />
                {city.embassy.note && <div style={{ fontSize: "13px", color: "#999", marginTop: "6px", fontStyle: "italic" }}>ℹ️ {city.embassy.note}</div>}
              </div>
              <div style={{ marginTop: "14px", padding: "12px 14px", background: "rgba(138,11,11,0.08)", borderRadius: "8px", border: "1px solid rgba(138,11,11,0.15)" }}>
                <div style={{ fontSize: "12px", color: "#e05050", fontWeight: 600, marginBottom: "4px" }}>24/7 Australian Consular Emergency Line</div>
                <div style={{ fontSize: "16px", color: "#e8e0d8", fontWeight: 600 }}>+61 2 6261 3305</div>
                <div style={{ fontSize: "12px", color: "#777", marginTop: "4px" }}>Available from anywhere in the world, any time.</div>
              </div>
            </Section>

            <Section icon="🗺️" title="Things to Do">
              {city.thingsToDo.map((cat, i) => (
                <div key={i} style={{ marginBottom: i < city.thingsToDo.length - 1 ? "16px" : 0 }}>
                  <div style={{ fontSize: "13px", color: "#8A0B0B", textTransform: "uppercase", letterSpacing: "1px", fontWeight: 600, marginBottom: "8px" }}>{cat.category}</div>
                  {cat.items.map((item, j) => (
                    <div key={j} style={{ display: "flex", gap: "8px", marginBottom: "6px", fontSize: "13px", lineHeight: 1.6 }}>
                      <span style={{ color: "#555", flexShrink: 0 }}>•</span><span>{item}</span>
                    </div>
                  ))}
                </div>
              ))}
            </Section>
          </div>
        </>
      <div style={{ padding: "30px 20px", textAlign: "center", borderTop: "1px solid rgba(255,255,255,0.04)" }}>
        <div style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: "14px", letterSpacing: "2px", textTransform: "uppercase", color: "#8A0B0B", marginBottom: "6px" }}>BIG Live</div>
        <div style={{ fontSize: "12px", color: "#555" }}>Dracula International Tour 2026</div>
        <div style={{ fontSize: "11px", color: "#333", marginTop: "8px" }}>Confidential — BIG Live cast and crew only.</div>
      </div>
    </div>
  );
}
