function fileTypeImage(type) {
  switch (type) {
    case 'PDF':
      return '/images/fileTypes/pdf.png';
    case 'WORD DOCUMENT':
      return '/images/fileTypes/word.png';
    case 'SPREADSHEET':
      return '/images/fileTypes/sheet.png';
    case 'POWER POINT':
      return '/images/fileTypes/powerpoint.png';
    case 'IMAGE':
      return '/images/fileTypes/image.png';
    case 'LINK':
      return '/images/fileTypes/link.png';
    case 'ZIP':
      return '/images/fileTypes/zip.png';
    case 'OTHER':
      return '/images/fileTypes/other.png';
    default:
      break;
  }
}

export default fileTypeImage;
