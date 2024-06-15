export const createSendablePDF = async (callData) => {
    try {
      // Create a new PDF document
      const pdfDoc = await PDFDocument.create();
      const page = pdfDoc.addPage();
      const { width, height } = page.getSize();
      const fontSize = 30;
  
      // Add call details to the PDF page
      page.drawText(`Call Details:`, {
        x: 50,
        y: height - 4 * fontSize,
        size: fontSize,
        color: rgb(0, 0, 0),
      });
      page.drawText(`Phone Number: ${callData.phoneNumber}`, {
        x: 50,
        y: height - 5 * fontSize,
        size: fontSize,
        color: rgb(0, 0, 0),
      });
      page.drawText(`Duration: ${callData.duration} seconds`, {
        x: 50,
        y: height - 6 * fontSize,
        size: fontSize,
        color: rgb(0, 0, 0),
      });
      page.drawText(`Date: ${callData.timestamp.toLocaleString()}`, {
        x: 50,
        y: height - 7 * fontSize,
        size: fontSize,
        color: rgb(0, 0, 0),
      });
  
      // Write the PDF to a file
      const pdfBytes = await pdfDoc.save();
      const pdfPath = `${RNFS.DocumentDirectoryPath}/call_details.pdf`;
      await writeFile(pdfPath, pdfBytes, 'base64');
  
      return pdfPath;
    } catch (error) {
      console.error('Error generating PDF:', error);
      return null;
    }
  };