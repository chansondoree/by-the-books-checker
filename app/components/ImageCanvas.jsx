import styles from './styles';

export default function ImageCanvas({ displayCanvasRef, canvasRef, fusionOrder, colorMargin, setColorMargin, showApproximation, setShowApproximation, highlightColor, setHighlightColor }) {
    return (
    <div className="image-section" style={styles.imageSection}>
        <h2 style={styles.sectionTitle}>
        {fusionOrder?.head && fusionOrder?.body ? (
            `${fusionOrder.head}.${fusionOrder.body} ${fusionOrder.headName}/${fusionOrder.bodyName}`
        ) : "Image"}
        </h2>
        <canvas
            ref={displayCanvasRef}
            style={styles.canvas}
        />
        <canvas ref={canvasRef} style={styles.hiddenCanvas} />
        <div className="controls-menu" style={styles.marginControl}>
            <div style={{marginBottom: '12px'}}>
                <label htmlFor="colorMargin" style={styles.marginLabel}>
                    Color Match Tolerance:
                </label>
                <input
                    id="colorMargin"
                    type="number"
                    min="0"
                    max="50"
                    value={colorMargin}
                    onChange={(e) => setColorMargin(parseInt(e.target.value) || 0)}
                    style={styles.marginInput}
                />
                <span style={styles.marginHint}>(0-50, per RGB channel)</span>
            </div>
            <label htmlFor="approximation" style={{...styles.marginLabel, marginBottom: '0', fontWeight: 'bold', display: 'flex', alignItems: 'center'}}>
                <input
                    id="approximation"
                    type="checkbox"
                    checked={showApproximation}
                    onChange={(e) => setShowApproximation(e.target.checked)}
                    style={{marginRight: '8px'}}
                />
                Show Palette Approximation
            </label>
            <div style={{marginTop: '12px', display: 'flex', alignItems: 'center', gap: '8px'}}>
                <label htmlFor="highlightColor" style={{...styles.marginLabel, marginBottom: '0'}}>
                    Highlight Color:
                </label>
                <input
                    id="highlightColor"
                    type="color"
                    value={highlightColor}
                    onChange={(e) => setHighlightColor(e.target.value)}
                    style={{width: '28px', height: '28px', border: '1px solid #ccc', borderRadius: '4px', cursor: 'pointer'}}
                />
            </div>
        </div>
    </div>
    );
}