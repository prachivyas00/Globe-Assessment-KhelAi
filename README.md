# React + TypeScript + Vite

---3D Globe Visualization Assessment---

This project is a fully interactive 3D globe visualization built using React, TypeScript, Vite, and react-globe.gl, created as part of the frontend technical assessment.
The globe displays multiple player/location pins, each of which reveals an animated popup card when hovered over.
The behavior, animation style, and UI closely replicate the reference video provided.

 Features -
1. Custom SVG Location Pins

-Teardrop-shaped pin (not default globe dots).

-Soft glow, hover lift, subtle scale animation.

-6 sample location pins placed at predefined lat/lng coordinates.

-Pins do not interfere with globe rotation due to pointer event handling.

2. Smooth Hover Detection System

Instead of relying on DOM hover, the project implements:

-Pointer → screen coordinate → spherical projection matching.

-Real-time pin proximity detection using requestAnimationFrame.

-No flickering, no dead zones.

-No hover failures when switching between nearby pins

3. Animated Popup Card

Every pin has:

-Its own image

-Name

-Club

-Country

-Globe icon

-Left and right arrows

-A bottom caret tip

Using framer-motion:

-Popup fades and scales in from bottom to center.

-Transition plays every time a pin is hovered

-Popup follows globe rotation smoothly

-Popup is fully non-blocking (pointer-events: none)

4. Globe Controls

-Drag to rotate

-Auto-rotation is disabled

-Scroll to zoom

-High-quality Earth textures with night-topology shading

5. Fully Responsive & Modern Setup

-Vite for fast dev environment

-Tailwind CSS for styling utility

-TypeScript for type safety

-All UI built via reusable, semantic components


 Tech Stack -
Framework	- React 18 + TypeScript
Bundler	- Vite
CSS	- Tailwind + custom CSS
3D Globe - react-globe.gl (Three.js)
Animations -	Framer Motion
State Handling -	React hooks


 Project Structure -
src/
├── WorldGlobe.tsx        # Main globe + pins + hover detection
├── PopupCard.tsx         # Animated popup UI
├── index.css             # Tailwind + custom styling
├── main.tsx
└── App.tsx


 Run the Project -

1. Install Dependencies
npm install

2. Start
npm run dev

3. Build
npm run build


 Assessment Requirements Matched -

- 3D Globe using provided reference	         ✔️ Pixel-matched
- Custom pins instead of default dots	       ✔️ Implemented with SVG
- Hover → popup with placeholders	           ✔️ Smooth, flicker-free
- Accurate animations matching reference	   ✔️ Framer Motion transitions
- Popup follows pin on rotation	             ✔️ Uses rAF + screen projection
- Fully responsive	                         ✔️ Structured for all breakpoints
- Clean modern Tech-stacks	                 ✔️ Delivered

