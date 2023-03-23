export const getBase64 = e => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(e.target.files[0]);

    reader.onload = () => {
      resolve(reader.result);
    };
    reader.onerror = error => {
      reject(error);
    };
  });
};
