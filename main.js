import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

// camera controls
const w = window.innerWidth;
const h = window.innerHeight;
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, w / h, 0.1, 100);
camera.position.z = 5;
camera.position.set(-5, 5, 5);
camera.lookAt(0, 0, 0); // Ensure the camera is looking at the model
const renderer = new THREE.WebGLRenderer();
renderer.setSize(w, h);
document.body.appendChild(renderer.domElement);

// // basic obj floting arnd
// const geometry = new THREE.BoxGeometry(1, 1, 1);
// const material = new THREE.MeshBasicMaterial({ //use meshbasicmaterial for no lighting and meshstandardmaterial for lighting
//     color: 0xffffff 
// });
// const cube = new THREE.Mesh(geometry, material);
// // cube.scale.setScalar(2);
// scene.add(cube);

// responsive
function onWindowResize() {
    const width = window.innerWidth;
    const height = window.innerHeight;

    camera.aspect = width / height;
    camera.updateProjectionMatrix();

    renderer.setSize(width, height);
}
window.addEventListener('resize', onWindowResize);

const loader = new GLTFLoader();
loader.load(
    'assets/OCH%20BLDNG.glb', // Ensure the GLB file path is correct
    function (gltf) {
        const model = gltf.scene;
        model.scale.set(1, 1, 1); // Reset scale to default
        model.position.set(0, 0, 0); // Center the model
        scene.add(model);

        // // Add a bounding box helper to visualize the model
        // const boxHelper = new THREE.BoxHelper(model, 0xff0000); // Red bounding box
        // scene.add(boxHelper);

        console.log('GLB model loaded successfully:', model);
    },
    undefined,
    function (error) {
        console.error('Error loading GLB file:', error);
    }
);

// Add a directional light to ensure proper illumination
const directionalLight = new THREE.DirectionalLight(0xffffff, 3);
directionalLight.position.set(5, 10, 7.5);
scene.add(directionalLight);

const ambientLight = new THREE.AmbientLight(0xffffff, 0.5); // Soft overall light
scene.add(ambientLight);

const secondLight = new THREE.DirectionalLight(0xffffff, 0.5);
secondLight.position.set(-5, 10, -5);
scene.add(secondLight);



// Add OrbitControls for interaction
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true; // Smooth rotation
controls.dampingFactor = 0.05;
controls.enableZoom = true; // Allow zooming
controls.enableRotate = true; // Allow rotation
controls.target.set(0, 0, 0); // Focus on the model

// Update controls in the animation loop
function animate() {
    requestAnimationFrame(animate);
    controls.update(); // Update OrbitControls
    renderer.render(scene, camera);
}
animate();

