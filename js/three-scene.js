// Three.js Scene Implementation

// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Check if the container element exists
    const container = document.getElementById('three-container');
    if (!container) return;

    // Set up the scene, camera, and renderer
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xf0f0f0);

    // Create a camera
    const camera = new THREE.PerspectiveCamera(
        75, // Field of view
        container.clientWidth / container.clientHeight, // Aspect ratio
        0.1, // Near clipping plane
        1000 // Far clipping plane
    );
    camera.position.z = 5;

    // Create a WebGL renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    container.appendChild(renderer.domElement);

    // Add ambient light
    const ambientLight = new THREE.AmbientLight(0x404040, 2);
    scene.add(ambientLight);

    // Add directional light
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(1, 1, 1);
    scene.add(directionalLight);

    // Add a responsive resize handler
    window.addEventListener('resize', function() {
        camera.aspect = container.clientWidth / container.clientHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(container.clientWidth, container.clientHeight);
    });

    // Create a geometry (cube)
    const geometry = new THREE.BoxGeometry(2, 2, 2);

    // Create materials with different colors for each face
    const materials = [
        new THREE.MeshPhongMaterial({ color: 0xff0000 }), // Red
        new THREE.MeshPhongMaterial({ color: 0x00ff00 }), // Green
        new THREE.MeshPhongMaterial({ color: 0x0000ff }), // Blue
        new THREE.MeshPhongMaterial({ color: 0xffff00 }), // Yellow
        new THREE.MeshPhongMaterial({ color: 0xff00ff }), // Magenta
        new THREE.MeshPhongMaterial({ color: 0x00ffff })  // Cyan
    ];

    // Create a mesh with the geometry and materials
    const cube = new THREE.Mesh(geometry, materials);
    scene.add(cube);

    // Add a wireframe to the cube
    const wireframe = new THREE.LineSegments(
        new THREE.EdgesGeometry(geometry),
        new THREE.LineBasicMaterial({ color: 0x000000, linewidth: 2 })
    );
    cube.add(wireframe);

    // Add orbit controls
    const controls = new THREE.OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.25;
    controls.screenSpacePanning = false;
    controls.maxPolarAngle = Math.PI / 2;

    // Add instructions
    const instructionsElement = document.createElement('div');
    instructionsElement.style.position = 'absolute';
    instructionsElement.style.bottom = '10px';
    instructionsElement.style.left = '50%';
    instructionsElement.style.transform = 'translateX(-50%)';
    instructionsElement.style.color = '#0066cc';
    instructionsElement.style.backgroundColor = 'rgba(255, 255, 255, 0.7)';
    instructionsElement.style.padding = '5px 10px';
    instructionsElement.style.borderRadius = '5px';
    instructionsElement.style.fontSize = '14px';
    instructionsElement.style.pointerEvents = 'none';
    instructionsElement.textContent = 'Click and drag to rotate. Scroll to zoom.';
    container.appendChild(instructionsElement);

    // Auto-rotation flag
    let autoRotate = true;

    // Disable auto-rotation when user interacts
    controls.addEventListener('start', function() {
        autoRotate = false;
    });

    // Re-enable auto-rotation after a period of inactivity
    let inactivityTimer;
    controls.addEventListener('end', function() {
        clearTimeout(inactivityTimer);
        inactivityTimer = setTimeout(function() {
            autoRotate = true;
        }, 3000); // 3 seconds of inactivity
    });

    // Animation function
    function animate() {
        requestAnimationFrame(animate);

        // Update controls
        controls.update();

        // Auto-rotate the cube when not interacting
        if (autoRotate) {
            cube.rotation.x += 0.01;
            cube.rotation.y += 0.01;
        }

        // Render the scene
        renderer.render(scene, camera);
    }

    // Start the animation loop
    animate();
});
