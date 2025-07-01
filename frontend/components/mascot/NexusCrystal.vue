<template>
  <div ref="mount" class="w-full h-full"></div>
</template>

<script setup>
import { onMounted, onUnmounted, ref } from 'vue';
import * as THREE from 'three';
import { useMouse } from '@vueuse/core';

const mount = ref(null);
const { x, y } = useMouse();

let scene, camera, renderer, crystal, group;
let targetRotation = { x: 0, y: 0 };
let animationFrameId;

function init() {
  const container = mount.value;
  if (!container) return;

  // Scene
  scene = new THREE.Scene();

  // Camera
  camera = new THREE.PerspectiveCamera(50, container.clientWidth / container.clientHeight, 0.1, 1000);
  camera.position.z = 8;

  // Renderer
  renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setSize(container.clientWidth, container.clientHeight);
  renderer.setPixelRatio(window.devicePixelRatio);
  container.appendChild(renderer.domElement);

  // Group for rotation
  group = new THREE.Group();
  scene.add(group);

  // Crystal Geometry
  const geometry = new THREE.IcosahedronGeometry(1.5, 1);
  const wireframeGeometry = new THREE.IcosahedronGeometry(1.52, 1);

  // Crystal Material
  const material = new THREE.MeshStandardMaterial({
    color: 0x7F5AF0,
    roughness: 0.1,
    metalness: 0.2,
    transparent: true,
    opacity: 0.7,
    emissive: 0x7F5AF0,
    emissiveIntensity: 0.2,
  });
  
  const wireframeMaterial = new THREE.MeshBasicMaterial({
    color: 0x9274f2,
    wireframe: true,
    transparent: true,
    opacity: 0.3
  });

  crystal = new THREE.Mesh(geometry, material);
  const wireframe = new THREE.Mesh(wireframeGeometry, wireframeMaterial);
  
  group.add(crystal);
  group.add(wireframe);

  // Lighting
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
  scene.add(ambientLight);
  const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
  directionalLight.position.set(5, 5, 5);
  scene.add(directionalLight);

  // Handle Resize
  window.addEventListener('resize', onWindowResize, false);
}

function onWindowResize() {
  const container = mount.value;
  if (!container || !renderer) return;
  camera.aspect = container.clientWidth / container.clientHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(container.clientWidth, container.clientHeight);
}

function animate() {
  if (!renderer) return;
  animationFrameId = requestAnimationFrame(animate);
  
  // Mouse interaction
  targetRotation.y = (x.value / window.innerWidth - 0.5) * 0.5;
  targetRotation.x = (y.value / window.innerHeight - 0.5) * 0.5;

  group.rotation.x += (targetRotation.x - group.rotation.x) * 0.05;
  group.rotation.y += (targetRotation.y - group.rotation.y) * 0.05;

  // Intrinsic rotation
  group.rotation.y += 0.0005;

  renderer.render(scene, camera);
}

onMounted(() => {
  nextTick(() => {
    init();
    animate();
  });
});

onUnmounted(() => {
  window.removeEventListener('resize', onWindowResize);
  cancelAnimationFrame(animationFrameId);
  if (mount.value && renderer.domElement) {
    mount.value.removeChild(renderer.domElement);
  }
  renderer?.dispose();
});
</script>