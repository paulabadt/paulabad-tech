// ============================================
// FUNCIONES DE VALIDACIÓN
// ============================================

// lib/formValidation.js
export const validateFormData = (formData) => {
  const errors = [];
  const warnings = [];

  // Validaciones obligatorias
  if (!formData.clientData.clientName?.trim()) {
    errors.push('El nombre del cliente es obligatorio');
  }

  if (!formData.clientData.clientEmail?.trim()) {
    errors.push('El email del cliente es obligatorio');
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.clientData.clientEmail)) {
    errors.push('El email no tiene un formato válido');
  }

  if (!formData.clientData.businessName?.trim()) {
    errors.push('El nombre de la empresa es obligatorio');
  }

  // Advertencias
  if (!formData.functionality.description?.trim()) {
    warnings.push('La descripción de funcionalidades está vacía');
  }

  if (!formData.businessLogic.customDescription?.trim()) {
    warnings.push('Falta la descripción de lógica de negocio (muy importante)');
  }

  if (!formData.database.currentStructure?.trim()) {
    warnings.push('No has descrito la estructura de la base de datos');
  }

  if (!formData.security.userManagement?.trim()) {
    warnings.push('Falta información sobre la gestión de usuarios');
  }

  return { isValid: errors.length === 0, errors, warnings };
};

export const getFormCompleteness = (formData) => {
  let totalFields = 0;
  let filledFields = 0;

  const countFields = (obj) => {
    Object.values(obj).forEach(value => {
      if (Array.isArray(value)) {
        totalFields++;
        if (value.length > 0 && value.some(item => Object.values(item).some(v => v))) {
          filledFields++;
        }
      } else if (typeof value === 'string') {
        totalFields++;
        if (value && value.trim()) {
          filledFields++;
        }
      } else if (typeof value === 'object' && value !== null) {
        countFields(value);
      }
    });
  };

  countFields(formData);
  return {
    total: totalFields,
    filled: filledFields,
    percentage: totalFields > 0 ? Math.round((filledFields / totalFields) * 100) : 0
  };
};