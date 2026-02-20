import styles from "./styles";

export default function ColorViewer({ colors, hoveredColor, setHoveredColor }) {
    return (
        <div style={styles.colorSection}>
            <h2 style={styles.sectionTitle}>Colors ({colors.length})</h2>
            <div style={styles.colorList}>
              {colors.map((color, index) => (
                <div
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
                    <div style={styles.colorMeta}>
                      {color.count} px
                    </div>
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