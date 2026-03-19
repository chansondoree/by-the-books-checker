'use client'

import React, { useState, useRef, useEffect } from 'react';
import { FaSun, FaMoon } from 'react-icons/fa';
import { getColors, rgbToHex, isColorInPalette, rgbToHexNoAlpha, findClosestPaletteColor, hexToRgbExport } from './utils/utils';

import colorsByDex from './utils/colors.json';
import pifDex from './utils/pif_dex.json';

import ColorViewer from './components/ColorViewer';
import FileSelector from './components/FileSelector';
import ImageCanvas from './components/ImageCanvas';
import { getStyles } from './components/styles';


export default function Home() {
    const [isDarkMode, setIsDarkMode] = useState(false);
    const [hoverDarkToggle, setHoverDarkToggle] = useState(false);
    const [hoverImportBtn, setHoverImportBtn] = useState(false);
    const [image, setImage] = useState(null);
    const [colors, setColors] = useState([]);
    const [hoveredColor, setHoveredColor] = useState(null);
    const [isImportOpen, setIsImportOpen] = useState(false);
    const [fusionOrder, setFusionOrder] = useState({
        head: '',
        body: '',
        headName: '',
        bodyName: ''
    });
    const [headPalette, setHeadPalette] = useState([]);
    const [colorMargin, setColorMargin] = useState(5);
    const [showApproximation, setShowApproximation] = useState(false);
    const [highlightColor, setHighlightColor] = useState('#FFFF00');
    const [customPaletteImage, setCustomPaletteImage] = useState(null);
    const [customPalette, setCustomPalette] = useState([]);
    const [useCustomPalette, setUseCustomPalette] = useState(false);
    const [colorRemapping, setColorRemapping] = useState({});
    const canvasRef = useRef(null);
    const displayCanvasRef = useRef(null);
    const paletteCanvasRef = useRef(null);
    const fileInputRef = useRef(null);
    const paletteInputRef = useRef(null);
    const allowedSizes = [96, 288];

    const styles = getStyles(isDarkMode);

    const extractPaletteFromImage = (img) => {
        const canvas = paletteCanvasRef.current;
        const ctx = canvas.getContext('2d');

        canvas.width = img.width;
        canvas.height = img.height;
        ctx.drawImage(img, 0, 0);

        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const pixels = imageData.data;
        const colorMap = new Map();

        // Extract all unique colors from the palette image
        for (let i = 0; i < pixels.length; i += 4) {
            const r = pixels[i];
            const g = pixels[i + 1];
            const b = pixels[i + 2];
            const a = pixels[i + 3];

            // Skip fully transparent pixels
            if (a < 128) continue;

            const key = `${r},${g},${b},${a}`;
            colorMap.set(key, (colorMap.get(key) || 0) + 1);
        }

        // Convert to array of hex colors, sorted by frequency
        const paletteColors = Array.from(colorMap.entries())
            .sort((a, b) => b[1] - a[1])
            .map(([color]) => {
                const [r, g, b] = color.split(',').map(Number);
                return rgbToHexNoAlpha(r, g, b);
            });

        setCustomPalette(paletteColors);
        setUseCustomPalette(true);
        return paletteColors;
    };

    const extractColors = (img) => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');

        canvas.width = img.width;
        canvas.height = img.height;
        ctx.drawImage(img, 0, 0);

        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const activePalette = useCustomPalette && customPalette.length > 0 ? customPalette : headPalette;
        const sortedColors = getColors(imageData, activePalette, rgbToHexNoAlpha, rgbToHex, isColorInPalette, colorMargin);

        setColors(sortedColors);
    };

    const loadPaletteFile = (file) => {
        if (!file || !file.type.startsWith('image/')) return;

        const reader = new FileReader();
        reader.onload = (event) => {
            const img = new Image();
            img.onload = () => {
                setCustomPaletteImage(img);
                extractPaletteFromImage(img);
            };
            img.src = event.target.result;
        };
        reader.readAsDataURL(file);
    };

    const handlePaletteFileChange = (e) => {
        loadPaletteFile(e.target.files[0]);
        e.target.value = '';
    };

    const handlePaletteBrowseClick = () => {
        if (paletteInputRef.current) {
            paletteInputRef.current.click();
        }
    };

    const clearCustomPalette = () => {
        setCustomPaletteImage(null);
        setCustomPalette([]);
        setUseCustomPalette(false);
    };

    const loadImageFile = (file) => {
        if (!file || !file.type.startsWith('image/')) return;

        const numberMatches = file.name.match(/\d+/g) || [];
        const head = numberMatches[0] || '';
        const body = numberMatches[1] || '';
        const headName = pifDex[head] || head;
        const bodyName = pifDex[body] || body;
        setHeadPalette(colorsByDex[head] || []);
        setFusionOrder({ head, body, headName, bodyName });
        setColorRemapping({});

        const reader = new FileReader();
        reader.onload = (event) => {
            const img = new Image();
            img.onload = () => {
                const isValidSize = allowedSizes.includes(img.width) && allowedSizes.includes(img.height);
                if (!isValidSize || img.width !== img.height) {
                    window.alert('Invalid image size. Please use a 96x96 or 288x288 image.');
                    return;
                }
                setImage(img);
                setIsImportOpen(false);
            };
            img.src = event.target.result;
        };
        reader.readAsDataURL(file);
    };

    const handleDrop = (e) => {
        e.preventDefault();
        loadImageFile(e.dataTransfer.files[0]);
    };

    const handleDragOver = (e) => {
        e.preventDefault();
    };

    const handleFileChange = (e) => {
        loadImageFile(e.target.files[0]);
        e.target.value = '';
    };

    const handleBrowseClick = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    };

    const handleDropZoneKeyDown = (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            handleBrowseClick();
        }
    };

    useEffect(() => {
        if (image && canvasRef.current) {
            extractColors(image);
        }
    }, [image, headPalette, colorMargin, customPalette, useCustomPalette]);

    useEffect(() => {
        if (!image || !displayCanvasRef.current) return;

        const canvas = displayCanvasRef.current;
        const ctx = canvas.getContext('2d');
        const scale = image.width === 96 ? 3 : 1;

        canvas.width = image.width * scale;
        canvas.height = image.height * scale;
        ctx.imageSmoothingEnabled = false;
        ctx.drawImage(image, 0, 0, canvas.width, canvas.height);

        // Apply palette approximation if toggled
        const activePalette = useCustomPalette && customPalette.length > 0 ? customPalette : headPalette;
        if (showApproximation && activePalette.length > 0) {
            const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
            const pixels = imageData.data;

            for (let i = 0; i < pixels.length; i += 4) {
                const r = pixels[i];
                const g = pixels[i + 1];
                const b = pixels[i + 2];
                // a = pixels[i + 3] (alpha unchanged)

                const hexKey = rgbToHexNoAlpha(r, g, b);
                let target;
                if (colorRemapping[hexKey]) {
                    target = hexToRgbExport(colorRemapping[hexKey]);
                } else {
                    target = findClosestPaletteColor({ r, g, b }, activePalette);
                }
                if (target) {
                    pixels[i] = target.r;
                    pixels[i + 1] = target.g;
                    pixels[i + 2] = target.b;
                }
            }
            ctx.putImageData(imageData, 0, 0);
        }

        if (hoveredColor) {
            const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
            const pixels = imageData.data;

            const highlightData = ctx.createImageData(canvas.width, canvas.height);
            const highlight = highlightData.data;

            for (let i = 0; i < pixels.length; i += 4) {
                const r = pixels[i];
                const g = pixels[i + 1];
                const b = pixels[i + 2];
                const a = pixels[i + 3];

                if (r === hoveredColor.r && g === hoveredColor.g && b === hoveredColor.b && a === hoveredColor.a) {
                    const hColor = hexToRgbExport(highlightColor);
                    highlight[i] = hColor ? hColor.r : 255;
                    highlight[i + 1] = hColor ? hColor.g : 255;
                    highlight[i + 2] = hColor ? hColor.b : 0;
                    highlight[i + 3] = 255;
                } else {
                    highlight[i] = pixels[i];
                    highlight[i + 1] = pixels[i + 1];
                    highlight[i + 2] = pixels[i + 2];
                    highlight[i + 3] = pixels[i + 3];
                }
            }
            ctx.putImageData(highlightData, 0, 0);
        }
    }, [hoveredColor, image, showApproximation, headPalette, customPalette, useCustomPalette, highlightColor, colorRemapping]);

    useEffect(() => {
        if (image && displayCanvasRef.current) {
            const canvas = displayCanvasRef.current;
            const ctx = canvas.getContext('2d');
            const scale = image.width === 96 ? 3 : 1;
            canvas.width = image.width * scale;
            canvas.height = image.height * scale;
            ctx.imageSmoothingEnabled = false;
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
        }
    }, [image]);

    return (
        <div style={styles.container}>
            <div style={image ? styles.headerRow : styles.headerPre}>
                <h1 style={styles.title}>Palette Checker 🎨</h1>
                <div style={styles.headerControls}>
                    <button
                        onClick={() => setIsDarkMode(!isDarkMode)}
                        onMouseEnter={() => setHoverDarkToggle(true)}
                        onMouseLeave={() => setHoverDarkToggle(false)}
                        style={{ ...styles.darkModeToggle, backgroundColor: hoverDarkToggle ? (isDarkMode ? '#3a3a3a' : '#f0f0f0') : styles.darkModeToggle.backgroundColor }}
                    >
                        {isDarkMode ? <FaSun /> : <FaMoon />}
                    </button>
                    {image ? (
                        <button
                            type="button"
                            onClick={() => setIsImportOpen(true)}
                            onMouseEnter={() => setHoverImportBtn(true)}
                            onMouseLeave={() => setHoverImportBtn(false)}
                            style={{ ...styles.uploadButton, backgroundColor: hoverImportBtn ? (isDarkMode ? '#3a3a3a' : '#f0f0f0') : styles.uploadButton.backgroundColor }}
                        >
                            Import Image
                        </button>
                    ) : null}
                </div>
            </div>
            <FileSelector
                image={image}
                isImportOpen={isImportOpen}
                setIsImportOpen={setIsImportOpen}
                handleDrop={handleDrop}
                handleDragOver={handleDragOver}
                handleBrowseClick={handleBrowseClick}
                fileInputRef={fileInputRef}
                handleFileChange={handleFileChange}
                handleDropZoneKeyDown={handleDropZoneKeyDown}
                isDarkMode={isDarkMode}
            />
            {image ? (
                <div style={styles.contentWrapper}>
                    <ImageCanvas
                        displayCanvasRef={displayCanvasRef}
                        canvasRef={canvasRef}
                        fusionOrder={fusionOrder}
                        colorMargin={colorMargin}
                        setColorMargin={setColorMargin}
                        showApproximation={showApproximation}
                        setShowApproximation={setShowApproximation}
                        highlightColor={highlightColor}
                        setHighlightColor={setHighlightColor}
                        isDarkMode={isDarkMode}
                        customPalette={customPalette}
                        useCustomPalette={useCustomPalette}
                        setUseCustomPalette={setUseCustomPalette}
                        handlePaletteBrowseClick={handlePaletteBrowseClick}
                        paletteInputRef={paletteInputRef}
                        handlePaletteFileChange={handlePaletteFileChange}
                        headPalette={headPalette}
                    />
                    <ColorViewer
                        colors={colors}
                        hoveredColor={hoveredColor}
                        setHoveredColor={setHoveredColor}
                        headPalette={useCustomPalette && customPalette.length > 0 ? customPalette : headPalette}
                        isDarkMode={isDarkMode}
                        colorRemapping={colorRemapping}
                        setColorRemapping={setColorRemapping}
                    />
                </div>
            ) : null}
            <div style={styles.footer}>
                <i>Default palettes taken from <a href="https://pokemondb.net" target="_blank">pokemondb.net</a> and the Smogon Sprite Project.</i>
            </div>
            <canvas ref={paletteCanvasRef} style={{ display: 'none' }} />
        </div>
    );
}