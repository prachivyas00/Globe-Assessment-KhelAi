// import React from "react";
import { motion } from "framer-motion";

type PopupCardProps = {
  image: string;
  name: string;
  club: string;
  country: string;
  isVisible: boolean;
};

export default function PopupCard({
  image,
  name,
  club,
  country,
  isVisible
}: PopupCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.85, y: 6 }}
      animate={isVisible ? { opacity: 1, scale: 1, y: 0 } : { opacity: 0, scale: 0.85, y: 6 }}
      transition={{
        duration: 0.8,
        ease: [0.2, 0.9, 0.2, 1]
      }}
      className="popup-card pointer-events-none absolute left-1/2 -translate-x-1/2 bottom-7"
    >
      <div className="popup-card-inner relative">
        <div className="relative">
          <img src={image} alt={name} className="popup-image" />

          <div className="popup-arrow arrow-left absolute">
            <svg viewBox="0 0 24 24" fill="none">
              <path
                d="M15 6L9 12l6 6"
                stroke="#fff"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>

          <div className="popup-arrow arrow-right absolute">
            <svg viewBox="0 0 24 24" fill="none">
              <path
                d="M9 6l6 6-6 6"
                stroke="#fff"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </div>

        <div className="popup-body">
          <div className="popup-title">{name}</div>
          <div className="popup-sub">{club}</div>

          <div className="popup-country">
           <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
  <circle
    cx="12"
    cy="12"
    r="10"
    stroke="#b9b9bd"
    strokeWidth="1.5"
  />
  <path
    d="M2 12h20"
    stroke="#b9b9bd"
    strokeWidth="1.2"
    strokeLinecap="round"
  />
  <path
    d="M12 2c3 3.5 3 16.5 0 20"
    stroke="#b9b9bd"
    strokeWidth="1.2"
    strokeLinecap="round"
  />
  <path
    d="M12 2c-3 3.5-3 16.5 0 20"
    stroke="#b9b9bd"
    strokeWidth="1.2"
    strokeLinecap="round"
  />
</svg>

            <div>{country}</div>
          </div>
        </div>
      </div>

      <div className="flex justify-center mt-1 popup-tip">
        <svg width="14" height="8" viewBox="0 0 14 8" fill="none">
          <path d="M7 8L0 0h14L7 8z" fill="#111214" />
        </svg>
      </div>
    </motion.div>
  );
}
