export const getFileIcon = (fileName) => {
  const ext = fileName?.split('.').pop().toLowerCase();

  switch (ext) {
    case 'pdf':
      return '/icons/pdf.png';
    case 'doc':
    case 'docx':
      return '/icons/word.png';
    case 'xls':
    case 'xlsx':
      return '/icons/excel.png';
    case 'mp3':
      return '/icons/mp3.png';
    case 'mp4':
    case 'mov':
    case 'avi':
      return '/icons/mp4.png';
    case 'txt':
      return '/icons/txt.png';
    case 'zip':
    case 'rar':
      return '/icons/zip.png';
    default:
      return '/icons/default.png';
  }
};