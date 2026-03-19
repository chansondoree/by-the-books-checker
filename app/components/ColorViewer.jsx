import { useRef } from 'react';
import { getStyles } from "./styles";
import { findClosestPaletteColor, rgbToHexNoAlpha } from "../utils/utils";

export default function ColorViewer({ colors, hoveredColor, setHoveredColor, headPalette = [], isDarkMode = false, colorRemapping = {}, setColorRemapping }) {
    const styles = getStyles(isDarkMode);
    const colorInputRef = useRef(null);
    const pendingRemapKey = useRef(null);

    const visibleColors = colors.filter(color => !(color.hex.length === 9 && color.hex.endsWith('00')));

    const handleClearRemap = (colorHexRgb) => {
        setColorRemapping(prev => {
            const next = { ...prev };
            delete next[colorHexRgb];
            return next;
        });
    };

    const openColorPicker = (colorHexRgb, currentValue) => {
        pendingRemapKey.current = colorHexRgb;
        if (colorInputRef.current) {
            // input[type=color] requires a valid 6-digit hex
            const val = currentValue && /^#[0-9a-fA-F]{6}$/.test(currentValue) ? currentValue : '#000000';
            colorInputRef.current.value = val;
            colorInputRef.current.click();
        }
    };

    const handleColorInputChange = (e) => {
        const key = pendingRemapKey.current;
        if (key) {
            setColorRemapping(prev => ({ ...prev, [key]: e.target.value }));
        }
    };

    const border = isDarkMode ? '#444' : '#ccc';
    const mutedText = isDarkMode ? '#999' : '#666';
    const manualColor = isDarkMode ? '#4a9cd1' : '#075b88';

    return (
        <div className="color-viewer" style={styles.colorSection}>
            <h2 style={styles.sectionTitle}>Colors ({visibleColors.length})</h2>
            <p style={{ fontSize: '11px', color: mutedText, marginTop: '-6px', marginBottom: '8px' }}>
                Hover to highlight in canvas. Click <span style={{ fontWeight: 600 }}>→</span> to override a color&apos;s replacement.
            </p>
            <input
                ref={colorInputRef}
                type="color"
                onChange={handleColorInputChange}
                style={{ position: 'fixed', opacity: 0, pointerEvents: 'none', width: 0, height: 0 }}
                tabIndex={-1}
            />
            <div className="color-list" style={styles.colorList}>
                {visibleColors.map((color, index) => {
                    const manualRemap = colorRemapping[color.hexRgb];
                    const closest = !color.inPalette && headPalette.length > 0
                        ? findClosestPaletteColor({ r: color.r, g: color.g, b: color.b }, headPalette)
                        : null;
                    const autoRemap = closest ? rgbToHexNoAlpha(closest.r, closest.g, closest.b) : null;
                    const currentRemap = manualRemap || autoRemap;
                    // Default picker value: manual remap > auto remap > chip color itself
                    const pickerDefault = manualRemap || autoRemap || color.hexRgb;

                    return (
                        <div
                            className="color-card"
                            key={index}
                            onMouseEnter={() => setHoveredColor(color)}
                            onMouseLeave={() => setHoveredColor(null)}
                            onClick={() => openColorPicker(color.hexRgb, pickerDefault)}
                            title="Click to set replacement color"
                            style={{
                                ...styles.colorItem,
                                backgroundColor: hoveredColor === color ? (isDarkMode ? '#3a3a3a' : '#f0f0f0') : styles.backgroundAlt,
                                cursor: 'pointer',
                            }}
                        >
                            <div style={{ ...styles.colorSwatch, backgroundColor: color.hex }} />
                            <div style={styles.colorInfo}>
                                <div style={styles.colorHex}>{color.hex.toUpperCase()}</div>
                                {currentRemap && (
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '3px', fontSize: '12px', color: manualRemap ? manualColor : mutedText, fontWeight: manualRemap ? '600' : 'normal' }}>
                                        <span>→</span>
                                        <div style={{
                                            width: '12px',
                                            height: '12px',
                                            backgroundColor: currentRemap,
                                            border: `1px solid ${border}`,
                                            borderRadius: '2px',
                                            flexShrink: 0,
                                        }} />
                                        <span>{currentRemap.toUpperCase()}</span>
                                        {manualRemap && (
                                            <button
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    handleClearRemap(color.hexRgb);
                                                }}
                                                title="Clear override"
                                                style={{
                                                    background: 'none',
                                                    border: 'none',
                                                    cursor: 'pointer',
                                                    padding: '0 2px',
                                                    fontSize: '13px',
                                                    color: mutedText,
                                                    lineHeight: 1,
                                                }}
                                            >×</button>
                                        )}
                                    </div>
                                )}
                            </div>
                            <div style={color.inPalette ? styles.paletteBadgeActive : styles.paletteBadgeInactive}>
                                {color.inPalette ? 'in palette' : 'not in palette'}
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
