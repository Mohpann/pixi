function setupPixi(fullScreen=false) {
    let type = "WebGL"
    if(!PIXI.utils.isWebGLSupported()) {
      type = "canvas"
    }
    
    PIXI.utils.sayHello(type); // outputs to console
    gsap.registerPlugin(PixiPlugin);
    PixiPlugin.registerPIXI(PIXI);

    //Create a Pixi Application
    let app = new PIXI.Application({ 
        width: 600,
        height: 600,
        antialias: true,    // default: false
        backgroundColor: 0x061639, // blue-ish
        transparent: false, // default: false
        autoDensity: true,
        resolution: 1       // default: 1
      });

    if(fullScreen) {
        document.body.appendChild(app.view);
        function resize()  {
            let dim = Math.min(window.innerWidth, window.innerHeight);
            app.renderer.view.style.width = dim + 'px';
            app.renderer.view.style.height = dim + 'px';            
        };
        window.addEventListener('resize', resize);
    }
    else {
        document.querySelector('#screen').appendChild(app.view);
        function resize() {
            const parent = app.view.parentNode;
            let dim = Math.min(parent.clientWidth, parent.clientHeight);
            app.renderer.view.style.width = dim + 'px';
            app.renderer.view.style.height = dim + 'px';            
        }
        resize();
        window.addEventListener('resize', resize);
    }

    return app;
}

