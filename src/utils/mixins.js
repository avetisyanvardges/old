function _uploadFile(data) {
  try {
    const {fileList} = data;
    let formData = new FormData();
    fileList.forEach((file) => {
      formData.append('file', {
        name: file?.name || `${new Date().getTime()}`,
        uri: file?.url || '',
        type: file?.type || '',
      });
    });
    return formData;
  } catch (e) {
    console.log(e.toString(), '_uploadFile');
  }
}
export {_uploadFile};
