import styles from './styles';

export default function ImageCanvas({ displayCanvasRef, canvasRef, fusionOrder }) {
    return (
    <div style={styles.imageSection}>
        <h2 style={styles.sectionTitle}>
        {fusionOrder?.head && fusionOrder?.body ? (
            `${fusionOrder.headName || fusionOrder.head}/${fusionOrder.bodyName || fusionOrder.body}`
        ) : "Image"}
        </h2>
        <canvas
            ref={displayCanvasRef}
            style={styles.canvas}
        />
        <canvas ref={canvasRef} style={styles.hiddenCanvas} />
    </div>
    );
}