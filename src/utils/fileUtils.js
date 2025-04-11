/**
 * Utilitários para manipulação de arquivos
 */

/**
 * Cria uma URL de objeto para um arquivo
 * Útil para previews de imagens antes do upload
 * @param {File} file - O arquivo para criar a URL
 * @returns {string} A URL do objeto criado
 */
export const createObjectURL = (file) => {
  if (!file) return null;
  return URL.createObjectURL(file);
};

/**
 * Revoga uma URL de objeto para liberar memória
 * @param {string} url - A URL do objeto a ser revogada
 */
export const revokeObjectURL = (url) => {
  if (!url) return;
  URL.revokeObjectURL(url);
};
