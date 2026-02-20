import styles from "./styles";
import { findClosestPaletteColor, rgbToHexNoAlpha } from "../utils/utils";

export default function ColorViewer({ colors, hoveredColor, setHoveredColor, headPalette = [] }) {
    return (
    <div className="color-viewer" style={styles.colorSection}>
        <h2 style={styles.sectionTitle}>Colors ({colors.length})</h2>
        <div className="color-list" style={styles.colorList}>
            {colors.map((color, index) => (
                <div
                    className="color-card"
                    key={index}
                    onMouseEnter={() => setHoveredColor(color)}
                    onMouseLeave={() => setHoveredColor(null)}
                    style={{
                        ...styles.colorItem,
                        backgroundColor: hoveredColor === color ? '#f0f0f0' : 'white'
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
                                <div style={{fontSize: '12px', color: '#666'}}>
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