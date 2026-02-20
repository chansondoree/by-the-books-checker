import styles from './styles';

export default function ImageCanvas({ displayCanvasRef, canvasRef, fusionOrder, colorMargin, setColorMargin }) {
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
        <div className="color-match-control" style={styles.marginControl}>
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
    </div>
    );
}