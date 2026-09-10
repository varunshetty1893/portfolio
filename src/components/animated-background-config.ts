export type Section = "hero" | "skills" | "experience" | "projects" | "contact";

export const STATES: Record<
  Section,
  {
    desktop: {
      scale: { x: number; y: number; z: number };
      position: { x: number; y: number; z: number };
      rotation: { x: number; y: number; z: number };
    };
    mobile: {
      scale: { x: number; y: number; z: number };
      position: { x: number; y: number; z: number };
      rotation: { x: number; y: number; z: number };
    };
  }
> = {
  hero: {
    desktop: {
      scale: { x: 0.19, y: 0.19, z: 0.19 },
      position: { x: 380, y: -90, z: 0 },
      rotation: { x: 0, y: 0, z: 0 },
    },
    mobile: {
      scale: { x: 0.28, y: 0.28, z: 0.28 },
      position: { x: 0, y: -220, z: 0 },
      rotation: { x: 0, y: 0, z: 0 },
    },
  },
  skills: {
    desktop: {
      scale: { x: 0.25, y: 0.25, z: 0.25 },
      position: { x: 0, y: -40, z: 0 },
      rotation: {
        x: 0,
        y: Math.PI / 12,
        z: 0,
      },
    },
    mobile: {
      scale: { x: 0.3, y: 0.3, z: 0.3 },
      position: { x: 0, y: -40, z: 0 },
      rotation: {
        x: 0,
        y: Math.PI / 6,
        z: 0,
      },
    },
  },
  experience: {
    desktop: {
      scale: { x: 0.25, y: 0.25, z: 0.25 },
      position: { x: 0, y: -40, z: 0 },
      rotation: {
        x: Math.PI / 12,
        y: -Math.PI / 4,
        z: 0,
      },
    },
    mobile: {
      scale: { x: 0.3, y: 0.3, z: 0.3 },
      position: { x: 0, y: -40, z: 0 },
      rotation: {
        x: Math.PI / 6,
        y: -Math.PI / 6,
        z: 0,
      },
    },
  },
  projects: {
    desktop: {
      scale: { x: 0.25, y: 0.25, z: 0.25 },
      position: { x: 0, y: -40, z: 0 },
      rotation: {
        x: Math.PI,
        y: Math.PI / 3,
        z: Math.PI,
      },
    },
    mobile: {
      scale: { x: 0.3, y: 0.3, z: 0.3 },
      position: { x: 0, y: 150, z: 0 },
      rotation: {
        x: Math.PI,
        y: Math.PI / 3,
        z: Math.PI,
      },
    },
  },
  contact: {
    desktop: {
      scale: { x: 0.22, y: 0.22, z: 0.22 },
      position: { x: 350, y: -240, z: 0 },
      rotation: {
        x: 0,
        y: 0,
        z: 0,
      },
    },
    mobile: {
      scale: { x: 0.25, y: 0.25, z: 0.25 },
      position: { x: 0, y: 150, z: 0 },
      rotation: {
        x: Math.PI,
        y: Math.PI / 3,
        z: Math.PI,
      },
    },
  },
};

export const getKeyboardState = ({
  section,
  isMobile,
  skillsMode = "3d",
}: {
  section: Section;
  isMobile: boolean;
  skillsMode?: "3d" | "grid";
}) => {
  let baseTransform = STATES[section] ? STATES[section][isMobile ? "mobile" : "desktop"] : STATES.hero.desktop;

  // When viewing full skills grid catalog, move the keyboard out of view so it doesn't overlap cards
  if (section === "skills" && skillsMode === "grid") {
    baseTransform = {
      position: { x: isMobile ? 0 : 800, y: isMobile ? 600 : -40, z: -250 },
      scale: { x: 0.02, y: 0.02, z: 0.02 },
      rotation: { x: 0, y: 0, z: 0 },
    };
  }

  const getScaleOffset = () => {
    if (typeof window === "undefined") return 1;
    const width = window.innerWidth;
    const DESKTOP_REF_WIDTH = 1280;
    const MOBILE_REF_WIDTH = 390;
    const targetScale = isMobile
      ? width / MOBILE_REF_WIDTH
      : width / DESKTOP_REF_WIDTH;
    const minScale = isMobile ? 0.5 : 0.5;
    const maxScale = isMobile ? 0.6 : 1.15;
    return Math.min(Math.max(targetScale, minScale), maxScale);
  };
  const scaleOffset = getScaleOffset();
  return {
    ...baseTransform,
    scale: {
      x: Math.abs(baseTransform.scale.x * scaleOffset),
      y: Math.abs(baseTransform.scale.y * scaleOffset),
      z: Math.abs(baseTransform.scale.z * scaleOffset),
    },
  };
};
