"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

export function CreativiaTracker() {
  const pathname = usePathname();

  useEffect(() => {
    // Evita di inviare page_view doppie per la stessa sessione
    const hasVisited = sessionStorage.getItem("creativia_visited");

    if (!hasVisited) {
      sessionStorage.setItem("creativia_visited", "true");
      
      const payload = {
        client_id: "50f8c61e-e6dd-43e8-8aa5-79e639b4c2ea", // ID Ciesse Home
        event: "page_view",
        timestamp: new Date().toISOString(),
        url: window.location.href,
        user_agent: navigator.userAgent,
        data: []
      };

      fetch("https://n8n.creativiastudio.com/webhook/master-creativia-os", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
      }).catch(err => console.error("Creativia Tracker Error:", err));
    }
  }, [pathname]);

  return null;
}
