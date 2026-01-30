import React, { useEffect, useRef } from 'react';

const PixelBlast = ({
    variant = 'circle',
    pixelSize = 6,
    color = '#B19EEF',
    patternScale = 3,
    patternDensity = 1.2,
    pixelSizeJitter = 0.5,
    enableRipples = true,
    rippleSpeed = 0.4,
    rippleThickness = 0.12,
    rippleIntensityScale = 1.5,
    liquid = true,
    liquidStrength = 0.12,
    liquidRadius = 1.2,
    liquidWobbleSpeed = 5,
    speed = 0.6,
    edgeFade = 0.25,
    transparent = true,
    className = '',
    style = {}
}) => {
    const canvasRef = useRef(null);
    const containerRef = useRef(null);
    const animationRef = useRef(null);
    const timeRef = useRef(0);
    const ripplesRef = useRef([]);

    const hexToRgb = (hex) => {
        const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        return result ? {
            r: parseInt(result[1], 16),
            g: parseInt(result[2], 16),
            b: parseInt(result[3], 16)
        } : { r: 0, g: 0, b: 0 };
    };

    const rgb = hexToRgb(color);

    useEffect(() => {
        const canvas = canvasRef.current;
        const container = containerRef.current;
        const ctx = canvas.getContext('2d');

        let width, height;

        const handleResize = () => {
            width = container.offsetWidth;
            height = container.offsetHeight;
            canvas.width = width;
            canvas.height = height;
        };

        window.addEventListener('resize', handleResize);
        handleResize();

        const handleMouseMove = (e) => {
            if (!enableRipples) return;
            const rect = canvas.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            ripplesRef.current.push({
                x,
                y,
                age: 0,
                maxAge: 100 // frames
            });
        };

        if (enableRipples) {
            window.addEventListener('mousemove', handleMouseMove);
        }

        const drawSquare = (x, y, s, c) => {
            ctx.fillStyle = `rgba(${c.r}, ${c.g}, ${c.b}, ${c.a})`;
            ctx.fillRect(x, y, s, s);
        };

        const drawCircle = (x, y, s, c) => {
            ctx.fillStyle = `rgba(${c.r}, ${c.g}, ${c.b}, ${c.a})`;
            ctx.beginPath();
            ctx.arc(x + s / 2, y + s / 2, s / 2, 0, Math.PI * 2);
            ctx.fill();
        };

        const render = () => {
            timeRef.current += speed * 0.05;

            if (!transparent) {
                ctx.fillStyle = '#000';
                ctx.fillRect(0, 0, width, height);
            } else {
                ctx.clearRect(0, 0, width, height);
            }

            // Update ripples
            for (let i = ripplesRef.current.length - 1; i >= 0; i--) {
                const ripple = ripplesRef.current[i];
                ripple.age += rippleSpeed * 2;
                if (ripple.age > ripple.maxAge) {
                    ripplesRef.current.splice(i, 1);
                }
            }

            const cols = Math.ceil(width / pixelSize);
            const rows = Math.ceil(height / pixelSize);

            for (let i = 0; i < cols; i++) {
                for (let j = 0; j < rows; j++) {
                    const x = i * pixelSize;
                    const y = j * pixelSize;

                    // Base noise pattern
                    const noise = Math.sin(i * 0.1 * patternScale + timeRef.current) *
                        Math.cos(j * 0.1 * patternScale + timeRef.current * 0.5);

                    let combinedInfluence = 0;

                    // Liquid effect
                    if (liquid) {
                        const liquidNoise = Math.sin(timeRef.current * liquidWobbleSpeed + i * 0.05) * liquidStrength;
                        combinedInfluence += liquidNoise;
                    }

                    // Ripples
                    ripplesRef.current.forEach(ripple => {
                        const dx = x - ripple.x;
                        const dy = y - ripple.y;
                        const dist = Math.sqrt(dx * dx + dy * dy);

                        const rippleEffect = Math.max(0, Math.sin(dist * 0.05 - ripple.age * 0.2) *
                            Math.exp(-dist * 0.01) *
                            (1 - ripple.age / ripple.maxAge));

                        combinedInfluence += rippleEffect * rippleIntensityScale;
                    });

                    const finalSize = pixelSize * (1 + combinedInfluence + (Math.random() - 0.5) * pixelSizeJitter);

                    // Opacity calculation with edge fade
                    let alpha = (noise + 1) / 2 * patternDensity;

                    if (edgeFade > 0) {
                        const distToCenter = Math.sqrt(Math.pow(x / width - 0.5, 2) + Math.pow(y / height - 0.5, 2)) * 2;
                        alpha *= (1 - Math.min(distToCenter, 1) * edgeFade);
                    }

                    // Clamp and draw
                    if (alpha > 0.1) {
                        const drawFunc = variant === 'circle' ? drawCircle : drawSquare;
                        drawFunc(x, y, Math.max(0, finalSize), { ...rgb, a: Math.min(1, alpha) });
                    }
                }
            }

            animationRef.current = requestAnimationFrame(render);
        };

        render();

        return () => {
            window.removeEventListener('resize', handleResize);
            if (enableRipples) {
                window.removeEventListener('mousemove', handleMouseMove);
            }
            cancelAnimationFrame(animationRef.current);
        };
    }, [color, pixelSize, speed, patternScale, patternDensity, pixelSizeJitter, enableRipples, rippleSpeed, rippleIntensityScale, liquid, liquidStrength, liquidRadius, liquidWobbleSpeed, edgeFade, transparent, variant]);

    return (
        <div ref={containerRef} className={`w-full h-full ${className}`} style={style}>
            <canvas ref={canvasRef} />
        </div>
    );
};

export default PixelBlast;
