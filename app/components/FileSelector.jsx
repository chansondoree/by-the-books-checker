import React, { useEffect } from "react";
import { getStyles } from "./styles";

export default function FileSelector({
    image,
    isImportOpen,
    setIsImportOpen,
    handleDrop,
    handleDragOver,
    handleBrowseClick,
    fileInputRef,
    handleFileChange,
    handleDropZoneKeyDown,
    isDarkMode = false
}) {
    const styles = getStyles(isDarkMode);
    const handleClose = () => setIsImportOpen(false);
    const handleOpen = () => setIsImportOpen(true);

    useEffect(() => {
        if (!isImportOpen) return;
        const handleKeyDown = (event) => {
            if (event.key === 'Escape') {
                setIsImportOpen(false);
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [isImportOpen, setIsImportOpen]);

    const dropZone = (
        <div
            className="drop-zone"
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onClick={handleBrowseClick}
            onKeyDown={handleDropZoneKeyDown}
            role="button"
            tabIndex={0}
            style={styles.dropZone}
        >
            <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                style={styles.fileInput}
            />
            <p style={styles.dropZoneText}>
                Drag and drop an image here, or click to browse
            </p>
        </div>
    );

    return (
        <div>
            {!image ? dropZone : null}

            {image && isImportOpen ? (
                <div className="modal-overlay" style={styles.modalOverlay} onClick={handleClose}>
                    <div className="modal-content" style={styles.modalContent} onClick={(e) => e.stopPropagation()}>
                        <div className="modal-header" style={styles.modalHeader}>
                            <div className="modal-title" style={styles.modalTitle}>Import Image</div>
                            <button
                                type="button"
                                onClick={handleClose}
                                style={styles.modalClose}
                                aria-label="Close"
                            >
                                ×
                            </button>
                        </div>
                        {dropZone}
                    </div>
                </div>
            ) : null}
        </div>
    );
}