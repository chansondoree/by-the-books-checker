'use client'

import React, { useState, useRef, useEffect } from 'react';
import { getColors, rgbToHex, isColorInPalette, rgbToHexNoAlpha, findClosestPaletteColor, hexToRgbExport } from './utils/utils';

import colorsByDex from './utils/colors.json';
import pifDex from './utils/pif_dex.json';

import ColorViewer from './components/ColorViewer';
import FileSelector from './components/FileSelector';
import ImageCanvas from './components/ImageCanvas';
import styles from './components/styles';


export default function Home() {
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
    const canvasRef = useRef(null);
    const displayCanvasRef = useRef(null);
    const fileInputRef = useRef(null);
    const allowedSizes = [96, 288];

    const extractColors = (img) => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');

        canvas.width = img.width;
        canvas.height = img.height;
        ctx.drawImage(img, 0, 0);

        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const sortedColors = getColors(imageData, headPalette, rgbToHexNoAlpha, rgbToHex, isColorInPalette, colorMargin);

        setColors(sortedColors);
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
    }, [image, headPalette, colorMargin]);

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
        if (showApproximation && headPalette.length > 0) {
            const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
            const pixels = imageData.data;

            for (let i = 0; i < pixels.length; i += 4) {
                const r = pixels[i];
                const g = pixels[i + 1];
                const b = pixels[i + 2];
                // a = pixels[i + 3] (alpha unchanged)

                const closest = findClosestPaletteColor({ r, g, b }, headPalette);
                if (closest) {
                    pixels[i] = closest.r;
                    pixels[i + 1] = closest.g;
                    pixels[i + 2] = closest.b;
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
    }, [hoveredColor, image, showApproximation, headPalette, highlightColor]);

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
                    />
                    <ColorViewer
                        colors={colors}
                        hoveredColor={hoveredColor}
                        setHoveredColor={setHoveredColor}
                        headPalette={headPalette}
                    />
                </div>
            ) : null}
            <div style={styles.footer}>
                <i>Palettes taken from <a href="https://pokemondb.net" target="_blank">pokemondb.net</a> and the Smogon Sprite Project.</i>
            </div>
        </div>
    );
}