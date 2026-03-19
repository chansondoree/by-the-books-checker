import { getStyles } from './styles';

export default function ImageCanvas({ displayCanvasRef, canvasRef, fusionOrder, colorMargin, setColorMargin, showApproximation, setShowApproximation, highlightColor, setHighlightColor, isDarkMode = false, customPalette, useCustomPalette, setUseCustomPalette, handlePaletteBrowseClick, paletteInputRef, handlePaletteFileChange, headPalette }) {
    const styles = getStyles(isDarkMode);
    
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
                <p style={{...styles.marginLabel, marginBottom: '8px'}}>
                    {useCustomPalette && customPalette.length > 0 
                        ? `Using custom palette (${customPalette.length} colors)` 
                        : `Using default palette (${headPalette.length} colors)`}
                </p>
                {useCustomPalette && customPalette.length > 0 ? (
                    <>
                        <button
                            onClick={() => setUseCustomPalette(false)}
                            style={{padding: '8px 12px', border: '2px solid #ef4444', borderRadius: '4px', cursor: 'pointer', backgroundColor: '#fee2e2', color: '#991b1b', marginBottom: '8px', width: '100%', fontWeight: '500'}}
                        >
                            Switch to Default Palette
                        </button>
                        <button
                            onClick={handlePaletteBrowseClick}
                            style={{padding: '8px 12px', border: '2px solid #f59e0b', borderRadius: '4px', cursor: 'pointer', backgroundColor: '#fef3c7', color: '#92400e', marginBottom: '8px', width: '100%', fontWeight: '500'}}
                        >
                            Load Different Custom Palette
                        </button>
                    </>
                ) : customPalette.length > 0 ? (
                    <>
                        <button
                            onClick={() => setUseCustomPalette(true)}
                            style={{padding: '8px 12px', border: '2px solid #3b82f6', borderRadius: '4px', cursor: 'pointer', backgroundColor: '#dbeafe', color: '#1e40af', marginBottom: '8px', width: '100%', fontWeight: '500'}}
                        >
                            Switch to Custom Palette
                        </button>
                        <button
                            onClick={handlePaletteBrowseClick}
                            style={{padding: '8px 12px', border: '2px solid #f59e0b', borderRadius: '4px', cursor: 'pointer', backgroundColor: '#fef3c7', color: '#92400e', marginBottom: '8px', width: '100%', fontWeight: '500'}}
                        >
                            Load Different Custom Palette
                        </button>
                    </>
                ) : (
                    <button
                        onClick={handlePaletteBrowseClick}
                        style={{padding: '8px 12px', border: '2px solid #3b82f6', borderRadius: '4px', cursor: 'pointer', backgroundColor: '#dbeafe', color: '#1e40af', marginBottom: '8px', width: '100%', fontWeight: '500'}}
                    >
                        Load Custom Palette
                    </button>
                )}
                <input
                    ref={paletteInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handlePaletteFileChange}
                    style={{ display: 'none' }}
                />
                <span style={styles.marginHint}>(Upload an image to extract colors)</span>
            </div>
            <div style={{marginBottom: '12px', borderTop: `1px solid ${styles.border}`, paddingTop: '12px'}}>
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
            <label htmlFor="approximation" style={{...styles.marginLabel, marginBottom: '0', fontWeight: 'bold', display: 'flex', alignItems: 'center', color: styles.textPrimary}}>
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
                    style={{width: '28px', height: '28px', border: `1px solid ${styles.border}`, borderRadius: '4px', cursor: 'pointer'}}
                />
            </div>
        </div>
    </div>
    );
}