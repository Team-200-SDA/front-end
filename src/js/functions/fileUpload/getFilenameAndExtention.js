function getFilenameAndExtension(pathFilename) {
  const filenameExtension = pathFilename.replace(/^.*[\\\/]/, '');
  return filenameExtension.split('.').pop();
}

export default getFilenameAndExtension;
