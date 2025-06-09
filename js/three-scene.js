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

    // Add directional light from the front
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(0, 1, 2);
    scene.add(directionalLight);

    // Add directional light from the back
    const backLight = new THREE.DirectionalLight(0xffffff, 0.5);
    backLight.position.set(0, 1, -2);
    scene.add(backLight);

    // Add directional light from the side
    const sideLight = new THREE.DirectionalLight(0xffffff, 0.5);
    sideLight.position.set(2, 1, 0);
    scene.add(sideLight);

    // Add a responsive resize handler
    window.addEventListener('resize', function() {
        camera.aspect = container.clientWidth / container.clientHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(container.clientWidth, container.clientHeight);
    });

    // Create a variable to store the loaded model
    let model;

    // Create a loader for GLB files
    const loader = new THREE.GLTFLoader();

    // Load the GLB model
    loader.load(
        // Resource URL
        'threed/laser_device_model.glb',

        // Called when the resource is loaded
        function(gltf) {
            model = gltf.scene;

            // Center the model
            const box = new THREE.Box3().setFromObject(model);
            const center = box.getCenter(new THREE.Vector3());
            model.position.x = -center.x;
            model.position.y = -center.y;
            model.position.z = -center.z;

            // Scale the model to fit in view
            const size = box.getSize(new THREE.Vector3());
            const maxDim = Math.max(size.x, size.y, size.z);
            const scale = 3 / maxDim;
            model.scale.set(scale, scale, scale);

            // Add the model to the scene
            scene.add(model);

            // Adjust camera position for better view
            camera.position.z = 5;
        },

        // Called while loading is progressing
        function(xhr) {
            console.log((xhr.loaded / xhr.total * 100) + '% loaded');
        },

        // Called when loading has errors
        function(error) {
            console.error('An error happened while loading the model:', error);
        }
    );

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

        // Auto-rotate the model when not interacting
        if (autoRotate && model) {
            model.rotation.y += 0.01;
        }

        // Render the scene
        renderer.render(scene, camera);
    }

    // Start the animation loop
    animate();
});
