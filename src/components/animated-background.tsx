import React, { useEffect, useRef, useState, useCallback } from "react";
import Spline from "@splinetool/react-spline";
import gsap from "gsap";
import * as THREE from "three";
import { Application, SplineEvent } from "@splinetool/runtime";
import { getKeyboardState, Section } from "./animated-background-config";
import { SKILLS } from "@/data/constants";
import { Skill, SkillCategory } from "@/types";

// Polyfill Spline material contract methods on Three.js Material prototype
// Spline's post-processing passes (outline, cavity, transmission, reflection, lighting)
// inspect t.material.getLayersOfType(...). This polyfill prevents any runtime TypeError.
if (typeof (THREE.Material.prototype as any).getLayersOfType !== "function") {
  (THREE.Material.prototype as any).getLayersOfType = function () {
    return [];
  };
}
if (!Array.isArray((THREE.Material.prototype as any).layers)) {
  (THREE.Material.prototype as any).layers = [];
}
if (typeof (THREE.Material.prototype as any).getLayerByUuid !== "function") {
  (THREE.Material.prototype as any).getLayerByUuid = function () {
    return undefined;
  };
}
if (typeof (THREE.Material.prototype as any).getFlavor !== "function") {
  (THREE.Material.prototype as any).getFlavor = function () {
    return this;
  };
}
if (typeof (THREE.Material.prototype as any).updateState !== "function") {
  (THREE.Material.prototype as any).updateState = function () {};
}
if (typeof (THREE.Material.prototype as any).reset !== "function") {
  (THREE.Material.prototype as any).reset = function () {};
}
(THREE.Material.prototype as any).hasAO = false;
(THREE.Material.prototype as any).assetsLoaded = function () {
  return true;
};

function patchSplineMaterialContract(material: any) {
  if (!material) return;
  if (Array.isArray(material)) {
    material.forEach(patchSplineMaterialContract);
    return;
  }
  if (typeof material.getLayersOfType !== "function") {
    material.getLayersOfType = () => [];
  }
  if (!Array.isArray(material.layers)) {
    material.layers = [];
  }
  if (typeof material.getLayerByUuid !== "function") {
    material.getLayerByUuid = () => undefined;
  }
  if (typeof material.getFlavor !== "function") {
    material.getFlavor = () => material;
  }
  if (typeof material.updateState !== "function") {
    material.updateState = () => {};
  }
  if (typeof material.reset !== "function") {
    material.reset = () => {};
  }
  material.hasAO = false;
  material.assetsLoaded = () => true;
}

// Authentic, vibrant brand colors for the 24 mechanical keyboard keys
export const KEY_COLORS: Record<string, string> = {
  // Row 0
  js: "#c88a08",        // JavaScript Warm Amber Gold (refined depth, high contrast)
  javascript: "#c88a08",
  ts: "#3178c6",        // TypeScript Vibrant Blue
  typescript: "#3178c6",
  html: "#e34f26",      // HTML5 Vibrant Orange-Red
  html5: "#e34f26",
  css: "#1572b6",       // CSS3 Vibrant Blue
  css3: "#1572b6",
  react: "#0891b2",     // React Deep Cyan (balanced ocean cyan, crisp contrast)
  reactjs: "#0891b2",
  vue: "#42b883",       // Vue.js Emerald Green
  vuejs: "#42b883",

  // Row 1
  nextjs: "#0070f3",    // Next.js Electric Blue
  next: "#0070f3",
  tailwind: "#06b6d4",  // Tailwind Cyan
  tailwindcss: "#06b6d4",
  nodejs: "#5fa04e",    // Node.js Green
  node: "#5fa04e",
  express: "#68a063",   // Express Green
  postgres: "#336791",  // PostgreSQL Navy Blue
  postgresql: "#336791",
  mongodb: "#13aa52",   // MongoDB Green
  mongo: "#13aa52",

  // Row 2
  git: "#f05032",       // Git Vibrant Orange-Red
  github: "#a855f7",    // GitHub Vibrant Purple
  prettier: "#f7b93e",  // Prettier Gold/Yellow
  npm: "#cb3837",       // npm Bright Red
  firebase: "#ffca28",  // Firebase Warm Amber
  wordpress: "#21759b", // WordPress Deep Blue

  // Row 3
  linux: "#fcc624",     // Linux Penguin Gold
  docker: "#2496ed",    // Docker Cyan-Blue
  nginx: "#009639",     // Nginx Vibrant Green
  aws: "#ff9900",       // AWS Vibrant Orange
  vim: "#019733",       // Vim Green
  vercel: "#23272f",    // Vercel Dark Charcoal / Obsidian (authentic monochrome identity)
};

const FALLBACK_SKILLS: Record<string, Skill> = {
  vue: {
    id: 901,
    name: "vue",
    label: "Vue.js",
    category: SkillCategory.FRONTEND,
    shortDescription: "Progressive, approachable framework for building reactive UIs.",
    color: "#42b883",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vuejs/vuejs-original.svg",
  },
  docker: {
    id: 902,
    name: "docker",
    label: "Docker",
    category: SkillCategory.TOOLS,
    shortDescription: "Containerization engine for reliable multi-environment builds.",
    color: "#2496ed",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg",
  },
  aws: {
    id: 903,
    name: "aws",
    label: "AWS Cloud",
    category: SkillCategory.TOOLS,
    shortDescription: "Scalable cloud infrastructure: S3, EC2, Lambda, and IAM.",
    color: "#ff9900",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-original-wordmark.svg",
  },
  wordpress: {
    id: 904,
    name: "wordpress",
    label: "WordPress",
    category: SkillCategory.FRONTEND,
    shortDescription: "Content management, custom PHP themes, and enterprise portals.",
    color: "#21759b",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/wordpress/wordpress-plain.svg",
  },
  mongodb: {
    id: 905,
    name: "mongodb",
    label: "MongoDB",
    category: SkillCategory.BACKEND,
    shortDescription: "NoSQL document-based database for flexible schema operations.",
    color: "#47a248",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg",
  },
  nginx: {
    id: 906,
    name: "nginx",
    label: "Nginx",
    category: SkillCategory.TOOLS,
    shortDescription: "High-concurrency reverse proxy, load balancer, and caching.",
    color: "#009639",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nginx/nginx-original.svg",
  },
  firebase: {
    id: 907,
    name: "firebase",
    label: "Firebase",
    category: SkillCategory.BACKEND,
    shortDescription: "Realtime database, authentication, and serverless cloud functions.",
    color: "#ffca28",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-plain.svg",
  },
  vim: {
    id: 908,
    name: "vim",
    label: "Vim",
    category: SkillCategory.TOOLS,
    shortDescription: "Ubiquitous, modal text editor optimized for high-speed development.",
    color: "#019733",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vim/vim-original.svg",
  },
  vercel: {
    id: 909,
    name: "vercel",
    label: "Vercel",
    category: SkillCategory.TOOLS,
    shortDescription: "Frontend cloud platform for zero-config global edge deployments.",
    color: "#23272f",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vercel/vercel-original.svg",
  },
  prettier: {
    id: 910,
    name: "prettier",
    label: "Prettier",
    category: SkillCategory.TOOLS,
    shortDescription: "Opinionated code formatter supporting multi-language syntax rules.",
    color: "#f7b93e",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/unified/unified-original.svg",
  },
};

const resolveSkill = (name: string): Skill | null => {
  if (!name) return null;
  const n = name.toLowerCase().replace(/^key-|^keycap-|-keycap$/, "");
  if (FALLBACK_SKILLS[n]) return FALLBACK_SKILLS[n];

  const aliases: Record<string, string> = {
    html: "html5",
    css: "css3",
    js: "javascript",
    ts: "typescript",
    node: "nodejs",
    mongo: "mongodb",
  };
  const mapped = aliases[n] || n;

  for (const s of Object.values(SKILLS)) {
    if (
      s.name.toLowerCase() === n ||
      s.name.toLowerCase() === mapped ||
      s.label.toLowerCase() === n
    ) {
      return s;
    }
  }
  return null;
};

interface AnimatedBackgroundProps {
  activeSection: string;
  theme: "dark" | "light";
  enable3D: boolean;
  skillsMode?: "3d" | "grid";
  selectedSkill?: Skill | null;
  onSkillSelect?: (skill: Skill | null) => void;
  playPressSound?: () => void;
  playReleaseSound?: () => void;
}

export const AnimatedBackground: React.FC<AnimatedBackgroundProps> = ({
  activeSection,
  theme,
  enable3D,
  skillsMode = "grid",
  selectedSkill,
  onSkillSelect,
  playPressSound,
  playReleaseSound,
}: AnimatedBackgroundProps) => {
  const [splineApp, setSplineApp] = useState<Application | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const selectedSkillRef = useRef<Skill | null>(null);
  const bongoIntervalRef = useRef<any>(null);
  const keycapAnimationsRef = useRef<{ start: () => void; stop: () => void } | null>(null);
  const teardownTweenRef = useRef<gsap.core.Tween | null>(null);
  const idleFloatingTimelineRef = useRef<gsap.core.Timeline | null>(null);
  const idleRotationTimelineRef = useRef<gsap.core.Timeline | null>(null);
  const coloredMeshesRef = useRef<THREE.Mesh[]>([]);
  const tickerRegisteredRef = useRef(false);
  const prevSectionRef = useRef<string>("hero");

  // Apply PBR MeshStandardMaterials to keycaps from root
  const applyKeyColors = useCallback((app: Application) => {
    try {
      const scene = (app as any)._scene as THREE.Scene | undefined;
      if (!scene) return;

      const coloredMeshes: THREE.Mesh[] = [];

      // Check all 24 keys in the scene
      for (const [skillKey, colorHex] of Object.entries(KEY_COLORS)) {
        const keyGroup = scene.getObjectByName(skillKey) || (app as any).findObjectByName(skillKey);
        if (!keyGroup) continue;

        keyGroup.visible = true;
        const color = new THREE.Color(colorHex);

        keyGroup.traverse((child: any) => {
          if (!child) return;

          // Ensure keycap container is visible and at rest height
          if (child.name === "keycap") {
            child.visible = true;
            child.position.y = 50;
            child.userData._origY = 50;
          }

          if (!child.isMesh) return;

          const childName = (child.name || "").trim().toLowerCase();

          // Suppress extraneous cloned template text ("JS") that overlaps the skill logos
          const isExtraneousText =
            child.name === "Text" ||
            childName === "text" ||
            (child.geometry?.type === "TextGeometry" && skillKey !== "js" && skillKey !== "ts");

          if (isExtraneousText) {
            child.visible = false;
            child.scale.set(0, 0, 0);
            child.layers.set(31);
            return;
          }

          const isLineArtOrArtifact =
            childName.includes("line-art") ||
            childName.includes("outline") ||
            childName.includes("wireframe") ||
            childName.includes("stroke") ||
            childName.includes("contour");

          if (isLineArtOrArtifact) {
            child.visible = false;
            child.scale.set(0, 0, 0);
            child.layers.set(31);
            return;
          }

          const isLogoOrLegend =
            childName.includes("legend") ||
            childName.includes("icon") ||
            childName.includes("logo") ||
            childName.includes("svg") ||
            childName.includes("shape") ||
            childName.includes("path") ||
            childName.includes("layer1") ||
            childName.includes("layer2");

          if (isLogoOrLegend) {
            child.visible = true;
            child.castShadow = false;
            child.receiveShadow = false;
            // Keep logos & legend text crisp white and visible
            if (child.material) {
              const mats = Array.isArray(child.material) ? child.material : [child.material];
              mats.forEach((m: any) => {
                if (m?.color && typeof m.color.set === "function") {
                  m.color.set("#ffffff");
                  m.needsUpdate = true;
                }
                m.roughness = 0.4;
                m.metalness = 0.0;
              });
            }
            child.layers.set(0);
            child.layers.enable(0);
            return;
          }

          child.visible = true;
          child.castShadow = false;
          child.receiveShadow = false;

          // Keycap body: create dedicated PBR material (dielectric plastic, no dark specular Fresnel reflections)
          let mat = child.userData?.customKeycapMaterial as THREE.MeshStandardMaterial | undefined;
          if (!mat) {
            mat = new THREE.MeshStandardMaterial({
              color: color,
              roughness: 0.35,
              metalness: 0.0,
              emissive: color,
              emissiveIntensity: 0.25,
            });
            patchSplineMaterialContract(mat);
            child.userData.customKeycapMaterial = mat;
            child.userData.keySkillName = skillKey;
            child.userData.brandColor = colorHex;
            child.userData.isKeycapBody = true;
            child.userData._origY = 50;
          } else {
            mat.color.copy(color);
            mat.emissive.copy(color);
            mat.emissiveIntensity = 0.25;
            mat.roughness = 0.35;
            mat.metalness = 0.0;
          }

          patchSplineMaterialContract(mat);
          if (typeof (child as any).setMaterialOverride === "function") {
            try {
              (child as any).setMaterialOverride(mat, { scene });
            } catch {}
          }
          child.material = mat;
          child.materialOverride = mat;
          child.layers.set(0);
          child.layers.enable(0);
          mat.needsUpdate = true;
          coloredMeshes.push(child as THREE.Mesh);
        });
      }

      coloredMeshesRef.current = coloredMeshes;

      // Register render ticker to permanently enforce materials against Spline runtime resets
      if (!tickerRegisteredRef.current && coloredMeshes.length > 0) {
        tickerRegisteredRef.current = true;
        gsap.ticker.add(() => {
          for (let i = 0; i < coloredMeshesRef.current.length; i++) {
            const mesh = coloredMeshesRef.current[i];
            const customMat = mesh.userData?.customKeycapMaterial;
            if (customMat && mesh.material !== customMat) {
              mesh.material = customMat;
            }
          }
        });
      }

      // Trigger scene render
      try {
        (app as any)._requestRenderAutoMode?.();
        (app as any).requestRender?.();
      } catch {}
    } catch {}
  }, []);

  // Physical keycap press action with realistic bounce and audio
  const triggerKeyPress = useCallback(
    (skillKey: string, keyGroupObj: any, app: Application) => {
      const skill = resolveSkill(skillKey);
      if (!skill) return;

      playPressSound?.();

      // Find the moving keycap container
      const scene = (app as any)._scene as THREE.Scene | undefined;
      const targetNode =
        keyGroupObj ||
        scene?.getObjectByName(skillKey) ||
        (app as any).findObjectByName(skillKey);

      if (targetNode) {
        const keycapMesh = targetNode.getObjectByName("keycap") || targetNode;
        const origY = keycapMesh.userData._origY ?? 50;
        keycapMesh.userData._origY = origY;

        // Mechanical switch depression & elastic rebound
        gsap.killTweensOf(keycapMesh.position);
        gsap.timeline()
          .to(keycapMesh.position, {
            y: origY - 20,
            duration: 0.07,
            ease: "power2.in",
          })
          .to(keycapMesh.position, {
            y: origY,
            duration: 0.36,
            ease: "elastic.out(1.3, 0.4)",
          });

        // Flash key LED glow
        targetNode.traverse((ch: any) => {
          if (ch.isMesh && ch.userData?.isKeycapBody && ch.material) {
            const mat = ch.material as THREE.MeshStandardMaterial;
            gsap.killTweensOf(mat);
            gsap.timeline()
              .to(mat, { emissiveIntensity: 0.85, duration: 0.06 })
              .to(mat, { emissiveIntensity: 0.25, duration: 0.32, ease: "power2.out" });
          }
        });
      }

      selectedSkillRef.current = skill;
      onSkillSelect?.(skill);

      // Permanently suppress 3D floating text in Spline scene
      try {
        app.setVariable("heading", "");
        app.setVariable("desc", "");
      } catch {}
    },
    [playPressSound, onSkillSelect]
  );

  // Check mobile on mount & resize
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Setup teardown & keycap floating animations for contact section
  const setupKeycapAnimations = useCallback((app: Application) => {
    let floatTweens: gsap.core.Tween[] = [];
    let settleTweens: gsap.core.Tween[] = [];

    const keycapNames = [
      "ts", "js", "html", "css", "react", "vue", "nextjs", "tailwind",
      "nodejs", "express", "postgres", "mongodb", "git", "github",
      "docker", "aws", "wordpress", "linux", "npm",
      "firebase", "nginx", "vim", "prettier", "vercel"
    ];

    const start = () => {
      floatTweens.forEach((t) => t.kill());
      settleTweens.forEach((t) => t.kill());
      floatTweens = [];
      settleTweens = [];

      applyKeyColors(app);

      keycapNames
        .sort(() => Math.random() - 0.5)
        .forEach((name, idx) => {
          const keyGroup = app.findObjectByName(name);
          if (!keyGroup) return;
          const keycap = (keyGroup as any).children?.find((c: any) => c.name === "keycap") || keyGroup;
          floatTweens.push(
            gsap.to(keycap.position, {
              y: Math.random() * 180 + 120,
              duration: Math.random() * 2 + 2,
              delay: idx * 0.1,
              repeat: -1,
              yoyo: true,
              yoyoEase: "none",
              ease: "elastic.out(1, 0.3)",
            })
          );
        });
    };

    const stop = () => {
      floatTweens.forEach((t) => t.kill());
      settleTweens.forEach((t) => t.kill());
      floatTweens = [];
      settleTweens = [];

      keycapNames.forEach((name) => {
        const keyGroup = app.findObjectByName(name);
        if (!keyGroup) return;
        const keycap = (keyGroup as any).children?.find((c: any) => c.name === "keycap") || keyGroup;
        settleTweens.push(
          gsap.to(keycap.position, {
            y: 50,
            duration: 1.2,
            ease: "elastic.out(1, 0.7)",
          })
        );
      });
    };

    return { start, stop };
  }, [applyKeyColors]);

  // Section transitions: Smooth transform animation across sections
  useEffect(() => {
    if (!splineApp) return;
    const kbd = splineApp.findObjectByName("keyboard");
    if (!kbd) return;

    const validSection = (
      ["hero", "skills", "experience", "projects", "contact"].includes(
        activeSection
      )
        ? activeSection
        : "hero"
    ) as Section;

    const state = getKeyboardState({
      section: validSection,
      isMobile,
      skillsMode,
    });

    // Stop any existing idle floating animations before transitioning
    if (idleFloatingTimelineRef.current) {
      idleFloatingTimelineRef.current.kill();
      idleFloatingTimelineRef.current = null;
    }
    if (idleRotationTimelineRef.current) {
      idleRotationTimelineRef.current.kill();
      idleRotationTimelineRef.current = null;
    }

    gsap.killTweensOf(kbd.position);
    gsap.killTweensOf(kbd.rotation);
    gsap.killTweensOf(kbd.scale);

    // Clean section transitions without glitchy bounce
    gsap.to(kbd.position, {
      x: state.position.x,
      y: state.position.y,
      z: state.position.z,
      duration: 1.2,
      ease: "power2.out",
      onComplete: () => {
        // Continuous, high-craft organic floating & rotation animation
        if (validSection === "skills") {
          // Gentle vertical floating levitation
          const floatTl = gsap.timeline({ repeat: -1, yoyo: true });
          floatTl.to(kbd.position, {
            y: state.position.y + 16,
            duration: 3.2,
            ease: "sine.inOut",
          });
          idleFloatingTimelineRef.current = floatTl;

          // Simple, clean, continuous rotation animation
          const rotTl = gsap.timeline({ repeat: -1, yoyo: true });
          rotTl
            .to(kbd.rotation, {
              y: state.rotation.y + 0.38,
              x: state.rotation.x + 0.04,
              duration: 3.8,
              ease: "sine.inOut",
            })
            .to(kbd.rotation, {
              y: state.rotation.y - 0.38,
              x: state.rotation.x - 0.03,
              duration: 3.8,
              ease: "sine.inOut",
            });
          idleRotationTimelineRef.current = rotTl;
        } else if (validSection === "hero" || validSection === "experience") {
          const floatTl = gsap.timeline({ repeat: -1, yoyo: true });
          floatTl.to(kbd.position, {
            y: state.position.y + 12,
            duration: 3.2,
            ease: "sine.inOut",
          });
          idleFloatingTimelineRef.current = floatTl;

          const rotTl = gsap.timeline({ repeat: -1, yoyo: true });
          rotTl.to(kbd.rotation, {
            x: state.rotation.x + 0.03,
            y: state.rotation.y + 0.04,
            duration: 4.2,
            ease: "sine.inOut",
          });
          idleRotationTimelineRef.current = rotTl;
        }
      },
    });

    gsap.to(kbd.rotation, {
      x: state.rotation.x,
      y: state.rotation.y,
      z: state.rotation.z,
      duration: 1.2,
      ease: "power2.out",
    });

    gsap.to(kbd.scale, {
      x: state.scale.x,
      y: state.scale.y,
      z: state.scale.z,
      duration: 1.2,
      ease: "power2.out",
    });

    // Contact Section: floating keys
    if (validSection === "contact") {
      teardownTweenRef.current?.restart();
      keycapAnimationsRef.current?.start();
    } else if (prevSectionRef.current === "contact") {
      teardownTweenRef.current?.pause();
      keycapAnimationsRef.current?.stop();
    }
    prevSectionRef.current = validSection;

    // Refresh colors on skills or contact
    if (validSection === "skills" || validSection === "contact") {
      applyKeyColors(splineApp);
    }

    // Bongo cat in projects section
    const framesParent = splineApp.findObjectByName("bongo-cat");
    const frame1 = splineApp.findObjectByName("frame-1");
    const frame2 = splineApp.findObjectByName("frame-2");

    if (framesParent && frame1 && frame2) {
      if (validSection === "projects") {
        framesParent.visible = true;
        if (!bongoIntervalRef.current) {
          let step = 0;
          bongoIntervalRef.current = setInterval(() => {
            if (step % 2 === 0) {
              frame1.visible = true;
              frame2.visible = false;
            } else {
              frame1.visible = false;
              frame2.visible = true;
            }
            step++;
          }, 120);
        }
      } else {
        if (bongoIntervalRef.current) {
          clearInterval(bongoIntervalRef.current);
          bongoIntervalRef.current = null;
        }
        framesParent.visible = false;
        frame1.visible = false;
        frame2.visible = false;
      }
    }

    // Reset 3D text when leaving skills
    if (validSection !== "skills") {
      try {
        splineApp.setVariable("heading", "");
        splineApp.setVariable("desc", "");
      } catch {}
    }
  }, [activeSection, splineApp, isMobile, skillsMode, applyKeyColors]);

  // Synchronize external skill selection (from blurred cards) with physical 3D key press
  useEffect(() => {
    if (!splineApp || !selectedSkill) return;
    const scene = (splineApp as any)._scene as THREE.Scene | undefined;
    const keyObj =
      scene?.getObjectByName(selectedSkill.name) ||
      (splineApp as any).findObjectByName(selectedSkill.name);
    triggerKeyPress(selectedSkill.name, keyObj, splineApp);
  }, [selectedSkill, splineApp, triggerKeyPress]);

  // Completely suppress surrounding 3D text in the Spline keyboard scene
  useEffect(() => {
    if (!splineApp) return;
    try {
      const textDesktopDark = splineApp.findObjectByName("text-desktop-dark");
      const textDesktopLight = splineApp.findObjectByName("text-desktop");
      const textMobileDark = splineApp.findObjectByName("text-mobile-dark");
      const textMobileLight = splineApp.findObjectByName("text-mobile");
      const textDesktopLight2 = splineApp.findObjectByName("text-desktop-light");
      const textMobileLight2 = splineApp.findObjectByName("text-mobile-light");

      [
        textDesktopDark,
        textDesktopLight,
        textMobileDark,
        textMobileLight,
        textDesktopLight2,
        textMobileLight2,
      ].forEach((textObj) => {
        if (textObj) {
          textObj.visible = false;
          textObj.scale?.set?.(0, 0, 0);
          if (textObj.layers) textObj.layers.set(31);
        }
      });

      splineApp.setVariable("heading", "");
      splineApp.setVariable("desc", "");
    } catch {}
  }, [splineApp, activeSection]);

  // Comprehensive Raycasting Click & Hover Listeners
  useEffect(() => {
    if (!splineApp) return;

    const canvas = (splineApp as any).canvas as HTMLCanvasElement | null;
    const camera = (splineApp as any)._camera as THREE.Camera | null;
    const scene = (splineApp as any)._scene as THREE.Scene | null;
    if (!canvas || !camera || !scene) return;

    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();

    const getRaycastKey = (clientX: number, clientY: number) => {
      const rect = canvas.getBoundingClientRect();
      if (
        clientX < rect.left ||
        clientX > rect.right ||
        clientY < rect.top ||
        clientY > rect.bottom
      ) {
        return null;
      }

      mouse.x = ((clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -((clientY - rect.top) / rect.height) * 2 + 1;

      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObjects(scene.children, true);

      if (!intersects || intersects.length === 0) return null;

      for (const hit of intersects) {
        let curr: any = hit.object;
        while (curr) {
          if (curr.userData?.keySkillName) {
            return { skillKey: curr.userData.keySkillName, keyGroupObj: curr };
          }
          const n = (curr.name || "").toLowerCase().replace(/^key-|^keycap-|-keycap$/, "");
          if (KEY_COLORS[n] || resolveSkill(n)) {
            return { skillKey: n, keyGroupObj: curr };
          }
          curr = curr.parent;
        }
      }
      return null;
    };

    // Click handler for 3D keys
    const handlePointerDown = (e: PointerEvent) => {
      const result = getRaycastKey(e.clientX, e.clientY);
      if (result) {
        triggerKeyPress(result.skillKey, result.keyGroupObj, splineApp);
      }
    };

    const handlePointerUp = () => {
      playReleaseSound?.();
    };

    // Hover cursor feedback
    const handlePointerMove = (e: PointerEvent) => {
      const result = getRaycastKey(e.clientX, e.clientY);
      canvas.style.cursor = result ? "pointer" : "default";
      if (containerRef.current) {
        containerRef.current.style.cursor = result ? "pointer" : "default";
      }
    };

    // Keyboard typing support: typing letters triggers matching keycaps
    const handleWindowKeyDown = (e: KeyboardEvent) => {
      const activeEl = document.activeElement;
      if (
        activeEl &&
        (activeEl.tagName === "INPUT" ||
          activeEl.tagName === "TEXTAREA" ||
          (activeEl as HTMLElement).isContentEditable)
      ) {
        return;
      }

      const keyChar = e.key.toLowerCase();
      const keyMap: Record<string, string> = {
        h: "html",
        c: "css",
        j: "js",
        t: "ts",
        r: "react",
        v: "vue",
        n: "nodejs",
        e: "express",
        p: "postgres",
        m: "mongodb",
        g: "git",
        b: "github",
        d: "docker",
        a: "aws",
        w: "wordpress",
        l: "linux",
        x: "nginx",
        k: "vim",
        s: "tailwind",
        f: "firebase",
        u: "npm",
        q: "prettier",
        y: "vercel",
      };

      const matchedKey = keyMap[keyChar];
      if (matchedKey) {
        const keyObj = scene.getObjectByName(matchedKey) || (splineApp as any).findObjectByName(matchedKey);
        if (keyObj) {
          triggerKeyPress(matchedKey, keyObj, splineApp);
        }
      }
    };

    canvas.addEventListener("pointerdown", handlePointerDown);
    window.addEventListener("pointerup", handlePointerUp);
    canvas.addEventListener("pointermove", handlePointerMove);
    window.addEventListener("keydown", handleWindowKeyDown);

    return () => {
      canvas.removeEventListener("pointerdown", handlePointerDown);
      window.removeEventListener("pointerup", handlePointerUp);
      canvas.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("keydown", handleWindowKeyDown);
    };
  }, [splineApp, triggerKeyPress, playReleaseSound]);

  // Initial load: Set idle keyboard state immediately with NO awkward entrance drop
  const handleSplineLoad = async (app: Application) => {
    setSplineApp(app);

    const kbd = app.findObjectByName("keyboard");
    if (!kbd) return;

    // Ensure all keycaps are visible and positioned at surface height (y: 50) on the switches
    const allObjects = app.getAllObjects();
    const keycaps = allObjects.filter((obj) => obj.name === "keycap");
    keycaps.forEach((keycap) => {
      keycap.visible = true;
      keycap.position.y = 50;
      (keycap as any).userData = (keycap as any).userData || {};
      (keycap as any).userData._origY = 50;
    });

    const scene = (app as any)._scene as THREE.Scene | undefined;
    if (scene) {
      scene.traverse((obj: any) => {
        if (obj.name === "keycap") {
          obj.visible = true;
          obj.position.y = 50;
          obj.userData._origY = 50;
        }
        if (obj.isLight) {
          obj.castShadow = false;
          if (obj.shadow) {
            obj.shadow.bias = -0.0005;
            obj.shadow.normalBias = 0.05;
          }
        }
        if (obj.isMesh) {
          obj.castShadow = false;
          obj.receiveShadow = false;
        }
      });
    }

    // Disable shadow mapping on renderer to eliminate shadow acne and dark crevice marks
    try {
      const renderer = (app as any)._renderer || (app as any).renderer;
      if (renderer && renderer.shadowMap) {
        renderer.shadowMap.enabled = false;
      }
    } catch {}

    // Disable any postprocessing outline, cavity, or AO effect that could generate dark marks between keys
    try {
      const activePage = (app as any)._scene?.activePage;
      if (activePage?.data?.postprocessing) {
        const pp = activePage.data.postprocessing;
        if (pp.outline) pp.outline.enabled = false;
        if (pp.cavity) pp.cavity.enabled = false;
        if (pp.ambientOcclusion) pp.ambientOcclusion.enabled = false;
      }
    } catch {}

    // Suppress all extraneous text nodes and surrounding 3D text (e.g. Vercel floating descriptions)
    const textNames = [
      "text-desktop-dark",
      "text-desktop",
      "text-mobile-dark",
      "text-mobile",
      "text-desktop-light",
      "text-mobile-light",
      "text",
      "Text",
    ];
    textNames.forEach((name) => {
      const obj = app.findObjectByName(name) as any;
      if (obj) {
        obj.visible = false;
        if (obj.scale && typeof obj.scale.set === "function") {
          obj.scale.set(0, 0, 0);
        } else if (obj.scale) {
          obj.scale.x = 0;
          obj.scale.y = 0;
          obj.scale.z = 0;
        }
        if (obj.layers?.set) obj.layers.set(31);
      }
    });

    try {
      app.setVariable("heading", "");
      app.setVariable("desc", "");
    } catch {}

    // Suppress any extraneous cloned template text nodes ("JS") from non-JS keycaps
    for (const skillKey of Object.keys(KEY_COLORS)) {
      if (skillKey === "js" || skillKey === "ts") continue;
      const keyGroup = scene?.getObjectByName(skillKey) || (app as any).findObjectByName(skillKey);
      if (keyGroup) {
        keyGroup.traverse((obj: any) => {
          const name = (obj.name || "").trim().toLowerCase();
          if (name === "text" || obj.geometry?.type === "TextGeometry") {
            obj.visible = false;
            obj.scale.set(0, 0, 0);
            obj.layers.set(31);
          }
        });
      }
    }

    // Apply colors immediately and with staggered retries for reliable setup
    applyKeyColors(app);
    setTimeout(() => applyKeyColors(app), 100);
    setTimeout(() => applyKeyColors(app), 500);
    setTimeout(() => applyKeyColors(app), 1200);

    // Initial position in hero section: Immediately idle, NO drop from upside!
    const heroState = getKeyboardState({ section: "hero", isMobile });
    kbd.position.x = heroState.position.x;
    kbd.position.y = heroState.position.y;
    kbd.position.z = heroState.position.z;
    kbd.rotation.x = heroState.rotation.x;
    kbd.rotation.y = heroState.rotation.y;
    kbd.rotation.z = heroState.rotation.z;
    kbd.scale.x = heroState.scale.x;
    kbd.scale.y = heroState.scale.y;
    kbd.scale.z = heroState.scale.z;

    // Initialize teardown tween for contact section
    teardownTweenRef.current = gsap.fromTo(
      kbd.rotation,
      { y: 0, x: -Math.PI, z: 0 },
      {
        y: -Math.PI / 2,
        duration: 5,
        repeat: -1,
        yoyo: true,
        yoyoEase: true,
        delay: 1.5,
        immediateRender: false,
        paused: true,
      }
    );
    keycapAnimationsRef.current = setupKeycapAnimations(app);

    // Native Spline hover event integration
    app.addEventListener("mouseHover", (e: SplineEvent) => {
      if (!e.target) return;
      const targetName = (e.target.name || "").toLowerCase().replace(/^key-|^keycap-|-keycap$/, "");
      const skill = resolveSkill(targetName);
      if (skill && selectedSkillRef.current?.name !== skill.name) {
        playPressSound?.();
        selectedSkillRef.current = skill;
        onSkillSelect?.(skill);
        try {
          app.setVariable("heading", skill.label);
          app.setVariable("desc", skill.shortDescription);
        } catch {}
      }
    });
  };

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-0 pointer-events-none overflow-hidden select-none"
    >
      {/* Pure black background for dark mode as requested */}
      <div
        className={`absolute inset-0 transition-colors duration-700 ${
          theme === "dark" ? "bg-black" : "bg-white"
        }`}
      />

      {/* Subtle ambient lighting for depth */}
      <div
        className={`absolute top-0 right-1/4 w-[600px] h-[600px] rounded-full blur-[140px] pointer-events-none transition-opacity duration-700 ${
          theme === "dark"
            ? "bg-zinc-800/10 opacity-30"
            : "bg-zinc-200/50 opacity-60"
        }`}
      />

      {/* Spline 3D Scene */}
      {enable3D && (
        <div className="absolute inset-0 w-full h-full pointer-events-auto">
          <Spline
            scene="/assets/skills-keyboard.spline"
            onLoad={handleSplineLoad}
            className="w-full h-full"
          />
        </div>
      )}
    </div>
  );
};
