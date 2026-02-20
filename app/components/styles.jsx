const styles = {
  container: {
    fontFamily: 'Arial, sans-serif',
    padding: '20px',
    maxWidth: '1200px',
    margin: '0 auto'
  },
  
  title: {
    marginBottom: '20px'
  },

  headerPre: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '1em',
  },

  headerPost: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  
  footer: {
    width: '100%',
    textAlign: 'center',
    fontSize: '12px',
    color: '#666',
    marginTop: '1em',
  },

  dropZone: {
    border: '3px dashed #ccc',
    borderRadius: '10px',
    padding: '60px',
    textAlign: 'center',
    backgroundColor: '#f9f9f9',
    cursor: 'pointer'
  },

  fileInput: {
    display: 'none'
  },
  
  dropZoneText: {
    fontSize: '18px',
    color: '#666'
  },

  uploadControls: {
    marginBottom: '16px'
  },

  uploadButton: {
    border: '1px solid #ccc',
    borderRadius: '8px',
    padding: '10px 16px',
    backgroundColor: '#fff',
    cursor: 'pointer',
    fontSize: '14px'
  },

  modalOverlay: {
    position: 'fixed',
    inset: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.45)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '20px',
    zIndex: 50
  },

  modalContent: {
    width: '100%',
    maxWidth: '520px',
    backgroundColor: '#fff',
    borderRadius: '12px',
    padding: '20px',
    boxShadow: '0 20px 40px rgba(0, 0, 0, 0.2)'
  },

  modalHeader: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: '12px'
  },

  modalTitle: {
    fontSize: '16px',
    fontWeight: '600'
  },

  modalClose: {
    border: 'none',
    background: 'transparent',
    fontSize: '20px',
    cursor: 'pointer',
    lineHeight: 1,
    padding: '2px 6px'
  },
  
  contentWrapper: {
    display: 'flex',
    gap: '30px',
    flexWrap: 'wrap'
  },
  
  imageSection: {
    flex: '1',
    minWidth: '300px'
  },
  
  sectionTitle: {
    marginBottom: '10px'
  },
  
  canvas: {
    maxWidth: '100%',
    border: '1px solid #ddd',
    borderRadius: '5px'
  },
  
  hiddenCanvas: {
    display: 'none'
  },
  
  colorSection: {
    flex: '0 0 300px'
  },
  
  colorList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '6px'
  },
  
  colorItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    padding: '6px 8px',
    border: '1px solid #ddd',
    borderRadius: '5px',
    cursor: 'pointer',
    transition: 'background-color 0.2s'
  },
  
  colorSwatch: {
    width: '28px',
    height: '28px',
    border: '1px solid #ccc',
    borderRadius: '4px',
    flexShrink: 0
  },
  
  colorInfo: {
    flex: 1
  },
  
  colorHex: {
    fontWeight: 'bold',
    fontSize: '12px'
  },

  colorMeta: {
    fontSize: '11px',
    color: '#666'
  },
  
  colorRgb: {
    fontSize: '11px',
    color: '#666'
  },
  
  colorCount: {
    fontSize: '10px',
    color: '#999'
  },

  paletteBadgeActive: {
    fontSize: '10px',
    fontWeight: '600',
    color: '#075b88',
    backgroundColor: '#e8f3fc',
    border: '1px solid #bfdbe8',
    borderRadius: '999px',
    padding: '2px 6px',
    textTransform: 'uppercase',
    letterSpacing: '0.04em'
  },

  paletteBadgeInactive: {
    fontSize: '10px',
    fontWeight: '600',
    color: '#8b4c2d',
    backgroundColor: '#fdf2ed',
    border: '1px solid #f3d3c3',
    borderRadius: '999px',
    padding: '2px 6px',
    textTransform: 'uppercase',
    letterSpacing: '0.04em'
  },

  headBodyLabel: {
    marginBottom: '8px',
    fontSize: '12px',
    color: '#444'
  },

  marginControl: {
    marginTop: '16px',
    padding: '12px',
    backgroundColor: '#f9f9f9',
    borderRadius: '6px',
    border: '1px solid #e0e0e0',
    width: '288px'
  },

  marginLabel: {
    display: 'block',
    fontSize: '13px',
    fontWeight: '600',
    marginBottom: '6px',
    color: '#333'
  },

  marginInput: {
    width: '70px',
    padding: '6px 8px',
    fontSize: '14px',
    border: '1px solid #ccc',
    borderRadius: '4px',
    marginRight: '8px'
  },

  marginHint: {
    fontSize: '11px',
    color: '#666'
  }
};

export default styles;