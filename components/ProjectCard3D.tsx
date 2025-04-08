"use client";
import { useEffect, useRef } from 'react';
import * as THREE from 'three';

interface ProjectCard3DProps {
  project: string;
  color?: string;
}

export default function ProjectCard3D({ project, color = "#50fa7b" }: ProjectCard3DProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Store containerRef.current in a variable to avoid the React hooks warning
    const container = containerRef.current;

    // Setup
    const width = container.clientWidth;
    const height = 160; // Fixed height for project cards
    
    // Scene
    const scene = new THREE.Scene();
    
    // Camera
    const camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 1000);
    camera.position.z = 5;
    
    // Renderer with transparency
    const renderer = new THREE.WebGLRenderer({ 
      alpha: true,
      antialias: true 
    });
    renderer.setSize(width, height);
    renderer.setClearColor(0x000000, 0);
    container.appendChild(renderer.domElement);

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(1, 1, 1);
    scene.add(directionalLight);

    // Create the project's visual based on its name
    const createVisual = () => {
      // Convert color hex string to THREE.Color
      const projectColor = new THREE.Color(color);
      
      // Determine what to create based on project name
      switch(project) {
        case "Branch":
          return createBranchVisual(projectColor);
        case "Thorem":
          return createTheoremVisual(projectColor);
        case "GreenLens":
          return createGreenLensVisual(projectColor);
        default:
          return createDefaultVisual(projectColor);
      }
    };
    
    const createBranchVisual = (color: THREE.Color) => {
      const group = new THREE.Group();
      
      // Create a tree-like structure for Branch
      const trunkGeometry = new THREE.CylinderGeometry(0.1, 0.15, 2, 8);
      const trunkMaterial = new THREE.MeshPhongMaterial({ 
        color: new THREE.Color("#6A4343"),
        shininess: 30 
      });
      const trunk = new THREE.Mesh(trunkGeometry, trunkMaterial);
      trunk.position.y = -0.5;
      group.add(trunk);
      
      // Add branches
      const createBranch = (x: number, y: number, z: number, rotation: number, length: number) => {
        const branchGeometry = new THREE.CylinderGeometry(0.05, 0.08, length, 5);
        const branchMaterial = new THREE.MeshPhongMaterial({ 
          color: new THREE.Color("#8B5A2B"),
          shininess: 20 
        });
        const branch = new THREE.Mesh(branchGeometry, branchMaterial);
        branch.position.set(x, y, z);
        branch.rotation.z = rotation;
        group.add(branch);
        
        // Add leaves to the branch
        const leafGeometry = new THREE.SphereGeometry(0.3, 8, 8);
        const leafMaterial = new THREE.MeshPhongMaterial({ 
          color: color,
          shininess: 50,
          transparent: true,
          opacity: 0.9 
        });
        const leaf = new THREE.Mesh(leafGeometry, leafMaterial);
        leaf.position.set(
          x + Math.cos(rotation) * (length/1.5), 
          y + Math.sin(rotation) * (length/1.5), 
          z
        );
        leaf.scale.set(1, 0.7, 1);
        group.add(leaf);
      };
      
      createBranch(0, 0.3, 0, Math.PI/4, 1);
      createBranch(0, 0, 0, -Math.PI/4, 1);
      createBranch(0, -0.3, 0, Math.PI/3, 0.8);
      
      return group;
    };
    
    const createTheoremVisual = (color: THREE.Color) => {
      const group = new THREE.Group();
      
      // Create a math/document related visual
      const pageGeometry = new THREE.BoxGeometry(2, 2.5, 0.1);
      const pageMaterial = new THREE.MeshPhongMaterial({ 
        color: 0xffffff,
        shininess: 30 
      });
      const page = new THREE.Mesh(pageGeometry, pageMaterial);
      group.add(page);
      
      // Add text-like lines to represent LaTeX
      const addLine = (y: number, width: number, height: number) => {
        const lineGeometry = new THREE.PlaneGeometry(width, height);
        const lineMaterial = new THREE.MeshBasicMaterial({ 
          color: color,
          transparent: true,
          opacity: 0.9
        });
        const line = new THREE.Mesh(lineGeometry, lineMaterial);
        line.position.set(0, y, 0.06);
        group.add(line);
      };
      
      // Add some formula-like lines
      addLine(0.8, 1.5, 0.1);
      addLine(0.6, 1.2, 0.1);
      addLine(0.4, 1.7, 0.1);
      addLine(0.2, 1.0, 0.1);
      addLine(0, 1.4, 0.1);
      addLine(-0.2, 1.1, 0.1);
      addLine(-0.4, 1.8, 0.1);
      addLine(-0.6, 0.9, 0.1);
      
      // Add a mathematical symbol
      const symbolGeometry = new THREE.TorusGeometry(0.3, 0.05, 16, 32);
      const symbolMaterial = new THREE.MeshPhongMaterial({
        color: color,
        shininess: 50
      });
      const symbol = new THREE.Mesh(symbolGeometry, symbolMaterial);
      symbol.position.set(-0.6, -0.8, 0.1);
      group.add(symbol);
      
      return group;
    };
    
    const createGreenLensVisual = (color: THREE.Color) => {
      const group = new THREE.Group();
      
      // Create a lens/magnifying glass
      const handleGeometry = new THREE.CylinderGeometry(0.08, 0.1, 1.5, 16);
      const handleMaterial = new THREE.MeshPhongMaterial({ 
        color: 0x444444,
        shininess: 50 
      });
      const handle = new THREE.Mesh(handleGeometry, handleMaterial);
      handle.position.y = -0.7;
      handle.rotation.x = Math.PI / 4;
      group.add(handle);
      
      // Create the lens frame
      const frameGeometry = new THREE.TorusGeometry(0.8, 0.1, 16, 50);
      const frameMaterial = new THREE.MeshPhongMaterial({
        color: 0x333333,
        shininess: 60
      });
      const frame = new THREE.Mesh(frameGeometry, frameMaterial);
      group.add(frame);
      
      // Create the lens glass
      const glassGeometry = new THREE.CircleGeometry(0.7, 32);
      const glassMaterial = new THREE.MeshPhongMaterial({
        color: color,
        transparent: true,
        opacity: 0.5,
        shininess: 100
      });
      const glass = new THREE.Mesh(glassGeometry, glassMaterial);
      glass.position.z = 0.01;
      group.add(glass);
      
      // Add a leaf inside the lens to represent nature/sustainability
      const leafGeometry = new THREE.Shape();
      leafGeometry.moveTo(0, 0);
      leafGeometry.bezierCurveTo(0, 0.2, 0.2, 0.3, 0.4, 0.2);
      leafGeometry.bezierCurveTo(0.5, 0.1, 0.4, 0, 0, 0);
      
      const leafExtrudeSettings = {
        steps: 1,
        depth: 0.05,
        bevelEnabled: true,
        bevelThickness: 0.02,
        bevelSize: 0.02,
        bevelSegments: 2
      };
      
      const leafExtrudedGeometry = new THREE.ExtrudeGeometry(leafGeometry, leafExtrudeSettings);
      const leafMaterial = new THREE.MeshPhongMaterial({
        color: new THREE.Color(0x00bb00),
        shininess: 40
      });
      
      const leaf = new THREE.Mesh(leafExtrudedGeometry, leafMaterial);
      leaf.position.set(-0.2, 0, 0.05);
      leaf.rotation.z = Math.PI / 4;
      leaf.scale.set(0.7, 0.7, 0.7);
      group.add(leaf);
      
      return group;
    };
    
    const createDefaultVisual = (color: THREE.Color) => {
      const group = new THREE.Group();
      
      // Create a simple cube
      const geometry = new THREE.BoxGeometry(1.5, 1.5, 1.5);
      const material = new THREE.MeshPhongMaterial({ 
        color: color,
        shininess: 40
      });
      const cube = new THREE.Mesh(geometry, material);
      group.add(cube);
      
      return group;
    };
    
    // Add the visual to the scene
    const visual = createVisual();
    scene.add(visual);

    // Animation Loop
    let frameId: number;
    const animate = () => {
      frameId = requestAnimationFrame(animate);
      
      if (visual) {
        visual.rotation.y += 0.01;
        visual.rotation.z += 0.005;
      }
      
      renderer.render(scene, camera);
    };
    animate();
    
    // Handle window resize
    const handleResize = () => {
      if (!container) return;
      
      const newWidth = container.clientWidth;
      camera.aspect = newWidth / height;
      camera.updateProjectionMatrix();
      renderer.setSize(newWidth, height);
    };
    
    window.addEventListener('resize', handleResize);
    
    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(frameId);
      
      if (container && renderer.domElement) {
        container.removeChild(renderer.domElement);
      }
      
      // Dispose of geometries and materials to prevent memory leaks
      scene.traverse((object) => {
        if (object instanceof THREE.Mesh) {
          if (object.geometry) object.geometry.dispose();
          
          if (object.material) {
            if (Array.isArray(object.material)) {
              object.material.forEach(material => material.dispose());
            } else {
              object.material.dispose();
            }
          }
        }
      });
    };
  }, [project, color]);

  return (
    <div 
      ref={containerRef} 
      className="w-full h-40 relative"
    />
  );
}