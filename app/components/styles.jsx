// Color theme variables
const colorThemes = {
  light: {
    // Backgrounds
    background: '#fff',
    backgroundAlt: '#f9f9f9',
    
    // Text colors
    textPrimary: '#333',
    textSecondary: '#444',
    textMuted: '#666',
    textLight: '#999',
    
    // Borders
    border: '#ccc',
    borderLight: '#ddd',
    borderLighter: '#e0e0e0',
    
    // Badge colors - active
    badgeActiveBg: '#e8f3fc',
    badgeActiveBorder: '#bfdbe8',
    badgeActiveText: '#075b88',
    
    // Badge colors - inactive
    badgeInactiveBg: '#fdf2ed',
    badgeInactiveBorder: '#f3d3c3',
    badgeInactiveText: '#8b4c2d',
    
    // Special
    overlay: 'rgba(0, 0, 0, 0.45)',
    shadow: 'rgba(0, 0, 0, 0.2)',
  },
  dark: {
    // Backgrounds
    background: '#1e1e1e',
    backgroundAlt: '#2d2d2d',
    
    // Text colors
    textPrimary: '#e0e0e0',
    textSecondary: '#d0d0d0',
    textMuted: '#999',
    textLight: '#666',
    
    // Borders
    border: '#444',
    borderLight: '#555',
    borderLighter: '#3a3a3a',
    
    // Badge colors - active
    badgeActiveBg: '#1a3a52',
    badgeActiveBorder: '#4a7a8a',
    badgeActiveText: '#4a9cd1',
    
    // Badge colors - inactive
    badgeInactiveBg: '#3a2a1a',
    badgeInactiveBorder: '#6a4a3a',
    badgeInactiveText: '#d4a574',
    
    // Special
    overlay: 'rgba(0, 0, 0, 0.7)',
    shadow: 'rgba(0, 0, 0, 0.5)',
  }
};

const getStyles = (isDarkMode = false) => {
  const theme = isDarkMode ? colorThemes.dark : colorThemes.light;
  
  return {
  container: {
    fontFamily: 'Arial, sans-serif',
    padding: '20px',
    maxWidth: '1200px',
    margin: '0 auto',
    backgroundColor: theme.background,
    color: theme.textPrimary,
    transition: 'background-color 0.3s, color 0.3s'
  },
  
  title: {
    margin: 0,
    color: theme.textPrimary
  },

  headerPre: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '1em',
    marginBottom: '1em',
  },

  headerRow: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: '1em',
  },

  headerControls: {
    display: 'flex',
    flexDirection: 'row',
    gap: '1em',
    alignItems: 'center',
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
    color: theme.textMuted,
    marginTop: '1em',
  },

  dropZone: {
    border: `3px dashed ${theme.border}`,
    borderRadius: '10px',
    padding: '60px',
    textAlign: 'center',
    backgroundColor: theme.backgroundAlt,
    cursor: 'pointer',
    transition: 'border-color 0.3s, background-color 0.3s'
  },

  fileInput: {
    display: 'none'
  },
  
  dropZoneText: {
    fontSize: '18px',
    color: theme.textMuted
  },

  uploadControls: {
    marginBottom: '16px'
  },

  uploadButton: {
    border: `1px solid ${theme.border}`,
    borderRadius: '8px',
    padding: '10px 16px',
    backgroundColor: theme.background,
    cursor: 'pointer',
    fontSize: '14px',
    color: theme.textPrimary,
    transition: 'border-color 0.3s, background-color 0.3s'
  },

  modalOverlay: {
    position: 'fixed',
    inset: 0,
    backgroundColor: theme.overlay,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '20px',
    zIndex: 50
  },

  modalContent: {
    width: '100%',
    maxWidth: '520px',
    backgroundColor: theme.background,
    borderRadius: '12px',
    padding: '20px',
    boxShadow: `0 20px 40px ${theme.shadow}`,
    color: theme.textPrimary,
    transition: 'background-color 0.3s, color 0.3s'
  },

  modalHeader: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: '12px'
  },

  modalTitle: {
    fontSize: '16px',
    fontWeight: '600',
    color: theme.textPrimary
  },

  modalClose: {
    border: 'none',
    background: 'transparent',
    fontSize: '20px',
    cursor: 'pointer',
    color: theme.textPrimary,
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
    marginBottom: '10px',
    color: theme.textPrimary
  },
  
  canvas: {
    maxWidth: '100%',
    border: `1px solid ${theme.borderLight}`,
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
    border: `1px solid ${theme.borderLight}`,
    borderRadius: '5px',
    cursor: 'pointer',
    transition: 'background-color 0.2s',
    backgroundColor: theme.backgroundAlt,
    color: theme.textPrimary
  },
  
  colorSwatch: {
    width: '28px',
    height: '28px',
    border: `1px solid ${theme.border}`,
    borderRadius: '4px',
    flexShrink: 0
  },
  
  colorInfo: {
    flex: 1
  },
  
  colorHex: {
    fontWeight: 'bold',
    fontSize: '12px',
    color: theme.textPrimary
  },

  colorMeta: {
    fontSize: '11px',
    color: theme.textMuted
  },
  
  colorRgb: {
    fontSize: '11px',
    color: theme.textMuted
  },
  
  colorCount: {
    fontSize: '10px',
    color: theme.textLight
  },

  paletteBadgeActive: {
    fontSize: '10px',
    fontWeight: '600',
    color: theme.badgeActiveText,
    backgroundColor: theme.badgeActiveBg,
    border: `1px solid ${theme.badgeActiveBorder}`,
    borderRadius: '999px',
    padding: '2px 6px',
    textTransform: 'uppercase',
    letterSpacing: '0.04em'
  },

  paletteBadgeInactive: {
    fontSize: '10px',
    fontWeight: '600',
    color: theme.badgeInactiveText,
    backgroundColor: theme.badgeInactiveBg,
    border: `1px solid ${theme.badgeInactiveBorder}`,
    borderRadius: '999px',
    padding: '2px 6px',
    textTransform: 'uppercase',
    letterSpacing: '0.04em'
  },

  headBodyLabel: {
    marginBottom: '8px',
    fontSize: '12px',
    color: theme.textSecondary
  },

  marginControl: {
    marginTop: '16px',
    padding: '12px',
    backgroundColor: theme.backgroundAlt,
    borderRadius: '6px',
    border: `1px solid ${theme.borderLighter}`,
    width: '288px',
    transition: 'background-color 0.3s, border-color 0.3s'
  },

  marginLabel: {
    display: 'block',
    fontSize: '13px',
    fontWeight: '600',
    marginBottom: '6px',
    color: theme.textPrimary
  },

  marginInput: {
    width: '70px',
    padding: '6px 8px',
    fontSize: '14px',
    border: `1px solid ${theme.border}`,
    borderRadius: '4px',
    marginRight: '8px',
    backgroundColor: theme.background,
    color: theme.textPrimary,
    transition: 'border-color 0.3s, background-color 0.3s'
  },

  marginHint: {
    fontSize: '11px',
    color: theme.textMuted
  },

  darkModeToggle: {
    width: '32pt',
    height: '32pt',
    border: `1px solid ${theme.border}`,
    borderRadius: '8px',
    padding: '8px 12px',
    backgroundColor: theme.backgroundAlt,
    color: theme.textPrimary,
    cursor: 'pointer',
    fontSize: '16px',
    fontWeight: '500',
    transition: 'border-color 0.3s, background-color 0.3s'
  }
  };
};

export { colorThemes, getStyles };
export default getStyles;