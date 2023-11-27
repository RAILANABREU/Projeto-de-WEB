import { useState } from 'react';

const useImageUpload = () => {
  const [imagemBase64, setImagemBase64] = useState(null);

  const handleImagemChange = (event) => {
    const imagemArquivo = event.target.files[0];

    if (imagemArquivo) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagemBase64(reader.result);
      };

      reader.readAsDataURL(imagemArquivo);
    } else {
      setImagemBase64("");
    }
  };
  const updateImagemBase64 = (newImagemBase64) => {
    setImagemBase64(newImagemBase64);
  };

  return {
    imagemBase64,
    handleImagemChange,
    updateImagemBase64,
  };
};

export default useImageUpload;
