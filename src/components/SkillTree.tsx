import React, { useEffect, useRef, useState } from 'react';
import {
  FaPython,
  FaReact,
  FaNode,
  FaDatabase,
  FaGitAlt,
  FaDocker,
  FaJava,
} from 'react-icons/fa';
import {
  SiTypescript,
  SiJavascript,
  SiPostgresql,
  SiMongodb,
  SiMysql,
  SiTailwindcss,
  SiPostman,
  SiNextdotjs,
  SiGoland,
  SiKubernetes,
  SiJenkins,
  SiTerraform,
  SiAnsible,
  SiAmazon,
  SiGitlab,
  SiHelm,
  SiArgo,
  SiExpress,
  SiCaddy,
  SiPrometheus,
  SiGrafana,
} from 'react-icons/si';
import {
  TbBoxMultiple,
  TbShield,
  TbChartBar,
  TbCloud,
  TbNetwork,
  TbBrain,
  TbTerminal,
  TbCheck,
} from 'react-icons/tb';

interface Skill {
  id: string;
  name: string;
  level: number;
  category:
    | 'languages'
    | 'frontend'
    | 'backend'
    | 'devops'
    | 'cloud'
    | 'security'
    | 'monitoring'
    | 'mlops';
  connections: string[];
  icon: React.ReactNode;
  x?: number;
  y?: number;
}

const SKILLS: Skill[] = [
  // Programming Languages
  {
    id: 'go',
    name: 'Go',
    level: 5,
    category: 'languages',
    connections: ['postgresql', 'mysql', 'caddy', 'kubernetes'],
    icon: <SiGoland className="w-5 h-5 text-indigo-500 dark:text-indigo-400" />,
  },
  {
    id: 'typescript',
    name: 'TypeScript',
    level: 5,
    category: 'languages',
    connections: ['react', 'nextjs', 'nodejs'],
    icon: (
      <SiTypescript className="w-5 h-5 text-indigo-600 dark:text-indigo-500" />
    ),
  },
  {
    id: 'javascript',
    name: 'JavaScript',
    level: 5,
    category: 'languages',
    connections: ['nodejs', 'react'],
    icon: (
      <SiJavascript className="w-5 h-5 text-indigo-500 dark:text-indigo-400" />
    ),
  },
  {
    id: 'python',
    name: 'Python',
    level: 5,
    category: 'languages',
    connections: ['ansible', 'aws', 'mlflow', 'dvc', 'great_expectations'],
    icon: <FaPython className="w-5 h-5 text-indigo-500 dark:text-indigo-400" />,
  },
  {
    id: 'java',
    name: 'Java',
    level: 4,
    category: 'languages',
    connections: ['jenkins', 'kubernetes'],
    icon: <FaJava className="w-5 h-5 text-indigo-600 dark:text-indigo-500" />,
  },
  {
    id: 'sql',
    name: 'SQL',
    level: 4,
    category: 'languages',
    connections: ['postgresql', 'mysql'],
    icon: (
      <FaDatabase className="w-5 h-5 text-indigo-500 dark:text-indigo-400" />
    ),
  },

  // Frontend
  {
    id: 'react',
    name: 'React',
    level: 5,
    category: 'frontend',
    connections: ['nextjs', 'typescript'],
    icon: <FaReact className="w-5 h-5 text-sky-500 dark:text-sky-400" />,
  },
  {
    id: 'nextjs',
    name: 'Next.js',
    level: 5,
    category: 'frontend',
    connections: ['react', 'typescript'],
    icon: <SiNextdotjs className="w-5 h-5 text-sky-600 dark:text-sky-500" />,
  },
  {
    id: 'tailwind',
    name: 'Tailwind CSS',
    level: 5,
    category: 'frontend',
    connections: ['react', 'nextjs'],
    icon: <SiTailwindcss className="w-5 h-5 text-sky-600 dark:text-sky-500" />,
  },

  // Backend
  {
    id: 'nodejs',
    name: 'Node.js',
    level: 5,
    category: 'backend',
    connections: ['express', 'mongodb', 'typescript', 'nats'],
    icon: <FaNode className="w-5 h-5 text-emerald-600 dark:text-emerald-500" />,
  },
  {
    id: 'express',
    name: 'Express',
    level: 4,
    category: 'backend',
    connections: ['nodejs', 'mongodb'],
    icon: (
      <SiExpress className="w-5 h-5 text-emerald-500 dark:text-emerald-400" />
    ),
  },
  {
    id: 'postgresql',
    name: 'PostgreSQL',
    level: 5,
    category: 'backend',
    connections: ['go', 'nodejs', 'kubernetes'],
    icon: (
      <SiPostgresql className="w-5 h-5 text-emerald-500 dark:text-emerald-400" />
    ),
  },
  {
    id: 'mysql',
    name: 'MySQL',
    level: 4,
    category: 'backend',
    connections: ['go'],
    icon: (
      <SiMysql className="w-5 h-5 text-emerald-600 dark:text-emerald-500" />
    ),
  },
  {
    id: 'mongodb',
    name: 'MongoDB',
    level: 4,
    category: 'backend',
    connections: ['nodejs', 'express'],
    icon: (
      <SiMongodb className="w-5 h-5 text-emerald-600 dark:text-emerald-500" />
    ),
  },
  {
    id: 'caddy',
    name: 'Caddy',
    level: 4,
    category: 'backend',
    connections: ['go'],
    icon: (
      <SiCaddy className="w-5 h-5 text-emerald-500 dark:text-emerald-400" />
    ),
  },
  {
    id: 'nats',
    name: 'NATS Streaming',
    level: 4,
    category: 'backend',
    connections: ['nodejs', 'kubernetes'],
    icon: (
      <TbNetwork className="w-5 h-5 text-emerald-600 dark:text-emerald-500" />
    ),
  },

  // DevOps
  {
    id: 'docker',
    name: 'Docker',
    level: 5,
    category: 'devops',
    connections: ['kubernetes', 'jenkins', 'gitlab', 'mlflow'],
    icon: <FaDocker className="w-5 h-5 text-amber-500 dark:text-amber-400" />,
  },
  {
    id: 'kubernetes',
    name: 'Kubernetes',
    level: 5,
    category: 'devops',
    connections: [
      'docker',
      'helm',
      'argo',
      'terraform',
      'ansible',
      'prometheus',
    ],
    icon: (
      <SiKubernetes className="w-5 h-5 text-amber-600 dark:text-amber-500" />
    ),
  },
  {
    id: 'jenkins',
    name: 'Jenkins',
    level: 5,
    category: 'devops',
    connections: ['docker', 'kubernetes', 'terraform', 'java'],
    icon: <SiJenkins className="w-5 h-5 text-amber-500 dark:text-amber-400" />,
  },
  {
    id: 'terraform',
    name: 'Terraform',
    level: 5,
    category: 'devops',
    connections: ['aws', 'kubernetes', 'ansible', 'jenkins'],
    icon: (
      <SiTerraform className="w-5 h-5 text-amber-600 dark:text-amber-500" />
    ),
  },
  {
    id: 'ansible',
    name: 'Ansible',
    level: 4,
    category: 'devops',
    connections: ['kubernetes', 'terraform', 'python'],
    icon: <SiAnsible className="w-5 h-5 text-amber-500 dark:text-amber-400" />,
  },
  {
    id: 'helm',
    name: 'Helm',
    level: 4,
    category: 'devops',
    connections: ['kubernetes'],
    icon: <SiHelm className="w-5 h-5 text-amber-600 dark:text-amber-500" />,
  },
  {
    id: 'argo',
    name: 'ArgoCD',
    level: 4,
    category: 'devops',
    connections: ['kubernetes', 'gitlab'],
    icon: <SiArgo className="w-5 h-5 text-amber-500 dark:text-amber-400" />,
  },
  {
    id: 'gitlab',
    name: 'GitLab CI',
    level: 4,
    category: 'devops',
    connections: ['docker', 'argo'],
    icon: <SiGitlab className="w-5 h-5 text-amber-600 dark:text-amber-500" />,
  },
  {
    id: 'git',
    name: 'Git',
    level: 5,
    category: 'devops',
    connections: ['gitlab', 'jenkins', 'dvc'],
    icon: <FaGitAlt className="w-5 h-5 text-amber-600 dark:text-amber-500" />,
  },

  // Cloud
  {
    id: 'aws',
    name: 'AWS',
    level: 5,
    category: 'cloud',
    connections: ['terraform', 'kubernetes', 'python'],
    icon: <SiAmazon className="w-5 h-5 text-orange-500 dark:text-orange-400" />,
  },

  // Security
  {
    id: 'semgrep',
    name: 'Semgrep',
    level: 4,
    category: 'security',
    connections: ['gitlab'],
    icon: <TbShield className="w-5 h-5 text-red-500 dark:text-red-400" />,
  },
  {
    id: 'zap',
    name: 'OWASP ZAP',
    level: 4,
    category: 'security',
    connections: ['gitlab'],
    icon: <TbShield className="w-5 h-5 text-red-600 dark:text-red-500" />,
  },
  {
    id: 'trivy',
    name: 'Trivy',
    level: 4,
    category: 'security',
    connections: ['docker', 'gitlab'],
    icon: <TbShield className="w-5 h-5 text-red-500 dark:text-red-400" />,
  },

  // Monitoring
  {
    id: 'prometheus',
    name: 'Prometheus',
    level: 4,
    category: 'monitoring',
    connections: ['kubernetes', 'grafana'],
    icon: (
      <SiPrometheus className="w-5 h-5 text-purple-500 dark:text-purple-400" />
    ),
  },
  {
    id: 'grafana',
    name: 'Grafana',
    level: 4,
    category: 'monitoring',
    connections: ['prometheus', 'kubernetes'],
    icon: (
      <SiGrafana className="w-5 h-5 text-purple-600 dark:text-purple-500" />
    ),
  },

  // MLOps
  {
    id: 'mlflow',
    name: 'MLflow',
    level: 4,
    category: 'mlops',
    connections: ['python', 'docker'],
    icon: <TbBrain className="w-5 h-5 text-pink-500 dark:text-pink-400" />,
  },
  {
    id: 'dvc',
    name: 'DVC',
    level: 4,
    category: 'mlops',
    connections: ['python', 'git'],
    icon: <TbNetwork className="w-5 h-5 text-pink-600 dark:text-pink-500" />,
  },
  {
    id: 'great_expectations',
    name: 'Great Expectations',
    level: 4,
    category: 'mlops',
    connections: ['python'],
    icon: <TbCheck className="w-5 h-5 text-pink-500 dark:text-pink-400" />,
  },
  {
    id: 'shell',
    name: 'Shell',
    level: 4,
    category: 'mlops',
    connections: ['python', 'docker'],
    icon: <TbTerminal className="w-5 h-5 text-pink-600 dark:text-pink-500" />,
  },

  // Tools
  {
    id: 'postman',
    name: 'Postman',
    level: 4,
    category: 'devops',
    connections: [],
    icon: <SiPostman className="w-5 h-5 text-amber-500 dark:text-amber-400" />,
  },
];

interface SkillTreeProps {
  onInteraction?: () => void;
}

export const SkillTree: React.FC<SkillTreeProps> = ({ onInteraction }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);
  const [hoveredConnections, setHoveredConnections] = useState<string[]>([]);
  const [skills, setSkills] = useState<Skill[]>(SKILLS);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const [isDarkMode, setIsDarkMode] = useState(
    document.documentElement.classList.contains('dark')
  );
  const [hasInteracted, setHasInteracted] = useState(false);

  // Update dimensions on resize
  useEffect(() => {
    if (!containerRef.current) return;

    const updateDimensions = () => {
      const rect = containerRef.current?.getBoundingClientRect();
      if (rect) {
        setDimensions({ width: rect.width, height: rect.height });
      }
    };

    const resizeObserver = new ResizeObserver(updateDimensions);
    resizeObserver.observe(containerRef.current);
    updateDimensions();

    return () => resizeObserver.disconnect();
  }, []);

  // Watch for theme changes
  useEffect(() => {
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (
          mutation.target === document.documentElement &&
          mutation.attributeName === 'class'
        ) {
          setIsDarkMode(document.documentElement.classList.contains('dark'));
        }
      });
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class'],
    });

    return () => observer.disconnect();
  }, []);

  // Calculate positions for skills - add useMemo for position calculation
  useEffect(() => {
    if (!dimensions.width || !dimensions.height) return;

    // Debounce the position calculation to avoid excessive layout computation
    const calculatePositions = () => {
      const padding = 40;
      const centerX = dimensions.width / 2;
      const centerY = dimensions.height / 2;
      const maxRadius = Math.min(centerX - padding, centerY - padding);

      // Keep track of used positions to avoid overlap
      const usedPositions: { x: number; y: number }[] = [];
      const minDistance = 200;
      const maxAttempts = 500;

      const getRandomPosition = () => {
        let attempts = 0;
        let bestPosition: { x: number; y: number } | null = null;
        let maxDistanceFound = 0;

        // Try multiple positions and pick the one with maximum distance to other nodes
        while (attempts < maxAttempts) {
          const angle = Math.random() * Math.PI * 2;
          // Use more of the available space
          const radius = maxRadius * (0.15 + Math.random() * 0.8);

          const position = {
            x: centerX + Math.cos(angle) * radius,
            y: centerY + Math.sin(angle) * radius,
          };

          // Smaller random variation to maintain spacing better
          position.x += (Math.random() - 0.5) * 30;
          position.y += (Math.random() - 0.5) * 30;

          // Ensure position is within bounds
          if (
            position.x < padding ||
            position.x > dimensions.width - padding ||
            position.y < padding ||
            position.y > dimensions.height - padding
          ) {
            attempts++;
            continue;
          }

          // Find minimum distance to any existing node
          let minDistanceToOthers = Infinity;
          for (const pos of usedPositions) {
            const dx = pos.x - position.x;
            const dy = pos.y - position.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            minDistanceToOthers = Math.min(minDistanceToOthers, distance);
          }

          // If this position is better than what we've found so far, keep it
          if (minDistanceToOthers > maxDistanceFound) {
            maxDistanceFound = minDistanceToOthers;
            bestPosition = position;
          }

          // If we found a position that satisfies our minimum distance, use it immediately
          if (minDistanceToOthers >= minDistance) {
            usedPositions.push(position);
            return position;
          }

          attempts++;
        }

        // If we found a position with at least 90% of desired distance, use it
        if (bestPosition && maxDistanceFound > minDistance * 0.9) {
          usedPositions.push(bestPosition);
          return bestPosition;
        }

        // If we still haven't found a good position, try one final time with slightly reduced distance
        const finalAttempts = 100;
        const finalMinDistance = minDistance * 0.85; // Only accept 85% of desired distance

        for (let i = 0; i < finalAttempts; i++) {
          const angle = Math.random() * Math.PI * 2;
          const radius = maxRadius * (0.15 + Math.random() * 0.8);

          const position = {
            x: centerX + Math.cos(angle) * radius,
            y: centerY + Math.sin(angle) * radius,
          };

          position.x += (Math.random() - 0.5) * 30;
          position.y += (Math.random() - 0.5) * 30;

          if (
            position.x < padding ||
            position.x > dimensions.width - padding ||
            position.y < padding ||
            position.y > dimensions.height - padding
          ) {
            continue;
          }

          const isFarEnough = usedPositions.every((pos) => {
            const dx = pos.x - position.x;
            const dy = pos.y - position.y;
            return Math.sqrt(dx * dx + dy * dy) > finalMinDistance;
          });

          if (isFarEnough) {
            usedPositions.push(position);
            return position;
          }
        }

        // If all else fails, use the best position we found
        if (bestPosition) {
          usedPositions.push(bestPosition);
          return bestPosition;
        }

        // Absolute last resort - should rarely happen
        return {
          x: centerX + (Math.random() - 0.5) * maxRadius,
          y: centerY + (Math.random() - 0.5) * maxRadius,
        };
      };

      // Randomize skills completely
      const shuffledSkills = [...skills].sort(() => Math.random() - 0.5);

      const updatedSkills = shuffledSkills.map((skill) => {
        const position = getRandomPosition();
        return { ...skill, x: position.x, y: position.y };
      });

      setSkills(updatedSkills);
    };

    // Use requestAnimationFrame to ensure position calculation happens during idle frames
    const timeoutId = setTimeout(() => {
      requestAnimationFrame(calculatePositions);
    }, 10);

    return () => clearTimeout(timeoutId);
  }, [dimensions]);

  // Draw connections between skills
  useEffect(() => {
    if (!canvasRef.current || !skills[0].x) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    // Set canvas size with device pixel ratio for sharper rendering
    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();

    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;

    ctx.scale(dpr, dpr);
    ctx.clearRect(0, 0, rect.width, rect.height);

    // Keep track of drawn connections to avoid duplicates
    const drawnConnections = new Set();

    // Use requestAnimationFrame for smoother drawing
    requestAnimationFrame(() => {
      // Draw connections with straight lines
      skills.forEach((skill) => {
        skill.connections.forEach((connectedId) => {
          const connectedSkill = skills.find((s) => s.id === connectedId);
          if (
            !connectedSkill ||
            !skill.x ||
            !skill.y ||
            !connectedSkill.x ||
            !connectedSkill.y
          )
            return;

          // Create a unique identifier for the connection (ordered alphabetically to ensure consistency)
          const connectionId = [skill.id, connectedId].sort().join('-');
          if (drawnConnections.has(connectionId)) return;
          drawnConnections.add(connectionId);

          ctx.beginPath();
          ctx.moveTo(skill.x, skill.y);
          ctx.lineTo(connectedSkill.x, connectedSkill.y);

          // Use theme-appropriate colors for connections
          const baseColor = isDarkMode ? '150, 150, 150' : '100, 100, 100';
          const hoverColor = isDarkMode ? '200, 200, 200' : '75, 75, 75';

          const isConnectionHovered =
            hoveredSkill === skill.id || hoveredSkill === connectedId;

          if (isConnectionHovered) {
            ctx.strokeStyle = `rgba(${hoverColor}, 0.4)`;
            ctx.lineWidth = 2;
            ctx.shadowColor = isDarkMode
              ? 'rgba(255, 255, 255, 0.2)'
              : 'rgba(99, 102, 241, 0.2)';
            ctx.shadowBlur = 8;
          } else {
            ctx.strokeStyle = `rgba(${baseColor}, 0.15)`;
            ctx.lineWidth = 1;
            ctx.shadowColor = 'transparent';
            ctx.shadowBlur = 0;
          }

          ctx.stroke();
        });
      });
    });
  }, [skills, hoveredSkill, isDarkMode]);

  const handleSkillHover = (skillId: string) => {
    setHoveredSkill(skillId);
    // Get both outgoing and incoming connections
    const skill = skills.find((s) => s.id === skillId);
    if (skill) {
      const outgoingConnections = skill.connections;
      const incomingConnections = skills
        .filter((s) => s.connections.includes(skillId))
        .map((s) => s.id);
      setHoveredConnections([...outgoingConnections, ...incomingConnections]);
    }

    // Trigger the achievement only once
    if (!hasInteracted) {
      setHasInteracted(true);
      onInteraction?.();
    }
  };

  return (
    <div className="w-full">
      <div className="grid grid-cols-3 gap-4 text-sm mb-6 bg-white/80 dark:bg-zinc-900/80 p-3 rounded-lg backdrop-blur-sm">
        <div className="flex items-center gap-2 font-medium">
          <TbBoxMultiple className="w-4 h-4 text-amber-500 dark:text-amber-400" />{' '}
          DevOps
        </div>
        <div className="flex items-center gap-2 font-medium">
          <FaDatabase className="w-4 h-4 text-emerald-500 dark:text-emerald-400" />{' '}
          Backend
        </div>
        <div className="flex items-center gap-2 font-medium">
          <TbShield className="w-4 h-4 text-red-500 dark:text-red-400" />{' '}
          Security
        </div>
        <div className="flex items-center gap-2 font-medium">
          <TbCloud className="w-4 h-4 text-orange-500 dark:text-orange-400" />{' '}
          Cloud
        </div>
        <div className="flex items-center gap-2 font-medium">
          <TbChartBar className="w-4 h-4 text-purple-500 dark:text-purple-400" />{' '}
          Monitoring
        </div>
        <div className="flex items-center gap-2 font-medium">
          <TbBrain className="w-4 h-4 text-pink-500 dark:text-pink-400" /> MLOps
        </div>
      </div>
      <div
        ref={containerRef}
        className="relative w-full h-[450px] overflow-hidden"
      >
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full pointer-events-none"
        />
        <div className="absolute inset-0">
          {skills.map((skill) => (
            <div
              key={skill.id}
              style={{
                position: 'absolute',
                left: skill.x ? `${skill.x}px` : '0',
                top: skill.y ? `${skill.y}px` : '0',
                transform: 'translate(-50%, -50%)',
                zIndex:
                  hoveredSkill === skill.id ||
                  hoveredConnections.includes(skill.id)
                    ? 50
                    : 10,
              }}
              className="group"
            >
              <div
                className={`p-2 rounded-full relative z-20
                  ${
                    hoveredSkill === skill.id ||
                    hoveredConnections.includes(skill.id)
                      ? 'bg-white/90 dark:bg-zinc-800/90 scale-110 shadow-lg shadow-indigo-500/30 dark:shadow-zinc-300/20 ring-1 ring-indigo-500/20 dark:ring-white/20'
                      : 'bg-white/70 hover:bg-white/80 dark:bg-zinc-800/70 dark:hover:bg-zinc-800/80'
                  }
                  after:absolute after:inset-0 after:rounded-full after:blur-sm after:bg-inherit after:opacity-50
                  border border-zinc-200/40 dark:border-zinc-700/40
                  transition-all duration-300 ease-out will-change-transform
                `}
                onMouseEnter={() => handleSkillHover(skill.id)}
                onMouseLeave={() => {
                  setHoveredSkill(null);
                  setHoveredConnections([]);
                }}
              >
                <div className="text-black dark:text-white relative z-30">
                  {skill.icon}
                </div>
                <div
                  className="absolute bottom-0 left-0 h-0.5 rounded-full bg-black/60 dark:bg-white/60 transition-[width] duration-200 ease-out"
                  style={{ width: `${(skill.level / 5) * 100}%` }}
                />
              </div>
              <div
                className={`absolute left-1/2 -translate-x-1/2 -bottom-10 px-3 py-1.5 z-40
                  bg-white/95 dark:bg-zinc-900/95 text-black dark:text-white text-xs font-medium rounded-md
                  backdrop-blur-sm pointer-events-none
                  ${
                    hoveredSkill === skill.id ||
                    hoveredConnections.includes(skill.id)
                      ? 'opacity-100 translate-y-0'
                      : 'opacity-0 translate-y-3'
                  }
                  transition-all duration-300 ease-out
                  shadow-lg border border-zinc-200/50 dark:border-zinc-700/50`}
              >
                {skill.name}
                <div className="absolute -top-1.5 left-1/2 -translate-x-1/2 border-[5px] border-transparent border-b-white/95 dark:border-b-zinc-900/95" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
