import { getStyles } from "./styles";
import { findClosestPaletteColor, rgbToHexNoAlpha } from "../utils/utils";

export default function ColorViewer({ colors, hoveredColor, setHoveredColor, headPalette = [], isDarkMode = false }) {
    const styles = getStyles(isDarkMode);
    const visibleColors = colors.filter(color => !(color.hex.length === 6 && color.hex.endsWith('00')));
    
    return (
    <div className="color-viewer" style={styles.colorSection}>
        <h2 style={styles.sectionTitle}>Colors ({visibleColors.length})</h2>
        <div className="color-list" style={styles.colorList}>
            {visibleColors.map((color, index) => (
                <div
                    className="color-card"
                    key={index}
                    onMouseEnter={() => setHoveredColor(color)}
                    onMouseLeave={() => setHoveredColor(null)}
                    style={{
                        ...styles.colorItem,
                        backgroundColor: hoveredColor === color ? (isDarkMode ? '#3a3a3a' : '#f0f0f0') : styles.backgroundAlt
                    }}
                >
                    <div
                        style={{
                            ...styles.colorSwatch,
                            backgroundColor: color.hex
                        }}
                    />
                    <div style={styles.colorInfo}>
                        <div style={styles.colorHex}>
                            {color.hex.toUpperCase()}
                        </div>
                        {!color.inPalette && headPalette.length > 0 && (() => {
                            const closest = findClosestPaletteColor({ r: color.r, g: color.g, b: color.b }, headPalette);
                            return closest ? (
                                <div style={{fontSize: '12px', color: styles.textMuted}}>
                                    → {rgbToHexNoAlpha(closest.r, closest.g, closest.b).toUpperCase()}
                                </div>
                            ) : null;
                        })()}
                    </div>
                    <div
                        style={
                            color.inPalette
                                ? styles.paletteBadgeActive
                                : styles.paletteBadgeInactive
                        }
                    >
                        {color.inPalette ? 'in palette' : 'not in palette'}
                    </div>
                </div>
            ))}
        </div>
    </div>
    );
}