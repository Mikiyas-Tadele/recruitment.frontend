import * as file from 'file-saver';
const MIME_TYPES = {
    pdf  : 'application/pdf',
    xls  : 'application/vnd.ms-excel',
    xlsx : 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    jpeg: 'image/jpeg',
    jpg: 'image/jpeg',
    doc: 'application/msword',
    docx: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    zip: 'application/zip',
    ppt: 'application/vnd.ms-powerpoint',
    pptx: 'application/vnd.openxmlformats-officedocument.presentationml.presentation'
  };

/**
 * Saves a file by opening file-save-as dialog in the browser
 * using file-save library.
 * @param blobContent file content as a Blob
 * @param fileName name file should be saved as
 */
export const saveFile = (blobContent: Blob, fileName: string) => {
    const fileNameContents: string[] = fileName.split('.');
    console.log(fileName);
    const blob = new Blob([blobContent], {type: MIME_TYPES[fileNameContents[fileNameContents.length - 1].trim()]});
    file.saveAs(blob, fileName);
};

/**
 * Derives file name from the http response
 * by looking inside content-disposition
 * @param res http Response
 */
// export const getFileNameFromResponseContentDisposition = (res: Response) => {
//     const contentDisposition = res.headers.get('content-disposition') || '';
//     const matches = /filename=([^;]+)/ig.exec(contentDisposition);
//     const fileName = (matches[1] || 'untitled').trim();
//     return fileName;
// };
