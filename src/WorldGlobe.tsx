// @ts-nocheck

import { useEffect, useRef, useState } from "react";
import Globe from "react-globe.gl";
import PopupCard from "./PopupCard";

type PinDatum = {
  id: number;
  lat: number;
  lng: number;
  name: string;
  club: string;
  country: string;
  image: string;
};

const pins: PinDatum[] = [
  {
    id: 1,
    lat: 33.8869,
    lng: 9.5375,
    name: "Faouzi Ghoulam",
    club: "Hatayspor",
    country: "Algeria",
    image: "https://africanfootball.com/bp_images/2018/02/Faouzi_Ghoulam580.jpg",
  },
  {
    id: 2,
    lat: 41.9028,
    lng: 12.4964,
    name: "Liolel Messi",
    club: "Inter Miami",
    country: "Argentina",
    image: "https://imageio.forbes.com/specials-images/imageserve/663e595b4509f97fdafb95f5/0x0.jpg?format=jpg&crop=383,383,x1045,y23,safe&height=416&width=416&fit=bounds",
  },
  {
    id: 3,
    lat: 51.5074,
    lng: -0.1278,
    name: "John Smith",
    club: "London FC",
    country: "United Kingdom",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR0a7zMZ10OziFWJBF-Bvv1m3hROWJGGGTR_Q&s",
  },
  {
    id: 4,
    lat: 40.4168,
    lng: -3.7038,
    name: "Kylian Mbappe",
    club: "Real Madrid",
    country: "France",
    image: "https://www.planetsport.com/image-library/land/1200/k/kylian-mbappe-psg-france-3-april-2022.webp",
  },
  {
    id: 5,
    lat: 19.4326,
    lng: -99.1332,
    name: "Carlos Vela",
    club: "Mexico United",
    country: "Mexico",
    image: "https://i.pinimg.com/736x/d9/bd/6e/d9bd6eeae1da779b6df88895a9e16ccf.jpg",
  },
  {
    id: 6,
    lat: 34.0522,
    lng: -118.2437,
    name: "Zlatan Ibrahimovic",
    club: "LA Stars",
    country: "USA",
    image: "https://assets.bundesliga.com/contender/2024/4/imago1034602594h.jpg?crop=374px,0px,3751px,3001px&fit=540,540",
  },
];

export default function WorldGlobe(): JSX.Element {
  const globeRef = useRef<any>(null);

  const [hoveredPin, setHoveredPin] = useState<number | null>(null);
  const [popupCoords, setPopupCoords] = useState<{ x: number; y: number } | null>(null);

  useEffect(() => {
    const g = globeRef.current;
    if (!g) return;
    g.controls().autoRotate = false;
  }, []);

  const mouse = useRef<{ x: number; y: number } | null>(null);

  useEffect(() => {
    function onMove(e: MouseEvent) {
      mouse.current = { x: e.clientX, y: e.clientY };
    }
    document.addEventListener("mousemove", onMove);
    return () => document.removeEventListener("mousemove", onMove);
  }, []);

  useEffect(() => {
    let id: number;

    function loop() {
      id = requestAnimationFrame(loop);

      const m = mouse.current;
      const g = globeRef.current;
      if (!m || !g) return;

      let bestPin: PinDatum | null = null;
      let bestDist = Infinity;
      let bestScreen: { x: number; y: number } | null = null;

      for (const p of pins) {
        let screen = null;

        if (typeof g.getScreenCoords === "function") {
          screen = g.getScreenCoords(p.lat, p.lng);
        }

        if (!screen) continue;

        const dx = screen.x - m.x;
        const dy = screen.y - m.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < bestDist) {
          bestDist = dist;
          bestPin = p;
          bestScreen = screen;
        }
      }

      const HIT_RADIUS = 36;

      if (bestPin && bestDist < HIT_RADIUS) {
        if (hoveredPin !== bestPin.id) {
          setHoveredPin(bestPin.id);
          setPopupCoords(bestScreen!);
        } else {
          setPopupCoords(bestScreen!);
        }
      } else {
        if (hoveredPin !== null) {
          setHoveredPin(null);
          setPopupCoords(null);
        }
      }
    }

    loop();
    return () => cancelAnimationFrame(id);
  }, [hoveredPin]);

  function createPinElement(d: PinDatum): HTMLDivElement {
    const wrap = document.createElement("div");
    wrap.style.position = "relative";
    wrap.style.transform = "translate(-50%, -100%)";
    wrap.style.width = "36px";
    wrap.style.height = "48px";
    wrap.style.pointerEvents = "none";

    const glow = document.createElement("div");
    glow.className = "pin-glow";
    glow.style.pointerEvents = "none";
    wrap.appendChild(glow);

    const svgNS = "http://www.w3.org/2000/svg";
    const svg = document.createElementNS(svgNS, "svg");
    svg.setAttribute("viewBox", "0 0 24 32");
    svg.setAttribute("width", "36");
    svg.setAttribute("height", "48");
    svg.classList.add("pin-marker");
    svg.style.pointerEvents = "none";
    wrap.appendChild(svg);

    const path = document.createElementNS(svgNS, "path");
    path.setAttribute("d", "M12 2 C8 2 4 6 4 10 c0 6 8 18 8 18 s8-12 8-18 C20 6 16 2 12 2 z");
    path.setAttribute("fill", "#ff6b3d");
    path.setAttribute("stroke", "rgba(0,0,0,0.25)");
    path.setAttribute("stroke-width", "0.6");
    svg.appendChild(path);

    const hl = document.createElementNS(svgNS, "ellipse");
    hl.setAttribute("cx", "9.5");
    hl.setAttribute("cy", "8");
    hl.setAttribute("rx", "3.2");
    hl.setAttribute("ry", "2.2");
    hl.setAttribute("fill", "rgba(255,255,255,0.24)");
    svg.appendChild(hl);

    const badge = document.createElement("div");
    badge.className = "pin-badge";
    badge.style.pointerEvents = "none";
    badge.textContent = String(d.id);
    wrap.appendChild(badge);

    return wrap;
  }

  return (
    <div className="w-full h-full relative">
      <Globe
        ref={globeRef}
        globeImageUrl="//unpkg.com/three-globe/example/img/earth-night.jpg"
        bumpImageUrl="//unpkg.com/three-globe/example/img/earth-topology.png"
        backgroundColor="rgba(0,0,0,0)"
        pointsData={[]}
        htmlElementsData={pins}
        htmlLat={(d) => d.lat}
        htmlLng={(d) => d.lng}
        htmlElement={createPinElement as any}
        width={window.innerWidth}
        height={window.innerHeight}
      />

      {hoveredPin && popupCoords && (() => {
  const pin = pins.find((p) => p.id === hoveredPin);
  if (!pin) return null;
  return (
    <div
      style={{
        position: "absolute",
        left: popupCoords.x,
        top: popupCoords.y - 20,
        transform: "translate(-50%, -100%)",
        pointerEvents: "none",
        zIndex: 50,
      }}
    >
      <PopupCard
        image={pin.image}
        name={pin.name}
        club={pin.club}
        country={pin.country}
        isVisible={true}
      />
    </div>
  );
})()}

    </div>
  );
}

